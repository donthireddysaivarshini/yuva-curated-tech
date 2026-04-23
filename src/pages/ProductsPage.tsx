import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { products, categories } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";

const ramOptions = ["8GB", "16GB", "32GB", "64GB"];
const storageOptions = ["256GB SSD", "512GB SSD", "1TB SSD", "2TB SSD"];
const conditionOptions = ["Like New", "Excellent", "Good", "Value"];

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const subParam = searchParams.get("sub");
  const searchQuery = searchParams.get("search");
  const usageParam = searchParams.get("usage");
  const [priceRange, setPriceRange] = useState(85000);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedRam, setSelectedRam] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popularity");

  const toggleCondition = (c: string) => setSelectedConditions((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
  const toggleStorage = (s: string) => setSelectedStorage((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.specs.processor.toLowerCase().includes(q)
      );
    }
    if (categoryParam) result = result.filter((p) => p.categoryId === categoryParam);
    if (subParam) result = result.filter((p) => p.subcategoryId === subParam);
    if (usageParam) result = result.filter((p) => p.usageId === usageParam);
    result = result.filter((p) => p.price <= priceRange);
    if (selectedConditions.length) result = result.filter((p) => selectedConditions.includes(p.condition));
    if (selectedRam) result = result.filter((p) => p.specs.ram.includes(selectedRam!));
    if (selectedStorage.length) result = result.filter((p) => selectedStorage.some((s) => p.specs.storage.includes(s.replace(" SSD", ""))));
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    return result;
  }, [searchQuery, categoryParam, subParam,usageParam, priceRange, selectedConditions, selectedRam, selectedStorage, sortBy]);

  const currentCategory = categories.find((c) => c.id === categoryParam);
  const currentSub = currentCategory?.subcategories.find((s) => s.id === subParam);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-2">
          Home › Products{currentCategory ? ` › ${currentCategory.name}` : ""}{currentSub ? ` › ${currentSub.name}` : ""}
        </p>
        <h1 className="font-display font-extrabold text-3xl text-foreground tracking-tight">
          {currentSub ? `${currentSub.name} ${currentCategory?.name}s` : currentCategory ? `${currentCategory.name}s` : "All Products"}
        </h1>
        <p className="text-muted-foreground mt-1">Showing {filtered.length} refurbished devices, precision certified for performance.</p>
      </div>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 space-y-8">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="w-4 h-4 text-foreground" />
              <span className="font-display font-bold text-foreground">Filters</span>
            </div>

            <div>
              <h4 className="font-display font-semibold text-sm text-foreground mb-3">PRICE RANGE</h4>
              <input
                type="range" min={15000} max={250000} value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>₹15,000</span>
                <span>₹{priceRange.toLocaleString("en-IN")}+</span>
              </div>
            </div>

            <div>
              <h4 className="font-display font-semibold text-sm text-foreground mb-3">CONDITION</h4>
              <div className="space-y-2">
                {conditionOptions.map((c) => (
                  <label key={c} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                    <input type="checkbox" checked={selectedConditions.includes(c)} onChange={() => toggleCondition(c)} className="rounded accent-primary" />
                    {c}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-display font-semibold text-sm text-foreground mb-3">RAM SIZE</h4>
              <div className="flex flex-wrap gap-2">
                {ramOptions.map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRam(selectedRam === r ? null : r)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${selectedRam === r ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border/30 hover:border-primary"}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-display font-semibold text-sm text-foreground mb-3">STORAGE</h4>
              <div className="space-y-2">
                {storageOptions.map((s) => (
                  <label key={s} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                    <input type="checkbox" checked={selectedStorage.includes(s)} onChange={() => toggleStorage(s)} className="rounded accent-primary" />
                    {s}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">Showing 1-{filtered.length} of {filtered.length} results</p>
            <select
              value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="bg-card border border-border/30 rounded-lg px-3 py-2 text-sm font-body text-foreground"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No products match your filters.</p>
              <button onClick={() => { setSelectedConditions([]); setSelectedRam(null); setSelectedStorage([]); setPriceRange(250000); }} className="mt-4 text-primary font-display font-semibold text-sm">
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
