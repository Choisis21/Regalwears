import { promises as fs } from "fs";
import path from "path";

/**
 * File-backed site settings (data/settings.json) — global SEO defaults the
 * admin can edit. SERVER ONLY.
 */

export type SiteSettings = {
  siteTitle: string;
  titleTemplate: string;
  description: string;
  ogImage: string;
  domain: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  siteTitle: "Regal Wears | Luxury Ladies' Fashion & Timeless Elegance",
  titleTemplate: "%s | Regal Wears",
  description:
    "Discover beautifully made ladies' wear at Regal Wears. Elegant dresses, tops, and timeless pieces, styled for every occasion.",
  ogImage: "",
  domain: "regalwears.com",
};

const FILE = path.join(process.cwd(), "data", "settings.json");

export async function getSettings(): Promise<SiteSettings> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteSettings>;
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function updateSettings(
  next: SiteSettings,
): Promise<SiteSettings> {
  const merged = { ...DEFAULT_SETTINGS, ...next };
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(merged, null, 2), "utf8");
  return merged;
}
