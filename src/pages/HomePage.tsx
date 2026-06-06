import { useState, useEffect } from "react";
import { storeService, contentService } from "@/services/api";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { TrendingSection } from "@/components/home/TrendingSection";
import { ProductGridSection } from "@/components/home/ProductGridSection";
import { TechJourney } from "@/components/home/TechJourney";
import { AboutSnapshot } from "@/components/home/AboutSnapshot";
import { PartnersSection } from "@/components/home/PartnersSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { BlogsSection } from "@/components/home/BlogsSection"; // ← NEW

const HomePage = () => {
  const [storeData, setStoreData] = useState({
    new_arrivals: [],
    best_sellers: [],
    trending: [],
    best_deals: [],
    categories: [],
  });

  const [content, setContent] = useState<{
    hero_slides: any[];
    stats: any[];
    reviews: any[];
    about: any;
  }>({
    hero_slides: [],
    stats: [],
    reviews: [],
    about: null,
  });

  useEffect(() => {
    storeService.getHomeData().then(setStoreData).catch(console.error);
    contentService.getHomeContent().then(setContent).catch(console.error);
  }, []);

  return (
    <main className="bg-background">
      <HeroSection slides={content.hero_slides} />
      <StatsBar stats={content.stats} />

      <TrendingSection
        title="Trending This Week"
        products={storeData.trending}
        link="/products?is_trending=true"
      />

      <TechJourney categories={storeData.categories} />

      <ProductGridSection
        title="Best Sellers"
        products={storeData.best_sellers}
        link="/products?is_best_seller=true"
      />

      <AboutSnapshot data={content.about} />

      <ProductGridSection
        title="Best Deals on Budget"
        products={storeData.best_deals}
        link="/products?is_best_deal=true"
      />

      <TrendingSection
        title="New Arrivals"
        products={storeData.new_arrivals}
        link="/products?is_new_arrival=true"
      />

      <BlogsSection /> {/* ← NEW — placed before reviews for editorial flow */}

      <PartnersSection />
      <ReviewsSection />
    </main>
  );
};

export default HomePage;