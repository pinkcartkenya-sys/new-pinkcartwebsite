"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Mail, MapPin, MessageCircle, Phone, Send, Sparkles } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-transparent section-padding">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 sm:px-4">
              <MessageCircle className="h-4 w-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">We're Here to Help</span>
            </div>
            <h1 className="mb-4 responsive-heading font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
              Get in Touch
            </h1>
            <p className="responsive-text text-muted-foreground text-balance">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="container section-padding">
        <div className="mb-8 sm:mb-12 grid-responsive-3 gap-4 sm:gap-6">
          {[
            {
              icon: MessageCircle,
              title: "WhatsApp",
              description: "Chat with us instantly",
              contact: "+254 712 345 678",
              action: "Open WhatsApp",
              href: "https://wa.me/254712345678",
            },
            {
              icon: Mail,
              title: "Email",
              description: "Send us an email",
              contact: "hello@pinkcart.co.ke",
              action: "Send Email",
              href: "mailto:hello@pinkcart.co.ke",
            },
            {
              icon: Phone,
              title: "Phone",
              description: "Call us directly",
              contact: "+254 712 345 678",
              action: "Call Now",
              href: "tel:+254712345678",
            },
          ].map((method, index) => (
            <Card key={index} className="responsive-card border-2 text-center">
              <CardContent className="card-responsive">
                <div className="mx-auto mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10">
                  <method.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg sm:text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                  {method.title}
                </h3>
                <p className="mb-2 text-xs sm:text-sm text-muted-foreground">{method.description}</p>
                <p className="mb-4 text-sm sm:text-base font-medium">{method.contact}</p>
                <Button variant="outline" className="btn-responsive rounded-full bg-transparent" asChild>
                  <a href={method.href} target="_blank" rel="noopener noreferrer">
                    {method.action}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <Card className="responsive-card border-2">
            <CardContent className="card-responsive">
              <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="form-responsive">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="rounded-2xl text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="rounded-2xl text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="rounded-2xl text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="rounded-2xl text-sm"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full rounded-full text-sm sm:text-base">
                  Send Message
                  <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="responsive-card border-2 bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="card-responsive">
                <div className="mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg sm:text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Location
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Based in Nairobi, Kenya
                  <br />
                  Serving customers across Kenya
                </p>
              </CardContent>
            </Card>

            <Card className="responsive-card border-2">
              <CardContent className="card-responsive">
                <div className="mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-secondary/10">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
                </div>
                <h3 className="mb-2 text-lg sm:text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Business Hours
                </h3>
                <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="responsive-card border-2 bg-gradient-to-br from-accent/10 to-primary/10">
              <CardContent className="card-responsive">
                <h3 className="mb-3 text-lg sm:text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Quick Links
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <Link href="/how-it-works" className="text-muted-foreground hover:text-primary">
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-muted-foreground hover:text-primary">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping" className="text-muted-foreground hover:text-primary">
                      Shipping Information
                    </Link>
                  </li>
                  <li>
                    <Link href="/returns" className="text-muted-foreground hover:text-primary">
                      Returns & Refunds
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-b from-secondary/5 to-accent/5 section-padding">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 responsive-heading font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
              Join Our WhatsApp Community
            </h2>
            <p className="mb-6 sm:mb-8 responsive-text text-muted-foreground text-balance">
              Get live updates on shipments, exclusive deals, and connect with other shoppers
            </p>
            <Button size="lg" className="btn-responsive rounded-full" asChild>
              <a href="https://wa.me/254712345678" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Join WhatsApp Group
              </a>
            </Button>
          </div>
        </div>
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
              <h4 className="mb-4 font-semibold">Shop</h4>
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
