// src/components/home/PartnersSection.tsx
import { motion } from "framer-motion";

const partners = [
  { name: "DELL" }, { name: "HP" }, { name: "LENOVO" }, 
  { name: "APPLE" }, { name: "ASUS" }, { name: "ACER" }
];

const brandColors = ["#254fa0", "#34a1da", "#1c6a0e", "#7fc140", "#d62828", "#f77f00"];

export const PartnersSection = () => (
  <section className="py-16 lg:py-20 border-y border-border/30 overflow-hidden bg-surface">
    <div className="container mx-auto px-6 text-center mb-8">
      <p className="text-xs font-display font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Trusted by Industry Leaders
      </p>
    </div>
    <div className="relative flex overflow-hidden whitespace-nowrap w-full group">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      <motion.div 
        className="flex gap-16 lg:gap-24 items-center shrink-0 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
      >
        {[...partners, ...partners].map((p, i) => (
          <span 
            key={i} 
            className="font-display font-extrabold text-2xl tracking-widest opacity-80 hover:opacity-100 transition-opacity"
            style={{ color: brandColors[i % brandColors.length] }}
          >
            {p.name}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);