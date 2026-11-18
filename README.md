# Fitora AI

AI virtual try-on app. Upload a person photo and a clothes photo, and the AI shows the person wearing the clothes.

**Stack:** Next.js 16 · Prisma + PostgreSQL · NextAuth (Google) · Stripe · Tailwind CSS 3 · MuAPI

## Features

- **Studio (`/`)** — upload two photos, pick an aspect ratio, edit the prompt. Each try-on costs 18 credits.
- **Gallery (`/gallery`)** — view, download, and delete past results. Updates automatically while a result is processing.
- **Pricing (`/pricing`)** — buy credit packs with Stripe (one-time payment): $5 = 1,000 · $10 = 2,000 · $20 = 4,000 · $50 = 10,000 credits.
- **Login** — Google, or your own MuAPI API key.

## Setup

```bash
npm install
cp .env.example .env    # test values in .env.example
npx prisma db push      # once per new database
npm run dev             # http://localhost:3000
```

## Environment variables

| Variable | Where to get it |
| :--- | :--- |
| `DATABASE_URL`, `DIRECT_URL` | PostgreSQL connection string (e.g. [Neon](https://neon.tech)). Both can be the same. |
| `NEXTAUTH_URL` | Your site address, e.g. `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Run `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | [Google Cloud Console](https://console.cloud.google.com/apis/credentials). Redirect URI: `<NEXTAUTH_URL>/api/auth/callback/google` |
| `MUAPIAPP_API_KEY` | [muapi.ai/access-keys](https://muapi.ai/access-keys) (needs credit). Leave empty for mock mode. |
| `WEBHOOK_URL` | Optional locally. Set to your public site address in production. |
| `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | [Stripe API keys](https://dashboard.stripe.com/apikeys) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook to `/api/webhook/stripe`, event `checkout.session.completed` |

## Known issues

The app works end to end, but the payment and AI parts are not production-safe yet. Please fix these before taking real payments:

- **Payments:** a repeated Stripe event can add credits twice.
- **Credits:** two fast requests can spend the same credits, so a balance can go negative.
- **Failures:** if the AI job fails, the user is not refunded and the try-on stays "processing".
- **Timeouts:** the try-on request waits about 15 seconds, which can be cut off on hosts like Vercel.
- **Free credits:** new users get 10 credits, but a try-on costs 18.
- **Input checks:** the server does not validate image links, file size, or prompts.
- **Webhooks:** the MuAPI webhook has no verification.
- **API-key login:** it accepts any key without checking it.
