// src/components/home/HeroSection.tsx
import { useState, useEffect } from "react";

const heroSlides = ["/hero1.png", "/hero2.png", "/hero3.png"];

export const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[400px] overflow-hidden">
      {heroSlides.map((src, i) => (
        <img key={i} src={src} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`} />
      ))}
    </section>
  );
};