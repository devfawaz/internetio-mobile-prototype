/* internet.io mobile prototype — hash-routed single page app */

(() => {
  "use strict";

  // ── Content ───────────────────────────────────────────────

  const DEFAULT_QUERY = "what is design system?";
  const PROFILE_COLORS = ["#1b51aa", "#039286", "#706aff"];

  const DS_OVERVIEW = `
    <p>A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications. It serves as a single source of truth for teams, ensuring consistency and efficiency in design and development processes.</p>
    <h4>Key Components of a Design System:</h4>
    <ol>
      <li><strong>UI Components:</strong> These are the building blocks of a design system, including buttons, forms, icons, and other interface elements. They are designed to be reusable and adaptable across different projects.</li>
      <li><strong>Design Guidelines:</strong> These guidelines provide instructions on how to use the components effectively. They cover aspects such as color schemes, typography, spacing, and layout principles.</li>
      <li><strong>Documentation:</strong> Comprehensive documentation is crucial for a design system. It includes detailed descriptions of components, usage examples, and best practices to ensure that all team members can implement the system correctly.</li>
      <li><strong>Tools and Resources:</strong> A design system often includes tools and resources that facilitate the design and development process, such as design templates, code snippets, and integration guides.</li>
    </ol>
    <h4>Benefits of a Design System:</h4>
    <ol>
      <li><strong>Consistency:</strong> By using a standardized set of components and guidelines, design systems ensure a consistent user experience across different platforms and products.</li>
      <li><strong>Efficiency:</strong> Design systems streamline the design and development process, reducing the time and effort required to create new applications or features.</li>
      <li><strong>Collaboration:</strong> With a shared framework, teams can collaborate more effectively, as everyone is working from the same set of standards and resources.</li>
    </ol>
    <p>In conclusion, a design system is an essential tool for modern design and development teams, providing a structured approach to creating cohesive and efficient digital products.</p>`;

  const MODELS = [
    {
      key: "openai", name: "Open AI", id: "gpt-4o", icon: "assets/icons/openai.svg",
      title: "Understanding Design Systems: A Comprehensive Overview",
      summary: "A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications. It serves as a single source of truth for teams, ensuring consistency and efficiency in design and development processes.",
      body: DS_OVERVIEW,
    },
    {
      key: "meta", name: "Meta AI", id: "meta-llama-3.1", icon: "assets/icons/meta.svg",
      title: "Understanding Design Systems: A Comprehensive Guide",
      summary: "A design system is a unified collection of reusable components, guidelines, and assets that help create a consistent visual language and user experience across various products, platforms, and mediums. It serves as a single source of truth for designers, developers, and stakeholders, ensuring that the design is cohesive, scalable, and maintainable.",
      body: `
        <p>A design system is a unified collection of reusable components, guidelines, and assets that help create a consistent visual language and user experience across various products, platforms, and mediums.</p>
        <h4>What a design system includes:</h4>
        <ol>
          <li><strong>Design tokens:</strong> The smallest decisions — color, type, spacing, radius, elevation — stored as named values so they can be shared between design tools and code.</li>
          <li><strong>Component library:</strong> Coded and designed components with documented variants, states and accessibility behaviour.</li>
          <li><strong>Patterns:</strong> Recipes for combining components to solve common problems such as forms, empty states and navigation.</li>
          <li><strong>Voice and content:</strong> Guidance on tone, terminology and microcopy so products read as consistently as they look.</li>
        </ol>
        <p>It serves as a single source of truth for designers, developers, and stakeholders, ensuring that the design is cohesive, scalable, and maintainable.</p>`,
    },
    {
      key: "gemini", name: "Gemini", id: "gemini-1.5 pro", icon: "assets/icons/gemini.svg",
      title: "Design System: A Comprehensive Guide",
      summary: "A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications. It serves as a single source of truth for designers and developers, ensuring consistency across products.",
      body: `
        <p>A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.</p>
        <h4>Core layers:</h4>
        <ol>
          <li><strong>Foundations:</strong> Color, typography, grids, iconography and motion principles.</li>
          <li><strong>Components:</strong> Buttons, inputs, cards, dialogs and navigation — each with defined states.</li>
          <li><strong>Governance:</strong> A contribution model, versioning and a team that owns the system.</li>
        </ol>
        <h4>Why teams invest in one:</h4>
        <ol>
          <li><strong>Speed:</strong> Teams stop rebuilding the same UI and ship features faster.</li>
          <li><strong>Quality:</strong> Accessibility and edge cases are solved once, in one place.</li>
          <li><strong>Scale:</strong> New products and platforms inherit a consistent experience by default.</li>
        </ol>`,
    },
    {
      key: "azure", name: "Azure AI", id: "azure-model", icon: "assets/icons/azure.svg",
      title: "Design Systems Explained for Product Teams",
      summary: "A design system combines a shared component library, design tokens and usage guidelines so product teams can build consistent interfaces quickly. It connects design tools like Figma with production code.",
      body: `
        <p>A design system combines a shared component library, design tokens and usage guidelines so product teams can build consistent interfaces quickly.</p>
        <h4>How it connects design and code:</h4>
        <ol>
          <li><strong>Figma library:</strong> Components and variables published for designers.</li>
          <li><strong>Code package:</strong> The same components implemented in the product's framework.</li>
          <li><strong>Token pipeline:</strong> Variables exported from design and transformed into CSS, iOS and Android values.</li>
        </ol>
        <p>Keeping all three in sync is what turns a UI kit into a design system.</p>`,
    },
    {
      key: "perplexity", name: "Perplexity", id: "llama-3.1-sonar", icon: "assets/icons/perplexity.svg",
      title: "What Is a Design System? Definition and Examples",
      summary: "A design system is a set of standards, documentation and reusable components that guide how a product is designed and built. Well-known examples include Google's Material Design, IBM Carbon and Shopify Polaris.",
      body: `
        <p>A design system is a set of standards, documentation and reusable components that guide how a product is designed and built.</p>
        <h4>Well-known examples:</h4>
        <ol>
          <li><strong>Material Design</strong> (Google) — a cross-platform system with detailed motion and elevation guidance.</li>
          <li><strong>Carbon</strong> (IBM) — an open-source system focused on enterprise products and accessibility.</li>
          <li><strong>Polaris</strong> (Shopify) — known for strong content and voice guidelines alongside components.</li>
        </ol>
        <p>Studying public systems like these is a good way to decide what your own system needs.</p>`,
    },
    {
      key: "anthropic", name: "Anthropic", id: "claude-3-5-sonnet", icon: "assets/icons/anthropic.svg",
      title: "Design Systems: Purpose, Parts and Pitfalls",
      summary: "A design system is the shared language a product team uses to design and build interfaces — tokens, components, patterns and the documentation that explains when to use each. Its value comes from adoption, not from the library itself.",
      body: `
        <p>A design system is the shared language a product team uses to design and build interfaces — tokens, components, patterns and the documentation that explains when to use each.</p>
        <h4>Common pitfalls:</h4>
        <ol>
          <li><strong>Building in isolation:</strong> Systems made without product teams tend to go unused.</li>
          <li><strong>Over-scoping:</strong> Start with the components teams already use most, not every possible one.</li>
          <li><strong>No ownership:</strong> Without maintainers, the system drifts from the product.</li>
        </ol>
        <p>Its value comes from adoption, not from the library itself.</p>`,
    },
    {
      key: "cohere", name: "Cohere", id: "command-r-plus", icon: "assets/icons/cohere.svg",
      title: "Design System Basics",
      summary: "A design system is a library of reusable UI components and the rules for using them, maintained as a product that serves other teams. It improves consistency, speeds up delivery and makes accessibility easier to get right.",
      body: `
        <p>A design system is a library of reusable UI components and the rules for using them, maintained as a product that serves other teams.</p>
        <h4>Getting started:</h4>
        <ol>
          <li><strong>Audit:</strong> Inventory the UI you already have and find duplicates.</li>
          <li><strong>Define tokens:</strong> Agree on color, type and spacing scales first.</li>
          <li><strong>Build the top ten:</strong> Ship the most-used components, then iterate.</li>
        </ol>
        <p>It improves consistency, speeds up delivery and makes accessibility easier to get right.</p>`,
    },
  ];

  const PLAN_QUESTION = "Make me a plan to create a design system in 2 weeks. I want to create it on Figma using variables and create a documentation web page on Confluence.";
  const PLAN_ANSWER = `
    <p>Here's a focused two-week plan:</p>
    <h4>Week 1 — Foundations in Figma</h4>
    <ol>
      <li><strong>Days 1–2:</strong> Audit existing screens and list the colors, type styles, spacing and components in use.</li>
      <li><strong>Days 3–4:</strong> Create variable collections for primitives (raw colors, spacing) and semantic tokens (text, surface, border) with light and dark modes.</li>
      <li><strong>Day 5:</strong> Build the core components — button, input, checkbox, card — bound to your variables.</li>
    </ol>
    <h4>Week 2 — Components and documentation</h4>
    <ol>
      <li><strong>Days 6–8:</strong> Add navigation, modal, toast and list components with variants and states.</li>
      <li><strong>Day 9:</strong> Create a Confluence space with pages for foundations, each component and contribution guidelines.</li>
      <li><strong>Day 10:</strong> Publish the Figma library, share the Confluence page and gather feedback from one product team.</li>
    </ol>`;

  const FOLLOW_UP_ANSWER = (q) => `
    <p>Good question. Building on the answer above, here's how to think about <strong>${escapeHtml(q.replace(/\?+$/, ""))}</strong>:</p>
    <ol>
      <li><strong>Start small:</strong> Focus on the pieces your team uses most often and document them well.</li>
      <li><strong>Make it shared:</strong> Keep design and code in sync so everyone works from the same source of truth.</li>
      <li><strong>Iterate:</strong> Collect feedback regularly and version your changes so teams can adopt them safely.</li>
    </ol>
    <p>Want me to turn this into a checklist you can share with your team?</p>`;

  const AGENT_ANSWER = (a, q) => `
    <p>Happy to help — I'm <strong>${escapeHtml(a.name)}</strong>. Here's how I'd tackle <strong>${escapeHtml(q.replace(/\?+$/, ""))}</strong>:</p>
    <ol>
      <li><strong>Clarify the goal:</strong> What does a great result look like, and who is it for?</li>
      <li><strong>Draft quickly:</strong> I'll give you a first version you can react to.</li>
      <li><strong>Refine together:</strong> Tell me what to change and I'll iterate.</li>
    </ol>
    <p>Share any details or examples and I'll get started.</p>`;

  // Example agents for the Explore AI screen. Names, creators and stats are
  // invented placeholders; icons are Material Symbols on tinted tiles.
  const AGENT_CATEGORIES = ["All", "Marketing", "Sales", "Education", "Productivity", "Data Analysis", "Finance", "Writing", "Programming"];
  const AGENTS = [
    { key: "code-master", name: "Code Master", by: "John Doe", cat: "Programming", icon: "code", bg: "#e8f0fe", fg: "#1b51aa", rating: "4.8", convos: "12K+",
      text: "A highly sophisticated GPT tailored for Python, optimized for both /canvas and /notebook. See the new /commands. Code like a master." },
    { key: "campaign-crafter", name: "Campaign Crafter", by: "Maya Chen", cat: "Marketing", icon: "campaign", bg: "#fff8bb", fg: "#b4a200", rating: "4.6", convos: "8.4K",
      text: "Plans multi-channel campaigns and writes on-brand copy for every channel, from ads to launch emails." },
    { key: "deal-closer", name: "Deal Closer", by: "Ravi Patel", cat: "Sales", icon: "handshake", bg: "#e6f4ea", fg: "#1e8e3e", rating: "4.5", convos: "5.1K",
      text: "Drafts follow-up emails, handles objections and preps talking points before every sales call." },
    { key: "study-buddy", name: "Study Buddy", by: "Lena Ortiz", cat: "Education", icon: "school", bg: "#fce8f3", fg: "#c2185b", rating: "4.9", convos: "21K+",
      text: "Turns any topic into flashcards, practice quizzes and plain-English explanations." },
    { key: "focus-planner", name: "Focus Planner", by: "Sam Okafor", cat: "Productivity", icon: "bolt", bg: "#fff3e0", fg: "#e65100", rating: "4.7", convos: "9.8K",
      text: "Breaks big goals into a realistic daily plan and nudges you back on track when things slip." },
    { key: "chart-whisperer", name: "Chart Whisperer", by: "Priya Nair", cat: "Data Analysis", icon: "insights", bg: "#e0f7fa", fg: "#00838f", rating: "4.6", convos: "6.2K",
      text: "Explains spreadsheets, spots trends and recommends the right chart for your data." },
    { key: "budget-buddy", name: "Budget Buddy", by: "Tom Walsh", cat: "Finance", icon: "savings", bg: "#ede7f6", fg: "#5e35b1", rating: "4.4", convos: "3.9K",
      text: "Builds monthly budgets, sorts your spending into categories and explains tax basics simply." },
    { key: "story-spark", name: "Story Spark", by: "Aiko Tanaka", cat: "Writing", icon: "edit_note", bg: "#ffebee", fg: "#c62828", rating: "4.8", convos: "15K+",
      text: "Brainstorms plots, sharpens dialogue and fixes pacing in your short stories and scripts." },
    { key: "pitch-polisher", name: "Pitch Polisher", by: "Noah Brooks", cat: "Marketing", icon: "rocket_launch", bg: "#e3f2fd", fg: "#1565c0", rating: "4.5", convos: "4.7K",
      text: "Pressure-tests your startup pitch and rewrites each slide so investors get the point in seconds." },
    { key: "lesson-planner", name: "Lesson Planner", by: "Grace Liu", cat: "Education", icon: "menu_book", bg: "#f1f8e9", fg: "#558b2f", rating: "4.7", convos: "7.3K",
      text: "Creates lesson plans, activities and rubrics for any grade level in minutes." },
    { key: "inbox-zero", name: "Inbox Zero", by: "Dan Moreau", cat: "Productivity", icon: "mail", bg: "#fbe9e7", fg: "#d84315", rating: "4.3", convos: "2.8K",
      text: "Summarises long threads, drafts replies and suggests what can safely wait." },
    { key: "sql-sidekick", name: "SQL Sidekick", by: "Omar Haddad", cat: "Programming", icon: "database", bg: "#eceff1", fg: "#455a64", rating: "4.6", convos: "5.5K",
      text: "Writes and explains SQL queries, and spots why a slow query is slow." },
  ];

  // ── State ─────────────────────────────────────────────────

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); }
      catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
    },
  };

  const seedConversations = () => ({
    ds: {
      id: "ds", model: "openai", title: MODELS[0].title,
      messages: [
        { from: "ai", html: DS_OVERVIEW },
        { from: "user", text: PLAN_QUESTION },
        { from: "ai", html: PLAN_ANSWER },
      ],
      saved: true,
    },
    excel1: { id: "excel1", model: "perplexity", title: "Excel Formula Tips", messages: [
      { from: "ai", html: "<p>Use <strong>XLOOKUP</strong> instead of VLOOKUP: it searches in any direction, defaults to exact matches and doesn't break when columns are inserted.</p>" },
    ], saved: true },
    tax: { id: "tax", model: "gemini", title: "Tax in Australia", messages: [
      { from: "ai", html: "<p>The Australian financial year runs from <strong>1 July to 30 June</strong>. Individual tax returns are due by 31 October if you lodge yourself, or later if you use a registered tax agent.</p>" },
    ], saved: true },
    party: { id: "party", kind: "message", model: "openai", title: "Checklist for party", messages: [
      { from: "ai", html: "<p>Here's how to throw the perfect surprise birthday party:</p><h4>Planning the Basics</h4><p>Choose a date and time close to the guest of honor's actual birthday, but consider picking a day slightly before to maximize the surprise element. Select a venue that fits the party size and theme — this could be your home, a rented space, or even an outdoor location.</p><h4>Keeping it Secret</h4><p>Enlist help from close friends and family to maintain the surprise. Create a believable \"cover story\" to explain any suspicious behavior or to get the guest of honor to the party location. Be careful with social media posts that could tip off the birthday person.</p><h4>Invitations and Guest List</h4><p>Send invitations privately, at least two weeks ahead, and ask guests to arrive 30 minutes before the guest of honor.</p>" },
    ], saved: true },
    filter: { id: "filter", kind: "message", model: "perplexity", title: "Use FILTER with criteria range", messages: [
      { from: "ai", html: "<p>Use <strong>FILTER</strong> to return every row that matches a condition:</p><p><code>=FILTER(A2:C100, (B2:B100=\"Invoice\")*(C2:C100&gt;500))</code></p><p>Multiply conditions for AND, add them for OR. The result spills automatically, so leave room below the formula.</p>" },
    ], saved: true },
    excel2: { id: "excel2", model: "perplexity", title: "Excel Formula Tips", messages: [
      { from: "ai", html: "<p>To sum values that meet a condition, use <strong>SUMIFS</strong>, e.g. <code>=SUMIFS(C:C, A:A, \"Invoice\", B:B, \"&gt;=1/7/2024\")</code>.</p>" },
    ], saved: true },
  });

  const seedFolders = () => ({
    root: ["ds", "excel1", "party"],
    folders: [{ id: "accounting", name: "Accounting Project", items: ["filter", "tax", "excel2"] }],
  });

  // Bump when seed data changes; `?reset` in the URL also restores it (handy between video takes).
  const DATA_VERSION = 2;
  if (location.search.includes("reset") || store.get("iio.v", 0) !== DATA_VERSION) {
    ["iio.conversations", "iio.folders", "iio.user", "iio.tipOff"].forEach((k) => { try { localStorage.removeItem(k); } catch { /* ignore */ } });
    store.set("iio.v", DATA_VERSION);
    if (location.search.includes("reset")) history.replaceState(null, "", location.pathname + location.hash);
  }

  const state = {
    signedIn: false, // every visit starts logged out
    user: store.get("iio.user", null) || { first: "John", last: "Doe", email: "johndoe@gmail.com", profiles: ["John Doe", "Work", "Martha Doe"] },
    signup: {},
    returnTo: "#/",
    exploreCat: "All",
    conversations: store.get("iio.conversations", null) || seedConversations(),
    folders: store.get("iio.folders", null) || seedFolders(),
    guestFollowUps: 0,
    lastQuery: DEFAULT_QUERY,
  };

  state.user = normalizeUser(state.user);

  const persist = () => {
    store.set("iio.user", state.user);
    store.set("iio.conversations", state.conversations);
    store.set("iio.folders", state.folders);
  };

  // ── Helpers ───────────────────────────────────────────────

  const $ = (sel, root = document) => root.querySelector(sel);
  const app = $("#app");
  const topbar = $("#topbar");
  const screen = $("#screen");
  const dock = $("#dock");
  const tabbar = $("#tabbar");

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  const modelByKey = (key) => MODELS.find((m) => m.key === key) || MODELS[0];
  const agentByKey = (key) => AGENTS.find((a) => a.key === key) || AGENTS[0];
  const nameInitials = (n) => n.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";
  const activeProfile = () => state.user.profiles[state.user.active] || state.user.profiles[0];
  const initials = (u) => `${(u.first || "?")[0]}${(u.last || "")[0] || ""}`.toUpperCase();
  const agentTile = (a, size = 40) =>
    `<span class="agent-tile" style="--tile-bg:${a.bg};--tile-fg:${a.fg};--tile:${size}px" aria-hidden="true"><span class="ms">${a.icon}</span></span>`;
  const icon = (name, cls = "") => `<span class="ms ${cls}" aria-hidden="true">${name}</span>`;

  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2000);
  }

  function parseHash() {
    const raw = location.hash.replace(/^#/, "") || "/";
    const [path, qs = ""] = raw.split("?");
    const parts = path.split("/").filter(Boolean);
    return { parts, params: new URLSearchParams(qs) };
  }

  const go = (hash) => { location.hash = hash; };

  // ── Top bar ───────────────────────────────────────────────

  function authControls() {
    return state.signedIn
      ? `<button class="avatar" id="avatar-btn" aria-label="Account menu" aria-haspopup="menu" style="background:${activeProfile().color}">${escapeHtml(nameInitials(activeProfile().name))}</button>`
      : `<div class="auth-buttons">
           <button class="btn btn-secondary" data-auth="login">Login</button>
           <button class="btn btn-primary" data-auth="signup">Sign up</button>
         </div>`;
  }

  function renderTopbar({ logo = true, search = null } = {}) {
    let html = `<div class="topbar-row${logo ? "" : " end"}">
      ${logo ? `<a href="#/" aria-label="internet.io home"><img class="topbar-logo" src="assets/logo.svg" alt="internet.io" width="118" height="20"></a>` : ""}
      ${authControls()}
    </div>`;
    if (search !== null) {
      html += `<form class="searchbar" id="top-search" role="search">
        <a class="icon-btn lead" href="#/" aria-label="Back">${icon("arrow_back")}</a>
        <input type="search" name="q" value="${escapeHtml(search)}" aria-label="Search" placeholder="What do you want to know?" autocomplete="off" enterkeyhint="search">
        <div class="trail">
          <button type="button" class="icon-btn" data-clear aria-label="Clear">${icon("close")}</button>
          <button type="button" class="icon-btn" data-soon="Model filters" aria-label="Choose models">${icon("tune")}</button>
          <button type="button" class="icon-btn" data-soon="Prompt library" aria-label="Prompt library">${icon("library_books")}</button>
        </div>
      </form>`;
    }
    topbar.innerHTML = html;
  }

  // ── Screens ───────────────────────────────────────────────

  function viewHome() {
    renderTopbar({ logo: false });
    screen.innerHTML = `<div class="view home">
      <section class="hero">
        <div class="brand">
          <span class="beta">Free for Beta</span>
          <img class="brand-logo" src="assets/logo.svg" alt="internet.io" width="212" height="36">
          <p class="tagline">"One Platform, Endless Possibilities"</p>
        </div>
        <form class="searchbar lg" id="home-search" role="search">
          <span class="icon-btn lead" aria-hidden="true">${icon("search")}</span>
          <input type="search" name="q" placeholder="What do you want to know?" aria-label="What do you want to know?" autocomplete="off" enterkeyhint="search">
          <div class="trail">
            <button type="button" class="icon-btn" data-soon="Model filters" aria-label="Choose models">${icon("tune")}</button>
            <button type="button" class="icon-btn" data-soon="Prompt library" aria-label="Prompt library">${icon("library_books")}</button>
          </div>
        </form>
        <p class="intro">Start exploring insights from multiple AI models. Compare answers, save your favourites, and follow up effortlessly.</p>
      </section>
      <section class="how" aria-labelledby="how-title">
        <h2 id="how-title">How it works?</h2>
        <ul class="how-list">
          <li class="how-card">${icon("search")}<div><h3>Search Like You Always Do</h3><p>Type your question into our search bar—simple, familiar, and powered by advanced AI models.</p></div></li>
          <li class="how-card">${icon("text_compare")}<div><h3>Compare Responses from AI Models</h3><p>Compare side-by-side answers from multiple AI models and discover the best insights for your needs.</p></div></li>
          <li class="how-card">${icon("folder")}<div><h3>Save and Organize</h3><p>Save your favorite answers and organize them into folders for easy access anytime.</p></div></li>
        </ul>
      </section>
      <footer class="footer">
        <small>internet.com© 2024. All rights reserved.</small>
        <nav class="footer-links" aria-label="Legal">
          <a href="#/" data-soon="Terms of Service">Terms of Service</a>
          <a href="#/" data-soon="Privacy Policy">Privacy Policy</a>
          <a href="#/" data-soon="Contact Us">Contact Us</a>
        </nav>
      </footer>
    </div>`;

    const form = $("#home-search");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = form.q.value.trim() || DEFAULT_QUERY;
      go(`#/results?q=${encodeURIComponent(q)}`);
    });
    // Tapping into an empty field pre-fills the demo query so the flow is one tap away.
    form.q.addEventListener("focus", () => {
      if (!form.q.value) form.q.placeholder = DEFAULT_QUERY;
    });
    form.q.addEventListener("blur", () => { form.q.placeholder = "What do you want to know?"; });
  }

  function resultItem(m, i) {
    return `<a class="result${i === 0 ? " is-top" : ""}" href="#/answer/${m.key}?q=${encodeURIComponent(state.lastQuery)}">
      <div class="result-head">
        <span class="model">
          <img class="model-icon" src="${m.icon}" alt="" width="36" height="36">
          <span><span class="model-name">${m.name}</span><span class="model-id">${m.id}</span></span>
        </span>
        <span class="more">${icon("more_vert")}</span>
      </div>
      <div class="result-body">
        <h3 class="result-title">${m.title}</h3>
        <p class="result-text">${m.summary}</p>
      </div>
    </a>`;
  }

  function viewResults(params) {
    const q = params.get("q") || state.lastQuery || DEFAULT_QUERY;
    state.lastQuery = q;
    renderTopbar({ search: q });

    const skeleton = MODELS.slice(0, 3).map(() => `
      <div class="result" aria-hidden="true">
        <div class="result-head"><span class="model"><span class="model-icon skeleton"></span><span style="width:120px"><span class="skeleton" style="display:block;height:12px;margin-bottom:6px"></span><span class="skeleton" style="display:block;height:10px;width:60%"></span></span></span></div>
        <div class="result-body"><span class="skeleton" style="height:14px;width:85%"></span><span class="skeleton" style="height:12px"></span><span class="skeleton" style="height:12px"></span><span class="skeleton" style="height:12px;width:70%"></span></div>
      </div>`).join("");
    screen.innerHTML = `<div class="view results" aria-busy="true">${skeleton}</div>`;

    const token = Symbol();
    viewResults.token = token;
    setTimeout(() => {
      if (viewResults.token !== token) return;
      screen.innerHTML = `<div class="view results">
        <p class="results-meta">${MODELS.length} answers from ${MODELS.length} AI models</p>
        ${MODELS.map(resultItem).join("")}
      </div>`;
    }, 650);
  }

  function viewAnswer(key, params) {
    const idx = Math.max(0, MODELS.findIndex((m) => m.key === key));
    const m = MODELS[idx];
    const q = params.get("q") || state.lastQuery;
    renderTopbar();
    screen.innerHTML = `<article class="view answer">
      <div class="answer-head">
        <span class="model">
          <img class="model-icon lg" src="${m.icon}" alt="" width="40" height="40">
          <span><span class="model-name">${m.name}</span><span class="model-id">${m.id}</span></span>
        </span>
        <a class="icon-btn lg" href="#/results?q=${encodeURIComponent(q)}" aria-label="Close">${icon("close")}</a>
      </div>
      <div class="answer-main">
        <h2 class="answer-title">${m.title}</h2>
        <div class="prose">${m.body}</div>
      </div>
    </article>`;

    const prev = MODELS[idx - 1];
    const next = MODELS[idx + 1];
    setDock(`<div class="pager-dock">
      <div class="pager">
        <button class="btn prev" ${prev ? `data-go="#/answer/${prev.key}?q=${encodeURIComponent(q)}"` : "disabled"} aria-label="Previous answer">${icon("chevron_left")}Prev</button>
        <button class="btn next" ${next ? `data-go="#/answer/${next.key}?q=${encodeURIComponent(q)}"` : "disabled"} aria-label="Next answer">Next${icon("chevron_right")}</button>
      </div>
      <button class="btn btn-primary" data-go="#/chat/new?m=${m.key}">Ask follow-up${icon("arrow_forward")}</button>
    </div>`);
  }

  function renderMessage(msg) {
    if (msg.from === "user") return `<div class="bubble user">${escapeHtml(msg.text)}</div>`;
    if (msg.typing) return `<div class="bubble ai"><span class="typing" aria-label="Typing"><i></i><i></i><i></i></span></div>`;
    return `<div class="bubble ai">
      <div class="prose">${msg.html}</div>
      <div class="bubble-actions">
        <button class="chip" data-copy>${icon("content_copy")}Copy</button>
        <button class="chip" data-regen>${icon("refresh")}Regenerate</button>
        <button class="chip" data-save>${icon("star")}Save</button>
      </div>
    </div>`;
  }

  function viewChat(id, params) {
    let convo;
    if (id === "new") {
      const m = modelByKey(params.get("m"));
      convo = { id: `c${Date.now()}`, model: m.key, title: m.title, messages: [{ from: "ai", html: m.body }], saved: false };
      state.conversations[convo.id] = convo;
      history.replaceState(null, "", `#/chat/${convo.id}`);
    } else if (id === "agent") {
      const a = agentByKey(params.get("a"));
      convo = { id: `c${Date.now()}`, agent: a.key, title: "New Chat", messages: [], saved: false };
      state.conversations[convo.id] = convo;
      history.replaceState(null, "", `#/chat/${convo.id}`);
    } else {
      convo = state.conversations[id];
      if (!convo) return go("#/chats");
    }
    renderTopbar();
    let titleBlock;
    if (convo.kind === "message") {
      titleBlock = `<div class="convo-title agent-title">
            <span class="saved-star" aria-hidden="true">${icon("star", "fill")}</span>
            <div>
              <div class="title-row"><h3 id="convo-name">${escapeHtml(convo.title)}</h3><button class="icon-btn" data-rename aria-label="Rename">${icon("edit")}</button></div>
              <span class="agent-by">Saved message</span>
            </div>
          </div>`;
    } else if (convo.agent) {
      const a = agentByKey(convo.agent);
      titleBlock = `<div class="convo-title agent-title">
            ${agentTile(a, 32)}
            <div>
              <div class="title-row"><h3 id="convo-name">${escapeHtml(convo.title)}</h3><button class="icon-btn" data-rename aria-label="Rename chat">${icon("edit")}</button></div>
              <span class="agent-by">${escapeHtml(a.name)}</span>
            </div>
          </div>`;
    } else {
      const m = modelByKey(convo.model);
      titleBlock = `<div class="convo-title">
            <img class="model-icon" src="${m.icon}" alt="${m.name}" width="36" height="36">
            <div><h3>${escapeHtml(convo.title)}</h3><span>${m.id}</span></div>
          </div>`;
    }

    screen.innerHTML = `<div class="view card-view">
      <section class="card-panel convo" aria-label="Conversation">
        <div class="convo-head">
          <button class="icon-btn md" data-back aria-label="Back">${icon("arrow_back")}</button>
          <h2>${escapeHtml(convo.title)}</h2>
          <button class="icon-btn md" data-soon="Conversation options" aria-label="More options">${icon("more_vert")}</button>
        </div>
        <div class="convo-body card-scroll" id="convo-body">
          ${titleBlock}
          ${convo.messages.map(renderMessage).join("")}
        </div>
      </section>
    </div>`;
    syncSaveChips(convo);

    if (convo.kind === "message") {
      screen.querySelectorAll(".bubble-actions").forEach((a) => a.remove());
      wireFades();
      return;
    }
    const guest = !state.signedIn;
    const showTip = state.signedIn && !state.tipHidden && !store.get("iio.tipOff", false);
    setDock(`${showTip ? `<div class="tip" role="status">
        <div><p>Switch to the Search tab to keep comparing.</p>
        <label class="tip-check"><input type="checkbox" id="tip-off">Don’t show this again</label></div>
        <button class="tip-hide" data-hide-tip>Hide</button>
      </div>` : ""}<div class="input-dock${guest ? " guest" : ""}">
      <form class="composer" id="composer">
        <input name="msg" placeholder="${convo.agent && !convo.messages.length ? `Message ${escapeHtml(agentByKey(convo.agent).name)}` : "Type your follow-up question"}" aria-label="Follow-up question" autocomplete="off" enterkeyhint="send">
        <button class="send" type="submit" aria-label="Send" disabled>${icon("arrow_forward")}</button>
      </form>
      ${guest ? `<div class="signup-banner"><p>Sign up now to save, organise &amp; ask unlimited follow-ups.</p><button class="btn btn-primary" data-auth="signup">Get started</button></div>` : ""}
    </div>`);

    const form = $("#composer");
    const send = form.querySelector(".send");
    form.msg.addEventListener("input", () => { send.disabled = !form.msg.value.trim(); });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = form.msg.value.trim();
      if (!text) return;
      if (guest && state.guestFollowUps >= 1) {
        openGate("Sign up for unlimited follow-ups", "Guests get one free follow-up. Sign up to keep the conversation going.");
        return;
      }
      if (guest) state.guestFollowUps++;
      form.msg.value = "";
      send.disabled = true;
      addFollowUp(convo, text);
    });

    wireFades();
  }

  function addFollowUp(convo, text) {
    const body = $("#convo-body");
    convo.messages.push({ from: "user", text });
    body.insertAdjacentHTML("beforeend", renderMessage({ from: "user", text }));
    body.insertAdjacentHTML("beforeend", renderMessage({ typing: true, from: "ai" }));
    const typingEl = body.lastElementChild;
    scrollToEnd();

    if (state.signedIn && !convo.saved) saveConversation(convo, { quiet: true });

    setTimeout(() => {
      const isPlan = /plan|2 weeks|two weeks|figma|confluence/i.test(text);
      const msg = { from: "ai", html: convo.agent ? AGENT_ANSWER(agentByKey(convo.agent), text) : isPlan ? PLAN_ANSWER : FOLLOW_UP_ANSWER(text) };
      convo.messages.push(msg);
      typingEl.outerHTML = renderMessage(msg);
      syncSaveChips(convo);
      persist();
      scrollToEnd();
    }, 1100);
  }

  function scrollToEnd() {
    const body = $("#convo-body");
    requestAnimationFrame(() => body?.scrollTo({ top: body.scrollHeight, behavior: "smooth" }));
  }

  function syncSaveChips(convo) {
    screen.querySelectorAll("[data-save]").forEach((b) => {
      b.classList.toggle("is-on", !!convo.saved);
      b.querySelector(".ms").classList.toggle("fill", !!convo.saved);
      b.lastChild.textContent = convo.saved ? "Saved" : "Save";
    });
  }

  function saveConversation(convo, { quiet = false } = {}) {
    convo.saved = true;
    if (!state.folders.root.includes(convo.id) && !state.folders.folders.some((f) => f.items.includes(convo.id))) {
      state.folders.root.unshift(convo.id);
      state.justAdded = convo.id;
    }
    persist();
    syncSaveChips(convo);
    if (!quiet) toast("Saved to My Chats");
  }

  function itemIcon(c) {
    if (c.kind === "message") return `<span class="row-ico star">${icon("star", "fill")}</span>`;
    if (c.agent) return agentTile(agentByKey(c.agent), 20);
    return `<img class="conv-icon" src="${modelByKey(c.model).icon}" alt="" width="20" height="20">`;
  }

  function savedRow(id) {
    const c = state.conversations[id];
    if (!c) return "";
    const isNew = state.justAdded === id;
    return `<li class="srow${isNew ? " is-new" : ""}"><a class="srow-main" href="#/chat/${id}">${itemIcon(c)}<span class="label">${escapeHtml(c.title)}</span></a>
      <button class="icon-btn srow-more" data-soon="Options for “${escapeHtml(c.title)}”" aria-label="More options">${icon("more_vert")}</button></li>`;
  }

  function folderRow(f) {
    return `<li class="srow"><a class="srow-main" href="#/chats/folder/${f.id}"><span class="row-ico">${icon("folder")}</span><span class="label">${escapeHtml(f.name)}</span></a>
      <button class="icon-btn srow-more" data-soon="Folder options" aria-label="Folder options">${icon("more_vert")}</button></li>`;
  }

  // Saved Items — flat list; folders open as their own page (Chat Page › Mobile optimisation).
  function viewChats(folderId) {
    if (!state.signedIn) {
      go("#/");
      openGate("Sign in to see your saved chats", "Save answers from any AI model and organise them into folders.");
      return;
    }
    renderTopbar();
    const F = state.folders;
    const folder = folderId && F.folders.find((f) => f.id === folderId);
    if (folderId && !folder) return go("#/chats");
    const rows = folder
      ? folder.items.map(savedRow).join("") || `<li class="srow-empty">This folder is empty</li>`
      : F.root.map(savedRow).join("") + F.folders.map(folderRow).join("");
    screen.innerHTML = `<div class="view card-view">
      <section class="card-panel" aria-label="${folder ? escapeHtml(folder.name) : "Saved items"}">
        <div class="card-head">
          ${folder ? `<a class="icon-btn md" href="#/chats" aria-label="Back to Saved Items">${icon("arrow_back")}</a>` : "<span></span>"}
          <h2>${folder ? escapeHtml(folder.name) : "Saved Items"}</h2>
          ${folder
            ? `<button class="icon-btn md" data-soon="Folder options" aria-label="Folder options">${icon("more_vert")}</button>`
            : `<button class="icon-btn md" data-new-folder aria-label="New folder">${icon("create_new_folder")}</button>`}
        </div>
        <div class="card-scroll saved-list">
          <div class="srow-head"><span>Name</span><button class="icon-btn srow-more" data-soon="Sort options" aria-label="Sort options">${icon("more_vert")}</button></div>
          <ul>${rows}</ul>
        </div>
      </section>
    </div>`;
    state.justAdded = null;
    wireFades();
  }

  function agentCard(a) {
    return `<li><button class="agent-card" data-agent="${a.key}">
      ${agentTile(a)}
      <span class="agent-body">
        <span class="agent-name">${escapeHtml(a.name)}</span>
        <span class="agent-by">By ${escapeHtml(a.by)}</span>
        <span class="agent-text">${escapeHtml(a.text)}</span>
      </span>
    </button></li>`;
  }

  function viewExplore() {
    renderTopbar();
    const cat = state.exploreCat;
    const list = AGENTS.filter((a) => cat === "All" || a.cat === cat);
    screen.innerHTML = `<div class="view explore">
      <section class="agents-panel" aria-label="AI agents">
        <div class="agents-head">
          <div class="cat-chips" role="tablist" aria-label="Categories">
            ${AGENT_CATEGORIES.map((c) => `<button class="cat-chip${c === cat ? " is-on" : ""}" role="tab" aria-selected="${c === cat}" data-cat="${c}">${c}</button>`).join("")}
          </div>
        </div>
        <ul class="agent-grid">${list.map(agentCard).join("")}</ul>
      </section>
    </div>`;
    wireFades();
    const on = screen.querySelector(".cat-chip.is-on");
    if (on && cat !== "All") on.scrollIntoView({ block: "nearest", inline: "center" });
  }

  function openAgent(key) {
    const a = agentByKey(key);
    const wrap = document.createElement("div");
    wrap.className = "modal-backdrop";
    wrap.id = "agent-modal";
    wrap.innerHTML = `<section class="agent-dialog" role="dialog" aria-modal="true" aria-labelledby="agent-dialog-name">
      <button class="icon-btn agent-close" data-close-agent aria-label="Close">${icon("close")}</button>
      <div class="agent-dialog-head">
        ${agentTile(a)}
        <div><h2 id="agent-dialog-name">${escapeHtml(a.name)}</h2><span class="agent-by">By ${escapeHtml(a.by)}</span></div>
      </div>
      <p class="agent-dialog-text">${escapeHtml(a.text)}</p>
      <div class="agent-stats">
        <div><strong>${icon("star", "fill")}${a.rating}</strong><span>Ratings</span></div>
        <i aria-hidden="true"></i>
        <div><strong>${a.convos}</strong><span>Conversations</span></div>
      </div>
      <button class="btn btn-primary agent-start" data-go="#/chat/agent?a=${a.key}">${icon("chat_bubble")}Start Chat</button>
    </section>`;
    $(".device").appendChild(wrap);
    wrap.addEventListener("click", (e) => { if (e.target === wrap) closeAgent(); });
    wrap.querySelector(".agent-start").focus();
  }
  function closeAgent() { $("#agent-modal")?.remove(); $("#folder-modal")?.remove(); }

  // "New Folder" dialog — same as desktop (Chat Page, node 1233:11272).
  function openNewFolder() {
    const wrap = document.createElement("div");
    wrap.className = "modal-backdrop";
    wrap.id = "folder-modal";
    wrap.innerHTML = `<form class="folder-dialog" role="dialog" aria-modal="true" aria-labelledby="folder-title">
      <div class="folder-head">
        <h2 id="folder-title">New Folder</h2>
        <button type="button" class="icon-btn" data-close-agent aria-label="Close">${icon("close")}</button>
      </div>
      <input name="name" value="Untitled Folder" maxlength="40" aria-label="Folder name" autocomplete="off">
      <div class="folder-actions">
        <button type="button" class="btn btn-secondary" data-close-agent>Cancel</button>
        <button type="submit" class="btn btn-primary">OK</button>
      </div>
    </form>`;
    $(".device").appendChild(wrap);
    const form = wrap.querySelector("form");
    const submit = form.querySelector("[type=submit]");
    form.name.addEventListener("input", () => { submit.disabled = !form.name.value.trim(); });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      if (!name) return;
      const id = `f${Date.now()}`;
      state.folders.folders.push({ id, name, items: [] });
      persist();
      wrap.remove();
      viewChats();
      toast(`Folder "${name}" created`);
    });
    wrap.addEventListener("click", (e) => { if (e.target === wrap) wrap.remove(); });
    form.name.focus();
    form.name.select();
  }

  // Card-coloured gradients over the top/bottom edge of an inner scroll area while content is hidden there.
  function wireFades() {
    screen.querySelectorAll(".card-scroll, .agent-grid").forEach((el) => {
      const panel = el.parentElement;
      const top = document.createElement("div");
      const bottom = document.createElement("div");
      top.className = "edge-fade top";
      bottom.className = "edge-fade bottom";
      top.style.top = `${el.offsetTop}px`;
      panel.append(top, bottom);
      const update = () => {
        top.classList.toggle("on", el.scrollTop > 2);
        bottom.classList.toggle("on", el.scrollTop + el.clientHeight < el.scrollHeight - 2);
      };
      el.addEventListener("scroll", update, { passive: true });
      new ResizeObserver(update).observe(el);
      update();
    });
  }

  // ── Auth: sign up, more details, first profile, login ─────

  function authShell(inner, { back = true } = {}) {
    return `<div class="view auth">
      ${back ? `<button class="icon-btn md auth-close" data-auth-close aria-label="Close">${icon("close")}</button>` : ""}
      <img class="auth-logo" src="assets/logo.svg" alt="internet.io" width="190" height="32">
      ${inner}
    </div>`;
  }

  const field = (name, label, { type = "text", placeholder = "", value = "", autocomplete = "off", hint = "" } = {}) => `
    <label class="auth-field">
      <span class="auth-label">${label}</span>
      <span class="auth-input">
        <input name="${name}" type="${type}" placeholder="${placeholder}" value="${escapeHtml(value)}" autocomplete="${autocomplete}" ${type === "email" ? 'inputmode="email" autocapitalize="off"' : ""}>
        ${type === "password" ? `<button type="button" class="icon-btn" data-reveal aria-label="Show password">${icon("visibility")}</button>` : ""}
      </span>
      ${hint ? `<span class="auth-hint">${hint}</span>` : ""}
    </label>`;

  const socialButtons = () => `
    <div class="social">
      <button type="button" class="btn social-btn" data-social="google"><img src="assets/icons/google.png" alt="" width="20" height="20">Continue with Google</button>
      <button type="button" class="btn social-btn" data-social="facebook"><img src="assets/icons/facebook.png" alt="" width="20" height="20">Continue with Facebook</button>
    </div>
    <div class="or" aria-hidden="true"><span>OR</span></div>`;

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Enables the submit button only when every rule passes, like the desktop design's disabled state.
  function wireForm(form, rules, onSubmit) {
    const submit = form.querySelector("[type=submit]");
    const check = () => { submit.disabled = !rules(form); };
    form.addEventListener("input", check);
    form.addEventListener("submit", (e) => { e.preventDefault(); if (rules(form)) onSubmit(form); });
    check();
  }

  function viewSignup() {
    screen.innerHTML = authShell(`
      <p class="auth-headline">Get started with Internet.io</p>
      ${socialButtons()}
      <form class="auth-form" id="signup-form" novalidate>
        ${field("first", "First Name", { placeholder: "E.g., John", autocomplete: "given-name" })}
        ${field("last", "Last Name", { placeholder: "E.g., Doe", autocomplete: "family-name" })}
        ${field("email", "Email", { type: "email", placeholder: "your@email.com", autocomplete: "email" })}
        ${field("password", "Password", { type: "password", placeholder: "Create a strong password", autocomplete: "new-password", hint: "At least 8 characters" })}
        <button class="btn btn-primary btn-block" type="submit">Continue</button>
      </form>
      <p class="auth-switch">Already have an account? <a href="#/login">Login</a></p>`);
    wireForm($("#signup-form"),
      (f) => f.first.value.trim() && f.last.value.trim() && EMAIL_RE.test(f.email.value.trim()) && f.password.value.length >= 8,
      (f) => {
        state.signup = { first: f.first.value.trim(), last: f.last.value.trim(), email: f.email.value.trim() };
        go("#/signup/profile");
      });
  }

  // Shown after Google / Facebook: the provider filled some fields, the user completes the rest.
  function viewSignupDetails() {
    const d = state.signup.first ? state.signup : { first: "John", last: "", email: "johndoe@example.com" };
    screen.innerHTML = authShell(`
      <p class="auth-headline">Almost there! Just a few details left.</p>
      <form class="auth-form" id="details-form" novalidate>
        ${field("first", "First Name", { value: d.first, autocomplete: "given-name" })}
        ${field("last", "Last Name", { placeholder: "Enter your last name", value: d.last, autocomplete: "family-name" })}
        ${field("email", "Email", { type: "email", value: d.email, autocomplete: "email" })}
        <button class="btn btn-primary btn-block" type="submit">Continue</button>
      </form>`);
    const form = $("#details-form");
    wireForm(form,
      (f) => f.first.value.trim() && f.last.value.trim() && EMAIL_RE.test(f.email.value.trim()),
      (f) => {
        state.signup = { first: f.first.value.trim(), last: f.last.value.trim(), email: f.email.value.trim() };
        go("#/signup/profile");
      });
    const empty = [...form.querySelectorAll("input")].find((i) => !i.value);
    empty?.focus();
  }

  function viewSignupProfile() {
    if (!state.signup.first) return go("#/signup");
    const name = `${state.signup.first} ${state.signup.last}`.trim();
    screen.innerHTML = authShell(`
      <p class="auth-headline">Let’s Create Your First Profile</p>
      <div class="profile-slots" aria-hidden="true">
        <span class="ms fill is-on">account_circle</span><span class="ms fill">account_circle</span><span class="ms fill">account_circle</span>
      </div>
      <form class="auth-form" id="profile-form" novalidate>
        ${field("profile", "Profile 1", { value: name })}
        <p class="auth-note">Create up to 3 profiles! One for work, one for fun, or even for someone else.</p>
        <button class="btn btn-primary btn-block" type="submit">Create</button>
      </form>`, { back: false });
    wireForm($("#profile-form"), (f) => f.profile.value.trim(), (f) => {
      completeAuth({ ...state.signup, profile: f.profile.value.trim() }, `Welcome to internet.io, ${state.signup.first}!`);
      state.signup = {};
    });
  }

  function viewLogin() {
    screen.innerHTML = authShell(`
      <p class="auth-headline">Login to your account</p>
      ${socialButtons()}
      <form class="auth-form" id="login-form" novalidate>
        ${field("email", "Email", { type: "email", placeholder: "Enter your email", autocomplete: "email" })}
        ${field("password", "Password", { type: "password", placeholder: "Enter your password", autocomplete: "current-password" })}
        <button type="button" class="auth-link" data-soon="Password reset">Forgot password?</button>
        <button class="btn btn-primary btn-block" type="submit">Login</button>
      </form>
      <p class="auth-switch">Don't have an account? <a href="#/signup">Sign up</a></p>`);
    wireForm($("#login-form"),
      (f) => EMAIL_RE.test(f.email.value.trim()) && f.password.value.length > 0,
      (f) => {
        const email = f.email.value.trim();
        // A known email restores that account; any other logs in as the demo user.
        const user = email.toLowerCase() === state.user.email.toLowerCase()
          ? state.user
          : { first: "John", last: "Doe", email, profiles: ["John Doe", "Work", "Martha Doe"] };
        completeAuth(user, `Welcome back, ${user.first}`);
      });
  }

  // Profiles are stored as [{ name, color }]; plain strings (or a single `profile`) are upgraded.
  function normalizeUser(u) {
    let list = u.profiles || [u.profile || `${u.first} ${u.last}`];
    list = list.map((p, i) => (typeof p === "string" ? { name: p, color: PROFILE_COLORS[i % 3] } : p));
    return { first: u.first, last: u.last, email: u.email, profiles: list, active: Math.min(u.active || 0, list.length - 1) };
  }

  function completeAuth(user, message) {
    state.user = normalizeUser(user);
    state.signedIn = true;
    state.guestFollowUps = 0;
    persist();
    renderMenu();
    const target = state.returnTo && !/^#\/(signup|login)/.test(state.returnTo) ? state.returnTo : "#/";
    state.returnTo = "#/";
    go(target);
    toast(message);
  }

  // ── Dock, tabs, router ────────────────────────────────────

  function setDock(html) {
    dock.innerHTML = html;
    app.classList.toggle("dock-open", !!html);
  }

  function setActiveTab(tab) {
    tabbar.querySelectorAll(".tab").forEach((t) => {
      const on = t.dataset.tab === tab;
      t.classList.toggle("is-active", on);
      if (on) t.setAttribute("aria-current", "page"); else t.removeAttribute("aria-current");
      const label = t.querySelector("[data-label-signed-in]");
      if (label) label.textContent = state.signedIn ? label.dataset.labelSignedIn : label.dataset.labelSignedOut;
    });
  }

  function route() {
    closeMenu();
    closeAgent();
    closeSheet({ restoreFocus: false });
    setDock("");
    const { parts, params } = parseHash();
    const [page, arg] = parts;
    const isAuth = page === "signup" || page === "login";
    app.classList.toggle("is-auth", isAuth);
    if (isAuth) {
      topbar.innerHTML = "";
      if (state.signedIn) return go("#/");
      if (page === "login") viewLogin();
      else if (arg === "details") viewSignupDetails();
      else if (arg === "profile") viewSignupProfile();
      else viewSignup();
      screen.scrollTop = 0;
      return;
    }
    switch (page) {
      case "results": viewResults(params); setActiveTab("search"); break;
      case "answer": viewAnswer(arg, params); setActiveTab("search"); break;
      case "chat": viewChat(arg, params); setActiveTab("chats"); break;
      case "chats": viewChats(parts[1] === "folder" ? parts[2] : null); setActiveTab("chats"); break;
      case "explore": viewExplore(); setActiveTab("explore"); break;
      default: viewHome(); setActiveTab("search");
    }
    if (page !== "chat") screen.scrollTop = 0;
  }

  // ── Sheet & menu ──────────────────────────────────────────

  const sheet = $("#sheet");
  const backdrop = $("#sheet-backdrop");
  let lastFocus = null;

  // Guest gate: explains why an account is needed and routes to sign up / login.
  function openGate(title = "Sign up to save your answers", text = "Save answers, organise them into folders and ask unlimited follow-ups.") {
    lastFocus = document.activeElement;
    state.returnTo = location.hash || "#/";
    $("#sheet-title").textContent = title;
    $("#sheet-text").textContent = text;
    sheet.hidden = false;
    backdrop.hidden = false;
    sheet.querySelector("[data-auth=signup]").focus();
  }
  function closeSheet({ restoreFocus = true } = {}) {
    if (sheet.hidden) return;
    sheet.hidden = true;
    backdrop.hidden = true;
    if (restoreFocus && lastFocus) lastFocus.focus?.();
  }
  backdrop.addEventListener("click", () => closeSheet());

  const menu = $("#avatar-menu");
  function closeMenu() { menu.hidden = true; }

  // Account dropdown — matches the Figma "User Dropdown" component.
  function renderMenu() {
    const u = state.user;
    const act = activeProfile();
    menu.innerHTML = `
      <div class="um-head">
        <span class="avatar avatar-lg" style="background:${act.color}">${escapeHtml(nameInitials(act.name))}</span>
        <div class="um-name"><strong id="um-profile-name">${escapeHtml(act.name)}</strong><button class="icon-btn um-edit" data-edit-profile aria-label="Edit profile name">${icon("edit")}</button></div>
        <span class="um-email">${escapeHtml(u.email)}</span>
      </div>
      <div class="um-section">
        <p class="um-label">Switch Profile</p>
        ${u.profiles.map((p, i) => `<button class="um-row${i === u.active ? " is-active" : ""}" role="menuitemradio" aria-checked="${i === u.active}" data-profile="${i}">
          <span class="avatar avatar-xs" style="background:${p.color}">${escapeHtml(nameInitials(p.name))}</span><span>${escapeHtml(p.name)}</span></button>`).join("")}
        ${u.profiles.length < 3 ? `<button class="um-row" role="menuitem" data-new-profile><span class="um-ico">${icon("add")}</span><span>New Profile</span></button>` : ""}
      </div>
      <div class="um-section">
        <button class="um-row" role="menuitem" data-soon="Thanks! Feedback form coming soon"><span class="um-ico">${icon("mail")}</span><span>Leave Feedback</span></button>
        <button class="um-row" role="menuitem" data-logout><span class="um-ico">${icon("logout")}</span><span>Logout</span></button>
      </div>`;
  }
  renderMenu();

  // Swaps a menu label for an input; Enter/blur commits, Escape cancels.
  function inlineEdit(target, value, onDone) {
    const input = document.createElement("input");
    input.className = "um-input";
    input.value = value;
    input.maxLength = 24;
    target.replaceWith(input);
    input.focus();
    input.select();
    let done = false;
    const finish = (commit) => {
      if (done) return;
      done = true;
      onDone(commit ? input.value.trim() : "");
    };
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") finish(true);
      if (e.key === "Escape") { e.stopPropagation(); finish(false); }
    });
    input.addEventListener("blur", () => finish(true));
  }

  function refreshAccountUI() {
    persist();
    renderMenu();
    const btn = $("#avatar-btn");
    if (btn) {
      btn.textContent = nameInitials(activeProfile().name);
      btn.style.background = activeProfile().color;
    }
  }

  // ── Global event delegation ───────────────────────────────

  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, a");
    if (!t) {
      if (!menu.hidden && !e.target.closest("#avatar-menu")) closeMenu();
      return;
    }

    if (t.id === "avatar-btn") { renderMenu(); menu.hidden = !menu.hidden; return; }
    if (t.dataset.profile !== undefined) {
      state.user.active = +t.dataset.profile;
      refreshAccountUI();
      closeMenu();
      return toast(`Switched to ${activeProfile().name}`);
    }
    if (t.hasAttribute("data-new-profile")) {
      inlineEdit(t, "", (name) => {
        if (name) {
          state.user.profiles.push({ name, color: PROFILE_COLORS[state.user.profiles.length % 3] });
          state.user.active = state.user.profiles.length - 1;
          toast(`Profile "${name}" created`);
        }
        refreshAccountUI();
      });
      return;
    }
    if (t.hasAttribute("data-edit-profile")) {
      inlineEdit($("#um-profile-name"), activeProfile().name, (name) => {
        if (name) activeProfile().name = name;
        refreshAccountUI();
      });
      t.hidden = true;
      return;
    }
    if (t.hasAttribute("data-logout")) {
      state.signedIn = false;
      closeMenu();
      if (parseHash().parts[0] === "chats") go("#/"); else route();
      return toast("Logged out");
    }
    if (!menu.hidden && !t.closest("#avatar-menu")) closeMenu();

    if (t.dataset.auth === "login" || t.dataset.auth === "signup") {
      if (sheet.hidden) state.returnTo = location.hash || "#/";
      closeSheet({ restoreFocus: false });
      return go(t.dataset.auth === "login" ? "#/login" : "#/signup");
    }
    if (t.hasAttribute("data-auth-close")) {
      state.signup = {};
      return go(state.returnTo || "#/");
    }
    if (t.dataset.social) {
      const provider = t.dataset.social === "google" ? "Google" : "Facebook";
      if (parseHash().parts[0] === "login") return completeAuth(state.user, `Signed in with ${provider}`);
      // The provider shares first name and email; last name is left for the user.
      state.signup = { first: "John", last: "", email: "johndoe@example.com" };
      return go("#/signup/details");
    }
    if (t.hasAttribute("data-reveal")) {
      const input = t.parentElement.querySelector("input");
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      t.querySelector(".ms").textContent = show ? "visibility_off" : "visibility";
      t.setAttribute("aria-label", show ? "Hide password" : "Show password");
      return;
    }
    if (t.dataset.cat) {
      state.exploreCat = t.dataset.cat;
      return viewExplore();
    }
    if (t.dataset.agent) return openAgent(t.dataset.agent);
    if (t.hasAttribute("data-close-agent")) return closeAgent();
    if (t.hasAttribute("data-rename")) {
      const convo = state.conversations[parseHash().parts[1]];
      const h = $("#convo-name");
      if (!convo || !h) return;
      const input = document.createElement("input");
      input.className = "rename-input";
      input.value = convo.title;
      input.setAttribute("aria-label", "Chat name");
      h.replaceWith(input);
      t.hidden = true;
      input.focus();
      input.select();
      const done = () => {
        convo.title = input.value.trim() || convo.title;
        persist();
        const nh = document.createElement("h3");
        nh.id = "convo-name";
        nh.textContent = convo.title;
        input.replaceWith(nh);
        t.hidden = false;
      };
      input.addEventListener("blur", done, { once: true });
      input.addEventListener("keydown", (ev) => { if (ev.key === "Enter") input.blur(); if (ev.key === "Escape") { input.value = convo.title; input.blur(); } });
      return;
    }

    if (t.dataset.soon !== undefined) {
      e.preventDefault();
      const label = t.dataset.soon;
      return toast(/soon|empty|yet/i.test(label) ? label : `${label} — coming soon`);
    }

    if (t.dataset.go) return go(t.dataset.go);
    if (t.hasAttribute("data-back")) return history.length > 1 ? history.back() : go("#/chats");

    if (t.hasAttribute("data-clear")) {
      const input = $("#top-search input");
      input.value = "";
      return input.focus();
    }

    if (t.dataset.tab === "chats" && !state.signedIn) {
      e.preventDefault();
      return openGate("Sign in to see your saved chats", "Save answers from any AI model and organise them into folders.");
    }


    if (t.hasAttribute("data-new-folder")) return openNewFolder();
    if (t.hasAttribute("data-hide-tip")) {
      state.tipHidden = true;
      if ($("#tip-off")?.checked) store.set("iio.tipOff", true);
      $(".tip")?.remove();
      return;
    }

    const bubble = t.closest(".bubble");
    if (bubble) {
      const convoId = parseHash().parts[1];
      const convo = state.conversations[convoId];
      if (t.hasAttribute("data-copy")) {
        const text = bubble.querySelector(".prose").innerText;
        navigator.clipboard?.writeText(text).then(() => toast("Copied to clipboard"), () => toast("Copy not available"));
        return;
      }
      if (t.hasAttribute("data-regen")) {
        const prose = bubble.querySelector(".prose");
        prose.style.opacity = "0.4";
        setTimeout(() => { prose.style.opacity = ""; toast("Answer regenerated"); }, 700);
        return;
      }
      if (t.hasAttribute("data-save") && convo) {
        if (!state.signedIn) return openGate("Sign up to save answers", "Save answers from any AI model and organise them into folders.");
        if (convo.saved) return toast("Already in My Chats");
        return saveConversation(convo);
      }
    }
  });

  document.addEventListener("submit", (e) => {
    if (e.target.id === "top-search") {
      e.preventDefault();
      const q = e.target.q.value.trim() || DEFAULT_QUERY;
      go(`#/results?q=${encodeURIComponent(q)}`);
      if (parseHash().params.get("q") === q) route();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!sheet.hidden) closeSheet();
    if (!menu.hidden) closeMenu();
    closeAgent();
  });

  window.addEventListener("hashchange", route);
  route();
})();
