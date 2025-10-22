"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, Sparkles, ArrowRight, Loader2 } from "lucide-react"
import Image from "next/image"

interface OrderFormProps {
  isOpen: boolean
  onClose: () => void
  items: any[]
  totalPrice: number
  totalItems: number
}

export function OrderForm({ isOpen, onClose, items, totalPrice, totalItems }: OrderFormProps) {
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create order object
      const order = {
        customerName,
        customerPhone,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          category: item.category
        })),
        totalPrice,
        totalItems,
        status: 'pending',
        createdAt: new Date().toISOString()
      }

      // Save to database
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      })

      if (!response.ok) {
        throw new Error('Failed to save order')
      }

      const savedOrder = await response.json()

      // Create WhatsApp message
      const whatsappMessage = createWhatsAppMessage(savedOrder.data)
      
      // Redirect to WhatsApp
      const whatsappUrl = `https://wa.me/254794269051?text=${encodeURIComponent(whatsappMessage)}`
      window.open(whatsappUrl, '_blank')
      
      // Close form
      onClose()
      
    } catch (error) {
      console.error('Error saving order:', error)
      alert('Failed to save order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const createWhatsAppMessage = (order: any) => {
    let message = `🛍️ *New Order from Pinkcart*\n\n`
    message += `👤 *Customer:* ${order.customerName}\n`
    message += `📱 *Phone:* ${order.customerPhone}\n`
    message += `📦 *Items:* ${order.totalItems}\n`
    message += `💰 *Total:* KSh ${order.totalPrice.toLocaleString()}\n\n`
    message += `*Order Details:*\n`
    
    order.items.forEach((item: any, index: number) => {
      message += `${index + 1}. ${item.name} x${item.quantity} - KSh ${(item.price * item.quantity).toLocaleString()}\n`
    })
    
    message += `\n📋 *Order ID:* ${order._id}\n`
    message += `⏰ *Order Time:* ${new Date(order.createdAt).toLocaleString()}\n\n`
    message += `Please confirm this order and provide shipping details. Thank you! 💖`
    
    return message
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                Complete Your Order
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Your Name *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+254 712 345 678"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Order Summary */}
          <Card className="border-2">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 overflow-hidden rounded-lg bg-muted flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">
                      KSh {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-lg font-bold text-primary">
                  KSh {totalPrice.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !customerName || !customerPhone}
            className="w-full rounded-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Send to WhatsApp
                <ArrowRight className="h-5 w-5 ml-2" />
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Your order will be sent to our WhatsApp for confirmation
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
