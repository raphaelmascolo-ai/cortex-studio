# Cortex Studio — Site Vitrine Design Spec

## Overview
Complete bilingual (FR/EN) showcase website for Cortex Studio, an AI agency selling AI applications, AI automations, AI websites, and web applications. The site serves as a sales and lead generation tool, centered on a catalog of profitable project ideas with revenue projections and downloadable business plans (PDF) gated behind email capture.

## Brand
- **Name:** Cortex Studio
- **Logo:** Neural network/node graph motif, gold nodes on dark navy background
- **Tagline FR:** "L'intelligence artificielle au service de votre croissance"
- **Tagline EN:** "Artificial intelligence powering your growth"

## Stack
- HTML / CSS / JavaScript — no frameworks
- Responsive mobile-first
- Hosting: GitHub Pages or Vercel (static)
- Forms: Formspree (static-compatible)
- SEO: meta tags, Open Graph, sitemap.xml, robots.txt, semantic HTML
- Target: Lighthouse > 90

## Design System

### Palette
- `--color-bg-dark`: #0B1120 (deep navy)
- `--color-bg-card`: #131B2E (card/section background)
- `--color-bg-light`: #F8F9FA (light sections)
- `--color-text-primary`: #FFFFFF
- `--color-text-secondary`: #94A3B8 (muted text)
- `--color-text-dark`: #1E293B (text on light bg)
- `--color-accent-gold`: #C9A84C (gold accent, from logo)
- `--color-accent-blue`: #3B82F6 (electric blue for CTAs)
- `--color-accent-blue-hover`: #2563EB
- `--color-border`: #1E293B

### Typography
- Font: Inter (Google Fonts)
- Headings: 700 weight
- Body: 400 weight
- Scale: clamp-based responsive sizing

### Components
- Buttons: primary (blue), secondary (gold outline), ghost
- Cards: dark bg, subtle border, hover lift effect
- Modals: centered overlay with backdrop blur
- Forms: dark-themed inputs with validation states
- Animations: fade-in on scroll (IntersectionObserver), hover transforms

### Icons
- Lucide Icons (CDN)

## Bilingual System
- `translations.js` — all strings in FR and EN objects
- Language toggle button in header (FR/EN)
- Default: French
- Stored in localStorage
- `data-i18n` attributes on translatable elements
- `lang` attribute updated on `<html>`

## Pages

### 1. index.html — Home
- Hero: headline, subheadline, 2 CTAs (services + ideas)
- Services overview: 4 cards with "à partir de" pricing
- Social proof: testimonials (placeholder), partner logos (placeholder)
- "Why us": 4 value props (expertise, speed, support, ROI)
- Final CTA: contact form or button to quote page

### 2. services.html — Services
4 detailed service blocks:
- Application IA — from 2,500€
- Automatisation IA — from 250€
- Site IA — from 1,000€
- Application Web — from 1,500€
Each with: description, use cases, process, tech, CTA to quote

### 3. ideas.html — Idea Catalog
- Filterable grid (category buttons: all, app-ia, auto-ia, site-ia, app-web)
- Cards: name, category badge, short description, MRR estimate, "View project" button
- 34 total ideas (14 AI apps + 9 automations + 7 AI sites + 4 web apps)

### 4. ideas/*.html — Individual Idea Pages (×34)
Each page:
- Title, full description, problem solved
- Monetization model
- Financial projections table (3 scenarios: 100/500/1000 users)
- Operational costs, break-even point
- Key features list
- Recommended tech stack
- CTA: "Download Business Plan" → email capture modal

### 5. quote.html — Quote Request
Form fields: name, email, phone, company, service type (dropdown), project description (textarea), estimated budget (dropdown), desired timeline (dropdown)

### 6. booking.html — Booking
Calendly iframe embed + explanatory text

### 7. about.html — About
Agency story, mission, values, team (placeholders), key figures

### 8. contact.html — Contact
Simple form (name, email, message) + contact info + social links

## Lead Capture Modal
- Triggered by "Download Business Plan" button on idea pages
- Fields: first name, email, company (optional)
- Submit → Formspree
- Success state: confirmation message + PDF download link
- Elegant design: backdrop blur, smooth animation

