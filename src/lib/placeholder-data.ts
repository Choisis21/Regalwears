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
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
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
    title: "Be the guest they always remember",
    copy: "From garden ceremonies to candlelit receptions, here are the dresses that turn heads for all the right reasons. Easy to wear, beautifully cut, and impossible to forget.",
    cta: "Find your look",
    href: "/shop/occasion",
    image: img("1483985988355-763728e1935b", 1600),
  },
  {
    eyebrow: "Everyday luxe",
    title: "Where effortless meets quietly unforgettable",
    copy: "The tops and separates that make getting dressed the easy part of your morning. Soft to the touch, smart in the detail, and just as lovely from your desk to dinner.",
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

// --- Catalog ---------------------------------------------------------------

export type CategorySlug = "dresses" | "tops" | "occasion";

export type ProductColor = { name: string; hex: string };

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
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  categorySlug: CategorySlug;
  isNew?: boolean;
};

const SIZES = ["XS", "S", "M", "L", "XL"];

const C: Record<string, ProductColor> = {
  burgundy: { name: "Burgundy", hex: "#401526" },
  rose: { name: "Rose", hex: "#c29f93" },
  black: { name: "Black", hex: "#211b1e" },
  ivory: { name: "Ivory", hex: "#efe9e0" },
  navy: { name: "Navy", hex: "#2b3346" },
  sage: { name: "Sage", hex: "#9ba88c" },
  blush: { name: "Blush", hex: "#e3c9c2" },
  emerald: { name: "Emerald", hex: "#2f5d52" },
};

type BuildOpts = {
  compareAtPrice?: number;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
};

// Real product photography. The three mannequin shots are cycled across the
// catalog so each product leads with a different one, and every gallery still
// shows all three. Swap to per-product images once more photos are supplied.
const MANNEQUINS = [
  "/products/mannequin-1.webp",
  "/products/mannequin-2.webp",
  "/products/mannequin-3.webp",
];
let buildSeq = 0;

function build(
  id: string,
  name: string,
  slug: string,
  price: number,
  categorySlug: CategorySlug,
  imageIds: string[],
  colors: ProductColor[],
  description: string,
  opts: BuildOpts = {},
): Product {
  const start = buildSeq++ % MANNEQUINS.length;
  const images = imageIds.map(
    (_, k) => MANNEQUINS[(start + k) % MANNEQUINS.length],
  );
  return {
    id,
    name,
    slug,
    price,
    categorySlug,
    images,
    image: images[0],
    colors,
    sizes: SIZES,
    description,
    rating: opts.rating ?? 4.7,
    reviewCount: opts.reviewCount ?? 20,
    compareAtPrice: opts.compareAtPrice,
    badge: opts.badge,
    isNew: opts.isNew,
  };
}

