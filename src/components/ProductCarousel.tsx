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
    <div className="relative group/carousel">
      <button
        onClick={() => scroll("left")}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card shadow-lg border border-border/30 flex items-center justify-center text-foreground hover:bg-muted transition-colors opacity-0 group-hover/carousel:opacity-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
      >
        {products.map((p) => (
          <div key={p.id} className="w-[260px] shrink-0">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll("right")}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card shadow-lg border border-border/30 flex items-center justify-center text-foreground hover:bg-muted transition-colors opacity-0 group-hover/carousel:opacity-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProductCarousel;
