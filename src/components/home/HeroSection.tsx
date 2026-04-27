import { useState, useEffect } from "react";

const FALLBACK_SLIDES = ["/hero1.png", "/hero2.png", "/hero3.png"];

interface Props {
  slides?: { id: number; image: string }[];
}

export const HeroSection = ({ slides }: Props) => {
  const [current, setCurrent] = useState(0);

  const images = slides && slides.length > 0
    ? slides.map(s => s.image)
    : FALLBACK_SLIDES;

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative w-full h-[400px] overflow-hidden">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};