import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems, isDrawerOpen, setDrawerOpen } = useCart();
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[60] animate-fade-in" onClick={() => setDrawerOpen(false)} />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-card z-[70] shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/30">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg text-foreground">Your Cart ({totalItems})</h2>
          </div>
          <button onClick={() => setDrawerOpen(false)} className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <p className="font-display font-semibold text-foreground">Cart is empty</p>
              <p className="text-muted-foreground text-sm mt-1">Add some products to get started.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-surface-low rounded-xl p-3">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-lg bg-card" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.variant || "Standard"}</p>
                  <p className="font-display font-semibold text-sm text-foreground truncate">{item.name}</p>
                  <p className="font-display font-extrabold text-foreground mt-1">₹{item.price.toLocaleString("en-IN")}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-secondary/80">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-secondary/80">
                      <Plus className="w-3 h-3" />
                    </button>
                    <button onClick={() => removeFromCart(item.id)} className="ml-auto p-1.5 text-destructive/60 hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-border/30 space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Subtotal</span>
              <span className="font-display font-extrabold text-lg text-foreground">₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>
            <button
              onClick={() => { setDrawerOpen(false); navigate("/checkout"); }}
              className="w-full gradient-primary text-primary-foreground py-3.5 rounded-xl font-display font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;