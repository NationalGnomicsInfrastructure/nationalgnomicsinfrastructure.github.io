#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

test -f dist/index.html
test -f dist/404.html
test -f dist/about/index.html
test -f dist/applications/index.html
test -f dist/applications/gnome-sequencing/index.html
test -f dist/applications/spatial-gnomics/index.html
test -f dist/applications/ancient-gnomics/index.html
test -f dist/applications/mycognomics/index.html
test -f dist/applications/epignomics/index.html
test -f dist/applications/pharmagnomics/index.html
test -f dist/database/index.html
test -f dist/platform/index.html
test -f dist/platform/species-id/index.html
test -f dist/platform/retrieval/index.html
test -f dist/platform/detangling/index.html
test -f dist/platform/identification/index.html
test -f dist/platform/delivery/index.html
test -f dist/technologies/index.html
test -f dist/favicon.svg
test -f dist/ngni-logo.png
test -f dist/js/nav.js
grep -q '<title>' dist/index.html
grep -q 'name="description"' dist/index.html
grep -q 'rel="canonical"' dist/index.html
grep -q 'Content-Security-Policy' dist/index.html
grep -q 'property="og:url"' dist/about/index.html
grep -q 'class="skip-link"' dist/index.html
grep -q 'id="main-content"' dist/index.html
test -s dist/sitemap-index.xml
grep -q 'sitemap-0.xml' dist/sitemap-index.xml
test -s dist/sitemap-0.xml
grep -q 'nationalgnomicsinfrastructure.github.io/' dist/sitemap-0.xml
