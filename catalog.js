// catalog.js — simple product catalog for product.html (Option C: WhatsApp order)

window.CTB_PRODUCTS = {
  beginner_box: {
    name: "Beginner • Find Your Taste Box (A–D)",
    badge: "Azerbaijan delivery",
    category: "Tasting Box",
    price: "AZN —",
    oneLine: "A beginner-friendly tasting kit that helps you discover what you enjoy: chocolatey, fruity, or bold — with guided brewing.",
    bestFor: "new to specialty coffee, gift buyers, “I don’t know what I like yet.”",
    learn: "your taste style + which origins/roasts you should buy next.",
    inside: [
      ["Coffee samples", "4 samples (A–D), different styles"],
      ["Grams per sample", "~18–20g (one guided brew)"],
      ["Printed taste checklist", "Track what you like (simple and fast)"],
      ["Brew card", "Matched to your brew method choice"],
      ["QR link", "Guided brewing + taste + quiz + result"]
    ],
    howItWorks: [
      "Choose your brew method: French Press",
      "Choose your brew method: V60 / Pour-over",
      "Choose your brew method: Moka Pot",
      "Brew the default recipe on our website (beginner-friendly)",
      "Taste & track using the checklist",
      "Take the quiz and get your taste profile",
      "Know what to buy next with confidence"
    ],
    methods: ["French Press", "V60 / Pour-over", "Moka Pot"],
    tip: "Use the same brew method for the whole box to compare fairly.",
    delivery: [
      ["Delivery", "Azerbaijan (Baku + regions)"],
      ["Time", "Usually 1–4 days (city dependent)"],
      ["Payment", "Payment link after confirmation"]
    ],
    whatsappFields: ["Brew method", "Delivery city", "Phone number"],
    whatsappProductLine: "Beginner • Find Your Taste Box (A–D)"
  },

  v60_dripper: {
    name: "V60 Dripper (Plastic)",
    badge: "Beginner-friendly",
    category: "Equipment",
    price: "AZN —",
    oneLine: "A simple pour-over dripper that makes clean, bright coffee — perfect for tasting origin differences.",
    bestFor: "light to medium roasts, fruity/floral notes, clean cup lovers.",
    learn: "how pouring and grind affect clarity and brightness.",
    inside: [
      ["What it is", "One V60 dripper (plastic)"],
      ["You’ll also need", "V60 paper filters + a mug/server"],
      ["Optional", "Scale (recommended) + gooseneck kettle (nice-to-have)"]
    ],
    howItWorks: [
      "Rinse filter, add coffee, bloom, then pour in 2–3 slow pours",
      "Use our beginner V60 recipe on the Brew page",
      "Compare coffees: V60 makes fruity/floral notes easier to notice"
    ],
    methods: ["V60 / Pour-over"],
    tip: "Plastic heats quickly and keeps brewing temperature more stable than some ceramics.",
    delivery: [
      ["Delivery", "Azerbaijan (Baku + regions)"],
      ["Time", "Usually 1–4 days"],
      ["Payment", "Payment link after confirmation"]
    ],
    whatsappFields: ["Quantity", "Delivery city", "Phone number"],
    whatsappProductLine: "V60 Dripper (Plastic)"
  },

  v60_filters: {
    name: "V60 Paper Filters",
    badge: "Essential for pour-over",
    category: "Accessories",
    price: "AZN —",
    oneLine: "Paper filters help you get a clean, bright cup — perfect for comparing coffees fairly.",
    bestFor: "V60 brewing, fruity/floral coffees, cleaner finish.",
    learn: "why filter + flow changes body and clarity.",
    inside: [
      ["Shape", "V60 cone filters"],
      ["Pack size", "Choose: 40 / 60 / 100"],
      ["Usage", "1 filter = 1 brew (rinse first)"]
    ],
    howItWorks: [
      "Place filter, rinse with hot water, discard rinse water",
      "Add coffee and brew using our guided V60 steps",
      "Enjoy a cleaner cup with more clarity"
    ],
    methods: ["V60 / Pour-over"],
    tip: "Always rinse the filter to remove paper taste and preheat the brewer.",
    delivery: [
      ["Delivery", "Azerbaijan (Baku + regions)"],
      ["Time", "Usually 1–4 days"],
      ["Payment", "Payment link after confirmation"]
    ],
    whatsappFields: ["Pack size (40/60/100)", "Quantity", "Delivery city", "Phone number"],
    whatsappProductLine: "V60 Paper Filters"
  },

  explore_origins_box: {
    name: "Intermediate • Explore Origins Box (A–F)",
    badge: "Azerbaijan delivery",
    category: "Tasting Box",
    price: "AZN —",
    oneLine: "Taste 6 different origins with a consistent roast plan — so you can feel how geography changes flavor.",
    bestFor: "curious coffee drinkers, people who already know they like coffee, gift buyers who want variety.",
    learn: "how origin affects sweetness, acidity, and flavor notes — and which countries match your taste.",
    inside: [
      ["Coffee samples", "6 samples (A–F), different origins"],
      ["Roast plan", "Kept consistent for fair comparisons"],
      ["Grams per sample", "~18–20g (one guided brew)"],
      ["Printed taste checklist", "Track favorites + flavor direction"],
      ["QR link", "Guided brewing + taste + quiz + result"]
    ],
    howItWorks: [
      "Choose your brew method: French Press",
      "Choose your brew method: V60 / Pour-over",
      "Choose your brew method: Moka Pot",
      "Pick ONE brew method for the whole box (recommended)",
      "Brew each sample using the same default recipe",
      "Taste & track what changes between origins",
      "Take the quiz to see your taste profile",
      "Use the result to choose your next coffees confidently"
    ],
    methods: ["French Press", "V60 / Pour-over", "Moka Pot"],
    tip: "Keep everything the same (dose, water, method) so the origin differences are obvious.",
    delivery: [
      ["Delivery", "Azerbaijan (Baku + regions)"],
      ["Time", "Usually 1–4 days (city dependent)"],
      ["Payment", "Payment link after confirmation"]
    ],
    whatsappFields: ["Brew method", "Delivery city", "Phone number"],
    whatsappProductLine: "Intermediate • Explore Origins Box (A–F)"
  },

  roast_spectrum_box: {
    name: "Intermediate • Roast Spectrum Box (A–F)",
    badge: "Azerbaijan delivery",
    category: "Tasting Box",
    price: "AZN —",
    oneLine: "Same origin, different roast levels — discover whether you prefer light, medium, or dark roast.",
    bestFor: "moka lovers, milk-drink fans, people unsure about roast, anyone who wants to dial in their preference.",
    learn: "how roast changes sweetness, bitterness, body, and aroma — and which roast fits your taste.",
    inside: [
      ["Coffee samples", "6 samples (A–F), roast spectrum"],
      ["Control idea", "Same origin/process to isolate roast impact"],
      ["Grams per sample", "~18–20g (one guided brew)"],
      ["Printed roast guide", "Simple roast explanations"],
      ["QR link", "Guided brewing + taste + quiz + result"]
    ],
    howItWorks: [
      "Choose your brew method: French Press",
      "Choose your brew method: V60 / Pour-over",
      "Choose your brew method: Moka Pot",
      "Use the same brew method across all roasts",
      "Brew from light → dark in order (recommended)",
      "Taste how acidity drops and roast flavor increases",
      "Mark favorites and take the quiz",
      "Get a recommendation for your best roast range"
    ],
    methods: ["French Press", "V60 / Pour-over", "Moka Pot"],
    tip: "If you drink coffee with milk, pay extra attention to medium-dark and dark samples.",
    delivery: [
      ["Delivery", "Azerbaijan (Baku + regions)"],
      ["Time", "Usually 1–4 days (city dependent)"],
      ["Payment", "Payment link after confirmation"]
    ],
    whatsappFields: ["Brew method", "Delivery city", "Phone number"],
    whatsappProductLine: "Intermediate • Roast Spectrum Box (A–F)"
  },

  starter_bundle: {
    name: "Starter Bundle (Beginner Box + French Press + Filters)",
    badge: "Best value",
    category: "Bundle",
    price: "AZN —",
    oneLine: "Everything you need to start tasting at home — one box + the easiest brewer + essentials.",
    bestFor: "first-time buyers who want the simplest setup, gift buyers, anyone starting from zero.",
    learn: "your taste profile + a repeatable brewing routine.",
    inside: [
      ["Includes", "Beginner • Find Your Taste Box (A–D)"],
      ["Includes", "French Press (350–600ml)"],
      ["Includes", "Filters (if your French Press uses extra filters — optional)"],
      ["Printed taste checklist", "Track what you like"],
      ["QR link", "Guided brewing + taste + quiz + result"]
    ],
    howItWorks: [
      "Order the bundle",
      "When it arrives, start at /start",
      "Use the French Press recipe for all samples",
      "Taste & track, then take the quiz",
      "Use your result to buy beans you’ll love"
    ],
    methods: ["French Press"],
    tip: "This is the easiest way to get consistent results as a beginner.",
    delivery: [
      ["Delivery", "Azerbaijan (Baku + regions)"],
      ["Time", "Usually 1–4 days (city dependent)"],
      ["Payment", "Payment link after confirmation"]
    ],
    whatsappFields: ["Capacity (350/600ml)", "Delivery city", "Phone number"],
    whatsappProductLine: "Starter Bundle (Beginner Box + French Press + Filters)"
  },

  coffee_mug: {
    name: "Coffee Cup / Mug",
    badge: "Gifts & daily use",
    category: "Accessories",
    price: "AZN —",
    oneLine: "A comfortable daily mug that makes tasting nicer — better heat retention and easy sipping.",
    bestFor: "everyday coffee, gifts, tasting sessions at home.",
    learn: "not a learning tool, but it improves the experience (and makes tasting consistent).",
    inside: [
      ["Type", "Ceramic cup/mug (model varies by stock)"],
      ["Why it helps", "Stable temperature = clearer flavor as coffee cools"],
      ["Optional", "Choose color if available"]
    ],
    howItWorks: [
      "Pick your mug style (if options are available)",
      "Use it for your tasting sessions",
      "Notice how coffee changes from hot → warm → cool"
    ],
    methods: ["French Press", "V60 / Pour-over", "Moka Pot"],
    tip: "Thicker ceramic often holds heat better and feels nicer for tasting.",
    delivery: [
      ["Delivery", "Azerbaijan (Baku + regions)"],
      ["Time", "Usually 1–4 days"],
      ["Payment", "Payment link after confirmation"]
    ],
    whatsappFields: ["Color (optional)", "Quantity", "Delivery city", "Phone number"],
    whatsappProductLine: "Coffee Cup / Mug"
  },

  tasting_spoon: {
    name: "Tasting Spoon",
    badge: "Fun + useful",
    category: "Accessories",
    price: "AZN —",
    oneLine: "A small tool that helps you taste like a pro — useful for detecting sweetness and aroma.",
    bestFor: "people using tasting boxes, coffee lovers, small gifts.",
    learn: "how aroma changes perception when you slurp/sip.",
    inside: [
      ["Includes", "1 tasting spoon"],
      ["Why it helps", "Encourages consistent tasting technique"],
      ["Add-on", "Perfect add-on to any tasting box"]
    ],
    howItWorks: [
      "Smell first",
      "Sip/slurp gently to spread coffee across your palate",
      "Notice sweetness, acidity, and aftertaste"
    ],
    methods: ["French Press", "V60 / Pour-over", "Moka Pot"],
    tip: "Even a small change in tasting technique can make flavors easier to notice.",
    delivery: [
      ["Delivery", "Azerbaijan (Baku + regions)"],
      ["Time", "Usually 1–4 days"],
      ["Payment", "Payment link after confirmation"]
    ],
    whatsappFields: ["Quantity", "Delivery city", "Phone number"],
    whatsappProductLine: "Tasting Spoon"
  },

  french_press: {
    name: "French Press (350–600ml)",
    badge: "Best first brewer",
    category: "Equipment",
    price: "AZN —",
    oneLine: "The easiest way to brew at home. Rich and forgiving — perfect for beginners and tasting boxes.",
    bestFor: "beginners, smooth coffee, consistent tasting.",
    learn: "how immersion brewing changes body and sweetness.",
    inside: [
      ["Capacity", "Choose: 350ml or 600ml"],
      ["Works with", "All tasting boxes"],
      ["No filters", "No paper filters required"]
    ],
    howItWorks: [
      "Add coffee + hot water, stir, steep, then plunge slowly",
      "Use our default French Press recipe on the Brew page",
      "Great for comparing samples because it’s consistent"
    ],
    methods: ["French Press"],
    tip: "Serve immediately after plunging to avoid extra bitterness.",
    delivery: [
      ["Delivery", "Azerbaijan (Baku + regions)"],
      ["Time", "Usually 1–4 days"],
      ["Payment", "Payment link after confirmation"]
    ],
    whatsappFields: ["Capacity (350/600ml)", "Quantity", "Delivery city", "Phone number"],
    whatsappProductLine: "French Press (350–600ml)"
  },

  moka_pot: {
    name: "Moka Pot (3-cup)",
    badge: "Bold coffee at home",
    category: "Equipment",
    price: "AZN —",
    oneLine: "A stovetop brewer that makes strong, espresso-like coffee. Great for milk drinks and darker roasts.",
    bestFor: "bold coffee lovers, cappuccino-style drinks, medium/dark roasts.",
    learn: "how pressure brewing changes intensity and bitterness.",
    inside: [
      ["Size", "3-cup moka pot"],
      ["Good for", "Strong coffee + milk drinks"],
      ["Tip", "Use medium-fine grind (not espresso fine)"]
    ],
    howItWorks: [
      "Fill base to the valve (hot water helps)",
      "Fill basket level (no tamp), brew on low-medium heat",
      "Remove from heat when it gurgles to avoid bitterness"
    ],
    methods: ["Moka Pot"],
    tip: "Low heat = sweeter cup. Stop at blonding/gurgle to avoid harshness.",
    delivery: [
      ["Delivery", "Azerbaijan (Baku + regions)"],
      ["Time", "Usually 1–4 days"],
      ["Payment", "Payment link after confirmation"]
    ],
    whatsappFields: ["Quantity", "Delivery city", "Phone number"],
    whatsappProductLine: "Moka Pot (3-cup)"
  },

  coffee_scale: {
    name: "Coffee Scale (0.1g precision)",
    badge: "Best upgrade",
    category: "Tools",
    price: "AZN —",
    oneLine: "If you want coffee to taste consistent, a scale is the #1 tool. It helps repeat recipes and compare samples fairly.",
    bestFor: "anyone brewing V60, improving consistency, tasting boxes.",
    learn: "how small dose/water changes affect strength and bitterness.",
    inside: [
      ["Precision", "0.1g recommended"],
      ["Optional", "Timer is nice-to-have"],
      ["Use for", "Weigh coffee + water for consistent brews"]
    ],
    howItWorks: [
      "Weigh coffee dose (e.g., 15g)",
      "Weigh water (e.g., 250g)",
      "Repeat the same recipe to compare coffees fairly"
    ],
    methods: ["French Press", "V60 / Pour-over", "Moka Pot"],
    tip: "Consistency = better learning. The scale makes tasting boxes much more accurate.",
    delivery: [
      ["Delivery", "Azerbaijan (Baku + regions)"],
      ["Time", "Usually 1–4 days"],
      ["Payment", "Payment link after confirmation"]
    ],
    whatsappFields: ["Quantity", "Delivery city", "Phone number"],
    whatsappProductLine: "Coffee Scale (0.1g)"
  }
};
