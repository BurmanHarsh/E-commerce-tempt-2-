import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";
import { toast } from "sonner";

export const ProductCard = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const { node } = product;
  const image = node.images?.edges?.[0]?.node;
  const variant = node.variants?.edges?.[0]?.node;
  const price = node.priceRange?.minVariantPrice;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!variant) return;

    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });

    toast.success("Added to cart", {
      description: node.title,
      position: "top-center",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link to={`/product/${node.handle}`}>
        <div className="relative bg-card rounded-2xl overflow-hidden shadow-card transition-all duration-300 group-hover:shadow-hover">
          <div className="relative aspect-[3/4] overflow-hidden bg-secondary/20">
            {image ? (
              <img
                src={image.url}
                alt={image.altText || node.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-secondary">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.preventDefault();
                toast.info("Wishlist feature coming soon!");
              }}
            >
              <Heart className="w-4 h-4" />
            </Button>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Button
                onClick={handleAddToCart}
                disabled={isLoading || !variant?.availableForSale}
                className="w-full bg-white text-foreground hover:bg-white/90"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                {variant?.availableForSale ? "Add to Cart" : "Sold Out"}
              </Button>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {node.title}
            </h3>
            {price && (
              <p className="text-lg font-bold text-primary mt-1">
                {formatPrice(price.amount, price.currencyCode)}
              </p>
            )}
            {node.options &&
              node.options.length > 0 &&
              node.options[0].values.length > 1 && (
                <p className="text-sm text-muted-foreground mt-1">
                  {node.options[0].values.length} options available
                </p>
              )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
