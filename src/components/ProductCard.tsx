import { Link } from "react-router-dom";
import { ShoppingCart, MessageSquare, Target } from "lucide-react"; // Added Target icon
import type { Product } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { usageCategories } from "@/data/mockData";

const conditionColors: Record<string, string> = {
  "Like New": "bg-primary text-primary-foreground",
  "Excellent": "bg-success text-success-foreground",
  "Good": "bg-secondary text-secondary-foreground",
  "Value": "bg-muted text-muted-foreground",
};

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  // Find the usage name based on ID
  const usage = usageCategories.find(u => u.id === product.usageId);

  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-ambient hover:shadow-lg transition-all duration-300 flex flex-col min-w-[220px]">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative bg-surface-low p-4 flex items-center justify-center aspect-square overflow-hidden">
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-md text-[10px] font-display font-bold uppercase tracking-wider ${conditionColors[product.condition]}`}>
            {product.condition}
          </span>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        {/* Usage Badge */}
        {usage && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-primary mb-2 uppercase tracking-wider">
            <Target className="w-3 h-3" /> {usage.name}
          </div>
        )}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-bold text-foreground text-sm leading-tight line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="flex gap-1.5 mt-2">
          {product.tags.map((tag) => (
            <span key={tag} className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded font-medium">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-3 flex items-end justify-between">
          <p className="font-display font-extrabold text-lg text-foreground">₹{product.price.toLocaleString("en-IN")}</p>
          <div className="flex gap-1.5">
            <a
              href={`https://wa.me/919709888456?text=Hi, I'm interested in ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-success hover:text-success-foreground transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <button
              onClick={(e) => { e.preventDefault(); addToCart(product); }}
              className="gradient-primary p-2 rounded-lg text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;