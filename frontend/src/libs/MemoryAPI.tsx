// frontend/src/libs/memoryApi.ts

import axios from "axios";

// กำหนด URL พื้นฐานของ Backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// --- Interfaces ---
// Interface สำหรับข้อมูล Memory ที่ได้รับจาก Backend
export interface Memory {
  _id: string;
  title: string;
  description: string;
  date: string;
  mediaUrl?: string;   
  mediaType?: 'image' | 'video';
  createdAt: string;
  updatedAt: string;
}

// Interface สำหรับข้อมูลที่จะใช้ "สร้าง" Memory ใหม่
export interface MemoryInput {
  title: string;
  description: string;
  date: string;
}


// --- API Functions ---

/**
 * ฟังก์ชันสำหรับดึงข้อมูล Memories ทั้งหมด
 * @returns Promise ที่จะ resolve เป็น array ของ Memory
 */
export const getMemories = async (): Promise<Memory[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/memories`);
    // API ของเราส่งข้อมูลกลับมาใน property `data`
    return response.data.data; 
  } catch (error) {
    console.error("Error fetching memories:", error);
    throw error; // โยน error ต่อเพื่อให้ component ที่เรียกใช้จัดการต่อได้
  }
};


/**
 * ฟังก์ชันสำหรับดึงข้อมูล Memory ชิ้นเดียวตาม ID
 * @param id ID ของ Memory ที่ต้องการ
 * @returns Promise ที่จะ resolve เป็น Memory object
 */
export const getMemoryById = async (id: string): Promise<Memory> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/memories/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching memory with id ${id}:`, error);
    throw error;
  }
};


/**
 * ฟังก์ชันสำหรับสร้าง Memory ใหม่
 * @param memoryData ข้อมูล Memory ที่จะสร้าง
 * @returns Promise ที่จะ resolve เป็น Memory ที่สร้างสำเร็จ
 */
export const createMemory = async (memoryData: MemoryInput): Promise<Memory> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/memories`, memoryData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating memory:", error);
    throw error;
  }
};