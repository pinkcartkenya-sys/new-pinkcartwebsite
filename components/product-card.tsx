"use client"

import type React from "react"
import { useState } from "react"

import Image from "next/image"
import { Heart, ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductModal } from "@/components/product-modal"
import { ImageViewer } from "@/components/image-viewer"
import { useCart } from "@/lib/cart-context"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image?: string
  images?: string[]
  joinedCount: number
  category: string
  description?: string
  features?: string[]
  inStock?: boolean
  [key: string]: any // Allow additional product properties
}

export function ProductCard({ id, name, price, originalPrice, image, images, joinedCount, category, ...productData }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { addToCart, isInCart } = useCart()
  
  const isAddedToCart = isInCart(id)

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  const handleJoinShipment = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  // Use the first image from images array, or fall back to image prop, or placeholder
  const displayImage = images && images.length > 0 ? images[0] : image || "/placeholder.svg"
  const displayImages = images && images.length > 0 ? images : image ? [image] : ["/placeholder.svg"]

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedImageIndex(0)
    setIsImageViewerOpen(true)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: id,
      name: name,
      price: price,
      originalPrice: originalPrice,
      image: displayImage,
      category: category,
    })
  }

  return (
    <>
      <Card className="group overflow-hidden responsive-card border-2 transition-all hover:shadow-lg cursor-pointer" onClick={handleCardClick}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={displayImage}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105 cursor-pointer"
            onClick={handleImageClick}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background h-8 w-8 sm:h-10 sm:w-10"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Badge className="absolute left-2 top-2 rounded-full bg-secondary text-secondary-foreground text-xs">
            {category}
          </Badge>
        </div>
        <CardContent className="p-3 sm:p-4">
          <h3 className="mb-2 line-clamp-2 font-medium text-balance text-sm sm:text-base">{name}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-fredoka)" }}>
              KSh {price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-xs sm:text-sm text-muted-foreground line-through">KSh {originalPrice.toLocaleString()}</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-3 sm:p-4 pt-0">
          <div className="flex gap-2 w-full">
            <Button 
              className="flex-1 rounded-full text-xs sm:text-sm" 
              size="lg" 
              onClick={handleJoinShipment}
            >
              Join Shipment
            </Button>
            <Button 
              variant={isAddedToCart ? "default" : "outline"}
              className={`flex-1 rounded-full text-xs sm:text-sm transition-all duration-300 ${
                isAddedToCart ? 'bg-green-500 hover:bg-green-600 text-white' : ''
              }`}
              size="lg" 
              onClick={handleAddToCart}
              disabled={isAddedToCart}
            >
              {isAddedToCart ? (
                <>
                  <Check className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>

      <ProductModal
        product={{
          _id: id,
          name,
          description: productData.description || '',
          price,
          originalPrice,
          images,
          image,
          category,
          joinedCount,
          features: productData.features,
          inStock: productData.inStock
        }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Image Viewer */}
      <ImageViewer
        images={displayImages}
        currentIndex={selectedImageIndex}
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
        onNavigate={setSelectedImageIndex}
      />
    </>
  )
}
