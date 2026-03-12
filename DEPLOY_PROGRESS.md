# VKC Systems — Vercel Migration Progress

## Phase 1: Clone & Local Setup
- [x] Clone repo
- [x] npm install
- [x] npm run build — 13 pages + sitemap
- [ ] Dev server verified (all pages at localhost:4321)
- [ ] Preview build verified

## Phase 2: Vercel CLI Setup & First Deploy
- [ ] Install Vercel CLI (`npm install -g vercel`)
- [ ] Authenticate (`vercel login`)
- [ ] Link project (`vercel link`)
- [x] Create `vercel.json` with security headers
- [ ] Preview deploy (`vercel deploy`)
- [ ] Production deploy (`vercel deploy --prod`)

## Phase 3: GitHub Integration & Domain
- [ ] Connect repo in Vercel dashboard (Settings > Git)
- [ ] Set production branch: `main`, enable preview deploys
- [x] Remove `netlify.toml`
- [ ] Configure custom domain `vkcsystems.com` + `www` redirect
- [ ] Update DNS: A record → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`
- [ ] Verify auto-deploy (push test branch, open PR, confirm preview, merge, confirm prod)

## Phase 4: Tests
- [x] Build smoke test script created (`test/smoke-test.sh`)
- [ ] Run smoke test
- [ ] Link check (`npx broken-link-checker`)
- [ ] Lighthouse CI (accessibility ≥ 0.9, SEO ≥ 0.9)
- [ ] Preview deploy visual checklist

## Phase 5: Security
- [x] `npm audit` — 0 vulnerabilities
- [x] Source map check — none in `dist/`
- [x] `set:html` review — safe (hardcoded SVG icons + JSON-LD only)
- [x] No `import.meta.env` exposure
- [x] No `window.location` open redirects
- [ ] Secret scan (`npx secretlint`)
- [ ] Security headers verified post-deploy (`curl -sI`)
- [ ] SSL/TLS certificate verified
- [ ] `.git/config` returns 404 on prod

## Phase 6: Contact Form
- [ ] Replace Formspree placeholder (`formspree.io/f/placeholder`) with real form ID
- [ ] Verify Formspree rate limiting & spam protection
- [ ] Consider adding honeypot field

---

## Issues

| # | Issue | Status | Notes |
|---|-------|--------|-------|
| 1 | Formspree form ID is placeholder | Open | Update `src/pages/contact.astro` line 29 |
| 2 | CSP may need tuning post-deploy | Open | Test Google Maps iframe + Formspree submissions |
