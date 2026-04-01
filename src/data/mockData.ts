import heroLaptop from "@/assets/hero-laptop.jpg";
import productMacbook from "@/assets/product-macbook.jpg";
import productDellXps from "@/assets/product-dell-xps.jpg";
import productThinkpad from "@/assets/product-thinkpad.jpg";
import productAsusRog from "@/assets/product-asus-rog.jpg";
import productHpElite from "@/assets/product-hp-elite.jpg";
import productDellLatitude from "@/assets/product-dell-latitude.jpg";
import productIdeapad from "@/assets/product-ideapad.jpg";
import categoryGaming from "@/assets/category-gaming.jpg";
import categoryOffice from "@/assets/category-office.jpg";
import categoryStudent from "@/assets/category-student.jpg";

export { heroLaptop };

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  image: string;
  condition: "Like New" | "Excellent" | "Good" | "Value";
  subcategoryId: string;
  categoryId: string;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
  };
  tags: string[];
  isTrending?: boolean;
  isNewArrival?: boolean;
  isBestDeal?: boolean;
}

export interface Store {
  id: string;
  name: string;
  state: "Telangana" | "Andhra Pradesh";
  phone: string;
  mapsUrl: string;
  isMain?: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  product: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
}

export interface Partner {
  name: string;
}

export const categories: Category[] = [
  {
    id: "laptops",
    name: "Laptop",
    subcategories: [
      { id: "lenovo-laptops", name: "Lenovo", categoryId: "laptops" },
      { id: "hp-laptops", name: "HP", categoryId: "laptops" },
      { id: "dell-laptops", name: "Dell", categoryId: "laptops" },
      { id: "acer-laptops", name: "Acer ChromeBook", categoryId: "laptops" },
      { id: "apple-laptops", name: "Apple", categoryId: "laptops" },
      { id: "asus-laptops", name: "Asus", categoryId: "laptops" },
    ],
  },
  {
    id: "desktops",
    name: "Desktop",
    subcategories: [
      { id: "lenovo-desktops", name: "Lenovo", categoryId: "desktops" },
      { id: "hp-desktops", name: "HP", categoryId: "desktops" },
      { id: "acer-desktops", name: "Acer", categoryId: "desktops" },
      { id: "dell-desktops", name: "Dell", categoryId: "desktops" },
      { id: "asus-desktops", name: "Asus", categoryId: "desktops" },
    ],
  },
  {
    id: "minipc",
    name: "Mini PC",
    subcategories: [
      { id: "hp-minipc", name: "HP", categoryId: "minipc" },
      { id: "acer-minipc", name: "Acer", categoryId: "minipc" },
      { id: "asus-minipc", name: "Asus", categoryId: "minipc" },
      { id: "dell-minipc", name: "Dell", categoryId: "minipc" },
      { id: "lenovo-minipc", name: "Lenovo", categoryId: "minipc" },
    ],
  },
  {
    id: "monitors",
    name: "Monitor",
    subcategories: [
      { id: "dell-monitors", name: "Dell", categoryId: "monitors" },
      { id: "hp-monitors", name: "HP", categoryId: "monitors" },
      { id: "lenovo-monitors", name: "Lenovo", categoryId: "monitors" },
      { id: "lapcare-monitors", name: "Lapcare", categoryId: "monitors" },
    ],
  },
];

export const usageCategories = [
  { id: "accounting", name: "Accounting" },
  { id: "best-gaming", name: "Best Gaming" },
  { id: "coding", name: "Coding/Data Analytics" },
  { id: "school", name: "Pre/Mid School" },
  { id: "trading", name: "Trading" },
  { id: "video", name: "Video/Graphics" },
];

