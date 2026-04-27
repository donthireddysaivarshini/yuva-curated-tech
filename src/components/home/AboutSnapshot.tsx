// src/components/home/AboutSnapshot.tsx
import { Eye, Settings } from "lucide-react";

export const AboutSnapshot = () => (
  <section className="py-16 lg:py-24 bg-surface-low">
    <div className="container mx-auto px-6">
      <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground tracking-tight mb-12">Crafting Excellence Since 2009</h2>
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
              <Eye className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-foreground">Our Vision</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mt-1">To make high-end computing accessible to everyone without sacrificing the planet's resources.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-success-soft flex items-center justify-center shrink-0">
              <Settings className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-foreground">Our Mission</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mt-1">Setting the gold standard in refurbishment through rigorous 50-step audits and industry-leading warranty support.</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl overflow-hidden aspect-square bg-surface-high">
            <img src="/about.png" alt="Workshop" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square relative bg-surface-high">
            <img src="/about1.png" alt="Quality Control" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent p-6 flex flex-col justify-end">
              <h4 className="font-display font-bold text-white text-lg uppercase relative z-10">Quality Control</h4>
              <p className="text-white/70 text-xs mt-1 uppercase tracking-wider relative z-10">We Made it Safe Work</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);