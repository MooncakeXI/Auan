'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
// 1. Import ฟังก์ชันสำหรับเรียก API (สมมติว่าไฟล์อยู่ที่ lib/api.js)
import createWish from '../libs/createWish' 

const Confetti = dynamic(() => import('react-confetti'), { ssr: false })

export default function CelebrationSection() {
  const [blown, setBlown] = useState(false)
  const [wish, setWish] = useState('')
  const [submittedWish, setSubmittedWish] = useState<string | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // 2. เพิ่ม State สำหรับจัดการ Loading และ Error
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

  // 3. ปรับปรุงฟังก์ชัน handleSubmit ให้เรียก API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!wish.trim()) return

    setIsLoading(true)
    setError(null) // Reset error ทุกครั้งที่พยายามส่งใหม่

    try {
      // เตรียมข้อมูลที่จะส่งไปให้ Backend (ตาม WishSchema ที่มีแค่ text)
      const wishData = { text: wish.trim() }
      
      // เรียกใช้ API
      const response = await createWish(wishData)

      // เมื่อสำเร็จ, แสดงผลลัพธ์
      setSubmittedWish(response.data.text)
      setWish('')

    } catch (err) {
      // หากเกิดข้อผิดพลาด
      console.error('Failed to submit wish:', err)
      setError('ไม่สามารถส่งคำอวยพรได้ โปรดลองอีกครั้งในภายหลัง')
    } finally {
      // ไม่ว่าจะสำเร็จหรือล้มเหลว ให้หยุดการ loading
      setIsLoading(false)
    }
  }

  return (
    <section className="max-w-3xl mx-auto p-8 text-center space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Make a Wish!</h2>

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
            disabled={isLoading} // ปิดการใช้งาน textarea ขณะกำลังส่ง
          />
          <button
            type="submit"
            className="px-6 py-2 bg-pink-500 text-white font-medium rounded-lg shadow hover:bg-pink-600 transition disabled:bg-pink-300"
            disabled={isLoading} // 4. ปิดการใช้งานปุ่มขณะ loading
          >
            {isLoading ? 'กำลังส่ง...' : 'ส่งคำอวยพร'} 
          </button>
          
          {/* 4. แสดงข้อความ Error ถ้ามี */}
          {error && <p className="text-red-500 mt-2">{error}</p>}

        </form>
      )}

      {submittedWish && (
        <>
          <div className="fixed inset-0 pointer-events-none z-50">
            {dimensions.width > 0 && dimensions.height > 0 && (
              <Confetti
                width={dimensions.width}
                height={dimensions.height}
                numberOfPieces={300}
                gravity={0.2}
                recycle={false}
              />
            )}
          </div>

          <div className="mt-6 p-6 bg-pink-50 rounded-xl shadow-lg relative z-10">
            <p className="text-xl text-gray-800">🎉 ความปรารถนาของคุณถูกส่งแล้ว:</p>
            <p className="mt-2 text-gray-700 italic">"{submittedWish}"</p>
          </div>
        </>
      )}
    </section>
  )
}