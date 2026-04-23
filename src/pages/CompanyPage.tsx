import { Shield, Target, Award, Globe, CheckCircle } from "lucide-react";
import { partners } from "@/data/mockData";
import { Link } from "react-router-dom";
import companyHero from "@/assets/company-hero.jpg";

const timeline = [
  { year: "2009", title: "Founding", desc: "Started with a simple belief: high-end technology shouldn't be a luxury. It should be a standard." },
  { year: "2018", title: "100k Customers", desc: "A major milestone reached, proving that the market for certified, high-end refurbished instruments was global and growing." },
  { year: "2022", title: "Store Expansion", desc: "Opening physical Experience Centers to allow users to touch, feel, and test precision instruments before acquisition." },
];

const investors = [
  { name: "Nexus Ventures", type: "Early Stage Growth" },
  { name: "Green Earth Cap", type: "ESG Focused Funding" },
  { name: "Luxe Partners", type: "Premium Retail Strategy" },
  { name: "Global Tech Hub", type: "Strategic Scaling" },
];

const certifications = ["Certified E-Recycler", "Authorized Refurbisher", "ISO 9001 Compliant"];

const CompanyPage = () => (
  <>
    <section className="relative overflow-hidden">
      <img src={companyHero} alt="Yuva Computers facility" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-foreground/70" />
      <div className="relative container mx-auto px-6 py-24 lg:py-32 text-center">
        <span className="text-xs font-display font-semibold text-primary-foreground/60 uppercase tracking-[0.2em]">Yuva Computers</span>
        <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-primary-foreground mt-4 tracking-tight">
          Democratizing Technology Since 2009.
        </h1>
      </div>
    </section>

    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display font-extrabold text-3xl text-foreground tracking-tight">Our Journey Through Precision.</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">We started with a simple belief: high-end technology shouldn't be a luxury. It should be a standard.</p>
          </div>
          <div className="space-y-8">
            {timeline.map((t, i) => (
              <div key={t.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <span className="font-display font-bold text-primary text-sm">{t.year}</span>
                  <div className="w-3 h-3 rounded-full gradient-primary mt-2" />
                  {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-border/30 mt-2" />}
                </div>
                <div className="pb-8">
                  <h3 className="font-display font-bold text-foreground text-lg">{t.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 lg:py-24 bg-surface-low">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="bg-card rounded-xl p-8 shadow-ambient">
            <h3 className="font-display font-bold text-lg text-foreground italic mb-3">Our Vision</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">To eliminate digital obsolescence by creating a circular economy where technology is curated, not discarded.</p>
          </div>
          <div className="bg-card rounded-xl p-8 shadow-ambient">
            <h3 className="font-display font-bold text-lg text-foreground italic mb-3">Our Mission</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Providing every professional with the tools they deserve through meticulous engineering and uncompromising quality standards.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-display font-extrabold text-3xl text-foreground tracking-tight">Fueling the Future.</h2>
        <p className="text-muted-foreground mt-2">Backed by leaders in sustainable tech and venture capital.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {investors.map((inv) => (
            <div key={inv.name} className="bg-card rounded-xl p-6 shadow-ambient text-center">
              <div className="w-12 h-12 mx-auto gradient-primary rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 text-primary-foreground" />
              </div>
              <h4 className="font-display font-bold text-foreground text-sm">{inv.name}</h4>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{inv.type}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 lg:py-24 bg-surface-low">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display font-extrabold text-3xl text-foreground tracking-tight">Integrity in Every Interaction.</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">We partner with global leaders in electronics recycling and hardware certification to ensure every instrument meets the Yuva Standard.</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-end">
            {certifications.map((c) => (
              <span key={c} className="inline-flex items-center gap-2 bg-success-soft text-success px-4 py-2.5 rounded-lg font-display font-semibold text-sm">
                <CheckCircle className="w-4 h-4" /> {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-12 border-y border-border/30">
      <div className="container mx-auto px-6 text-center">
        <p className="text-xs font-display font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">Our Partners</p>
        <div className="flex flex-wrap justify-center gap-12">
          {partners.map((p) => (
            <span key={p.name} className="font-display font-bold text-xl text-muted-foreground/40 tracking-wider">{p.name}</span>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 bg-primary text-center">
      <div className="container mx-auto px-6">
        <h2 className="font-display font-extrabold text-4xl text-primary-foreground tracking-tight">Experience it before you buy.</h2>
        <p className="text-primary-foreground/80 mt-4 max-w-md mx-auto">Visit our premium experience centers to test drive our curated selection of precision computing instruments.</p>
        <Link 
          to="/stores" 
          className="inline-block mt-8 bg-background text-foreground px-8 py-3.5 rounded-lg font-display font-semibold text-sm hover:bg-white transition-colors"
        >
          Find a Store Near You
        </Link>
      </div>
    </section>
  </>
);

export default CompanyPage;
