#!/bin/bash
set -e

echo "=== VKC Systems Build Smoke Test ==="

# Build
echo "Building..."
npm run build

# The Vercel adapter writes static pages to dist/client
DIST=dist/client
[ -d "$DIST" ] || DIST=dist

# Check all pages exist
PAGES=(
  "index.html"
  "404.html"
  "careers/index.html"
  "privacy/index.html"
  "thank-you/index.html"
  "about/index.html"
  "contact/index.html"
  "projects/index.html"
  "solutions/index.html"
  "solutions/access-control/index.html"
  "solutions/cadd/index.html"
  "solutions/cctv/index.html"
  "solutions/communication-cabinets/index.html"
  "solutions/networking/index.html"
  "solutions/office-it/index.html"
  "solutions/public-address/index.html"
  "solutions/voip/index.html"
)

echo "Checking pages..."
for page in "${PAGES[@]}"; do
  test -f "$DIST/$page" || { echo "FAIL: $page missing"; exit 1; }
  echo "  OK: $page"
done

# Sitemap
test -f "$DIST/sitemap-index.xml" || { echo "FAIL: sitemap missing"; exit 1; }
echo "  OK: sitemap-index.xml"

# No source maps in production
MAP_COUNT=$(find dist -name "*.map" -type f | wc -l | tr -d ' ')
if [ "$MAP_COUNT" -ne "0" ]; then
  echo "FAIL: $MAP_COUNT source map(s) found in dist/"
  exit 1
fi
echo "  OK: no source maps"

# Production assets that must keep their URLs
ASSETS=(
  "VKC-Systems-Infrastructure-Capabilities-Statement.pdf"
  "fonts/inter-400.woff2"
  "fonts/inter-700.woff2"
  "fonts/LICENSE.txt"
)
for asset in "${ASSETS[@]}"; do
  test -f "$DIST/$asset" || { echo "FAIL: $asset missing"; exit 1; }
  echo "  OK: $asset"
done

echo ""
echo "All smoke tests passed"
