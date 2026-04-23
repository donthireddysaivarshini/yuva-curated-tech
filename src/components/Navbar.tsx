import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, User } from "lucide-react";
import { products } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  // ✅ FIX: Hook MUST be inside component
  const { isLoggedIn, user, logout } = useAuth();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof products>([]);

  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { totalItems, setDrawerOpen } = useCart();

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(q)
      );
      setSearchResults(filtered.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">

        {/* LEFT */}
        <Link to="/">
          <img src="/logo.png" className="h-12" />
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <button onClick={() => setSearchOpen(!searchOpen)}>
            <Search className="w-5 h-5" />
          </button>

          {/* CART */}
          <button onClick={() => setDrawerOpen(true)} className="relative">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 text-xs bg-black text-white px-1 rounded">
                {totalItems}
              </span>
            )}
          </button>

          {/* AUTH */}
          {isLoggedIn ? (
            <div className="relative group">
              <button className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition">
                <User className="w-5 h-5" />
                <span className="hidden sm:block">
                  Hi, {user?.first_name || "Account"}
                </span>
              </button>

              {/* DROPDOWN */}
              <div className="absolute right-0 top-full mt-2 w-44 bg-white border rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  My Profile
                </button>

                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:block">Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;