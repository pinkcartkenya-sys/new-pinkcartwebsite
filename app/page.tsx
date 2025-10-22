"use client"

import { Header } from "@/components/header"
import { CountdownTimer } from "@/components/countdown-timer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Package, Sparkles, TrendingUp, Users, Loader2 } from "lucide-react"
import Link from "next/link"
import { useProducts } from "@/hooks/use-products"

export default function HomePage() {
  const shipmentDeadline = new Date()
  shipmentDeadline.setDate(shipmentDeadline.getDate() + 5)

  // Fetch featured products from database
  const { products: trendingProducts, loading: productsLoading, error: productsError } = useProducts({
    // NO FILTERS - Show ALL products from database
  })

  return (
    <div className="min-h-screen">
      <Header />

      <section className="container section-padding">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 sm:px-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">New Shipment Opening Soon</span>
          </div>

          <h1
            className="mb-4 sm:mb-6 responsive-heading font-bold tracking-tight text-balance"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Let&apos;s Ship Together
          </h1>

          <p className="mb-6 sm:mb-8 responsive-text text-muted-foreground text-balance">
            Cute Finds, Lower Shipping, Community Vibes
          </p>

          <p className="mb-6 sm:mb-8 text-base sm:text-lg text-muted-foreground text-balance">
            Together, we&apos;re making international shipping affordable for everyone.
          </p>

          <div className="mb-6 sm:mb-8 flex flex-col items-center gap-3 sm:gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="btn-responsive rounded-full" asChild>
              <Link href="/shop">
                <span className="hidden sm:inline">See What We&apos;re Shipping This Week</span>
                <span className="sm:hidden">Browse Products</span>
                <Package className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="btn-responsive rounded-full bg-transparent" asChild>
              <Link href="/how-it-works">How It Works</Link>
            </Button>
          </div>

          <CountdownTimer targetDate={shipmentDeadline} />
        </div>
      </section>

      <section className="border-y bg-muted/30 py-6 sm:py-8">
        <div className="container">
          <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:flex-row md:gap-12">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                  120+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Friends Joined Last Shipment</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-secondary/10">
                <Package className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                  50+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Cute Finds Available</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-accent/10">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                  60%
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Average Savings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-padding">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="mb-3 responsive-heading font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
            Trending This Week
          </h2>
          <p className="responsive-text text-muted-foreground">Everyone&apos;s loving these - join before they close</p>
        </div>

        {productsLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading trending products...</span>
            </div>
          </div>
        ) : productsError ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error loading products</p>
              <Button asChild variant="outline">
                <Link href="/shop">Browse All Products</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid-responsive-3 gap-4 sm:gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product._id || product.id} id={product._id || product.id} {...product} />
            ))}
          </div>
        )}

        <div className="mt-6 sm:mt-8 text-center">
          <Button size="lg" variant="outline" className="btn-responsive rounded-full bg-transparent" asChild>
            <Link href="/shop">See All Finds</Link>
          </Button>
        </div>
      </section>

      <section className="bg-gradient-to-b from-primary/5 to-secondary/5 section-padding">
        <div className="container">
          <div className="mb-8 sm:mb-12 text-center">
            <h2 className="mb-3 responsive-heading font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
              How It Works
            </h2>
            <p className="responsive-text text-muted-foreground">Three simple steps to save on shipping</p>
          </div>

          <div className="grid-responsive-3 gap-6 sm:gap-8">
            {[
              {
                icon: Heart,
                title: "Pick Your Favorites",
                description: "Browse our curated collection of cute finds from China and add items to your cart.",
                step: "01",
              },
              {
                icon: Users,
                title: "Join the Group",
                description: "Pay for your items and join others in the group shipment to split shipping costs.",
                step: "02",
              },
              {
                icon: Package,
                title: "Receive Your Order",
                description: "Get your items delivered in 3-4 weeks after the shipment closes. Track every step!",
                step: "03",
              },
            ].map((step, index) => (
              <Card key={index} className="relative overflow-hidden responsive-card border-2">
                <CardContent className="card-responsive">
                  <div
                    className="absolute right-3 top-3 sm:right-4 sm:top-4 text-4xl sm:text-6xl font-bold text-primary/10"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {step.step}
                  </div>
                  <div className="relative mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10">
                    <step.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  </div>
                  <h3 className="mb-3 text-lg sm:text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <Button size="lg" className="btn-responsive rounded-full" asChild>
              <Link href="/how-it-works">
                Learn More
                <Sparkles className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t py-8 sm:py-12">
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
                  <Link href="/shop?category=girly" className="hover:text-primary">
                    Girly Finds
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=dorm" className="hover:text-primary">
                    Dorm Essentials
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=tech" className="hover:text-primary">
                    Tech & Accessories
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
