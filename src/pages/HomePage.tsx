import { Link } from "react-router-dom";
import { ArrowRight, Star, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Eye, Settings } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { products, stats, partners, reviews, blogPosts, faqs, categoryImages } from "@/data/mockData";
import ProductCarousel from "@/components/ProductCarousel";

const heroSlides = [
  "/hero-placeholder.jpg",
  "/hero-placeholder.jpg",
  "/hero-placeholder.jpg",
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % heroSlides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full overflow-hidden bg-foreground">
      <div className="relative aspect-[21/9] md:aspect-[3/1] lg:aspect-[3/1]">
        {heroSlides.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Hero slide ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center hover:bg-card transition-colors">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center hover:bg-card transition-colors">
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-card/60"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsBar = () => (
  <section className="bg-card border-y border-border/30">
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display font-extrabold text-2xl lg:text-3xl text-foreground tracking-tight">{stat.value}</p>
            <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TrendingDeals = () => {
  const trending = products.filter((p) => p.isTrending).slice(0, 8);
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-display font-extrabold text-3xl text-foreground tracking-tight">Trending This Week</h2>
            <p className="text-muted-foreground mt-2">Top-rated performance machines ready for shipping.</p>
          </div>
          <Link to="/products" className="text-primary font-display font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
            View all Shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductCarousel products={trending} />
      </div>
    </section>
  );
};

const TechJourney = () => (
  <section className="py-16 lg:py-24 bg-surface-low">
    <div className="container mx-auto px-6">
      <h2 className="font-display font-extrabold text-3xl text-foreground tracking-tight text-center mb-12">Tech for Every Journey</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 auto-rows-[280px]">
        <Link to="/products?usage=video" className="group relative rounded-2xl overflow-hidden lg:row-span-2 lg:col-span-2">
          <img src={categoryImages.gaming} alt="Graphic Laptops" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h3 className="font-display font-extrabold text-2xl text-primary-foreground">Graphic Laptops</h3>
            <p className="text-primary-foreground/70 text-sm mt-1">Workstations for visual creators.</p>
          </div>
        </Link>
        <Link to="/products?usage=accounting" className="group relative rounded-2xl overflow-hidden">
          <img src={categoryImages.office} alt="Office Use" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h3 className="font-display font-bold text-xl text-primary-foreground">Office Use</h3>
            <p className="text-primary-foreground/70 text-sm mt-0.5">Reliable, fast, and durable.</p>
          </div>
        </Link>
        <Link to="/products?category=minipc" className="group relative rounded-2xl overflow-hidden">
          <img src={categoryImages.student} alt="Mini PCs" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h3 className="font-display font-bold text-xl text-primary-foreground">Mini PCs</h3>
            <p className="text-primary-foreground/70 text-sm mt-0.5">Power packed in small sizes.</p>
          </div>
        </Link>
      </div>
    </div>
  </section>
);

const NewArrivals = () => {
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 8);
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-display font-extrabold text-3xl text-foreground tracking-tight">New Arrivals</h2>
          <Link to="/products" className="text-primary font-display font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductCarousel products={newArrivals} />
      </div>
    </section>
  );
};

const BestDeals = () => {
  const bestDeals = products.filter((p) => p.isBestDeal).slice(0, 8);
  return (
    <section className="py-16 lg:py-24 bg-surface-low">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-display font-extrabold text-3xl text-foreground tracking-tight">Best Deals on Budget</h2>
            <p className="text-muted-foreground mt-2">Maximum performance without breaking the bank.</p>
          </div>
          <Link to="/products" className="text-primary font-display font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductCarousel products={bestDeals} />
      </div>
    </section>
  );
};

const AboutSnapshot = () => (
  <section className="py-16 lg:py-24 bg-surface-low">
    <div className="container mx-auto px-6">
      <h2 className="font-display font-extrabold text-3xl text-foreground tracking-tight mb-12">Crafting Excellence Since 2009</h2>
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
            <img src="/hero-placeholder.jpg" alt="Workshop" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl bg-primary p-6 flex flex-col justify-end aspect-square">
            <h4 className="font-display font-bold text-primary-foreground text-lg uppercase">Quality Control</h4>
            <p className="text-primary-foreground/70 text-xs mt-1 uppercase tracking-wider">We Made is Safe Work</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PartnersSection = () => (
  <section className="py-16 lg:py-20 border-y border-border/30">
    <div className="container mx-auto px-6 text-center">
      <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20">
        {partners.map((p) => (
          <span key={p.name} className="font-display font-bold text-xl text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors tracking-wider">{p.name}</span>
        ))}
      </div>
    </div>
  </section>
);

const ReviewsSection = () => (
  <section className="py-16 lg:py-24">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="font-display font-extrabold text-3xl text-foreground tracking-tight">Trusted by 1 Million+ Humans</h2>
        <p className="text-muted-foreground mt-2">Real stories from creators, developers, and students.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.slice(0, 3).map((r) => (
          <div key={r.id} className="bg-card rounded-xl p-6 shadow-ambient">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{r.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">{r.name[0]}</div>
              <div>
                <p className="text-sm font-display font-semibold text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.product}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const BlogsSection = () => (
  <section className="py-16 lg:py-24 bg-surface-low">
    <div className="container mx-auto px-6">
      <div className="flex justify-between items-end mb-10">
        <h2 className="font-display font-extrabold text-3xl text-foreground tracking-tight">Tech Journals</h2>
        <span className="text-primary font-display font-semibold text-sm inline-flex items-center gap-1">View Journal <ArrowRight className="w-4 h-4" /></span>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-card rounded-xl overflow-hidden shadow-ambient group">
            <div className="aspect-[16/9] bg-surface-high" />
            <div className="p-6">
              <span className="text-xs text-primary font-display font-semibold uppercase">{post.category}</span>
              <h3 className="font-display font-bold text-foreground mt-2 text-lg leading-tight">{post.title}</h3>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="font-display font-extrabold text-3xl text-foreground tracking-tight text-center mb-12">Common Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card rounded-xl shadow-ambient">
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex justify-between items-center p-5 text-left">
                <span className="font-display font-semibold text-foreground text-sm">{faq.question}</span>
                {openIdx === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>
              {openIdx === i && (
                <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed animate-fade-in">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = () => (
  <>
    <HeroSection />
    <StatsBar />
    <TrendingDeals />
    <TechJourney />
    <NewArrivals />
    <BestDeals />
    <AboutSnapshot />
    <PartnersSection />
    <ReviewsSection />
    <BlogsSection />
    <FAQSection />
  </>
);

export default HomePage;
