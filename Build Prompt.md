 Here is the updated Claude Code prompt with the correct brand name **Regal Wears** and a comprehensive, detailed SEO plan:

---

## **Claude Code Prompt: Regal Wears — Fashion E-Commerce Platform**

---

### **PROJECT OVERVIEW**

Build a production-ready fashion e-commerce website called **"Regal Wears"** selling ladies' wear. This is a client demo, so everything must work end-to-end with test payment modes. The site must feel alive, modern, and human. No robotic language anywhere.

---

### **CRITICAL BUILD RULES**

1. **ALWAYS CONFIRM BEFORE ACTING** — For any architectural decision, dependency addition, file deletion, or significant change, pause and ask: *"I am about to [action]. Should I proceed?"*
2. **HUMANIZED CONTENT ONLY** — Every piece of text must sound natural and conversational. No dashes used in place of commas. No stiff, corporate language. Write like a stylish friend recommending an outfit.
3. **SCROLL ANIMATIONS EVERYWHERE** — Every section, card, image, and text block must animate on scroll. Use Framer Motion or GSAP. Elements should fade up, slide in, or scale gently. The site must feel alive as users scroll.

---

### **BRAND IDENTITY**

**Brand Name:** Regal Wears

**Brand Colors:**

| Role | Hex Code | Usage |
|------|----------|-------|
| **Primary** | `#401526` | Deep Burgundy — Primary backgrounds, hero sections, footer, primary buttons, header |
| **Secondary** | `#321927` | Dark Wine — Secondary backgrounds, cards, dropdowns, admin dashboard, hover states |
| **Accent** | `#C29F93` | Rose Gold — Logo, accents, highlights, CTAs, links, borders, icons, badges, price tags |
| **Supporting** | `#866F76` | Mauve Brown — Supporting accents, secondary buttons, subtle borders, dividers |
| **Secondary Accent** | `#634348` | Dusty Plum — Tertiary accents, tags, labels, inactive states, chart elements |
| **Text Light** | `#F8F6F7` | Off White — Primary text on dark backgrounds, headings, body copy on primary/secondary |
| **Dark UI** | `#1E2528` | Charcoal Black — Dark UI elements, modals, overlays, admin sidebar |

**Simplified Palette for Quick Reference:**
- **Primary:** `#401526`
- **Secondary:** `#321927`
- **Accent (Logo):** `#C29F93`
- **Text Light:** `#F8F6F7`

**Color Usage Rules:**
- Hero sections: Primary (`#401526`) background with Text Light (`#F8F6F7`) text and Accent (`#C29F93`) highlights
- Product cards: Secondary (`#321927`) background with Text Light text, Accent for prices and buttons
- Buttons: Primary fill with Accent text, or Accent fill with Primary text for CTAs
- Links and interactive elements: Accent (`#C29F93`) with hover brightness increase
- Footer: Primary background with Text Light text and Accent hover states
- Admin dashboard: Secondary background with Text Light text, Accent for active nav items
- Modals/overlays: Dark UI (`#1E2528`) with semi-transparency
- Success states: Accent (`#C29F93`) with subtle glow
- Error states: Desaturated red that harmonizes with the burgundy palette (e.g., `#8B3A3A`)
- Skeleton loaders: Mauve Brown (`#866F76`) at 20% opacity

**Typography:**
- Headings: Elegant serif or sophisticated sans-serif (suggest Playfair Display or Cormorant Garamond for headings, Inter for body)
- Body: Clean, readable sans-serif (Inter or similar)
- All text must feel warm and human, never robotic

---

### **TECH STACK**

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | PostgreSQL via Supabase |
| ORM | Prisma |
| Auth | NextAuth.js (credentials + Google OAuth) |
| Payments | Stripe + PayPal (both in test mode) |
| Images | Cloudinary |
| Search | Algolia (free tier) |
| Email | Resend |
| Animations | Framer Motion |
| Icons | Lucide React |

---

### **DATABASE SCHEMA (Prisma)**

