'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion'; // 1. Import framer-motion

// ตรวจสอบว่า path นี้ถูกต้อง
import { getMemories, Memory } from '@/libs/MemoryAPI'; 

// Component สำหรับการ์ด (ป้าย) แต่ละใบ
const MemoryCard = ({ memory }: { memory: Memory }) => (
  <Link href={`/memories/${memory._id}`} className="block group">
    <div className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-100">
      <time className="text-xs font-semibold text-pink-500 uppercase tracking-wider">
        {new Date(memory.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </time>
      <h3 className="text-lg font-bold text-slate-800 mt-1 group-hover:text-pink-600 transition-colors">
        {memory.title}
      </h3>
    </div>
  </Link>
);

// Component สำหรับแต่ละรายการใน Timeline (ปรับปรุงใหม่ทั้งหมด)
const TimelineItem = ({ memory, index }: { memory: Memory; index: number }) => {
  const isRightSide = index % 2 === 0;

  // 2. กำหนด Animation variants
  const variants = {
    hidden: { opacity: 0, x: isRightSide ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    // 3. ใช้ motion.div และใช้ flexbox จัดการให้จุดอยู่ตรงกลาง
    <motion.div
      className="flex items-center w-full my-6 md:my-0"
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* --- Slot ฝั่งซ้าย --- */}
      <div className={`w-1/2 flex justify-end ${isRightSide ? 'md:invisible' : ''}`}>
        <div className="w-full md:max-w-sm">
          <MemoryCard memory={memory} />
        </div>
      </div>
      
      {/* --- จุดกึ่งกลาง --- */}
      <div className="relative px-2 md:px-4">
        <div className="h-4 w-4 bg-pink-500 rounded-full ring-4 ring-white z-10"></div>
      </div>

      {/* --- Slot ฝั่งขวา --- */}
      <div className={`w-1/2 flex justify-start ${!isRightSide ? 'md:invisible' : ''}`}>
        <div className="w-full md:max-w-sm">
          <MemoryCard memory={memory} />
        </div>
      </div>
    </motion.div>
  );
};


// Component หลักของหน้า
export default function MemoriesTimelinePage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // แก้ไข: เปลี่ยนชื่อฟังก์ชันใน useEffect เพื่อไม่ให้ซ้ำซ้อน
    const fetchAllMemories = async () => {
      try {
        const data = await getMemories();
        setMemories(data);
      } catch (err) {
        setError('ไม่สามารถโหลดข้อมูลความทรงจำได้');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllMemories();
  }, []);

  if (isLoading) {
    return <div className="text-center text-gray-500 py-20">Loading Memories...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-20">{error}</div>;
  }
  
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-800">Our Memories</h1>
        <p className="text-lg text-slate-500 mt-2">A journey through our special moments.</p>
      </div>

      <div className="relative">
        {/* เส้นแกนกลางของ Timeline */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-slate-200" style={{ transform: 'translateX(-50%)' }} />

        {memories.length > 0 ? (
          <div className="space-y-8 md:space-y-0">
            {memories.map((memory, index) => (
              <TimelineItem key={memory._id} memory={memory} index={index} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No memories found.</p>
        )}
      </div>
    </main>
  );
}