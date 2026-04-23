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

  highlights: string[];
  description: string;

  fullSpecs: Record<string, string>;
  additionalInfo: Record<string, string>;

  tags: string[];

  isTrending?: boolean;
  isNewArrival?: boolean;
  isBestDeal?: boolean;

  usageId: string;

  // ✅ FIXED STRUCTURE (matches your data)
refurbishment: {
  summary: string;
  points: string[];
};

warranty: {
  summary: string;
  details: string[];
};

  // ✅ AMAZON STYLE
  detailedSpecs: {
    title: string;
    items: {
      label: string;
      value: string;
    }[];
  }[];
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
  id: "1",
  name: "MacBook Pro M2 13\"",
  brand: "Apple",
  price: 84999,
  originalPrice: 149000,
  image: productMacbook,
  condition: "Like New",
  subcategoryId: "apple-laptops",
  categoryId: "laptops",
  usageId: "video",

  specs: {
    processor: "Apple M2",
    ram: "8GB Unified",
    storage: "256GB SSD",
    display: "13.3\" Retina",
  },

  tags: ["M2 Chip", "Retina Display", "Lightweight", "Premium"],

  highlights: [
    "Apple M2 chip for lightning-fast performance",
    "13.3-inch Retina display with True Tone",
    "Up to 20 hours battery life",
    "Ultra-lightweight aluminum design",
    "Silent fanless architecture",
  ],

  description:
    "The MacBook Pro M2 is built for performance and efficiency. Whether you're editing videos, coding, or multitasking, it delivers smooth and powerful performance with exceptional battery life.",

  fullSpecs: {
    Processor: "Apple M2 Chip",
    RAM: "8GB Unified Memory",
    Storage: "256GB SSD",
    Display: "13.3-inch Retina Display",
    OperatingSystem: "macOS Ventura",
    Battery: "Up to 20 hours",
    Weight: "1.4 kg",
  },

  additionalInfo: {
    Brand: "Apple",
    Model: "MacBook Pro M2 (2022)",
    Color: "Silver",
    Keyboard: "Backlit Magic Keyboard",
    Ports: "2x Thunderbolt / USB 4",
    CountryOfOrigin: "China",
  },

  refurbishment: {
    summary: "40+ Quality Checks Passed",
    points: [
      "Battery Health: 92% (Excellent)",
      "No scratches or dents on body",
      "Display: No dead pixels",
      "Keyboard & Trackpad fully tested",
      "Thermal paste reapplied for optimal cooling",
      "Ports and connectivity verified",
    ],
  },

  warranty: {
    summary: "6 Months Warranty",
    details: [
      "Covers all internal hardware defects",
      "15-day no-questions-asked return policy",
      "Free repair or replacement within warranty period",
      "Extended warranty available up to 2 years",
    ],
  },

  detailedSpecs: [
    {
      title: "Processor",
      items: [
        { label: "Processor Type", value: "Apple M2" },
        { label: "CPU Cores", value: "8-Core CPU" },
        { label: "GPU Cores", value: "10-Core GPU" },
      ],
    },
    {
      title: "Display",
      items: [
        { label: "Screen Size", value: "13.3 inch" },
        { label: "Resolution", value: "2560 x 1600" },
        { label: "Display Type", value: "Retina IPS" },
        { label: "Brightness", value: "500 nits" },
      ],
    },
    {
      title: "Memory",
      items: [
        { label: "RAM Installed", value: "8GB" },
        { label: "Memory Type", value: "Unified Memory" },
      ],
    },
    {
      title: "Storage",
      items: [
        { label: "Type", value: "SSD" },
        { label: "Capacity", value: "256GB" },
      ],
    },
    {
      title: "Connectivity",
      items: [
        { label: "WiFi", value: "Wi-Fi 6" },
        { label: "Bluetooth", value: "Bluetooth 5.0" },
      ],
    },
    {
      title: "Ports",
      items: [
        { label: "USB Ports", value: "2 x Thunderbolt / USB 4" },
        { label: "Headphone Jack", value: "Yes" },
      ],
    },
    {
      title: "Battery",
      items: [
        { label: "Battery Life", value: "Up to 20 hours" },
        { label: "Charging", value: "67W USB-C Adapter" },
      ],
    },
    {
      title: "Build & Design",
      items: [
        { label: "Weight", value: "1.4 kg" },
        { label: "Material", value: "Aluminum" },
        { label: "Color", value: "Silver" },
      ],
    },
  ],

  isTrending: true,
  isNewArrival: true,
  isBestDeal: false,
}
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
