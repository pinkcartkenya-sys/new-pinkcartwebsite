import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heart, Package, ShoppingCart, Sparkles, TrendingDown, Truck, Users } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  const faqs = [
    {
      question: "Why is it cheaper?",
      answer:
        "By combining multiple orders into one shipment, we split the shipping costs among all buyers. Instead of paying full shipping for a single item, you only pay a fraction of the total shipping cost. The more people who join, the lower the cost for everyone!",
    },
    {
      question: "How long does shipping take?",
      answer:
        "After the order closes, it typically takes 3-4 weeks for your items to arrive. This includes processing time in China, international shipping, customs clearance in Kenya, and final delivery to you. We provide tracking updates throughout the journey.",
    },
    {
      question: "What happens if the shipment is delayed?",
      answer:
        "While delays are rare, they can happen due to customs or logistics issues. We'll keep you updated via WhatsApp and email throughout the process. If there's a significant delay, we'll provide regular updates and work to resolve any issues as quickly as possible.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "If an item arrives damaged or significantly different from the description, we offer a full refund or replacement. You must report issues within 7 days of delivery with photos. Refunds for change of mind are not available once the shipment has closed, as we've already placed the order.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes! Once your order is shipped, you'll receive a tracking number. You can also check your order status in your account dashboard, which shows whether your order is processing, in China, on the way, cleared in Kenya, or out for delivery.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept M-Pesa, credit/debit cards, and PayPal. Payment is required when you join a shipment to secure your spot. All payments are processed securely through our payment partners.",
    },
    {
      question: "How do I know if a product is good quality?",
      answer:
        "We carefully curate all products and work with trusted suppliers. Many items include customer reviews and photos from previous shipments. We also test popular items ourselves before adding them to the store.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "You can cancel your order before the shipment closes for a full refund. Once the shipment closes and we've placed the order with our suppliers, cancellations are no longer possible as the items have been purchased.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-transparent section-padding">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 sm:px-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">Simple & Transparent</span>
            </div>
            <h1 className="mb-4 responsive-heading font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
              How Pinkcart Works
            </h1>
            <p className="responsive-text text-muted-foreground text-balance">
              Group buying made simple. Save money by shipping together with our community.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="container section-padding">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="mb-3 responsive-heading font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
            Three Simple Steps
          </h2>
          <p className="responsive-text text-muted-foreground">From browsing to delivery, here's how it works</p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-secondary to-accent lg:block" />

          <div className="space-y-8 sm:space-y-12">
            {[
              {
                step: "01",
                icon: ShoppingCart,
                title: "Browse & Pick Your Favorites",
                description:
                  "Explore our curated collection of cute finds from China. Each product shows how many people have already joined the order and the savings you'll get from group shipping. Add items to your cart and proceed to checkout.",
                details: [
                  "Browse by category: Girly Finds, Dorm Essentials, Tech & Accessories",
                  "See real-time updates on how many people joined each order",
                  "Check the countdown timer to see when the shipment closes",
                  "Read product descriptions and customer reviews",
                ],
                color: "primary",
              },
              {
                step: "02",
                icon: Users,
                title: "Pay & Join the Group Shipment",
                description:
                  "Complete your payment to secure your spot in the group shipment. Your items are reserved, and you'll be added to our WhatsApp group for live updates. The more people who join, the lower the shipping cost for everyone!",
                details: [
                  "Pay securely via M-Pesa, card, or PayPal",
                  "Get instant confirmation and order number",
                  "Join our WhatsApp community for updates",
                  "Track the shipment progress in real-time",
                ],
                color: "secondary",
              },
              {
                step: "03",
                icon: Package,
                title: "Receive Your Order",
                description:
                  "After the shipment closes, we place the bulk order and ship everything together. You'll receive tracking updates as your items travel from China to Kenya. Delivery typically takes 3-4 weeks from when the order closes.",
                details: [
                  "Get tracking number once shipped from China",
                  "Receive updates at each stage: processing, in transit, customs, delivery",
                  "Choose pickup point or home delivery",
                  "Unbox your cute finds and share on social media!",
                ],
                color: "accent",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <Card
                  className={`mx-auto max-w-4xl overflow-hidden responsive-card border-2 ${
                    index % 2 === 0 ? "lg:mr-auto lg:ml-0" : "lg:ml-auto lg:mr-0"
                  }`}
                >
                  <CardContent className="p-6 sm:p-8 lg:p-12">
                    <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-start lg:gap-8">
                      <div className="flex-shrink-0">
                        <div className={`flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-${step.color}/10`}>
                          <step.icon className={`h-8 w-8 sm:h-10 sm:w-10 text-${step.color}`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div
                          className="mb-2 text-3xl sm:text-5xl font-bold text-primary/10"
                          style={{ fontFamily: "var(--font-fredoka)" }}
                        >
                          {step.step}
                        </div>
                        <h3 className="mb-3 text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                          {step.title}
                        </h3>
                        <p className="mb-4 sm:mb-6 text-sm sm:text-base text-muted-foreground leading-relaxed">{step.description}</p>
                        <ul className="space-y-2">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Sparkles className="mt-0.5 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 text-primary" />
                              <span className="text-xs sm:text-sm text-muted-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-y bg-gradient-to-b from-secondary/5 to-accent/5 section-padding">
        <div className="container">
          <div className="mb-8 sm:mb-12 text-center">
            <h2 className="mb-3 responsive-heading font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
              Why Choose Pinkcart?
            </h2>
            <p className="responsive-text text-muted-foreground">More than just savings</p>
          </div>

          <div className="grid-responsive-3 gap-4 sm:gap-6">
            {[
              {
                icon: TrendingDown,
                title: "Save Up to 60%",
                description: "Split shipping costs with the community and save significantly on every order.",
              },
              {
                icon: Users,
                title: "Community Vibes",
                description: "Join our WhatsApp group, share finds, and connect with other shoppers.",
              },
              {
                icon: Sparkles,
                title: "Curated Selection",
                description: "We handpick cute, quality items so you don't have to search through thousands.",
              },
              {
                icon: Truck,
                title: "Reliable Shipping",
                description: "Track your order every step of the way from China to your doorstep.",
              },
              {
                icon: Heart,
                title: "Customer Support",
                description: "We're here to help via WhatsApp, email, or phone throughout your journey.",
              },
              {
                icon: Package,
                title: "Quality Guaranteed",
                description: "Full refund or replacement if items arrive damaged or not as described.",
              },
            ].map((benefit, index) => (
              <Card key={index} className="responsive-card border-2">
                <CardContent className="card-responsive">
                  <div className="mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10">
                    <benefit.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-base sm:text-lg font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container section-padding">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 sm:mb-12 text-center">
            <h2 className="mb-3 responsive-heading font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
              Frequently Asked Questions
            </h2>
            <p className="responsive-text text-muted-foreground">Everything you need to know about Pinkcart</p>
          </div>

          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="responsive-card border-2 bg-card px-4 sm:px-6 data-[state=open]:bg-muted/30"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-b from-primary/5 to-secondary/5 section-padding">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 responsive-heading font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
              Ready to Start Saving?
            </h2>
            <p className="mb-6 sm:mb-8 responsive-text text-muted-foreground text-balance">
              Join our community and discover cute finds at unbeatable prices
            </p>
            <div className="flex flex-col items-center gap-3 sm:gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="btn-responsive rounded-full" asChild>
                <Link href="/shop">
                  Browse Products
                  <Sparkles className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="btn-responsive rounded-full bg-transparent" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
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
