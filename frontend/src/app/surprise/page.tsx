'use client'

import { useState } from 'react'
import ConfettiEffect from '@/components/ConfettiEffect'

export default function SurprisePage() {
  const [surprised, setSurprised] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      {!surprised ? (
        <button
          className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-600 transition"
          onClick={() => setSurprised(true)}
        >
          กดเพื่อเซอร์ไพรส์
        </button>
      ) : (
        <>
          <ConfettiEffect />
          <video
            src="/surprise-video.mp4"
            controls
            autoPlay
            className="w-full max-w-md rounded-lg shadow"
          />
        </>
      )}
    </div>
  )
}
