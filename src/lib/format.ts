import { currencies, type Currency } from "@/lib/placeholder-data";

/**
 * Formats a price for display. During the placeholder phase prices are plain
 * dollar numbers; once the catalog lands they'll be integer cents and this is
 * where the cents -> currency conversion will live.
 */
export function formatPrice(
  amount: number,
  currencyCode = "USD",
): string {
  const currency: Currency =
    currencies.find((c) => c.code === currencyCode) ?? currencies[0];
  return `${currency.symbol}${amount.toFixed(2).replace(/\.00$/, "")}`;
}
