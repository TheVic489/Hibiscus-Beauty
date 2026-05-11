# Hibiscus Beauty – Agent Instructions

## Project Overview
Static single-page website for a beauty aesthetics centre in Barcelona.
- **Language**: Catalan (`lang="ca"`) — all user-facing text must stay in Catalan
- **Stack**: Vanilla HTML5 + CSS3 + ES5 JavaScript — no build tools, no npm, no framework
- **Entry point**: `index.html` (single file; all sections live here)

## File Structure
| File | Purpose |
|------|---------|
| `index.html` | All page markup — one section per `<section id="...">` |
| `css/styles.css` | All styles — CSS custom properties + BEM-like naming |
| `script.js` | All behaviour — IIFE, `'use strict'`, no modules |
| `images/` | Local team photos (`alba.png`, `iris.png`, `sami.png`) |

## Conventions

### HTML
- Semantic elements: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<address>`
- Every section that needs scroll-animation gets class `animate-on-scroll`
- New section IDs must match the `href` of their nav link (e.g. `id="serveis"` ↔ `href="#serveis"`)
- External images use Unsplash URLs with `?auto=format&fit=crop&w=...&q=80`; local team photos from `images/`
- Always include `loading="lazy"` on `<img>` below the fold

### CSS
- Design tokens are CSS custom properties in `:root` — **never hardcode colours or shadows**
  - Key tokens: `--cream`, `--beige`, `--rose`, `--sage`, `--gold`, `--dark`, `--medium`, `--muted`
  - `--transition: .35s cubic-bezier(.4,0,.2,1)` — use for all transitions
  - `--radius: 14px` / `--radius-sm: 8px`
- Typography: headings → `'Playfair Display'` serif; body → `'Poppins'` sans-serif
- Responsive sizes use `clamp()`, not fixed `px` for headings
- Layout uses `.container` (max-width 1160px, centred, 24px padding)
- Section spacing: large sections use `padding: 6rem 0`

### JavaScript
- All code inside an IIFE: `(function () { 'use strict'; ... })();`
- No ES6+ features (arrow functions, `const`/`let`, template literals, etc.) — use `var` and `function`
- DOM lookups at the top of the IIFE, not inline
- Scroll effects use `IntersectionObserver` (with a `.visible` fallback for old browsers)
- The contact form is front-end only (no backend) — shows `#formSuccess` on submit

### Accessibility
- All interactive elements need ARIA labels where text is absent
- Decorative icons use `aria-hidden="true"`
- `<ul>` with meaningful items gets `role="list"` or `aria-label`

## External Dependencies (CDN only — no local install needed)
- Google Fonts: Playfair Display + Poppins
- Font Awesome 6.5 (icons via `<i class="fas fa-...">`)

## What to Avoid
- Do **not** introduce npm, bundlers (Vite, Webpack), or a framework
- Do **not** switch to ES modules or ES6+ syntax in `script.js`
- Do **not** hardcode hex colours — always use the CSS variables
- Do **not** change the page language from Catalan
