import { useState } from "react";
import { MapPin, Phone, ExternalLink, ChevronDown, ChevronUp, Store as StoreIcon, Building } from "lucide-react";
import { stores } from "@/data/mockData";

const StoresPage = () => {
  const [openState, setOpenState] = useState<string | null>(null);
  const telanganaStores = stores.filter((s) => s.state === "Telangana");
  const apStores = stores.filter((s) => s.state === "Andhra Pradesh");

  const stateGroups = [
    { state: "Telangana", stores: telanganaStores, icon: StoreIcon, count: telanganaStores.length },
    { state: "Andhra Pradesh", stores: apStores, icon: Building, count: apStores.length },
  ];

  return (
    <>
      <section className="py-16 lg:py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-foreground tracking-tight">
            Ready for Discovery?<br />Explore Our Stores Today!
          </h1>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Yuva Computers Physical Stores. Now proudly serving in <span className="text-primary font-semibold">2</span> Major States.
          </p>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container mx-auto px-6 max-w-4xl space-y-4">
          {stateGroups.map((group) => (
            <div key={group.state}>
              <button
                onClick={() => setOpenState(openState === group.state ? null : group.state)}
                className="w-full bg-card rounded-xl p-8 shadow-ambient flex items-center justify-between hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center">
                    <group.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-display font-bold text-xl text-foreground">{group.state}</h3>
                    <p className="text-primary font-display font-semibold text-sm uppercase tracking-wider mt-0.5">{group.count} STORES</p>
                  </div>
                </div>
                {openState === group.state ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
              </button>

              {openState === group.state && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 animate-fade-in">
                  {group.stores.map((store) => (
                    <div key={store.id} className="bg-card rounded-xl overflow-hidden shadow-ambient">
                      <div className="bg-surface-low aspect-[16/9] flex items-center justify-center">
                        <a href={store.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-card px-3 py-1.5 rounded-lg text-xs font-display font-semibold text-foreground shadow-sm hover:shadow-md transition-shadow">
                          Maps <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="p-5">
                        <h3 className="font-display font-bold text-foreground text-sm">{store.name}</h3>
                        <div className="flex items-center gap-2 mt-2 text-primary">
                          <Phone className="w-3.5 h-3.5" />
                          <a href={`tel:${store.phone}`} className="text-sm font-medium">{store.phone}</a>
                        </div>
                        <a
                          href={`tel:${store.phone}`}
                          className="block mt-4 w-full gradient-primary text-primary-foreground py-2.5 rounded-lg text-center font-display font-semibold text-sm hover:opacity-90 transition-opacity"
                        >
                          Call Store
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-low py-8 mb-16">
        <div className="container mx-auto px-6">
          <div className="bg-card rounded-xl p-6 shadow-ambient flex items-start gap-4">
            <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Please contact respective branches for the pricelist. To find our exact locations, search Google for <strong className="text-foreground">'Yuva Computers [Branch Area]'</strong> (e.g., 'Yuva Computers Warangal').
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default StoresPage;
