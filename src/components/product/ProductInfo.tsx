//product info component
import { useState, useMemo, useEffect } from "react";
import { ShoppingCart, Zap, Star, Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export default function ProductInfo({
  product,
  onVariantChange,
}: {
  product: any;
  onVariantChange: (v: any) => void;
}) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);


  const variants: any[] = product.variants || [];


  // ── SORT helper (ensures consistent ordering everywhere) ───────
  const sortValues = (arr: string[]) =>
    [...new Set(arr)].sort((a, b) => a.localeCompare(b));


  // ── Determine whether variants use processor field ─────────────
  const hasProcessorVariants = useMemo(
    () => variants.some((v) => v.processor && v.processor.trim() !== ""),
    [variants]
  );


  // ── Step 1: Processor options (SORTED) ─────────────────────────
  const processorOptions = useMemo(() => {
    if (!hasProcessorVariants) return [];
    return sortValues(variants.map((v) => v.processor).filter(Boolean));
  }, [variants, hasProcessorVariants]);


  const [selectedProcessor, setSelectedProcessor] = useState<string>(
    processorOptions[0] || ""
  );


  // ── Step 2: RAM options (SORTED) ───────────────────────────────
  const ramOptions = useMemo(() => {
    const source = hasProcessorVariants
      ? variants.filter((v) => v.processor === selectedProcessor)
      : variants;

    return sortValues(source.map((v) => v.ram));
  }, [variants, selectedProcessor, hasProcessorVariants]);


  const [selectedRam, setSelectedRam] = useState<string>(
    ramOptions[0] || ""
  );


  // ── Step 3: Storage options (SORTED) ───────────────────────────
  const storageOptions = useMemo(() => {
    const source = hasProcessorVariants
      ? variants.filter(
          (v) => v.processor === selectedProcessor && v.ram === selectedRam
        )
      : variants.filter((v) => v.ram === selectedRam);

    return sortValues(source.map((v) => v.storage));
  }, [variants, selectedProcessor, selectedRam, hasProcessorVariants]);


  const [selectedStorage, setSelectedStorage] = useState<string>(
    storageOptions[0] || ""
  );


  // ── Cascade fixes ───────────────────────────────────────────────
  useEffect(() => {
    if (ramOptions.length > 0 && !ramOptions.includes(selectedRam)) {
      setSelectedRam(ramOptions[0]);
    }
  }, [selectedProcessor, ramOptions]);


  useEffect(() => {
    if (storageOptions.length > 0 && !storageOptions.includes(selectedStorage)) {
      setSelectedStorage(storageOptions[0]);
    }
  }, [selectedRam, storageOptions]);


  // ── Active variant ──────────────────────────────────────────────
  const activeVariant = useMemo(() => {
    if (hasProcessorVariants) {
      return variants.find(
        (v) =>
          v.processor === selectedProcessor &&
          v.ram === selectedRam &&
          v.storage === selectedStorage
      );
    }
    return variants.find(
      (v) => v.ram === selectedRam && v.storage === selectedStorage
    );
  }, [variants, selectedProcessor, selectedRam, selectedStorage, hasProcessorVariants]);


  useEffect(() => {
    onVariantChange(activeVariant);
    setQuantity(1);
  }, [activeVariant, onVariantChange]);


  const currentStock = activeVariant ? activeVariant.stock : product.stock || 0;


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


  // ── PRICE FIX (BASE PRICE FIRST ALWAYS) ─────────────────────────
  const basePrice = Number(product.price);

  const displayPrice = activeVariant
    ? Number(activeVariant.final_price)
    : basePrice;

  const originalPrice = activeVariant
    ? Number(activeVariant.final_original_price)
    : Number(product.original_price);

  const discount = product.discount_percentage || 0;


  const isStorageAvailable = (storage: string) =>
    variants.length === 0 || storageOptions.includes(storage);


  const allStorages = useMemo(
    () => sortValues(variants.map((v) => v.storage)),
    [variants]
  );


  return (
    <div className="space-y-4">
      {/* Title + Rating */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          {product.title}
        </h1>
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
            <span className="text-xs text-muted-foreground font-semibold">
              ({product.review_count} Reviews)
            </span>
          </div>
        )}
      </div>


      {/* PRICE (FIXED - BASE PRICE FIRST) */}
      {/* ─── AFTER (FIXED CHANGE) ─── */}
{/* PRICE (UPDATED TO DISPLAY ONLY THE FINAL VARIANT PRICE) */}
<div className="flex items-center gap-3">
  {/* Displays only the single active final price */}
  <span className="text-3xl font-black text-foreground">
    ₹{displayPrice.toLocaleString("en-IN")}
  </span>

  {/* ORIGINAL PRICE + DISCOUNT (COMPARED AGAINST THE FINAL DISPLAY PRICE) */}
  {originalPrice > displayPrice && (
    <>
      <span className="text-xl text-muted-foreground line-through font-medium">
        ₹{originalPrice.toLocaleString("en-IN")}
      </span>
      <span className="text-xs font-bold text-success bg-success/10 px-2 py-0.5 rounded">
        {discount}% OFF
      </span>
    </>
  )}
