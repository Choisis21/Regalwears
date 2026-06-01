import type { Metadata } from "next";

import { InfoPage, InfoSection } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Size Guide",
  description:
    "Find your perfect fit with the Regal Wears size guide, including measurements and tips for measuring at home.",
};

const sizeRows = [
  { size: "XS", uk: "6", us: "2", bust: "32", waist: "24", hips: "34" },
  { size: "S", uk: "8", us: "4", bust: "34", waist: "26", hips: "36" },
  { size: "M", uk: "10", us: "6", bust: "36", waist: "28", hips: "38" },
  { size: "L", uk: "12", us: "8", bust: "38", waist: "30", hips: "40" },
  { size: "XL", uk: "14", us: "10", bust: "40", waist: "32", hips: "42" },
];

export default function SizeGuidePage() {
  return (
    <InfoPage
      title="Size Guide"
      intro="A little measuring goes a long way. Use the chart below to find the size that'll feel made for you."
    >
      <InfoSection heading="Size chart">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-foreground">
                <th className="py-3 pr-4 font-medium">Size</th>
                <th className="py-3 pr-4 font-medium">UK</th>
                <th className="py-3 pr-4 font-medium">US</th>
                <th className="py-3 pr-4 font-medium">Bust (in)</th>
                <th className="py-3 pr-4 font-medium">Waist (in)</th>
                <th className="py-3 font-medium">Hips (in)</th>
              </tr>
            </thead>
            <tbody className="text-foreground/80">
              {sizeRows.map((row) => (
                <tr key={row.size} className="border-b border-border/70">
                  <td className="py-3 pr-4 font-medium text-burgundy">
                    {row.size}
                  </td>
                  <td className="py-3 pr-4">{row.uk}</td>
                  <td className="py-3 pr-4">{row.us}</td>
                  <td className="py-3 pr-4">{row.bust}</td>
                  <td className="py-3 pr-4">{row.waist}</td>
                  <td className="py-3">{row.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InfoSection>

      <InfoSection heading="How to measure">
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <span className="font-medium text-foreground">Bust:</span> measure
            around the fullest part of your bust, keeping the tape level.
          </li>
          <li>
            <span className="font-medium text-foreground">Waist:</span> measure
            around the narrowest part of your natural waistline.
          </li>
          <li>
            <span className="font-medium text-foreground">Hips:</span> measure
            around the fullest part of your hips, about 8 inches below your
            waist.
          </li>
        </ul>
      </InfoSection>

      <InfoSection heading="Between sizes?">
        <p>
          If you're between two sizes, we'd usually suggest sizing up for a
          relaxed fit, or staying true to size for something more fitted. Each
          product page also notes if a piece runs small or large.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
