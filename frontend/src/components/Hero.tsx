// Hero.tsx
import Image from 'next/image'

interface HeroProps {
  name: string
  imageUrl: string
  className?: string  // เพิ่มตัวเลือกนี้
}

export default function Hero({ name, imageUrl, className }: HeroProps) {
  return (
    <div className={`relative h-96 overflow-hidden ${className ?? ''}`}>
      <Image
        src={imageUrl}
        alt="Hero Background"
        fill
        className="object-cover brightness-75"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl">
          Happy Birthday, <span className="text-pink-300">{name}</span>!
        </h1>
      </div>
    </div>
  )
}
