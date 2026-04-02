import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { ShoppingCart, MessageSquare, MapPin, CheckCircle, Shield, Cpu, Monitor, Minus, Plus, Star, Truck, RotateCcw, Wrench } from "lucide-react";
import { products, reviews } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import ProductCarousel from "@/components/ProductCarousel";

const ramOptions = ["8GB", "16GB", "32GB"];
const storageOptions = ["256GB SSD", "512GB SSD", "1TB SSD"];

const variantPriceDelta: Record<string, number> = {
  "8GB": 0, "16GB": 4000, "32GB": 12000,
  "256GB SSD": 0, "512GB SSD": 3000, "1TB SSD": 8000,
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart, setDrawerOpen } = useCart();
  const [activeTab, setActiveTab] = useState<"specs" | "refurbishment" | "warranty">("specs");
  const [quantity, setQuantity] = useState(1);

  const initialRam = product ? (ramOptions.find((r) => product.specs.ram.includes(r)) || ramOptions[0]) : ramOptions[0];
  const initialStorage = product ? (storageOptions.find((s) => product.specs.storage.includes(s.split(" ")[0])) || storageOptions[0]) : storageOptions[0];

  const [selectedRam, setSelectedRam] = useState(initialRam);
  const [selectedStorage, setSelectedStorage] = useState(initialStorage);

  const variantPrice = useMemo(() => {
    if (!product) return 0;
    const baseDeltaRam = variantPriceDelta[initialRam] || 0;
    const baseDeltaStorage = variantPriceDelta[initialStorage] || 0;
    return product.price + ((variantPriceDelta[selectedRam] || 0) - baseDeltaRam) + ((variantPriceDelta[selectedStorage] || 0) - baseDeltaStorage);
  }, [product, selectedRam, selectedStorage, initialRam, initialStorage]);

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="font-display font-extrabold text-2xl text-foreground">Product not found</h1>
        <Link to="/products" className="text-primary font-semibold mt-4 inline-block">← Back to Products</Link>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - variantPrice) / product.originalPrice) * 100);

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setDrawerOpen(true);
  };

  const relatedProducts = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 8);
  const productReviews = reviews.slice(0, 4);

  const highlightCards = [
    { label: "Processor", value: product.specs.processor, icon: Cpu },
    { label: "Display", value: product.specs.display, icon: Monitor },
    { label: "Graphics", value: "Intel UHD / Integrated", icon: Cpu },
    { label: "Operating System", value: "Windows 11 Pro", icon: Monitor },
  ];

  const tabs = [
    { key: "specs" as const, label: "Full Specifications" },
    { key: "refurbishment" as const, label: "Refurbishment Report" },
    { key: "warranty" as const, label: "Warranty & Return Policy" },
  ];

  return (
    <div className="bg-surface min-h-screen">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>›</span>
          <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
          <span>›</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="bg-card rounded-2xl p-8 flex items-center justify-center aspect-square shadow-ambient">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`rounded-xl overflow-hidden bg-card shadow-ambient cursor-pointer aspect-square flex items-center justify-center p-2 ${i === 0 ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100"} transition-opacity`}>
                  <img src={product.image} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <span className="inline-flex items-center gap-1.5 bg-success-soft text-success px-3 py-1.5 rounded-lg text-xs font-display font-semibold w-fit">
              <CheckCircle className="w-3.5 h-3.5" />
              Condition: {product.condition}
            </span>

            <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-foreground mt-4 leading-tight tracking-tight">
              {product.name}
            </h1>

            {/* Star Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= 4 ? "fill-primary text-primary" : s === 5 ? "fill-primary/30 text-primary/30" : ""}`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">4.6</span>
              <span className="text-sm text-muted-foreground">(8 Reviews)</span>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Wrench className="w-3.5 h-3.5 text-primary" /> 350+ Service Centers</span>
              <span className="inline-flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-primary" /> 1 Year Warranty</span>
              <span className="inline-flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5 text-primary" /> 14 Days Return</span>
            </div>

            {/* Variant Selectors */}
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">RAM</p>
                <div className="flex gap-2">
                  {ramOptions.map((r) => (
                    <button key={r} onClick={() => setSelectedRam(r)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedRam === r ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">Storage</p>
                <div className="flex gap-2">
                  {storageOptions.map((s) => (
                    <button key={s} onClick={() => setSelectedStorage(s)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedStorage === s ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display font-extrabold text-3xl text-foreground">₹{variantPrice.toLocaleString("en-IN")}</span>
              <span className="text-muted-foreground line-through text-lg">₹{product.originalPrice.toLocaleString("en-IN")}</span>
              <span className="text-success font-display font-semibold text-sm">{discount}% OFF</span>
            </div>

            {/* Highlight Grid: Processor, Display, Graphics, OS */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {highlightCards.map((card) => (
                <div key={card.label} className="bg-surface-low rounded-xl p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                    <card.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{card.label}</p>
                    <p className="text-sm font-display font-semibold text-foreground">{card.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="mt-6">
              <p className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">Quantity</p>
              <div className="inline-flex items-center bg-muted rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2.5 text-foreground hover:bg-accent rounded-l-lg transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 font-display font-semibold text-foreground text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2.5 text-foreground hover:bg-accent rounded-r-lg transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 space-y-3">
              <button onClick={handleBuyNow} className="w-full gradient-primary text-primary-foreground py-4 rounded-xl font-display font-semibold text-sm hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" /> Buy Now
              </button>
              <div className="grid grid-cols-2 gap-3">
                <a href={`https://wa.me/919709888456?text=Hi, I'm interested in ${product.name} (₹${variantPrice.toLocaleString("en-IN")})`} target="_blank" rel="noopener noreferrer" className="bg-accent text-accent-foreground py-3 rounded-xl font-display font-semibold text-sm hover:bg-accent/80 transition-colors inline-flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" /> WhatsApp
                </a>
                <Link to="/stores" className="bg-accent text-accent-foreground py-3 rounded-xl font-display font-semibold text-sm hover:bg-accent/80 transition-colors inline-flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" /> Check Store
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section - no standalone refurbishment card */}
        <div className="mt-16">
          <div className="flex gap-8 border-b border-border/30">
            {tabs.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`pb-3 text-sm font-display font-semibold transition-colors relative ${activeTab === tab.key ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                {tab.label}
                {activeTab === tab.key && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </button>
            ))}
          </div>

          <div className="mt-8 max-w-3xl">
            {activeTab === "specs" && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-4">Core Performance</h3>
                  <div className="space-y-4">
                    {[
                      ["Processor", product.specs.processor + " (Quad Core)"],
                      ["Base Clock Speed", "1.70 GHz (Turbo up to 3.60 GHz)"],
                      ["Graphics", "Intel UHD Graphics 620"],
                    ].map(([label, val]) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{label}</span>
                        <span className="text-sm font-semibold text-foreground">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-4">Display & Build</h3>
                  <div className="space-y-4">
                    {[
                      ["Panel Type", "Full HD IPS Anti-Glare"],
                      ["Resolution", "1920 × 1080"],
                      ["Weight", "1.4 kg (Starting)"],
                    ].map(([label, val]) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{label}</span>
                        <span className="text-sm font-semibold text-foreground">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === "refurbishment" && (
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">Each device undergoes our comprehensive 40-point quality inspection.</p>
                <div className="space-y-3">
                  {["Battery Health: 88% (Excellent)", "Display: Zero Dead Pixels or Scratches", "Thermal: Repasted with High-Grade Compound", "OS: Genuine Windows 11 Pro Pre-installed"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "warranty" && (
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground">Warranty:</strong> 6 Months Doorstep Warranty covering all hardware defects.</p>
                <p><strong className="text-foreground">Return Policy:</strong> 15-Day hassle-free returns for a full refund or exchange.</p>
                <p><strong className="text-foreground">Extended Warranty:</strong> Additional extensions available at checkout for up to 2 years.</p>
              </div>
            )}
          </div>
        </div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display font-extrabold text-2xl text-foreground tracking-tight mb-8">You May Also Like</h2>
            <ProductCarousel products={relatedProducts} />
          </div>
        )}

        {/* Customer Reviews / Testimonials */}
        <div className="mt-20">
          <h2 className="font-display font-extrabold text-2xl text-foreground tracking-tight mb-8">Customer Reviews</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {productReviews.map((r) => (
              <div key={r.id} className="bg-card rounded-xl p-5 shadow-ambient">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">"{r.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold">{r.name[0]}</div>
                  <div>
                    <p className="text-xs font-display font-semibold text-foreground">{r.name}</p>
                    <p className="text-[10px] text-muted-foreground">{r.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