export const products: Product[] = [
  {
    id: "1", name: "MacBook Pro M2 13\"", brand: "Apple", price: 84999, originalPrice: 149000,
    image: productMacbook, condition: "Like New", subcategoryId: "apple-laptops", categoryId: "laptops",
    specs: { processor: "Apple M2", ram: "8GB Unified", storage: "256GB SSD", display: "13.3\" Retina" },
    tags: ["8GB RAM", "256GB SSD"], isTrending: true,
  },
  {
    id: "2", name: "Dell XPS 15 9500", brand: "Dell", price: 72500, originalPrice: 135000,
    image: productDellXps, condition: "Excellent", subcategoryId: "dell-laptops", categoryId: "laptops",
    specs: { processor: "Intel Core i7-10750H", ram: "16GB DDR4", storage: "512GB SSD", display: "15.6\" FHD+" },
    tags: ["16GB RAM", "512GB SSD"], isTrending: true,
  },
  {
    id: "3", name: "ThinkPad X1 Carbon Gen 9", brand: "Lenovo", price: 54999, originalPrice: 125000,
    image: productThinkpad, condition: "Like New", subcategoryId: "lenovo-laptops", categoryId: "laptops",
    specs: { processor: "Intel Core i5-1135G7", ram: "16GB DDR4", storage: "512GB SSD", display: "14\" FHD IPS" },
    tags: ["16GB RAM", "512GB SSD"], isTrending: true,
  },
  {
    id: "4", name: "Asus ROG Zephyrus G14", brand: "Asus", price: 94000, originalPrice: 155000,
    image: productAsusRog, condition: "Like New", subcategoryId: "asus-laptops", categoryId: "laptops",
    specs: { processor: "AMD Ryzen 9 5900HS", ram: "16GB DDR4", storage: "1TB SSD", display: "14\" QHD 120Hz" },
    tags: ["16GB RAM", "1TB SSD"], isTrending: true,
  },
  {
    id: "5", name: "HP EliteBook 840 G8", brand: "HP", price: 42500, originalPrice: 89000,
    image: productHpElite, condition: "Excellent", subcategoryId: "hp-laptops", categoryId: "laptops",
    specs: { processor: "Intel Core i5-1145G7", ram: "16GB DDR4", storage: "256GB SSD", display: "14\" FHD IPS" },
    tags: ["16GB RAM", "256GB SSD"], isNewArrival: true, isBestDeal: true,
  },
  {
    id: "6", name: "Dell Latitude 7490", brand: "Dell", price: 24999, originalPrice: 58000,
    image: productDellLatitude, condition: "Like New", subcategoryId: "dell-laptops", categoryId: "laptops",
    specs: { processor: "Intel Core i5-8350U", ram: "16GB DDR4", storage: "512GB SSD", display: "14\" FHD IPS" },
    tags: ["16GB RAM", "512GB SSD"], isNewArrival: true, isBestDeal: true,
  },
  {
    id: "7", name: "Lenovo IdeaPad Slim 5", brand: "Lenovo", price: 38999, originalPrice: 75000,
    image: productIdeapad, condition: "Good", subcategoryId: "lenovo-laptops", categoryId: "laptops",
    specs: { processor: "AMD Ryzen 5 5500U", ram: "8GB DDR4", storage: "512GB SSD", display: "15.6\" FHD IPS" },
    tags: ["8GB RAM", "512GB SSD"], isNewArrival: true,
  },
  {
    id: "8", name: "MacBook Air M1 Silver", brand: "Apple", price: 58999, originalPrice: 92000,
    image: productMacbook, condition: "Like New", subcategoryId: "apple-laptops", categoryId: "laptops",
    specs: { processor: "Apple M1", ram: "8GB Unified", storage: "256GB SSD", display: "13.3\" Retina" },
    tags: ["8GB RAM", "256GB SSD"], isNewArrival: true,
  },
  {
    id: "9", name: "Legion 5 Pro Gaming", brand: "Lenovo", price: 82499, originalPrice: 155000,
    image: productThinkpad, condition: "Like New", subcategoryId: "lenovo-laptops", categoryId: "laptops",
    specs: { processor: "AMD Ryzen 7 5800H", ram: "32GB DDR4", storage: "1TB SSD", display: "16\" QHD 165Hz" },
    tags: ["32GB RAM", "1TB SSD"],
  },
  {
    id: "10", name: "HP ZBook 15 G6", brand: "HP", price: 62000, originalPrice: 120000,
    image: productHpElite, condition: "Good", subcategoryId: "hp-laptops", categoryId: "laptops",
    specs: { processor: "Intel Core i7-9850H", ram: "32GB DDR4", storage: "512GB SSD", display: "15.6\" FHD" },
    tags: ["32GB RAM", "512GB SSD"],
  },
  {
    id: "11", name: "ThinkPad P15 Gen 2", brand: "Lenovo", price: 94999, originalPrice: 245000,
    image: productThinkpad, condition: "Like New", subcategoryId: "lenovo-laptops", categoryId: "laptops",
    specs: { processor: "Intel Xeon W-11855M", ram: "64GB DDR4", storage: "2TB SSD", display: "15.6\" UHD" },
    tags: ["64GB RAM", "2TB SSD"],
  },
  {
    id: "12", name: "Dell Precision 7520", brand: "Dell", price: 45000, originalPrice: 95000,
    image: productDellLatitude, condition: "Good", subcategoryId: "dell-laptops", categoryId: "laptops",
    specs: { processor: "Intel Core i7-7820HQ", ram: "16GB DDR4", storage: "512GB SSD", display: "15.6\" FHD" },
    tags: ["16GB RAM", "512GB SSD"],
  },
];

