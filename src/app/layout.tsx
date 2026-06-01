import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/components/cart/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { WishlistProvider } from "@/components/wishlist/wishlist-context";
import { CurrencyProvider } from "@/components/currency/currency-context";
import { getSettings } from "@/lib/settings-store";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    metadataBase: new URL(`https://${s.domain}`),
    title: {
      default: s.siteTitle,
      template: s.titleTemplate,
    },
    description: s.description,
    icons: { icon: [{ url: "/regal-white.webp", type: "image/webp" }] },
    openGraph: {
      title: s.siteTitle,
      description: s.description,
      siteName: "Regal Wears",
      images: s.ogImage ? [{ url: s.ogImage }] : undefined,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider>
          <CurrencyProvider>
            <WishlistProvider>
              <CartProvider>
                {children}
                <CartDrawer />
              </CartProvider>
            </WishlistProvider>
          </CurrencyProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
