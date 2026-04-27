import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { storeService } from "@/services/api";

const MegaMenu = ({ onClose, categories, usageTags, isMobile = false }: any) => {
  const navigate = useNavigate();
  const [brandsByCategory, setBrandsByCategory] = useState<Record<string, any[]>>({});

  useEffect(() => {
    if (categories?.length > 0) {
      categories.forEach(async (cat: any) => {
        try {
          const brands = await storeService.getBrandsForCategory(cat.slug);
          setBrandsByCategory(prev => ({ ...prev, [cat.slug]: brands }));
        } catch (e) { 
          console.error(`Error loading brands for ${cat.slug}`, e); 
        }
      });
    }
  }, [categories]);

  return (
    <div className={`w-full bg-white ${isMobile ? 'p-0' : 'shadow-xl border-b p-8'}`}>
      <div className={`${isMobile ? 'px-4 py-4' : 'container mx-auto px-6 py-8'}`}>
        {/* MOBILE: Single column vertical */}
        <div className={`${isMobile ? 'space-y-6' : 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8'}`}>
          {categories.map((cat: any) => (
            <div key={cat.id} className={`${isMobile ? 'space-y-3 border-b pb-4 last:border-b-0' : 'space-y-4'}`}>
              <h3 className={`font-bold uppercase tracking-wide ${isMobile ? 'text-base' : 'text-sm text-primary'}`}>
                {cat.name}
              </h3>
              <ul className={`${isMobile ? 'space-y-2 ml-2' : 'space-y-2'}`}>
                {(brandsByCategory[cat.slug] || []).slice(0, isMobile ? 3 : 4).map((b: any) => (
                  <li key={b.id}>
                    <button 
                      onClick={() => { 
                        onClose(); 
                        navigate(`/products?category=${cat.slug}&brand=${b.slug}`); 
                      }} 
                      className={`w-full text-left py-1 transition-colors ${isMobile ? 'text-sm' : 'text-xs'} text-muted-foreground hover:text-primary`}
                    >
                      {b.name}
                    </button>
                  </li>
                ))}
                <li className="pt-2">
                  <button 
                    onClick={() => { 
                      onClose(); 
                      navigate(`/products?category=${cat.slug}`); 
                    }} 
                    className={`w-full text-left font-bold uppercase underline ${isMobile ? 'text-xs' : 'text-xs'} text-primary`}
                  >
                    View All
                  </button>
                </li>
              </ul>
            </div>
          ))}
          
          {/* Usage Tags */}
          <div className={`${isMobile ? 'space-y-4 pt-4 border-t mt-4' : 'md:border-l md:pl-8 space-y-4 col-span-1'}`}>
            <h3 className={`font-bold uppercase ${isMobile ? 'text-base text-muted-foreground' : 'text-sm text-muted-foreground'}`}>
              Find by Usage
            </h3>
            <ul className={`${isMobile ? 'space-y-2 ml-2' : 'space-y-2'}`}>
              {usageTags.slice(0, isMobile ? 6 : 10).map((u: any) => (
                <li key={u.id}>
                  <button 
                    onClick={() => { 
                      onClose(); 
                      navigate(`/products?usage=${u.slug}`); 
                    }} 
                    className={`w-full text-left py-1 transition-colors ${isMobile ? 'text-sm' : 'text-xs'} text-muted-foreground hover:text-primary`}
                  >
                    {u.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;