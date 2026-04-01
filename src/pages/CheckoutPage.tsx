import { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Order Placed!", description: "Thank you for your purchase. Our team will contact you shortly." });
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="font-display font-extrabold text-2xl text-foreground">Your cart is empty</h1>
        <Link to="/products" className="text-primary font-semibold mt-4 inline-block">← Continue Shopping</Link>
      </div>
    );
  }

  const shipping = 0;
  const total = totalPrice + shipping;

  return (
    <div className="bg-surface min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>

        <h1 className="font-display font-extrabold text-3xl text-foreground tracking-tight mb-10">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-10">
          {/* Left: Shipping */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-2xl p-8 shadow-ambient">
              <h2 className="font-display font-bold text-lg text-foreground mb-6">Shipping Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: "name", label: "Full Name", span: 2 },
                  { name: "email", label: "Email Address" },
                  { name: "phone", label: "Phone Number" },
                  { name: "address", label: "Address", span: 2 },
                  { name: "city", label: "City" },
                  { name: "state", label: "State" },
                  { name: "pincode", label: "Pincode" },
                ].map((field) => (
                  <div key={field.name} className={field.span === 2 ? "sm:col-span-2" : ""}>
                    <label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">{field.label}</label>
                    <input
                      name={field.name}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      required
                      className="w-full bg-input rounded-xl px-4 py-3 text-sm text-foreground font-body focus:bg-card focus:ring-2 focus:ring-primary/30 outline-none transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-ambient">
              <h2 className="font-display font-bold text-lg text-foreground mb-4">Payment</h2>
              <p className="text-muted-foreground text-sm">Our team will contact you to arrange payment via UPI, bank transfer, or EMI after order confirmation.</p>
              <div className="flex items-center gap-2 mt-4 text-success">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-sm font-semibold">Secure & encrypted checkout</span>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div>
            <div className="bg-card rounded-2xl p-6 shadow-ambient sticky top-24">
              <h2 className="font-display font-bold text-lg text-foreground mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3">
                    <img src={product.image} alt={product.name} className="w-14 h-14 object-contain rounded-lg bg-surface-low" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-display font-semibold text-foreground truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                    </div>
                    <p className="text-sm font-display font-bold text-foreground whitespace-nowrap">₹{(product.price * quantity).toLocaleString("en-IN")}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border/30 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-semibold">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-success font-semibold">FREE</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border/30">
                  <span className="font-display font-bold text-foreground">Total</span>
                  <span className="font-display font-extrabold text-xl text-foreground">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <button type="submit" className="w-full gradient-primary text-primary-foreground py-4 rounded-xl font-display font-semibold text-sm hover:opacity-90 transition-opacity mt-6">
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
