"use client"

import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heart, HelpCircle, MessageCircle, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "What is Pinkcart?",
          answer: "Pinkcart is a group shipping service that makes cute finds from China affordable for Kenyans. We organize group shipments where multiple people order together, reducing shipping costs for everyone."
        },
        {
          question: "How does group shipping work?",
          answer: "When you join a group shipment, your items are combined with other orders and shipped together from China to Kenya. This significantly reduces individual shipping costs compared to ordering alone."
        },
        {
          question: "Is Pinkcart legitimate?",
          answer: "Yes! We're a registered business in Kenya with a proven track record of successful shipments. We provide tracking numbers, insurance, and full transparency throughout the process."
        }
      ]
    },
    {
      category: "Ordering & Payment",
      questions: [
        {
          question: "How do I place an order?",
          answer: "Browse our products, add items to your cart, and proceed to checkout. You can pay via M-Pesa to secure your spot in the group shipment."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We currently accept M-Pesa payments. This ensures fast and secure transactions for all our customers."
        },
        {
          question: "When do I need to pay?",
          answer: "Payment is required when you join a group shipment. Your spot is only secured once payment is confirmed. The sooner you pay, the more likely you are to get your items in the current shipment."
        },
        {
          question: "Can I cancel my order?",
          answer: "You can cancel your order before the shipment closes. Once the shipment is closed and orders are placed with suppliers, cancellations are not possible due to the group nature of our service."
        }
      ]
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "From when the shipment closes, it typically takes 3-4 weeks to receive your items. This includes processing time in China, international shipping, and customs clearance in Kenya."
        },
        {
          question: "How will I track my order?",
          answer: "You'll receive a tracking number once your items are shipped from China. We'll also keep you updated via WhatsApp and email at each stage of the journey."
        },
        {
          question: "Where do I collect my items?",
          answer: "You can choose between home delivery (additional fee) or pickup from our designated collection points in Nairobi. We'll notify you when your items arrive."
        },
        {
          question: "What if my items are damaged?",
          answer: "We provide insurance for all shipments. If items arrive damaged, please contact us immediately with photos. We'll work with you to resolve the issue, including replacements or refunds where applicable."
        }
      ]
    },
    {
      category: "Group Shipments",
      questions: [
        {
          question: "What happens if not enough people join a shipment?",
          answer: "We have a minimum threshold for each shipment. If not enough people join, we'll either extend the deadline or refund your payment. We'll keep you informed throughout the process."
        },
        {
          question: "Can I see how many people have joined my shipment?",
          answer: "Yes! Each product page shows the current number of people who have joined that specific shipment, so you can see the progress in real-time."
        },
        {
          question: "What if I miss the shipment deadline?",
          answer: "If you miss the deadline, your items will be added to the next available shipment. We'll notify you of the new timeline and keep your order secure."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          question: "Can I return items?",
          answer: "Due to the group shipping nature, returns are limited. We can only accept returns for defective or significantly different items. Please contact us within 48 hours of receiving your items."
        },
        {
          question: "What if I receive the wrong item?",
          answer: "If you receive the wrong item, please contact us immediately with photos. We'll arrange for the correct item to be sent in the next shipment at no extra cost to you."
        },
        {
          question: "Can I exchange sizes or colors?",
          answer: "Exchanges are possible if we have the requested size/color available. There may be additional shipping costs for exchanges, which we'll discuss with you beforehand."
        }
      ]
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
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our group shipping service
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="container section-padding">
        <div className="mx-auto max-w-4xl">
          {faqs.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              <h2 className="mb-6 text-2xl font-bold text-center" style={{ fontFamily: "var(--font-fredoka)" }}>
                {section.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {section.questions.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${sectionIndex}-${index}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left font-medium hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
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
              Still have questions?
            </h3>
            <p className="mb-6 text-muted-foreground">
              Our team is here to help! Reach out to us anytime.
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
