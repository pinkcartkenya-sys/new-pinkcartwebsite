"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

interface CountdownTimerProps {
  targetDate: Date
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex items-center justify-center gap-4 rounded-3xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-6">
      <Clock className="h-6 w-6 text-primary" />
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Shipment closes in:</span>
        <div className="flex gap-2">
          {[
            { value: timeLeft.days, label: "d" },
            { value: timeLeft.hours, label: "h" },
            { value: timeLeft.minutes, label: "m" },
            { value: timeLeft.seconds, label: "s" },
          ].map((item, index) => (
            <div key={index} className="flex items-baseline gap-1">
              <span className="text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