</div>


      {/* Variant selectors — only show if variants exist */}
      {variants.length > 0 && (
        <>
          {/* Processor selector — SORTED */}
          {hasProcessorVariants && processorOptions.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Processor
              </p>
              <div className="flex gap-2 flex-wrap">
                {processorOptions.map((proc) => (
                  <button
                    key={proc}
                    onClick={() => setSelectedProcessor(proc)}
                    className={`px-4 py-1.5 border rounded-md font-medium text-sm transition-all ${
                      selectedProcessor === proc
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {proc}
                  </button>
                ))}
              </div>
            </div>
          )}


          {/* RAM selector — SORTED */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              RAM
            </p>
            <div className="flex gap-2 flex-wrap">
              {ramOptions.map((ram) => (
                <button
                  key={ram}
                  onClick={() => setSelectedRam(ram)}
                  className={`px-4 py-1.5 border rounded-md font-medium text-sm transition-all ${
                    selectedRam === ram
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {ram}
                </button>
              ))}
            </div>
          </div>


          {/* Storage selector — SORTED */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Storage
            </p>
            <div className="flex gap-2 flex-wrap">
              {allStorages.map((storage) => {
                const available = isStorageAvailable(storage);
                return (
                  <button
                    key={storage}
                    onClick={() => available && setSelectedStorage(storage)}
                    disabled={!available}
                    className={`px-4 py-1.5 border rounded-md font-medium text-sm transition-all ${
                      selectedStorage === storage
                        ? "border-primary bg-primary/10 text-primary"
                        : !available
                        ? "border-border bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {storage}
                  </button>
                );
              })}
            </div>
          </div>


          {/* Stock badge */}
          {activeVariant && (
            <p
              className={`text-xs font-semibold ${
                currentStock === 0
                  ? "text-destructive"
                  : currentStock <= 3
                  ? "text-orange-500"
                  : "text-success"
              }`}
            >
              {currentStock === 0
                ? "Out of Stock"
                : currentStock <= 3
                ? `Only ${currentStock} left!`
                : "In Stock"}
            </p>
          )}
        </>
      )}


      {/* Quantity */}
      <div className="flex items-center gap-4 py-4">
        <span className="text-sm font-bold">Quantity</span>
        <div className="flex items-center border rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 hover:bg-muted"
          >
            <Minus size={16} />
          </button>
          <span className="px-4 font-bold">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
            className="p-2 hover:bg-muted"
            disabled={currentStock === 0}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>


      {/* CTA buttons */}
      <div className="flex flex-col gap-2 pt-2">
        <button
          onClick={handleAddToCart}
          disabled={currentStock === 0}
          className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <ShoppingCart size={18} /> Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          disabled={currentStock === 0}
          className="w-full bg-[#82bc44] text-white py-3 rounded-lg font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Zap size={18} /> Buy Now
        </button>
      </div>
    </div>
  );
}