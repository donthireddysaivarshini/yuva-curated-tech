import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, MessageSquare, MapPin, CheckCircle, Shield, Cpu, MemoryStick, HardDrive, Monitor, Download } from "lucide-react";
import { products } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";

const specIcons: Record<string, React.ElementType> = {
  processor: Cpu,
  ram: MemoryStick,
  storage: HardDrive,
  display: Monitor,
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart, setDrawerOpen } = useCart();
  const [activeTab, setActiveTab] = useState<"specs" | "refurbishment" | "warranty">("specs");

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="font-display font-extrabold text-2xl text-foreground">Product not found</h1>
        <Link to="/products" className="text-primary font-semibold mt-4 inline-block">← Back to Products</Link>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const reportId = `YUVA-${product.id.padStart(4, "0")}-0924`;

  const handleBuyNow = () => {
    addToCart(product);
    setDrawerOpen(true);
  };

  const tabs = [
    { key: "specs" as const, label: "Full Specifications" },
    { key: "refurbishment" as const, label: "Refurbishment Report" },
    { key: "warranty" as const, label: "Warranty & Return Policy" },
  ];

  return (
    <div className="bg-surface min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>›</span>
          <Link to="/products" className="hover:text-foreground transition-colors">Laptops</Link>
          <span>›</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Main PDP Section */}
      <div className="container mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
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

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <span className="inline-flex items-center gap-1.5 bg-success-soft text-success px-3 py-1.5 rounded-lg text-xs font-display font-semibold w-fit">
              <CheckCircle className="w-3.5 h-3.5" />
              Condition: {product.condition}
            </span>

            <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-foreground mt-4 leading-tight tracking-tight">
              {product.name} | {product.specs.display} | {product.specs.processor.split(" ").slice(-1)} | {product.specs.ram} | {product.specs.storage}
            </h1>

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display font-extrabold text-3xl text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
              <span className="text-muted-foreground line-through text-lg">₹{product.originalPrice.toLocaleString("en-IN")}</span>
              <span className="text-primary font-display font-semibold text-sm">{discount}% OFF</span>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {(Object.entries(product.specs) as [string, string][]).map(([key, value]) => {
                const Icon = specIcons[key] || Cpu;
                return (
                  <div key={key} className="bg-surface-low rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground capitalize">{key}</p>
                      <p className="text-sm font-display font-semibold text-foreground">{value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trust Signals */}
            <div className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm text-muted-foreground">40-Point Quality Inspection Passed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm text-muted-foreground">6 Months Doorstep Warranty</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 space-y-3">
              <button onClick={handleBuyNow} className="w-full gradient-primary text-primary-foreground py-4 rounded-xl font-display font-semibold text-sm hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" /> Buy Now
              </button>
              <div className="grid grid-cols-2 gap-3">
                <a href={`https://wa.me/919709888456?text=Hi, I'm interested in ${product.name} (₹${product.price.toLocaleString("en-IN")})`} target="_blank" rel="noopener noreferrer" className="bg-secondary text-secondary-foreground py-3 rounded-xl font-display font-semibold text-sm hover:bg-secondary/80 transition-colors inline-flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" /> WhatsApp
                </a>
                <Link to="/stores" className="bg-secondary text-secondary-foreground py-3 rounded-xl font-display font-semibold text-sm hover:bg-secondary/80 transition-colors inline-flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" /> Check Store
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="flex gap-8 border-b border-border/30">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 text-sm font-display font-semibold transition-colors relative ${activeTab === tab.key ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {tab.label}
                {activeTab === tab.key && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </button>
            ))}
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-8">
            {/* Left: Tab Content */}
            <div>
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
                  <p className="text-muted-foreground text-sm">Each device undergoes our comprehensive 40-point quality inspection to ensure premium performance.</p>
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
                  <p><strong className="text-foreground">Warranty:</strong> 6 Months Doorstep Warranty covering all hardware defects and malfunctions.</p>
                  <p><strong className="text-foreground">Return Policy:</strong> 15-Day hassle-free returns. If the product doesn't meet your expectations, return it for a full refund or exchange.</p>
                  <p><strong className="text-foreground">Extended Warranty:</strong> Additional warranty extensions available at checkout for up to 2 years.</p>
                </div>
              )}
            </div>

            {/* Right: Refurbishment Report Card */}
            <div className="bg-surface-low rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-foreground">Refurbishment Report</h4>
                  <p className="text-xs text-muted-foreground">Report ID: #{reportId}</p>
                </div>
              </div>
              <div className="space-y-3">
                {["Battery Health: 88% (Excellent)", "Display: Zero Dead Pixels or Scratches", "Thermal: Repasted with High-Grade Compound", "OS: Genuine Windows 11 Pro Pre-installed"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full bg-card text-foreground py-3 rounded-xl font-display font-semibold text-sm ghost-border hover:bg-secondary/50 transition-colors inline-flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download Full Inspection PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
