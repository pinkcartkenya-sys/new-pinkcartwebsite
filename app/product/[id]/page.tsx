"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Heart, Minus, Package, Plus, Share2, Sparkles, TrendingUp, Truck, Users, ZoomIn, Play, X, Loader2 } from "lucide-react"
import { useProduct } from "@/hooks/use-products"

const productData: Record<string, any> = {
  "1": {
    id: "1",
    name: "Cute Pink Desk Organizer Set",
    price: 1200,
    originalPrice: 2500,
    images: [
      "/pink-desk-organizer.jpg",
      "/pink-desk-organizer-front-view.jpg",
      "/pink-desk-organizer-side-view.jpg",
      "/pink-desk-organizer-compartments-detail.jpg",
      "/pink-desk-organizer-in-use-on-desk.jpg",
    ],
    video: "/desk-organizer-product-video-thumbnail.jpg",
    hasVideo: true,
    joinedCount: 34,
    category: "Dorm Essentials",
    description:
      "Transform your workspace into a cute and organized haven with this adorable pink desk organizer set. Includes multiple compartments for pens, sticky notes, and small accessories. Made from durable plastic with a matte finish.",
    features: [
      "5-piece organizer set",
      "Durable plastic construction",
      "Matte pink finish",
      "Multiple compartments",
      "Easy to clean",
      "Stackable design",
    ],
    shippingTime: "3-4 weeks after order closes",
    dimensions: "25cm x 15cm x 10cm",
    weight: "450g",
    material: "High-quality ABS plastic",
    quality: "Premium grade with smooth finish and sturdy construction",
  },
  "2": {
    id: "2",
    name: "Aesthetic LED Mirror with Hearts",
    price: 2800,
    originalPrice: 4500,
    images: [
      "/led-mirror-hearts.jpg",
      "/led-mirror-with-hearts-lit-up.jpg",
      "/led-mirror-brightness-settings.jpg",
      "/led-mirror-back-view-with-usb-port.jpg",
      "/led-mirror-on-vanity-table.jpg",
    ],
    video: "/led-mirror-demo-video-thumbnail.jpg",
    hasVideo: true,
    joinedCount: 28,
    category: "Girly Finds",
    description:
      "Light up your beauty routine with this stunning LED mirror featuring adorable heart-shaped lights. Perfect for makeup application, skincare routines, or just adding a dreamy glow to your room. USB-powered with adjustable brightness.",
    features: [
      "Adjustable LED brightness",
      "Heart-shaped light design",
      "USB-powered",
      "360° rotation",
      "Touch sensor controls",
      "High-definition reflection",
    ],
    shippingTime: "3-4 weeks after order closes",
    dimensions: "30cm x 25cm x 5cm",
    weight: "800g",
    material: "Glass mirror with ABS plastic frame",
    quality: "HD reflection with energy-efficient LED lights",
  },
  "3": {
    id: "3",
    name: "Kawaii Phone Accessories Bundle",
    price: 800,
    originalPrice: 1500,
    images: [
      "/kawaii-phone-accessories.jpg",
      "/kawaii-phone-case-pink.jpg",
      "/kawaii-pop-socket-designs.jpg",
      "/phone-accessories-bundle-contents.jpg",
      "/phone-with-kawaii-accessories.jpg",
    ],
    hasVideo: false,
    joinedCount: 45,
    category: "Tech & Accessories",
    description:
      "Complete kawaii phone accessory bundle including a cute phone case, pop socket, screen protector, and charging cable organizer. Mix and match to create your perfect aesthetic setup.",
    features: [
      "Silicone phone case",
      "Collapsible pop socket",
      "Tempered glass screen protector",
      "Cable organizer clips",
      "Compatible with most phones",
      "Scratch-resistant materials",
    ],
    shippingTime: "3-4 weeks after order closes",
    dimensions: "Varies by item",
    weight: "150g",
    material: "Silicone, tempered glass, plastic",
    quality: "Durable materials with cute designs that last",
  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { product, loading, error } = useProduct(id)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  const handleImageClick = () => {
    setIsZoomOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-6 sm:py-8">
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading product...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-6 sm:py-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error loading product</p>
              <Button asChild variant="outline">
                <Link href="/shop">Back to Shop</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-primary">
            Browse
          </Link>
          <span>/</span>
          <span className="text-foreground truncate">{product.name}</span>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            {/* Main Image Viewer */}
            <div className="relative aspect-square overflow-hidden responsive-card border-2 bg-muted">
              {isVideoPlaying && product.hasVideo ? (
                <div className="relative h-full w-full bg-black">
                  <video
                    className="h-full w-full object-contain"
                    controls
                    autoPlay
                    onEnded={() => setIsVideoPlaying(false)}
                  >
                    <source src={product.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                    onClick={() => setIsVideoPlaying(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <>
                  <Image
                    src={product.images[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover cursor-zoom-in"
                    onClick={handleImageClick}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-16 top-4 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                    onClick={handleImageClick}
                  >
                    <ZoomIn className="h-5 w-5" />
                  </Button>
                  <Badge className="absolute left-4 top-4 rounded-full bg-secondary text-secondary-foreground">
                    {product.category}
                  </Badge>
                </>
              )}
            </div>

            {/* Thumbnails with Video Option */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index)
                    setIsVideoPlaying(false)
                  }}
                  className={`relative aspect-square overflow-hidden responsive-card border-2 transition-all hover:border-primary ${
                    selectedImage === index && !isVideoPlaying
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
              {product.hasVideo && (
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className={`relative aspect-square overflow-hidden responsive-card border-2 transition-all hover:border-primary ${
                    isVideoPlaying ? "border-primary ring-2 ring-primary/20" : "border-border"
                  }`}
                >
                  <Image src={product.video || "/placeholder.svg"} alt="Product video" fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                      <Play className="h-5 w-5 fill-primary-foreground text-primary-foreground" />
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h1
                className="mb-3 text-balance responsive-heading font-bold"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {product.name}
              </h1>

              <div className="mb-4 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
                <span className="text-2xl sm:text-4xl font-bold text-primary" style={{ fontFamily: "var(--font-fredoka)" }}>
                  KSh {(product.price * quantity).toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg sm:text-xl text-muted-foreground line-through">
                    KSh {(product.originalPrice * quantity).toLocaleString()}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="rounded-full text-xs">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </Badge>
                <Badge variant="outline" className="rounded-full text-xs">
                  <Users className="mr-1 h-3 w-3" />
                  {product.joinedCount} joined
                </Badge>
              </div>
            </div>

            <Separator />

            <Card className="responsive-card border-2 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-primary" />
                  <div>
                    <h4 className="mb-2 text-sm sm:text-base font-semibold text-primary">Buyer Tips</h4>
                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      Delivery takes 3-4 weeks. Join this week's batch now and split shipping costs with the community -
                      the more friends who join, the less we all pay!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quantity Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <span className="text-sm sm:text-base font-semibold">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-transparent"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <span className="w-10 sm:w-12 text-center text-base sm:text-lg font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-transparent"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1 rounded-full text-sm sm:text-lg" style={{ fontFamily: "var(--font-fredoka)" }}>
                <Truck className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Join This Shipment
              </Button>
              <Button size="lg" variant="outline" className="rounded-full bg-transparent">
                <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="responsive-card bg-muted/50 p-3 sm:p-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span>
                  <strong className="text-foreground">{product.joinedCount} friends</strong> have joined this shipment
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
          {/* Description */}
          <Card className="responsive-card border-2">
            <CardContent className="card-responsive">
              <h2 className="mb-4 text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                Product Description
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{product.description}</p>
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card className="responsive-card border-2">
            <CardContent className="card-responsive">
              <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                Key Features
              </h2>
              <ul className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Dimensions & Quality Details */}
          <Card className="responsive-card border-2">
            <CardContent className="card-responsive">
              <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                Specifications & Quality
              </h2>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-sm sm:text-base font-semibold text-primary">Dimensions</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{product.dimensions}</p>
                </div>
                <div>
                  <h4 className="mb-2 text-sm sm:text-base font-semibold text-primary">Weight</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{product.weight}</p>
                </div>
                <div>
                  <h4 className="mb-2 text-sm sm:text-base font-semibold text-primary">Material</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{product.material}</p>
                </div>
                <div>
                  <h4 className="mb-2 text-sm sm:text-base font-semibold text-primary">Quality</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{product.quality}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Info */}
          <Card className="responsive-card border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="card-responsive">
              <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                Shipping Information
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm sm:text-base font-semibold">Estimated Delivery</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{product.shippingTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary/10">
                    <Package className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm sm:text-base font-semibold">Group Shipping</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      We split shipping costs among everyone in the shipment. More friends = lower costs for all of us!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent className="max-w-4xl p-0">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 p-3 sm:p-4">
            {product.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                  selectedImage === index ? "border-primary ring-2 ring-primary/20" : "border-border"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="mt-12 sm:mt-16 border-t py-8 sm:py-12">
        <div className="container">
          <div className="footer-responsive">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                  <Heart className="h-5 w-5 fill-primary-foreground text-primary-foreground" />
                </div>
                <span className="text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Pinkcart
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Making cute finds from China affordable through community group shipping.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Browse</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/shop?category=shoes" className="hover:text-primary">
                    Shoes
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=bags" className="hover:text-primary">
                    Bags
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=accessories" className="hover:text-primary">
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=organisers" className="hover:text-primary">
                    Organisers
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=journal" className="hover:text-primary">
                    Journal
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=cute-lighting" className="hover:text-primary">
                    Cute Lighting
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-primary">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/faq" className="hover:text-primary">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-primary">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-primary">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 border-t pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
            <p>&copy; 2025 Pinkcart. Made with love in Nairobi.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