export const categoryImages = {
  gaming: categoryGaming,
  office: categoryOffice,
  student: categoryStudent,
};

export const stores: Store[] = [
  { id: "s1", name: "Yuva Computers – Dilshuknagar", state: "Telangana", phone: "9709888456", mapsUrl: "https://maps.app.goo.gl/BM9uzhNAxJZ3ePAm8", isMain: true },
  { id: "s2", name: "Yuva Computers – KPHB", state: "Telangana", phone: "6304234456", mapsUrl: "https://maps.app.goo.gl/BiT7KUfJNGBwYKwMA" },
  { id: "s3", name: "Yuva Computers – Warangal", state: "Telangana", phone: "8308356456", mapsUrl: "https://maps.app.goo.gl/v4TinaEjkUiCn61d9" },
  { id: "s4", name: "Yuva Computers – Karimnagar", state: "Telangana", phone: "7417999456", mapsUrl: "https://maps.app.goo.gl/Wh58JBdgmmo4zZeW6" },
  { id: "s5", name: "Yuva Computers – Nizamabad", state: "Telangana", phone: "8445611456", mapsUrl: "https://maps.app.goo.gl/YjJz8VTp6iw3GkTm7" },
  { id: "s6", name: "Yuva Computers – Khammam", state: "Telangana", phone: "8420234456", mapsUrl: "https://maps.app.goo.gl/W7SxmnKGhxgPmZS28" },
  { id: "s7", name: "Yuva Computers – Vizag", state: "Andhra Pradesh", phone: "8829977456", mapsUrl: "https://maps.app.goo.gl/7cbdN2T8WCAYxYkg7" },
  { id: "s8", name: "Yuva Computers – Kakinada", state: "Andhra Pradesh", phone: "7799339544", mapsUrl: "https://maps.app.goo.gl/tkbdeN5XZFJ3fb6Y7" },
  { id: "s9", name: "Yuva Computers – Produtoor", state: "Andhra Pradesh", phone: "8008508456", mapsUrl: "https://maps.app.goo.gl/7zsd9zojA5r6z8uQ8" },
  { id: "s10", name: "Yuva Computers – Ongole", state: "Andhra Pradesh", phone: "6302422456", mapsUrl: "https://maps.app.goo.gl/5ine46KBNRQZrS94A" },
  { id: "s11", name: "Yuva Computers – Vijayawada", state: "Andhra Pradesh", phone: "8439356456", mapsUrl: "https://maps.app.goo.gl/ywdMViZ3k5u6hG2y8" },
  { id: "s12", name: "Yuva Computers – Bheemavaram", state: "Andhra Pradesh", phone: "6304200456", mapsUrl: "https://maps.app.goo.gl/JzKqxgS7jgv2uheq6" },
  { id: "s13", name: "Yuva Computers – Kurnool", state: "Andhra Pradesh", phone: "9391550456", mapsUrl: "https://maps.app.goo.gl/cGHnRqMSfBH59gGA8" },
  { id: "s14", name: "Yuva Computers – Anantapur", state: "Andhra Pradesh", phone: "7729999456", mapsUrl: "https://maps.app.goo.gl/yshhpMhK5Hm73oXXA" },
  { id: "s15", name: "Yuva Computers – Tirupathi", state: "Andhra Pradesh", phone: "8309654456", mapsUrl: "https://maps.app.goo.gl/9Z3fdQmmUuM9ggo8A" },
  { id: "s16", name: "Yuva Computers – Rajamahendravaram", state: "Andhra Pradesh", phone: "7456017456", mapsUrl: "https://maps.app.goo.gl/cx1z13q7ub3dw9fq8" },
];

