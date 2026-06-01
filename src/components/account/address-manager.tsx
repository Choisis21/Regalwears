"use client";

import { useState, useTransition } from "react";
import { Check, Loader2, MapPin, Pencil, Plus, Trash2, X } from "lucide-react";

import {
  deleteAddress,
  saveAddress,
  setDefaultAddress,
} from "@/app/(storefront)/account/addresses/actions";

export type AddressRecord = {
  id: string;
  fullName: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string | null;
  postalCode: string;
  country: string;
  phone: string | null;
  isDefault: boolean;
};

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Ireland",
  "Nigeria",
  "Australia",
];

const inputClass =
  "h-12 w-full rounded-lg border border-border bg-card px-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-burgundy focus:ring-2 focus:ring-burgundy/30 focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

type FormState = {
  fullName: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
};

const emptyForm: FormState = {
  fullName: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: COUNTRIES[0],
  phone: "",
  isDefault: false,
};

export function AddressManager({
  addresses,
}: {
  addresses: AddressRecord[];
}) {
  // null = no form open, "new" = adding, otherwise the id being edited.
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<string | null>(null);

  const openAdd = () => {
    setForm(emptyForm);
    setError("");
    setEditing("new");
  };

  const openEdit = (a: AddressRecord) => {
    setForm({
      fullName: a.fullName,
      line1: a.line1,
      line2: a.line2 ?? "",
      city: a.city,
      state: a.state ?? "",
      postalCode: a.postalCode,
      country: a.country,
      phone: a.phone ?? "",
      isDefault: a.isDefault,
    });
    setError("");
    setEditing(a.id);
  };

  const closeForm = () => {
    setEditing(null);
    setError("");
  };

  const set = (key: keyof FormState, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const res = await saveAddress({
        id: editing && editing !== "new" ? editing : undefined,
        ...form,
      });
      if (res.ok) {
        closeForm();
      } else {
        setError(res.error || "Something went wrong.");
      }
    });
  };

  const onDelete = (id: string) => {
    setBusyId(id);
    startTransition(async () => {
      await deleteAddress(id);
      setBusyId(null);
    });
  };

  const onSetDefault = (id: string) => {
    setBusyId(id);
    startTransition(async () => {
      await setDefaultAddress(id);
      setBusyId(null);
    });
  };

  const showDefaultToggle = editing === "new" ? addresses.length > 0 : true;

  return (
    <div className="space-y-6">
      {/* Address list */}
      {addresses.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {addresses.map((a) => (
            <div
              key={a.id}
              className="relative flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              {a.isDefault && (
                <span className="absolute top-5 right-5 rounded-full bg-rosegold/20 px-2.5 py-1 text-xs font-medium text-burgundy">
                  Default
                </span>
              )}
              <div className="flex items-center gap-2 text-burgundy">
                <MapPin className="size-4" />
                <span className="font-medium text-foreground">{a.fullName}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {a.line1}
                {a.line2 ? <>, {a.line2}</> : null}
                <br />
                {[a.city, a.state, a.postalCode].filter(Boolean).join(", ")}
                <br />
                {a.country}
                {a.phone ? (
                  <>
                    <br />
                    {a.phone}
                  </>
                ) : null}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4 text-sm">
                {!a.isDefault && (
                  <button
                    type="button"
                    onClick={() => onSetDefault(a.id)}
                    disabled={pending}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-foreground transition-colors hover:border-burgundy/50 hover:text-burgundy disabled:opacity-50"
                  >
                    {busyId === a.id && pending ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Check className="size-3.5" />
                    )}
                    Set as default
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => openEdit(a)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-foreground transition-colors hover:border-burgundy/50 hover:text-burgundy"
                >
                  <Pencil className="size-3.5" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(a.id)}
                  disabled={pending}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive disabled:opacity-50"
                >
                  <Trash2 className="size-3.5" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / edit form */}
      {editing !== null ? (
        <form
          onSubmit={submit}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl text-foreground">
              {editing === "new" ? "Add a new address" : "Edit address"}
            </h2>
            <button
              type="button"
              onClick={closeForm}
              aria-label="Cancel"
              className="text-muted-foreground transition-colors hover:text-burgundy"
            >
              <X className="size-5" />
            </button>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="fullName" className={labelClass}>
                Full name
              </label>
              <input
                id="fullName"
                value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                required
                className={inputClass}
                placeholder="Recipient name"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="line1" className={labelClass}>
                Address
              </label>
              <input
                id="line1"
                value={form.line1}
                onChange={(e) => set("line1", e.target.value)}
                required
                className={inputClass}
                placeholder="Street address"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="line2" className={labelClass}>
                Apartment, suite, etc.{" "}
                <span className="text-muted-foreground">(optional)</span>
              </label>
              <input
                id="line2"
                value={form.line2}
                onChange={(e) => set("line2", e.target.value)}
                className={inputClass}
                placeholder="Apartment, suite, unit"
              />
            </div>
            <div>
              <label htmlFor="city" className={labelClass}>
                City
              </label>
              <input
                id="city"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                required
                className={inputClass}
                placeholder="City"
              />
            </div>
            <div>
              <label htmlFor="state" className={labelClass}>
                State / Region{" "}
                <span className="text-muted-foreground">(optional)</span>
              </label>
              <input
                id="state"
                value={form.state}
                onChange={(e) => set("state", e.target.value)}
                className={inputClass}
                placeholder="State or region"
              />
            </div>
            <div>
              <label htmlFor="postalCode" className={labelClass}>
                Postal code
              </label>
              <input
                id="postalCode"
                value={form.postalCode}
                onChange={(e) => set("postalCode", e.target.value)}
                required
                className={inputClass}
                placeholder="Postal code"
              />
            </div>
            <div>
              <label htmlFor="country" className={labelClass}>
                Country
              </label>
              <select
                id="country"
                value={form.country}
                onChange={(e) => set("country", e.target.value)}
                className={inputClass}
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="phone" className={labelClass}>
                Phone <span className="text-muted-foreground">(optional)</span>
              </label>
              <input
                id="phone"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={inputClass}
                placeholder="Contact number for delivery"
              />
            </div>
          </div>

          {showDefaultToggle && (
            <label className="mt-4 flex cursor-pointer items-center gap-2.5 text-sm text-foreground">
              <input
                type="checkbox"
                checked={form.isDefault}
                onChange={(e) => set("isDefault", e.target.checked)}
                className="size-4 accent-burgundy"
              />
              Set as my default address
            </label>
          )}

          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-burgundy px-7 text-sm font-semibold text-cream transition-colors hover:bg-burgundy/90 disabled:opacity-70"
            >
              {pending && <Loader2 className="size-4 animate-spin" />}
              {editing === "new" ? "Save address" : "Save changes"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-burgundy"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-full border border-burgundy px-6 py-3 text-sm font-semibold text-burgundy transition-colors hover:bg-burgundy hover:text-cream"
        >
          <Plus className="size-4" />
          Add a new address
        </button>
      )}
    </div>
  );
}
