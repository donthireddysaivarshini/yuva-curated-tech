import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart, Search, User, Menu, X,
  ChevronDown, Package, LogOut, Loader2
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { storeService } from "@/services/api";
import MegaMenu from "./MegaMenu";

interface SearchResult {
  id: number;
  title: string;
  slug: string;
  sku: string;
  price: number;
  original_price?: number;
  image?: string;
  category_name: string;
  brand_name: string;
  discount_percentage: number;
}

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuData, setMenuData] = useState<{ categories: any[]; usageTags: any[]; brands: any[] }>({ 
    categories: [], 
    usageTags: [],
    brands: []
  });
  
  // SEARCH STATE
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ products: SearchResult[] }>({ products: [] });
  const [isSearching, setIsSearching] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { totalItems, setDrawerOpen } = useCart();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const [categories, usageTags, brands] = await Promise.all([
          storeService.getCategories(),
          storeService.getUsageTags(),
          storeService.getBrands()
        ]);
        setMenuData({ categories, usageTags, brands });
      } catch (e) {
        console.error("Failed to load menu data", e);
      }
    };
    fetchMenuData();
  }, []);
  

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.length > 0) {
        setIsSearching(true);
        try {
          const results = await storeService.searchProducts(searchQuery);
          setSearchResults(results);
        } catch (error) {
          setSearchResults({ products: [] });
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults({ products: [] });
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    setSearchQuery("");
    setSearchResults({ products: [] });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      setSearchResults({ products: [] });
    }
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products", hasMega: true },
    { label: "Bulk Orders", path: "/bulk-orders" },
    { label: "Company", path: "/company" },
    { label: "Stores", path: "/stores" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-20 md:h-24">
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-1 text-foreground -ml-1 mr-1 hover:bg-muted rounded">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link to="/" onClick={() => setMobileOpen(false)}>
              <img src="/logo.png" className="h-14 md:h-20 w-auto object-contain" />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.label} className="relative" onMouseEnter={() => link.hasMega && setMegaOpen(true)}>
                <Link to={link.path} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1">
                  {link.label} {link.hasMega && <ChevronDown className="w-3 h-3" />}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0" ref={searchRef}>
            <button onClick={toggleSearch} className="p-2 hover:bg-muted rounded-lg transition-all">
              {searchOpen ? <X className="w-5 h-5 text-primary" /> : <Search className="w-5 h-5" />}
            </button>
            <button onClick={() => setDrawerOpen(true)} className="relative p-2 hover:bg-muted rounded-lg">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && <span className="absolute -top-1 -right-1 text-xs bg-black text-white px-1 rounded">{totalItems}</span>}
            </button>
            {isLoggedIn ? (
              <div className="relative">
  <button
    onClick={() => setProfileOpen((prev) => !prev)}
    className="flex items-center gap-1 p-2 hover:bg-muted rounded-lg"
  >
    <User size={20} />
  </button>

  {profileOpen && (
    <div className="absolute right-0 top-full mt-2 w-40 bg-white border shadow-xl rounded-lg p-2 z-50">
      <button
        onClick={() => {
          setProfileOpen(false);
          navigate("/profile");
        }}
        className="block w-full p-2 text-sm text-left hover:bg-muted"
      >
        <Package size={16} className="inline mr-2" />
        Profile
      </button>

      <button
        onClick={() => {
          logout();
          setProfileOpen(false);
          navigate("/");
        }}
        className="block w-full p-2 text-sm text-red-600 text-left hover:bg-muted"
      >
        <LogOut size={16} className="inline mr-2" />
        Logout
      </button>
    </div>
  )}
</div>
            ) : <button onClick={() => navigate("/login")} className="p-2 hover:bg-muted rounded-lg"><User size={20}/></button>}
          </div>
        </div>

        {megaOpen && (
          <div onMouseLeave={() => setMegaOpen(false)} className="relative">
            <MegaMenu onClose={() => setMegaOpen(false)} categories={menuData.categories} usageTags={menuData.usageTags} brands={menuData.brands} />
          </div>
        )}

        {searchOpen && (
          <div className="absolute top-full left-0 w-full z-50 bg-white shadow-2xl border-b animate-in slide-in-from-top-2">
            <div className="container mx-auto px-4 py-4">
              <form onSubmit={handleSearchSubmit} className="relative bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-2">
                  <input
                    ref={inputRef}
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products, brands, categories..."
                    className="w-full py-3 px-4 text-base border-none outline-none"
                  />
                </div>
                <div className="max-h-96 overflow-y-auto border-t">
                  {isSearching ? <div className="p-8 text-center"><Loader2 className="animate-spin mx-auto text-primary" /></div> : 
                   searchResults.products.map((product) => (
                    <Link key={product.id} to={`/products/${product.slug}`} onClick={() => setSearchOpen(false)} className="flex gap-4 p-4 hover:bg-muted border-b">
                      {/* Image section removed */}
                      <div>
                        <div className="font-semibold">{product.title}</div>
                        <div className="text-sm text-primary">₹{product.price}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE HAMBURGER MENU - Your existing code (unchanged) */}
      {mobileOpen && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[99]" onClick={() => setMobileOpen(false)} />
          <div className="lg:hidden fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-[100] transform transition-transform duration-300 ease-in-out translate-x-0 flex flex-col">
            <div className="p-4 border-b flex items-center justify-between shrink-0">
              <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                <img src="/logo.png" className="h-9 w-auto object-contain" alt="Logo" />
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <Link to="/" onClick={() => setMobileOpen(false)} className="block py-3 px-3 font-bold text-lg border-b border-gray-200 hover:text-primary transition-colors">
                Home
              </Link>
              <div className="py-2 border-b border-gray-200">
                <MegaMenu 
                  onClose={() => setMobileOpen(false)}
                  categories={menuData.categories}
                  usageTags={menuData.usageTags}
                  isMobile={true}
                />
              </div>
              <div className="pt-3 space-y-1">
                <Link to="/bulk-orders" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 font-semibold text-sm hover:text-primary transition-colors border-b border-gray-100 last:border-b-0">Bulk Orders</Link>
                <Link to="/company" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 font-semibold text-sm hover:text-primary transition-colors border-b border-gray-100 last:border-b-0">Company</Link>
                <Link to="/stores" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 font-semibold text-sm hover:text-primary transition-colors border-b border-gray-100 last:border-b-0">Stores</Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 font-semibold text-sm hover:text-primary transition-colors">Contact Us</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;