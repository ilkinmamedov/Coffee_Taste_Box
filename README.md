# Coffee Taste Box ☕
Guided coffee tasting + a simple shop for tasting boxes and coffee gear (Azerbaijan).  
**No backend, no accounts, no tracking** — everything runs client-side.

**Live site:** https://ilkinmamedov.github.io/Coffee_Taste_Box/

---

## Why this exists
Buying coffee is confusing: origin, roast, process, brew method… and most people don’t know what they actually like.

**Coffee Taste Box** makes it simple:
1) Get a tasting box (A–D or A–F)  
2) Brew with a consistent beginner recipe  
3) Taste + mark notes  
4) Take a quick quiz  
5) Get a taste profile (and what to buy next)

Result: people can buy coffee with confidence — and roasters can onboard customers faster.

---

## What it includes
### Guided tasting flow (website)
**box → setup → brew → taste → quiz → result**

- Pick your box (A–D or A–F)
- Choose brew method (French Press / V60 / Moka Pot)
- Brew with a beginner-friendly recipe + timer
- Taste and save quick notes
- Take the quiz and get a profile:
  - Balanced & Sweet
  - Bright & Fruity
  - Bold & Roasty
  - Adventurous & Funky

### Shop (Option C: WhatsApp ordering)
- Products listed on `shop.html`
- Detail page `product.html?id=...` loads product info from `catalog.js`
- Order button opens WhatsApp with a pre-filled order message
- Flow: **WhatsApp → confirm stock & delivery → payment link → delivery**

---

## Privacy
This project stores state only in **sessionStorage** inside the browser tab.
- No accounts
- No database
- No analytics by default
- Closing the tab clears data

---

## Project structure
- `index.html` — landing page
- `shop.html` — shop listing
- `product.html` — product details (driven by `catalog.js`)
- `catalog.js` — product catalog (names, inside, how-it-works, WhatsApp fields)
- `app.js` — guided tasting logic + quiz + progress tracking
- `styles.css` — UI styles

---

## Local usage
Option A (fastest):
- Just open `index.html` in your browser.

Option B (recommended for testing):
- Run a tiny local server so everything behaves like production:
  - VS Code extension: **Live Server**
  - or terminal:
    - `python3 -m http.server 8080`
    - open: http://localhost:8080

---

## For roasters / partners
This project can be adapted for:
- A roaster-branded “taste onboarding” flow
- Rotating seasonal boxes (keep “flavor style” consistent)
- Simple DTC ordering via WhatsApp or form-to-payment

**What we’d need to partner:**
- Product list (boxes + gear)
- WhatsApp number + delivery rules
- Coffee lineup rules per box (styles + substitutions)

---

## Roadmap (next improvements)
- Add real pricing + stock labels
- Add “Bundles” and recommended add-ons in shop
- Add optional multilingual support (EN/AZ/RU)
- Add lightweight analytics (only if desired)
- Add a proper checkout (when ready)

---

## License
Code is licensed under the **MIT License** (see `LICENSE`).

**Trademark/Brand notice:** The “Coffee Taste Box” name and logo are not granted under the MIT license.
