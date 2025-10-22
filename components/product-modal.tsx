"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Minus, Plus, Share2, X, ShoppingCart, Check } from "lucide-react"
import Image from "next/image"
import { ImageViewer } from "@/components/image-viewer"
import { useCart } from "@/lib/cart-context"

interface ProductModalProps {
  product: {
    _id: string
    name: string
    description: string
    price: number
    originalPrice?: number
    images?: string[]
    image?: string
    category: string
    joinedCount: number
    features?: string[]
    inStock?: boolean
  } | null
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false)
  const { addToCart, isInCart } = useCart()
  
  const isAddedToCart = isInCart(product._id)

  if (!product) return null

  // Get display images - use images array or fall back to single image
  const displayImages = product.images && product.images.length > 0 
    ? product.images 
    : product.image 
    ? [product.image] 
    : ["/placeholder.svg"]

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  const handleJoinShipment = () => {
    // Handle join shipment logic here
    console.log('Joining shipment for product:', product._id, 'quantity:', quantity)
    onClose()
  }

  const handleAddToCart = () => {
    // Add product to cart
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: displayImages[0],
        category: product.category,
      })
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 sm:space-y-8">
          {/* Product Images - Full Width on Top */}
          <div className="space-y-4">
            {/* Main Image - Bigger */}
            <div 
              className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setIsImageViewerOpen(true)}
            >
              <Image
                src={displayImages[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Badge className="absolute left-2 top-2 rounded-full bg-secondary text-secondary-foreground">
                {product.category}
              </Badge>
            </div>

            {/* Image Thumbnails */}
            {displayImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {displayImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-primary' 
                        : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details - Full Width Below */}
          <div className="space-y-4 sm:space-y-6">
            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-4xl font-bold text-primary" style={{ fontFamily: "var(--font-fredoka)" }}>
                KSh {(product.price * quantity).toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg sm:text-xl text-muted-foreground line-through">
                  KSh {(product.originalPrice * quantity).toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="mb-2 text-lg font-semibold">Description</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="mb-2 text-lg font-semibold">Features</h3>
                <ul className="space-y-1 text-sm sm:text-base text-muted-foreground">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>


            {/* Stock Status */}
            {product.inStock !== undefined && (
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="text-sm font-medium">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                className="flex-1 rounded-full" 
                size="lg"
                onClick={handleJoinShipment}
                disabled={product.inStock === false}
              >
                Join Shipment
              </Button>
              <Button 
                className={`flex-1 rounded-full transition-all duration-300 ${
                  isAddedToCart ? 'bg-green-500 hover:bg-green-600 text-white' : ''
                }`}
                size="lg"
                onClick={handleAddToCart}
                disabled={product.inStock === false || isAddedToCart}
                variant={isAddedToCart ? "default" : "outline"}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="rounded-full"
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Image Viewer */}
        <ImageViewer
          images={displayImages}
          currentIndex={selectedImageIndex}
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
          onNavigate={setSelectedImageIndex}
        />
      </DialogContent>
    </Dialog>
  )
}