export const allProducts: Product[] = [
  build("p1", "Silk Maxi Dress in Burgundy", "silk-maxi-dress-burgundy", 189, "dresses",
    ["1539109136881-3be0616acf4b", "1572804013309-59a88b7e92f1", "1483985988355-763728e1935b"],
    [C.burgundy, C.rose, C.black],
    "This is the dress that was made for twirling. The silk catches the light as you move, the cut skims in all the right places, and that deep burgundy? It was made for evenings you won't forget.",
    { compareAtPrice: 240, badge: "Only 3 left", rating: 4.8, reviewCount: 24 }),

  build("p2", "Wrap Midi Dress", "wrap-midi-dress", 124, "dresses",
    ["1496747611176-843222e1e57c", "1515372039744-b8f02a3ae446", "1496217590455-aa63a8350eea"],
    [C.rose, C.navy, C.black],
    "A true wardrobe hero. The wrap silhouette flatters everyone, the midi length takes you from desk to dinner, and you'll find yourself reaching for it on repeat.",
    { badge: "Bestseller", rating: 4.6, reviewCount: 41 }),

  build("p3", "Embroidered Tea Dress", "embroidered-tea-dress", 158, "dresses",
    ["1539008835657-9e8e9680c956", "1595777457583-95e059d581b8", "1485462537746-965f33f7f6a7"],
    [C.ivory, C.blush, C.sage],
    "Delicate embroidery, a softly nipped waist, and a hem that floats with every step. This is the dress for long lunches and longer afternoons in the sun.",
    { isNew: true, rating: 4.8, reviewCount: 9 }),

  build("p4", "Linen Shirt Dress", "linen-shirt-dress", 112, "dresses",
    ["1595777457583-95e059d581b8", "1496217590455-aa63a8350eea", "1515372039744-b8f02a3ae446"],
    [C.ivory, C.sage, C.navy],
    "Breezy linen that only gets better with wear. Throw it on over swimwear or belt it for the office, it is endlessly easy and quietly chic.",
    { isNew: true, rating: 4.6, reviewCount: 14 }),

  build("p5", "Floral Wrap Dress", "floral-wrap-dress", 138, "dresses",
    ["1485462537746-965f33f7f6a7", "1496747611176-843222e1e57c", "1483985988355-763728e1935b"],
    [C.blush, C.rose, C.emerald],
    "A print that feels like spring all year round. The wrap ties to your perfect fit and the fabric drapes beautifully, so you look put together with zero effort.",
    { isNew: true, rating: 4.7, reviewCount: 17 }),

  build("p6", "Ribbed Knit Midi Dress", "ribbed-knit-midi-dress", 96, "dresses",
    ["1515372039744-b8f02a3ae446", "1539109136881-3be0616acf4b", "1502716119720-b23a93e5fe1b"],
    [C.black, C.burgundy, C.sage],
    "Soft, stretchy, and so comfortable you might forget you're wearing it. The ribbed knit hugs gently and layers like a dream under a coat or blazer.",
    { rating: 4.5, reviewCount: 28 }),

  build("p7", "Puff Sleeve Blouse", "puff-sleeve-blouse", 76, "tops",
    ["1502716119720-b23a93e5fe1b", "1496217590455-aa63a8350eea", "1595777457583-95e059d581b8"],
    [C.ivory, C.blush, C.navy],
    "A little drama in all the right places. Those puff sleeves do the talking, so you can keep the rest simple and still feel completely pulled together.",
    { rating: 4.7, reviewCount: 52 }),

  build("p8", "Ruffle Hem Blouse", "ruffle-hem-blouse", 84, "tops",
    ["1551048632-24e444b48a3e", "1502716119720-b23a93e5fe1b", "1496217590455-aa63a8350eea"],
    [C.rose, C.ivory, C.black],
    "Romantic without trying too hard. The soft ruffle adds movement and the relaxed fit means it tucks in or floats free, whatever your mood.",
    { isNew: true, rating: 4.7, reviewCount: 7 }),

  build("p9", "Cropped Knit Cardigan", "cropped-knit-cardigan", 92, "tops",
    ["1525507119028-ed4c629a60a3", "1485462537746-965f33f7f6a7", "1539008835657-9e8e9680c956"],
    [C.sage, C.ivory, C.rose],
    "The throw-on layer you'll live in. Cropped just right to sit over dresses and high-waisted everything, in a yarn soft enough to wear against the skin.",
    { rating: 4.6, reviewCount: 21 }),

  build("p10", "Silk Camisole", "silk-camisole", 64, "tops",
    ["1496217590455-aa63a8350eea", "1502716119720-b23a93e5fe1b", "1595777457583-95e059d581b8"],
    [C.blush, C.black, C.ivory],
    "A quiet luxury you'll reach for constantly. Wear it solo with tailoring or peeking out from under a blazer, the silk feels wonderful and looks even better.",
    { isNew: true, rating: 4.8, reviewCount: 11 }),

  build("p11", "Oversized Poplin Shirt", "oversized-poplin-shirt", 88, "tops",
    ["1595777457583-95e059d581b8", "1515372039744-b8f02a3ae446", "1496217590455-aa63a8350eea"],
    [C.ivory, C.navy, C.sage],
    "Crisp, cool, and effortlessly undone. Leave it loose over denim or knot it at the waist, this is the shirt that makes everything look intentional.",
    { rating: 4.6, reviewCount: 19 }),

  build("p12", "Pleated Evening Gown", "pleated-evening-gown", 268, "occasion",
    ["1518049362265-d5b2a6467637", "1572804013309-59a88b7e92f1", "1539109136881-3be0616acf4b"],
    [C.burgundy, C.emerald, C.black],
    "For the nights that deserve a little ceremony. Liquid pleats fall from a sculpted bodice, so you make an entrance the moment you walk in.",
    { badge: "New", rating: 5.0, reviewCount: 12 }),

  build("p13", "Satin Slip Skirt", "satin-slip-skirt", 98, "occasion",
    ["1469334031218-e382a71b716b", "1502716119720-b23a93e5fe1b", "1515372039744-b8f02a3ae446"],
    [C.rose, C.black, C.navy],
    "The bias-cut slip that does all the work. It catches the light, swishes as you walk, and dresses up or down depending on what you pair it with.",
    { compareAtPrice: 130, badge: "Sale", rating: 4.5, reviewCount: 33 }),

  build("p14", "Tailored Crepe Blazer", "tailored-crepe-blazer", 210, "occasion",
    ["1487412720507-e7ab37603c6f", "1572804013309-59a88b7e92f1", "1490481651871-ab68de25d43d"],
    [C.black, C.navy, C.ivory],
    "Sharp shoulders, soft crepe, endless confidence. Throw it over a slip dress or wear it with the matching trousers, it pulls any look straight together.",
    { rating: 4.9, reviewCount: 18 }),

  build("p15", "Belted Trench Coat", "belted-trench-coat", 245, "occasion",
    ["1490481651871-ab68de25d43d", "1469334031218-e382a71b716b", "1515372039744-b8f02a3ae446"],
    [C.ivory, C.sage, C.navy],
    "A forever piece you'll wear for years. Classic lines, a waist-cinching belt, and a length that works over everything from jeans to evening wear.",
    { isNew: true, rating: 4.9, reviewCount: 5 }),

  build("p16", "High-Rise Wide Trousers", "high-rise-wide-trousers", 118, "occasion",
    ["1485462537746-965f33f7f6a7", "1487412720507-e7ab37603c6f", "1515372039744-b8f02a3ae446"],
    [C.black, C.ivory, C.navy],
    "The trousers that make you stand a little taller. A high waist, a fluid wide leg, and a drape that feels dressy even with a simple tee.",
    { badge: "Bestseller", rating: 4.8, reviewCount: 29 }),

  build("p17", "Sequin Mini Dress", "sequin-mini-dress", 176, "occasion",
    ["1539109136881-3be0616acf4b", "1518049362265-d5b2a6467637", "1483985988355-763728e1935b"],
    [C.burgundy, C.black, C.rose],
    "Pure party, zero apology. Hand-sewn sequins catch every flicker of light, so you shimmer from the first dance to the last.",
    { rating: 4.7, reviewCount: 15 }),

  build("p18", "Cashmere Wrap Coat", "cashmere-wrap-coat", 295, "occasion",
    ["1490481651871-ab68de25d43d", "1525507119028-ed4c629a60a3", "1469334031218-e382a71b716b"],
    [C.sage, C.ivory, C.burgundy],
    "Wrapped in this, the cold doesn't stand a chance. Featherlight cashmere, a generous collar, and a tie belt that feels like a hug. Worth every penny.",
    { compareAtPrice: 360, badge: "Sale", rating: 4.9, reviewCount: 8 }),
];

