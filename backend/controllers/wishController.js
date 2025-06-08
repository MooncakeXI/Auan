const Wish = require('../models/Wish.js');

exports.createWish = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Wish text is required' });
        }

        const newWish = new Wish({ text });
        await newWish.save();

        res.status(201).json({ success: true, data: newWish });
    } catch (error) {
        res.status(500).json({ message: 'Error creating wish', error: error.message });
    }
}