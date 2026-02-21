require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Book = require('./models/Book');

const app = express();
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI).then(() => console.log('✅ DB Connected'));

// --- CATEGORY API ---
app.get('/api/categories', async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

app.post('/api/categories', async (req, res) => {
    try {
        const cat = new Category(req.body);
        await cat.save();
        res.status(201).json(cat);
    } catch (err) {
        res.status(400).json({ error: "Category already exists" });
    }
});

// --- BOOK API ---
app.get('/api/books', async (req, res) => {
    // .populate('category') converts the ID into the actual Category Object
    const books = await Book.find().populate('category');
    res.json(books);
});

app.post('/api/books', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(5000, () => console.log('🚀 Server: http://localhost:5000'));