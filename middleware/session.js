module.exports = require('express-session')({ secret: process.env.SESSION_SECRET || 'secret123' });