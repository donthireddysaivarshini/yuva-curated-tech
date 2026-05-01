import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Tag, X, ChevronRight, ShieldCheck, Truck, AlertCircle, Gift, CheckCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { orderService, storeService } from "@/services/api";
import { toast } from "sonner";
import AddressManager from "@/components/profile/AddressManager";


export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'Online' | 'COD'>('Online');
  const [hasAddresses, setHasAddresses] = useState<boolean | null>(null);
  // Coupon
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState<{ code: string; discount: number } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  // Exchange code
  const [exchangeCode, setExchangeCode] = useState('');
  const [exchangeApplied, setExchangeApplied] = useState<{ code: string; minValue: number } | null>(null);
  const [exchangeLoading, setExchangeLoading] = useState(false);

  const [saveAsDefault, setSaveAsDefault] = useState(false);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [siteConfig, setSiteConfig] = useState<any>(null);

  useEffect(() => {
    if (!isLoggedIn) navigate('/login', { state: { from: '/checkout' } });
    storeService.getSiteConfig().then(setSiteConfig).catch(() => {});
  }, [isLoggedIn]);

  const calc = useMemo(() => {
    const subtotal = totalPrice;
    const couponDiscount = couponApplied?.discount || 0;
    const exchangeDiscount = exchangeApplied ? Math.min(exchangeApplied.minValue, subtotal) : 0;
    const totalDiscount = couponDiscount + exchangeDiscount;
    const taxable = Math.max(0, subtotal - totalDiscount);

    const freeThreshold = Number(siteConfig?.free_shipping_threshold || 0);
    const shippingFlat = Number(siteConfig?.shipping_fee || 0);
    const shipping = freeThreshold > 0 && subtotal >= freeThreshold ? 0 : shippingFlat;

    const codPct = Number(siteConfig?.cod_surcharge_percentage || 2);
    const codFee = paymentMethod === 'COD' ? (subtotal * codPct / 100) : 0;
    const tax = (taxable * Number(siteConfig?.tax_percentage || 0)) / 100;
    const total = taxable + tax + shipping + codFee;

    return { subtotal, couponDiscount, exchangeDiscount, totalDiscount, shipping, codFee, tax, total, codPct };
  }, [totalPrice, couponApplied, exchangeApplied, paymentMethod, siteConfig]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    if (couponApplied) { setCouponApplied(null); setCouponCode(''); return; }
    setCouponLoading(true);
    try {
      const res = await storeService.validateCoupon(couponCode.trim(), totalPrice);
      setCouponApplied({ code: couponCode.trim().toUpperCase(), discount: res.discount });
      toast.success(res.message || 'Coupon applied!');
    } catch (err: any) {
      toast.error(err?.error || 'Invalid coupon code');
    } finally { setCouponLoading(false); }
  };

  const handleApplyExchangeCode = async () => {
    if (!exchangeCode.trim()) return;
    if (exchangeApplied) { setExchangeApplied(null); setExchangeCode(''); return; }
    setExchangeLoading(true);
    try {
      const res = await orderService.validateExchangeCode(exchangeCode.trim());
      if (res.valid) {
        if (totalPrice < res.original_order_value) {
          toast.error(`New order must be at least ₹${res.original_order_value.toLocaleString('en-IN')} to use this code`);
          return;
        }
        setExchangeApplied({ code: exchangeCode.trim().toUpperCase(), minValue: res.original_order_value });
        toast.success(`Exchange code applied! ₹${res.original_order_value.toLocaleString('en-IN')} discount applied.`);
      } else {
        toast.error(res.error || 'Invalid exchange code');
      }
    } catch (err: any) {
      toast.error(err?.error || 'Invalid exchange code');
    } finally { setExchangeLoading(false); }
  };

  const handlePlaceOrder = async () => {
  setCheckoutError(null);

  if (!selectedAddress) {
  setCheckoutError("Please add or select a shipping address to continue");
  return;
}

  if (!acceptedPolicy) {
    setCheckoutError("Please accept return & exchange policy");
    return;
  }

  if (items.length === 0) {
    setCheckoutError("Your cart is empty");
    return;
  }

  setIsPlacingOrder(true);
    try {
      const orderPayload = {
        items: items.map(item => ({
          product_id: item.id.toString().split('-')[0],
          variant_id: item.variantId || null,
          price: item.price,
          quantity: item.quantity,
        })),
        payment_method: paymentMethod,
        coupon_code: couponApplied?.code || '',
        exchange_code: exchangeApplied?.code || '',
        save_as_default: saveAsDefault,
        accepted_return_policy: acceptedPolicy,
        first_name: selectedAddress.first_name,
        last_name: selectedAddress.last_name,
        phone: selectedAddress.phone,
        address: selectedAddress.address,
        apartment: selectedAddress.apartment || '',
        landmark: selectedAddress.landmark || '',
        city: selectedAddress.city,
        state: selectedAddress.state,
        zip_code: selectedAddress.zip_code,
        country: selectedAddress.country,
      };

      const res = await orderService.createOrder(orderPayload);

      if (paymentMethod === 'COD') {
        clearCart();
        toast.success('Order placed! Our team will contact you.');
        navigate('/profile?tab=orders');
        return;
      }

      const options = {
        key: res.key,
        amount: res.amount,
        currency: 'INR',
        name: 'Yuva Computers',
        description: 'Certified Refurbished Tech',
        order_id: res.razorpay_order_id,
        handler: async (response: any) => {
          try {
            await orderService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            clearCart();
            toast.success('Payment successful! Order confirmed.');
            navigate('/profile?tab=orders');
          } catch {
            toast.error('Payment verification failed. Contact support.');
          }
        },
        prefill: {
          name: `${selectedAddress.first_name} ${selectedAddress.last_name}`,
          contact: selectedAddress.phone,
        },
        theme: { color: '#1F4C8C' },
        modal: { ondismiss: () => { toast.error('Payment cancelled.'); setIsPlacingOrder(false); } }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      toast.error(err?.error || 'Order failed. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="font-display font-bold text-2xl mb-4">Your cart is empty</h1>
        <Link to="/products" className="text-primary hover:underline font-semibold">← Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* px-4 provides necessary gutters on mobile so content doesn't hit the screen edges */}
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-8">
        <h1 className="font-display font-extrabold text-2xl md:text-3xl text-foreground mb-8">Checkout</h1>

        {/* grid-cols-1 by default (mobile), lg:grid-cols-3 for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address */}
            <div className="bg-card rounded-2xl border border-border/30 p-6">
              <AddressManager onSelect={setSelectedAddress} selectedId={selectedAddress?.id} />
              {selectedAddress && (
                <label className="flex items-center gap-2 mt-4 cursor-pointer">
                  <input type="checkbox" checked={saveAsDefault} onChange={e => setSaveAsDefault(e.target.checked)} className="rounded accent-primary" />
                  <span className="text-sm text-muted-foreground">Save as my default address</span>
                </label>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-card rounded-2xl border border-border/30 p-6 space-y-4">
              <h3 className="font-display font-bold text-foreground">Payment Method</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(['Online', 'COD'] as const).map(method => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${paymentMethod === method ? 'border-primary bg-primary/5' : 'border-border/30 hover:border-border'}`}
                  >
                    <p className="font-bold text-sm text-foreground">
                      {method === 'Online' ? '💳 Online Payment' : '💵 Cash on Delivery'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {method === 'Online' ? 'UPI, Cards, Net Banking via Razorpay' : `+${calc.codPct}% COD handling fee`}
                    </p>
                  </button>
                ))}
              </div>
              {paymentMethod === 'COD' && (
                <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-700">A {calc.codPct}% COD fee (₹{calc.codFee.toFixed(0)}) is added, collected at delivery.</p>
                </div>
              )}
              <div className="flex items-center gap-2 text-success text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-medium">Secure & encrypted checkout</span>
              </div>
            </div>
          </div>

          {/* RIGHT - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border/30 p-6 space-y-5 lg:sticky lg:top-28">
              <h3 className="font-display font-bold text-foreground">Order Summary</h3>

              {/* Cart Items */}
              <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    {item.image
                      ? <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded-lg bg-muted/30 border border-border/20 p-1 shrink-0" />
                      : <div className="w-12 h-12 bg-muted rounded-lg shrink-0" />
                    }
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground line-clamp-1">{item.name}</p>
                      {item.variant && <p className="text-[10px] text-muted-foreground uppercase">{item.variant}</p>}
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-foreground whitespace-nowrap">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider">Coupon Code</label>
                <div className="flex gap-2">
                  <input
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value.toUpperCase())}
                    disabled={!!couponApplied}
                    placeholder="SAVE20"
                    className="flex-1 border border-border/30 rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 font-mono uppercase"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || !couponCode.trim()}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-60 ${couponApplied ? 'bg-destructive/10 text-destructive' : 'gradient-primary text-primary-foreground'}`}
                  >
                    {couponLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : couponApplied ? <X className="w-4 h-4" /> : 'Apply'}
                  </button>
                </div>
                {couponApplied && (
                  <div className="flex items-center gap-2 p-2.5 bg-success/10 border border-success/20 rounded-lg">
                    <Tag className="w-3.5 h-3.5 text-success" />
                    <span className="text-xs font-bold text-success">{couponApplied.code} — Save ₹{couponApplied.discount.toFixed(0)}</span>
                  </div>
                )}
              </div>

              {/* Exchange Code */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-primary" /> Exchange Code
                </label>
                <div className="flex gap-2">
                  <input
                    value={exchangeCode}
                    onChange={e => setExchangeCode(e.target.value.toUpperCase())}
                    disabled={!!exchangeApplied}
                    placeholder="YC-XXXXXXXX"
                    className="flex-1 border border-border/30 rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 font-mono uppercase"
                  />
                  <button
                    onClick={handleApplyExchangeCode}
                    disabled={exchangeLoading || !exchangeCode.trim()}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-60 ${exchangeApplied ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary border border-primary/30'}`}
                  >
                    {exchangeLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : exchangeApplied ? <X className="w-4 h-4" /> : 'Apply'}
                  </button>
                </div>
                {exchangeApplied && (
                  <div className="flex items-center gap-2 p-2.5 bg-primary/5 border border-primary/20 rounded-lg">
                    <CheckCircle className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-bold text-primary">
                      {exchangeApplied.code} — ₹{exchangeApplied.minValue.toLocaleString('en-IN')} exchange credit applied
                    </span>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-border/20 pt-4 space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{calc.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {calc.couponDiscount > 0 && (
                  <div className="flex justify-between text-sm text-success">
                    <span>Coupon Discount</span>
                    <span className="font-medium">−₹{calc.couponDiscount.toFixed(0)}</span>
                  </div>
                )}
                {calc.exchangeDiscount > 0 && (
                  <div className="flex justify-between text-sm text-primary">
                    <span>Exchange Credit</span>
                    <span className="font-medium">−₹{calc.exchangeDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Shipping</span>
                  <span className={`font-medium ${calc.shipping === 0 ? 'text-success' : ''}`}>
                    {calc.shipping === 0 ? 'FREE' : `₹${calc.shipping}`}
                  </span>
                </div>
                {calc.codFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">COD Fee ({calc.codPct}%)</span>
                    <span className="font-medium">₹{calc.codFee.toFixed(0)}</span>
                  </div>
                )}
                {calc.tax > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">₹{calc.tax.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-border/20">
                  <span className="font-display font-bold text-foreground">Total</span>
                  <span className="font-display font-extrabold text-xl text-foreground">
                    ₹{calc.total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              {/* Return Policy Acceptance */}
              <div className="bg-muted/30 rounded-xl p-4 space-y-3 border border-border/20">
                <p className="text-[10px] font-bold text-foreground uppercase tracking-wider">Return & Exchange Policy</p>
                <ul className="text-xs text-muted-foreground space-y-1.5">
                  <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">•</span>15-day exchange/upgrade for product defects only</li>
                  <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">•</span>No cash refunds — exchange or upgrade only</li>
                  <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">•</span>Replacement must be equal or higher value</li>
                </ul>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={acceptedPolicy} onChange={e => setAcceptedPolicy(e.target.checked)} className="mt-0.5 accent-primary" />
                  <span className="text-xs text-foreground font-medium leading-relaxed">I accept the return & exchange policy</span>
                </label>
              </div>
              {checkoutError && (
  <div className="mb-3 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
    {checkoutError}
  </div>
)}

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="w-full gradient-primary text-primary-foreground py-4 rounded-xl font-display font-bold text-sm uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2"
              >
                {isPlacingOrder
                  ? <><Loader2 className="animate-spin w-4 h-4" /> Processing...</>
                  : <>{paymentMethod === 'COD' ? 'Place COD Order' : 'Pay Now'}<ChevronRight className="w-4 h-4" /></>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}