const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/', async (req, res) => {
    // Populate replaces the Category ID with the full Object
    const books = await Book.find().populate('category', 'name'); 
    res.json(books);
});

router.post('/', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
