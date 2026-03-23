# Cortex Studio Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, bilingual (FR/EN) showcase website for Cortex Studio — an AI agency — with 8 main pages, 34 idea pages, 14 business plan pages, lead capture modals, and full content. No frameworks, pure HTML/CSS/JS.

**Architecture:** Static site with shared CSS design system (3 files), JS modules (4 files), and a translation system using `data-i18n` attributes + `translations.js`. Each HTML page is self-contained with inlined header/footer markup. Pages share the same CSS/JS. Idea pages and business plans follow templates with content-specific data.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), vanilla JavaScript (ES6+), Inter font (Google Fonts), Lucide Icons (CDN), Formspree (forms), Calendly (booking embed).

**Spec:** `docs/superpowers/specs/2026-03-23-cortex-studio-website-design.md`

---

## File Map

### CSS Foundation
- `assets/css/style.css` — CSS variables, reset, base typography, layout utilities, section styles
- `assets/css/components.css` — buttons, cards, modals, forms, badges, tables, header, footer
- `assets/css/responsive.css` — breakpoints (mobile-first), hamburger menu, responsive grid

### JS Modules
- `assets/js/translations.js` — FR/EN string objects for ALL pages (keyed by `data-i18n` values)
- `assets/js/main.js` — language switcher, scroll animations (IntersectionObserver), mobile nav toggle, active nav state
- `assets/js/modal.js` — lead capture modal (open/close, form validation, Formspree submit, success state)
- `assets/js/filter.js` — ideas grid category filtering

### Assets
- `assets/images/logo.svg` — Cortex Studio logo (neural network motif, gold on transparent)

### Main Pages (8)
- `index.html` — Home (hero, services preview, social proof, why us, final CTA)
- `services.html` — 4 service blocks with detail + CTA
- `ideas.html` — filterable grid of 34 idea cards
- `quote.html` — detailed quote request form
- `booking.html` — Calendly embed + text
- `about.html` — story, mission, team, key figures
- `contact.html` — contact form + info

### Idea Pages (34)
- `ideas/coaching-financier-ia.html` through `ideas/gestion-projet-collaboratif.html`
- Each follows identical template structure with unique content

### Business Plan Pages (14)
- `assets/business-plans/bp-coaching-financier-ia.html` through `assets/business-plans/bp-personal-shopping-ia.html`
- Print-optimized HTML with `@media print` styles

### SEO
- `sitemap.xml` — all page URLs
- `robots.txt` — allow all, reference sitemap

---

## Task 1: CSS Design System

**Files:**
- Create: `assets/css/style.css`
- Create: `assets/css/components.css`
- Create: `assets/css/responsive.css`

- [ ] **Step 1: Create `assets/css/style.css`**

CSS variables (all design tokens from spec), CSS reset, base typography (Inter import), body defaults, layout utilities (`.container`, `.section`, `.grid`), section background alternation.

```css
:root {
  --color-bg-dark: #0B1120;
  --color-bg-card: #131B2E;
  --color-bg-light: #F8F9FA;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #94A3B8;
  --color-text-dark: #1E293B;
  --color-accent-gold: #C9A84C;
  --color-accent-blue: #3B82F6;
  --color-accent-blue-hover: #2563EB;
  --color-border: #1E293B;
  --font-family: 'Inter', sans-serif;
  --container-max: 1200px;
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 6rem;
  --radius-sm: 0.5rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
  --transition: all 0.3s ease;
}
/* + reset, base styles, Inter import, layout classes */
```

- [ ] **Step 2: Create `assets/css/components.css`**

All reusable components:
- `.btn-primary` (blue bg, white text, hover darken)
- `.btn-secondary` (gold outline, gold text, hover fill)
- `.btn-ghost` (transparent, white text, hover bg)
- `.card` (dark bg, border, radius, hover lift with transform/shadow)
- `.badge` (category badges: app-ia, auto-ia, site-ia, app-web — color-coded)
- `.modal-overlay` / `.modal` (centered, backdrop blur, fade animation)
- `.form-group`, `.form-input`, `.form-select`, `.form-textarea` (dark-themed, focus states)
- `.header` / `.nav` (fixed, dark bg, blur, logo + links + lang toggle)
- `.footer` (dark bg, grid layout, links, social icons, copyright)
- `.testimonial-card` (avatar placeholder, quote, name)
- `.stats-grid` / `.stat-item` (number + label)
- `.projection-table` (styled table for financial projections)
- `.feature-list` (checked-icon list items)
- `.hero` (full-width, gradient overlay, centered content)
- `.service-block` (alternating layout, icon, details)
- `.fade-in` (opacity 0 → 1 animation class, applied by JS)

