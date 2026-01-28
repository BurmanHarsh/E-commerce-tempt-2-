import { Link } from "react-router-dom";
import { Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartDrawer } from "./CartDrawer";
import { useState } from "react";

const categories = [
  { name: "Men", href: "/products?category=men" },
  { name: "Women", href: "/products?category=women" },
  { name: "Accessories", href: "/products?category=accessories" },
  { name: "Build Your Own", href: "/customize" },
];

export const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <div className="flex flex-col gap-4 mt-8">
              <Link to="/" className="text-2xl font-bold text-gradient">
                BUILD YOUR STYLE
              </Link>
              <nav className="flex flex-col gap-2 mt-4">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.href}
                    className="text-lg py-2 hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl md:text-2xl font-black tracking-tight">
            <span className="text-gradient">BUILD</span>
            <span className="text-foreground"> YOUR STYLE</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          {searchOpen ? (
            <div className="hidden md:flex items-center gap-2">
              <Input
                placeholder="Search products..."
                className="w-[200px]"
                autoFocus
                onBlur={() => setSearchOpen(false)}
              />
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          {/* User */}
          <Link to="/account">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          {/* Cart */}
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};
