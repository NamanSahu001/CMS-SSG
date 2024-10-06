// backend/routes/articles.js
const express = require('express');
const Article = require('../models/Article');  // Make sure this is the correct path
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Your routes here


// Apply the middleware to protect the route
router.post('/', authenticateToken, async (req, res) => {
    const { title, content } = req.body;

    const newArticle = new Article({
        title,
        content,
        author: req.user._id // Now req.user should be defined
    });

    try {
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const articles = await Article.find(); // Ensure Article is a valid model
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id); // Find article by ID

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.json(article); // Send the article as the response
    } catch (err) {
        if (err.kind === 'ObjectId') {
            // If the ID is not a valid ObjectId, return a 400 Bad Request
            return res.status(400).json({ message: 'Invalid article ID' });
        }
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;

