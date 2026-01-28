import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Palette, Shirt, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  { name: "Men", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=500&fit=crop", href: "/products?category=men" },
  { name: "Women", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop", href: "/products?category=women" },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop", href: "/products?category=accessories" },
];

const features = [
  { icon: Palette, title: "Choose Your Fabric", description: "Premium materials from around the world" },
  { icon: Shirt, title: "Pick Your Style", description: "Collar, sleeves, fit - all customizable" },
  { icon: Wand2, title: "Make It Yours", description: "Colors and details tailored to you" },
];

export default function Index() {
  const { data: products, isLoading, error } = useProducts(8);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative gradient-hero overflow-hidden">
        <div className="container py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                New Collection Available
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
                Design Your
                <span className="text-gradient block">Perfect Style</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-lg">
                Create custom fashion pieces tailored to your unique taste. 
                Choose fabrics, colors, and styles – make it truly yours.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/customize">
                  <Button size="lg" className="gradient-primary text-white text-lg px-8">
                    Start Building
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/products">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    Shop Collection
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-hover">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop"
                  alt="Fashion model"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-hover"
              >
                <p className="text-sm text-muted-foreground">Starting from</p>
                <p className="text-2xl font-bold text-gradient">₹999</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
          <p className="text-muted-foreground mt-2">Find your perfect fit</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={category.href} className="group block">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-card">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                    <span className="inline-flex items-center text-white/80 text-sm mt-2 group-hover:text-white transition-colors">
                      Shop Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Build Your Own Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 gradient-primary opacity-10" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-bold mb-4">
              ✨ FEATURED
            </span>
            <h2 className="text-3xl md:text-5xl font-black">
              Build Your <span className="text-gradient">Own Style</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Create custom clothing pieces step by step. Choose fabric, style, colors, 
              and watch your design come to life in real-time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-8 rounded-3xl shadow-card text-center"
              >
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/customize">
              <Button size="lg" className="gradient-primary text-white text-lg px-10">
                Start Customizing
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground mt-2">Handpicked styles for you</p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="hidden md:flex">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        {error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load products. Please try again later.</p>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[3/4] rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-secondary/30 rounded-3xl">
            <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products yet</h3>
            <p className="text-muted-foreground mb-6">
              Tell me what products you'd like to add to your store!
            </p>
          </div>
        )}

        <div className="text-center mt-8 md:hidden">
          <Link to="/products">
            <Button variant="outline">
              View All Products <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
