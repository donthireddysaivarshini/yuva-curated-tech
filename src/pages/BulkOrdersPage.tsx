import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Settings, Shield, CheckCircle } from "lucide-react";
import bulkHero from "@/assets/bulk-orders-hero.jpg";
import deploy from "@/assets/deploy.png";
const benefits = [
  { icon: Truck, title: "Dedicated Account Manager", desc: "Personalized support tailored to your procurement cycle, ensuring seamless delivery and setup." },
  { icon: Settings, title: "Custom Configurations", desc: "Upgrade RAM, storage, or software pre-installs to meet the specific technical needs of your workforce." },
  { icon: Shield, title: "Extended Warranty Options", desc: "Protect your investment with enterprise-grade warranty extensions and priority repair services." },
];

const inventory = [
  { type: "Workstation Laptops", units: "500+ Units" },
  { type: "Compact Mini PCs", units: "200+ Units" },
  { type: "Enterprise Desktops", units: "150+ Units" },
];

const BulkOrdersPage = () => {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", deviceType: "Laptops", quantity: "", requirements: "" });

  return (
    <>
      <section className="relative overflow-hidden">
        <img src={bulkHero} alt="Enterprise workspace" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/70" />
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <span className="text-xs font-display font-semibold text-primary-foreground/60 uppercase tracking-[0.2em]">Yuva Computers for Business</span>
          <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-primary-foreground mt-4 leading-tight tracking-tight max-w-lg">
            Equip Your Workspace. <span className="text-primary">Smartly.</span>
          </h1>
          <p className="text-primary-foreground/70 mt-4 max-w-md">
            Transform your team's productivity with high-performance certified precision instruments. Access exclusive bulk discounts and dedicated enterprise support.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#quote-form" className="gradient-primary text-primary-foreground px-6 py-3 rounded-lg font-display font-semibold text-sm">Request a Quote</a>
            <a href="#inventory" className="bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 px-6 py-3 rounded-lg font-display font-semibold text-sm backdrop-blur-sm">View Catalogue</a>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-border/30">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs font-display font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center gap-12">
            {["TECHSTREAM", "NEXUS CORP", "QUANTUM LABS", "ELEVEIGHT", "VERTIGO SOLUTIONS"].map((n) => (
              <span key={n} className="font-display font-bold text-sm text-muted-foreground/40 tracking-wider">{n}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="text-left">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4">
                  <b.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground text-lg">{b.title}</h3>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quote-form" className="py-16 lg:py-24 bg-surface-low">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-display font-extrabold text-3xl text-foreground tracking-tight">Scale Your Infrastructure Without Compromise.</h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">Our enterprise team is ready to build a custom quote that fits your budget and timeline. Expect a response within 4 working hours.</p>
              <ul className="mt-6 space-y-3">
                {["Priority PAN-India Logistics", "Bulk Discount Pricing Tiers", "Full GST Compliance Support"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-ambient">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Full Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your name" className="w-full mt-1.5 bg-input rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-body" />
                </div>
                <div>
                  <label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Company Name</label>
                  <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company Ltd." className="w-full mt-1.5 bg-input rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-body" />
                </div>
                <div>
                  <label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Work Email</label>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="w-full mt-1.5 bg-input rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-body" />
                </div>
                <div>
                  <label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Phone Number</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 00000 00000" className="w-full mt-1.5 bg-input rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-body" />
                </div>
                <div>
                  <label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Device Type</label>
                  <select value={form.deviceType} onChange={(e) => setForm({ ...form, deviceType: e.target.value })} className="w-full mt-1.5 bg-input rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-body">
                    <option>Laptops</option>
                    <option>Desktops</option>
                    <option>Mini PCs</option>
                    <option>Monitors</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Quantity</label>
                  <input value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="Min. 5 units" className="w-full mt-1.5 bg-input rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-body" />
                </div>
              </div>
              <div className="mt-4">
                <label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Specific Requirements</label>
                <textarea value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} rows={3} placeholder="E.g., MacBook Air M2 16GB RAM, Delivery by end of month..." className="w-full mt-1.5 bg-input rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-body resize-none" />
              </div>
              <button className="w-full mt-6 gradient-primary text-primary-foreground py-3.5 rounded-lg font-display font-bold text-sm hover:opacity-90 transition-opacity">
                Request Custom Quote ▸
              </button>
              <p className="text-xs text-muted-foreground text-center mt-3">100% TAX COMPLIANT · PAN-INDIA DELIVERY · SLA GUARANTEED</p>
            </div>
          </div>
        </div>
      </section>

      <section id="inventory" className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-xl overflow-hidden aspect-[4/3] shadow-ambient">
  <img src={deploy} alt="Inventory Deployment Showcase" className="w-full h-full object-cover" />
</div>
            <div>
              <span className="text-xs font-display font-semibold text-primary uppercase tracking-[0.2em]">Inventory Focus</span>
              <h2 className="font-display font-extrabold text-3xl text-foreground tracking-tight mt-2">Ready for Deployment.</h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">We maintain ready stock of popular configurations to ensure your new hires start on day one without hardware delays.</p>
              <div className="mt-6 space-y-3">
                {inventory.map((item) => (
                  <div key={item.type} className="flex justify-between items-center bg-card rounded-lg p-4 shadow-ambient">
                    <span className="text-sm font-display font-semibold text-foreground">{item.type}</span>
                    <span className="text-sm font-display font-bold text-primary">{item.units}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BulkOrdersPage;
