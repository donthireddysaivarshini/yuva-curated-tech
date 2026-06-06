//reference product image gallery section
import { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, Share2 } from "lucide-react";
import { toast } from "sonner";

export default function ImageGallery({ product }: { product: any }) {
  const [current, setCurrent] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const images = product.images || [];

  const handleShare = async () => {
    // 1) Professional Native Share (WhatsApp, Instagram, etc.)
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out this product: ${product.title}`,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback if user cancels or sharing fails
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-square bg-muted/20 rounded-2xl overflow-hidden p-6 flex items-center justify-center group">
        <button onClick={handleShare} className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full shadow-sm">
          <Share2 size={18} />
        </button>
        <button onClick={() => setZoomed(true)} className="absolute bottom-4 right-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full shadow-sm">
          <ZoomIn size={18} />
        </button>
        
        <img 
          src={images[current]?.image} 
          alt={product.title} 
          className="w-full h-full object-contain cursor-pointer" 
          onClick={() => setZoomed(true)} 
        />

        {/* Mobile Navigation Arrows */}
        <button className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/50 rounded-full md:hidden" onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)}><ChevronLeft /></button>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/50 rounded-full md:hidden" onClick={() => setCurrent((prev) => (prev + 1) % images.length)}><ChevronRight /></button>
        
        {/* Mobile Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 md:hidden">
          {images.map((_: any, i: number) => <div key={i} className={`w-2 h-2 rounded-full ${current === i ? "bg-primary" : "bg-white shadow"}`} />)}
        </div>
      </div>

      {/* Thumbnails (Desktop) */}
      <div className="hidden md:flex gap-2 overflow-x-auto">
        {images.map((img: any, i: number) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-16 h-16 rounded-lg border-2 ${current === i ? "border-primary" : "border-transparent"}`}>
            <img src={img.image} className="w-full h-full object-cover rounded-md" />
          </button>
        ))}
      </div>

      {/* Fullscreen Zoom Modal (Made big for mobile) */}
      {zoomed && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-0">
          <button className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full" onClick={() => setZoomed(false)}><X size={30} /></button>
          {/* Using object-contain and full viewport height for "big" look */}
          <img src={images[current]?.image} className="w-full h-full object-contain p-2" />
        </div>
      )}
    </div>
  );
}