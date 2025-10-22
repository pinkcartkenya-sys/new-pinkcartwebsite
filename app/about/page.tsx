import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Package, Sparkles, Target, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-transparent section-padding">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 sm:px-4">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">Our Story</span>
            </div>
            <h1 className="mb-4 responsive-heading font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
              About Pinkcart
            </h1>
            <p className="responsive-text text-muted-foreground text-balance">
              Making cute finds from China affordable for everyone through the power of community
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="container section-padding">
        <div className="mx-auto max-w-4xl">
          <Card className="overflow-hidden responsive-card border-2">
            <CardContent className="p-0">
              <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
                <div className="relative aspect-square md:aspect-auto">
                  <Image src="/founder-elvy.jpg" alt="Elvy, Founder of Pinkcart" fill className="object-cover" />
                </div>
                <div className="p-6 sm:p-8 md:p-12">
                  <h2 className="mb-4 text-2xl sm:text-3xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                    Hi, I'm Elvy!
                  </h2>
                  <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    <p>
                      I started Pinkcart because I was tired of paying crazy expensive shipping fees for cute items from
                      China. As a student in Nairobi, I loved browsing online stores but the shipping costs were often
                      more than the products themselves!
                    </p>
                    <p>
                      One day, I had an idea: what if we could ship together? I reached out to friends who also wanted
                      to order, and we combined our purchases into one shipment. The savings were incredible - we each
                      paid a fraction of what we would have paid individually.
                    </p>
                    <p>
                      That's how Pinkcart was born. Now, we're a growing community of shoppers who love cute finds and
                      smart savings. Every shipment brings us together, and I'm so grateful to be part of this journey
                      with you.
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-foreground">
                      Let's continue shipping together and making cute finds accessible for everyone!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="border-y bg-gradient-to-b from-secondary/5 to-accent/5 section-padding">
        <div className="container">
          <div className="mb-8 sm:mb-12 text-center">
            <h2 className="mb-3 responsive-heading font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
              Our Mission & Values
            </h2>
            <p className="responsive-text text-muted-foreground">What drives us every day</p>
          </div>

          <div className="grid-responsive-3 gap-4 sm:gap-6">
            {[
              {
                icon: Target,
                title: "Accessibility",
                description:
                  "Making cute, quality products from China accessible and affordable for everyone through community group buying.",
              },
              {
                icon: Users,
                title: "Community First",
                description:
                  "Building a supportive community where shoppers connect, share finds, and help each other save money.",
              },
              {
                icon: Sparkles,
                title: "Quality & Trust",
                description:
                  "Curating only the best products and maintaining transparency throughout the entire shopping and shipping process.",
              },
            ].map((value, index) => (
              <Card key={index} className="responsive-card border-2">
                <CardContent className="card-responsive text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  </div>
                  <h3 className="mb-3 text-lg sm:text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                    {value.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container section-padding">
        <div className="mx-auto max-w-4xl">
          <Card className="overflow-hidden responsive-card border-2 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
            <CardContent className="p-6 sm:p-8 md:p-12">
              <div className="mb-6 sm:mb-8 text-center">
                <h2 className="mb-3 text-2xl sm:text-3xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Pinkcart by the Numbers
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">Growing together, one shipment at a time</p>
              </div>

              <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-3">
                {[
                  { value: "500+", label: "Happy Customers" },
                  { value: "50+", label: "Shipments Completed" },
                  { value: "60%", label: "Average Savings" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-2 text-3xl sm:text-5xl font-bold text-primary" style={{ fontFamily: "var(--font-fredoka)" }}>
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-b from-primary/5 to-secondary/5 section-padding">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 responsive-heading font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
              Join Our Community
            </h2>
            <p className="mb-6 sm:mb-8 responsive-text text-muted-foreground text-balance">
              Be part of a growing community that's making cute finds affordable for everyone
            </p>
            <div className="flex flex-col items-center gap-3 sm:gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="btn-responsive rounded-full" asChild>
                <Link href="/shop">
                  Start Shopping
                  <Package className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="btn-responsive rounded-full bg-transparent" asChild>
                <Link href="/contact">Get in Touch</Link>
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
