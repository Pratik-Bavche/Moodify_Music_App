const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const songRoutes = require('./routes/songRoutes');

// Middleware
app.use(express.json());

// Placeholder for routes
// app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/songs', songRoutes);

app.use('/api/auth', authRoutes);

module.exports = app;
