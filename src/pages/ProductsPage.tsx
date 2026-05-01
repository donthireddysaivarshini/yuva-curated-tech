import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2, X, Filter } from "lucide-react";
import { storeService } from "@/services/api";
import HorizontalProductCard from "@/components/home/HorizontalProductCard";// Updated import[cite: 23]

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Dynamic Price State
  const [priceBounds, setPriceBounds] = useState({ min: 0, max: 1000000 });
  const [priceRange, setPriceRange] = useState(1000000); 
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await storeService.getProducts(Object.fromEntries(searchParams));
        const prodList = Array.isArray(data) ? data : (data.products || []);
        setProducts(prodList);
        
        if (prodList.length > 0) {
          const prices = prodList.map((p: any) => Number(p.price));
          const minP = Math.min(...prices);
          const maxP = Math.max(...prices);
          setPriceBounds({ min: minP, max: maxP });
          setPriceRange(maxP);
        }
      } finally { setLoading(false); }
    };
    fetchProducts();
  }, [searchParams]);

  const pageTitle = useMemo(() => {
    if (searchParams.get("search")) return `Search: "${searchParams.get("search")}"`;
    if (searchParams.get("brand")) return `${searchParams.get("brand")} ${searchParams.get("category") || ""}`;
    if (searchParams.get("category")) return searchParams.get("category");
    if (searchParams.get("usage")) return `Used for ${searchParams.get("usage")}`;
    return "All Products";
  }, [searchParams]);

  const availableFilters = useMemo(() => {
    const filters: Record<string, string[]> = {};
    const conditions = Array.from(new Set(products.map(p => p.condition_display))).filter(Boolean);
    if (conditions.length > 1) filters["Condition"] = conditions;
    if (!searchParams.get("brand")) {
        const brands = Array.from(new Set(products.map(p => p.brand_name))).filter(Boolean);
        if (brands.length > 1) filters["Brand"] = brands;
    }
    if (!searchParams.get("category")) {
        const cats = Array.from(new Set(products.map(p => p.category_name))).filter(Boolean);
        if (cats.length > 1) filters["Category"] = cats;
    }
    return filters;
  }, [products, searchParams]);

  const filteredAndSorted = useMemo(() => {
    let result = products.filter(p => {
      const matchPrice = Number(p.price) <= priceRange && Number(p.price) >= priceBounds.min;
      const matchFilters = Object.entries(selectedFilters).every(([key, values]) => {
        if (!values || values.length === 0) return true;
        if (key === "Brand") return values.includes(p.brand_name);
        if (key === "Condition") return values.includes(p.condition_display);
        if (key === "Category") return values.includes(p.category_name);
        return true;
      });
      return matchPrice && matchFilters;
    });

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, selectedFilters, priceRange, priceBounds.min, sortBy]);

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category]?.includes(value) ? prev[category].filter(i => i !== value) : [...(prev[category] || []), value]
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{pageTitle.replace(/-/g, ' ')}</h1>
      
      {/* Top Filter & Sort Bar */}
      <div className="flex justify-between items-center mb-8 bg-gray-50 p-4 rounded-lg">
        <button onClick={() => setMobileFiltersOpen(true)} className="flex items-center gap-2 lg:hidden font-bold">
          <Filter size={18} /> Filters
        </button>
        <div className="hidden lg:block font-medium text-sm text-gray-500">{filteredAndSorted.length} Products</div>
        <select onChange={(e) => setSortBy(e.target.value)} className="bg-transparent font-bold text-sm outline-none cursor-pointer">
          <option value="newest">Sort: Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      <div className="flex gap-8">
        <aside className={`${mobileFiltersOpen ? 'fixed inset-0 z-50 bg-white p-6' : 'hidden'} lg:block lg:w-64 space-y-8`}>
          {mobileFiltersOpen && <button onClick={() => setMobileFiltersOpen(false)} className="lg:hidden mb-4"><X /></button>}
          
          <div>
            <h4 className="font-bold mb-3 uppercase text-xs">Price (₹{priceBounds.min} - ₹{priceRange.toLocaleString()})</h4>
            <input type="range" min={priceBounds.min} max={priceBounds.max} value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-full" />
          </div>

          {Object.entries(availableFilters).map(([cat, options]) => (
            <div key={cat}>
              <h4 className="font-bold mb-3 uppercase text-xs">{cat}</h4>
              {options.map((opt: string) => (
                <label key={opt} className="flex items-center gap-2 py-1 text-sm cursor-pointer">
                  <input type="checkbox" checked={selectedFilters[cat]?.includes(opt)} onChange={() => toggleFilter(cat, opt)} />
                  {opt}
                </label>
              ))}
            </div>
          ))}
        </aside>

        <main className="flex-1">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin w-10 h-10" />
            </div>
          ) : filteredAndSorted.length > 0 ? (
            /* Updated Grid: Single column on mobile for horizontal cards[cite: 27] */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredAndSorted.map((p) => (
                <HorizontalProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-gray-500">No products found for these filters.</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;