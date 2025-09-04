# Aulun Dual-Ready Final

This is the dual-ready build of the **Genesis Aulun** mint site. It supports:
- ZIP drag-and-drop deploy to **Netlify** (static export in `/out`)
- **GitHub → Netlify** CI/CD builds

## Quick Start

```bash
# 1) Install
npm install

# 2) Configure env
cp .env.example .env.local
# fill in RECAPTCHA keys and admin password
# leave NEXT_PUBLIC_NFT_DROP_ADDRESS blank for now (as requested)

# 3) Dev
npm run dev

# 4) Build (for Netlify ZIP)
npm run build:netlify
# Upload the generated /out folder as a ZIP to Netlify
```

## Netlify (CI/CD)
- Create new site from Git → connect your repo
- Netlify should auto-detect `npm run build:netlify` and `out` via `netlify.toml`

## Admin Dashboard (hidden)
- Path: `/admin` (not linked, blocked via robots)
- Simple password gate uses `NEXT_PUBLIC_ADMIN_PASS` (client-side) and API validate

## Features
- Polygon network
- Accept USDT + USDC (UI + placeholders, wire to your contracts when ready)
- Max 3 mints per wallet (client rule + example API check)
- Whitelist-only mode
- Live progress tracker
- First 300 mints flagged for double revenue share for 3 months
- ReCaptcha v2/3 ready (requires keys)
- API rate limiting
- Dark theme + responsive UI

## IMPORTANT
- This is a **static export**. Ensure all mint logic runs on the client or behind API routes that don't require SSR.
- Contract address is intentionally blank. Update it in `.env.local` when ready.


## Hidden Folders Check
Before pushing to GitHub, make sure all important hidden folders are present:
- `.github/workflows/ci.yml` → GitHub Actions
- `.env.example` → Environment variables template

Use `ls -a` in terminal or check file explorer settings to ensure hidden files are visible.

## GitHub Push Instructions
1. Initialize git: `git init`
2. Add all files: `git add .`
3. Commit: `git commit -m "Initial commit"`
4. Push to GitHub: `git branch -M main && git remote add origin <repo-url> && git push -u origin main`
