// src/components/home/TechJourney.tsx
import { Link } from "react-router-dom";

export const TechJourney = ({ categories }: { categories: any[] }) => {
  // We limit to 6 for the Home Page Bento Grid
  const displayCategories = categories.slice(0, 6);

  return (
    <section className="py-16 bg-surface-low">
      <div className="container mx-auto px-6">
        <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground tracking-tight text-center mb-10">
          Shop by Category
        </h2>
        
        {/* Bento Grid Logic */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {displayCategories.map((cat, index) => (
            <Link 
              key={cat.id} 
              to={`/products?category=${cat.slug}`} 
              className={`group relative rounded-2xl overflow-hidden border border-border/10 shadow-sm 
                ${index === 0 ? "md:col-span-2 md:row-span-2" : ""} 
                ${index === 3 ? "md:col-span-2" : ""}
              `}
            >
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="font-bold text-white text-lg">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};