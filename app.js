/* internet.io mobile prototype — hash-routed single page app */

(() => {
  "use strict";

  // ── Content ───────────────────────────────────────────────

  const DEFAULT_QUERY = "what is design system?";

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

  const AGENTS = [
    { emoji: "✍️", name: "Writing Coach", text: "Tightens drafts, fixes tone and suggests stronger openings." },
    { emoji: "🚀", name: "Startup Advisor", text: "Pressure-tests ideas, pricing and go-to-market plans." },
    { emoji: "🔥", name: "Roastbot", text: "Brutally honest feedback on your landing page or pitch." },
    { emoji: "📊", name: "Excel Helper", text: "Writes formulas and explains them step by step." },
    { emoji: "🧾", name: "Tax Explainer", text: "Plain-English answers about Australian tax basics." },
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
    excel2: { id: "excel2", model: "perplexity", title: "Excel Formula Tips", messages: [
      { from: "ai", html: "<p>To sum values that meet a condition, use <strong>SUMIFS</strong>, e.g. <code>=SUMIFS(C:C, A:A, \"Invoice\", B:B, \"&gt;=1/7/2024\")</code>.</p>" },
    ], saved: true },
  });

  const seedFolders = () => ({
    root: ["ds", "excel1"],
    folders: [{ id: "accounting", name: "Accounting Project", items: ["tax", "excel2"] }],
    open: { mychats: true, accounting: true },
  });

  const state = {
    signedIn: store.get("iio.signedIn", false),
    conversations: store.get("iio.conversations", null) || seedConversations(),
    folders: store.get("iio.folders", null) || seedFolders(),
    guestFollowUps: 0,
    lastQuery: DEFAULT_QUERY,
  };

  const persist = () => {
    store.set("iio.signedIn", state.signedIn);
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
      ? `<button class="avatar" id="avatar-btn" aria-label="Account menu" aria-haspopup="menu">JD</button>`
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
    } else {
      convo = state.conversations[id];
      if (!convo) return go("#/chats");
    }
    const m = modelByKey(convo.model);
    renderTopbar();

    screen.innerHTML = `<div class="view convo-wrap">
      <section class="convo" aria-label="Conversation">
        <div class="convo-head">
          <button class="icon-btn md" data-back aria-label="Back">${icon("arrow_back")}</button>
          <h2>Saved Items</h2>
          <button class="icon-btn md" data-soon="Conversation options" aria-label="More options">${icon("more_vert")}</button>
        </div>
        <div class="convo-body" id="convo-body">
          <div class="convo-title">
            <img class="model-icon" src="${m.icon}" alt="${m.name}" width="36" height="36">
            <div><h3>${escapeHtml(convo.title)}</h3><span>${m.id}</span></div>
          </div>
          ${convo.messages.map(renderMessage).join("")}
        </div>
      </section>
    </div>`;
    syncSaveChips(convo);

    const guest = !state.signedIn;
    setDock(`<div class="input-dock${guest ? " guest" : ""}">
      <form class="composer" id="composer">
        <input name="msg" placeholder="Type your follow-up question" aria-label="Follow-up question" autocomplete="off" enterkeyhint="send">
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
        openSheet("Sign up for unlimited follow-ups", "Guests get one free follow-up. Sign up to keep the conversation going.");
        return;
      }
      if (guest) state.guestFollowUps++;
      form.msg.value = "";
      send.disabled = true;
      addFollowUp(convo, text);
    });

    screen.scrollTop = 0;
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
      const msg = { from: "ai", html: isPlan ? PLAN_ANSWER : FOLLOW_UP_ANSWER(text) };
      convo.messages.push(msg);
      typingEl.outerHTML = renderMessage(msg);
      syncSaveChips(convo);
      persist();
      scrollToEnd();
    }, 1100);
  }

  function scrollToEnd() {
    requestAnimationFrame(() => screen.scrollTo({ top: screen.scrollHeight, behavior: "smooth" }));
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

  function convoRow(id, cls = "leaf") {
    const c = state.conversations[id];
    if (!c) return "";
    const m = modelByKey(c.model);
    const isNew = state.justAdded === id;
    return `<li><a class="tree-row ${cls}${isNew ? " is-new" : ""}" href="#/chat/${id}">
      <img class="conv-icon" src="${m.icon}" alt="" width="20" height="20">
      <span class="label">${escapeHtml(c.title)}</span>
    </a></li>`;
  }

  function viewChats() {
    if (!state.signedIn) {
      go("#/");
      openSheet("Sign in to see your saved chats", "Save answers from any AI model and organise them into folders.");
      return;
    }
    renderTopbar();
    const f = state.folders;
    screen.innerHTML = `<div class="view chats">
      <ul class="tree" role="tree" aria-label="Chats">
        <li role="treeitem" aria-expanded="${!!f.open.mychats}">
          <div style="position:relative;display:flex;align-items:center">
            <button class="tree-row" data-toggle="mychats" aria-expanded="${!!f.open.mychats}">
              ${icon("arrow_right", "caret")}${icon("chat_bubble")}<span class="label">My Chats</span>
            </button>
            <button class="icon-btn tail" data-new-folder aria-label="New folder" style="position:absolute;right:0">${icon("create_new_folder")}</button>
          </div>
          <ul class="group" ${f.open.mychats ? "" : "hidden"}>
            ${f.root.map((id) => convoRow(id)).join("")}
            ${f.folders.map((folder) => `
              <li role="treeitem" aria-expanded="${!!f.open[folder.id]}">
                <div style="position:relative;display:flex;align-items:center">
                  <button class="tree-row sub" data-toggle="${folder.id}" aria-expanded="${!!f.open[folder.id]}">
                    ${icon("arrow_right", "caret")}${icon("folder")}<span class="label">${escapeHtml(folder.name)}</span>
                  </button>
                  <button class="icon-btn tail" data-soon="Folder options" aria-label="Folder options" style="position:absolute;right:0">${icon("more_vert")}</button>
                </div>
                <ul class="group tree-sub" ${f.open[folder.id] ? "" : "hidden"}>
                  ${folder.items.map((id) => convoRow(id)).join("") || `<li class="tree-row leaf" style="color:var(--grey-500);font-size:14px">Empty folder</li>`}
                </ul>
              </li>`).join("")}
          </ul>
        </li>
      </ul>
      <ul class="tree">
        <li><button class="tree-row plain" data-soon="Nothing shared with you yet">${icon("group")}<span class="label">Shared with me</span></button></li>
        <li><button class="tree-row plain" data-soon="Bin is empty">${icon("delete")}<span class="label">Bin</span></button></li>
      </ul>
    </div>`;
    state.justAdded = null;
  }

  function viewExplore() {
    renderTopbar();
    screen.innerHTML = `<div class="view explore">
      <h2>Explore AI agents</h2>
      <p>Need a writing coach? Startup advisor? Roastbot? Pick an agent with its own tone, role and mindset.</p>
      <ul class="agent-list">
        ${AGENTS.map((a) => `<li><button class="agent" style="width:100%;text-align:left" data-soon="${a.name} — coming soon">
          <span class="agent-emoji" aria-hidden="true">${a.emoji}</span>
          <span><h3>${a.name}</h3><p>${a.text}</p></span>
        </button></li>`).join("")}
      </ul>
    </div>`;
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
    setDock("");
    const { parts, params } = parseHash();
    const [page, arg] = parts;
    switch (page) {
      case "results": viewResults(params); setActiveTab("search"); break;
      case "answer": viewAnswer(arg, params); setActiveTab("search"); break;
      case "chat": viewChat(arg, params); setActiveTab("chats"); break;
      case "chats": viewChats(); setActiveTab("chats"); break;
      case "explore": viewExplore(); setActiveTab("explore"); break;
      default: viewHome(); setActiveTab("search");
    }
    if (page !== "chat") screen.scrollTop = 0;
  }

  // ── Sheet & menu ──────────────────────────────────────────

  const sheet = $("#sheet");
  const backdrop = $("#sheet-backdrop");
  let lastFocus = null;

  function openSheet(title = "Sign up to save your answers", text = "Save answers, organise them into folders and ask unlimited follow-ups.", cta = "Continue") {
    lastFocus = document.activeElement;
    $("#sheet-title").textContent = title;
    $("#sheet-text").textContent = text;
    $("#sheet-submit").textContent = cta;
    sheet.hidden = false;
    backdrop.hidden = false;
    $("#sheet-submit").focus();
  }
  function closeSheet() {
    sheet.hidden = true;
    backdrop.hidden = true;
    if (lastFocus) lastFocus.focus?.();
  }

  $("#sheet-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#sheet-email").value.trim();
    $("#menu-email").textContent = email || "jane.doe@example.com";
    state.signedIn = true;
    state.guestFollowUps = 0;
    persist();
    closeSheet();
    route();
    toast("Signed in as Jane Doe");
  });
  backdrop.addEventListener("click", closeSheet);

  const menu = $("#avatar-menu");
  function closeMenu() { menu.hidden = true; }

  $("#sign-out").addEventListener("click", () => {
    state.signedIn = false;
    persist();
    closeMenu();
    const { parts } = parseHash();
    if (parts[0] === "chats") go("#/"); else route();
    toast("Signed out");
  });

  // ── Global event delegation ───────────────────────────────

  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, a");
    if (!t) {
      if (!menu.hidden && !e.target.closest("#avatar-menu")) closeMenu();
      return;
    }

    if (t.id === "avatar-btn") { menu.hidden = !menu.hidden; return; }
    if (!menu.hidden && !t.closest("#avatar-menu")) closeMenu();

    if (t.dataset.auth === "login") return openSheet("Welcome back", "Log in to see your saved chats and folders.", "Log in");
    if (t.dataset.auth === "signup") return openSheet();

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
      return openSheet("Sign in to see your saved chats", "Save answers from any AI model and organise them into folders.");
    }

    if (t.dataset.toggle) {
      const key = t.dataset.toggle;
      state.folders.open[key] = !state.folders.open[key];
      persist();
      const li = t.closest("[role=treeitem]");
      const group = li.querySelector(":scope > .group");
      group.hidden = !state.folders.open[key];
      t.setAttribute("aria-expanded", state.folders.open[key]);
      li.setAttribute("aria-expanded", state.folders.open[key]);
      return;
    }

    if (t.hasAttribute("data-new-folder")) {
      const n = state.folders.folders.length + 1;
      const id = `f${Date.now()}`;
      state.folders.folders.push({ id, name: `New Folder ${n}`, items: [] });
      state.folders.open.mychats = true;
      state.folders.open[id] = true;
      persist();
      viewChats();
      return toast("Folder created");
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
        if (!state.signedIn) return openSheet("Sign up to save answers", "Save answers from any AI model and organise them into folders.");
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
  });

  window.addEventListener("hashchange", route);
  route();
})();
