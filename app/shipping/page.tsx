"use client"

import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Truck, Clock, Shield, MapPin, Package, MessageCircle, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function ShippingPage() {
  const shippingSteps = [
    {
      step: "01",
      title: "Join Group Shipment",
      description: "Browse products and add items to your cart. Pay via M-Pesa to secure your spot in the group shipment.",
      icon: Package,
      color: "bg-primary/10 text-primary"
    },
    {
      step: "02", 
      title: "Shipment Closes",
      description: "Once the deadline is reached, we place the bulk order with suppliers in China. You'll receive confirmation via WhatsApp.",
      icon: Clock,
      color: "bg-secondary/10 text-secondary"
    },
    {
      step: "03",
      title: "Processing in China",
      description: "Items are processed, packaged, and prepared for international shipping. This typically takes 3-5 business days.",
      icon: Truck,
      color: "bg-accent/10 text-accent"
    },
    {
      step: "04",
      title: "International Shipping",
      description: "Your items are shipped from China to Kenya via air freight. You'll receive a tracking number to monitor progress.",
      icon: Shield,
      color: "bg-primary/10 text-primary"
    },
    {
      step: "05",
      title: "Customs Clearance",
      description: "Items go through customs clearance in Kenya. We handle all documentation and duties on your behalf.",
      icon: MapPin,
      color: "bg-secondary/10 text-secondary"
    },
    {
      step: "06",
      title: "Delivery",
      description: "Choose between home delivery or pickup from our collection points. You'll be notified when items are ready.",
      icon: Package,
      color: "bg-accent/10 text-accent"
    }
  ]

  const shippingInfo = [
    {
      title: "Shipping Timeline",
      details: [
        "Shipment closes: Varies by product (check countdown timer)",
        "Processing in China: 3-5 business days",
        "International shipping: 7-14 days",
        "Customs clearance: 2-5 business days",
        "Total delivery time: 3-4 weeks from shipment close"
      ]
    },
    {
      title: "Shipping Costs",
      details: [
        "Group shipping rates: KSh 200-500 per item (vs KSh 1,500+ individual shipping)",
        "Home delivery: KSh 200-500 (depending on location)",
        "Pickup points: Free",
        "Insurance: Included in shipping cost",
        "Customs duties: Handled by us (included in product price)"
      ]
    },
    {
      title: "Delivery Options",
      details: [
        "Home delivery: Available in Nairobi and surrounding areas",
        "Pickup points: Multiple locations across Nairobi",
        "Delivery time: 1-3 business days after customs clearance",
        "Notification: WhatsApp and email updates at each stage",
        "ID required: Valid government-issued ID for collection"
      ]
    }
  ]

  const trackingStages = [
    {
      stage: "Order Confirmed",
      description: "Your payment has been received and your spot is secured",
      status: "completed"
    },
    {
      stage: "Processing in China", 
      description: "Items are being prepared and packaged by suppliers",
      status: "completed"
    },
    {
      stage: "Shipped from China",
      description: "Items are on their way to Kenya via air freight",
      status: "in-progress"
    },
    {
      stage: "Arrived in Kenya",
      description: "Items have arrived and are going through customs",
      status: "pending"
    },
    {
      stage: "Ready for Collection",
      description: "Items are ready for pickup or delivery",
      status: "pending"
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="container section-padding text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Truck className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
            Shipping Information
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about our group shipping process
          </p>
        </div>
      </section>

      {/* Shipping Process */}
      <section className="container section-padding">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
            How Our Shipping Works
          </h2>
          <p className="text-muted-foreground">
            From order to delivery, here's what happens with your items
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shippingSteps.map((step, index) => (
            <Card key={index} className="border-2 text-center">
              <CardContent className="p-6">
                <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${step.color}`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="mb-2 text-sm font-bold text-primary">{step.step}</div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Shipping Details */}
      <section className="container section-padding">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
            Shipping Details
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {shippingInfo.map((info, index) => (
            <Card key={index} className="border-2">
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">{info.title}</h3>
                <ul className="space-y-2">
                  {info.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-2 text-sm">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tracking Example */}
      <section className="container section-padding">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
            Track Your Order
          </h2>
          <p className="text-muted-foreground">
            You'll receive updates at each stage of your shipment
          </p>
        </div>
        
        <Card className="mx-auto max-w-2xl border-2">
          <CardContent className="p-6">
            <div className="space-y-4">
              {trackingStages.map((stage, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    stage.status === 'completed' ? 'bg-green-500 text-white' :
                    stage.status === 'in-progress' ? 'bg-blue-500 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{stage.stage}</h4>
                    <p className="text-sm text-muted-foreground">{stage.description}</p>
                  </div>
                  <Badge variant={
                    stage.status === 'completed' ? 'default' :
                    stage.status === 'in-progress' ? 'secondary' :
                    'outline'
                  }>
                    {stage.status === 'completed' ? 'Completed' :
                     stage.status === 'in-progress' ? 'In Progress' :
                     'Pending'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact CTA */}
      <section className="container section-padding">
        <Card className="mx-auto max-w-2xl border-2 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="mb-2 text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
              Questions about shipping?
            </h3>
            <p className="mb-6 text-muted-foreground">
              Our team is here to help with any shipping questions you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="https://wa.me/254794269051" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-2 text-white hover:bg-green-600 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </div>
              </Link>
              <Link href="mailto:pinkcartkenya@gmail.com">
                <div className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors">
                  <Mail className="h-4 w-4" />
                  Email
                </div>
              </Link>
              <Link href="tel:+254794269051">
                <div className="flex items-center justify-center gap-2 rounded-full bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/90 transition-colors">
                  <Phone className="h-4 w-4" />
                  Call
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
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
