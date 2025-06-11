// libs/createWish.ts

import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

// แก้ไขพารามิเตอร์ data ให้รับอ็อบเจกต์ที่มีแค่ text
const createWish = async (data: { text: string }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/wishes`, data);
        return response.data;
    } catch (error) {
        console.error("Error in createWish API call:", error);
        throw error; // โยน error ต่อเพื่อให้ component จัดการได้
    }
};

export default createWish;