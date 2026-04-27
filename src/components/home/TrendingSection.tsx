// src/components/home/TrendingSection.tsx
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom"; // Use Link for "View All"
import ProductCard from "../ProductCard";

export const TrendingSection = ({ title, products, link }: { title: string; products: any[], link: string }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <Link to={link} className="text-primary font-bold text-sm hover:underline">View All</Link>
      </div>
      
      {/* Container is relative so arrows can be positioned absolutely */}
      <div className="relative group">
        
        {/* Left Arrow */}
        <button 
          onClick={() => scroll('left')} 
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-xl border border-border hover:bg-primary hover:text-white transition opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-6 h-6"/>
        </button>

        {/* Horizontal Scroll Area */}
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide scroll-smooth">
          {products.map((p: any) => (
            <div key={p.id} className="min-w-[220px] md:min-w-[280px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll('right')} 
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-xl border border-border hover:bg-primary hover:text-white transition opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-6 h-6"/>
        </button>
      </div>
    </section>
  );
};