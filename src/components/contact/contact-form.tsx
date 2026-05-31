"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";

const inputClass =
  "h-12 w-full rounded-xl border border-input bg-card px-4 text-base text-foreground placeholder:text-muted-foreground focus:border-burgundy focus:ring-2 focus:ring-rosegold/30 focus:outline-none";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-rosegold/15 text-rosegold">
          <Check className="size-7" />
        </div>
        <h3 className="mt-5 font-heading text-2xl text-foreground">
          Message on its way
        </h3>
        <p className="mt-3 max-w-sm text-muted-foreground">
          Thank you for reaching out. Our team will get back to you within two
          hours during business hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm({ name: "", email: "", subject: "", message: "" });
            setSent(false);
          }}
          className="mt-6 text-sm font-medium text-burgundy underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            Your name
          </label>
          <input id="name" required value={form.name} onChange={set("name")} className={inputClass} placeholder="Jane Doe" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </label>
          <input id="email" type="email" required value={form.email} onChange={set("email")} className={inputClass} placeholder="example@gmail.com" />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-foreground">
          Subject
        </label>
        <input id="subject" required value={form.subject} onChange={set("subject")} className={inputClass} placeholder="How can we help?" />
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={set("message")}
          placeholder="Tell us a little more..."
          className="w-full rounded-xl border border-input bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-burgundy focus:ring-2 focus:ring-rosegold/30 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-burgundy text-sm font-semibold text-cream transition-colors hover:bg-burgundy/90 sm:w-auto sm:px-8"
      >
        Send message <Send className="size-4" />
      </button>
    </form>
  );
}
