//productcard
import { Link } from "react-router-dom";
import { Target, Star } from "lucide-react";
import { type ApiProduct, getVariantSummary, getCardPrice } from "@/types/product";

const conditionColors: Record<string, string> = {
  like_new: "bg-primary text-primary-foreground",
  excellent: "bg-success text-success-foreground",
  good: "bg-secondary text-secondary-foreground",
  value: "bg-muted text-muted-foreground",
};

const ProductCard = ({ product }: { product: ApiProduct }) => {
  const primaryImage = product.images?.[0]?.image || "/placeholder.png";

  // ── Price: cheapest in-stock variant ────────────────────────────────────
  const { price, originalPrice } = getCardPrice(product);

  // ── Variant combination summary pills ───────────────────────────────────
  // e.g. ["Core i7 | 16GB | 512GB", "Core i5 | 8GB | 256GB", "+2 more"]
  // Derived purely from product.variants[] — no product-level specs used.
  const variantSummary = getVariantSummary(product);

  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-ambient hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative bg-surface-low flex items-center justify-center aspect-square overflow-hidden p-4">
          <span
            className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-display font-bold uppercase tracking-wider ${
              conditionColors[product.condition] || "bg-muted"
            }`}
          >
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

        {/* Reviews */}
        {(product.review_count ?? 0) > 0 && (
          <div className="flex items-center gap-1 mt-1 mb-2">
            <div className="flex text-yellow-400">
              <Star className="w-3 h-3 fill-current" />
            </div>
            <span className="text-xs font-bold">{product.average_rating}</span>
            <span className="text-[10px] text-muted-foreground">({product.review_count})</span>
          </div>
        )}

        {/*
          Variant combination summary.
          Each pill shows one full combination: "processor | ram | storage".
          The last pill may be "+N more" when variants exceed MAX_SHOWN.
          Only rendered when the product has variants — no product-level specs.
        */}
        {variantSummary.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {variantSummary.map((label) => (
              <span
                key={label}
                className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                  label.startsWith("+")
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 flex items-end justify-between gap-2">
          <div>
            <p className="font-display font-extrabold text-lg text-foreground">
              ₹{price.toLocaleString("en-IN")}
            </p>
            <div className="flex items-center gap-2">
              {originalPrice && originalPrice > price && (
                <p className="text-xs text-muted-foreground line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </p>
              )}
              {product.discount_percentage && product.discount_percentage > 0 && (
                <span className="text-[10px] font-bold text-success">
                  {product.discount_percentage}% OFF
                </span>
              )}
            </div>
          </div>

          <Link
            to={`/product/${product.slug}`}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;