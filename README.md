# Dezier Studio

Static portfolio website for Dezier Studio by Laksana Matra Karowista.

## Project Type

This is a static HTML site. It does not use Vite, React, or a frontend framework.

## Local Preview

Open `index.html` directly in a browser, or run a local static server:

```bash
python -m http.server 5173
```

## Verify

```bash
npm test
```

## Build

The build validates the site and copies only the public files into `dist`.

```bash
npm run build
```

Generated output:

```text
dist/
  index.html
  styles.css
  script.js
  _redirects
  assets/
```

## Cloudflare Pages

Use these settings when connecting the GitHub repo to Cloudflare Pages:

```text
Framework preset: None
Build command: npm run build
Build output directory: dist
Root directory: /
Production branch: main
```

The `_redirects` file is included for single-page fallback:

```text
/* /index.html 200
```

## Notes

- `assets/` contains the public images, favicon, and portfolio media used by the live site.
- `_archive/`, `tests/`, local source images, and project tooling are not copied into `dist`.
- Netlify deployment is intentionally not used for this migration.
