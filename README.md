# Regal Wears

A modern, production-ready fashion e-commerce demo for a ladies' wear brand. Built to feel alive and human, with a light editorial look, scroll animations throughout, and end-to-end shopping flows running in test mode.

## Tech stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 (`@theme`) + shadcn/ui
- **Database:** PostgreSQL (Supabase) via Prisma
- **Auth:** NextAuth / Auth.js (credentials + Google, database sessions)
- **Payments:** Stripe + PayPal (test mode)
- **Media:** Cloudinary · **Search:** Algolia · **Email:** Resend
- **Motion:** Framer Motion · **Icons:** Lucide

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
#    Fill in the values in .env (see "Environment" below)

# 3. Apply the database schema
npx prisma migrate dev

# 4. Run the dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Environment

All secrets live in a single `.env` file (gitignored). The keys it expects:

- `DATABASE_URL` / `DIRECT_URL` — Supabase Postgres (pooled + direct)
- `NEXTAUTH_URL` / `NEXTAUTH_SECRET` / `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `STRIPE_WEBHOOK_SECRET`
- `PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET` / `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
- `CLOUDINARY_*` · `NEXT_PUBLIC_ALGOLIA_*` / `ALGOLIA_ADMIN_KEY` · `RESEND_API_KEY`

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # lint
```

## Notes

- The storefront currently renders **placeholder content** (`src/lib/placeholder-data.ts`) with verified Unsplash photography. These swap to real database records and Cloudinary images during the catalog and seed phases.
- The full product specification lives in `Build Prompt.md`.
