//yuvacomputers
import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { orderService, storeService } from "@/services/api";
import { toast } from "sonner";
import AddressManager from "@/components/profile/AddressManager";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [saveAsDefault, setSaveAsDefault] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'Online' | 'COD'>('Online');
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: "/checkout" } });
    }
  }, [isLoggedIn, navigate, location]);

  const calculations = useMemo(() => {
    const codFee = paymentMethod === 'COD' ? (totalPrice * 0.02) : 0;
    return {
      subtotal: totalPrice,
      codFee,
      total: totalPrice + codFee,
    };
  }, [totalPrice, paymentMethod]);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a shipping address");
      return;
    }

    setIsPlacingOrder(true);
    try {
      const orderData = {
        items: items.map(item => ({ variant_id: item.productId, price: item.price, quantity: item.quantity })),
        payment_method: paymentMethod,
        address: `${selectedAddress.address}, ${selectedAddress.city}`,
        phone: selectedAddress.phone
      };

      const res = await orderService.createOrder(orderData);

      // Check if it's COD based on the backend response
        if (paymentMethod === 'COD') {
            toast.success("COD Order Placed!");
            clearCart();
            navigate("/profile"); 
            return; // Stop here for COD
        }

        // Online Payment Logic
        const options = {
            key: res.key,
            amount: res.amount * 100, // Razorpay uses paise
            currency: "INR",
            name: "Yuva Computers",
            order_id: res.razorpay_order_id,
            handler: async (response: any) => {
                await orderService.verifyPayment({
                    order_id: res.order_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                });
                toast.success("Payment Successful!");
                clearCart();
                navigate("/profile");
            },
            theme: { color: "#1F2B5B" }
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();

    } catch (e: any) {
        // Log the actual error to understand why it failed
        console.error("Order process error:", e);
        toast.error(e?.error || "Order process failed");
    } finally {
        setIsPlacingOrder(false);
    }
};
  if (items.length === 0) {
    return <div className="text-center py-24">Cart is empty. <Link to="/products" className="text-primary font-bold">Shop now</Link></div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-10">
        
        <div className="lg:col-span-2 space-y-6">
          <AddressManager onSelect={setSelectedAddress} />
          
          <div className="bg-card p-6 rounded-xl border">
            <h2 className="font-bold mb-4">Payment Method</h2>
            <div className="flex gap-4">
              {['Online', 'COD'].map((method) => (
                <button key={method} onClick={() => setPaymentMethod(method as any)}
                  className={`p-4 border rounded-lg ${paymentMethod === method ? "border-primary bg-primary/10" : ""}`}>
                  {method}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card p-6 rounded-xl border shadow-sm sticky top-24">
            <h2 className="font-bold mb-4">Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{calculations.subtotal}</span></div>
              {paymentMethod === 'COD' && <div className="flex justify-between"><span>COD Fee (2%)</span><span>₹{calculations.codFee.toFixed(2)}</span></div>}
              <div className="flex justify-between font-bold pt-2 border-t"><span>Total</span><span>₹{calculations.total.toFixed(2)}</span></div>
            </div>
            <button onClick={handlePlaceOrder} disabled={isPlacingOrder} className="w-full bg-primary text-white py-3 mt-6 rounded-lg font-bold">
              {isPlacingOrder ? <Loader2 className="animate-spin mx-auto" /> : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;