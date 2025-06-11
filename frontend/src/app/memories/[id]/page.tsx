// src/app/memories/[id]/page.tsx
import { notFound } from 'next/navigation'
import { memories } from '@/data/memories'

interface Params {
  params: { id: string }
}

export default function MemoryDetailPage({ params }: Params) {
  const mem = memories.find((m) => m.id === params.id)
  if (!mem) return notFound()

  return (
    <main className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-2">{mem.title}</h1>
      <time className="text-sm text-pink-500">{mem.date}</time>
      <p className="mt-6 text-gray-700 leading-relaxed">{mem.description}</p>
    </main>
  )
}
