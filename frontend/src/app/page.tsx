'use client'

import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import MemoryTimeline from '@/components/MemoryTimeline'
import { useEffect, useRef, useState } from 'react'

const Countdown = dynamic(() => import('@/components/Countdown'), { ssr: false })
const ConfettiEffect = dynamic(() => import('react-confetti'), { ssr: false })
const CelebrationSection = dynamic(() => import('@/components/CelebrationSection'), { ssr: false })

export default function HomePage() {
  const surpriseTime = '2025-06-28T20:00:00'
  const memories = [
    { date: '2023-08-15', text: 'Our first date at the park.' },
    { date: '2024-02-14', text: 'Valentine’s dinner under the stars.' },
  ]

  const audioRef = useRef<HTMLAudioElement>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    audioRef.current?.play().catch(() => {
      // เพลงโดนบล็อกเพราะยังไม่มี interaction
      console.log('Autoplay blocked by browser')
    })
  }, [])

  const handleCountdownComplete = () => {
    if (audioRef.current) {
      audioRef.current.volume = 1
    }
    setShowConfetti(true) // เปิด confetti และ effect พิเศษอื่น ๆ
  }

  return (
    <div className="relative">
      {/* แสดง confetti และแสงวูบวาบเมื่อ countdown จบ */}
      {showConfetti && (
        <>
          <ConfettiEffect
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={300}
            gravity={0.2}
            recycle={false}
          />
          <div className="fixed inset-0 pointer-events-none z-40">
            <div className="w-full h-full bg-pink-300 opacity-20 animate-pulse" />
          </div>
        </>
      )}

      <Hero name="ไออ้วน" imageUrl="/hero-bg.jpg" />

      <main className="max-w-4xl mx-auto p-8 space-y-12">
        <section className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
            Countdown to Your Special Day
          </h2>
          <Countdown targetDate={surpriseTime} onComplete={handleCountdownComplete} />
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Memories</h2>
          <MemoryTimeline memories={memories} />
        </section>

        <CelebrationSection />
      </main>

      <audio ref={audioRef} src="/birthday-song.mp3" loop />
    </div>
  )
}
