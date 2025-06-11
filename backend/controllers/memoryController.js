
const Memory = require('../models/Memory.js');

exports.getMemories = async (req, res) => {
    try {
        // เปลี่ยนจาก -1 เป็น 1 เพื่อเรียงจากวันที่เก่าที่สุดไปหาใหม่ที่สุด
        const memories = await Memory.find().sort({ date: 1 }); 

        res.status(200).json({
            success: true,
            count: memories.length,
            data: memories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching memories',
            error: error.message
        });
    }
};

exports.getMemorie = async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);
        if (!memory) {
            return res.status(404).json({ message: 'Memory not found' });
        }
        res.status(200).json({ success: true, data: memory });
    } catch (error) {
        if (error.name === 'CastError') {
             return res.status(404).json({ message: 'Memory not found with that id' });
        }
        res.status(500).json({ message: 'Error fetching memory', error: error.message });
    }
}


exports.createMemory = async (req, res) => {
    try {
   
        const newMemory = new Memory(req.body);

        await newMemory.save();

        res.status(201).json({ success: true, data: newMemory });

    } catch (error) {
        if (error.name === 'ValidationError') {

            return res.status(400).json({
                success: false,
                message: 'Invalid input data. Please check your inputs.',
                errors: error.errors 
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error creating memory',
            error: error.message
        });
    }
}