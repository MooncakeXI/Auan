// controllers/wishController.js

const Wish = require('../models/Wish.js');

exports.createWish = async (req, res) => {
    try {
        const newWish = new Wish(req.body);
        
        await newWish.save();

        res.status(201).json({ success: true, data: newWish });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid input data.', 
                errors: error.errors 
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: 'Error creating wish', 
            error: error.message 
        });
    }
}