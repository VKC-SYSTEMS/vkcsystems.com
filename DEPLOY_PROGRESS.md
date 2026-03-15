# VKC Systems — Vercel Migration Progress

## Phase 1: Clone & Local Setup
- [x] Clone repo
- [x] npm install
- [x] npm run build — 13 pages + sitemap
- [x] Dev server verified (all pages at localhost:4321)
- [x] Preview build verified

## Phase 2: Vercel CLI Setup & First Deploy
- [x] Install Vercel CLI (`npm install -g vercel`)
- [x] Authenticate (`vercel login`) — logged in as `vcepeda-2183`
- [x] Link project (`vercel link`) — linked to `vkc-systems-site/vkc-website`
- [x] Create `vercel.json` with security headers
- [x] Preview deploy (`vercel deploy`)
- [x] Production deploy (`vercel deploy --prod`) — 3 production deploys completed

## Phase 3: GitHub Integration & Domain
- [x] Connect repo in Vercel dashboard (Settings > Git)
- [x] Set production branch: `main`, enable preview deploys
- [x] Remove `netlify.toml`
- [x] Configure custom domain `vkcsystems.com` + `www` — both serving via Vercel
- [x] Update DNS: CNAME `www` → `vercel-dns-016.com`, Cloudflare nameservers active
- [x] Verify auto-deploy — production deploys triggered from `main`

## Phase 4: Tests
- [x] Build smoke test script created (`test/smoke-test.sh`)
- [x] Run smoke test — all 13 pages + sitemap verified, no source maps
- [x] Link check (`npx broken-link-checker`) — 448 links checked, 0 broken
- [x] Lighthouse CI — accessibility: 0.95, SEO: 1.0
- [ ] Preview deploy visual checklist

## Phase 5: Security
- [x] `npm audit` — 1 moderate vulnerability (devalue prototype pollution, fixable via `npm audit fix`)
- [x] Source map check — none in `dist/`
- [x] `set:html` review — safe (hardcoded SVG icons + JSON-LD only)
- [x] No `import.meta.env` exposure
- [x] No `window.location` open redirects
- [ ] Secret scan (`npx secretlint`)
- [x] Security headers verified post-deploy — CSP, HSTS, Permissions-Policy, Referrer-Policy all present
- [x] SSL/TLS certificate verified — HTTP/2 + HSTS max-age=63072000
- [x] `.git/config` returns 404 on prod

## Phase 6: Contact Form
- [x] Contact form configured with Formsubmit.co (`info@vkcsystems.com`)
- [x] Formsubmit.co email activated — submissions delivering to Microsoft 365 inbox
- [x] Spam protection — CAPTCHA enabled (`_captcha=true`) + Cloudflare bot challenge + Formsubmit.co rate limiting
- [x] Honeypot field added (`_honey` hidden input on line 30)

---

## Issues

| # | Issue | Status | Notes |
|---|-------|--------|-------|
| 1 | npm audit moderate vulnerability | Open | `devalue` prototype pollution — run `npm audit fix` |
| 2 | Custom domain not configured | Closed | `vkcsystems.com` + `www` both live on Vercel |
| 3 | CSP may need tuning post-deploy | Closed | Google Maps iframe + Formsubmit.co submissions both working |
| 4 | Vercel deployment URLs return 401 | Open | SSO protection on preview URLs — may need to check team settings |
