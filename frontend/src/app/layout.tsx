import './globals.css'
import BackgroundMusic from '@/components/BackgroundMusic'

export const metadata = {
  title: 'Surprise Birthday 🎉',
  description: 'A special birthday surprise built with Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 min-h-screen">
        <BackgroundMusic />
        {children}
      </body>
    </html>
  )
}
