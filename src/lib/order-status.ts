// Client-safe order status constants (no fs), shared by the store and the UI.
export type OrderStatus = "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export const ORDER_STATUSES: OrderStatus[] = [
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];