```prisma
// Core Models
model User { id, email, name, passwordHash, role(USER/ADMIN), addresses[], orders[], wishlist[], reviews[], createdAt }
model Product { id, name, description, price, compareAtPrice?, category, subcategory, tags[], images[], variants[], stock, status, rating, reviewCount, seoTitle, seoDescription, createdAt }
model ProductVariant { id, productId, color, size, sku, stock, images[] }
model Category { id, name, slug, parentId?, image, description }
model Order { id, userId?, guestEmail?, status, total, currency, items[], shippingAddress, paymentStatus, paymentMethod, stripePaymentIntentId?, paypalOrderId?, createdAt }
model OrderItem { id, orderId, productId, variantId, quantity, price, name, image }
model Review { id, productId, userId, rating, comment, images[], createdAt }
model Cart { id, userId?, sessionId, items[], expiresAt }
model CartItem { id, cartId, productId, variantId, quantity }
model Wishlist { id, userId, productId, createdAt }
model BlogPost { id, title, slug, content, excerpt, coverImage, category, tags[], author, publishedAt, seoTitle, seoDescription }
model NewsletterSubscriber { id, email, createdAt }
model RecentlyViewed { id, userId?, sessionId, productId, viewedAt }
model Conversation { id, userId?, sessionId, messages[], createdAt }
model ChatMessage { id, conversationId, role, content, createdAt }
```

---

### **FEATURES TO BUILD**

#### **1. Homepage**
- Hero section with auto-sliding featured collections (3 slides), animated text reveals
  - Background: Primary (`#401526`)
  - Text: Text Light (`#F8F6F7`)
  - Highlights/CTAs: Accent (`#C29F93`)
- "Shop by Category" grid with hover zoom + overlay text animation
  - Cards: Secondary (`#321927`) background
  - Overlay: Dark UI (`#1E2528`) at 70% opacity
- "Trending Now" product carousel with snap scrolling
- "New Arrivals" section with staggered fade-up on scroll
- "Style Stories" blog preview (latest 3 posts)
- Newsletter signup banner with subtle pulse animation on input
  - Background: Secondary (`#321927`)
  - Input focus: Accent (`#C29F93`) border glow
- Trust badges (Free shipping, Easy returns, Secure payment) with icon pop-in animations
  - Icons: Accent (`#C29F93`)
- Instagram-style gallery section

#### **2. Product Catalog**
- Category pages with breadcrumb, filter sidebar (price, size, color, occasion), sort dropdown
- Product grid with lazy-loaded images, hover reveal of second image
  - Card background: Secondary (`#321927`)
  - Price: Accent (`#C29F93`)
  - "Add to Cart" button: Accent fill, Primary text
- Quick view modal (no page reload)
  - Modal overlay: Dark UI (`#1E2528`) at 80% opacity
- Pagination or infinite scroll
- **Search**: Algolia-powered with autocomplete, typo tolerance, highlighting
  - Search dropdown: Secondary background, Accent highlights on matches

#### **3. Product Detail Page**
- Image gallery with zoom, thumbnail navigation, swipe on mobile
- Color swatches (click to change variant image)
- Size selector with size guide modal
- Price with strikethrough compare-at price if on sale
  - Sale price: Accent (`#C29F93`)
  - Original price: Mauve Brown (`#866F76`) with strikethrough
- Stock indicator ("Only 3 left!" urgency text)
  - Urgent: Accent with subtle pulse
- Add to cart + Add to wishlist buttons
  - Primary: Accent fill
  - Secondary: Primary border with Text Light text
- AI Description Generator (mock): Button that generates description from product attributes
  - Button: Accent (`#C29F93`) with Dark UI text
- Reviews section with star ratings, customer photos, "Helpful" voting
  - Stars: Accent fill, Mauve Brown empty
- Related products + Recently viewed products
- Sticky "Add to Cart" bar on mobile scroll
  - Background: Primary (`#401526`)
  - Button: Accent (`#C29F93`)

#### **4. Shopping Cart**
- Slide-out drawer (desktop) / full page (mobile)
  - Drawer background: Secondary (`#321927`)
  - Border: Supporting (`#866F76`) subtle
- Quantity stepper with instant subtotal update
- Remove item with undo toast
  - Toast: Dark UI (`#1E2528`) with Accent left border
- Save for later (moves to wishlist)
- Free shipping progress bar
  - Progress fill: Accent (`#C29F93`)
  - Track: Mauve Brown (`#866F76`)
- Estimated tax and shipping calculator

