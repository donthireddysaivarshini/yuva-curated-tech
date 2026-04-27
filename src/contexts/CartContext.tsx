import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
  variant?: string;
  productId: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any, quantity: number, variant?: any) => boolean;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const addToCart = useCallback((product: any, quantity: number, variant?: any) => {
    const id = variant ? `${product.id}-${variant.ram}-${variant.storage}` : String(product.id);
    const stock = variant ? variant.stock : (product.stock || 0);
    const price = variant?.final_price ?? Number(product.price);
    const image = product.images?.find((i: any) => i.is_primary)?.image || product.images?.[0]?.image || "";

    let success = false;
    setItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      const currentQty = existing ? existing.quantity : 0;

      if (currentQty + quantity <= stock) {
        success = true;
        if (existing) {
          return prev.map((item) => item.id === id ? { ...item, quantity: item.quantity + quantity } : item);
        }
        return [...prev, { id, productId: product.id, name: product.title, price, image, quantity, stock, variant: variant ? `${variant.ram} / ${variant.storage}` : undefined }];
      }
      return prev;
    });
    return success;
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      if (quantity > item.stock) return prev;
      if (quantity <= 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, quantity } : i));
    });
  }, []);

  const removeFromCart = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clearCart = useCallback(() => setItems([]), []);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems: items.reduce((s, i) => s + i.quantity, 0), totalPrice: items.reduce((s, i) => s + i.price * i.quantity, 0), isDrawerOpen, setDrawerOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};