## Business Plans (14 AI App Ideas)
HTML pages with print-optimized CSS (`@media print`) in `/assets/business-plans/`:
1. Cover page — project name, Cortex Studio logo, date
2. Executive summary
3. Problem & solution
4. Business model — monetization, pricing
5. Financial projections — 12-month MRR table (3 scenarios), costs, break-even
6. Market analysis — TAM, trends, competition
7. Technical roadmap — MVP, V1, V2 timeline
8. Next step — CTA to quote form

## Global Components

### Header
- Logo (SVG or styled text matching brand)
- Nav: Accueil, Services, Idées, Devis, RDV, À propos, Contact
- FR/EN toggle
- Mobile: hamburger menu

### Footer
- Logo + tagline
- Quick links
- Social icons (placeholder)
- Legal mentions
- Copyright © 2026 Cortex Studio

## File Structure
```
cortex-studio/
├── index.html
├── services.html
├── ideas.html
├── quote.html
├── booking.html
├── about.html
├── contact.html
├── ideas/
│   ├── coaching-financier-ia.html
│   ├── capsule-temporelle.html
│   ├── gestion-foyer-ia.html
│   ├── cv-lettre-motivation-ia.html
│   ├── suivi-sante-ia.html
│   ├── micro-formation-ia.html
│   ├── gestion-locative-ia.html
│   ├── nutrition-meal-planning-ia.html
│   ├── traduction-ecommerce-ia.html
│   ├── suivi-chantier-ia.html
│   ├── gestion-rdv-medicaux-ia.html
│   ├── pricing-dynamique-ia.html
│   ├── contrats-documents-legaux-ia.html
│   ├── personal-shopping-ia.html
│   ├── facturation-relances.html
│   ├── contenu-reseaux-sociaux.html
│   ├── qualification-leads.html
│   ├── veille-concurrentielle.html
│   ├── reponses-emails-auto.html
│   ├── reponses-avis-auto.html
│   ├── onboarding-client.html
│   ├── rapports-performance.html
│   ├── prospection-linkedin.html
│   ├── site-immobilier-ia.html
│   ├── ecommerce-vendeur-ia.html
│   ├── reservation-assistant-ia.html
│   ├── annuaire-intelligent.html
│   ├── devis-instantane-ia.html
│   ├── blog-automatise-seo.html
│   ├── comparateur-intelligent.html
│   ├── dashboard-gestion-pme.html
│   ├── marketplace-services.html
│   ├── formation-en-ligne.html
│   └── gestion-projet-collaboratif.html
├── assets/
│   ├── css/
│   │   ├── style.css          (variables, base, layout)
│   │   ├── components.css     (buttons, cards, modals, forms)
│   │   └── responsive.css     (breakpoints, mobile)
│   ├── js/
│   │   ├── main.js            (nav, scroll animations, language)
│   │   ├── translations.js    (FR/EN strings)
│   │   ├── modal.js           (lead capture modal)
│   │   └── filter.js          (ideas grid filtering)
│   ├── images/
│   │   └── logo.svg
│   └── business-plans/
│       ├── bp-coaching-financier-ia.html
│       ├── bp-capsule-temporelle.html
│       ├── bp-gestion-foyer-ia.html
│       ├── bp-cv-lettre-motivation-ia.html
│       ├── bp-suivi-sante-ia.html
│       ├── bp-micro-formation-ia.html
│       ├── bp-gestion-locative-ia.html
│       ├── bp-nutrition-meal-planning-ia.html
│       ├── bp-traduction-ecommerce-ia.html
│       ├── bp-suivi-chantier-ia.html
│       ├── bp-gestion-rdv-medicaux-ia.html
│       ├── bp-pricing-dynamique-ia.html
│       ├── bp-contrats-documents-legaux-ia.html
│       └── bp-personal-shopping-ia.html
├── sitemap.xml
└── robots.txt
```

## Content Strategy
- All content written in both FR and EN
- No lorem ipsum — real, actionable copy
- SEO-optimized page titles and meta descriptions
- Each idea page targets long-tail keywords

## Form Handling
- All forms submit to Formspree endpoints
- Client-side validation (required fields, email format, phone format)
- Success/error states displayed inline
- Anti-spam: honeypot field
