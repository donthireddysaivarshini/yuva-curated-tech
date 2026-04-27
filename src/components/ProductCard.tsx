import { Link } from "react-router-dom";
import { Target, Star } from "lucide-react";

// Define the API structure
interface ApiProduct {
  id: number;
  title: string;
  slug: string;
  sku: string;
  price: string | number;
  original_price?: string | number;
  discount_percentage?: number;
  condition: string;
  condition_display?: string;
  brand_name: string;
  category_name: string;
  processor?: string;
  ram?: string;
  storage?: string;
  usage_tags?: { id: number; name: string; slug: string }[];
  images?: { id: number; image: string; is_primary: boolean }[];
  average_rating?: number;
  review_count?: number;
}

const conditionColors: Record<string, string> = {
  like_new: "bg-primary text-primary-foreground",
  excellent: "bg-success text-success-foreground",
  good: "bg-secondary text-secondary-foreground",
  value: "bg-muted text-muted-foreground",
};

const ProductCard = ({ product }: { product: ApiProduct }) => {
  const primaryImage = product.images?.[0]?.image || "/placeholder.png";
  const price = Number(product.price);
  const originalPrice = product.original_price ? Number(product.original_price) : null;
  
  // Logic: Only consider reviews if review_count is explicitly provided and greater than 0
  const hasReviews = product.review_count && product.review_count > 0;

  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-ambient hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative bg-surface-low flex items-center justify-center aspect-square overflow-hidden p-4">
          <span className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-display font-bold uppercase tracking-wider ${conditionColors[product.condition] || "bg-muted"}`}>
            {product.condition_display || product.condition}
          </span>
          <img
            src={primaryImage}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        {product.usage_tags && product.usage_tags.length > 0 && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-primary mb-2 uppercase tracking-wider">
            <Target className="w-3 h-3" />
            {product.usage_tags[0].name}
          </div>
        )}

        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-1">
          {product.brand_name}
        </p>

        <Link to={`/product/${product.slug}`}>
          <h3 className="font-display font-bold text-foreground text-sm leading-tight line-clamp-2 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* REVIEWS SECTION: Only renders if hasReviews is true */}
      
{product.review_count > 0 && (
  <div className="flex items-center gap-1 mt-1 mb-2">
    <div className="flex text-yellow-400">
      <Star className="w-3 h-3 fill-current" />
    </div>
    <span className="text-xs font-bold">{product.average_rating}</span>
    <span className="text-[10px] text-muted-foreground">({product.review_count})</span>
  </div>
)}

        <div className="flex flex-wrap gap-1.5 mt-2">
          {product.processor && <span className="text-[10px] bg-muted px-2 py-0.5 rounded">{product.processor}</span>}
          {product.ram && <span className="text-[10px] bg-muted px-2 py-0.5 rounded">{product.ram}</span>}
          {product.storage && <span className="text-[10px] bg-muted px-2 py-0.5 rounded">{product.storage}</span>}
        </div>

        <div className="mt-auto pt-4 flex items-end justify-between gap-2">
          <div>
            <p className="font-display font-extrabold text-lg text-foreground">₹{price.toLocaleString("en-IN")}</p>
            <div className="flex items-center gap-2">
                {originalPrice && originalPrice > price && (
                <p className="text-xs text-muted-foreground line-through">₹{originalPrice.toLocaleString("en-IN")}</p>
                )}
                {product.discount_percentage && product.discount_percentage > 0 && (
                    <span className="text-[10px] font-bold text-success">{product.discount_percentage}% OFF</span>
                )}
            </div>
          </div>
          
          <Link to={`/product/${product.slug}`} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;