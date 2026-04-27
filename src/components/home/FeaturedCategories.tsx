// src/components/home/FeaturedCategories.tsx
export const FeaturedCategories = ({ categories }: { categories: any[] }) => (
  <section className="container mx-auto px-6 py-12">
    <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((cat) => (
        <a key={cat.id} href={`/products?category=${cat.slug}`} className="group relative rounded-xl overflow-hidden aspect-square border hover:shadow-lg transition">
          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold">{cat.name}</span>
          </div>
        </a>
      ))}
    </div>
  </section>
);