#### **5. Checkout Flow**
- Step indicator (Cart → Shipping → Payment → Confirmation)
  - Active step: Accent (`#C29F93`)
  - Completed step: Supporting (`#866F76`)
  - Pending step: Dusty Plum (`#634348`)
- Guest checkout or logged-in (saved addresses)
- Shipping method selection
- Order summary sidebar (sticky)
  - Background: Secondary (`#321927`)
- **Payment**: Stripe Elements (card) + PayPal button (test mode)
  - Stripe input focus: Accent border glow
- Order confirmation page
  - Background: Primary (`#401526`)
  - Success icon: Accent (`#C29F93`) with glow animation
- Order confirmation email via Resend

#### **6. User Account**
- Dashboard with recent orders, saved addresses, wishlist
  - Sidebar nav active: Accent (`#C29F93`) indicator
- Order detail page with tracking status timeline
  - Timeline completed: Accent
  - Timeline pending: Dusty Plum
- Profile settings (name, email, password change)
- Wishlist page with move-to-cart

#### **7. Reviews & Ratings**
- Star rating input (1-5)
  - Selected: Accent (`#C29F93`)
  - Unselected: Dusty Plum (`#634348`)
- Text review + optional photo upload
- "Verified Purchase" badge
  - Badge: Accent background, Primary text
- Admin moderation (approve before display)

#### **8. Wishlist**
- Heart toggle on product cards
  - Active: Accent (`#C29F93`) with fill animation
  - Inactive: Text Light outline
- Dedicated wishlist page
- Move to cart, remove

#### **9. Recently Viewed**
- Horizontal scroll section on product pages and homepage
- Stored per user (DB) or session (localStorage fallback)

#### **10. Multi-Currency**
- Currency selector in header (USD, EUR, GBP, NGN)
  - Dropdown: Secondary (`#321927`) background
- Prices converted using hardcoded rates for demo
- Checkout in selected currency

#### **11. Blog / Style Guide**
- Category listing (Fashion Tips, Trends, Lookbooks)
- Rich text content with images
- Related products embedded in posts
- Social sharing buttons
  - Icons: Accent (`#C29F93`) on hover

#### **12. Newsletter**
- Popup after 30 seconds (first visit only) + footer form
  - Popup background: Secondary (`#321927`)
  - Close button: Text Light
- Resend integration for welcome email
- Unsubscribe link

#### **13. Chatbot (Rule-Based, No AI API)**
Build a floating chat widget (bottom-right):
- **Widget button**: Accent (`#C29F93`) circle with chat icon, pulse animation when new message
- **Chat window**: Secondary (`#321927`) background, Text Light text
- **User messages**: Primary (`#401526`) background, Text Light text
- **Bot messages**: Dark UI (`#1E2528`) background, Text Light text
- **Product cards in chat**: Secondary background, Accent price, Primary button
- **Quick-reply buttons**: Accent border, Text Light text, hover fill Accent
- **Greeting**: "Hey there! Looking for something special? I can help you find outfits, check your order, or figure out sizing."
- **Product Recommendations**: Parse keywords → query products by tags/categories → return 3 product cards
- **Size Guidance**: "I'm a US 8" → lookup size chart → "In our sizing, you'd be a Medium. Want to see the full size guide?"
- **Order Tracking**: Ask for order number + email → lookup in DB → return status timeline
- **Styling Advice**: Match product category to pre-written templates
- **Human Handoff**: "I can connect you with our style team. Leave your email and we'll get back to you within 2 hours."
- **Conversation History**: Store in DB per user/session

#### **14. Admin Dashboard** (`/admin` — protected, admin-only)
- **Login page**: Primary (`#401526`) background, Accent (`#C29F93`) logo, Text Light form
- **Dashboard Overview**:
  - Background: Secondary (`#321927`)
  - Cards: Dark UI (`#1E2528`) with Accent highlights for metrics
  - Charts: Accent, Supporting, Dusty Plum color scheme
  - Sales chart, recent orders, low stock alerts, new reviews pending
- **Products**:
  - List with search, filter, pagination
  - Add/Edit product: Name, description (manual or AI-generated toggle), price, compare-at price, category, tags, SEO fields
  - Variant manager: Add multiple color/size combos, each with own SKU and stock
  - Image upload: Multiple images, drag-to-reorder, set primary image
  - Stock management: Adjust quantities, set low-stock threshold
  - **AI Description**: Button "Generate Description" → creates text from attributes. Button style: Accent fill, Dark UI text