- [ ] **Step 3: Create `assets/css/responsive.css`**

Breakpoints:
- Base: mobile (< 768px) — single column, stacked cards, hamburger nav
- `@media (min-width: 768px)` — tablet: 2-col grid, side nav
- `@media (min-width: 1024px)` — desktop: 3-4 col grid, full nav
- `@media print` — business plan print styles (white bg, no nav/footer, page breaks)

- [ ] **Step 4: Commit**

```bash
git add assets/css/
git commit -m "feat: add CSS design system (variables, components, responsive)"
```

---

## Task 2: Logo SVG

**Files:**
- Create: `assets/images/logo.svg`

- [ ] **Step 1: Create SVG logo**

Neural network/node graph motif matching the brand image. Gold (#C9A84C) nodes and edges on transparent background. Include "CORTEX STUDIO" text in the SVG. Viewbox sized for header use (~200x40).

- [ ] **Step 2: Commit**

```bash
git add assets/images/
git commit -m "feat: add Cortex Studio SVG logo"
```

---

## Task 3: JavaScript Modules

**Files:**
- Create: `assets/js/translations.js`
- Create: `assets/js/main.js`
- Create: `assets/js/modal.js`
- Create: `assets/js/filter.js`

- [ ] **Step 1: Create `assets/js/translations.js`**

Export a `translations` object with `fr` and `en` keys. Each contains ALL translatable strings keyed by their `data-i18n` identifier. Structure:

```javascript
const translations = {
  fr: {
    // Nav
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.ideas': 'Idées',
    'nav.quote': 'Devis',
    'nav.booking': 'RDV',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    // Hero
    'hero.title': 'Transformez vos idées en solutions IA rentables',
    'hero.subtitle': '...',
    // ... ALL strings for ALL pages
  },
  en: {
    'nav.home': 'Home',
    // ... mirror of fr
  }
};
```

This file will be large (~1000+ lines). Organize by page/section with comments.

- [ ] **Step 2: Create `assets/js/main.js`**

Functions:
- `initLanguage()` — read localStorage or default to 'fr', apply translations, update `<html lang>`
- `switchLanguage(lang)` — set localStorage, call `applyTranslations()`
- `applyTranslations()` — querySelectorAll `[data-i18n]`, set textContent from translations object. Handle `[data-i18n-placeholder]` for form inputs. Handle `[data-i18n-html]` for innerHTML.
- `initScrollAnimations()` — IntersectionObserver on `.fade-in` elements, add `.visible` class when in viewport (threshold 0.1)
- `initMobileNav()` — toggle `.nav-open` on burger click, close on link click or outside click
- `setActiveNav()` — highlight current page in nav based on `window.location`
- `DOMContentLoaded` listener: call all init functions

- [ ] **Step 3: Create `assets/js/modal.js`**

Functions:
- `openModal(businessPlanUrl)` — show modal overlay, set the download URL for success state, focus trap
- `closeModal()` — hide modal, reset form
- `handleModalSubmit(e)` — validate (firstName required, email format), submit to Formspree via fetch, show success state with download link
- Event listeners: close on overlay click, close on Escape key, close on X button

- [ ] **Step 4: Create `assets/js/filter.js`**

Functions:
- `initFilter()` — attach click listeners to `.filter-btn` elements
- `filterIdeas(category)` — show/hide `.idea-card` elements based on `data-category` attribute. Toggle `.active` on filter buttons. Add fade animation on filter change.

- [ ] **Step 5: Commit**

```bash
git add assets/js/
git commit -m "feat: add JS modules (translations, main, modal, filter)"
```

---

## Task 4: Home Page (`index.html`)

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create `index.html`**

Full HTML5 page with:
- `<head>`: meta charset, viewport, SEO title/description, OG tags, Inter font, Lucide CDN, CSS links (style, components, responsive)
- **Header**: logo SVG, nav links (all 7 pages), FR/EN toggle button, hamburger button (mobile)
- **Hero section**: `<section class="hero">` with h1 headline, p subtitle, 2 CTA buttons (→ services, → ideas)
- **Services preview**: `<section class="section">` with 4 cards showing service name, "à partir de X€" price, short description, CTA link to services.html
- **Social proof**: testimonial cards (3 placeholder testimonials with realistic names/companies), partner logo row (6 gray placeholder boxes)
- **Why us**: 4-column grid with icon + title + description (Expertise IA, Rapidité, Accompagnement, ROI Garanti)
- **Final CTA**: dark section with headline + button → quote.html
- **Footer**: logo, tagline, quick links (3 columns), social icons, legal link, copyright
- All visible text uses `data-i18n="key"` attributes
- JS includes at bottom: translations.js, main.js

All content must be real, complete, compelling sales copy — no placeholders for text.

- [ ] **Step 2: Verify in browser**

Open in browser, check:
- Layout renders correctly
- Language toggle works
- Scroll animations trigger
- Mobile hamburger works
- All links point to correct pages

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add home page with hero, services, social proof, CTA"
```

---

## Task 5: Services Page (`services.html`)

**Files:**
- Create: `services.html`

- [ ] **Step 1: Create `services.html`**

Same head/header/footer structure as index.html. Body content:

4 service blocks, each containing:
- Lucide icon
- Service name + "à partir de X€" badge
- Detailed description (2-3 paragraphs of real content)
- Use cases list (4-5 bullet points)
- Development process (numbered steps)
- Technologies used (tech badges)
- CTA button → quote.html with preselected service type

Services:
1. **Application IA** — 2 500€ — custom AI apps, ML models, NLP, computer vision
2. **Automatisation IA** — 250€ — workflow automation, n8n, Make, Zapier + AI
3. **Site IA** — 1 000€ — websites with integrated AI features (chatbots, search, recommendations)
4. **Application Web** — 1 500€ — full-stack web apps, SaaS, dashboards, marketplaces

- [ ] **Step 2: Commit**

```bash
git add services.html
git commit -m "feat: add services page with 4 detailed service blocks"
```

---

## Task 6: Ideas Catalog Page (`ideas.html`)

**Files:**
- Create: `ideas.html`

- [ ] **Step 1: Create `ideas.html`**

Same head/header/footer. Body content:

- Hero mini section with title + description
- Filter bar: 5 buttons (Tout, App IA, Automatisation IA, Site IA, App Web)
- Grid of 34 idea cards, each with:
  - `data-category="app-ia|auto-ia|site-ia|app-web"`
  - Category badge (color-coded)
  - Project name (h3)
  - Short description (1-2 sentences)
  - MRR estimate badge (e.g., "~2 995€/mois")
  - "Voir le projet →" link to `ideas/slug.html`

All 34 ideas must be present with real descriptions and MRR values from the spec.

JS includes: translations.js, main.js, filter.js

- [ ] **Step 2: Commit**

```bash
git add ideas.html
git commit -m "feat: add ideas catalog page with 34 filterable cards"
```

---

## Task 7: Quote Page (`quote.html`)

**Files:**
- Create: `quote.html`

- [ ] **Step 1: Create `quote.html`**

Same head/header/footer. Body:

- Section title + description
- Form with Formspree action (`https://formspree.io/f/{id}` — placeholder ID, user will replace):
  - Nom / Name (text, required)
  - Email (email, required)
  - Téléphone / Phone (tel, optional)
  - Entreprise / Company (text, optional)
  - Type de service (select: App IA, Automatisation IA, Site IA, App Web)
  - Description du projet (textarea, required)
  - Budget estimé (select: < 1 000€, 1-2.5k, 2.5-5k, 5-10k, > 10k)
  - Délai souhaité (select: < 1 mois, 1-3 mois, 3-6 mois, > 6 mois)
  - Honeypot field (hidden, anti-spam)
  - Submit button
- Client-side validation with inline error messages
- Success/error state handling

- [ ] **Step 2: Commit**

```bash
git add quote.html
git commit -m "feat: add quote request page with validated form"
```

---

## Task 8: Booking Page (`booking.html`)

**Files:**
- Create: `booking.html`

- [ ] **Step 1: Create `booking.html`**

Same head/header/footer. Body:

- Section with explanatory text about the consultation process (3 steps: book, discuss, receive proposal)
- Calendly embed iframe (placeholder URL `https://calendly.com/cortex-studio/consultation` — user will replace)
- Responsive iframe container (16:9 aspect ratio on desktop, taller on mobile)

- [ ] **Step 2: Commit**

```bash
git add booking.html
git commit -m "feat: add booking page with Calendly embed"
```

---

## Task 9: About Page (`about.html`)

**Files:**
- Create: `about.html`

- [ ] **Step 1: Create `about.html`**

Same head/header/footer. Body:

- **Story section**: origin story of the agency, why AI, the vision
- **Mission & Values**: 3 core values with icons (Innovation, Excellence, Transparence)
- **Team section**: 3 team member cards (placeholder avatar circles with initials, name, role, short bio)
- **Key figures**: stats grid (50+ projets, 98% satisfaction, 30+ clients, 4 ans d'expérience) — placeholder numbers

- [ ] **Step 2: Commit**

```bash
git add about.html
git commit -m "feat: add about page with story, team, key figures"
```

---

## Task 10: Contact Page (`contact.html`)

**Files:**
- Create: `contact.html`

- [ ] **Step 1: Create `contact.html`**

Same head/header/footer. Body:

- Two-column layout:
  - Left: Contact form (name, email, message) with Formspree, validation, honeypot
  - Right: Contact info (email, phone, address placeholder), social links (LinkedIn, Twitter/X, GitHub — placeholder URLs), optional Google Maps embed placeholder
- Success/error state for form

- [ ] **Step 2: Commit**

```bash
git add contact.html
git commit -m "feat: add contact page with form and info"
```

---

## Task 11: AI App Idea Pages (14 pages)

**Files:**
- Create: `ideas/coaching-financier-ia.html`
- Create: `ideas/capsule-temporelle.html`
- Create: `ideas/gestion-foyer-ia.html`
- Create: `ideas/cv-lettre-motivation-ia.html`
- Create: `ideas/suivi-sante-ia.html`
- Create: `ideas/micro-formation-ia.html`
- Create: `ideas/gestion-locative-ia.html`
- Create: `ideas/nutrition-meal-planning-ia.html`
- Create: `ideas/traduction-ecommerce-ia.html`
- Create: `ideas/suivi-chantier-ia.html`
- Create: `ideas/gestion-rdv-medicaux-ia.html`
- Create: `ideas/pricing-dynamique-ia.html`
- Create: `ideas/contrats-documents-legaux-ia.html`
- Create: `ideas/personal-shopping-ia.html`

- [ ] **Step 1: Create all 14 AI app idea pages**

Each page follows this template (same head/header/footer as main pages, paths adjusted for `/ideas/` depth):

- **Breadcrumb**: Accueil > Idées > [Project Name]
- **Hero mini**: project name + category badge + MRR estimate
- **Problem section**: what pain point this solves (2-3 paragraphs)
- **Solution section**: how the app solves it (2-3 paragraphs)
- **Monetization model**: pricing strategy, subscription tiers
- **Financial projections table**:

| Metric | 100 users | 500 users | 1 000 users |
|--------|-----------|-----------|-------------|
| MRR | X€ | X€ | X€ |
| Coûts opérationnels | X€ | X€ | X€ |
| Bénéfice net | X€ | X€ | X€ |
| Point de rentabilité | X mois | X mois | X mois |

- **Key features list**: 6-8 features with icons
- **Recommended tech stack**: frontend, backend, AI/ML, infrastructure
- **CTA section**: "Télécharger le Business Plan complet" button → triggers modal (modal.js)
  - Button has `data-bp-url="assets/business-plans/bp-slug.html"`
- **CTA secondary**: "Faites développer ce projet" → link to quote.html

Content must be unique, detailed, and realistic for each of the 14 ideas per the spec.

JS includes: translations.js, main.js, modal.js

- [ ] **Step 2: Commit**

```bash
git add ideas/coaching-financier-ia.html ideas/capsule-temporelle.html ideas/gestion-foyer-ia.html ideas/cv-lettre-motivation-ia.html ideas/suivi-sante-ia.html ideas/micro-formation-ia.html ideas/gestion-locative-ia.html ideas/nutrition-meal-planning-ia.html ideas/traduction-ecommerce-ia.html ideas/suivi-chantier-ia.html ideas/gestion-rdv-medicaux-ia.html ideas/pricing-dynamique-ia.html ideas/contrats-documents-legaux-ia.html ideas/personal-shopping-ia.html
git commit -m "feat: add 14 AI application idea pages with projections"
```

---

## Task 12: Automation Idea Pages (9 pages)

**Files:**
- Create: `ideas/facturation-relances.html`
- Create: `ideas/contenu-reseaux-sociaux.html`
- Create: `ideas/qualification-leads.html`
- Create: `ideas/veille-concurrentielle.html`
- Create: `ideas/reponses-emails-auto.html`
- Create: `ideas/reponses-avis-auto.html`
- Create: `ideas/onboarding-client.html`
- Create: `ideas/rapports-performance.html`
- Create: `ideas/prospection-linkedin.html`

- [ ] **Step 1: Create all 9 automation idea pages**

Same template as Task 11 but adapted for automations:
- No MRR projection (automations are sold as services, not SaaS)
- Instead: **Time saved per week**, **ROI estimate**, **Implementation cost** (from 250€)
- Concrete use case scenario (before/after workflow)
- Tools involved (n8n, Make, Zapier, OpenAI API, etc.)
- CTA: "Demander un devis" → quote.html (no business plan download for automations)

Content per the spec: facturation & relances, contenu réseaux sociaux, qualification leads, veille concurrentielle, réponses emails auto, réponses avis auto, onboarding client, rapports performance, prospection LinkedIn.

- [ ] **Step 2: Commit**

```bash
git add ideas/facturation-relances.html ideas/contenu-reseaux-sociaux.html ideas/qualification-leads.html ideas/veille-concurrentielle.html ideas/reponses-emails-auto.html ideas/reponses-avis-auto.html ideas/onboarding-client.html ideas/rapports-performance.html ideas/prospection-linkedin.html
git commit -m "feat: add 9 AI automation idea pages"
```

---

## Task 13: AI Site Idea Pages (7 pages)

**Files:**
- Create: `ideas/site-immobilier-ia.html`
- Create: `ideas/ecommerce-vendeur-ia.html`
- Create: `ideas/reservation-assistant-ia.html`
- Create: `ideas/annuaire-intelligent.html`
- Create: `ideas/devis-instantane-ia.html`
- Create: `ideas/blog-automatise-seo.html`
- Create: `ideas/comparateur-intelligent.html`

- [ ] **Step 1: Create all 7 AI site idea pages**

Same template as Task 11 with:
- AI features described (chatbot, recommendation engine, search, estimation)
- Monetization model (ads, subscriptions, commissions, lead gen)
- MRR projections table
- CTA: "Demander un devis" → quote.html

- [ ] **Step 2: Commit**

```bash
git add ideas/site-immobilier-ia.html ideas/ecommerce-vendeur-ia.html ideas/reservation-assistant-ia.html ideas/annuaire-intelligent.html ideas/devis-instantane-ia.html ideas/blog-automatise-seo.html ideas/comparateur-intelligent.html
git commit -m "feat: add 7 AI site idea pages"
```

---

## Task 14: Web App Idea Pages (4 pages)

**Files:**
- Create: `ideas/dashboard-gestion-pme.html`
- Create: `ideas/marketplace-services.html`
- Create: `ideas/formation-en-ligne.html`
- Create: `ideas/gestion-projet-collaboratif.html`

- [ ] **Step 1: Create all 4 web app idea pages**

Same template as Task 11 with:
- SaaS model description
- Feature breakdown
- MRR projections table
- CTA: "Demander un devis" → quote.html

- [ ] **Step 2: Commit**

```bash
git add ideas/dashboard-gestion-pme.html ideas/marketplace-services.html ideas/formation-en-ligne.html ideas/gestion-projet-collaboratif.html
git commit -m "feat: add 4 web application idea pages"
```

---

## Task 15: Business Plan Pages (14 pages)

**Files:**
- Create: `assets/business-plans/bp-coaching-financier-ia.html`
- Create: `assets/business-plans/bp-capsule-temporelle.html`
- Create: `assets/business-plans/bp-gestion-foyer-ia.html`
- Create: `assets/business-plans/bp-cv-lettre-motivation-ia.html`
- Create: `assets/business-plans/bp-suivi-sante-ia.html`
- Create: `assets/business-plans/bp-micro-formation-ia.html`
- Create: `assets/business-plans/bp-gestion-locative-ia.html`
- Create: `assets/business-plans/bp-nutrition-meal-planning-ia.html`
- Create: `assets/business-plans/bp-traduction-ecommerce-ia.html`
- Create: `assets/business-plans/bp-suivi-chantier-ia.html`
- Create: `assets/business-plans/bp-gestion-rdv-medicaux-ia.html`
- Create: `assets/business-plans/bp-pricing-dynamique-ia.html`
- Create: `assets/business-plans/bp-contrats-documents-legaux-ia.html`
- Create: `assets/business-plans/bp-personal-shopping-ia.html`

- [ ] **Step 1: Create all 14 business plan HTML pages**

Each business plan is a standalone HTML page with print-optimized CSS:

**Structure (4-5 print pages):**
1. **Cover page**: project name, "Business Plan" subtitle, Cortex Studio logo, date (March 2026), `page-break-after: always`
2. **Executive summary**: concept in 1 paragraph
3. **Problem & Solution**: pain point + how the app resolves it
4. **Business model**: detailed monetization (pricing tiers, revenue streams)
5. **Financial projections**: 12-month MRR table with 3 scenarios (pessimistic, realistic, optimistic), monthly costs breakdown, break-even month, `page-break-before: always`
6. **Market analysis**: TAM estimation, market trends, competitive landscape
7. **Technical roadmap**: MVP (month 1-2), V1 (month 3-4), V2 (month 5-6) with feature lists
8. **Next step**: CTA paragraph + link to quote.html

**Styling:**
- Self-contained CSS (no external stylesheet imports for portability)
- White background, dark text, professional serif+sans combo
- Gold accent color for headers and borders
- `@media print` rules: hide non-content elements, proper page breaks, no background colors for ink saving
- A4 page format considerations

- [ ] **Step 2: Commit**

```bash
git add assets/business-plans/
git commit -m "feat: add 14 print-optimized business plan HTML pages"
```

---

## Task 16: SEO Files (sitemap.xml, robots.txt)

**Files:**
- Create: `sitemap.xml`
- Create: `robots.txt`

- [ ] **Step 1: Create `sitemap.xml`**

List all pages with `<url>` entries:
- 8 main pages (index, services, ideas, quote, booking, about, contact)
- 34 idea pages
- Base URL placeholder: `https://cortex-studio.com/`
- Priority: index=1.0, services/ideas=0.9, idea pages=0.7, others=0.6
- Lastmod: 2026-03-23

- [ ] **Step 2: Create `robots.txt`**

```
User-agent: *
Allow: /
Sitemap: https://cortex-studio.com/sitemap.xml
```

- [ ] **Step 3: Commit**

```bash
git add sitemap.xml robots.txt
git commit -m "feat: add sitemap.xml and robots.txt for SEO"
```

---

## Task 17: Final Integration & Verification

- [ ] **Step 1: Verify all inter-page links**

Check every `<a href>` across all 49 HTML files points to existing files with correct relative paths. Idea pages use `../` prefix for assets.

- [ ] **Step 2: Verify all `data-i18n` keys exist in translations.js**

Every `data-i18n` attribute value used in HTML must have a corresponding key in both `fr` and `en` objects in translations.js.

- [ ] **Step 3: Verify modal integration**

Business plan download buttons on all 14 AI app idea pages must have correct `data-bp-url` pointing to existing business plan files.

- [ ] **Step 4: Cross-browser check**

Open index.html in browser. Test:
- Language toggle FR↔EN on all pages
- Mobile responsive layout
- Scroll animations
- Ideas filter
- Modal open/close
- Form validation
- Navigation between pages

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete Cortex Studio website — all pages, content, and integrations"
```

---

## Parallelization Strategy

Tasks 11-15 (idea pages + business plans) are independent and can be run in parallel by separate subagents. The dependency chain is:

```
Task 1 (CSS) ──┐
Task 2 (Logo) ──┤
Task 3 (JS) ────┤──→ Task 4 (Home) ──→ Tasks 5-10 (other pages) ──→ Task 17 (verify)
                │──→ Task 11 (14 AI app ideas) ──────────────────────→ Task 17
                │──→ Task 12 (9 automations) ────────────────────────→ Task 17
                │──→ Task 13 (7 AI sites) ──────────────────────────→ Task 17
                │──→ Task 14 (4 web apps) ──────────────────────────→ Task 17
                └──→ Task 15 (14 business plans) ───────────────────→ Task 17
Task 16 (SEO) ─────────────────────────────────────────────────────→ Task 17
```

After foundation (Tasks 1-3), Tasks 4-16 can largely run in parallel.
