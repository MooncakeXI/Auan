'use client'
interface Memory { date: string; text: string }

export default function MemoryTimeline({ memories }: { memories: Memory[] }) {
  return (
    <div className="relative pl-10 sm:pl-16">
      {/* เส้น timeline */}
      <div className="absolute left-5 sm:left-7 top-0 h-full w-px bg-gray-300" />
      {memories.map((mem, idx) => (
        <div key={idx} className="mb-8 flex items-start">
          {/* จุดบนเส้น */}
          <div className="w-6 h-6 flex items-center justify-center bg-white border-2 border-pink-500 rounded-full relative -left-3 sm:-left-5">
            <div className="w-2 h-2 bg-pink-500 rounded-full" />
          </div>
          {/* การ์ดความทรงจำ */}
          <div className="ml-4 sm:ml-8 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-4 shadow-md max-w-md sm:max-w-lg">
            <div className="text-xs sm:text-sm text-pink-500 font-medium">{mem.date}</div>
            <p className="mt-1 text-gray-700 text-sm sm:text-base">{mem.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
