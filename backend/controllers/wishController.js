// ในไฟล์ controllers/wishController.js

const Wish = require('../models/Wish.js');

exports.createWish = async (req, res) => {
    // Log ที่ 1: เช็คว่า request วิ่งมาถึง controller นี้หรือไม่
    console.log('--- Create Wish Controller Hit ---');
    
    // Log ที่ 2: เช็คว่าข้อมูลที่ส่งมาจาก Frontend คืออะไร
    console.log('Request Body:', req.body);

    try {
        const newWish = new Wish(req.body);
        
        // Log ที่ 3: เช็คว่ากำลังจะสั่ง save
        console.log('Attempting to save wish...');
        
        await newWish.save();

        // Log ที่ 4: เช็คว่า save สำเร็จแล้ว
        console.log('--- Wish Saved Successfully! ---', newWish);

        res.status(201).json({ success: true, data: newWish });

    } catch (error) {
        // Log ที่ 5: ถ้าเกิด Error ตอน save จะเข้ามาที่นี่
        console.log('!!! ERROR SAVING WISH !!!');
        console.error(error); // แสดงรายละเอียดของ error ทั้งหมด

        res.status(500).json({ 
            success: false, 
            message: 'Internal Server Error while creating wish', 
            error: error.message 
        });
    }
}