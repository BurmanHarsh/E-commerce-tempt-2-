import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-black">
              BUILD YOUR STYLE
            </Link>
            <p className="mt-4 text-muted-foreground text-sm">
              Express yourself through fashion. Create your unique style with our 
              customizable clothing and curated collections.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold text-lg mb-4">Shop</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/products" className="text-muted-foreground hover:text-background transition-colors text-sm">
                All Products
              </Link>
              <Link to="/products?category=men" className="text-muted-foreground hover:text-background transition-colors text-sm">
                Men
              </Link>
              <Link to="/products?category=women" className="text-muted-foreground hover:text-background transition-colors text-sm">
                Women
              </Link>
              <Link to="/products?category=accessories" className="text-muted-foreground hover:text-background transition-colors text-sm">
                Accessories
              </Link>
              <Link to="/customize" className="text-muted-foreground hover:text-background transition-colors text-sm">
                Build Your Own
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/contact" className="text-muted-foreground hover:text-background transition-colors text-sm">
                Contact Us
              </Link>
              <Link to="/faq" className="text-muted-foreground hover:text-background transition-colors text-sm">
                FAQ
              </Link>
              <Link to="/shipping" className="text-muted-foreground hover:text-background transition-colors text-sm">
                Shipping & Returns
              </Link>
              <Link to="/size-guide" className="text-muted-foreground hover:text-background transition-colors text-sm">
                Size Guide
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to get special offers and updates.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Your email" 
                className="bg-background/10 border-muted-foreground/20 text-background placeholder:text-muted-foreground"
              />
              <Button className="gradient-primary shrink-0">
                Join
              </Button>
            </div>
            <div className="flex gap-4 mt-6">
              <Button variant="ghost" size="icon" className="hover:bg-background/10">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-background/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-background/10">
                <Facebook className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Build Your Style. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
