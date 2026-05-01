// src/components/home/ProductGridSection.tsx
import HorizontalProductCard from "./HorizontalProductCard";

export const ProductGridSection = ({ title, products, link }: any) => (
  <section className="py-8 md:py-12 bg-background">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        <a href={link} className="text-primary font-bold text-xs md:text-sm hover:underline">View All</a>
      </div>
      {/* 1 column on mobile, 5 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4">
        {products.map((p: any) => (
          <HorizontalProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  </section>
);