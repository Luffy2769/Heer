# Heer Dagha — Hair Stylist & Makeup Artist Portfolio

A premium, interactive digital portfolio for Heer Dagha, a professional hair stylist and makeup artist based in Mumbai, India.

## Services Offered

- **Hair Styling**: Wedding hair styles, cocktail hair styles, sangeet hair styles, Haldi/Mehendi hair styles, Reception look hair styles, Destination wedding hair styles.
- **Draping Services**: Professional saree/dupatta draping for all occasions.
- **Makeup Artistry**: Soft Glam, No-makeup look, 3D Looks, HD Makeup.
- **Audience**: Custom services catered for both women and men.

## Features

- **Responsive & Modern Design**: Crafted with custom HSL/OKLCH color system, smooth gradients, and premium typography (Fraunces & Manrope).
- **Interactive UI**: Featuring smooth micro-animations, tilt cards, and parallax scroll components powered by Framer Motion.
- **Prerendered Pages**: Static Site Generation (SSG) for ultra-fast page load times and optimal SEO.
- **Live Local Time**: Keeps track of Mumbai Local Time (IST) on the footer.
- **Direct Inquiry**: Direct booking/inquiry path via WhatsApp integration.

---

## Local Development

To run this project locally, ensure you have [Node.js](https://nodejs.org/) installed:

1. Install dependencies:
   ```sh
   npm install
   ```

2. Start the local development server:
   ```sh
   npm run dev
   ```

3. Build the project for production:
   ```sh
   npm run build
   ```

4. Preview the production build:
   ```sh
   npm run preview
   ```

---

## Deployment to GitHub Pages

This project is configured to build as a static site and deploy directly to GitHub Pages.

To build and deploy in a single command, run:
```sh
npm run deploy
```

The script will automatically:
1. Build and prerender all pages.
2. Copy `index.html` to `404.html` for client-side routing fallback.
3. Push the static build output to the `gh-pages` branch.
