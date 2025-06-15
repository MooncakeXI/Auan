// frontend/src/app/layout.tsx

import './globals.css'
import BackgroundMusic from '@/components/BackgroundMusic'
import Header from '@/components/Header' // 1. Import Header เข้ามา

export const metadata = {
  title: 'Surprise Birthday 🎉',
  description: 'A special birthday surprise built with Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 min-h-screen">
        <Header /> {/* 2. เพิ่ม Header ไว้บนสุดของ body */}
        <BackgroundMusic />
        <main>{children}</main>
      </body>
    </html>
  )
}