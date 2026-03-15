const Link = require('../models/Link');
const Click = require('../models/Click');
const crypto = require('crypto');

// @desc    Create new short link
// @route   POST /api/links
// @access  Private (or Public if we don't strictly protect it, but let's protect for dashboard)
const createLink = async (req, res) => {
  try {
    const { originalUrl, customAlias } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: 'Please provide a URL' });
    }

    let shortCode = customAlias;

    if (shortCode) {
      const existing = await Link.findOne({ shortCode });
      if (existing) {
        return res.status(400).json({ message: 'Alias already in use' });
      }
    } else {
      let isUnique = false;
      while (!isUnique) {
        shortCode = crypto.randomBytes(3).toString('hex'); // 6 chars
        const existing = await Link.findOne({ shortCode });
        if (!existing) {
          isUnique = true;
        }
      }
    }

    const link = await Link.create({
      originalUrl,
      shortCode,
      customAlias,
      userId: req.user ? req.user._id : null
    });

    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user links
// @route   GET /api/links
// @access  Private
const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get link analytics
// @route   GET /api/links/analytics/:id
// @access  Private
const getAnalytics = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    // Optional: Ensure user owns the link
    if (link.userId && link.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const clicks = await Click.find({ linkId: link._id }).sort({ createdAt: 1 });
    
    // Aggregate data
    const totalClicks = clicks.length;
    
    // Group by date, country, etc.
    const clicksByDate = {};
    const clicksByCountry = {};
    const clicksByReferrer = {};

    clicks.forEach(click => {
      const date = click.createdAt.toISOString().split('T')[0];
      clicksByDate[date] = (clicksByDate[date] || 0) + 1;
      
      clicksByCountry[click.country] = (clicksByCountry[click.country] || 0) + 1;
      clicksByReferrer[click.referrer] = (clicksByReferrer[click.referrer] || 0) + 1;
    });

    res.json({
      link,
      totalClicks,
      clicksByDate,
      clicksByCountry,
      clicksByReferrer
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createLink, getLinks, getAnalytics };
