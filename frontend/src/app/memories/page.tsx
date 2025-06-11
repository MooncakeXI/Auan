// src/app/memories/page.tsx
import Link from 'next/link'
import { memories } from '@/data/memories'

export default function MemoriesPage() {
  return (
    <main className="relative max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-12 text-center">Our Memories</h1>

      <div className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300" />

        <div className="space-y-12">
          {memories.map((mem) => (
            <Link
              key={mem.id}
              href={`/memories/${mem.id}`}
              className="group relative flex items-start space-x-6 hover:cursor-pointer"
            >
              {/* Marker dot */}
              <div className="flex-shrink-0 mt-1">
                <div className="w-4 h-4 bg-pink-500 rounded-full border-2 border-white group-hover:bg-pink-600 transition" />
              </div>

              {/* Card */}
              <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition group-hover:bg-pink-50">
                <time className="text-sm text-pink-500">{mem.date}</time>
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
  )
}
