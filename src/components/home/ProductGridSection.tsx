// src/components/home/ProductGridSection.tsx
import ProductCard from "../ProductCard";

export const ProductGridSection = ({ title, products, link }: any) => (
  <section className="py-12 bg-background">
    <div className="container mx-auto px-6">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-bold">{title}</h2>
        <a href={link} className="text-primary font-bold text-sm hover:underline">View All</a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {products.map((p: any) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  </section>
);