/* internet.io mobile prototype: hash-routed single page app */

(() => {
  "use strict";

  // ── Content ───────────────────────────────────────────────

  const DEFAULT_QUERY = "What is a design system?";
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
      key: "openai", name: "OpenAI", id: "gpt-4o", icon: "assets/icons/openai.svg",
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
          <li><strong>Design tokens:</strong> The smallest decisions (color, type, spacing, radius, elevation) stored as named values so they can be shared between design tools and code.</li>
          <li><strong>Component library:</strong> Coded and designed components with documented variants, states and accessibility behavior.</li>
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
          <li><strong>Components:</strong> Buttons, inputs, cards, dialogs and navigation, each with defined states.</li>
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
          <li><strong>Material Design</strong> (Google): a cross-platform system with detailed motion and elevation guidance.</li>
          <li><strong>Carbon</strong> (IBM): an open-source system focused on enterprise products and accessibility.</li>
          <li><strong>Polaris</strong> (Shopify): known for strong content and voice guidelines alongside components.</li>
        </ol>
        <p>Studying public systems like these is a good way to decide what your own system needs.</p>`,
    },
    {
      key: "anthropic", name: "Anthropic", id: "claude-3-5-sonnet", icon: "assets/icons/anthropic.svg",
      title: "Design Systems: Purpose, Parts and Pitfalls",
      summary: "A design system is the shared language a product team uses to design and build interfaces: tokens, components, patterns and the documentation that explains when to use each. Its value comes from adoption, not from the library itself.",
      body: `
        <p>A design system is the shared language a product team uses to design and build interfaces: tokens, components, patterns and the documentation that explains when to use each.</p>
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
    <h4>Week 1: Foundations in Figma</h4>
    <ol>
      <li><strong>Days 1–2:</strong> Audit existing screens and list the colors, type styles, spacing and components in use.</li>
      <li><strong>Days 3–4:</strong> Create variable collections for primitives (raw colors, spacing) and semantic tokens (text, surface, border) with light and dark modes.</li>
      <li><strong>Day 5:</strong> Build the core components (button, input, checkbox, card) bound to your variables.</li>
    </ol>
    <h4>Week 2: Components and documentation</h4>
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
    <p>Happy to help. I'm <strong>${escapeHtml(a.name)}</strong>. Here's how I'd tackle <strong>${escapeHtml(q.replace(/\?+$/, ""))}</strong>:</p>
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
      text: "Writes, explains and debugs Python. Paste an error and get a fix with the reasoning behind it." },
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
    excel1: { id: "excel1", model: "perplexity", title: "Excel formula tips", messages: [
      { from: "ai", html: "<p>Use <strong>XLOOKUP</strong> instead of VLOOKUP: it searches in any direction, defaults to exact matches and doesn't break when columns are inserted.</p>" },
    ], saved: true },
    tax: { id: "tax", model: "gemini", title: "Tax in Australia", messages: [
      { from: "ai", html: "<p>The Australian financial year runs from <strong>1 July to 30 June</strong>. Individual tax returns are due by 31 October if you lodge yourself, or later if you use a registered tax agent.</p>" },
    ], saved: true },
    party: { id: "party", kind: "message", model: "openai", title: "Surprise party checklist", messages: [
      { from: "ai", html: "<p>Here's how to throw the perfect surprise birthday party:</p><h4>Planning the basics</h4><p>Choose a date and time close to the guest of honor's actual birthday, but consider picking a day slightly before to maximize the surprise element. Select a venue that fits the party size and theme: this could be your home, a rented space, or even an outdoor location.</p><h4>Keeping it secret</h4><p>Enlist help from close friends and family to maintain the surprise. Create a believable \"cover story\" to explain any suspicious behavior or to get the guest of honor to the party location. Be careful with social media posts that could tip off the birthday person.</p><h4>Invitations and guest list</h4><p>Send invitations privately, at least two weeks ahead, and ask guests to arrive 30 minutes before the guest of honor.</p>" },
    ], saved: true },
    filter: { id: "filter", kind: "message", model: "perplexity", title: "FILTER with multiple criteria", messages: [
      { from: "ai", html: "<p>Use <strong>FILTER</strong> to return every row that matches a condition:</p><p><code>=FILTER(A2:C100, (B2:B100=\"Invoice\")*(C2:C100&gt;500))</code></p><p>Multiply conditions for AND, add them for OR. The result spills automatically, so leave room below the formula.</p>" },
    ], saved: true },
    excel2: { id: "excel2", model: "perplexity", title: "SUMIFS for invoice totals", messages: [
      { from: "ai", html: "<p>To sum values that meet a condition, use <strong>SUMIFS</strong>, e.g. <code>=SUMIFS(C:C, A:A, \"Invoice\", B:B, \"&gt;=1/7/2024\")</code>.</p>" },
    ], saved: true },
  });

  const seedFolders = () => ({
    root: ["ds", "excel1", "party"],
    folders: [{ id: "accounting", name: "Accounting", items: ["filter", "tax", "excel2"] }],
  });

  // Bump when seed data changes; `?reset` in the URL also restores it (handy between video takes).
  const DATA_VERSION = 2;
  if (location.search.includes("reset") || store.get("iio.v", 0) !== DATA_VERSION) {
    ["iio.conversations", "iio.folders", "iio.user", "iio.tipOff", "iio.modelOrder", "iio.prompts", "iio.activePrompt"].forEach((k) => { try { localStorage.removeItem(k); } catch { /* ignore */ } });
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
    guestQuestions: 0, // searches + follow-ups asked while signed out
    lastQuery: DEFAULT_QUERY,
    modelOrder: store.get("iio.modelOrder", null),
    prompts: store.get("iio.prompts", null) || [
      { id: "p1", name: "Explain like I'm new", desc: "Plain language, no jargon", text: "Explain answers simply, as if I'm new to the topic. Define any technical terms and use an everyday example." },
      { id: "p2", name: "Quick bullet summary", desc: "Short and scannable", text: "Answer in 5 bullet points or fewer. Lead with the most important point. No introductions." },
      { id: "p3", name: "Business tone", desc: "For work emails and docs", text: "Use a clear, professional tone suitable for sharing with colleagues and clients." },
    ],
    activePrompt: store.get("iio.activePrompt", null),
  };

  state.user = normalizeUser(state.user);

  const persist = () => {
    store.set("iio.user", state.user);
    store.set("iio.conversations", state.conversations);
    store.set("iio.folders", state.folders);
    store.set("iio.modelOrder", state.modelOrder);
    store.set("iio.prompts", state.prompts);
    store.set("iio.activePrompt", state.activePrompt);
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

  // Models in the user's saved order (Reorder AI Models), falling back to the default order.
  const orderedModels = () => {
    const order = state.modelOrder || [];
    return [...MODELS].sort((a, b) => {
      const ia = order.indexOf(a.key), ib = order.indexOf(b.key);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
  };
  const activePromptObj = () => state.prompts.find((p) => p.id === state.activePrompt) || null;
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

  // Guests can ask 5 questions (searches and follow-ups) before sign-up is required.
  const GUEST_LIMIT = 5;
  function useGuestQuestion() {
    if (state.signedIn) return true;
    if (state.guestQuestions >= GUEST_LIMIT) {
      openGate("You've used your 5 free questions", "Sign up for free to keep asking, save answers and follow up without limits.");
      return false;
    }
    state.guestQuestions++;
    const left = GUEST_LIMIT - state.guestQuestions;
    if (left <= 2) toast(left ? `${left} free question${left > 1 ? "s" : ""} left. Sign up for unlimited questions` : "That was your last free question");
    return true;
  }

  // ── Top bar ───────────────────────────────────────────────

  function authControls() {
    return state.signedIn
      ? `<button class="avatar" id="avatar-btn" aria-label="Account menu" aria-haspopup="menu" style="background:${activeProfile().color}">${escapeHtml(nameInitials(activeProfile().name))}</button>`
      : `<div class="auth-buttons">
           <button class="btn btn-secondary" data-auth="login">Log in</button>
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
          <button type="button" class="icon-btn" data-open="reorder" aria-label="Reorder AI models">${icon("tune")}</button>
          <button type="button" class="icon-btn prompt-btn${activePromptObj() ? " is-on" : ""}" data-open="prompts" aria-label="Custom prompts">${icon("library_books")}</button>
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
          <span class="beta">Free during beta</span>
          <img class="brand-logo" src="assets/logo.svg" alt="internet.io" width="212" height="36">
          <p class="tagline">One platform, endless possibilities</p>
        </div>
        <form class="searchbar lg" id="home-search" role="search">
          <span class="icon-btn lead" aria-hidden="true">${icon("search")}</span>
          <input type="search" name="q" placeholder="What do you want to know?" aria-label="What do you want to know?" autocomplete="off" enterkeyhint="search">
          <div class="trail">
            <button type="button" class="icon-btn" data-open="reorder" aria-label="Reorder AI models">${icon("tune")}</button>
            <button type="button" class="icon-btn prompt-btn${activePromptObj() ? " is-on" : ""}" data-open="prompts" aria-label="Custom prompts">${icon("library_books")}</button>
          </div>
        </form>
        <p class="intro">Start exploring insights from multiple AI models. Compare answers, save your favorites and follow up effortlessly.</p>
      </section>
      <section class="how" aria-labelledby="how-title">
        <h2 id="how-title">How it works</h2>
        <ul class="how-list">
          <li class="how-card">${icon("search")}<div><h3>Search like you always do</h3><p>Type your question into the search bar. It feels familiar and is powered by advanced AI models.</p></div></li>
          <li class="how-card">${icon("text_compare")}<div><h3>Compare responses from AI models</h3><p>Compare side-by-side answers from multiple AI models and discover the best insights for your needs.</p></div></li>
          <li class="how-card">${icon("folder")}<div><h3>Save and organize</h3><p>Save your favorite answers and organize them into folders you can open anytime.</p></div></li>
        </ul>
      </section>
      <footer class="footer">
        <small>© 2025 internet.io. All rights reserved.</small>
        <nav class="footer-links" aria-label="Legal">
          <a href="#/" data-soon="Terms of service">Terms of service</a>
          <a href="#/" data-soon="Privacy policy">Privacy policy</a>
          <a href="#/" data-soon="Contact us">Contact us</a>
        </nav>
      </footer>
    </div>`;

    const form = $("#home-search");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = form.q.value.trim() || DEFAULT_QUERY;
      if (!useGuestQuestion()) return;
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
        <p class="results-meta">${MODELS.length} answers from ${MODELS.length} AI models${activePromptObj() ? ` · Prompt: <strong>${escapeHtml(activePromptObj().name)}</strong>` : ""}</p>
        ${orderedModels().map(resultItem).join("")}
      </div>`;
    }, 650);
  }

  function viewAnswer(key, params) {
    const list = orderedModels();
    const idx = Math.max(0, list.findIndex((m) => m.key === key));
    const m = list[idx];
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

    const prev = list[idx - 1];
    const next = list[idx + 1];
    setDock(`<div class="pager-dock">
      <div class="pager">
        <button class="btn prev" ${prev ? `data-go="#/answer/${prev.key}?q=${encodeURIComponent(q)}"` : "disabled"} aria-label="Previous answer">${icon("chevron_left")}</button>
        <button class="btn next" ${next ? `data-go="#/answer/${next.key}?q=${encodeURIComponent(q)}"` : "disabled"} aria-label="Next answer">${icon("chevron_right")}</button>
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
      ${guest ? `<div class="signup-banner"><p>Sign up now to save, organize &amp; ask unlimited follow-ups.</p><button class="btn btn-primary" data-auth="signup">Get started</button></div>` : ""}
    </div>`);

    const form = $("#composer");
    const send = form.querySelector(".send");
    form.msg.addEventListener("input", () => { send.disabled = !form.msg.value.trim(); });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = form.msg.value.trim();
      if (!text) return;
      if (!useGuestQuestion()) return;
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
    if (!quiet) toast("Saved");
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
      <button class="icon-btn srow-more" data-row-menu="item:${id}" aria-label="More options">${icon("more_vert")}</button></li>`;
  }

  function folderRow(f) {
    return `<li class="srow"><a class="srow-main" href="#/chats/folder/${f.id}"><span class="row-ico">${icon("folder")}</span><span class="label">${escapeHtml(f.name)}</span></a>
      <button class="icon-btn srow-more" data-row-menu="folder:${f.id}" aria-label="Folder options">${icon("more_vert")}</button></li>`;
  }

  // Saved Items: flat list; folders open as their own page (Chat Page › Mobile optimisation).
  function viewChats(folderId) {
    if (!state.signedIn) {
      go("#/");
      openGate("Sign in to see your saved chats", "Save answers from any AI model and organize them into folders.");
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
          <h2>${folder ? escapeHtml(folder.name) : "Saved items"}</h2>
          ${folder
            ? `<button class="icon-btn md" data-row-menu="folder:${folder.id}" aria-label="Folder options">${icon("more_vert")}</button>`
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
      <button class="btn btn-primary agent-start" data-go="#/chat/agent?a=${a.key}">${icon("chat_bubble")}Start chat</button>
    </section>`;
    $(".device").appendChild(wrap);
    wrap.addEventListener("click", (e) => { if (e.target === wrap) closeAgent(); });
    wrap.querySelector(".agent-start").focus({ preventScroll: true });
  }
  function closeAgent() { $("#agent-modal")?.remove(); $("#folder-modal")?.remove(); }

  // "New Folder" dialog: same as desktop (Chat Page, node 1233:11272).
  function openNewFolder() {
    const wrap = document.createElement("div");
    wrap.className = "modal-backdrop";
    wrap.id = "folder-modal";
    wrap.innerHTML = `<form class="folder-dialog" role="dialog" aria-modal="true" aria-labelledby="folder-title">
      <div class="folder-head">
        <h2 id="folder-title">New folder</h2>
        <button type="button" class="icon-btn" data-close-agent aria-label="Close">${icon("close")}</button>
      </div>
      <input name="name" value="Untitled folder" maxlength="40" aria-label="Folder name" autocomplete="off">
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
    form.name.focus({ preventScroll: true });
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

  // ── Dialogs & sheets ──────────────────────────────────────

  function openModal(html, { sheet = false, id = "app-modal" } = {}) {
    closeModal();
    const wrap = document.createElement("div");
    wrap.className = `modal-backdrop${sheet ? " as-sheet" : ""}`;
    wrap.id = id;
    wrap.dataset.modal = "";
    wrap.innerHTML = html;
    $(".device").appendChild(wrap);
    wrap.addEventListener("click", (e) => { if (e.target === wrap) closeModal(); });
    return wrap;
  }
  function closeModal() { document.querySelectorAll("[data-modal]").forEach((m) => m.remove()); }

  const dialogHead = (title, { back = false } = {}) => `<div class="dlg-head">
      ${back ? `<button type="button" class="icon-btn" data-dlg-back aria-label="Back">${icon("arrow_back")}</button>` : ""}
      <h2>${title}</h2>
      <button type="button" class="icon-btn dlg-close" data-close-modal aria-label="Close">${icon("close")}</button>
    </div>`;

  // Where an item lives: null = Saved items root, otherwise the folder object.
  const folderOf = (id) => state.folders.folders.find((f) => f.items.includes(id)) || null;
  const detach = (id) => {
    state.folders.root = state.folders.root.filter((x) => x !== id);
    state.folders.folders.forEach((f) => { f.items = f.items.filter((x) => x !== id); });
  };
  function placeItem(id, folderId) {
    detach(id);
    const f = folderId && state.folders.folders.find((x) => x.id === folderId);
    if (f) f.items.unshift(id); else state.folders.root.unshift(id);
    state.justAdded = id;
  }

  // Add to folder (Chat Page, 928:16167): choosing a destination saves the chat there.
  function openAddToFolder(convo) {
    const F = state.folders;
    const render = (creating = false) => `<div class="dlg">
      ${dialogHead("Add to folder")}
      <div class="dlg-body folder-pick">
        <button class="pick-row" data-add-to=""><span class="ms">chat_bubble</span><span>Saved items</span></button>
        ${F.folders.map((f) => `<button class="pick-row sub" data-add-to="${f.id}"><span class="ms caret">arrow_right</span><span class="ms">folder</span><span>${escapeHtml(f.name)}</span></button>`).join("")}
        ${creating
          ? `<form class="pick-new" id="pick-new"><span class="ms">create_new_folder</span><input name="name" value="Untitled folder" maxlength="40" aria-label="New folder name"><button class="btn btn-primary" type="submit">Add</button></form>`
          : `<button class="pick-row link" data-add-new><span class="ms">create_new_folder</span><span>New folder</span></button>`}
      </div>
      <div class="dlg-actions"><button class="btn btn-secondary" data-close-modal>Close</button></div>
    </div>`;
    const wrap = openModal(render());
    wrap.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      if (b.dataset.addTo !== undefined) {
        convo.saved = true;
        placeItem(convo.id, b.dataset.addTo || null);
        persist();
        syncSaveChips(convo);
        closeModal();
        const f = F.folders.find((x) => x.id === b.dataset.addTo);
        toast(f ? `Saved to ${f.name}` : "Saved");
      } else if (b.hasAttribute("data-add-new")) {
        wrap.innerHTML = render(true);
        const form = $("#pick-new");
        form.name.focus({ preventScroll: true });
        form.name.select();
        form.addEventListener("submit", (ev) => {
          ev.preventDefault();
          const name = form.name.value.trim();
          if (!name) return;
          const id = `f${Date.now()}`;
          F.folders.push({ id, name, items: [] });
          convo.saved = true;
          placeItem(convo.id, id);
          persist();
          syncSaveChips(convo);
          closeModal();
          toast(`Saved to ${name}`);
        });
      }
    });
  }

  // Row ⋮ menu: Rename / Move / Delete (folders: Rename / Delete).
  function openRowMenu(anchor, ref) {
    closeRowMenu();
    const [type, id] = ref.split(":");
    const menuEl = document.createElement("div");
    menuEl.className = "row-menu";
    menuEl.id = "row-menu";
    menuEl.setAttribute("role", "menu");
    menuEl.innerHTML = `<button role="menuitem" data-act="rename" data-ref="${ref}">Rename</button>
      ${type === "item" ? `<button role="menuitem" data-act="move" data-ref="${ref}">Move</button>` : ""}
      <button role="menuitem" class="danger" data-act="delete" data-ref="${ref}">Delete</button>`;
    const dev = $(".device").getBoundingClientRect();
    const a = anchor.getBoundingClientRect();
    menuEl.style.top = `${a.bottom - dev.top + 4}px`;
    menuEl.style.right = `${dev.right - a.right}px`;
    $(".device").appendChild(menuEl);
    const below = menuEl.getBoundingClientRect();
    if (below.bottom > dev.bottom - 110) menuEl.style.top = `${a.top - dev.top - below.height - 4}px`;
  }
  function closeRowMenu() { $("#row-menu")?.remove(); }

  function itemTitle(ref) {
    const [type, id] = ref.split(":");
    return type === "item" ? state.conversations[id]?.title : state.folders.folders.find((f) => f.id === id)?.name;
  }

  function openRename(ref) {
    const [type, id] = ref.split(":");
    const wrap = openModal(`<form class="dlg" id="rename-form">
      ${dialogHead("Rename")}
      <div class="dlg-body"><input class="dlg-input" name="name" value="${escapeHtml(itemTitle(ref) || "")}" maxlength="80" aria-label="Name"></div>
      <div class="dlg-actions"><button type="button" class="btn btn-secondary" data-close-modal>Cancel</button><button class="btn btn-primary" type="submit">OK</button></div>
    </form>`);
    const form = wrap.querySelector("form");
    form.name.focus({ preventScroll: true });
    form.name.select();
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      if (!name) return;
      if (type === "item") state.conversations[id].title = name;
      else state.folders.folders.find((f) => f.id === id).name = name;
      persist();
      closeModal();
      route();
      toast("Renamed");
    });
  }

  function openMove(ref) {
    const id = ref.split(":")[1];
    const from = folderOf(id);
    let target = from ? from.id : "";
    const wrap = openModal(`<form class="dlg" id="move-form">
      ${dialogHead(`Move “${escapeHtml(itemTitle(ref))}”`)}
      <div class="dlg-body">
        <p class="move-from"><span>From:</span>${icon(from ? "folder" : "chat_bubble")}${escapeHtml(from ? from.name : "Saved items")}</p>
        <p class="move-label">Select a folder</p>
        <div class="move-list" role="radiogroup">
          ${[{ id: "", name: "Saved items" }, ...state.folders.folders].map((f) => `<label class="move-row">
            <input type="radio" name="dest" value="${f.id}" ${f.id === target ? "checked" : ""}>
            ${icon(f.id ? "folder" : "chat_bubble")}<span>${escapeHtml(f.name)}</span></label>`).join("")}
        </div>
      </div>
      <div class="dlg-actions"><button type="button" class="btn btn-secondary" data-close-modal>Cancel</button><button class="btn btn-primary" type="submit" disabled>Move</button></div>
    </form>`);
    const form = wrap.querySelector("form");
    const submit = form.querySelector("[type=submit]");
    form.addEventListener("change", () => { submit.disabled = form.dest.value === target; });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const dest = form.dest.value;
      placeItem(id, dest || null);
      persist();
      closeModal();
      route();
      toast(`Moved to ${dest ? state.folders.folders.find((f) => f.id === dest).name : "Saved items"}`);
    });
  }

  function openDelete(ref) {
    const [type, id] = ref.split(":");
    const folder = type === "folder" && state.folders.folders.find((f) => f.id === id);
    const wrap = openModal(`<div class="dlg">
      ${dialogHead("Delete?")}
      <div class="dlg-body"><p class="dlg-text">“${escapeHtml(itemTitle(ref))}” will be deleted${folder && folder.items.length ? `. The ${folder.items.length} item${folder.items.length > 1 ? "s" : ""} inside will move to My Chats` : ""}.</p></div>
      <div class="dlg-actions"><button class="btn btn-secondary" data-close-modal>Cancel</button><button class="btn btn-danger" data-confirm-delete>Delete</button></div>
    </div>`);
    wrap.querySelector("[data-confirm-delete]").addEventListener("click", () => {
      const inFolderView = parseHash().parts[2] === id;
      if (folder) {
        state.folders.root.push(...folder.items);
        state.folders.folders = state.folders.folders.filter((f) => f.id !== id);
      } else {
        detach(id);
        delete state.conversations[id];
      }
      persist();
      closeModal();
      if (inFolderView || (type === "item" && parseHash().parts[1] === id)) go("#/chats"); else route();
      toast("Deleted");
    });
  }

  // Reorder AI Models (495:18866): drag the handles, Save applies the order to results.
  function openReorder() {
    let order = orderedModels().map((m) => m.key);
    const render = () => `<div class="dlg sheet-dlg">
      ${dialogHead("Reorder AI models")}
      <div class="dlg-body">
        <p class="dlg-info">${icon("info")}Drag models to change the order of your results, then tap Save.</p>
        <ul class="reorder-list" id="reorder-list">
          ${order.map((k) => { const m = modelByKey(k); return `<li class="reorder-row" data-key="${k}">
            <span class="drag-handle" aria-label="Drag to reorder">${icon("drag_indicator")}</span>
            <img src="${m.icon}" alt="" width="24" height="24"><span class="rn">${m.name}</span><span class="rid">${m.id}</span></li>`; }).join("")}
        </ul>
      </div>
      <div class="dlg-actions"><button class="btn btn-text" data-reorder-reset>Reset</button><span class="spacer"></span><button class="btn btn-secondary" data-close-modal>Cancel</button><button class="btn btn-primary" data-reorder-save>Save</button></div>
    </div>`;
    const wrap = openModal(render(), { sheet: true });
    const wire = () => {
      const list = $("#reorder-list");
      list.addEventListener("pointerdown", (e) => {
        const row = e.target.closest(".reorder-row");
        if (!row || !e.target.closest(".drag-handle")) return;
        e.preventDefault();
        row.classList.add("dragging");
        row.setPointerCapture(e.pointerId);
        const move = (ev) => {
          const rows = [...list.children].filter((r) => r !== row);
          const after = rows.find((r) => { const b = r.getBoundingClientRect(); return ev.clientY < b.top + b.height / 2; });
          list.insertBefore(row, after || null);
        };
        const up = () => {
          row.classList.remove("dragging");
          row.removeEventListener("pointermove", move);
          order = [...list.children].map((r) => r.dataset.key);
        };
        row.addEventListener("pointermove", move);
        row.addEventListener("pointerup", up, { once: true });
        row.addEventListener("pointercancel", up, { once: true });
      });
    };
    wire();
    wrap.addEventListener("click", (e) => {
      if (e.target.closest("[data-reorder-reset]")) { order = MODELS.map((m) => m.key); wrap.innerHTML = render(); wire(); }
      if (e.target.closest("[data-reorder-save]")) {
        state.modelOrder = order;
        persist();
        closeModal();
        toast("Model order saved");
        if (["results", "answer"].includes(parseHash().parts[0])) route();
      }
    });
  }

  // Custom Prompts (503:30567 / 501:20078): pick an active prompt, add, edit, delete with undo.
  function openPrompts() {
    let selected = state.activePrompt;
    let query = "";
    let undo = null; // { prompt, index }
    let wrap;
    const listHtml = () => {
      const items = state.prompts.filter((p) => !query || `${p.name} ${p.desc} ${p.text}`.toLowerCase().includes(query.toLowerCase()));
      return `${undo ? `<div class="undo-bar">You deleted <strong>${escapeHtml(undo.prompt.name)}</strong><button data-prompt-undo>Undo</button></div>` : ""}
        ${items.map((p) => `<div class="prompt-card${p.id === selected ? " is-on" : ""}">
          <label class="prompt-pick"><input type="radio" name="prompt" value="${p.id}" ${p.id === selected ? "checked" : ""}>
            <span><strong>${escapeHtml(p.name)}</strong><span class="prompt-text">${escapeHtml(p.text)}</span></span></label>
          <button class="icon-btn" data-prompt-edit="${p.id}" aria-label="Edit ${escapeHtml(p.name)}">${icon("edit")}</button>
          <button class="icon-btn" data-prompt-del="${p.id}" aria-label="Delete ${escapeHtml(p.name)}" ${p.id === selected ? "disabled" : ""}>${icon("delete")}</button>
        </div>`).join("") || `<p class="prompt-empty">${state.prompts.length ? "No prompts match your search." : "No custom prompts yet. Create one to personalize every answer."}</p>`}`;
    };
    const listView = () => `<div class="dlg sheet-dlg">
      ${dialogHead("Custom prompts")}
      <div class="dlg-body">
        <p class="dlg-info">${icon("info")}Create prompts that shape every answer. The one you select is applied to all AI models.</p>
        <div class="prompt-tools">
          <label class="prompt-search">${icon("search")}<input type="search" placeholder="Search for a custom prompt" value="${escapeHtml(query)}" aria-label="Search prompts" id="prompt-q"></label>
          <button class="btn-link" data-prompt-new>${icon("add")}New prompt</button>
        </div>
        <div class="prompt-list" id="prompt-list">${listHtml()}</div>
      </div>
      <div class="dlg-actions"><button class="btn btn-text" data-prompt-clear ${selected ? "" : "disabled"}>Clear selection</button><span class="spacer"></span><button class="btn btn-secondary" data-close-modal>Cancel</button><button class="btn btn-primary" data-prompt-save ${selected === state.activePrompt ? "disabled" : ""}>Save</button></div>
    </div>`;
    const formView = (p) => `<form class="dlg sheet-dlg" id="prompt-form">
      ${dialogHead(p ? "Edit prompt" : "New prompt", { back: true })}
      <div class="dlg-body prompt-form">
        <label class="auth-field"><span class="auth-label">Name</span><span class="auth-input"><input name="name" placeholder="Enter a name for your prompt" value="${escapeHtml(p?.name || "")}" maxlength="40"></span></label>
        <label class="auth-field"><span class="auth-label">Description</span><span class="auth-input"><input name="desc" placeholder="Add a brief description" value="${escapeHtml(p?.desc || "")}" maxlength="80"></span></label>
        <label class="auth-field"><span class="auth-label">Prompt</span><textarea name="text" placeholder="Write your custom prompt here" rows="6">${escapeHtml(p?.text || "")}</textarea></label>
      </div>
      <div class="dlg-actions"><button type="button" class="btn btn-secondary" data-dlg-back>Back</button><button class="btn btn-primary" type="submit">Save</button></div>
    </form>`;
    const showList = () => {
      wrap.innerHTML = listView();
      $("#prompt-q").addEventListener("input", (e) => { query = e.target.value; $("#prompt-list").innerHTML = listHtml(); });
    };
    const refreshFooter = () => {
      wrap.querySelector("[data-prompt-clear]").disabled = !selected;
      wrap.querySelector("[data-prompt-save]").disabled = selected === state.activePrompt;
    };
    const showForm = (p) => {
      wrap.innerHTML = formView(p);
      const form = $("#prompt-form");
      const submit = form.querySelector("[type=submit]");
      const check = () => { submit.disabled = !(form.name.value.trim() && form.text.value.trim()); };
      form.addEventListener("input", check);
      check();
      form.name.focus({ preventScroll: true });
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = { name: form.name.value.trim(), desc: form.desc.value.trim(), text: form.text.value.trim() };
        if (p) Object.assign(p, data);
        else { const np = { id: `p${Date.now()}`, ...data }; state.prompts.unshift(np); selected = np.id; }
        persist();
        showList();
        refreshFooter();
        toast(p ? "Prompt updated" : "Prompt created");
      });
    };
    wrap = openModal("", { sheet: true });
    showList();
    wrap.addEventListener("change", (e) => {
      if (e.target.name === "prompt") {
        selected = e.target.value;
        $("#prompt-list").innerHTML = listHtml();
        refreshFooter();
      }
    });
    wrap.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      if (b.hasAttribute("data-prompt-new")) return showForm(null);
      if (b.dataset.promptEdit) return showForm(state.prompts.find((p) => p.id === b.dataset.promptEdit));
      if (b.hasAttribute("data-dlg-back")) { showList(); return refreshFooter(); }
      if (b.dataset.promptDel) {
        const index = state.prompts.findIndex((p) => p.id === b.dataset.promptDel);
        undo = { prompt: state.prompts[index], index };
        state.prompts.splice(index, 1);
        persist();
        $("#prompt-list").innerHTML = listHtml();
        return;
      }
      if (b.hasAttribute("data-prompt-undo") && undo) {
        state.prompts.splice(undo.index, 0, undo.prompt);
        undo = null;
        persist();
        $("#prompt-list").innerHTML = listHtml();
        return;
      }
      if (b.hasAttribute("data-prompt-clear")) {
        selected = null;
        $("#prompt-list").innerHTML = listHtml();
        return refreshFooter();
      }
      if (b.hasAttribute("data-prompt-save")) {
        state.activePrompt = selected;
        persist();
        closeModal();
        toast(selected ? `Prompt “${activePromptObj().name}” is active` : "No prompt applied");
        document.querySelectorAll(".prompt-btn").forEach((x) => x.classList.toggle("is-on", !!selected));
        if (parseHash().parts[0] === "results") route();
      }
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
      <p class="auth-headline">Get started with internet.io</p>
      ${socialButtons()}
      <form class="auth-form" id="signup-form" novalidate>
        ${field("first", "First Name", { placeholder: "E.g., John", autocomplete: "given-name" })}
        ${field("last", "Last Name", { placeholder: "E.g., Doe", autocomplete: "family-name" })}
        ${field("email", "Email", { type: "email", placeholder: "your@email.com", autocomplete: "email" })}
        ${field("password", "Password", { type: "password", placeholder: "Create a strong password", autocomplete: "new-password", hint: "At least 8 characters" })}
        <button class="btn btn-primary btn-block" type="submit">Continue</button>
      </form>
      <p class="auth-switch">Already have an account? <a href="#/login">Log in</a></p>`);
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
    empty?.focus({ preventScroll: true });
  }

  function viewSignupProfile() {
    if (!state.signup.first) return go("#/signup");
    const name = `${state.signup.first} ${state.signup.last}`.trim();
    screen.innerHTML = authShell(`
      <p class="auth-headline">Create your first profile</p>
      <div class="profile-slots" aria-hidden="true">
        <span class="ms fill is-on">account_circle</span><span class="ms fill">account_circle</span><span class="ms fill">account_circle</span>
      </div>
      <form class="auth-form" id="profile-form" novalidate>
        ${field("profile", "Profile 1", { value: name })}
        <p class="auth-note">Create up to 3 profiles: one for work, one for fun, or one for someone else.</p>
        <button class="btn btn-primary btn-block" type="submit">Create</button>
      </form>`, { back: false });
    wireForm($("#profile-form"), (f) => f.profile.value.trim(), (f) => {
      completeAuth({ ...state.signup, profile: f.profile.value.trim() }, `Welcome to internet.io, ${state.signup.first}!`);
      state.signup = {};
    });
  }

  function viewLogin() {
    screen.innerHTML = authShell(`
      <p class="auth-headline">Log in to your account</p>
      ${socialButtons()}
      <form class="auth-form" id="login-form" novalidate>
        ${field("email", "Email", { type: "email", placeholder: "Enter your email", autocomplete: "email" })}
        ${field("password", "Password", { type: "password", placeholder: "Enter your password", autocomplete: "current-password" })}
        <button type="button" class="auth-link" data-soon="Password reset">Forgot password?</button>
        <button class="btn btn-primary btn-block" type="submit">Log in</button>
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
        loginAs(user);
      });
  }

  // Profiles are stored as [{ name, color }]; plain strings (or a single `profile`) are upgraded.
  function normalizeUser(u) {
    let list = u.profiles || [u.profile || `${u.first} ${u.last}`];
    list = list.map((p, i) => (typeof p === "string" ? { name: p, color: PROFILE_COLORS[i % 3] } : p));
    return { first: u.first, last: u.last, email: u.email, profiles: list, active: Math.min(u.active || 0, list.length - 1) };
  }

  // Accounts with several profiles pick one after login (desktop "Choose your profile").
  function loginAs(user) {
    const u = normalizeUser(user);
    if (u.profiles.length > 1) {
      state.pendingUser = u;
      return go("#/login/profile");
    }
    completeAuth(u, `Welcome back, ${u.first}`);
  }

  function viewChooseProfile() {
    const u = state.pendingUser;
    if (!u) return go("#/login");
    screen.innerHTML = authShell(`
      <p class="auth-headline">Choose your profile</p>
      <div class="choose-list">
        ${u.profiles.map((p, i) => `<button class="choose-row" data-choose="${i}"><span class="avatar" style="background:${p.color}">${escapeHtml(nameInitials(p.name))}</span><span>${escapeHtml(p.name)}</span></button>`).join("")}
        ${u.profiles.length < 3 ? `<button class="choose-row new" data-choose-new><span class="choose-plus">${icon("add")}</span><span>New profile</span></button>` : ""}
      </div>`);
  }

  function completeAuth(user, message) {
    state.user = normalizeUser(user);
    state.signedIn = true;
    state.guestQuestions = 0;
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
    viewResults.token = null; // cancel a pending results render from a previous screen
    closeMenu();
    closeRowMenu();
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
      if (page === "login" && arg === "profile") viewChooseProfile();
      else if (page === "login") viewLogin();
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
      case "explore":
        if (!state.signedIn) { go("#/"); openGate("Sign up to explore AI agents", "Chat with specialized agents for writing, coding, studying and more."); break; }
        viewExplore(); setActiveTab("explore"); break;
      default: viewHome(); setActiveTab("search");
    }
    if (page !== "chat") screen.scrollTop = 0;
  }

  // ── Sheet & menu ──────────────────────────────────────────

  const sheet = $("#sheet");
  const backdrop = $("#sheet-backdrop");
  let lastFocus = null;

  // Guest gate: explains why an account is needed and routes to sign up / login.
  function openGate(title = "Sign up to save your answers", text = "Save answers, organize them into folders and ask unlimited follow-ups.") {
    lastFocus = document.activeElement;
    state.returnTo = location.hash || "#/";
    $("#sheet-title").textContent = title;
    $("#sheet-text").textContent = text;
    sheet.hidden = false;
    backdrop.hidden = false;
    sheet.querySelector("[data-auth=signup]").focus({ preventScroll: true });
  }
  function closeSheet({ restoreFocus = true } = {}) {
    if (sheet.hidden) return;
    sheet.hidden = true;
    backdrop.hidden = true;
    if (restoreFocus && lastFocus) lastFocus.focus?.({ preventScroll: true });
  }
  backdrop.addEventListener("click", () => closeSheet());

  const menu = $("#avatar-menu");
  function closeMenu() { menu.hidden = true; }

  // Account dropdown: matches the Figma "User Dropdown" component.
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
        <p class="um-label">Switch profile</p>
        ${u.profiles.map((p, i) => `<button class="um-row${i === u.active ? " is-active" : ""}" role="menuitemradio" aria-checked="${i === u.active}" data-profile="${i}">
          <span class="avatar avatar-xs" style="background:${p.color}">${escapeHtml(nameInitials(p.name))}</span><span>${escapeHtml(p.name)}</span></button>`).join("")}
        ${u.profiles.length < 3 ? `<button class="um-row" role="menuitem" data-new-profile><span class="um-ico">${icon("add")}</span><span>New profile</span></button>` : ""}
      </div>
      <div class="um-section">
        <button class="um-row" role="menuitem" data-soon="Feedback form is coming soon"><span class="um-ico">${icon("mail")}</span><span>Leave feedback</span></button>
        <button class="um-row" role="menuitem" data-logout><span class="um-ico">${icon("logout")}</span><span>Log out</span></button>
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
    input.focus({ preventScroll: true });
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
    if (!e.target.closest("#row-menu, [data-row-menu]")) closeRowMenu();
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
      if (parseHash().parts[0] === "login") return loginAs(state.user);
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
      input.focus({ preventScroll: true });
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
      return toast(/soon|empty|yet/i.test(label) ? label : `${label} is coming soon`);
    }

    if (t.dataset.go) return go(t.dataset.go);
    if (t.hasAttribute("data-back")) return history.length > 1 ? history.back() : go("#/chats");

    if (t.hasAttribute("data-clear")) {
      const input = $("#top-search input");
      input.value = "";
      return input.focus({ preventScroll: true });
    }

    if (t.dataset.tab === "explore" && !state.signedIn) {
      e.preventDefault();
      return openGate("Sign up to explore AI agents", "Chat with specialized agents for writing, coding, studying and more.");
    }
    if (t.dataset.tab === "chats" && !state.signedIn) {
      e.preventDefault();
      return openGate("Sign in to see your saved chats", "Save answers from any AI model and organize them into folders.");
    }


    if (t.hasAttribute("data-new-folder")) return openNewFolder();
    if (t.hasAttribute("data-close-modal")) return closeModal();
    if (t.dataset.open === "reorder" || t.dataset.open === "prompts") {
      if (!state.signedIn) return openGate(t.dataset.open === "reorder" ? "Sign in to reorder AI models" : "Sign in to use custom prompts", "Personalize how answers are ordered and written with a free account.");
      return t.dataset.open === "reorder" ? openReorder() : openPrompts();
    }
    if (t.dataset.rowMenu) {
      e.preventDefault();
      if ($("#row-menu")?.dataset.for === t.dataset.rowMenu) return closeRowMenu();
      openRowMenu(t, t.dataset.rowMenu);
      $("#row-menu").dataset.for = t.dataset.rowMenu;
      return;
    }
    if (t.dataset.act) {
      closeRowMenu();
      const ref = t.dataset.ref;
      if (t.dataset.act === "rename") return openRename(ref);
      if (t.dataset.act === "move") return openMove(ref);
      return openDelete(ref);
    }
    if (t.dataset.choose !== undefined) {
      const u = state.pendingUser;
      u.active = +t.dataset.choose;
      state.pendingUser = null;
      return completeAuth(u, `Welcome back, ${u.profiles[u.active].name}`);
    }
    if (t.hasAttribute("data-choose-new")) {
      inlineEdit(t, "", (name) => {
        const u = state.pendingUser;
        if (!name || !u) return viewChooseProfile();
        u.profiles.push({ name, color: PROFILE_COLORS[u.profiles.length % 3] });
        u.active = u.profiles.length - 1;
        state.pendingUser = null;
        completeAuth(u, `Profile “${name}” created`);
      });
      return;
    }
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
        if (!state.signedIn) return openGate("Sign up to save answers", "Save answers from any AI model and organize them into folders.");
        return openAddToFolder(convo);
      }
    }
  });

  document.addEventListener("submit", (e) => {
    if (e.target.id === "top-search") {
      e.preventDefault();
      const q = e.target.q.value.trim() || DEFAULT_QUERY;
      if (!useGuestQuestion()) return;
      go(`#/results?q=${encodeURIComponent(q)}`);
      if (parseHash().params.get("q") === q) route();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!sheet.hidden) closeSheet();
    if (!menu.hidden) closeMenu();
    closeAgent();
    closeModal();
    closeRowMenu();
  });

  window.addEventListener("hashchange", route);
  route();
})();
