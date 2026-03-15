const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route for testing
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is running' });
});

// Load routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));
app.use('/', require('./routes/redirect'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
