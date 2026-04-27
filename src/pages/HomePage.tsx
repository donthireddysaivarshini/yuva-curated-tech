// src/pages/HomePage.tsx
import { useState, useEffect } from "react";
import { storeService } from "@/services/api";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { TrendingSection } from "@/components/home/TrendingSection";
import { ProductGridSection } from "@/components/home/ProductGridSection";
import { TechJourney } from "@/components/home/TechJourney";
import { AboutSnapshot } from "@/components/home/AboutSnapshot";
import { PartnersSection } from "@/components/home/PartnersSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
const STATIC_REVIEWS = [
  { id: 1, name: "Varshini D", rating: 5, text: "Excellent laptop, exactly as described!", product: "MacBook Air M1" },
  { id: 2, name: "Gayatri G", rating: 5, text: "Fast delivery and great condition.", product: "Dell Latitude 5420" },
  { id: 3, name: "Vandana Y", rating: 4, text: "Very happy with the purchase.", product: "ThinkPad E14" },
];
const HomePage = () => {
  const [data, setData] = useState({
    new_arrivals: [], 
    best_sellers: [], 
    trending: [], 
    best_deals: [], 
    categories: [] 
  });

  useEffect(() => {
    storeService.getHomeData().then(setData).catch(console.error);
  }, []);

  return (
    <main className="bg-background">
      <HeroSection />
      <StatsBar />
       {/* 2. Trending - Horizontal Scroll */}
      <TrendingSection 
  title="Trending This Week" 
  products={data.trending} 
  link="/products?is_trending=true" 
/>
      
      {/* 1. Categories Grid */}
      <TechJourney categories={data.categories} />
      
     

      {/* 3. Best Sellers - Grid */}
      <ProductGridSection 
        title="Best Sellers" 
        products={data.best_sellers} 
        link="/products?is_best_seller=true" 
      />

      {/* 4. About Section moved here as requested */}
      <AboutSnapshot />

      {/* 5. Best Deals - Grid */}
      <ProductGridSection 
        title="Best Deals on Budget" 
        products={data.best_deals} 
        link="/products?is_best_deal=true" 
      />

      {/* 6. New Arrivals - Horizontal Scroll */}
     <TrendingSection 
  title="New Arrivals" 
  products={data.new_arrivals} 
  link="/products?is_new_arrival=true" 
/>
<PartnersSection />
<ReviewsSection reviews={STATIC_REVIEWS} />
    </main>
  );
};

export default HomePage;