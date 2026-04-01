import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, User, Menu, X, ChevronDown } from "lucide-react";
import { categories, usageCategories, topSellingProducts, gamingLaptops } from "@/data/mockData";
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
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, setDrawerOpen } = useCart();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products", hasMega: true },
    { label: "Bulk Orders", path: "/bulk-orders" },
    { label: "Company", path: "/company" },
    { label: "Stores", path: "/stores" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-border/30">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="font-display font-extrabold text-xl text-foreground tracking-tight">
          Yuva<span className="text-primary">Computers</span>
        </Link>

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

        <div className="flex items-center gap-3">
          {searchOpen ? (
            <div className="hidden lg:flex items-center bg-input rounded-lg px-3 py-1.5">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                autoFocus
                placeholder="Search devices..."
                className="bg-transparent text-sm ml-2 outline-none w-48 font-body"
                onBlur={() => setSearchOpen(false)}
              />
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="hidden lg:flex p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Search className="w-5 h-5" />
            </button>
          )}
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <ShoppingCart className="w-5 h-5" />
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
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}

      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-border/30 py-4 px-6 space-y-2 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
