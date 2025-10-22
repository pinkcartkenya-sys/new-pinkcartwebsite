"use client"

import { useState, useEffect, useCallback } from 'react'
import { Product } from '@/lib/models'

interface JoinNotification {
  id: string
  product: Product
  timestamp: number
}

export function useJoinNotifications(products: Product[]) {
  const [notifications, setNotifications] = useState<JoinNotification[]>([])
  const [currentNotification, setCurrentNotification] = useState<JoinNotification | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Notification intervals in milliseconds
  const intervals = [3000, 10000, 40000, 43000, 60000, 180000, 300000] // 3s, 10s, 40s, 43s, 1m, 3m, 5m
  
  // Add some randomness to make it feel more natural
  const getRandomDelay = (baseInterval: number) => {
    return baseInterval + Math.random() * 2000 - 1000 // ±1 second variation
  }

  const getRandomProduct = useCallback(() => {
    if (products.length === 0) return null
    const randomIndex = Math.floor(Math.random() * products.length)
    return products[randomIndex]
  }, [products])

  const createNotification = useCallback(() => {
    const product = getRandomProduct()
    if (!product) return

    const notification: JoinNotification = {
      id: `notification-${Date.now()}-${Math.random()}`,
      product: {
        ...product,
        joinedCount: product.joinedCount + Math.floor(Math.random() * 3) + 1 // Add 1-3 to joined count
      },
      timestamp: Date.now()
    }

    setNotifications(prev => [...prev, notification])
    setCurrentNotification(notification)
    setIsVisible(true)
  }, [getRandomProduct])

  const closeNotification = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      setCurrentNotification(null)
    }, 300) // Wait for animation to complete
  }, [])

  useEffect(() => {
    if (products.length === 0) return

    let timeoutIds: NodeJS.Timeout[] = []

    // Schedule notifications at the specified intervals with some randomness
    intervals.forEach((interval, index) => {
      const randomDelay = getRandomDelay(interval)
      const timeoutId = setTimeout(() => {
        createNotification()
      }, randomDelay)
      timeoutIds.push(timeoutId)
    })

    // Cleanup timeouts on unmount
    return () => {
      timeoutIds.forEach(id => clearTimeout(id))
    }
  }, [products, createNotification])

  // Auto-close notification after 5 seconds
  useEffect(() => {
    if (isVisible && currentNotification) {
      const autoCloseTimeout = setTimeout(() => {
        closeNotification()
      }, 5000)

      return () => clearTimeout(autoCloseTimeout)
    }
  }, [isVisible, currentNotification, closeNotification])

  return {
    currentNotification,
    isVisible,
    closeNotification,
    notifications
  }
}
