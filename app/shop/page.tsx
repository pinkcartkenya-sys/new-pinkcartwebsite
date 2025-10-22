"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Package, Sparkles, Users, Loader2, ChevronDown, ChevronUp, BookOpen } from "lucide-react"
import { useProducts, useCategories } from "@/hooks/use-products"
import { Category } from "@/lib/db"

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCategories, setShowCategories] = useState(false)

  // Fetch categories from database
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories()
  
  // Fetch products from database
  const { 
    products, 
    loading: productsLoading, 
    error: productsError, 
    refetch 
  } = useProducts({
    categoryId: selectedCategory === "all" ? undefined : selectedCategory,
    search: searchQuery.trim() !== '' ? searchQuery : undefined
  })

  // Debug logging
  console.log('Shop page - selectedCategory:', selectedCategory);
  console.log('Shop page - searchQuery:', searchQuery);
  console.log('Shop page - Products:', products);
  console.log('Shop page - Loading:', productsLoading);
  console.log('Shop page - Error:', productsError);

  // Create category mapping for icons
  const categoryIconMap: Record<string, any> = {
    'all': Sparkles,
    'beauty-self-care-items': Heart,
    'shoes': Package,
    'bags': Package,
    'accessories': Sparkles,
    'organisers': Package,
    'journal': BookOpen,
    'cute-lighting': Sparkles,
  }

  const handleCategoryChange = (categoryId: string) => {
    console.log('Category clicked:', categoryId);
    setSelectedCategory(categoryId)
    setSearchQuery("") // Clear search when changing category
    // The useProducts hook will automatically refetch with the new categoryId
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The useProducts hook will automatically refetch with the new search query
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-transparent section-padding">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 responsive-heading font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
              This Week's Finds
            </h1>
            <p className="responsive-text text-muted-foreground text-balance">
              Check out what we're shipping this week and join the group to save
            </p>
          </div>
        </div>
      </section>

      {/* Active Shipment Info */}
      <section className="border-b bg-muted/30 py-4 sm:py-6">
        <div className="container">
          <Card className="responsive-card border-2">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10">
                    <Package className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                      Current Shipment Progress
                    </h3>
                  </div>
                </div>
                <div className="w-full sm:w-64">
                  <div className="mb-2 h-2 sm:h-3 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: "68%" }}
                    />
                  </div>
                  <p className="text-center text-xs text-muted-foreground">68% full - Join now!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Search and Category Filter */}
      <section className="border-b py-6 sm:py-8">
        <div className="container space-y-6">
          {/* Search Bar - Mobile Optimized */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">Search Products</h3>
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search for cute finds..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border-2 border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all"
                />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="rounded-2xl px-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
          </div>

          {/* Category Filter - Mobile Optimized */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground">Categories</h3>
              <div className="flex items-center gap-2">
                <div className="text-xs text-muted-foreground">
                  {categories.length} categories
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCategories(!showCategories)}
                  className="rounded-full"
                >
                  {showCategories ? (
                    <>
                      <ChevronUp className="h-3 w-3 mr-1" />
                      Hide
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3 mr-1" />
                      View
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {showCategories && (
              <>
                {categoriesLoading ? (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-8">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading categories...
                  </div>
                ) : categoriesError ? (
                  <div className="text-center text-sm text-red-500 py-8">Error loading categories</div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                    {categories.map((category) => {
                      console.log('Rendering category:', category);
                      // Create a slug from the category name
                      const categorySlug = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                      const IconComponent = categoryIconMap[categorySlug] || Sparkles
                      const isSelected = selectedCategory === categorySlug
                      return (
                <Button
                  key={category._id || category.id || categorySlug}
                  variant="ghost"
                  className={`h-auto p-2 rounded-lg border transition-all duration-200 w-full max-w-full overflow-hidden ${
                    isSelected 
                      ? 'text-primary font-semibold border-primary' 
                      : 'text-muted-foreground hover:text-foreground border-border hover:border-primary/30'
                  }`}
                  onClick={() => handleCategoryChange(categorySlug)}
                >
                          <div className="flex flex-col items-center gap-1 w-full">
                            <IconComponent className="h-4 w-4" />
                            <div className="text-xs font-medium leading-tight text-center break-words hyphens-auto max-w-full overflow-hidden">
                              {category.name}
                            </div>
                          </div>
                        </Button>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container section-padding">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                {selectedCategory === "all" ? "All Products" : categories.find((c) => {
                  const categorySlug = c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                  return categorySlug === selectedCategory;
                })?.name || selectedCategory}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {productsLoading ? "Loading..." : `${products.length} cute finds available`}
              </p>
            </div>
            {selectedCategory !== "all" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCategoryChange("all")}
                className="rounded-full"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                View All
              </Button>
            )}
          </div>
        </div>

        {productsLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading products...</span>
            </div>
          </div>
        ) : productsError ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error loading products</p>
              <Button onClick={refetch} variant="outline">
                Try Again
              </Button>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">No products found</p>
              {searchQuery && (
                <Button onClick={() => setSearchQuery("")} variant="outline">
                  Clear Search
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id || product.id} id={product._id || product.id} {...product} />
            ))}
          </div>
        )}
      </section>

      {/* Community CTA */}
      <section className="border-t bg-gradient-to-b from-secondary/5 to-accent/5 section-padding">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 sm:px-4">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">Join Our Community</span>
            </div>
            <h2 className="mb-4 responsive-heading font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
              More People, More Savings
            </h2>
            <p className="mb-6 sm:mb-8 responsive-text text-muted-foreground text-balance">
              The more people who join a shipment, the lower the shipping cost for everyone. Share with your friends!
            </p>
            <Button size="lg" className="btn-responsive rounded-full">
              Share on WhatsApp
              <Sparkles className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
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
              <h4 className="mb-4 font-semibold">Browse</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {categories.slice(1).map((category) => (
                  <li key={category._id || category.id || category.slug}>
                    <button 
                      onClick={() => handleCategoryChange(category.slug)} 
                      className="hover:text-primary"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/about" className="hover:text-primary">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/how-it-works" className="hover:text-primary">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-primary">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/faq" className="hover:text-primary">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/shipping" className="hover:text-primary">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="/returns" className="hover:text-primary">
                    Returns
                  </a>
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
