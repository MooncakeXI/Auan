const Memory = require('../models/Memory.js');

exports.getMemories = async (req, res) => {
    try {
        const memories = await Memory.find();
        res.status(200).json({success: true, data: memories});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching memories', error: error.message });
    }
}

exports.getMemorie = async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);
        if (!memory) {
            return res.status(404).json({ message: 'Memory not found' });
        }
        res.status(200).json({ success: true, data: memory });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching memory', error: error.message });
    }
}