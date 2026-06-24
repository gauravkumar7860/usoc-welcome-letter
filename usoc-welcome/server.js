/**
 * USoC Welcome Letter Generator
 * Lamrin Tech Skills University
 * Server: Express.js
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Health check for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'USoC Welcome Letter Generator' });
});

// Start server
app.listen(PORT, () => {
  console.log(`USoC Welcome Letter Generator running on port ${PORT}`);
});

module.exports = app;
