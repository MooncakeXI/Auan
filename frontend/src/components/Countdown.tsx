// src/components/Countdown.tsx
'use client'
import { useState, useEffect } from 'react'

interface CountdownProps {
    targetDate: string
    onComplete?: () => void
}

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

function calculate(diff: number): TimeLeft {
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    }
}

export default function Countdown({ targetDate, onComplete }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
        calculate(+new Date(targetDate) - +new Date())
    )

    useEffect(() => {
        const interval = setInterval(() => {
            const diff = +new Date(targetDate) - +new Date()
            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                if (onComplete) onComplete()
                clearInterval(interval)
            } else {
                setTimeLeft(calculate(diff))
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [targetDate, onComplete])

    const units = ['days', 'hours', 'minutes', 'seconds'] as const

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {units.map((unit) => (
                <div
                    key={unit}
                    className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl p-4 shadow-lg"
                >
                    <div className="text-3xl sm:text-4xl font-bold text-gray-800">{timeLeft[unit]}</div>
                    <div className="uppercase text-xs sm:text-sm text-gray-600">{unit}</div>
                </div>
            ))}
        </div>

    )
}
