"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { currencies, type Currency } from "@/lib/placeholder-data";

const STORAGE_KEY = "regal-currency";

/** Converts a USD base amount into the given currency and formats it. */
function formatMoney(amountUsd: number, currency: Currency): string {
  const value = amountUsd * currency.rate;
  if (currency.rate >= 100) {
    // Large-denomination currencies (e.g. NGN): whole numbers with separators.
    return `${currency.symbol}${Math.round(value).toLocaleString("en-US")}`;
  }
  const s = value.toFixed(2).replace(/\.00$/, "");
  return `${currency.symbol}${s}`;
}

type CurrencyContextValue = {
  currency: Currency;
  currencies: Currency[];
  setCurrency: (c: Currency) => void;
  format: (amountUsd: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(currencies[0]);

  // Restore the saved currency on first mount.
  useEffect(() => {
    try {
      const code = window.localStorage.getItem(STORAGE_KEY);
      const found = currencies.find((c) => c.code === code);
      if (found) setCurrencyState(found);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo<CurrencyContextValue>(() => {
    const setCurrency = (c: Currency) => {
      setCurrencyState(c);
      try {
        window.localStorage.setItem(STORAGE_KEY, c.code);
      } catch {
        // ignore
      }
    };
    return {
      currency,
      currencies,
      setCurrency,
      format: (amountUsd) => formatMoney(amountUsd, currency),
    };
  }, [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within a CurrencyProvider");
  return ctx;
}

/** Renders a USD base amount in the active currency. Safe in server trees. */
export function Price({ amount }: { amount: number }) {
  const { format } = useCurrency();
  return <>{format(amount)}</>;
}
