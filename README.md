# 🐟 Jue Fish AI — Stain Removal Assistant

A production-ready AI-powered stain removal tool built with Next.js 14, TypeScript, Tailwind CSS, and Claude (Anthropic).

---

## 📁 Project Structure

```
jue-fish-ai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analyze/
│   │   │       └── route.ts          # Backend API — calls Claude
│   │   ├── ask/
│   │   │   └── page.tsx              # Main tool page (/ask)
│   │   ├── globals.css               # Global styles + design tokens
│   │   ├── layout.tsx                # Root layout with fonts + metadata
│   │   └── page.tsx                  # Root redirect → /ask
│   ├── components/
│   │   ├── ImageUploader.tsx         # Drag-and-drop image upload
│   │   ├── LoadingState.tsx          # Skeleton loading UI
│   │   ├── ResultCard.tsx            # AI result display card
│   │   └── StainForm.tsx             # Main interactive form
│   ├── lib/
│   │   └── claude.ts                 # Anthropic SDK + system prompt
│   └── types/
│       └── index.ts                  # Shared TypeScript types
├── public/                           # Static assets (add logo here)
├── .env.example                      # Environment variable template
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## ⚙️ Installation & Local Setup

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, or pnpm
- An Anthropic API key → https://console.anthropic.com

### Step 1 — Clone or copy the project

```bash
# If you have the files, just navigate to the folder
cd jue-fish-ai
```

### Step 2 — Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Step 3 — Create your environment file

```bash
cp .env.example .env.local
```

Then open `.env.local` and fill in your values:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
NEXT_PUBLIC_SHOP_URL=https://your-store.com/products/stain-remover
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Step 4 — Run the development server

```bash
npm run dev
```

Open http://localhost:3000 — you'll be redirected to `/ask`.

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | ✅ Yes | Your Anthropic API key. Never expose this client-side. |
| `NEXT_PUBLIC_SHOP_URL` | ✅ Yes | Your product page URL shown in CTAs. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Your domain, used for SEO metadata. |

**Security note:** `ANTHROPIC_API_KEY` is server-side only (no `NEXT_PUBLIC_` prefix). It is never sent to the browser.

---

## 🚀 Deployment

### Option A — Vercel (Recommended, easiest)

1. Push your code to GitHub (make sure `.env.local` is in `.gitignore` ✅)
2. Go to https://vercel.com → New Project → Import your repo
3. In Project Settings → Environment Variables, add:
   - `ANTHROPIC_API_KEY`
   - `NEXT_PUBLIC_SHOP_URL`
   - `NEXT_PUBLIC_SITE_URL`
4. Click Deploy. Done.

Vercel automatically handles Next.js API routes as serverless functions.

### Option B — Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build: `npm run build`
3. `netlify deploy --prod`
4. Set environment variables in Netlify dashboard → Site settings → Environment variables

### Option C — Self-hosted (VPS / Docker)

```bash
npm run build
npm run start   # Runs on port 3000
```

Use nginx as a reverse proxy to serve on port 80/443 with SSL.

---

## 🛒 How to Connect This to Your Store

The shop link appears in two places:
1. The **"Shop Jue Fish" button** inside the result card
2. The **"Shop Now" button** in the nav and footer

Both read from one environment variable:

```env
NEXT_PUBLIC_SHOP_URL=https://your-store.com/products/stain-remover
```

**On Shopify:** Go to your product page → copy the URL from the browser → paste it as `NEXT_PUBLIC_SHOP_URL`.

**On WooCommerce:** Same — copy your product URL and paste it.

**On a custom store:** Use any URL you want.

---

## 🔗 How to Replace the Placeholder "Shop Now" Link

1. Open `.env.local`
2. Change this line:
   ```env
   NEXT_PUBLIC_SHOP_URL=https://your-store.com/products/stain-remover
   ```
   to your real product URL, for example:
   ```env
   NEXT_PUBLIC_SHOP_URL=https://juefish.com/products/stain-remover
   ```
3. Restart your dev server (`npm run dev`) or redeploy.

That's it — all CTAs update automatically.

---

## ✅ Pre-Launch Checklist

- [ ] `ANTHROPIC_API_KEY` set in production environment
- [ ] `NEXT_PUBLIC_SHOP_URL` points to your real product page
- [ ] Test the full flow: upload a photo, fill in fields, get result
- [ ] Test on mobile (the layout is mobile-first)
- [ ] Test error states: try submitting without an image
- [ ] Try an oversized image (>8MB) — should show friendly error
- [ ] Verify the "Shop Jue Fish" CTA button links to the right page
- [ ] Add your logo to `/public/` and reference it in `layout.tsx` or the nav
- [ ] Update the footer copyright if needed
- [ ] Set up a custom domain in Vercel / Netlify
- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Consider adding Google Analytics or PostHog for conversion tracking
- [ ] Review Anthropic API usage limits at https://console.anthropic.com

---

## 🔒 Security Notes

- The Anthropic API key **never leaves the server**. It's only used in `/api/analyze/route.ts`.
- Input validation runs on both client (for UX) and server (for security).
- File size is checked server-side using the base64 byte estimate.
- A basic in-memory rate limiter (10 req/min per IP) is included. For production scale, replace with [Upstash Redis](https://upstash.com) + `@upstash/ratelimit`.
- User-uploaded images are processed in memory and never written to disk or stored.
- Claude's response is validated for required fields before being sent to the client.

---

## 💡 Future Improvement Ideas

| Feature | Effort | Impact |
|---|---|---|
| **Stain history** — save past analyses to localStorage or a DB | Medium | High |
| **Before/after photo flow** — let users upload a photo after cleaning | Low | High |
| **Lead capture** — add an email field before showing results | Low | High |
| **Analytics dashboard** — track which stains are most common | Medium | Medium |
| **Shopify integration** — auto-add product to cart from the result | Medium | High |
| **Multilingual support** — detect browser language and respond in it | Medium | Medium |
| **Recommended products** — show related products (stain-specific) | Low | High |
| **Shareable results** — generate a shareable URL for each result | Medium | Medium |
| **Push notifications** — remind users to re-treat after 30 minutes | High | Low |
| **Auth + user accounts** — save stain history per user | High | Medium |
| **Webhook to CRM** — send lead data to Klaviyo / HubSpot | Medium | High |
| **A/B test CTAs** — test different CTA copy for conversions | Low | High |
| **Video instructions** — embed short video per stain type | Low | Medium |

---

## 🧪 API Reference

### `POST /api/analyze`

Analyzes a stain image and returns structured removal instructions.

**Request body (JSON):**
```json
{
  "imageBase64": "string (base64 encoded image)",
  "imageMimeType": "image/jpeg | image/png | image/webp",
  "description": "string (optional, max 1000 chars)",
  "material": "string (e.g. Cotton, Silk, Carpet)",
  "stainAge": "string (e.g. Fresh, 1 day old)"
}
```

**Success response:**
```json
{
  "success": true,
  "data": {
    "stain_guess": "Red wine",
    "confidence": "high",
    "can_jue_fish_help": true,
    "reasoning_summary": "The deep red colour and fabric type suggest red wine...",
    "steps": [
      "Blot — do not rub — to absorb excess liquid",
      "Apply Jue Fish Stain Remover directly to the stain",
      "Leave for 5–10 minutes",
      "Wash on a cool cycle (30°C or lower)",
      "Check before tumble drying — repeat if needed"
    ],
    "warnings": ["Do not use hot water — it sets protein stains"],
    "extra_tip": "Salt can help absorb a fresh wine spill before you apply the remover.",
    "cta": "Jue Fish Stain Remover is well-suited to this type of stain — grab a bottle to keep on hand."
  }
}
```

**Error response:**
```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

