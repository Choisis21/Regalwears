/**
 * Temporary content for the storefront while we build out the UI. Everything
 * here gets replaced by real database + Cloudinary data once the catalog and
 * seed phases land. The shapes mirror the Prisma models so the swap is easy.
 *
 * Images are verified Unsplash fashion photos, used as placeholders only.
 */

const img = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "New In", href: "/shop/new" },
  { label: "Dresses", href: "/shop/dresses" },
  { label: "Tops", href: "/shop/tops" },
  { label: "Occasion", href: "/shop/occasion" },
  { label: "Style Stories", href: "/blog" },
  { label: "About", href: "/about" },
];

export type Currency = { code: string; symbol: string; label: string };

export const currencies: Currency[] = [
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "NGN", symbol: "₦", label: "Nigerian Naira" },
];

export type HeroSlide = {
  eyebrow: string;
  title: string;
  copy: string;
  cta: string;
  href: string;
  image: string;
};

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "New season",
    title: "Dressed for the moments that matter",
    copy: "Flowing silhouettes, rich colour, and fabric that moves with you. Meet the pieces you'll reach for again and again.",
    cta: "Shop the collection",
    href: "/shop/new",
    image: img("1490481651871-ab68de25d43d", 1600),
  },
  {
    eyebrow: "Wedding guest edit",
    title: "Be the one they remember",
    copy: "From garden ceremonies to evening receptions, here are the dresses that turn heads for all the right reasons.",
    cta: "Find your look",
    href: "/shop/occasion",
    image: img("1483985988355-763728e1935b", 1600),
  },
  {
    eyebrow: "Everyday luxe",
    title: "Effortless never looked this good",
    copy: "The tops and separates that make getting dressed the easy part of your morning. Soft, smart, and quietly beautiful.",
    cta: "Explore everyday",
    href: "/shop/tops",
    image: img("1572804013309-59a88b7e92f1", 1600),
  },
];

export type Category = {
  name: string;
  href: string;
  blurb: string;
  image: string;
};

export const categories: Category[] = [
  { name: "Dresses", href: "/shop/dresses", blurb: "From maxi to midi", image: img("1485462537746-965f33f7f6a7") },
  { name: "Tops & Blouses", href: "/shop/tops", blurb: "Soft tailoring", image: img("1496217590455-aa63a8350eea") },
  { name: "Occasion", href: "/shop/occasion", blurb: "For the big days", image: img("1525507119028-ed4c629a60a3") },
  { name: "New Arrivals", href: "/shop/new", blurb: "Just landed", image: img("1515372039744-b8f02a3ae446") },
];

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  badge?: string;
  rating: number;
  reviewCount: number;
  image: string;
};

export const trendingProducts: Product[] = [
  { id: "p1", name: "Silk Maxi Dress in Burgundy", slug: "silk-maxi-dress-burgundy", price: 189, compareAtPrice: 240, badge: "Only 3 left", rating: 4.8, reviewCount: 24, image: img("1539109136881-3be0616acf4b") },
  { id: "p2", name: "Wrap Midi Dress", slug: "wrap-midi-dress", price: 124, rating: 4.6, reviewCount: 41, badge: "Bestseller", image: img("1496747611176-843222e1e57c") },
  { id: "p3", name: "Tailored Crepe Blazer", slug: "tailored-crepe-blazer", price: 210, rating: 4.9, reviewCount: 18, image: img("1487412720507-e7ab37603c6f") },
  { id: "p4", name: "Satin Slip Skirt", slug: "satin-slip-skirt", price: 98, compareAtPrice: 130, rating: 4.5, reviewCount: 33, badge: "Sale", image: img("1469334031218-e382a71b716b") },
  { id: "p5", name: "Puff Sleeve Blouse", slug: "puff-sleeve-blouse", price: 76, rating: 4.7, reviewCount: 52, image: img("1502716119720-b23a93e5fe1b") },
  { id: "p6", name: "Pleated Evening Gown", slug: "pleated-evening-gown", price: 268, rating: 5.0, reviewCount: 12, badge: "New", image: img("1518049362265-d5b2a6467637") },
];

export const newArrivals: Product[] = [
  { id: "n1", name: "Embroidered Tea Dress", slug: "embroidered-tea-dress", price: 158, rating: 4.8, reviewCount: 9, badge: "New", image: img("1539008835657-9e8e9680c956") },
  { id: "n2", name: "Linen Shirt Dress", slug: "linen-shirt-dress", price: 112, rating: 4.6, reviewCount: 14, badge: "New", image: img("1595777457583-95e059d581b8") },
  { id: "n3", name: "Ruffle Hem Blouse", slug: "ruffle-hem-blouse", price: 84, rating: 4.7, reviewCount: 7, badge: "New", image: img("1551048632-24e444b48a3e") },
  { id: "n4", name: "Belted Trench Coat", slug: "belted-trench-coat", price: 245, rating: 4.9, reviewCount: 5, badge: "New", image: img("1490481651871-ab68de25d43d") },
];

export type BlogPreview = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
};

export const blogPreviews: BlogPreview[] = [
  {
    title: "10 Summer Wedding Outfit Ideas for 2026",
    slug: "summer-wedding-outfit-ideas",
    excerpt: "Garden ceremony or ballroom reception, here's how to look unforgettable without upstaging the bride.",
    category: "Occasion",
    readTime: "6 min read",
    image: img("1469334031218-e382a71b716b"),
  },
  {
    title: "How to Style a Maxi Dress for Any Occasion",
    slug: "how-to-style-a-maxi-dress",
    excerpt: "One dress, five completely different looks. A little styling goes a long way, and we'll show you exactly how.",
    category: "Style Tips",
    readTime: "5 min read",
    image: img("1502716119720-b23a93e5fe1b"),
  },
  {
    title: "Spring Fashion Trends Every Woman Should Know",
    slug: "spring-fashion-trends",
    excerpt: "The colours, shapes, and little details defining the season. Consider this your shortcut to looking current.",
    category: "Trends",
    readTime: "7 min read",
    image: img("1496217590455-aa63a8350eea"),
  },
];

export const galleryImages: string[] = [
  img("1539109136881-3be0616acf4b", 600),
  img("1515372039744-b8f02a3ae446", 600),
  img("1496747611176-843222e1e57c", 600),
  img("1485462537746-965f33f7f6a7", 600),
  img("1487412720507-e7ab37603c6f", 600),
  img("1525507119028-ed4c629a60a3", 600),
];
