'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// สมมติว่าไฟล์ API ของคุณคือ libs/memoryApi.ts
import { getMemories, Memory } from '@/libs/MemoryAPI'; 

// Component สำหรับการ์ดแต่ละใบ
const MemoryCard = ({ memory }: { memory: Memory }) => (
  <Link href={`/memories/${memory._id}`} className="block group">
    <div className="p-4 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 h-full flex flex-col">
      <time className="text-sm font-semibold text-pink-500">
        {new Date(memory.date).toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
      <h3 className="text-lg font-bold text-gray-800 mt-1">
        {memory.title}
      </h3>
      <p className="text-sm text-gray-600 mt-2 flex-grow line-clamp-3">
        {memory.description}
      </p>
    </div>
  </Link>
);

// Component สำหรับแต่ละรายการใน Timeline
const TimelineItem = ({ memory, index }: { memory: Memory; index: number }) => {
  const isRightSide = index % 2 === 0;

  return (
    <div className="mb-10 relative">
      {/* จุดกลมบนเส้น Timeline */}
      <div className="absolute left-1/2 top-5 -translate-x-1/2 z-10">
        <div className="bg-pink-500 w-4 h-4 rounded-full ring-4 ring-white shadow-md"></div>
      </div>
      
      {/* การ์ดข้อมูล (สลับซ้าย-ขวาบนจอใหญ่, อยู่ฝั่งเดียวบนจอมือถือ) */}
      <div
        className={`w-full md:w-5/12 px-4
          ${isRightSide ? 'md:ml-auto md:pl-10' : 'md:mr-auto md:pr-10'}
        `}
      >
        <MemoryCard memory={memory} />
      </div>
    </div>
  );
};

// Component หลักของหน้า
export default function MemoriesTimelinePage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const data = await getMemories();
        setMemories(data);
      } catch (err) {
        setError('ไม่สามารถโหลดข้อมูลความทรงจำได้ โปรดลองอีกครั้ง');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemories();
  }, []);

  if (isLoading) {
    return <div className="text-center text-gray-500 py-20">Loading Memories...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-20">{error}</div>;
  }
  
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Our Memories
        </h1>
        <p className="text-md text-gray-500 mt-3">
          A journey through our special moments.
        </p>
      </div>

      <div className="relative">
        {/* เส้นแกนกลางของ Timeline */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-gray-300" style={{ transform: 'translateX(-0.5px)' }} />

        {memories.length > 0 ? (
          memories.map((memory, index) => (
            <TimelineItem key={memory._id} memory={memory} index={index} />
          ))
        ) : (
          <p className="text-center text-gray-500">No memories found.</p>
        )}
      </div>
    </main>
  );
}