"use client"

import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, RotateCcw, AlertTriangle, CheckCircle, XCircle, MessageCircle, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function ReturnsPage() {
  const returnPolicy = [
    {
      title: "Return Eligibility",
      description: "Due to the group shipping nature of our service, returns are limited to specific circumstances:",
      items: [
        "Defective or damaged items upon arrival",
        "Significantly different items from what was ordered",
        "Wrong items received (our error)",
        "Items that don't match the product description"
      ],
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Not Eligible for Return",
      description: "The following situations do not qualify for returns:",
      items: [
        "Change of mind or personal preference",
        "Size issues (unless we sent the wrong size)",
        "Color preferences",
        "Items that don't fit your expectations",
        "Damages caused by misuse or accidents"
      ],
      icon: XCircle,
      color: "text-red-600"
    }
  ]

  const returnProcess = [
    {
      step: "01",
      title: "Contact Us",
      description: "Reach out within 48 hours of receiving your items. Include photos and order details.",
      icon: MessageCircle,
      color: "bg-primary/10 text-primary"
    },
    {
      step: "02",
      title: "Review & Approval",
      description: "We'll review your request and photos. Most requests are processed within 24 hours.",
      icon: CheckCircle,
      color: "bg-secondary/10 text-secondary"
    },
    {
      step: "03",
      title: "Return Arrangement",
      description: "If approved, we'll arrange for item collection or provide return instructions.",
      icon: RotateCcw,
      color: "bg-accent/10 text-accent"
    },
    {
      step: "04",
      title: "Resolution",
      description: "We'll provide a replacement, refund, or store credit based on availability and circumstances.",
      icon: CheckCircle,
      color: "bg-primary/10 text-primary"
    }
  ]

  const returnConditions = [
    {
      condition: "Time Limit",
      details: "Contact us within 48 hours of receiving your items",
      important: true
    },
    {
      condition: "Item Condition",
      details: "Items must be in original packaging and unused condition",
      important: true
    },
    {
      condition: "Documentation",
      details: "Provide clear photos showing the issue and your order number",
      important: true
    },
    {
      condition: "Return Shipping",
      details: "Return shipping costs may apply depending on the reason for return",
      important: false
    },
    {
      condition: "Processing Time",
      details: "Returns are processed within 5-7 business days after approval",
      important: false
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
              <RotateCcw className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
            Returns & Exchanges
          </h1>
          <p className="text-lg text-muted-foreground">
            Our return policy for group shipping orders
          </p>
        </div>
      </section>

      {/* Important Notice */}
      <section className="container section-padding">
        <Alert className="mx-auto max-w-4xl border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Important:</strong> Due to the group shipping nature of our service, returns are limited to specific circumstances. 
            Please read our policy carefully before making a purchase.
          </AlertDescription>
        </Alert>
      </section>

      {/* Return Policy */}
      <section className="container section-padding">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
            Return Policy
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {returnPolicy.map((policy, index) => (
            <Card key={index} className="border-2">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <policy.icon className={`h-6 w-6 ${policy.color}`} />
                  <h3 className="text-lg font-semibold">{policy.title}</h3>
                </div>
                <p className="mb-4 text-muted-foreground">{policy.description}</p>
                <ul className="space-y-2">
                  {policy.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm">
                      <div className={`mt-1 h-1.5 w-1.5 rounded-full ${policy.color === 'text-green-600' ? 'bg-green-500' : 'bg-red-500'} flex-shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Return Process */}
      <section className="container section-padding">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
            Return Process
          </h2>
          <p className="text-muted-foreground">
            If you need to return an item, here's what happens
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {returnProcess.map((step, index) => (
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

      {/* Return Conditions */}
      <section className="container section-padding">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
            Return Conditions
          </h2>
        </div>
        
        <Card className="mx-auto max-w-3xl border-2">
          <CardContent className="p-6">
            <div className="space-y-4">
              {returnConditions.map((condition, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    condition.important ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{condition.condition}</h4>
                    <p className="text-sm text-muted-foreground">{condition.details}</p>
                  </div>
                  {condition.important && (
                    <Badge variant="destructive">Important</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact for Returns */}
      <section className="container section-padding">
        <Card className="mx-auto max-w-2xl border-2 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="mb-2 text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
              Need to return an item?
            </h3>
            <p className="mb-6 text-muted-foreground">
              Contact us immediately with photos and your order details. We're here to help!
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