- **Orders**: View all, filter by status, update status, view details, print invoice
- **Reviews**: Approve/reject, reply to reviews
- **Blog Posts**: Create, edit, publish/unpublish
- **Newsletter Subscribers**: Export CSV
- **Settings**: Currency default, shipping rates, tax rates, size charts
- **Sidebar navigation**: Secondary background, active item: Accent left border + Text Light, inactive: Dusty Plum text

---

### **COMPREHENSIVE SEO PLAN**

This SEO strategy ensures search engines find, crawl, index, and rank Regal Wears as a relevant, authoritative fashion e-commerce site.

---

#### **1. TECHNICAL SEO FOUNDATION**

**Server-Side Rendering (SSR) & Static Site Generation (SSG)**
- All product pages, category pages, and blog posts must use SSR or SSG
- No client-side only rendering for indexable content
- Use Next.js `generateStaticParams` for category and product slugs at build time
- Dynamic product pages use SSR with `export const dynamic = 'force-static'` where possible, ISR for frequent updates

**Core Web Vitals Optimization**
- **LCP (Largest Contentful Paint)**: Optimize hero images with Next.js `<Image>`, priority loading, WebP/AVIF formats, proper sizing
- **INP (Interaction to Next Paint)**: Minimize JavaScript on interactive elements, use event delegation, optimize Framer Motion animations
- **CLS (Cumulative Layout Shift)**: Set explicit width/height on images, reserve space for dynamic content, avoid layout shifts from fonts
- **TTFB (Time to First Byte)**: Edge functions on Vercel, optimize database queries with Prisma, implement Redis caching for frequent queries

**Mobile-First Indexing**
- Google uses mobile version for indexing: ensure mobile site has identical content, structured data, and meta tags as desktop
- Responsive images with `srcset`, touch-friendly tap targets (min 48px), readable font sizes without zoom

**URL Architecture**
```
/                          → Homepage
/shop                      → All products
/shop/[category]           → Category pages (e.g., /shop/dresses)
/shop/[category]/[subcategory]  → Subcategory (e.g., /shop/dresses/maxi-dresses)
/product/[slug]            → Product pages (e.g., /product/silk-maxi-dress-burgundy)
/blog                      → Blog listing
/blog/[slug]               → Blog posts (e.g., /blog/summer-wedding-outfit-ideas)
/about                     → About page
/contact                   → Contact page
/faq                       → FAQ page
/size-guide                → Size guide
/shipping-returns          → Shipping & returns
/privacy-policy            → Privacy policy
/terms-of-service          → Terms of service
/admin                     → Admin dashboard (noindex)
```

**Canonical URLs**
- Every page must have self-referencing canonical tag
- Handle pagination with `rel="canonical"` pointing to first page, `rel="prev"` and `rel="next"`
- Filtered URLs (e.g., `?color=red&size=m`) must canonical to base category URL

