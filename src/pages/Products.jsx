import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Filter,
  Grid3X3,
  LayoutList,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

const filterOptions = {
  categories: ["Men", "Women", "Accessories"],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: ["Black", "White", "Blue", "Red", "Green", "Yellow"],
  priceRanges: ["Under ₹1000", "₹1000 - ₹2500", "₹2500 - ₹5000", "Above ₹5000"],
};

export default function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Build search query for Shopify (FIXED)
  const shopifyQuery = category ? `product_type:${category}` : "";
  const { data: products, isLoading, error } = useProducts(50, shopifyQuery);

  const filteredProducts =
    products?.filter((product) =>
      product.node.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return (
        parseFloat(a.node.priceRange.minVariantPrice.amount) -
        parseFloat(b.node.priceRange.minVariantPrice.amount)
      );
    }
    if (sortBy === "price-high") {
      return (
        parseFloat(b.node.priceRange.minVariantPrice.amount) -
        parseFloat(a.node.priceRange.minVariantPrice.amount)
      );
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold">
            {category
              ? `${category.charAt(0).toUpperCase() + category.slice(1)}'s Collection`
              : "All Products"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {sortedProducts.length} products found
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {Object.entries(filterOptions).map(([key, values]) => (
                  <div key={key}>
                    <h4 className="font-semibold mb-3 capitalize">{key}</h4>
                    <div className="space-y-2">
                      {values.map((value) => (
                        <label
                          key={value}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Checkbox />
                          <span className="text-sm">{value}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">
                Price: Low to High
              </SelectItem>
              <SelectItem value="price-high">
                Price: High to Low
              </SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>

          <div className="hidden md:flex items-center gap-1 bg-secondary rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <LayoutList className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center gap-2 font-semibold text-lg">
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </div>

              {Object.entries(filterOptions).map(([key, values]) => (
                <div key={key} className="border-b pb-4">
                  <h4 className="font-semibold mb-3 capitalize">{key}</h4>
                  <div className="space-y-2">
                    {values.map((value) => (
                      <label
                        key={value}
                        className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                      >
                        <Checkbox />
                        <span className="text-sm">{value}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <div className="flex-1">
            {error ? (
              <div className="text-center py-12">
                <p className="text-destructive">
                  Failed to load products. Please try again later.
                </p>
              </div>
            ) : isLoading ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[3/4] rounded-2xl" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                  </div>
                ))}
              </div>
            ) : sortedProducts.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.node.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-secondary/30 rounded-3xl">
                <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "Try adjusting your search."
                    : "No products available yet."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