// --- Catalog helpers -------------------------------------------------------

export type CatalogSlug = CategorySlug | "new" | "all";

export const categoryMeta: Record<
  CatalogSlug,
  { name: string; tagline: string; image: string }
> = {
  all: {
    name: "All pieces",
    tagline: "Everything we're loving right now, in one place.",
    image: img("1490481651871-ab68de25d43d", 1600),
  },
  new: {
    name: "New In",
    tagline: "The latest arrivals, fresh off the rail and ready to be loved.",
    image: img("1515372039744-b8f02a3ae446", 1600),
  },
  dresses: {
    name: "Dresses",
    tagline: "From floaty maxis to easy midis, a dress for every occasion.",
    image: img("1485462537746-965f33f7f6a7", 1600),
  },
  tops: {
    name: "Tops & Blouses",
    tagline: "Soft tailoring and everyday favourites to build a look around.",
    image: img("1496217590455-aa63a8350eea", 1600),
  },
  occasion: {
    name: "Occasion",
    tagline: "Gowns, tailoring, and statement pieces for the big days.",
    image: img("1525507119028-ed4c629a60a3", 1600),
  },
};

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getProductsByCatalog(slug: CatalogSlug): Product[] {
  if (slug === "all") return allProducts;
  if (slug === "new") return allProducts.filter((p) => p.isNew);
  return allProducts.filter((p) => p.categorySlug === slug);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return allProducts
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, count);
}

