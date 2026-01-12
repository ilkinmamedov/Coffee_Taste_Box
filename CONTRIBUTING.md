# Contributing

Thanks for helping improve Coffee Taste Box ☕

This project is a static, client-only website (HTML/CSS/JS).  
No backend. No accounts. No database.

---

## How to run locally

### Option A (quick)
Open `index.html` in your browser.

### Option B (recommended)
Use a local server so links and assets behave exactly like production.

- VS Code extension: **Live Server**
  - Open `index.html` → right-click → “Open with Live Server”
- Or terminal:
  - `python3 -m http.server 8080`
  - Open: `http://localhost:8080`

---

## Where things live

- `index.html` — landing page
- `shop.html` — shop listing
- `product.html` — product detail page (driven by query param `?id=...`)
- `catalog.js` — product catalog data (what product.html renders)
- `app.js` — guided tasting logic + session progress tracking
- `styles.css` — all UI styles

---

## Editing products (shop)

### Add / update a product
1. Open `catalog.js`
2. Add a new key under `window.CTB_PRODUCTS`, for example:

```js
my_new_product: {
  name: "Product Name",
  badge: "Azerbaijan delivery",
  category: "Equipment",
  price: "AZN —",
  oneLine: "Short promise line...",
  bestFor: "...",
  learn: "...",
  inside: [
    ["Key", "Value"]
  ],
  howItWorks: [
    "Step 1",
    "Step 2"
  ],
  methods: ["French Press"],
  tip: "One helpful tip.",
  delivery: [
    ["Delivery", "Azerbaijan (Baku + regions)"],
    ["Time", "Usually 1–4 days"],
    ["Payment", "Payment link after confirmation"]
  ],
  whatsappFields: ["Quantity", "Delivery city", "Phone number"],
  whatsappProductLine: "Product Name"
}
