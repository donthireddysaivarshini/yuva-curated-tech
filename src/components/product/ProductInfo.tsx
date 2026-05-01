import { useState, useMemo, useEffect } from "react";
import { ShoppingCart, Zap, Star, Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ProductInfo({ product, onVariantChange }: { product: any; onVariantChange: (v: any) => void }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  
  const ramOptions = useMemo(() => Array.from(new Set<string>((product.variants || []).map((v: any) => v.ram))), [product.variants]);
  const [selectedRam, setSelectedRam] = useState<string>(ramOptions[0] || "");
  
  const availableStorageForRam = useMemo(() => Array.from(new Set<string>(product.variants?.filter((v: any) => v.ram === selectedRam).map((v: any) => v.storage) || [])), [selectedRam, product.variants]);
  const [selectedStorage, setSelectedStorage] = useState<string>(availableStorageForRam[0] || "");

  useEffect(() => {
    if (availableStorageForRam.length > 0 && !availableStorageForRam.includes(selectedStorage)) setSelectedStorage(availableStorageForRam[0]);
  }, [selectedRam, availableStorageForRam, selectedStorage]);

  const activeVariant = useMemo(() => product.variants?.find((v: any) => v.ram === selectedRam && v.storage === selectedStorage), [selectedRam, selectedStorage, product.variants]);
  
  useEffect(() => {
    onVariantChange(activeVariant);
    setQuantity(1);
  }, [activeVariant, onVariantChange]);

  const currentStock = activeVariant ? activeVariant.stock : (product.stock || 0);

  const handleAddToCart = () => {
    const success = addToCart(product, quantity, activeVariant);
    if (success) toast.success("Added to cart!");
    else toast.error("Not enough stock available.");
  };

  const handleBuyNow = () => {
    const success = addToCart(product, quantity, activeVariant);
    if (success) navigate("/checkout");
    else toast.error("Product out of stock.");
  };

  const isStorageAvailable = (storage: string) => {
    if (!product.variants || product.variants.length === 0) return true;
    return availableStorageForRam.includes(storage);
  };

  const displayPrice = activeVariant ? Number(activeVariant.final_price) : Number(product.price);
  const originalPrice = activeVariant ? Number(activeVariant.final_original_price) : Number(product.original_price);
  const discount = product.discount_percentage || 0;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{product.title}</h1>
        
        {/* Updated Rating Block in ProductInfo.tsx */}
{product.review_count > 0 && (
  <div className="flex items-center gap-2 mt-1">
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-4 h-4 ${
            i < Math.floor(product.average_rating || 0) 
              ? "fill-current" 
              : "text-gray-300 fill-none"
          }`} 
        />
      ))}
    </div>
    <span className="font-semibold text-sm">{product.average_rating || 0}</span>
    <span className="text-xs text-muted-foreground font-semibold">({product.review_count} Reviews)</span>
  </div>
)}
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-3xl font-black text-foreground">₹{displayPrice.toLocaleString("en-IN")}</span>
        {originalPrice > displayPrice && (
          <>
            <span className="text-xl text-muted-foreground line-through font-medium">₹{originalPrice.toLocaleString("en-IN")}</span>
            <span className="text-xs font-bold text-success bg-success/10 px-2 py-0.5 rounded">{discount}% OFF</span>
          </>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">RAM</p>
        <div className="flex gap-2 flex-wrap">
          {ramOptions.map((ram: string) => (
            <button key={ram} onClick={() => setSelectedRam(ram)} 
              className={`px-4 py-1.5 border rounded-md font-medium text-sm transition-all ${selectedRam === ram ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary"}`}>
              {ram}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Storage</p>
        <div className="flex gap-2 flex-wrap">
          {Array.from(new Set(product.variants?.map((v: any) => v.storage as string) || [])).map((storage: string) => {
            const available = isStorageAvailable(storage);
            return (
              <button key={storage} onClick={() => available && setSelectedStorage(storage)} disabled={!available}
                className={`px-4 py-1.5 border rounded-md font-medium text-sm transition-all ${selectedStorage === storage ? "border-primary bg-primary/10 text-primary" : !available ? "border-border bg-muted text-muted-foreground opacity-50 cursor-not-allowed" : "border-border hover:border-primary"}`}>
                {storage}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4 py-4">
        <span className="text-sm font-bold">Quantity</span>
        <div className="flex items-center border rounded-lg">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-muted"><Minus size={16}/></button>
          <span className="px-4 font-bold">{quantity}</span>
          <button onClick={() => setQuantity(Math.min(currentStock, quantity + 1))} className="p-2 hover:bg-muted"><Plus size={16}/></button>
        </div>
        
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <button onClick={handleAddToCart} disabled={currentStock === 0}
          className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
          <ShoppingCart size={18} /> Add to Cart
        </button>
        <button onClick={handleBuyNow} disabled={currentStock === 0}
          className="w-full bg-[#82bc44] text-white py-3 rounded-lg font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
          <Zap size={18} /> Buy Now
        </button>
      </div>
    </div>
  );
}