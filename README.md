# VKC Systems Website

Corporate website for **VKC Systems, Inc.** — an MBE/DBE certified systems integrator specializing in networking, CCTV, access control, and communication solutions for mass transit and commercial clients in the NYC metro area.

**Live site:** [https://vkcsystems.com](https://vkcsystems.com)

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Astro](https://astro.build) | 5.17.x | Static site generator |
| [Tailwind CSS](https://tailwindcss.com) | 4.2.x | Utility-first CSS framework |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | 3.7.x | Auto-generated XML sitemap |
| [Formspree](https://formspree.io) | — | Contact form submissions (no backend) |
| [Google Fonts](https://fonts.google.com/specimen/Inter) | — | Inter typeface (400–800 weights) |

No JavaScript frameworks (React, Vue, etc.) are used. The site compiles to **100% static HTML + CSS** with zero client-side JS except for the mobile menu toggle and header scroll shadow.

---

## Project Structure

```
vkcsystems-site/
├── public/                         # Static assets (copied as-is to build)
│   ├── favicon.ico                 # Fallback favicon
│   ├── favicon.svg                 # VKC-branded SVG favicon
│   └── robots.txt                  # Search engine crawl rules
├── src/
│   ├── components/
│   │   ├── Header.astro            # Fixed header with mobile hamburger menu
│   │   └── Footer.astro            # Red footer with hours, address, contact, socials
│   ├── layouts/
│   │   └── BaseLayout.astro        # Base HTML layout (SEO, meta tags, JSON-LD, fonts)
│   ├── pages/
│   │   ├── index.astro             # Home page
│   │   ├── about.astro             # About page (company story, MBE/DBE info)
│   │   ├── contact.astro           # Contact page (form, map, info cards)
│   │   ├── projects.astro          # Projects page (current + previous projects)
│   │   ├── solutions.astro         # Solutions overview (8 service cards)
│   │   └── solutions/              # Individual service pages
│   │       ├── networking.astro
│   │       ├── cctv.astro
│   │       ├── public-address.astro
│   │       ├── access-control.astro
│   │       ├── communication-cabinets.astro
│   │       ├── cadd.astro
│   │       ├── voip.astro
│   │       └── office-it.astro
│   └── styles/
│       └── global.css              # Tailwind CSS imports + brand theme tokens
├── astro.config.mjs                # Astro configuration (site URL, Tailwind, sitemap)
├── netlify.toml                    # Netlify deployment configuration
├── package.json                    # Dependencies and scripts
└── tsconfig.json                   # TypeScript configuration
```

---

## Pages & Routes

| Route | File | Description |
|-------|------|-------------|
| `/` | `index.astro` | Home — hero, services grid, about preview, CTA |
| `/about` | `about.astro` | Company story, MBE/DBE info, services overview |
| `/solutions` | `solutions.astro` | All 8 service categories with descriptions |
| `/solutions/networking` | `solutions/networking.astro` | Networking capabilities detail |
| `/solutions/cctv` | `solutions/cctv.astro` | CCTV solutions detail |
| `/solutions/public-address` | `solutions/public-address.astro` | Public address systems detail |
| `/solutions/access-control` | `solutions/access-control.astro` | Access control solutions detail |
| `/solutions/communication-cabinets` | `solutions/communication-cabinets.astro` | Custom cabinet fabrication detail |
| `/solutions/cadd` | `solutions/cadd.astro` | CADD/AutoCAD services detail |
| `/solutions/voip` | `solutions/voip.astro` | VoIP solutions detail |
| `/solutions/office-it` | `solutions/office-it.astro` | Managed IT services detail |
| `/projects` | `projects.astro` | Current (6) and previous (12) projects |
| `/contact` | `contact.astro` | Contact form, Google Maps embed, info cards |

---

## Brand Theme

Custom brand colors and fonts are defined in `src/styles/global.css` using Tailwind CSS v4's `@theme` directive:

```css
@theme {
  --color-vkc-red: #dd3333;        /* Primary brand red */
  --color-vkc-red-dark: #b82828;   /* Hover/dark variant */
  --color-vkc-dark: #0a0a0a;       /* Near-black for headers/backgrounds */
  --color-vkc-gray: #566678;       /* Body text gray */
  --color-vkc-light: #f5f5f5;      /* Light section backgrounds */
  --font-family-sans: 'Inter', system-ui, -apple-system, sans-serif;
}
```

Use these as Tailwind utilities: `text-vkc-red`, `bg-vkc-dark`, `text-vkc-gray`, `bg-vkc-light`, etc.

---

## Components

### BaseLayout (`src/layouts/BaseLayout.astro`)

Wraps every page. Accepts these props:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Page `<title>` and OG title |
| `description` | `string` | Yes | Meta description and OG description |
| `canonical` | `string` | No | Override canonical URL (defaults to current page URL) |

Includes:
- SEO meta tags (title, description, canonical)
- Open Graph and Twitter Card meta tags
- Google Fonts preconnect + stylesheet
- LocalBusiness JSON-LD structured data (address, phone, hours, socials)
- Header and Footer components wrapping a `<slot />`

### Header (`src/components/Header.astro`)

- Fixed position, white background
- Shadow appears on scroll (via inline `<script>`)
- Desktop nav: Home, About, Solutions, Projects, Contact + red "Get a Quote" CTA
- Mobile: Hamburger icon triggers slide-out panel with backdrop overlay
- Active page detection using `Astro.url.pathname`

### Footer (`src/components/Footer.astro`)

- Red (`#dd3333`) background with white text
- Three columns: Hours, Address (Google Maps link), Contact (phone + email)
- Social icons: Facebook, Instagram
- Copyright bar at bottom with dynamic year

---

## SEO Features

- Unique `<title>` and `<meta name="description">` on every page
- Canonical URLs on every page
- Open Graph meta tags (type, url, title, description, image)
- Twitter Card meta tags
- LocalBusiness JSON-LD schema (name, address, phone, email, hours, social links)
- Auto-generated `sitemap-index.xml` via `@astrojs/sitemap`
- `robots.txt` allowing all crawlers with sitemap reference
- Semantic HTML (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`)

---

## Commands

All commands are run from the project root (`vkcsystems-site/`):

```sh
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:4321
npm run build        # Build production site to ./dist/
npm run preview      # Preview production build locally
```

---

## Deployment

### Netlify (Recommended)

The project includes a `netlify.toml` configuration:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

**Steps:**
1. Push this repo to GitHub
2. Connect the repo to [Netlify](https://app.netlify.com)
3. Netlify auto-detects the config and deploys
4. Point your GoDaddy domain (`vkcsystems.com`) to Netlify's nameservers

### Vercel (Alternative)

Vercel auto-detects Astro projects. Just connect the GitHub repo — no config file needed.

---

## Contact Form Setup

The contact form on `/contact` posts to Formspree. To activate it:

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy the form ID (e.g., `xrgvkzop`)
3. In `src/pages/contact.astro`, replace the placeholder action URL:

```diff
- action="https://formspree.io/f/placeholder"
+ action="https://formspree.io/f/xrgvkzop"
```

---

## Business Information

These details appear across the site (header, footer, contact page, JSON-LD):

| Field | Value |
|-------|-------|
| Company | VKC Systems, Inc. |
| Certifications | MBE/DBE |
| Address | 89 Leuning St Suite 1E, South Hackensack, NJ 07606 |
| Phone | (201) 374-0252 |
| Email | info@vkcsystems.com |
| Hours | Monday–Friday, 7:00 AM – 3:00 PM |
| Facebook | https://www.facebook.com/VKCSYSTEMS/ |
| Instagram | https://www.instagram.com/vkcsystems/ |
| Google Maps | https://maps.app.goo.gl/1QhGiqvSpyeyxvTH9 |

To update business info, edit these files:
- **Address/phone/email/hours:** `Footer.astro`, `contact.astro`, `BaseLayout.astro` (JSON-LD)
- **Social links:** `Footer.astro`, `BaseLayout.astro` (JSON-LD `sameAs`)
- **Company description:** `about.astro`, `index.astro`

---

## Known TODOs

- [ ] Replace Formspree placeholder URL with real form ID
- [ ] Add real project photos to replace image placeholders on `/projects`
- [ ] Add a real `og-image.jpg` to `/public/` for social media sharing
- [ ] Update copyright year in Footer (currently uses dynamic `new Date().getFullYear()`)
- [ ] Consider adding a 404 page (`src/pages/404.astro`)
- [ ] Set up Decap CMS for browser-based content editing (optional)
