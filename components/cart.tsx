"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, ShoppingCart, Trash2, X, Heart, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"

export function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const handleQuantityChange = (id: string, delta: number) => {
    const item = items.find(item => item.id === id)
    if (item) {
      const newQuantity = item.quantity + delta
      updateQuantity(id, newQuantity)
    }
  }

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
    console.log('Proceeding to checkout with items:', items)
    alert('Checkout functionality will be implemented soon!')
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative hover:bg-primary/10 transition-colors">
          <ShoppingCart className="h-4 w-4" />
          {getTotalItems() > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground animate-pulse">
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md lg:max-w-lg p-0">
        {/* Beautiful Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                    Your PinkCart
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              {getTotalItems() > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center max-w-sm">
                <div className="relative mb-6">
                  <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <ShoppingCart className="h-10 w-10 text-primary/60" />
                  </div>
                  <div className="absolute -top-1 -right-1">
                    <Heart className="h-6 w-6 text-pink-500 animate-bounce" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground mb-4">
                  Add some cute finds to get started! ✨
                </p>
                <Button 
                  onClick={() => setIsOpen(false)}
                  className="rounded-full"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Start Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items - Beautiful Design */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-4">
                  {items.map((item, index) => (
                    <div key={item.id} className="group relative">
                      <div className="flex gap-4 p-4 rounded-2xl border-2 border-transparent hover:border-primary/20 transition-all duration-300 bg-gradient-to-r from-background to-muted/30">
                        {/* Product Image */}
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-xl bg-muted flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm sm:text-base line-clamp-2 group-hover:text-primary transition-colors">
                                {item.name}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 bg-muted rounded-full p-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 hover:bg-primary/10"
                                  onClick={() => handleQuantityChange(item.id, -1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 hover:bg-primary/10"
                                  onClick={() => handleQuantityChange(item.id, 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-sm font-medium text-primary">
                                KSh {(item.price * item.quantity).toLocaleString()}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-xs text-muted-foreground">
                                  KSh {item.price.toLocaleString()} each
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beautiful Footer */}
              <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t">
                <div className="p-6 space-y-4">
                  <Separator />
                  
                  {/* Total Summary */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-fredoka)" }}>
                        KSh {getTotalPrice().toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} • Free shipping on orders over KSh 5,000
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={handleCheckout}
                      className="w-full rounded-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
                      size="lg"
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      Proceed to Checkout
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                      className="w-full rounded-full h-10"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
