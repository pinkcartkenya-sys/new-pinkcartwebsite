"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, X, Sparkles } from "lucide-react"
import { Product } from "@/lib/models"

interface JoinNotificationProps {
  isVisible: boolean
  onClose: () => void
  product: Product | null
}

const notificationMessages = [
  "A girlie just joined!",
  "Someone just joined the shipment!",
  "New member joined!",
  "Another person joined!",
  "Someone just added this to their cart!",
  "New shipment member!",
  "Someone just joined the group!"
]

export function JoinNotification({ isVisible, onClose, product }: JoinNotificationProps) {
  if (!isVisible || !product) return null

  const randomMessage = notificationMessages[Math.floor(Math.random() * notificationMessages.length)]

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <Card className="w-64 border-2 bg-gradient-to-r from-green-50 to-blue-50 shadow-lg rounded-2xl">
        <CardContent className="py-1 px-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-800 leading-tight">
              A girlie just joined a shipment for <span className="font-bold text-gray-900">{product.name}</span> 💖
            </p>
            <Button
              size="sm"
              variant="ghost"
              className="h-3 w-3 p-0 ml-1"
              onClick={onClose}
            >
              <X className="h-1.5 w-1.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
