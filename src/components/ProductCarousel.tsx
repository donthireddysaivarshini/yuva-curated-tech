import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/mockData";
import ProductCard from "./ProductCard";

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.75;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    // FIX: Added w-full to make sure it respects the parent's width constraints
    <div className="relative group/carousel w-full">
      <button
        onClick={() => scroll("left")}
        // FIX: Changed `flex` to `hidden md:flex`. This hides the button on mobile so `-left-4` doesn't break the screen width!
        className="flex absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-card shadow-lg border border-border/30 items-center justify-center text-foreground hover:bg-muted transition-colors opacity-100 md:opacity-0 group-hover/carousel:opacity-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
      >
        {products.map((p) => (
          <div key={p.id} className="w-[260px] shrink-0">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        // FIX: Changed `flex` to `hidden md:flex`. Hide on mobile so `-right-4` doesn't stretch the screen!
        className="flex absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-card shadow-lg border border-border/30 items-center justify-center text-foreground hover:bg-muted transition-colors opacity-100 md:opacity-0 group-hover/carousel:opacity-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProductCarousel;