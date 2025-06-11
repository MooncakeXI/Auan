'use client'; // ต้องเป็น Client Component เพราะต้องใช้ hooks (useState, useEffect)

import { useState, useEffect } from 'react';
import Link from 'next/link';
// นำฟังก์ชันและ Interface จากไฟล์ API ของเราเข้ามา
import { getMemories, Memory } from '@/libs/MemoryAPI'; // ปรับ path ให้ถูกต้อง

export default function MemoriesPage() {
  // สร้าง State เพื่อเก็บข้อมูล, สถานะ loading และ error
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect จะทำงานเมื่อ component โหลดเสร็จเพื่อดึงข้อมูล
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const data = await getMemories();
        setMemories(data); // นำข้อมูลที่ได้จาก API มาใส่ใน state
      } catch (err) {
        setError('ไม่สามารถโหลดข้อมูลได้');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemories();
  }, []); // [] หมายถึงให้ทำงานแค่ครั้งเดียว

  if (isLoading) {
    return <div className="text-center py-12">Loading memories...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <main className="relative max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-12 text-center">Our Memories</h1>

      <div className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300" />

        <div className="space-y-12">
          {memories.map((mem) => (
            // เปลี่ยน href ให้ใช้ _id จาก database
            <Link
              key={mem._id} 
              href={`/memories/${mem._id}`}
              className="group relative flex items-start space-x-6 hover:cursor-pointer"
            >
              {/* Marker dot */}
              <div className="flex-shrink-0 mt-1">
                <div className="w-4 h-4 bg-pink-500 rounded-full border-2 border-white group-hover:bg-pink-600 transition" />
              </div>

              {/* Card - แสดงผลข้อมูลจาก state */}
              <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition group-hover:bg-pink-50">
                <time className="text-sm text-pink-500">
                  {new Date(mem.date).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <h2 className="mt-1 text-xl font-semibold group-hover:text-pink-600">
                  {mem.title}
                </h2>
                <p className="mt-2 text-gray-600 line-clamp-2">
                  {mem.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}