// frontend/src/app/memories/[id]/page.tsx

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
// สมมติว่าไฟล์ API ของคุณคือ libs/memoryApi.ts
import { getMemoryById, Memory } from '@/libs/MemoryAPI';

interface MemoryDetailPageProps {
  params: { id: string };
}

export default async function MemoryDetailPage({ params }: MemoryDetailPageProps) {
  let memory: Memory | null = null;

  try {
    memory = await getMemoryById(params.id);
  } catch (error) {
    console.error("Failed to fetch memory:", error);
    notFound();
  }

  if (!memory) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto my-12 md:my-20">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
        
        {/* --- ส่วนแสดงผล Media (รูปภาพหรือวิดีโอ) --- */}
        {memory.mediaUrl && (
          <div className="w-full aspect-video relative">
            {memory.mediaType === 'image' ? (
              <Image
                src={memory.mediaUrl}
                alt={memory.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            ) : memory.mediaType === 'video' ? (
              <video
                src={memory.mediaUrl}
                controls
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
        )}

        <div className="p-6 sm:p-8 md:p-10">
          <div className="text-center">
            <time className="text-md font-semibold text-pink-500">
              {new Date(memory.date).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {memory.title}
            </h1>
          </div>
          
          <div className="w-1/4 h-px bg-gray-300 mx-auto my-6" />

          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
            {memory.description}
          </p>

          <div className="text-center mt-10">
            <Link href="/memories" className="text-pink-600 hover:text-pink-800 font-semibold transition-colors">
              &larr; กลับไปที่ Timeline
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}