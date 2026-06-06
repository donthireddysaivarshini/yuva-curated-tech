//cartdrawer
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems, isDrawerOpen, setDrawerOpen } = useCart();
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] animate-fade-in"
        onClick={() => setDrawerOpen(false)}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-card z-[70] shadow-2xl flex flex-col animate-slide-in-right">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/30">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg text-foreground">
              Cart ({totalItems})
            </h2>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-14 h-14 text-muted-foreground/20 mb-4" />
              <p className="font-display font-semibold text-foreground">Cart is empty</p>
              <p className="text-muted-foreground text-sm mt-1">Add products to get started.</p>
              <button
                onClick={() => { setDrawerOpen(false); navigate('/products'); }}
                className="mt-4 gradient-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-bold"
              >
                Browse Products
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-muted/30 rounded-xl p-3">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain rounded-lg bg-card p-1 border border-border/20 shrink-0"
                  />
                ) : (
                  <div className="w-20 h-20 bg-muted rounded-lg shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-sm text-foreground line-clamp-2 leading-tight">
                    {item.name}
                  </p>
                  {item.variant && (
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                      {item.variant}
                    </p>
                  )}
                  <p className="font-display font-extrabold text-foreground mt-1.5">
                    ₹{item.price.toLocaleString('en-IN')}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => {
                        if (item.quantity === 1) removeFromCart(item.id);
                        else updateQuantity(item.id, item.quantity - 1);
                      }}
                      className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                    >
                      {item.quantity === 1
                        ? <Trash2 className="w-3 h-3 text-destructive" />
                        : <Minus className="w-3 h-3" />}
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto p-1.5 text-destructive/60 hover:text-destructive transition-colors"
                    >
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
          <div className="px-6 py-5 border-t border-border/30 space-y-4 bg-card">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Subtotal</span>
              <span className="font-display font-extrabold text-xl text-foreground">
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground text-center">
              Shipping & taxes calculated at checkout
            </p>
            <button
              onClick={() => { setDrawerOpen(false); navigate('/checkout'); }}
              className="w-full gradient-primary text-primary-foreground py-4 rounded-xl font-display font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;