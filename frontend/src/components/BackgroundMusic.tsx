'use client'

import { useRef, useState } from 'react'

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        // เล่นเพลงไม่ได้ อาจเพราะโดนบล็อก
        setIsPlaying(false)
      })
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/birthday-song.mp3" loop />
      <button
        onClick={togglePlay}
        className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-pink-500 text-white rounded shadow"
      >
        {isPlaying ? 'ปิดเพลง' : 'เปิดเพลง'}
      </button>
    </>
  )
}
