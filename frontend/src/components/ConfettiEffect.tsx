'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// โหลด react-confetti แบบ dynamic เพื่อไม่ให้ SSR ล่ม
const Confetti = dynamic(() => import('react-confetti'), { ssr: false })

export default function ConfettiEffect() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(true)
    const timer = setTimeout(() => setActive(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return active ? <Confetti gravity={0.3} /> : null
}