**Robots.txt**
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /cart/
Disallow: /checkout/
Disallow: /account/
Disallow: /wishlist/
Disallow: /*?*sort=
Disallow: /*?*page=
Sitemap: https://regalwears.com/sitemap.xml
```

**XML Sitemap**
- Auto-generated dynamic sitemap at `/sitemap.xml`
- Include: homepage, all category pages, all product pages, all blog posts, static pages
- Lastmod dates from database `updatedAt` fields
- Priority values: homepage (1.0), categories (0.8), products (0.6), blog (0.7)
- Separate sitemap index if exceeding 50,000 URLs
- Submit to Google Search Console and Bing Webmaster Tools

**Pagination**
- Category pages with many products use proper pagination
- `rel="prev"` and `rel="next"` in `<head>`
- Each paginated page has unique title: "Dresses | Page 2 | Regal Wears"

---

#### **2. ON-PAGE SEO**

**Title Tags (60 characters max)**
- Homepage: "Regal Wears | Luxury Ladies' Fashion & Timeless Elegance"
- Category: "Shop [Category Name] | Regal Wears"
- Product: "[Product Name] | [Category] | Regal Wears"
- Blog: "[Post Title] | Style Guide | Regal Wears"
- Format: Primary Keyword | Secondary Keyword | Brand Name

**Meta Descriptions (150-160 characters)**
- Unique for every page
- Include primary keyword, compelling CTA, brand name
- Example product: "Discover the Silk Maxi Dress in Burgundy at Regal Wears. Elegant, flowing, and perfect for any occasion. Free shipping on orders over $100."

**Header Tag Hierarchy**
- Single H1 per page, unique and keyword-rich
- Logical H2, H3, H4 structure
- Product page H1: Product name
- Category page H1: Category name
- Blog post H1: Post title

**Image SEO**
- Descriptive file names: `silk-maxi-dress-burgundy-front.jpg` not `IMG_1234.jpg`
- Alt text: "Elegant burgundy silk maxi dress with floral embroidery, front view"
- Title attributes for additional context
- Next.js `<Image>` with proper `sizes` attribute
- Lazy loading for below-fold images, eager for hero
- WebP/AVIF with JPEG fallback

**Internal Linking**
- Breadcrumb navigation on all pages with Schema.org BreadcrumbList
- Related products on product pages (4-6 items)
- "You may also like" cross-category suggestions
- Category links in footer
- Blog posts link to relevant products
- Anchor text uses descriptive keywords, not "click here"

**Content Optimization**
- Product descriptions: 200+ words, natural keyword inclusion
- Category pages: 150+ words of unique introductory content
- Blog posts: 1000+ words, comprehensive coverage of topic
- Keyword density: 1-2%, focus on natural language
- LSI (Latent Semantic Indexing) keywords: related terms naturally woven in

---

#### **3. STRUCTURED DATA (JSON-LD)**

**Product Schema (Every Product Page)**
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Silk Maxi Dress - Burgundy",
  "image": ["https://regalwears.com/images/dress-1.jpg"],
  "description": "Elegant burgundy silk maxi dress...",
  "sku": "RWD-001-BUR-M",
  "brand": {
    "@type": "Brand",
    "name": "Regal Wears"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://regalwears.com/product/silk-maxi-dress-burgundy",
    "priceCurrency": "USD",
    "price": "189.00",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "24"
  }
}
```

**Organization Schema (Homepage)**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Regal Wears",
  "url": "https://regalwears.com",
  "logo": "https://regalwears.com/logo.png",
  "sameAs": [
    "https://instagram.com/regalwears",
    "https://facebook.com/regalwears",
    "https://pinterest.com/regalwears"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-800-REGAL",
    "contactType": "Customer Service"
  }
}
```

**BreadcrumbList Schema (All Pages)**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://regalwears.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Dresses",
      "item": "https://regalwears.com/shop/dresses"
    }
  ]
}
```

**Article Schema (Blog Posts)**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "10 Summer Wedding Outfit Ideas for 2026",
  "image": "https://regalwears.com/blog/summer-wedding.jpg",
  "datePublished": "2026-05-15",
  "dateModified": "2026-05-20",
  "author": {
    "@type": "Person",
    "name": "Sarah Mitchell"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Regal Wears",
    "logo": {
      "@type": "ImageObject",
      "url": "https://regalwears.com/logo.png"
    }
  }
}
```

**FAQPage Schema (FAQ Page)**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is your return policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer a 30-day return policy..."
      }
    }
  ]
}
```

---

#### **4. OPEN GRAPH & SOCIAL SHARING**

**Open Graph Tags (All Pages)**
```html
<meta property="og:title" content="Silk Maxi Dress - Burgundy | Regal Wears">
<meta property="og:description" content="Elegant burgundy silk maxi dress...">
<meta property="og:image" content="https://regalwears.com/og-images/product-123.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://regalwears.com/product/silk-maxi-dress-burgundy">
<meta property="og:type" content="product">
<meta property="og:site_name" content="Regal Wears">
<meta property="product:price:amount" content="189.00">
<meta property="product:price:currency" content="USD">
```

**Twitter Cards**
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Silk Maxi Dress - Burgundy | Regal Wears">
<meta name="twitter:description" content="Elegant burgundy silk maxi dress...">
<meta name="twitter:image" content="https://regalwears.com/twitter-images/product-123.jpg">
```

---

#### **5. PERFORMANCE & SPEED**

**Image Optimization**
- Next.js `<Image>` with automatic WebP/AVIF conversion
- Responsive images with `srcset` for all breakpoints
- Blur placeholders for progressive loading
- Cloudinary for dynamic image transformations (resize, crop, quality auto)
- Lazy load below-fold images

**Font Optimization**
- Use `next/font` for Google Fonts (Playfair Display, Inter)
- `font-display: swap` to prevent FOIT
- Subset fonts to only needed characters
- Preload critical fonts

**Code Splitting**
- Dynamic imports for heavy components (chatbot, admin charts)
- Route-based code splitting automatic in Next.js
- Tree-shake unused dependencies

**Caching Strategy**
- Static pages: `Cache-Control: public, max-age=31536000, immutable`
- ISR pages: `stale-while-revalidate=60`
- API routes: Redis caching for product/category data
- CDN: Vercel Edge Network for global distribution

**Compression**
- Brotli and Gzip compression enabled
- Minify HTML, CSS, JavaScript in production

---

#### **6. CONTENT SEO STRATEGY**

**Keyword Research & Targeting**

| Page Type | Primary Keyword | Secondary Keywords |
|-----------|---------------|-------------------|
| Homepage | "ladies fashion online" | "women's clothing store", "buy dresses online" |
| Category: Dresses | "women's dresses" | "evening dresses", "casual dresses", "maxi dresses" |
| Category: Tops | "women's tops" | "blouses", "trendy tops", "designer tops" |
| Product: Silk Dress | "burgundy silk maxi dress" | "elegant evening dress", "silk formal dress" |
| Blog: Wedding | "summer wedding outfit ideas" | "wedding guest dresses", "what to wear to summer wedding" |
| Blog: Trends | "fashion trends 2026" | "spring fashion", "latest women's fashion" |

**Content Clusters**
- **Pillar Page**: "The Complete Guide to Women's Fashion" → links to category pages
- **Cluster Content**: Individual blog posts about styling, trends, occasions
- **Internal Linking**: All cluster content links back to pillar page

**Blog Content Calendar (Seed Posts)**
1. "10 Summer Wedding Outfit Ideas for 2026" → targets wedding guest searches
2. "How to Style a Maxi Dress for Any Occasion" → targets maxi dress styling
3. "The Ultimate Guide to Finding Your Perfect Size" → targets size/fit queries
4. "Spring Fashion Trends Every Woman Should Know" → targets trend searches
5. "5 Ways to Transition Your Wardrobe from Day to Night" → targets versatile fashion

**User-Generated Content**
- Reviews with photos (rich snippet potential)
- Q&A on product pages
- Customer style gallery (hashtag campaigns)

---

#### **7. LOCAL & INTERNATIONAL SEO**

**Hreflang Tags (Multi-Currency/Multi-Region)**
```html
<link rel="alternate" hreflang="en-us" href="https://regalwears.com/product/dress">
<link rel="alternate" hreflang="en-gb" href="https://regalwears.com/gb/product/dress">
<link rel="alternate" hreflang="x-default" href="https://regalwears.com/product/dress">
```

**Local Business Schema (If Physical Presence)**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Regal Wears",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Fashion Ave",
    "addressLocality": "New York",
    "addressRegion": "NY",
    "postalCode": "10001",
    "addressCountry": "US"
  }
}
```

---

#### **8. SECURITY & TRUST SIGNALS**

**HTTPS Everywhere**
- Force HTTPS redirect
- HSTS header
- Secure cookies

**Trust Badges & Signals**
- SSL certificate badge
- Secure payment icons
- Return policy prominently displayed
- Customer reviews visible
- Contact information easy to find

---

#### **9. ANALYTICS & MONITORING**

**Google Search Console Setup**
- Verify property
- Submit sitemap
- Monitor indexing status, Core Web Vitals, mobile usability
- Track search queries, impressions, clicks, average position

**Google Analytics 4**
- E-commerce tracking enabled
- Enhanced measurement: scrolls, outbound clicks, site search
- Custom events: add to cart, begin checkout, purchase
- Conversion tracking for payment completions

**SEO Monitoring Tools**
- Regular Lighthouse audits (target 90+ all categories)
- PageSpeed Insights for field data
- Screaming Frog or Sitebulb for technical audits
- Ahrefs/SEMrush for keyword tracking and backlink analysis

---

#### **10. SEO IMPLEMENTATION CHECKLIST**

**Per-Page Requirements:**
- [ ] Unique, keyword-optimized title tag (≤60 chars)
- [ ] Unique, compelling meta description (150-160 chars)
- [ ] Single H1 tag, keyword-rich
- [ ] Proper header hierarchy (H2, H3)
- [ ] Canonical URL tag
- [ ] Open Graph tags (title, description, image, URL, type)
- [ ] Twitter Card tags
- [ ] JSON-LD structured data (Product, BreadcrumbList, or Article)
- [ ] Descriptive alt text for all images
- [ ] Internal links to related content
- [ ] Breadcrumb navigation visible and schema markup
- [ ] Fast loading (LCP < 2.5s)
- [ ] Mobile-friendly layout
- [ ] Secure HTTPS

**Global Requirements:**
- [ ] Dynamic XML sitemap with all URLs
- [ ] Robots.txt properly configured
- [ ] 404 page with search and popular links
- [ ] Custom 500 error page
- [ ] Redirects for discontinued products (301 to category)
- [ ] Noindex on admin, cart, checkout, account pages
- [ ] Hreflang tags for multi-currency
- [ ] Organization schema on homepage
- [ ] FAQ schema on FAQ page
- [ ] Fast, reliable hosting (Vercel)
- [ ] CDN for static assets
- [ ] Analytics and Search Console configured

---

### **ANIMATION REQUIREMENTS**

Every page and component must include scroll-triggered animations:
- **Hero sections**: Text reveals line-by-line, images scale from 0.95 to 1
- **Product cards**: Fade up + slight Y translate, staggered 0.1s apart
- **Section headers**: Slide in from left or fade up
- **Images**: Lazy load with blur-up placeholder, fade in on enter
- **Buttons**: Subtle scale on hover (1.02), gentle shadow lift
- **Modals/drawers**: Slide in from right or bottom with backdrop fade
- **Page transitions**: Fade between routes
- **Chat widget**: Bounce in on first load, pulse notification dot
- **Cart badge**: Pop animation when item added
- **Price updates**: Subtle count-up animation
- **Stock indicators**: Pulse when low
- **Toast notifications**: Slide in from top-right, Accent left border

**Performance**: Use `will-change` sparingly, prefer `transform` and `opacity`, respect `prefers-reduced-motion`.

---

### **RESPONSIVE DESIGN**

- **Mobile-first** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Mobile**: Single column, hamburger menu, bottom sticky nav, full-screen filters, swipeable carousels
- **Tablet**: 2-column grids, adjusted spacing
- **Desktop**: Full layout, hover states, mega menu for categories, side-by-side checkout

---

### **CONTENT TONE**

- Warm, stylish, confident — like a fashionable best friend
- **Good**: "This dress was made for twirling at summer weddings. The fabric breathes, the fit flatters, and the color? Absolutely dreamy."
- **Bad**: "This product is a dress. It is blue. It is made of cotton. Features include: sleeveless, maxi-length."
- No bullet points with dashes as sentence separators
- Use contractions, conversational flow, occasional enthusiasm

---

### **DEPLOYMENT**

- **Primary**: Vercel (frontend + serverless functions)
- **Database**: Supabase (PostgreSQL)
- **Environment Variables**: All secrets in `.env.local` (never commit)
- **Test Data**: Seed script with 20+ realistic products, 5 blog posts, 1 admin account
- **Demo Credentials**: Include in README

---

### **DELIVERABLES**

1. Fully functional codebase with TypeScript
2. Prisma schema + migration files
3. Seed script for demo data
4. Admin dashboard at `/admin`
5. Stripe + PayPal test mode working
6. Responsive across all devices
7. All scroll animations implemented
8. SEO features active (all structured data, meta tags, sitemap)
9. README with setup instructions, demo login, test card numbers

---

### **CONFIRMATION CHECKPOINTS**

Before proceeding with each major phase, confirm:
1. Database schema design
2. Project structure and dependencies
3. Authentication flow
4. Payment integration approach
5. Admin dashboard layout
6. Animation library choice and patterns
7. Seed data content
8. Deployment configuration
9. SEO implementation details per page type

---