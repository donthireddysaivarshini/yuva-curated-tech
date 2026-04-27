import { Wrench, ShieldCheck, RotateCcw } from "lucide-react";

export default function TrustBadges({ product }: { product: any }) {
  if (!product) return null;

  return (
    <div className="grid grid-cols-3 gap-2 text-[10px] md:text-xs font-bold text-muted-foreground bg-muted/20 p-3 rounded-xl">
      <div className="flex flex-col items-center text-center gap-1">
        <Wrench size={20} className="text-primary"/>
        <span>{product.service_centers}</span>
      </div>
      <div className="flex flex-col items-center text-center gap-1">
        <ShieldCheck size={20} className="text-primary"/>
        <span>{product.warranty_period}</span>
      </div>
      <div className="flex flex-col items-center text-center gap-1">
        <RotateCcw size={20} className="text-primary"/>
        <span>{product.return_policy}</span>
      </div>
    </div>
  );
}