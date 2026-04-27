import { useState, useEffect } from "react";
import { CheckCircle, ShieldCheck, Wrench, FileText } from "lucide-react";

interface ProductTabsProps {
  product: any;
  slug: string;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  // 1. Initialize based on screen size: "specs" for mobile, "description" for desktop
  const [activeTab, setActiveTab] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth < 1024 ? "specs" : "description";
  });

  // 2. Update if screen size changes dynamically
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && activeTab === "description") {
        setActiveTab("specs");
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  const allTabs = ["description", "specs", "refurbishment", "warranty"];
  
  return (
    <div className="border-t pt-8">
      {/* Tab Headers */}
      <div className="flex gap-8 border-b mb-8 overflow-x-auto">
        {allTabs.map((tab) => {
          // Hide description tab button on mobile
          if (tab === "description") {
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`hidden lg:block pb-3 capitalize font-bold whitespace-nowrap transition-colors ${
                  activeTab === tab ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            );
          }
          
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 capitalize font-bold whitespace-nowrap transition-colors ${
                activeTab === tab ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
      
      {/* Tab Content */}
      {activeTab === "description" && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="prose max-w-none text-muted-foreground">
            <h4 className="font-bold text-foreground flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-primary" /> Overview
            </h4>
            <p className="whitespace-pre-line">{product.description}</p>
          </div>
          
          {product.highlights_list?.length > 0 && (
            <div>
              <h4 className="font-bold text-foreground mb-4">Key Highlights</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {product.highlights_list.map((h: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 bg-card p-3 rounded-lg border">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "specs" && (
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 animate-in fade-in duration-500">
          {[
            { label: "Processor", val: product.processor },
            { label: "RAM", val: product.ram },
            { label: "Storage", val: product.storage },
            { label: "Display", val: product.display },
            { label: "Graphics", val: product.graphics },
            { label: "OS", val: product.operating_system },
            { label: "Battery", val: product.battery },
            { label: "Weight", val: product.weight },
            { label: "Ports", val: product.ports },
          ].map((item, i) => (
            <p key={i} className="flex justify-between border-b pb-2 text-sm">
              <span className="text-muted-foreground">{item.label}:</span>
              <strong className="text-right text-foreground">{item.val || "N/A"}</strong>
            </p>
          ))}
        </div>
      )}

      {activeTab === "refurbishment" && (
        <div className="space-y-4 animate-in fade-in duration-500">
          <h4 className="font-bold text-lg flex items-center gap-2">
            <Wrench className="text-primary" /> {product.refurbishment_summary}
          </h4>
          <ul className="space-y-2">
            {product.refurbishment_points_list?.map((p: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                <CheckCircle className="w-5 h-5 text-success shrink-0" /> {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "warranty" && (
        <div className="space-y-4 animate-in fade-in duration-500">
          <h4 className="font-bold text-lg flex items-center gap-2">
            <ShieldCheck className="text-primary" /> {product.warranty_summary}
          </h4>
          <ul className="space-y-2 text-muted-foreground list-disc pl-5 text-sm">
            {product.warranty_details_list?.map((d: string, i: number) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}