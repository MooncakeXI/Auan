'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import createWish from '../libs/createWish'
import { useRouter } from 'next/navigation' // 1. Import useRouter

const Confetti = dynamic(() => import('react-confetti'), { ssr: false })

export default function CelebrationSection() {
  const router = useRouter() // 2. สร้าง instance ของ router
  const [blown, setBlown] = useState(false)
  const [wish, setWish] = useState('')
  const [submittedWish, setSubmittedWish] = useState<string | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    function updateSize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const handleBlow = () => {
    setBlown(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!wish.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const wishData = { text: wish.trim() }
      const response = await createWish(wishData)

      setSubmittedWish(response.data.text)
      setWish('')

      // 3. หลังจากส่งสำเร็จ หน่วงเวลา 2 วินาทีแล้วไปหน้า surprise
      setTimeout(() => {
        router.push('/surprise')
      }, 2000) // 2000ms = 2 วินาที

    } catch (err) {
      console.error('Failed to submit wish:', err)
      setError('ไม่สามารถส่งคำอวยพรได้ โปรดลองอีกครั้งในภายหลัง')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="max-w-3xl mx-auto p-8 text-center space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Make a Wish!</h2>

      {/* ... โค้ดส่วนเป่าเค้ก ... */}
      <div className="relative inline-block">
        {!blown ? (
          <>
            <Image
              src="/images/birthday-cake.png"
              alt="Birthday Cake with Candle"
              width={300}
              height={200}
              className="rounded-lg shadow-lg"
            />
            <button
              onClick={handleBlow}
              className="mt-4 px-6 py-2 bg-yellow-400 text-gray-800 font-medium rounded shadow hover:bg-yellow-500 transition"
            >
              เป่าเค้ก!
            </button>
          </>
        ) : (
          <>
            <Image
              src="/images/birthday-cake-blown.png"
              alt="Cake after Blown"
              width={300}
              height={200}
              className="rounded-lg shadow-lg"
            />
            <div className="fixed inset-0 pointer-events-none z-50">
              {dimensions.width > 0 && dimensions.height > 0 && (
                <Confetti
                  width={dimensions.width}
                  height={dimensions.height}
                  numberOfPieces={200}
                  gravity={0.2}
                  recycle={false}
                />
              )}
            </div>
          </>
        )}
      </div>

      {blown && !submittedWish && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <textarea
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            placeholder="เขียนคำอวยพรของคุณที่นี่..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
            rows={3}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-pink-500 text-white font-medium rounded-lg shadow hover:bg-pink-600 transition disabled:bg-pink-300"
            disabled={isLoading}
          >
            {isLoading ? 'กำลังส่ง...' : 'ส่งคำอวยพร'} 
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      )}

      {submittedWish && (
        <div className="mt-6 p-6 bg-pink-50 rounded-xl shadow-lg relative z-10">
          <p className="text-xl text-gray-800">🎉 ความปรารถนาของคุณถูกส่งแล้ว!</p>
          <p className="mt-2 text-gray-700 italic">"{submittedWish}"</p>
          {/* 4. เพิ่มข้อความแจ้งผู้ใช้ */}
          <p className="text-sm text-pink-500 mt-4 animate-pulse">กำลังพาคุณไปสู่เซอร์ไพรส์...</p>
        </div>
      )}
    </section>
  )
}