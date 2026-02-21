const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

router.post('/', async (req, res) => {
    const newCat = new Category(req.body);
    await newCat.save();
    res.json(newCat);
});

module.exports = router;
