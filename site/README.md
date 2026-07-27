# Clean Language website

The `site/` directory contains the static website published at [cleanlanguage.ai](https://cleanlanguage.ai).

## Cloudflare Pages deployment

Connect the GitHub repository to Cloudflare Pages using these settings:

- Production branch: `main`
- Framework preset: `None`
- Build command: leave blank
- Build output directory: `site`
- Root directory: leave blank

Add `cleanlanguage.ai` as the custom domain after the first deployment.

## Site contents

- `index.html`: homepage and platform installation buttons
- `install/index.html`: click-by-click installation instructions
- `patterns/index.html`: common AI-writing patterns and anti-patterns
- `verify/index.html`: plain-language download verification guide
- `404.html`: not-found page
- `styles.css`: shared responsive styles
- `js/copy.js`: copy-to-clipboard behaviour for the install page
- `favicon.svg`: site icon
- `apple-touch-icon.png`: home-screen icon for Apple devices
- `og-image.png`: social sharing preview image
- `downloads/`: portable Clean Language instructions file
- `robots.txt`: crawler directives
- `sitemap.xml`: search-engine sitemap
- `_headers`: Cloudflare Pages security and caching headers
- `_redirects`: redirects for retired site paths

The website is framework-free static HTML and CSS. It requires no build process.
