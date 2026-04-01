import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, RefreshCw, CheckCircle, Store, Star, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { products, stats, partners, reviews, blogPosts, faqs, categoryImages, heroLaptop } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const HeroSection = () => (
  <section className="relative overflow-hidden bg-surface">
    <div className="container mx-auto px-6 py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <span className="inline-block bg-secondary text-secondary-foreground text-xs font-display font-semibold px-3 py-1.5 rounded-md mb-6 uppercase tracking-wider">
            Premium Certified Hardware
          </span>
          <h1 className="font-display font-extrabold text-4xl lg:text-6xl text-foreground leading-[1.1] tracking-tight">
            Premium Tech.{" "}
            <span className="text-primary">Fraction</span> of the Price.
          </h1>
          <p className="mt-6 text-muted-foreground text-lg max-w-md leading-relaxed">
            Certified precision instruments curated for professionals. Every device undergoes 50+ quality checks to ensure uncompromising performance.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/products" className="gradient-primary text-primary-foreground px-8 py-3.5 rounded-lg font-display font-semibold text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              Explore Laptops <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/stores" className="bg-foreground text-primary-foreground px-8 py-3.5 rounded-lg font-display font-semibold text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              Find Nearby Store
            </Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <img src={heroLaptop} alt="Premium refurbished laptop" className="w-full rounded-2xl" width={1280} height={720} />
        </motion.div>
      </div>
    </div>
  </section>
);

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
  const trending = products.filter((p) => p.isTrending).slice(0, 4);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
};

const TechJourney = () => (
  <section className="py-16 lg:py-24 bg-surface-low">
    <div className="container mx-auto px-6">
      <h2 className="font-display font-extrabold text-3xl text-foreground tracking-tight text-center mb-12">Tech for Every Journey</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Ultimate Gaming", desc: "Unleash your full potential with high-refresh rate displays.", img: categoryImages.gaming, link: "/products?usage=best-gaming" },
          { title: "Office Efficiency", desc: "Enterprise-grade reliability for your daily hustle.", img: categoryImages.office, link: "/products?usage=accounting" },
          { title: "College Lifestyle", desc: "Power for all your academic needs on a student budget.", img: categoryImages.student, link: "/products?usage=school" },
        ].map((cat) => (
          <Link key={cat.title} to={cat.link} className="group relative rounded-xl overflow-hidden aspect-[4/3]">
            <img src={cat.img} alt={cat.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h3 className="font-display font-bold text-xl text-primary-foreground">{cat.title}</h3>
              <p className="text-primary-foreground/70 text-sm mt-1">{cat.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const NewArrivals = () => {
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-display font-extrabold text-3xl text-foreground tracking-tight">New Arrivals</h2>
          <Link to="/products" className="text-primary font-display font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
};

const BestDeals = () => {
  const bestDeals = products.filter((p) => p.isBestDeal).slice(0, 4);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestDeals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
};

const AboutSnapshot = () => (
  <section className="py-16 lg:py-24 bg-surface-low">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="font-display font-extrabold text-3xl text-foreground tracking-tight">Crafting Excellence Since 2009</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div className="bg-card rounded-xl p-8 shadow-ambient">
          <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <h3 className="font-display font-bold text-lg text-foreground italic mb-3">Our Vision</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            To eliminate digital obsolescence by creating a circular economy where technology is curated, not discarded.
          </p>
        </div>
        <div className="bg-card rounded-xl p-8 shadow-ambient">
          <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center mb-4">
            <RefreshCw className="w-5 h-5 text-primary-foreground" />
          </div>
          <h3 className="font-display font-bold text-lg text-foreground italic mb-3">Our Mission</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Providing every professional with the tools they deserve through meticulous engineering and uncompromising quality standards.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const PartnersSection = () => (
  <section className="py-16 lg:py-20 border-y border-border/30">
    <div className="container mx-auto px-6 text-center">
      <p className="text-xs font-display font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-8">Trusted by Industry Leaders</p>
      <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20">
        {partners.map((p) => (
          <span key={p.name} className="font-display font-bold text-xl text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors tracking-wider">
            {p.name}
          </span>
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
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                {r.name[0]}
              </div>
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
        <span className="text-primary font-display font-semibold text-sm inline-flex items-center gap-1">
          View Journal <ArrowRight className="w-4 h-4" />
        </span>
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
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-display font-semibold text-foreground text-sm">{faq.question}</span>
                {openIdx === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>
              {openIdx === i && (
                <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed animate-fade-in">
                  {faq.answer}
                </div>
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
    <AboutSnapshot />
    <PartnersSection />
    <ReviewsSection />
    <BlogsSection />
    <FAQSection />
  </>
);

export default HomePage;