export const allColors: ProductColor[] = Object.values(C);
export const allSizes = SIZES;

// Derived homepage collections (kept as named exports the home sections use).
const trendingSlugs = [
  "silk-maxi-dress-burgundy",
  "wrap-midi-dress",
  "tailored-crepe-blazer",
  "satin-slip-skirt",
  "puff-sleeve-blouse",
  "pleated-evening-gown",
  "cropped-knit-cardigan",
  "high-rise-wide-trousers",
];

export const trendingProducts: Product[] = trendingSlugs
  .map((s) => allProducts.find((p) => p.slug === s))
  .filter((p): p is Product => Boolean(p));

const newArrivalSlugs = [
  "embroidered-tea-dress",
  "linen-shirt-dress",
  "ruffle-hem-blouse",
  "belted-trench-coat",
];

export const newArrivals: Product[] = newArrivalSlugs
  .map((s) => allProducts.find((p) => p.slug === s))
  .filter((p): p is Product => Boolean(p));

export type BlogBlock = { type: "p" | "h2"; text: string };

export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  author: string;
  date: string;
  body: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    title: "10 Summer Wedding Outfit Ideas for 2026",
    slug: "summer-wedding-outfit-ideas",
    excerpt: "Garden ceremony or ballroom reception, here's how to look unforgettable without upstaging the bride.",
    category: "Occasion",
    readTime: "6 min read",
    image: img("1469334031218-e382a71b716b", 1600),
    author: "Sarah Mitchell",
    date: "May 15, 2026",
    body: [
      { type: "p", text: "Wedding season is upon us, and with it comes the happy little panic of figuring out what to wear. The good news? Dressing for someone else's big day has never been more fun, and this year the options are softer, brighter, and more you than ever." },
      { type: "h2", text: "Start with the setting" },
      { type: "p", text: "A garden ceremony asks for something different than a black-tie ballroom. For daytime celebrations, think floaty fabrics and gentle colour. For evening, lean into richer tones and a little shine. When in doubt, a midi dress in a beautiful fabric will carry you through almost anything." },
      { type: "h2", text: "Colour, the right way" },
      { type: "p", text: "The old rule about avoiding white still stands, but everything else is fair game. Dusty rose, sage, and deep burgundy are everywhere this season, and they photograph beautifully. Pick a shade that makes you feel like the best version of yourself, then build the rest of the look around it." },
      { type: "p", text: "Finish with shoes you can actually walk in, a bag just big enough for the essentials, and one piece of jewellery that feels special. You want to remember the dancing, not your aching feet." },
    ],
  },
  {
    title: "How to Style a Maxi Dress for Any Occasion",
    slug: "how-to-style-a-maxi-dress",
    excerpt: "One dress, five completely different looks. A little styling goes a long way, and we'll show you exactly how.",
    category: "Style Tips",
    readTime: "5 min read",
    image: img("1502716119720-b23a93e5fe1b", 1600),
    author: "Amara Okafor",
    date: "May 9, 2026",
    body: [
      { type: "p", text: "A great maxi dress is the hardest working piece in your wardrobe. It looks effortless, it travels well, and with a few small changes it can take you almost anywhere. Here's how to get the most out of yours." },
      { type: "h2", text: "Dress it down for day" },
      { type: "p", text: "Throw a denim jacket over the top, slip into flat sandals, and add a woven tote. Suddenly your evening dress is ready for a farmers market or a long lunch in the sun." },
      { type: "h2", text: "Dress it up for night" },
      { type: "p", text: "Swap the flats for heels, add a tailored blazer, and let one bold earring do the talking. The same dress now feels completely ready for dinner and drinks." },
      { type: "p", text: "The secret is layering and accessories. Once you start seeing your maxi as a blank canvas, you'll never run out of ways to wear it." },
    ],
  },
  {
    title: "The Ultimate Guide to Finding Your Perfect Size",
    slug: "finding-your-perfect-size",
    excerpt: "Sizing shouldn't be a guessing game. Here's how to measure, what to look for, and how to shop with confidence.",
    category: "Fit & Care",
    readTime: "8 min read",
    image: img("1485462537746-965f33f7f6a7", 1600),
    author: "Sarah Mitchell",
    date: "April 28, 2026",
    body: [
      { type: "p", text: "Few things ruin the joy of a new dress like getting it home and finding the fit is off. The fix is simpler than you think, and it starts with knowing your real measurements rather than the size on the label." },
      { type: "h2", text: "Measure with a soft tape" },
      { type: "p", text: "Take your bust, waist, and hips while wearing light clothing, and keep the tape snug but not tight. Write the numbers down, because they're far more reliable than guessing from a size you wore three years ago." },
      { type: "h2", text: "Read the fabric, not just the chart" },
      { type: "p", text: "A structured cotton behaves very differently from a fluid silk. If a piece has stretch, you can often size down for a closer fit. If it's woven and stiff, a little room makes all the difference in comfort." },
      { type: "p", text: "And remember, sizing varies between styles for a reason. Trust the measurements, use the size guide on every product page, and reach out if you're ever between sizes. We're always happy to help you choose." },
    ],
  },
  {
    title: "Spring Fashion Trends Every Woman Should Know",
    slug: "spring-fashion-trends",
    excerpt: "The colours, shapes, and little details defining the season. Consider this your shortcut to looking current.",
    category: "Trends",
    readTime: "7 min read",
    image: img("1496217590455-aa63a8350eea", 1600),
    author: "Amara Okafor",
    date: "April 12, 2026",
    body: [
      { type: "p", text: "Spring always feels like a fresh start, and this year's trends are all about ease. Less fuss, more feeling good. Here are the ideas worth folding into your wardrobe now." },
      { type: "h2", text: "Soft tailoring" },
      { type: "p", text: "Sharp shoulders are stepping back in favour of relaxed blazers and trousers that move with you. The look is still polished, just a great deal more comfortable." },
      { type: "h2", text: "Quiet colour" },
      { type: "p", text: "Think buttery creams, dusty roses, and gentle sage. These soft tones layer beautifully and flatter just about everyone, which is exactly why they're everywhere this season." },
      { type: "p", text: "You don't need to overhaul your whole closet to feel current. Add one or two pieces that speak to the season, and let the rest of your favourites do what they do best." },
    ],
  },
  {
    title: "5 Ways to Transition Your Wardrobe from Day to Night",
    slug: "day-to-night-wardrobe",
    excerpt: "Going straight from work to dinner? These quick swaps take your look from desk to date with zero stress.",
    category: "Style Tips",
    readTime: "5 min read",
    image: img("1572804013309-59a88b7e92f1", 1600),
    author: "Sarah Mitchell",
    date: "March 30, 2026",
    body: [
      { type: "p", text: "Some days run long, and there's simply no time to go home and change. The trick to looking effortlessly put together from morning to midnight is keeping a few small things close by." },
      { type: "h2", text: "Switch the shoes" },
      { type: "p", text: "Nothing transforms an outfit faster than swapping flats for heels. Keep a slim pair in your bag and you're halfway to evening already." },
      { type: "h2", text: "Add a little shine" },
      { type: "p", text: "A bolder lip, a pair of statement earrings, and a smaller bag instantly shift the mood. Tuck them in a pouch and you can refresh your look in five minutes flat." },
      { type: "p", text: "Build your day around one versatile piece, like a slip dress or tailored trousers, and these quick swaps will carry you anywhere the evening leads." },
    ],
  },
];

export type BlogPreview = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
};

const toPreview = (p: BlogPost): BlogPreview => ({
  title: p.title,
  slug: p.slug,
  excerpt: p.excerpt,
  category: p.category,
  readTime: p.readTime,
  image: p.image,
});

export const blogPreviews: BlogPreview[] = blogPosts.slice(0, 3).map(toPreview);

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export const galleryImages: string[] = [
  img("1539109136881-3be0616acf4b", 700),
  img("1515372039744-b8f02a3ae446", 700),
  img("1496747611176-843222e1e57c", 700),
  img("1485462537746-965f33f7f6a7", 700),
  img("1487412720507-e7ab37603c6f", 700),
  img("1525507119028-ed4c629a60a3", 700),
  img("1572804013309-59a88b7e92f1", 700),
  img("1539008835657-9e8e9680c956", 700),
  img("1490481651871-ab68de25d43d", 700),
];
