import { MapPin, Phone, ExternalLink, Store as StoreIcon, Building } from "lucide-react";
import { stores } from "@/data/mockData";

const StoresPage = () => {
  const telanganaStores = stores.filter((s) => s.state === "Telangana");
  const apStores = stores.filter((s) => s.state === "Andhra Pradesh");

  const StoreCard = ({ store }: { store: typeof stores[0] }) => (
    <div className="bg-card rounded-xl overflow-hidden shadow-ambient">
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
  );

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

      <section className="bg-surface-low py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { state: "Telangana", count: telanganaStores.length, icon: StoreIcon },
              { state: "Andhra Pradesh", count: apStores.length, icon: Building },
            ].map((s) => (
              <div key={s.state} className="bg-card rounded-xl p-8 text-center shadow-ambient">
                <div className="w-14 h-14 mx-auto bg-secondary rounded-2xl flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground">{s.state}</h3>
                <p className="text-primary font-display font-semibold text-sm uppercase tracking-wider mt-1">{s.count} STORES</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <h2 className="font-display font-extrabold text-2xl text-foreground tracking-tight mb-8">Telangana Branches</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {telanganaStores.map((s) => <StoreCard key={s.id} store={s} />)}
          </div>

          <h2 className="font-display font-extrabold text-2xl text-foreground tracking-tight mb-8">Andhra Pradesh Branches</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apStores.map((s) => <StoreCard key={s.id} store={s} />)}
          </div>
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

      <section className="bg-secondary rounded-2xl mx-6 lg:mx-auto max-w-5xl p-12 mb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-extrabold text-2xl text-foreground tracking-tight">Stay Ahead of the Curve.</h2>
            <p className="text-muted-foreground mt-2 max-w-sm">Join our exclusive circle for early access to premium inventory, technical editorials, and member-only pricing.</p>
          </div>
          <div className="flex">
            <input placeholder="Enter your email" className="bg-card rounded-l-lg px-4 py-3 text-sm outline-none w-56 font-body" />
            <button className="gradient-primary text-primary-foreground px-6 py-3 rounded-r-lg font-display font-semibold text-sm">Subscribe</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default StoresPage;
