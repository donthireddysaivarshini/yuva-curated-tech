import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, User, Menu, X, ChevronDown, ChevronUp, Store } from "lucide-react";
import { categories, usageCategories, topSellingProducts, gamingLaptops, products } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";

const MegaMenu = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string) => {
    onClose();
    navigate(`/products?category=${categoryId}&sub=${subcategoryId}`);
  };

  return (
    <div className="absolute top-full left-0 w-full bg-card shadow-ambient z-50 animate-fade-in" onMouseLeave={onClose}>
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-5 gap-8">
          {categories.map((cat) => (
            <div key={cat.id}>
              <h3 className="font-display font-bold text-foreground mb-3 text-sm">{cat.name}</h3>
              <ul className="space-y-2">
                {cat.subcategories.map((sub) => (
                  <li key={sub.id}>
                    <button
                      onClick={() => handleSubcategoryClick(cat.id, sub.id)}
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      {sub.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-display font-bold text-foreground mb-3 text-sm">Find by Usage</h3>
            <ul className="space-y-2">
              {usageCategories.map((u) => (
                <li key={u.id}>
                  <button
                    onClick={() => { onClose(); navigate(`/products?usage=${u.id}`); }}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {u.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-border/30 flex gap-12">
          <div>
            <h4 className="font-display font-semibold text-xs text-muted-foreground mb-2 uppercase tracking-wider">Top Selling</h4>
            {topSellingProducts.map((p) => (
              <p key={p.name} className="text-sm text-foreground">{p.name} <span className="text-primary font-semibold">₹{p.price.toLocaleString("en-IN")}</span></p>
            ))}
          </div>
          <div>
            <h4 className="font-display font-semibold text-xs text-muted-foreground mb-2 uppercase tracking-wider">Gaming Laptop</h4>
            {gamingLaptops.map((g) => (
              <p key={g} className="text-sm text-muted-foreground">{g}</p>
            ))}
          </div>
        </div>
        <button
          onClick={() => { onClose(); navigate("/products"); }}
          className="mt-4 w-full gradient-primary text-primary-foreground py-3 rounded-lg font-display font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          VIEW ALL PRODUCTS →
        </button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { totalItems, setDrawerOpen } = useCart();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products", hasMega: true },
    { label: "Bulk Orders", path: "/bulk-orders" },
    { label: "Company", path: "/company" },
    { label: "Stores", path: "/stores" },
    { label: "Contact Us", path: "/contact" },
  ];

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.specs.processor.toLowerCase().includes(q) ||
          p.specs.ram.toLowerCase().includes(q) ||
          p.specs.storage.toLowerCase().includes(q)
      );
      setSearchResults(filtered.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-nav border-b border-border/30 relative">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-20 md:h-24">
        
        {/* LEFT SIDE: Hamburger & Logo */}
        <div className="flex items-center gap-0 sm:gap-2 shrink-0">
          <button
            onClick={() => {
              setMobileOpen(!mobileOpen);
              setSearchOpen(false); 
            }}
            className="lg:hidden p-1 text-foreground shrink-0 -ml-2 mr-1"
          >
            {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>

          <Link to="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
            <img src="/logo.png" alt="Yuva Computers" className="h-16 md:h-20 lg:h-24 w-auto max-w-[160px] sm:max-w-[200px] object-contain" />
          </Link>
        </div>

        {/* MIDDLE: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.hasMega && setMegaOpen(true)}
            >
              <Link
                to={link.path}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                {link.label}
                {link.hasMega && <ChevronDown className="w-3 h-3" />}
              </Link>
            </div>
          ))}
        </nav>

        {/* RIGHT SIDE: Icons */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
          
          {searchOpen ? (
            <div ref={searchRef} className="hidden lg:block relative">
              <form onSubmit={handleSearchSubmit} className="flex items-center bg-input rounded-lg px-3 py-1.5">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search devices..."
                  className="bg-transparent text-sm ml-2 outline-none w-48 font-body"
                />
              </form>
              {searchResults.length > 0 && (
                <div className="absolute top-full mt-1 left-0 right-0 bg-card rounded-lg shadow-lg border border-border/30 overflow-hidden z-50">
                  {searchResults.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors"
                    >
                      <img src={p.image} alt={p.name} className="w-8 h-8 object-contain" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground">₹{p.price.toLocaleString("en-IN")}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => {
                setSearchOpen(!searchOpen);
                setMobileOpen(false);
              }} 
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          <Link to="/stores" className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Store className="w-5 h-5" />
          </Link>

          <button onClick={() => setDrawerOpen(true)} className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 md:w-5 md:h-5 gradient-primary rounded-full text-primary-foreground text-[9px] md:text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          
          <button className="hidden lg:flex p-2 text-muted-foreground hover:text-foreground transition-colors">
            <User className="w-5 h-5" />
          </button>
          <Link
            to="/stores"
            className="hidden lg:inline-flex gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-display font-semibold hover:opacity-90 transition-opacity"
          >
            Find Store
          </Link>
        </div>
      </div>

      {/* MOBILE SEARCH BAR DROPDOWN */}
      {searchOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border/30 p-4 shadow-md z-40 animate-fade-in overflow-hidden">
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-input rounded-lg px-4 py-2.5">
            <Search className="w-5 h-5 text-muted-foreground shrink-0" />
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search devices..."
              className="bg-transparent text-sm ml-3 outline-none w-full font-body"
            />
          </form>
          {searchResults.length > 0 && (
            <div className="mt-2 bg-card rounded-lg border border-border/30 overflow-hidden">
              {searchResults.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors"
                >
                  <img src={p.image} alt={p.name} className="w-8 h-8 object-contain" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">₹{p.price.toLocaleString("en-IN")}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}

      {/* MOBILE HAMBURGER MENU DROPDOWN */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border/30 py-4 px-4 sm:px-6 space-y-4 animate-fade-in shadow-xl absolute top-full left-0 right-0 z-50 max-h-[85vh] overflow-y-auto overflow-x-hidden">
          <div className="space-y-2 pt-2">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.hasMega ? (
                  <div className="flex flex-col border-b border-border/10 pb-2 mb-2">
                    <button 
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className="flex items-center justify-between py-2 text-base font-bold text-foreground w-full text-left"
                    >
                      {link.label}
                      {mobileProductsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    
                    {mobileProductsOpen && (
                      <div className="pl-4 pb-2 space-y-2 border-l-2 border-primary/20 ml-2 mt-2 animate-fade-in">
                        {categories.map((cat) => (
                          <div key={cat.id} className="py-1">
                            <button
                              onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                              className="flex items-center justify-between w-full text-sm font-bold text-foreground py-2"
                            >
                              {cat.name}
                              {expandedCategory === cat.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                            </button>
                            
                            {expandedCategory === cat.id && (
                              <div className="pl-4 mt-1 space-y-1 animate-fade-in">
                                {cat.subcategories.map((sub) => (
                                  <button
                                    key={sub.id}
                                    onClick={() => {
                                      setMobileOpen(false);
                                      navigate(`/products?category=${cat.id}&sub=${sub.id}`);
                                    }}
                                    className="block text-sm text-muted-foreground hover:text-primary w-full text-left py-2"
                                  >
                                    {sub.name}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                        
                        <button
                          onClick={() => {
                            setMobileOpen(false);
                            navigate("/products");
                          }}
                          className="w-full text-left text-sm font-bold text-primary pt-4 pb-2"
                        >
                          View All Products →
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-base font-medium text-muted-foreground hover:text-foreground border-b border-border/10 last:border-0"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;