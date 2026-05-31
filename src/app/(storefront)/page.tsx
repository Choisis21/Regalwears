import { Hero } from "@/components/home/hero";
import { CategoryGrid } from "@/components/home/category-grid";
import { TrendingRail } from "@/components/home/trending-rail";
import { NewArrivals } from "@/components/home/new-arrivals";
import { StyleStories } from "@/components/home/style-stories";
import { NewsletterBanner } from "@/components/home/newsletter-banner";
import { TrustBadges } from "@/components/home/trust-badges";
import { InstagramGallery } from "@/components/home/instagram-gallery";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <TrendingRail />
      <NewArrivals />
      <TrustBadges />
      <StyleStories />
      <NewsletterBanner />
      <InstagramGallery />
    </>
  );
}
