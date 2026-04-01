import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";

const conditionColors: Record<string, string> = {
  "Like New": "bg-primary text-primary-foreground",
  "Excellent": "bg-success text-success-foreground",
  "Good": "bg-secondary text-secondary-foreground",
  "Value": "bg-muted text-muted-foreground",
};

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-ambient hover:shadow-lg transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative bg-surface-low p-6 flex items-center justify-center aspect-square overflow-hidden">
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-display font-semibold ${conditionColors[product.condition]}`}>
            {product.condition.toUpperCase()}
          </span>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex gap-2 mb-2">
          {product.tags.map((tag) => (
            <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md font-medium">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{product.brand}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-bold text-foreground mt-1 text-sm leading-tight line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
            <span className="text-xs text-success font-semibold ml-2">{discount}% OFF</span>
            <p className="font-display font-extrabold text-lg text-foreground">₹{product.price.toLocaleString("en-IN")}</p>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="gradient-primary p-2.5 rounded-lg text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
