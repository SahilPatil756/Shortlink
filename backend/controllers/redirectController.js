const Link = require('../models/Link');
const Click = require('../models/Click');

// @desc    Redirect short code to original URL
// @route   GET /:shortCode
// @access  Public
const redirectLink = async (req, res) => {
  try {
    const link = await Link.findOne({ shortCode: req.params.shortCode });

    if (link) {
      // Asynchronously log click
      const clickData = {
        linkId: link._id,
        country: 'Unknown', // In a real app, parse from IP
        device: req.headers['user-agent'] || 'Unknown', // basic parse
        referrer: req.headers.referer || 'Direct',
      };
      
      Click.create(clickData).catch(err => console.error('Error logging click:', err));

      return res.redirect(link.originalUrl);
    } else {
      return res.status(404).send('Link not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = { redirectLink };
