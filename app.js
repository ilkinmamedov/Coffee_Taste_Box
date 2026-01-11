/* Coffee Taste Box — multi-page, client-only, no accounts, no server storage.
   Uses sessionStorage only (clears when tab closes). */

window.CTB = (() => {
  const KEY = "ctb_state_v1";

  const defaultState = {
    boxId: "beginner_find_your_taste",
    brewMethod: "french_press",
    sample: "A",
    sampleName: "",
    taste: { like: "love", flavors: [], feels: [], again: "yes", notes: "" },
    quiz: { favs: [], flavors: [] },
    result: null,

    // progress tracking (session-only)
    progress: {
      // completedByBox: { [boxId]: ["A","B",...] }
      completedByBox: {}
    }
  };

  const BOXES = {
    beginner_find_your_taste: {
      label: "Beginner • Find Your Taste",
      samples: ["A","B","C","D"]
    },
    intermediate_explore_origins: {
      label: "Intermediate • Explore Origins",
      samples: ["A","B","C","D","E","F"]
    },
    intermediate_roast_spectrum: {
      label: "Intermediate • Roast Spectrum",
      samples: ["A","B","C","D","E","F"]
    }
  };

  // Sample previews
  const SAMPLE_PREVIEWS = {
    beginner_find_your_taste: {
      A: {
        origin: "Brazil",
        region: "Carmo de Minas, Minas Gerais",
        farm: "Fazenda Santa Inês (Francisco Isidro Pereira / Pereira family)",
        variety: "Red Bourbon",
        altitude: "900–1,050 masl",
        process: "Natural",
        drying: "Sun-dried + mechanical driers (lot-dependent)",
        harvest: "May–September",
        soil: "Clay minerals (reported for Santa Inês lots)",
        roast: "Medium (tasting-kit roast plan)",
        notes: ["milk chocolate", "almond", "soft citrus", "velvety body"],
        bestBrew: ["French Press", "Moka Pot"]
      },
      B: {
        origin: "Colombia",
        region: "Gigante, Huila",
        farm: "Gigante Area Producers (example lot: La Ventolera / community lot)",
        variety: "Caturra, Castillo, Colombia",
        altitude: "1,600–2,000 masl",
        process: "Washed",
        drying: "Typically patio/solar drying (producer-dependent)",
        harvest: "Main: Aug–Dec • Mitaca: Mar–Jun (Huila)",
        soil: "Volcanic soils are common in Huila (region characteristic)",
        roast: "Medium (tasting-kit roast plan)",
        notes: ["baker’s chocolate", "citrus", "honey", "juicy"],
        bestBrew: ["V60 / Pour-over", "French Press"]
      },
      C: {
        origin: "Ethiopia",
        region: "Kochere, Yirgacheffe (SNNPR/Sidama-adjacent classifications vary by exporter)",
        farm: "Smallholder producers (Kochere area)",
        variety: "Indigenous Heirloom",
        altitude: "1,798–1,996 masl",
        process: "Fully Washed",
        drying: "Sun-dried on raised beds",
        harvest: "September–December",
        soil: "Iron-rich, acidic soils (noted for Kochere/Yirgacheffe profile)",
        roast: "Light (tasting-kit roast plan)",
        notes: ["coffee flower", "citrus", "fruit tea", "clean finish"],
        bestBrew: ["V60 / Pour-over", "French Press"]
      },
      D: {
        origin: "Guatemala",
        region: "Huehuetenango",
        farm: "Finca El Injertal",
        variety: "Caturra, Mundo Novo",
        altitude: "1,185–1,645 masl",
        process: "Fully Washed",
        drying: "Sun-dried on patios",
        harvest: "December–March",
        soil: "Mountain highland terroir (soil varies by parcel)",
        roast: "Medium-Dark (tasting-kit roast plan)",
        notes: ["caramel", "tangerine", "sweet citrus"],
        bestBrew: ["French Press", "Moka Pot", "Pour-over"]
      }
    },

    intermediate_explore_origins: {
      A: {
        origin: "Brazil",
        region: "Carmo de Minas, Minas Gerais",
        farm: "Fazenda Santa Inês",
        variety: "Red Bourbon",
        altitude: "900–1,050 masl",
        process: "Natural",
        drying: "Sun-dried + mechanical driers (lot-dependent)",
        harvest: "May–September",
        soil: "Clay minerals (reported for Santa Inês lots)",
        roast: "Medium (constant across this box)",
        notes: ["milk chocolate", "almond", "soft citrus"],
        bestBrew: ["French Press", "Moka Pot"]
      },
      B: {
        origin: "Colombia",
        region: "Gigante, Huila",
        farm: "Gigante Area Producers (example lot: La Ventolera / community lot)",
        variety: "Caturra, Castillo, Colombia",
        altitude: "1,600–2,000 masl",
        process: "Washed",
        drying: "Typically patio/solar drying (producer-dependent)",
        harvest: "Main: Aug–Dec • Mitaca: Mar–Jun (Huila)",
        soil: "Volcanic soils are common in Huila (region characteristic)",
        roast: "Medium (constant across this box)",
        notes: ["baker’s chocolate", "citrus", "honey"],
        bestBrew: ["V60 / Pour-over", "French Press"]
      },
      C: {
        origin: "Ethiopia",
        region: "Kochere, Yirgacheffe",
        farm: "Smallholder producers (Kochere area)",
        variety: "Indigenous Heirloom",
        altitude: "1,798–1,996 masl",
        process: "Fully Washed",
        drying: "Sun-dried on raised beds",
        harvest: "September–December",
        soil: "Iron-rich, acidic soils (noted for Kochere/Yirgacheffe profile)",
        roast: "Medium (constant across this box)",
        notes: ["floral", "lemon", "tea-like"],
        bestBrew: ["V60 / Pour-over", "French Press"]
      },
      D: {
        origin: "Kenya",
        region: "Nyeri, Central Kenya (Mukurweini)",
        farm: "Mutitu Washing Station (750+ farmers)",
        variety: "SL28, SL34",
        altitude: "1,500–1,800 masl",
        process: "Fully Washed",
        drying: "Raised beds / station drying (standard washed Kenya workflow)",
        harvest: "May–July (early) • Oct–Dec (late)",
        soil: "Highland terroir (soil varies by farm plots)",
        roast: "Medium (constant across this box)",
        notes: ["red currant", "citrus", "juicy acidity"],
        bestBrew: ["V60 / Pour-over", "French Press"]
      },
      E: {
        origin: "Guatemala",
        region: "Huehuetenango",
        farm: "Finca El Injertal",
        variety: "Caturra, Mundo Novo",
        altitude: "1,185–1,645 masl",
        process: "Fully Washed",
        drying: "Sun-dried on patios",
        harvest: "December–March",
        soil: "Mountain highland terroir (soil varies by parcel)",
        roast: "Medium (constant across this box)",
        notes: ["caramel", "tangerine", "sweet"],
        bestBrew: ["Pour-over", "French Press"]
      },
      F: {
        origin: "Costa Rica",
        region: "Central Valley (Poás Volcano area)",
        farm: "Hacienda Sonora",
        variety: "Red Catuai",
        altitude: "1,100–1,600 masl",
        process: "Honey",
        drying: "Honey-processed drying (mucilage-on drying; method varies by micromill)",
        harvest: "Nov–Jan (Sonora harvest period reported for lots)",
        soil: "Volcanic influence (Poás Volcano area)",
        roast: "Medium (constant across this box)",
        notes: ["panela sugar", "toffee", "red apple", "milk chocolate"],
        bestBrew: ["V60 / Pour-over", "French Press"]
      }
    },

    intermediate_roast_spectrum: {
      A: {
        origin: "Costa Rica",
        region: "Central Valley (Poás Volcano area)",
        farm: "Hacienda Sonora",
        variety: "Red Catuai",
        altitude: "1,100–1,600 masl",
        process: "Honey",
        drying: "Honey-processed drying (mucilage-on)",
        harvest: "Nov–Jan",
        soil: "Volcanic influence (Poás Volcano area)",
        roast: "Light",
        notes: ["bright sweetness", "apple", "clean finish"],
        bestBrew: ["V60 / Pour-over"]
      },
      B: {
        origin: "Costa Rica",
        region: "Central Valley (Poás Volcano area)",
        farm: "Hacienda Sonora",
        variety: "Red Catuai",
        altitude: "1,100–1,600 masl",
        process: "Honey",
        drying: "Honey-processed drying (mucilage-on)",
        harvest: "Nov–Jan",
        soil: "Volcanic influence (Poás Volcano area)",
        roast: "Light-Medium",
        notes: ["sweet", "toffee", "balanced"],
        bestBrew: ["V60 / Pour-over", "French Press"]
      },
      C: {
        origin: "Costa Rica",
        region: "Central Valley (Poás Volcano area)",
        farm: "Hacienda Sonora",
        variety: "Red Catuai",
        altitude: "1,100–1,600 masl",
        process: "Honey",
        drying: "Honey-processed drying (mucilage-on)",
        harvest: "Nov–Jan",
        soil: "Volcanic influence (Poás Volcano area)",
        roast: "Medium",
        notes: ["panela", "milk chocolate", "round body"],
        bestBrew: ["French Press", "V60 / Pour-over"]
      },
      D: {
        origin: "Costa Rica",
        region: "Central Valley (Poás Volcano area)",
        farm: "Hacienda Sonora",
        variety: "Red Catuai",
        altitude: "1,100–1,600 masl",
        process: "Honey",
        drying: "Honey-processed drying (mucilage-on)",
        harvest: "Nov–Jan",
        soil: "Volcanic influence (Poás Volcano area)",
        roast: "Medium-Dark",
        notes: ["cocoa", "heavier body", "lower acidity"],
        bestBrew: ["French Press", "Moka Pot"]
      },
      E: {
        origin: "Costa Rica",
        region: "Central Valley (Poás Volcano area)",
        farm: "Hacienda Sonora",
        variety: "Red Catuai",
        altitude: "1,100–1,600 masl",
        process: "Honey",
        drying: "Honey-processed drying (mucilage-on)",
        harvest: "Nov–Jan",
        soil: "Volcanic influence (Poás Volcano area)",
        roast: "Dark",
        notes: ["bold", "roasty", "chocolate"],
        bestBrew: ["Moka Pot", "French Press"]
      },
      F: {
        origin: "Costa Rica",
        region: "Central Valley (Poás Volcano area)",
        farm: "Hacienda Sonora",
        variety: "Red Catuai",
        altitude: "1,100–1,600 masl",
        process: "Honey",
        drying: "Honey-processed drying (mucilage-on)",
        harvest: "Nov–Jan",
        soil: "Volcanic influence (Poás Volcano area)",
        roast: "Very Dark",
        notes: ["intense", "smokier", "very low acidity"],
        bestBrew: ["Moka Pot"]
      }
    }
  };

  const RECIPES = {
    french_press: {
      name: "French Press – Tasting Brew",
      difficulty: "Beginner",
      timerDefaultSec: 240,
      summary: [
        ["Coffee", "15 g"],
        ["Water", "250 g"],
        ["Grind", "Medium-coarse (breadcrumbs)"],
        ["Water temp", "Boil, then wait 60 seconds"],
        ["Total time", "~4:00"]
      ],
      steps: [
        { title:"Preheat", instruction:"Rinse the French press with hot water.", why:"Keeps brew temperature stable.", sec:15 },
        { title:"Add coffee", instruction:"Add 15g ground coffee.", why:"Correct dose for clear flavor." },
        { title:"Pour water", instruction:"Pour all 250g of hot water and start timer.", why:"Full immersion extracts evenly." },
        { title:"Stir gently", instruction:"Stir 2–3 times gently.", why:"Wets all grounds evenly.", sec:10 },
        { title:"Steep", instruction:"Place lid on and wait.", why:"Allows balanced extraction.", sec:240 },
        { title:"Plunge", instruction:"Press down slowly over 15–20 seconds.", why:"Avoids bitterness." },
        { title:"Serve", instruction:"Serve immediately.", why:"Prevents over-extraction after brewing." }
      ],
      variations: [
        { label:"Stronger", change:"Reduce water to 225g", note:"More strength, similar balance." },
        { label:"Lighter", change:"Increase water to 270g", note:"Milder cup." },
        { label:"No scale", change:"3 tbsp coffee + 1 full mug water", note:"Less precise, still enjoyable." }
      ]
    },
    v60: {
      name: "V60 – Beginner Single Cup",
      difficulty: "Intermediate",
      timerDefaultSec: 210,
      summary: [
        ["Coffee", "15 g"],
        ["Water", "250 g"],
        ["Grind", "Medium-fine (table salt)"],
        ["Water temp", "92–96°C (boil then wait ~45–60s)"],
        ["Total time", "2:30–3:30"]
      ],
      steps: [
        { title:"Rinse filter", instruction:"Rinse filter with hot water; discard rinse water.", why:"Removes papery taste and preheats.", sec:20 },
        { title:"Add coffee", instruction:"Add 15g coffee; shake to level.", why:"Creates an even bed for water flow." },
        { title:"Bloom", instruction:"Pour to 60g, then wait.", why:"Even wetting; releases trapped gas.", sec:30 },
        { title:"Pour to 180g", instruction:"Pour steadily in circles, avoiding the edges.", why:"Even flow reduces channeling.", sec:30 },
        { title:"Pour to 250g", instruction:"Finish the pour gently; keep water level steady.", why:"Helps consistent extraction.", sec:30 },
        { title:"Drawdown", instruction:"Let it drip until finished (aim 2:30–3:30).", why:"Too long can taste bitter.", sec:90 }
      ],
      variations: [
        { label:"Stronger", change:"Use 225g water (same steps)", note:"More strength." },
        { label:"Lighter", change:"Use 270g water (same steps)", note:"Milder cup." },
        { label:"No gooseneck", change:"2–3 slow pours close to the bed", note:"Control without special kettle." }
      ]
    },
    moka_pot: {
      name: "Moka Pot – Beginner Friendly",
      difficulty: "Beginner",
      timerDefaultSec: 360,
      summary: [
        ["Coffee", "Fill basket level (no tamp)"],
        ["Water", "To the valve"],
        ["Grind", "Medium-fine (not espresso-fine)"],
        ["Heat", "Low to medium"],
        ["Total time", "~5–8 minutes"]
      ],
      steps: [
        { title:"Add water", instruction:"Fill base with hot water up to the safety valve.", why:"Reduces bitter overheating." },
        { title:"Add coffee", instruction:"Fill basket level; do not tamp; clean rim.", why:"Avoids choking and harsh extraction." },
        { title:"Assemble", instruction:"Assemble tightly (use a towel — it’s hot).", why:"Prevents leaks and keeps pressure consistent." },
        { title:"Heat gently", instruction:"Low-medium heat with lid open.", why:"Slower brew tastes sweeter.", sec:240 },
        { title:"Stop at blonding", instruction:"When it turns pale/gurgles, remove from heat.", why:"Prevents bitter end-extraction." }
      ],
      variations: [
        { label:"Smoother", change:"Use slightly coarser grind", note:"Less harshness." },
        { label:"Milk-friendly", change:"Choose medium to dark roasts", note:"Pairs better with milk." }
      ]
    }
  };

  const qs = (s) => document.querySelector(s);
  const qsa = (s) => Array.from(document.querySelectorAll(s));

  function load(){
    try{
      const raw = sessionStorage.getItem(KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      const st = parsed ? { ...defaultState, ...parsed } : { ...defaultState };

      // ensure nested defaults
      st.taste = { ...defaultState.taste, ...(st.taste || {}) };
      st.quiz  = { ...defaultState.quiz, ...(st.quiz || {}) };
      st.progress = { ...defaultState.progress, ...(st.progress || {}) };
      if(!st.progress.completedByBox) st.progress.completedByBox = {};

      return st;
    }catch(e){
      return { ...defaultState };
    }
  }

  function save(st){ sessionStorage.setItem(KEY, JSON.stringify(st)); }

  function reset(){
    sessionStorage.removeItem(KEY);
    window.location.href = "index.html";
  }

  function initCommon(){
    qsa("[data-reset]").forEach(b => b.addEventListener("click", reset));
  }

  function prettyMethod(m){
    if(m === "french_press") return "French Press";
    if(m === "v60") return "V60 / Pour-over";
    if(m === "moka_pot") return "Moka Pot";
    return m;
  }

  function formatMMSS(sec){
    const m = Math.floor(sec/60);
    const s = sec%60;
    return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  }

  // ---------- PROGRESS HELPERS ----------
  function getAllowedSamples(st){
    return (BOXES[st.boxId] && BOXES[st.boxId].samples) ? BOXES[st.boxId].samples : ["A","B","C","D"];
  }

  function getCompletedForBox(st, boxId){
    const map = st.progress?.completedByBox || {};
    const arr = map[boxId] || [];
    return Array.isArray(arr) ? arr : [];
  }

  function isSampleCompleted(st, sampleLabel){
    const done = new Set(getCompletedForBox(st, st.boxId));
    return done.has(sampleLabel);
  }

  function markSampleCompleted(st, sampleLabel){
    const boxId = st.boxId;
    if(!st.progress) st.progress = { completedByBox: {} };
    if(!st.progress.completedByBox) st.progress.completedByBox = {};

    const current = new Set(getCompletedForBox(st, boxId));
    current.add(sampleLabel);
    st.progress.completedByBox[boxId] = Array.from(current);
    return st;
  }

  function nextSampleLabel(st){
    const allowed = getAllowedSamples(st);
    const idx = allowed.indexOf(st.sample);
    return allowed[(idx + 1) % allowed.length];
  }

  function renderSampleProgressUI(st){
    // Setup page elements
    const pillCurrent = qs("#currentSamplePill");
    const pillNext = qs("#nextSamplePill");
    const prog = qs("#sampleProgress");

    const allowed = getAllowedSamples(st);
    const completed = new Set(getCompletedForBox(st, st.boxId));
    const next = nextSampleLabel(st);

    if(pillCurrent) pillCurrent.textContent = `Current: ${st.sample}`;
    if(pillNext) pillNext.textContent = `Next: ${next}`;

    if(prog){
      prog.innerHTML = allowed.map(s => {
        const done = completed.has(s);
        const isNow = (s === st.sample);
        return `
          <div class="sample-dot ${done ? "is-done":""} ${isNow ? "is-now":""}" title="Sample ${s}">
            ${s}
          </div>
        `;
      }).join("");
    }

    // completed counter (Setup)
    const setupCount = qs("#setupCompletedCount");
    if(setupCount){
      setupCount.textContent = `You’ve completed ${completed.size}/${allowed.length} samples`;
    }

    // completed counter (Quiz)
    const quizCount = qs("#quizCompletedCount");
    if(quizCount){
      quizCount.textContent = `${completed.size}/${allowed.length} samples`;
    }
  }

  // ---------- BOX PAGE ----------
  function initBoxPage(){
    initCommon();
    const st = load();

    qsa(".pick-card").forEach(card => {
      const is = card.dataset.box === st.boxId;
      card.classList.toggle("is-active", is);
    });

    function renderPreview(){
      const boxId = st.boxId;
      const samples = SAMPLE_PREVIEWS[boxId];
      const wrap = qs("#boxPreview");
      if(!wrap) return;
      wrap.innerHTML = Object.entries(samples).map(([label, s]) => `
        <div class="card subtle">
          <div class="badge">Sample ${label}</div>
          <h4 class="h4" style="margin-top:10px;">${s.origin} • ${s.roast}</h4>

          <div class="summary-row"><div class="summary-k">Region</div><div class="summary-v">${s.region || "—"}</div></div>
          <div class="summary-row"><div class="summary-k">Altitude</div><div class="summary-v">${s.altitude || "—"}</div></div>
          <div class="summary-row"><div class="summary-k">Process</div><div class="summary-v">${s.process || "—"}</div></div>
          <div class="summary-row"><div class="summary-k">Variety</div><div class="summary-v">${s.variety || "—"}</div></div>
          <div class="summary-row"><div class="summary-k">Farm</div><div class="summary-v">${s.farm || "—"}</div></div>

          <p class="muted small" style="margin-top:10px;">Notes: ${Array.isArray(s.notes) ? s.notes.join(", ") : "—"}</p>
        </div>
      `).join("");
    }

    qsa(".pick-card").forEach(card => {
      card.addEventListener("click", () => {
        qsa(".pick-card").forEach(c => c.classList.remove("is-active"));
        card.classList.add("is-active");
        st.boxId = card.dataset.box;

        const allowed = BOXES[st.boxId].samples;
        if(!allowed.includes(st.sample)) st.sample = allowed[0];

        save(st);
        renderPreview();
      });
    });

    renderPreview();
    save(st);
  }

  // ---------- SETUP PAGE ----------
  function initSetupPage(){
    initCommon();
    const st = load();

    const boxBadge = qs("#boxBadge");
    if(boxBadge) boxBadge.textContent = BOXES[st.boxId].label;

    // Brew method radio
    qsa("input[name='brewMethod']").forEach(r => {
      r.checked = (r.value === st.brewMethod);
      r.addEventListener("change", () => {
        st.brewMethod = r.value;
        save(st);
      });
    });

    const row = qs("#sampleRow");
    const hint = qs("#sampleHint");
    const details = qs("#sampleDetails");
    const allowed = getAllowedSamples(st);

    if(hint){
      hint.textContent = allowed.length === 4 ? "This box uses A–D." : "This box uses A–F.";
    }

    // ensure valid sample
    if(!allowed.includes(st.sample)) st.sample = allowed[0];

    function renderSampleButtons(){
      if(!row) return;

      row.innerHTML = allowed.map(label => {
        const done = isSampleCompleted(st, label);
        return `
          <button class="sample-btn ${label===st.sample ? "is-active":""} ${done ? "is-done":""}"
                  data-sample="${label}">
            ${label}
          </button>
        `;
      }).join("");

      qsa("#sampleRow .sample-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          qsa("#sampleRow .sample-btn").forEach(b => b.classList.remove("is-active"));
          btn.classList.add("is-active");
          st.sample = btn.dataset.sample;
          save(st);
          renderSampleDetails();
          renderSampleProgressUI(st);
          renderSampleButtons(); // keep done/current styles consistent
        });
      });
    }

    function renderSampleDetails(){
      const info = SAMPLE_PREVIEWS[st.boxId]?.[st.sample];
      if(!details) return;
      if(!info){
        details.innerHTML = `<p class="muted">No details available yet.</p>`;
        return;
      }
      details.innerHTML = `
        <div class="summary-row"><div class="summary-k">Origin</div><div class="summary-v">${info.origin || "—"}</div></div>
        <div class="summary-row"><div class="summary-k">Region</div><div class="summary-v">${info.region || "—"}</div></div>
        <div class="summary-row"><div class="summary-k">Farm / Station</div><div class="summary-v">${info.farm || "—"}</div></div>
        <div class="summary-row"><div class="summary-k">Variety</div><div class="summary-v">${info.variety || "—"}</div></div>
        <div class="summary-row"><div class="summary-k">Altitude</div><div class="summary-v">${info.altitude || "—"}</div></div>
        <div class="summary-row"><div class="summary-k">Process</div><div class="summary-v">${info.process || "—"}</div></div>
        <div class="summary-row"><div class="summary-k">Roast</div><div class="summary-v">${info.roast || "—"}</div></div>
        <div class="summary-row"><div class="summary-k">Best brew</div><div class="summary-v">${(info.bestBrew || []).join(", ") || "—"}</div></div>
        <div class="summary-row"><div class="summary-k">Notes</div><div class="summary-v">${(info.notes || []).join(", ") || "—"}</div></div>
      `;
    }

    // Sample name
    const sampleName = qs("#sampleName");
    if(sampleName){
      sampleName.value = st.sampleName || "";
      sampleName.addEventListener("input", () => {
        st.sampleName = sampleName.value.trim();
        save(st);
      });
    }

    save(st);
    renderSampleButtons();
    renderSampleDetails();
    renderSampleProgressUI(st);
  }

  // ---------- BREW PAGE ----------
  function initBrewPage(){
    initCommon();
    const st = load();

    const mb = qs("#methodBadge");
    const sb = qs("#sampleBadge");
    if(mb) mb.textContent = prettyMethod(st.brewMethod);
    if(sb) sb.textContent = `Sample ${st.sample}${st.sampleName ? " • " + st.sampleName : ""}`;

    const r = RECIPES[st.brewMethod] || RECIPES.french_press;

    const summary = qs("#recipeSummary");
    if(summary){
      summary.innerHTML = `
        <div class="summary-row"><div class="summary-k">Recipe</div><div class="summary-v">${r.name}</div></div>
        <div class="summary-row"><div class="summary-k">Difficulty</div><div class="summary-v">${r.difficulty}</div></div>
        ${r.summary.map(([k,v]) => `<div class="summary-row"><div class="summary-k">${k}</div><div class="summary-v">${v}</div></div>`).join("")}
      `;
    }

    const vars = qs("#recipeVariations");
    if(vars){
      vars.innerHTML = `
        <h3 class="h4">Optional variations</h3>
        ${r.variations.map(v => `
          <div class="variation">
            <div><strong>${v.label}</strong><div class="muted">${v.change}</div></div>
            <div class="muted">${v.note}</div>
          </div>
        `).join("")}
      `;
    }

    const steps = qs("#stepsList");
    if(steps){
      steps.innerHTML = r.steps.map((s, i) => `
        <li class="step ${i===0 ? "is-open":""}" data-step="${i}" style="animation-delay:${i*55}ms">
          <div class="step-title">${i+1}. ${s.title}</div>
          <div class="muted">${s.instruction}</div>
          ${s.sec ? `<div class="step-time muted small">Time: ${formatMMSS(s.sec)}</div>` : `<div class="step-time muted small"></div>`}
          <div class="step-why"><strong>Why:</strong> ${s.why}</div>
        </li>
      `).join("");

      qsa("#stepsList .step").forEach(li => {
        li.addEventListener("click", () => {
          qsa("#stepsList .step").forEach(x => x.classList.remove("is-open"));
          li.classList.add("is-open");
        });
      });
    }

    // timer
    let remaining = r.timerDefaultSec;
    let interval = null;
    const readout = qs("#timerReadout");
    const setReadout = () => { if(readout) readout.textContent = formatMMSS(remaining); };
    setReadout();

    const start = qs("#timerStart");
    const pause = qs("#timerPause");
    const resetBtn = qs("#timerReset");

    if(start) start.addEventListener("click", () => {
      if(interval) return;
      interval = setInterval(() => {
        remaining = Math.max(0, remaining - 1);
        setReadout();
        if(remaining === 0){
          clearInterval(interval);
          interval = null;
        }
      }, 1000);
    });

    if(pause) pause.addEventListener("click", () => {
      if(interval){ clearInterval(interval); interval = null; }
    });

    if(resetBtn) resetBtn.addEventListener("click", () => {
      if(interval){ clearInterval(interval); interval = null; }
      remaining = r.timerDefaultSec;
      setReadout();
    });
  }

  // ---------- TASTE PAGE ----------
  function initTastePage(){
    initCommon();
    const st = load();

    const tasteSample = qs("#tasteSample");
    const tasteMethod = qs("#tasteMethod");
    if(tasteSample) tasteSample.textContent = `Sample ${st.sample}${st.sampleName ? " • " + st.sampleName : ""}`;
    if(tasteMethod) tasteMethod.textContent = prettyMethod(st.brewMethod);

    // Like segmented
    const likeButtons = qsa("#likeSeg .seg-btn");
    likeButtons.forEach(btn => {
      btn.classList.toggle("is-active", btn.dataset.like === st.taste.like);
      btn.addEventListener("click", () => {
        likeButtons.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        st.taste.like = btn.dataset.like;
        save(st);
      });
    });

    // Again segmented
    const againButtons = qsa("#againSeg .seg-btn");
    againButtons.forEach(btn => {
      btn.classList.toggle("is-active", btn.dataset.again === st.taste.again);
      btn.addEventListener("click", () => {
        againButtons.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        st.taste.again = btn.dataset.again;
        save(st);
      });
    });

    // Mark completed button
    const markBtn = qs("#markCompletedBtn");
    if(markBtn){
      const doneAlready = isSampleCompleted(st, st.sample);
      if(doneAlready){
        markBtn.textContent = "Completed ✓";
        markBtn.disabled = true;
      }

      markBtn.addEventListener("click", () => {
        const st2 = load();
        markSampleCompleted(st2, st2.sample);
        save(st2);

        markBtn.textContent = "Completed ✓";
        markBtn.disabled = true;
      });
    }

    // Flavors (limit 2)
    const flavorNote = qs("#tasteFlavorNote");
    const flavorButtons = qsa("#tasteFlavors .chip-btn");
    const set = new Set(st.taste.flavors || []);
    const updateFlavorUI = () => {
      flavorButtons.forEach(b => b.classList.toggle("is-active", set.has(b.dataset.flavor)));
      if(flavorNote) flavorNote.textContent = `You can pick 2.`;
    };
    updateFlavorUI();

    flavorButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.flavor;
        if(set.has(key)) set.delete(key);
        else {
          if(set.size >= 2){
            if(flavorNote) flavorNote.textContent = "Limit reached (2). Remove one to add another.";
            return;
          }
          set.add(key);
        }
        st.taste.flavors = Array.from(set);
        save(st);
        updateFlavorUI();
      });
    });

    // Feels (no limit)
    const feelButtons = qsa("#tasteFeels .chip-btn");
    const feels = new Set(st.taste.feels || []);
    const updateFeelsUI = () => feelButtons.forEach(b => b.classList.toggle("is-active", feels.has(b.dataset.feel)));
    updateFeelsUI();

    feelButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.feel;
        if(feels.has(key)) feels.delete(key); else feels.add(key);
        st.taste.feels = Array.from(feels);
        save(st);
        updateFeelsUI();
      });
    });

    // Notes
    const notes = qs("#tasteNotes");
    if(notes){
      notes.value = st.taste.notes || "";
      notes.addEventListener("input", () => {
        st.taste.notes = notes.value;
        save(st);
      });
    }
  }

  // ---------- QUIZ PAGE ----------
  function initQuizPage(){
    initCommon();
    const st = load();

    const allowed = getAllowedSamples(st);
    const completed = getCompletedForBox(st, st.boxId);
    const completedSet = new Set(completed);

    // Completed counter (if quiz.html has it)
    const quizCount = qs("#quizCompletedCount");
    if(quizCount){
      quizCount.textContent = `${completed.length}/${allowed.length} samples`;
    }

    // Build favorite chips:
    // - If completed samples exist: show only those
    // - If none completed: show all allowed
    const favWrap = qs("#favChips");
    const favNote = qs("#favNote");
    const favHelp = qs("#favHelp");

    const favOptions = completed.length ? completed : allowed;

    if(favWrap){
      favWrap.innerHTML = favOptions.map(s => {
        const done = completedSet.has(s);
        const now = s === st.sample;
        return `<button class="chip-btn ${done ? "is-done" : ""} ${now ? "is-now" : ""}" data-fav="${s}">${s}</button>`;
      }).join("");
    }

    if(favHelp){
      favHelp.textContent = completed.length
        ? "Pick up to 2 from the samples you tasted. (Optional.)"
        : "You haven’t marked any samples completed yet. You can skip this question, or come back after tasting 1–2 coffees.";
    }

    const favs = new Set(st.quiz.favs || []);
    // remove favs that aren't in allowed samples
    for(const x of Array.from(favs)){
      if(!allowed.includes(x)) favs.delete(x);
    }
    st.quiz.favs = Array.from(favs);
    save(st);

    function updateFavUI(){
      qsa("#favChips .chip-btn").forEach(b => b.classList.toggle("is-active", favs.has(b.dataset.fav)));
      if(favNote){
        favNote.textContent = favs.size >= 2 ? "Limit reached (2). Remove one to add another." : "Pick up to 2 (optional).";
      }
    }
    updateFavUI();

    qsa("#favChips .chip-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.fav;
        if(favs.has(key)) favs.delete(key);
        else {
          if(favs.size >= 2){
            if(favNote) favNote.textContent = "Limit reached (2). Remove one to add another.";
            return;
          }
          favs.add(key);
        }
        st.quiz.favs = Array.from(favs);
        save(st);
        updateFavUI();
      });
    });

    // Skip favorites (no reload)
    const skipFavsBtn = qs("#skipFavsBtn");
    if(skipFavsBtn){
      skipFavsBtn.addEventListener("click", () => {
        favs.clear();
        st.quiz.favs = [];
        save(st);
        updateFavUI();
      });
    }

    // Flavors (limit 3, optional)
    const qflavors = new Set(st.quiz.flavors || []);
    const flavorNote = qs("#flavorNote");

    function updateFlavorUI(){
      qsa("#quizFlavors .chip-btn").forEach(b => b.classList.toggle("is-active", qflavors.has(b.dataset.qflavor)));
      if(flavorNote){
        flavorNote.textContent = qflavors.size >= 3 ? "Limit reached (3). Remove one to add another." : "Pick up to 3 (optional).";
      }
    }
    updateFlavorUI();

    qsa("#quizFlavors .chip-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.qflavor;
        if(qflavors.has(key)) qflavors.delete(key);
        else{
          if(qflavors.size >= 3){
            if(flavorNote) flavorNote.textContent = "Limit reached (3). Remove one to add another.";
            return;
          }
          qflavors.add(key);
        }
        st.quiz.flavors = Array.from(qflavors);
        save(st);
        updateFlavorUI();
      });
    });

    // Skip flavors (no reload)
    const skipFlavorsBtn = qs("#skipFlavorsBtn");
    if(skipFlavorsBtn){
      skipFlavorsBtn.addEventListener("click", () => {
        qflavors.clear();
        st.quiz.flavors = [];
        save(st);
        updateFlavorUI();
      });
    }

    // compute result
    const btn = qs("#getResult");
    if(btn){
      btn.addEventListener("click", () => {
        const feelBest = (qs("input[name='feelBest']:checked") || {}).value || "not_sure";
        const roastBest = (qs("input[name='roastBest']:checked") || {}).value || "not_sure";
        const milkSugar = (qs("input[name='milkSugar']:checked") || {}).value || "black";
        const methodPref = (qs("input[name='methodPref']:checked") || {}).value || "not_sure";

        const result = computeRecommendation({
          favs: Array.from(favs),
          flavors: Array.from(qflavors),
          feelBest, roastBest, milkSugar, methodPref,
          completedCount: completed.length,
          totalCount: allowed.length
        });

        st.result = result;
        save(st);
        window.location.href = "result.html";
      });
    }
  }

  function computeRecommendation(input){
    let comfort=0, bright=0, bold=0, earthy=0;

    const wFlavor = {
      chocolatey:{comfort:2},
      nutty:{comfort:2},
      sweet:{comfort:1},
      fruity:{bright:2},
      floral:{bright:2},
      citrusy:{bright:2},
      roasty:{bold:2},
      earthy:{bold:1, earthy:1}
    };

    (input.flavors || []).forEach(f => {
      const w = wFlavor[f] || {};
      comfort += w.comfort||0;
      bright  += w.bright||0;
      bold    += w.bold||0;
      earthy  += w.earthy||0;
    });

    const wFeel = {
      smooth_comforting:{comfort:3},
      clean_bright:{bright:3},
      strong_bold:{bold:3},
      curious_unusual:{bright:1, earthy:2},
      not_sure:{}
    };
    const wf = wFeel[input.feelBest] || {};
    comfort += wf.comfort||0; bright += wf.bright||0; bold += wf.bold||0; earthy += wf.earthy||0;

    let roast = "Medium";
    if(input.roastBest === "light") roast = "Light to Light-Medium";
    if(input.roastBest === "medium") roast = "Medium";
    if(input.roastBest === "dark") roast = "Medium-Dark to Dark";

    if(input.milkSugar === "milk" || input.milkSugar === "milk_sugar"){
      if(input.roastBest === "not_sure") roast = "Medium to Medium-Dark";
      bold += 1; comfort += 1;
    }
    if(input.milkSugar === "sugar" || input.milkSugar === "milk_sugar"){
      bold += 1;
    }

    const scores = {comfort, bright, bold, earthy};
    const sorted = Object.entries(scores).sort((a,b)=>b[1]-a[1]);
    let style = sorted[0][0];

    if(sorted[1] && sorted[0][1] === sorted[1][1]){
      if(input.feelBest === "smooth_comforting") style = "comfort";
      else if(input.feelBest === "clean_bright") style = "bright";
      else if(input.feelBest === "strong_bold") style = "bold";
      else if(input.feelBest === "curious_unusual") style = "earthy";
      else style = "comfort";
    }

    if(input.roastBest === "not_sure"){
      roast = ({
        bright:"Light to Light-Medium",
        comfort:"Medium",
        bold:"Medium-Dark to Dark",
        earthy:"Light-Medium to Medium"
      })[style] || "Medium";
    }

    const originMap = {
      comfort:["Brazil","Colombia","Guatemala","El Salvador"],
      bright:["Ethiopia","Kenya","Rwanda","Burundi"],
      bold:["Indonesia","India","Brazil"],
      earthy:["Ethiopia (Natural)","Costa Rica (Honey)","Colombia (Experimental)"]
    };
    const methodMap = {
      comfort:["French Press","Moka Pot"],
      bright:["V60 / Pour-over","French Press"],
      bold:["Moka Pot","French Press"],
      earthy:["V60 / Pour-over","French Press"]
    };
    const nextBoxMap = {
      comfort:"Explore Origins (Medium Roast)",
      bright:"Explore Origins (Light Roast)",
      bold:"Roast Spectrum",
      earthy:"Processing Discovery"
    };
    const summaryMap = {
      comfort:{title:"Balanced & Sweet", summary:"You enjoy smooth coffee with sweet, chocolatey flavors."},
      bright:{title:"Bright & Fruity", summary:"You enjoy clean, lively coffee with fruity or floral notes."},
      bold:{title:"Bold & Roasty", summary:"You enjoy strong coffee with deep cocoa and roasty intensity."},
      earthy:{title:"Adventurous & Funky", summary:"You enjoy unusual sweetness and interesting, experimental flavors."}
    };

    let methods = methodMap[style].slice();
    if(input.methodPref && input.methodPref !== "not_sure"){
      const pref = prettyMethod(input.methodPref);
      methods = [pref, ...methods.filter(m => m !== pref)];
    }

    // Confidence (includes progress)
    let conf = 0;
    if((input.favs || []).length >= 1) conf += 0.20;
    if((input.favs || []).length >= 2) conf += 0.10;
    if((input.flavors || []).length >= 2) conf += 0.20;
    if(input.roastBest !== "not_sure") conf += 0.20;
    if(input.feelBest !== "not_sure") conf += 0.20;

    const completedCount = Number(input.completedCount || 0);
    const totalCount = Number(input.totalCount || 0);
    if(totalCount > 0){
      const ratio = completedCount / totalCount;
      conf += Math.min(0.30, ratio * 0.30);
    }

    conf = Math.min(1, conf);

    let confLabel="Medium", confNote="This is our best guess based on your answers.";
    if(conf >= 0.75){ confLabel="High"; confNote="We’re confident based on your answers."; }
    else if(conf < 0.5){
      confLabel="Low";
      confNote = completedCount >= 2
        ? "Try the quiz again after tasting 1–2 more coffees for a clearer result."
        : "Taste at least 2 coffees, then try the quiz again for a clearer result.";
    }

    return {
      title: summaryMap[style].title,
      summary: summaryMap[style].summary,
      origins: originMap[style].join(", "),
      roast,
      methods: methods.join(", "),
      nextBox: nextBoxMap[style],
      confidence: conf,
      confidenceLabel: confLabel,
      confidenceNote: confNote
    };
  }

  // ---------- RESULT PAGE ----------
  function initResultPage(){
    initCommon();
    const st = load();
    const r = st.result;

    if(!r){
      window.location.href = "quiz.html";
      return;
    }

    const setText = (id, v) => { const el = qs(id); if(el) el.textContent = v; };

    setText("#rTitle", r.title);
    setText("#rSummary", r.summary);
    setText("#rOrigins", r.origins);
    setText("#rRoast", r.roast);
    setText("#rMethods", r.methods);
    setText("#rNext", r.nextBox);
    setText("#rConfLabel", r.confidenceLabel);
    setText("#rConfNote", r.confidenceNote);

    const bar = qs("#rConfBar");
    if(bar) bar.style.width = `${Math.round((r.confidence||0.7)*100)}%`;

    const nextBtn = qs("#nextSampleBtn");
    if(nextBtn){
      nextBtn.addEventListener("click", () => {
        const st2 = load();
        const allowed = getAllowedSamples(st2);
        const idx = allowed.indexOf(st2.sample);
        const next = allowed[(idx + 1) % allowed.length];

        st2.sample = next;
        st2.sampleName = "";
        st2.taste = { like: "love", flavors: [], feels: [], again: "yes", notes: "" };

        save(st2);
        window.location.href = "setup.html";
      });
    }

    const printBtn = qs("#printBtn");
    if(printBtn) printBtn.addEventListener("click", () => window.print());
  }

  return {
    initCommon,
    initBoxPage,
    initSetupPage,
    initBrewPage,
    initTastePage,
    initQuizPage,
    initResultPage,
    BOXES
  };
})();

// Global reset buttons
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-reset]").forEach(btn => {
    btn.addEventListener("click", () => {
      sessionStorage.removeItem("ctb_state_v1");
      window.location.href = "index.html";
    });
  });
});