**Rate limit:** 10 requests per minute per IP (in-memory, resets on server restart).

---

## 🎨 Design Notes

- **Fonts:** Playfair Display (display/headings) + DM Sans (body)
- **Palette:** Cream background (`#f7f4ee`), forest ink (`#0f1a12`), brand green (`#16a34a`)
- **Theme:** Organic, trustworthy, premium-minimal — matches a quality cleaning brand
- **Mobile-first:** All components are responsive. Form stacks on mobile, side-by-side on desktop.
- **Animations:** Subtle fade-up on load, shimmer skeleton during loading, staggered step reveals

---

## 📝 Customisation Guide

### Change the brand name
Search and replace `Jue Fish` throughout the codebase. Key files:
- `src/app/layout.tsx` — site title/metadata
- `src/app/ask/page.tsx` — page heading and nav
- `src/lib/claude.ts` — system prompt (keep brand name accurate here)

### Change the colour scheme
Edit `tailwind.config.ts` and `src/app/globals.css`. All brand colours flow from CSS variables defined in `:root`.

### Change the Claude model
In `src/lib/claude.ts`, update the `model` field:
```ts
model: "claude-opus-4-5",  // Change to claude-sonnet-4-5 to reduce cost
```

### Add more material or stain age options
In `src/types/index.ts`, add to the `MATERIALS` or `STAIN_AGES` arrays. They automatically populate the dropdowns.