export const reviews: Review[] = [
  { id: "r1", name: "Rahul Meena", rating: 5, text: "I was skeptical about refurbished tech, but Yuva Computers changed my mind. My MacBook Pro looks and feels brand new, and the price was unbeatable.", product: "MacBook Pro M2" },
  { id: "r2", name: "Sneha Desai", rating: 5, text: "Excellent customer service. They helped me pick the right laptop for my daughter's college. Highly recommended for tech on a budget!", product: "Dell XPS 15" },
  { id: "r3", name: "Vikram Singh", rating: 5, text: "The 15-day return policy gave me the confidence to buy. But the machine is so good, I never thought of returning it. Great performance!", product: "ThinkPad X1 Carbon" },
  { id: "r4", name: "Priya Sharma", rating: 4, text: "Amazing quality and fast delivery. The laptop came with Windows pre-installed and all drivers set up perfectly. Saved almost 50%!", product: "HP EliteBook" },
  { id: "r5", name: "Amit Kumar", rating: 5, text: "Running a small business and bought 5 laptops in bulk. Great bulk pricing and all units were in excellent condition. Will order again.", product: "Dell Latitude 7490" },
];

export const blogPosts: BlogPost[] = [
  { id: "b1", title: "Refurbished vs. New: The 2024 Truths", excerpt: "Is it smart to buy a brand new device annually when a refurbished one offers identical performance?", category: "Insight", date: "2024-03-15" },
  { id: "b2", title: "How We Wipe Data Permanently", excerpt: "Your data is important! Discover our military-grade data sanitization process.", category: "Security", date: "2024-02-28" },
  { id: "b3", title: "The Carbon Impact of Refurbished Tech", excerpt: "Refurbished is green, one device at a time. Learn how your purchase helps the planet.", category: "Sustainability", date: "2024-01-20" },
];

export const partners: Partner[] = [
  { name: "DELL" },
  { name: "HP" },
  { name: "LENOVO" },
  { name: "APPLE" },
  { name: "ACER" },
  { name: "ASUS" },
];

export const stats = [
  { value: "1M+", label: "Happy Customers" },
  { value: "15-Day", label: "Hassle-Free Returns" },
  { value: "50+", label: "Quality Checks" },
  { value: "Since 2009", label: "Legacy of Trust" },
];

export const faqs = [
  { question: "What is the warranty period?", answer: "All our refurbished products come with a minimum 6-month doorstep warranty. Extended warranty options are also available at checkout." },
  { question: "How are the 50 quality checks performed?", answer: "Each device undergoes a 50-point diagnostic check including battery health, display quality, keyboard/trackpad testing, port functionality, thermal performance, and complete OS reinstallation." },
  { question: "Can I see actual photos before buying?", answer: "Yes! We provide actual product photos for every listing. You can also request additional photos or a video call inspection before making a purchase." },
  { question: "Do you offer bulk discounts for businesses?", answer: "Absolutely. We offer tiered bulk pricing with additional benefits like extended warranty, priority support, and custom configurations. Visit our Bulk Orders page." },
  { question: "What payment methods do you accept?", answer: "We accept all major credit/debit cards, UPI, net banking, EMI options, and bank transfers for bulk orders." },
];

export const topSellingProducts = [
  { name: "ThinkPad X1 Carbon", price: 84999 },
  { name: "UltraSharp 27\" 4K", price: 42500 },
];

export const gamingLaptops = ["ThinkPad P52 / P52s", "IdeaPad Gaming 3", "HP ZBook 17 / 15", "Precision 7520"];
