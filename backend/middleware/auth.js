// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary
const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    console.log('Token received:', token); // Log the received token

    if (!token) {
        console.log('No token provided');
        return res.sendStatus(401); // No token provided
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded); // Log the decoded token

        req.user = await User.findById(decoded.id); // Get user from database
        if (!req.user) {
            console.log('User not found');
            return res.sendStatus(404); // User not found
        }

        next(); // Call next middleware or route handler
    } catch (err) {
        console.error('Token verification error:', err.message); // Log error message
        return res.sendStatus(403); // Token is no longer valid
    }
};


module.exports = authenticateToken;
