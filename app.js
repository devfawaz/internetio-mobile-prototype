/* internet.io mobile prototype: hash-routed single page app */

(() => {
  "use strict";

  // ── Content ───────────────────────────────────────────────

  const DEFAULT_QUERY = "Plan a 5-day trip to Tokyo";
  const PROFILE_COLORS = ["#1b51aa", "#039286", "#706aff"];

  const TOKYO_OPENAI = `
    <p>Five days is enough to see Tokyo's highlights without rushing. Group each day by neighborhood so you spend your time exploring, not commuting.</p>
    <h4>Day by day</h4>
    <ol>
      <li><strong>Day 1, Shinjuku:</strong> Arrive, get a Suica card, walk Shinjuku Gyoen, then dinner in Omoide Yokocho and the free Tokyo Metropolitan Government observatory at night.</li>
      <li><strong>Day 2, Asakusa and Ueno:</strong> Senso-ji early before the crowds, Nakamise street snacks, Ueno Park and Ameyoko market in the afternoon.</li>
      <li><strong>Day 3, Shibuya and Harajuku:</strong> Meiji Shrine in the morning, Takeshita Street, Omotesando cafés, Shibuya Crossing and Shibuya Sky at sunset.</li>
      <li><strong>Day 4, day trip:</strong> Nikko for temples and waterfalls, or Kamakura for the Great Buddha and the coast.</li>
      <li><strong>Day 5, Tsukiji and Ginza:</strong> Breakfast at Tsukiji Outer Market, teamLab Planets, then shopping in Ginza before you fly.</li>
    </ol>
    <h4>Good to know</h4>
    <ol>
      <li><strong>Getting around:</strong> Trains cover everything. A Suica card in your phone's wallet works on every line.</li>
      <li><strong>Budget:</strong> Around $150 to $250 a day covers a mid-range hotel, food and transport.</li>
      <li><strong>Book ahead:</strong> Shibuya Sky and teamLab sell out, so reserve them a week before.</li>
    </ol>`;

  const MODELS = [
    {
      key: "openai", name: "OpenAI", id: "gpt-4o", icon: "assets/icons/openai.svg",
      title: "5 days in Tokyo: a neighborhood-by-neighborhood plan",
      summary: "Group each day by neighborhood so you explore instead of commute: Shinjuku, Asakusa and Ueno, Shibuya and Harajuku, a day trip to Nikko or Kamakura, then Tsukiji and Ginza before you fly.",
      body: TOKYO_OPENAI,
    },
    {
      key: "meta", name: "Meta AI", id: "meta-llama-3.1", icon: "assets/icons/meta.svg",
      title: "Tokyo in 5 days for first-time visitors",
      summary: "Balance famous sights with slower moments. Mix Senso-ji and Shibuya Crossing with quieter spots like Yanaka's old streets and an evening in a local izakaya.",
      body: `
        <p>For a first visit, balance the famous sights with slower moments so the trip doesn't feel like a checklist.</p>
        <h4>Must-sees</h4>
        <ol>
          <li><strong>Senso-ji and Asakusa:</strong> Tokyo's oldest temple, best before 8am.</li>
          <li><strong>Shibuya Crossing:</strong> Watch it from above at Shibuya Sky or the Starbucks overlooking it.</li>
          <li><strong>Meiji Shrine:</strong> A quiet forest walk right next to busy Harajuku.</li>
        </ol>
        <h4>Slower moments</h4>
        <ol>
          <li><strong>Yanaka:</strong> Old wooden houses, small shops and cats. Tokyo as it was.</li>
          <li><strong>An izakaya night:</strong> Small plates and drinks with locals in Ebisu or Koenji.</li>
          <li><strong>A sento:</strong> Public baths are a cheap, very local way to end a long day.</li>
        </ol>`,
    },
    {
      key: "gemini", name: "Gemini", id: "gemini-1.5 pro", icon: "assets/icons/gemini.svg",
      title: "Your Tokyo trip: itinerary, costs and tips",
      summary: "A practical plan with estimated costs: about $1,400 for five days including a mid-range hotel, food, transport and two paid attractions, plus when to book what.",
      body: `
        <p>Here's a practical plan with rough costs for one person, excluding flights.</p>
        <h4>Estimated budget for 5 days</h4>
        <ol>
          <li><strong>Hotel:</strong> $110 a night in Shinjuku or Ueno, about $550.</li>
          <li><strong>Food:</strong> $45 a day mixing ramen, konbini breakfasts and one nice dinner, about $225.</li>
          <li><strong>Transport:</strong> Suica top-ups and a day-trip ticket, about $90.</li>
          <li><strong>Attractions:</strong> teamLab, Shibuya Sky and temples, about $80.</li>
        </ol>
        <h4>When to book</h4>
        <ol>
          <li><strong>2 months ahead:</strong> Hotels, especially in spring and autumn.</li>
          <li><strong>1 week ahead:</strong> teamLab Planets and Shibuya Sky time slots.</li>
          <li><strong>On arrival:</strong> Everything else. Walk-ins are easy almost everywhere.</li>
        </ol>`,
    },
    {
      key: "azure", name: "Azure AI", id: "azure-model", icon: "assets/icons/azure.svg",
      title: "A relaxed 5-day Tokyo itinerary",
      summary: "One big sight per day with plenty of downtime: mornings for temples and gardens, afternoons for cafés and neighborhoods, evenings for food.",
      body: `
        <p>If you prefer a slower pace, plan one big sight per day and leave room to wander.</p>
        <ol>
          <li><strong>Mornings:</strong> Temples and gardens before the crowds: Senso-ji, Meiji Shrine, Rikugien.</li>
          <li><strong>Afternoons:</strong> Coffee and browsing in Kichijoji, Shimokitazawa or Nakameguro.</li>
          <li><strong>Evenings:</strong> Food streets like Omoide Yokocho, or a sushi counter in Ginza.</li>
        </ol>
        <p>Keep day 4 free. Tokyo rewards spontaneity.</p>`,
    },
    {
      key: "perplexity", name: "Perplexity", id: "llama-3.1-sonar", icon: "assets/icons/perplexity.svg",
      title: "Top things to do in Tokyo, with sources",
      summary: "The most recommended experiences across travel guides: Senso-ji, Shibuya Sky, teamLab Planets, Tsukiji Outer Market and a day trip to Nikko or Mount Fuji.",
      body: `
        <p>These are the experiences travel guides recommend most often for a 5-day stay:</p>
        <ol>
          <li><strong>Senso-ji, Asakusa:</strong> Tokyo's oldest temple [1].</li>
          <li><strong>Shibuya Sky:</strong> Open-air rooftop with views of the crossing [2].</li>
          <li><strong>teamLab Planets:</strong> Immersive digital art you walk through barefoot [3].</li>
          <li><strong>Tsukiji Outer Market:</strong> Fresh sushi and street food for breakfast [1].</li>
          <li><strong>Day trip:</strong> Nikko or Lake Kawaguchiko for views of Mount Fuji [4].</li>
        </ol>
        <p>Sources: [1] Japan National Tourism Organization, [2] Shibuya Sky, [3] teamLab, [4] Lonely Planet.</p>`,
    },
    {
      key: "anthropic", name: "Anthropic", id: "claude-3-5-sonnet", icon: "assets/icons/anthropic.svg",
      title: "Planning Tokyo: what to prioritize",
      summary: "Decide what kind of trip you want first. Food lovers, culture seekers and shoppers would plan very different weeks, so here's how to shape five days around your priorities.",
      body: `
        <p>Before picking sights, decide what kind of trip you want. Five days goes further when it has a focus.</p>
        <ol>
          <li><strong>If you love food:</strong> Base yourself near Shinjuku or Shibuya and plan around markets, depachika food halls and a kaiseki dinner.</li>
          <li><strong>If you love culture:</strong> Stay in Ueno or Asakusa, add museums and a day in Nikko.</li>
          <li><strong>If you love shopping:</strong> Harajuku, Shimokitazawa for vintage, Akihabara for tech and games.</li>
        </ol>
        <p>Tell me which sounds most like you and I'll tailor the days.</p>`,
    },
    {
      key: "cohere", name: "Cohere", id: "command-r-plus", icon: "assets/icons/cohere.svg",
      title: "Tokyo 5-day plan: quick version",
      summary: "Day 1 Shinjuku, day 2 Asakusa, day 3 Shibuya and Harajuku, day 4 a day trip, day 5 Ginza. Get a Suica card and book teamLab in advance.",
      body: `
        <ol>
          <li><strong>Day 1:</strong> Shinjuku, Omoide Yokocho, free city views.</li>
          <li><strong>Day 2:</strong> Asakusa, Senso-ji, Ueno Park.</li>
          <li><strong>Day 3:</strong> Harajuku, Meiji Shrine, Shibuya Crossing.</li>
          <li><strong>Day 4:</strong> Day trip to Kamakura or Nikko.</li>
          <li><strong>Day 5:</strong> Tsukiji breakfast, Ginza, departure.</li>
        </ol>
        <p>Get a Suica card on arrival and book teamLab Planets in advance.</p>`,
    },
  ];

  const PLAN_QUESTION = "Can you make it cheaper? My budget is $1,000 without flights.";
  const PLAN_ANSWER = `
    <p>You can do Tokyo well on $1,000 for five days. Here's how the budget version changes:</p>
    <h4>Where the savings come from</h4>
    <ol>
      <li><strong>Stay:</strong> A capsule or business hotel in Ueno at about $60 a night, $300 total.</li>
      <li><strong>Food:</strong> Konbini breakfasts, ramen and teishoku lunches, one izakaya night. About $30 a day, $150 total.</li>
      <li><strong>Sights:</strong> Swap Shibuya Sky for the free Metropolitan Government observatory, and Nikko for Kamakura, which is closer and cheaper.</li>
    </ol>
    <h4>Your new total</h4>
    <ol>
      <li><strong>Stay, food and transport:</strong> about $540.</li>
      <li><strong>teamLab and Kamakura:</strong> about $60.</li>
      <li><strong>Left for shopping and extras:</strong> about $400.</li>
    </ol>`;

  const ADOPTION_ANSWER = `
    <p>In mid-April Tokyo is mild, usually 12 to 20°C, with a chance of rain.</p>
    <ol>
      <li><strong>Layers:</strong> T-shirts, a light sweater and a packable rain jacket.</li>
      <li><strong>Comfortable shoes:</strong> You'll walk 15,000 steps a day, and temples ask you to remove them, so slip-ons help.</li>
      <li><strong>Essentials:</strong> A small coin purse, a portable charger and a pocket Wi-Fi or eSIM.</li>
      <li><strong>Leave room:</strong> You'll want space for snacks and souvenirs on the way home.</li>
    </ol>`;

  const FOLLOW_UP_ANSWER = (q) => `
    <p>Good question. Building on the plan above, here's what I'd suggest for <strong>${escapeHtml(q.replace(/\?+$/, ""))}</strong>:</p>
    <ol>
      <li><strong>Keep it close:</strong> Pick options near the neighborhoods you're already visiting that day.</li>
      <li><strong>Check timing:</strong> Popular spots are quietest right at opening.</li>
      <li><strong>Book what sells out:</strong> Reserve anything with timed entry a week ahead.</li>
    </ol>
    <p>Want me to add this to your day-by-day plan?</p>`;

  const AGENT_ANSWER = (a, q) => a.reply && a.demo && q.trim().toLowerCase() === a.demo.toLowerCase() ? a.reply : `
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
    { key: "code-master", demo: "Why does my loop skip items when I remove them from a list?", reply: `<p>Removing items while you loop over the same list shifts every later item one place to the left, so the loop jumps over the next one.</p><p>Loop over a copy, or build a new list instead:</p><p><code>items = [x for x in items if not should_remove(x)]</code></p><p>This keeps the original order and never skips anything.</p>`, name: "Code Master", by: "John Doe", cat: "Programming", icon: "code", bg: "#e8f0fe", fg: "#1b51aa", rating: "4.8", convos: "12K+",
      text: "Writes, explains and debugs Python. Paste an error and get a fix with the reasoning behind it." },
    { key: "campaign-crafter", demo: "Plan a launch campaign for a fitness app", reply: `<p>Here's a 3-week launch plan:</p><ol><li><strong>Week 1, tease:</strong> Short Reels showing one workout, with a waitlist link.</li><li><strong>Week 2, proof:</strong> Share results from 10 beta users and a founder story.</li><li><strong>Week 3, launch:</strong> Launch-day email, a 7-day free trial and creator partnerships.</li></ol><p>Want copy for the launch email?</p>`, name: "Campaign Crafter", by: "Maya Chen", cat: "Marketing", icon: "campaign", bg: "#fff8bb", fg: "#7e7100", rating: "4.6", convos: "8.4K",
      text: "Plans multi-channel campaigns and writes on-brand copy for every channel, from ads to launch emails." },
    { key: "deal-closer", name: "Deal Closer", by: "Ravi Patel", cat: "Sales", icon: "handshake", bg: "#e6f4ea", fg: "#1b7e37", rating: "4.5", convos: "5.1K",
      text: "Drafts follow-up emails, handles objections and preps talking points before every sales call." },
    { key: "study-buddy", demo: "Quiz me on photosynthesis", reply: `<p>Let's start easy. <strong>Question 1 of 5:</strong></p><p>Where in the plant cell does photosynthesis happen?</p><ol><li>Mitochondria</li><li>Chloroplasts</li><li>Nucleus</li></ol><p>Reply with 1, 2 or 3.</p>`, name: "Study Buddy", by: "Lena Ortiz", cat: "Education", icon: "school", bg: "#fce8f3", fg: "#c2185b", rating: "4.9", convos: "21K+",
      text: "Turns any topic into flashcards, practice quizzes and plain-English explanations." },
    { key: "focus-planner", name: "Focus Planner", by: "Sam Okafor", cat: "Productivity", icon: "bolt", bg: "#fff3e0", fg: "#c34500", rating: "4.7", convos: "9.8K",
      text: "Breaks big goals into a realistic daily plan and nudges you back on track when things slip." },
    { key: "chart-whisperer", name: "Chart Whisperer", by: "Priya Nair", cat: "Data Analysis", icon: "insights", bg: "#e0f7fa", fg: "#007b86", rating: "4.6", convos: "6.2K",
      text: "Explains spreadsheets, spots trends and recommends the right chart for your data." },
    { key: "budget-buddy", demo: "Help me build a monthly budget on $4,000", reply: `<p>Using the 50/30/20 rule on $4,000:</p><ol><li><strong>Needs, $2,000:</strong> Rent, groceries, bills and transport.</li><li><strong>Wants, $1,200:</strong> Eating out, subscriptions and hobbies.</li><li><strong>Savings, $800:</strong> Emergency fund first, then investing.</li></ol><p>Tell me your rent and I'll fine-tune it.</p>`, name: "Budget Buddy", by: "Tom Walsh", cat: "Finance", icon: "savings", bg: "#ede7f6", fg: "#5e35b1", rating: "4.4", convos: "3.9K",
      text: "Builds monthly budgets, sorts your spending into categories and explains tax basics simply." },
    { key: "story-spark", name: "Story Spark", by: "Aiko Tanaka", cat: "Writing", icon: "edit_note", bg: "#ffebee", fg: "#c62828", rating: "4.8", convos: "15K+",
      text: "Brainstorms plots, sharpens dialogue and fixes pacing in your short stories and scripts." },
    { key: "pitch-polisher", name: "Pitch Polisher", by: "Noah Brooks", cat: "Marketing", icon: "rocket_launch", bg: "#e3f2fd", fg: "#1565c0", rating: "4.5", convos: "4.7K",
      text: "Pressure-tests your startup pitch and rewrites each slide so investors get the point in seconds." },
    { key: "lesson-planner", name: "Lesson Planner", by: "Grace Liu", cat: "Education", icon: "menu_book", bg: "#f1f8e9", fg: "#4c7d2a", rating: "4.7", convos: "7.3K",
      text: "Creates lesson plans, activities and rubrics for any grade level in minutes." },
    { key: "inbox-zero", name: "Inbox Zero", by: "Dan Moreau", cat: "Productivity", icon: "mail", bg: "#fbe9e7", fg: "#c23c13", rating: "4.3", convos: "2.8K",
      text: "Summarises long threads, drafts replies and suggests what can safely wait." },
    { key: "sql-sidekick", name: "SQL Sidekick", by: "Omar Haddad", cat: "Programming", icon: "database", bg: "#eceff1", fg: "#455a64", rating: "4.6", convos: "5.5K",
      text: "Writes and explains SQL queries, and spots why a slow query is slow." },
    { key: "seo-scout", name: "SEO Scout", by: "Hana Kim", cat: "Marketing", icon: "query_stats", bg: "#e8f5e9", fg: "#2e7d32", rating: "4.4", convos: "3.9K",
      text: "Finds the keywords your audience searches for and rewrites page titles and headings to rank higher." },
    { key: "social-scheduler", name: "Social Scheduler", by: "Leo Martins", cat: "Marketing", icon: "calendar_month", bg: "#e1f5fe", fg: "#0277bd", rating: "4.6", convos: "8.1K",
      text: "Turns one idea into a week of posts for Instagram, LinkedIn and X, with the best times to publish." },
    { key: "brand-voice", name: "Brand Voice", by: "Chloe Martin", cat: "Marketing", icon: "record_voice_over", bg: "#f3e5f5", fg: "#8e24aa", rating: "4.5", convos: "2.4K",
      text: "Learns your brand's tone from a few examples and keeps every headline, caption and email on-voice." },
    { key: "lead-qualifier", name: "Lead Qualifier", by: "Marcus Reid", cat: "Sales", icon: "person_search", bg: "#e8eaf6", fg: "#3949ab", rating: "4.3", convos: "1.9K",
      text: "Scores inbound leads by fit and intent and tells you who to call first and what to open with." },
    { key: "proposal-pro", name: "Proposal Pro", by: "Sofia Russo", cat: "Sales", icon: "description", bg: "#e0f2f1", fg: "#00796b", rating: "4.7", convos: "4.4K",
      text: "Drafts client proposals with scope, timeline and pricing tables from a short call summary." },
    { key: "objection-coach", name: "Objection Coach", by: "Kwame Asante", cat: "Sales", icon: "forum", bg: "#fff3e0", fg: "#c34500", rating: "4.4", convos: "2.1K",
      text: "Role-plays tough prospects so you can practise answers to price, timing and competitor objections." },
    { key: "language-partner", name: "Language Partner", by: "Elena Petrova", cat: "Education", icon: "translate", bg: "#e3f2fd", fg: "#1565c0", rating: "4.8", convos: "21K+",
      text: "Chats with you in Spanish, French, Japanese and more, and gently corrects mistakes as you go." },
    { key: "meeting-notes", name: "Meeting Notes", by: "Rachel Green", cat: "Productivity", icon: "event_note", bg: "#f1f8e9", fg: "#4c7d2a", rating: "4.6", convos: "11K",
      text: "Turns messy meeting notes into a clean summary with decisions, owners and next steps." },
    { key: "habit-tracker", name: "Habit Coach", by: "Yusuf Demir", cat: "Productivity", icon: "self_improvement", bg: "#fce4ec", fg: "#ad1457", rating: "4.4", convos: "3.6K",
      text: "Helps you build one habit at a time with small daily goals and a weekly check-in." },
    { key: "survey-sense", name: "Survey Sense", by: "Mei Lin", cat: "Data Analysis", icon: "poll", bg: "#fff8e1", fg: "#a66a00", rating: "4.5", convos: "2.7K",
      text: "Groups open-ended survey answers into themes and pulls out the quotes that matter." },
    { key: "dashboard-draft", name: "Dashboard Draft", by: "Arjun Mehta", cat: "Data Analysis", icon: "dashboard", bg: "#e8f0fe", fg: "#1b51aa", rating: "4.3", convos: "1.6K",
      text: "Suggests the metrics and layout for a KPI dashboard and explains what each chart should show." },
    { key: "formula-fixer", name: "Formula Fixer", by: "Lucy Evans", cat: "Data Analysis", icon: "functions", bg: "#e6f4ea", fg: "#1b7e37", rating: "4.7", convos: "9.2K",
      text: "Writes and fixes Excel and Google Sheets formulas, from VLOOKUP to nested IFs, and explains each step." },
    { key: "tax-helper", name: "Tax Helper", by: "Daniel Cho", cat: "Finance", icon: "receipt_long", bg: "#eceff1", fg: "#455a64", rating: "4.4", convos: "5.8K",
      text: "Explains deductions and filing basics in plain English and builds a checklist of documents to gather." },
    { key: "split-it", name: "Split It", by: "Nina Alvarez", cat: "Finance", icon: "payments", bg: "#e0f7fa", fg: "#007b86", rating: "4.6", convos: "3.1K",
      text: "Splits shared bills, rent and trip costs fairly, and works out who owes whom." },
    { key: "money-explainer", name: "Money Explainer", by: "Oliver Bennett", cat: "Finance", icon: "account_balance", bg: "#e8eaf6", fg: "#3949ab", rating: "4.5", convos: "6.4K",
      text: "Explains interest rates, credit scores and savings accounts without the jargon." },
    { key: "blog-builder", name: "Blog Builder", by: "Priya Shah", cat: "Writing", icon: "article", bg: "#e3f2fd", fg: "#1565c0", rating: "4.5", convos: "7.7K",
      text: "Outlines and drafts blog posts from a topic and a few bullet points, ready for your edits." },
    { key: "resume-refiner", name: "Resume Refiner", by: "Jordan Lee", cat: "Writing", icon: "work", bg: "#f3e5f5", fg: "#8e24aa", rating: "4.8", convos: "18K",
      text: "Rewrites your resume bullets to show impact and tailors them to the job you're applying for." },
    { key: "grammar-guard", name: "Grammar Guard", by: "Emma Walsh", cat: "Writing", icon: "spellcheck", bg: "#e6f4ea", fg: "#1b7e37", rating: "4.6", convos: "12K",
      text: "Fixes grammar and clunky sentences while keeping your voice, and explains each change." },
    { key: "bug-hunter", name: "Bug Hunter", by: "Sven Larsen", cat: "Programming", icon: "bug_report", bg: "#ffebee", fg: "#c62828", rating: "4.5", convos: "4.9K",
      text: "Reads stack traces and error logs, finds the likely cause and suggests a fix to try first." },
    { key: "regex-wizard", name: "Regex Wizard", by: "Ana Costa", cat: "Programming", icon: "data_object", bg: "#fff8bb", fg: "#7e7100", rating: "4.4", convos: "2.2K",
      text: "Builds regular expressions from plain-English descriptions and tests them against your examples." },
    { key: "api-assistant", name: "API Assistant", by: "Kenji Sato", cat: "Programming", icon: "api", bg: "#e0f2f1", fg: "#00796b", rating: "4.6", convos: "3.4K",
      text: "Reads API docs for you and writes the request, headers and example responses you need." },
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
        { from: "ai", html: TOKYO_OPENAI },
        { from: "user", text: PLAN_QUESTION },
        { from: "ai", html: PLAN_ANSWER },
      ],
      saved: true,
    },
    meal: { id: "meal", model: "gemini", title: "High-protein meal prep for the week", messages: [
      { from: "ai", html: "<p>Cook once on Sunday, eat well all week:</p><ol><li><strong>Protein:</strong> Bake 1kg of chicken thighs with paprika and garlic.</li><li><strong>Carbs:</strong> A big pot of rice and a tray of roasted sweet potato.</li><li><strong>Veg:</strong> Roast broccoli and peppers; keep a bag of spinach for fresh sides.</li><li><strong>Sauces:</strong> Yogurt garlic sauce and a quick peanut dressing keep it from getting boring.</li></ol><p>That's about 40g of protein per box, five lunches in under two hours.</p>" },
    ], saved: true },
    raise: { id: "raise", model: "anthropic", title: "Email asking for a raise", messages: [
      { from: "ai", html: "<p><strong>Subject:</strong> Time to talk about my compensation</p><p>Hi Sarah,</p><p>Over the past year I've led the checkout redesign, which lifted conversion by 12%, and I've taken on onboarding for two new team members. I'd like to discuss adjusting my salary to reflect this. Could we find 30 minutes next week?</p><p>Thanks,<br>John</p>" },
    ], saved: true },
    party: { id: "party", kind: "message", model: "openai", title: "Surprise party checklist", messages: [
      { from: "ai", html: "<p>Here's how to throw a great surprise birthday party:</p><h4>Planning the basics</h4><p>Pick a date a few days before the real birthday so it's a genuine surprise, and choose a venue that fits the group: your place, a private room at a restaurant, or a park.</p><h4>Keeping it secret</h4><p>Bring one close friend in to help, agree on a believable cover story to get the guest of honor there, and keep it off social media.</p><h4>Invitations and guest list</h4><p>Send invites privately two weeks ahead and ask everyone to arrive 30 minutes early.</p>" },
    ], saved: true },
    shinkansen: { id: "shinkansen", kind: "message", model: "perplexity", title: "Is the JR Pass worth it?", messages: [
      { from: "ai", html: "<p>For a Tokyo-only trip with one day trip, <strong>no</strong>. After the 2023 price rise, a 7-day JR Pass costs about $330, while individual tickets for Tokyo plus Nikko or Kamakura come to under $80.</p><p>It only pays off if you're also going to Kyoto and Osaka.</p>" },
    ], saved: true },
    ryokan: { id: "ryokan", model: "gemini", title: "Best ryokan near Tokyo under $200", messages: [
      { from: "ai", html: "<p>Three well-reviewed options within two hours of Tokyo:</p><ol><li><strong>Hakone:</strong> Private onsen rooms from about $180 a night with dinner.</li><li><strong>Nikko:</strong> Riverside ryokan near the temples, about $150.</li><li><strong>Kawaguchiko:</strong> Mount Fuji views from the bath, about $190.</li></ol>" },
    ], saved: true },
    budget: { id: "budget", model: "openai", title: "Excel formula to track trip spending", messages: [
      { from: "ai", html: "<p>Use <strong>SUMIFS</strong> to total spending by category, e.g. <code>=SUMIFS(C:C, B:B, \"Food\")</code>. Add a <strong>Currency</strong> column and multiply by the yen rate to see everything in dollars.</p>" },
    ], saved: true },
  });

  const seedFolders = () => ({
    root: ["meal", "raise", "party"],
    folders: [{ id: "japan", name: "Japan trip", items: ["ds", "shinkansen", "ryokan", "budget"] }],
  });

  // Bump when seed data changes; `?reset` in the URL also restores it (handy between video takes).
  const DATA_VERSION = 3;
  if (location.search.includes("reset") || store.get("iio.v", 0) !== DATA_VERSION) {
    ["iio.conversations", "iio.folders", "iio.user", "iio.tipOff", "iio.modelOrder", "iio.prompts", "iio.activePrompt", "iio.myAgents"].forEach((k) => { try { localStorage.removeItem(k); } catch { /* ignore */ } });
    store.set("iio.v", DATA_VERSION);
    if (location.search.includes("reset")) {
      const sp = new URLSearchParams(location.search);
      sp.delete("reset");
      history.replaceState(null, "", location.pathname + (sp.toString() ? `?${sp}` : "") + location.hash);
    }
  }

  const state = {
    signedIn: false, // every visit starts logged out
    user: store.get("iio.user", null) || { first: "John", last: "Doe", email: "johndoe@gmail.com", profiles: ["John Doe", "Work", "Martha Doe"] },
    signup: {},
    returnTo: "#/",
    exploreCat: "All",
    exploreQuery: "",
    conversations: store.get("iio.conversations", null) || seedConversations(),
    folders: store.get("iio.folders", null) || seedFolders(),
    guestQuestions: 0,
    searchHash: "#/", // last Search-tab screen, restored when returning to the tab
    searchScroll: {},
    loadedQueries: new Set(),
    currentHash: null, // searches + follow-ups asked while signed out
    lastQuery: DEFAULT_QUERY,
    openFolders: new Set(), // folders expanded in the desktop Saved sidebar
    modelOrder: store.get("iio.modelOrder", null),
    prompts: store.get("iio.prompts", null) || [
      { id: "p1", name: "Explain like I'm new", desc: "Plain language, no jargon", text: "Explain answers simply, as if I'm new to the topic. Define any technical terms and use an everyday example." },
      { id: "p2", name: "Quick bullet summary", desc: "Short and scannable", text: "Answer in 5 bullet points or fewer. Lead with the most important point. No introductions." },
      { id: "p3", name: "Business tone", desc: "For work emails and docs", text: "Use a clear, professional tone suitable for sharing with colleagues and clients." },
    ],
    activePrompt: store.get("iio.activePrompt", null),
    // Agents the user built (AI Agents › Creating an AI Agent). Seeded with one for the Japan trip story.
    myAgents: store.get("iio.myAgents", null) || [
      { key: "my-tokyo-planner", name: "Tokyo Trip Planner", by: "John Doe", cat: "Productivity", icon: "smart_toy", bg: "#e8eaf6", fg: "#3949ab", rating: "New", convos: "12",
        text: "Plans day-by-day Tokyo itineraries on a budget, with train routes and what to book ahead.", flow: ["simple", "tavily", "output"], mine: true },
    ],
    agentDraft: null,
  };

  state.user = normalizeUser(state.user);

  const persist = () => {
    store.set("iio.user", state.user);
    store.set("iio.conversations", state.conversations);
    store.set("iio.folders", state.folders);
    store.set("iio.modelOrder", state.modelOrder);
    store.set("iio.prompts", state.prompts);
    store.set("iio.activePrompt", state.activePrompt);
    store.set("iio.myAgents", state.myAgents);
  };

  // ── Helpers ───────────────────────────────────────────────

  const $ = (sel, root = document) => root.querySelector(sel);
  const app = $("#app");
  const topbar = $("#topbar");
  const screen = $("#screen");
  const dock = $("#dock");
  const tabbar = $("#tabbar");

  // Responsive: 1024px and up renders the desktop web app (Figma "🖥️ Web App").
  // `?mobile` keeps the phone frame on a desktop browser (used for the mobile recordings).
  const forceMobile = new URLSearchParams(location.search).has("mobile");
  const deskMQ = matchMedia("(min-width: 1024px)");
  const isDesk = () => !forceMobile && deskMQ.matches;
  const applyLayout = () => document.documentElement.classList.toggle("is-desktop", isDesk());
  applyLayout();
  deskMQ.addEventListener("change", () => { applyLayout(); closeModal(); route(); });

  // Patch the screen instead of replacing it: when the new view has the same layout, unchanged regions
  // stay put (sidebars keep scroll, only their highlight updates) and only changed panels swap in.
  function setView(html) {
    const tpl = document.createElement("template");
    tpl.innerHTML = html.trim();
    const next = tpl.content.firstElementChild;
    const cur = screen.firstElementChild;
    const sig = (el) => [...el.children].map((c) => `${c.tagName}.${c.classList[0] || ""}`).join("|");
    const same = cur && next && tpl.content.childElementCount === 1 && screen.childElementCount === 1
      && cur.tagName === next.tagName && cur.className === next.className && sig(cur) === sig(next);
    if (!same) { screen.innerHTML = html; return false; }
    [...next.children].forEach((n, i) => {
      const c = cur.children[i];
      if (c.isEqualNode(n)) return;
      if (c.classList.contains("desk-side")) {
        const top = c.scrollTop;
        n.classList.add("no-anim");
        c.replaceWith(n);
        n.scrollTop = top;
        return;
      }
      n.classList.add("swap-in");
      c.replaceWith(n);
    });
    [...cur.attributes].forEach((a) => { if (!next.hasAttribute(a.name)) cur.removeAttribute(a.name); });
    [...next.attributes].forEach((a) => cur.setAttribute(a.name, a.value));
    return true;
  }

  // Thin top progress bar while something is "loading" (simulated fetches).
  let loading = 0;
  const progress = (on) => {
    loading = Math.max(0, loading + (on ? 1 : -1));
    document.getElementById("progress")?.classList.toggle("on", loading > 0);
  };

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
  const allAgents = () => [...state.myAgents, ...AGENTS];
  const agentByKey = (key) => allAgents().find((a) => a.key === key) || AGENTS[0];
  const nameInitials = (n) => n.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";
  const activeProfile = () => state.user.profiles[state.user.active] || state.user.profiles[0];
  const initials = (u) => `${(u.first || "?")[0]}${(u.last || "")[0] || ""}`.toUpperCase();
  const agentTile = (a, size = 40) =>
    `<span class="agent-tile" style="--tile-bg:${a.bg};--tile-fg:${a.fg};--tile:${size}px" aria-hidden="true">${a.img ? `<img src="${a.img}" alt="">` : `<span class="ms" data-g="${a.icon}">${a.icon}</span>`}</span>`;
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

  // Types example queries into an input's placeholder, one after another. Stops while
  // the field is focused or filled; static when the user prefers reduced motion.
  let typeTimer = null;
  function typewriter(input, examples) {
    clearTimeout(typeTimer);
    const base = input.getAttribute("placeholder");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { input.placeholder = examples[0]; return; }
    let i = 0, n = 0, deleting = false;
    const tick = () => {
      if (!input.isConnected) return;
      if (document.activeElement === input || input.value) { input.placeholder = base; typeTimer = setTimeout(tick, 600); return; }
      const text = examples[i % examples.length];
      n += deleting ? -1 : 1;
      input.placeholder = text.slice(0, n) || base;
      let delay = deleting ? 28 : 55;
      if (!deleting && n >= text.length) { deleting = true; delay = 1800; }
      else if (deleting && n <= 0) { deleting = false; i++; delay = 350; }
      typeTimer = setTimeout(tick, delay);
    };
    typeTimer = setTimeout(tick, 700);
  }

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

  function renderTopbar({ logo = true, search = null, extra = "" } = {}) {
    let html = `<div class="topbar-row${logo ? "" : " end"}">
      ${logo ? `<a class="topbar-home" href="#/" aria-label="internet.io home"><img class="topbar-logo" src="assets/logo.svg" alt="internet.io" width="118" height="20"></a>` : ""}
      <div class="topbar-end">
        <button class="icon-btn mail-btn" data-feedback aria-label="Leave feedback" title="Leave feedback">${icon("mail")}</button>
        ${authControls()}
      </div>
    </div>`;
    if (search !== null) {
      html += `<form class="searchbar" id="top-search" role="search">
        <a class="icon-btn lead" href="#/" aria-label="Back">${icon("arrow_back")}</a>
        <input type="search" name="q" value="${escapeHtml(search)}" aria-label="Search" placeholder="What do you want to know?" autocomplete="off" enterkeyhint="search">
        <div class="trail">
          <button type="button" class="icon-btn" data-clear aria-label="Clear" title="Clear">${icon("close")}</button>
          <button type="button" class="icon-btn" data-open="reorder" aria-label="Reorder AI models" title="Reorder AI models">${icon("tune")}</button>
          <button type="button" class="icon-btn prompt-btn${activePromptObj() ? " is-on" : ""}" data-open="prompts" aria-label="Custom prompts" title="Custom prompts">${icon("library_books")}</button>
        </div>
      </form>`;
    }
    html += extra;
    if (topbar.dataset.sig === html) {
      // Same bar: keep it (and any focus), just sync the query text.
      const input = topbar.querySelector("#top-search input");
      if (input && search !== null && document.activeElement !== input) input.value = search;
      return;
    }
    topbar.dataset.sig = html;
    topbar.innerHTML = html;
  }

  // ── Screens ───────────────────────────────────────────────

  function viewHome() {
    renderTopbar({ logo: false });
    setView(`<div class="view home">
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
            <button type="button" class="icon-btn" data-open="reorder" aria-label="Reorder AI models" title="Reorder AI models">${icon("tune")}</button>
            <button type="button" class="icon-btn prompt-btn${activePromptObj() ? " is-on" : ""}" data-open="prompts" aria-label="Custom prompts" title="Custom prompts">${icon("library_books")}</button>
          </div>
        </form>
        <p class="intro">Start exploring insights from multiple AI models. Compare answers, save your favorites and follow up effortlessly.</p>
        <p class="watch desk-only">Curious? Discover what's possible in 90 seconds.
          <button class="watch-btn" data-watch-video>${icon("play_circle")}Watch video</button></p>
      </section>
      <a class="ph-badge desk-only" href="https://www.producthunt.com/products/internet-io" target="_blank" rel="noopener" aria-label="internet.io on Product Hunt (opens in a new tab)">
        <span class="ph-logo" aria-hidden="true">P</span>
        <span class="ph-text"><small>FEATURED ON</small>Product Hunt</span>
        <span class="ph-votes" aria-hidden="true"><i>▲</i>211</span>
      </a>
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
          <a href="#/" data-feedback>Contact us</a>
        </nav>
      </footer>
    </div>`);

    const form = $("#home-search");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = form.q.value.trim() || DEFAULT_QUERY;
      if (!useGuestQuestion()) return;
      go(`#/results?q=${encodeURIComponent(q)}`);
    });
    // Tapping into an empty field pre-fills the demo query so the flow is one tap away.
    typewriter(form.q, ["Plan a 5-day trip to Tokyo", "Healthy dinners under 30 minutes", "How do I ask for a raise?", "Best laptop for students in 2026"]);
  }

  // ── Gathering AI responses (Search Results › loading state) ──
  // A new search streams in: models answer one by one. Unanswered cards shimmer, the header reads
  // "Gathering AI responses…", and Ask follow-up waits until every model has answered.
  const gather = {}; // q -> { ready: Set<key> }
  const pendingFills = {}; // `${q}|${key}` -> fill()
  const FOLLOWUP_WAIT = "Follow-up will be available once all responses are generated.";
  const isGathering = (q) => !!gather[q];
  const isReady = (q, key) => !gather[q] || gather[q].ready.has(key);

  function startGather(q) {
    if (gather[q] || state.loadedQueries.has(q)) return;
    gather[q] = { ready: new Set(), step: 0 };
    progress(true);
    // Status line cycles while the models answer.
    gather[q].timer = setInterval(() => {
      const g = gather[q];
      if (!g) return;
      g.step++;
      const text = gatherText(q);
      screen.querySelectorAll(".gather-text").forEach((el) => {
        el.textContent = text;
        el.classList.remove("text-swap");
        void el.offsetWidth;
        el.classList.add("text-swap");
      });
    }, 1600);
    const keys = orderedModels().map((m) => m.key);
    keys.forEach((key, i) => setTimeout(() => modelAnswered(q, key, i === keys.length - 1), 600 + i * 380));
  }

  function modelAnswered(q, key, last) {
    const g = gather[q];
    if (!g) return;
    g.ready.add(key);
    if (q === state.lastQuery) {
      screen.querySelectorAll(`.result.is-sk[data-key="${key}"]`).forEach((el) => {
        const t = document.createElement("template");
        t.innerHTML = resultItem(modelByKey(key), el.dataset.i === "0" ? 0 : -1).trim();
        const card = t.content.firstElementChild;
        if (el.classList.contains("is-on")) { card.classList.add("is-on"); card.setAttribute("aria-current", "true"); }
        card.classList.add("swap-in", "no-anim");
        el.replaceWith(card);
      });
    }
    pendingFills[`${q}|${key}`]?.();
    delete pendingFills[`${q}|${key}`];
    if (!last) return;
    clearInterval(g.timer);
    delete gather[q];
    state.loadedQueries.add(q);
    progress(false);
    screen.querySelectorAll(".gather-label").forEach((el) => { el.textContent = "Compare answers"; });
    screen.querySelectorAll(".results-meta").forEach((el) => { el.innerHTML = resultsMeta(); });
    document.querySelectorAll(".is-waiting").forEach((b) => { b.classList.remove("is-waiting"); b.removeAttribute("aria-disabled"); b.closest(".tip-wrap")?.removeAttribute("data-tip"); });
  }

  const GATHER_TEXTS = [
    "Gathering AI responses…",
    (n, t) => `Asking ${t} AI models at once…`,
    (n, t) => `${n} of ${t} answers in…`,
    "Comparing different perspectives…",
    "Checking facts and sources…",
    (n, t) => n >= t - 1 ? "Almost there…" : `${n} of ${t} answers in…`,
  ];
  function gatherText(q) {
    const g = gather[q];
    const n = g ? g.ready.size : 0;
    const x = GATHER_TEXTS[(g ? g.step : 0) % GATHER_TEXTS.length];
    return typeof x === "function" ? x(n, MODELS.length) : x;
  }
  const gatherLine = (q) => `<span class="gather-spinner" role="progressbar" aria-label="Loading answers"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/></svg></span><span class="shimmer-text gather-text">${gatherText(q)}</span>`;

  const resultsMeta = () => `${MODELS.length} answers from ${MODELS.length} AI models${activePromptObj() ? ` · Prompt: <strong>${escapeHtml(activePromptObj().name)}</strong>` : ""}`;

  // A result card, or its shimmer skeleton while that model is still answering.
  function listItem(m, i, q, currentKey = null) {
    const on = m.key === currentKey;
    if (isReady(q, m.key)) {
      const html = resultItem(m, i);
      return on ? html.replace('class="result', 'aria-current="true" class="result is-on') : html;
    }
    return `<a class="result is-sk${on ? " is-on" : ""}" data-key="${m.key}" data-i="${i}" href="#/answer/${m.key}?q=${encodeURIComponent(q)}" aria-label="${m.name} is answering">
      <div class="result-head"><span class="model"><img class="model-icon" src="${m.icon}" alt="" width="36" height="36">
        <span><span class="model-name">${m.name}</span><span class="model-id shimmer-text">Answering…</span></span></span></div>
      <div class="result-body" aria-hidden="true"><span class="skeleton" style="height:14px;width:80%"></span><span class="skeleton" style="height:12px"></span><span class="skeleton" style="height:12px"></span><span class="skeleton" style="height:12px;width:64%"></span></div>
    </a>`;
  }

  // Ask follow-up waits for every model; the tooltip explains why.
  const followBtn = (m, q) => isGathering(q)
    ? `<span class="tip-wrap" data-tip="${FOLLOWUP_WAIT}"><button class="btn btn-primary is-waiting" aria-disabled="true" data-go="#/chat/new?m=${m.key}">Ask follow-up${icon("arrow_forward")}</button></span>`
    : `<button class="btn btn-primary" data-go="#/chat/new?m=${m.key}">Ask follow-up${icon("arrow_forward")}</button>`;

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

    // Desktop: the list sits in a "Compare answers" panel with the list / side-by-side toggle.
    const wrap = (inner, busy = false) => isDesk()
      ? `<div class="view desk-results"${busy ? ' aria-busy="true"' : ""}>${state.signedIn ? "" : signupSidebar()}<section class="results-col">${compareHead("list", q)}<div class="results">${inner}</div></section></div>`
      : `<div class="view results"${busy ? ' aria-busy="true"' : ""}>${inner}</div>`;
    // Results already fetched this session come back instantly, like a real cache; new ones stream in.
    startGather(q);
    setView(wrap(`
      <p class="results-meta">${isGathering(q) ? gatherLine(q) : resultsMeta()}</p>
      ${orderedModels().map((m, i) => listItem(m, i, q)).join("")}`, isGathering(q)));
    restoreSearchScroll();
  }

  function restoreSearchScroll() {
    const y = state.searchScroll[location.hash];
    if (y) screen.scrollTop = y;
  }

  // ── Desktop answer layouts (Search Results + Side by Side view) ──

  const qs = (q) => encodeURIComponent(q);
  const compareHash = (q, a, b) => `#/compare?q=${qs(q)}${a ? `&a=${a}` : ""}${b ? `&b=${b}` : ""}`;

  function compareHead(mode, q, key) {
    return `<div class="compare-head">
      <span class="gather-label">${isGathering(q) ? gatherLine(q) : "Compare answers"}</span>
      <div class="view-toggle" role="group" aria-label="Layout">
        <button class="icon-btn${mode === "list" ? " is-on" : ""}" aria-pressed="${mode === "list"}" data-go="${key ? `#/answer/${key}` : "#/results"}?q=${qs(q)}" aria-label="List view" title="List view">${icon("crop_landscape")}</button>
        <button class="icon-btn${mode === "split" ? " is-on" : ""}" aria-pressed="${mode === "split"}" data-go="${compareHash(q, key || orderedModels()[0].key)}" aria-label="Side-by-side view" title="Side-by-side view">${icon("view_column_2")}</button>
      </div>
    </div>`;
  }

  const modelLabel = (m, size = 36) => `<span class="model">
      <img class="model-icon" src="${m.icon}" alt="" width="${size}" height="${size}">
      <span><span class="model-name">${m.name}</span><span class="model-id">${m.id}</span></span>
    </span>`;

  const guestBanner = () => state.signedIn ? "" : `<div class="guest-banner">
      <p>Sign up now to ask unlimited questions, save your chats and organize them into folders</p>
      <button class="btn btn-primary" data-auth="signup">Get started</button>
    </div>`;

  // First time an answer opens for a query it "loads": a skeleton shows, then the answer fades in.
  const answerSkeleton = () => `<div class="pane-inner sk-answer" aria-hidden="true">
      <span class="skeleton" style="height:18px;width:55%"></span>
      <div class="sk-box">${[92, 100, 96, 88, 0, 40, 100, 94, 72].map((w) => w ? `<span class="skeleton" style="height:12px;width:${w}%"></span>` : "<i></i>").join("")}</div>
    </div>`;
  // An answer shows as a shimmer until its model has answered; answered or cached ones open instantly.
  function loadAnswer(m, q, fill) {
    if (isReady(q, m.key)) return false;
    pendingFills[`${q}|${m.key}`] = fill;
    return true;
  }
  function paneWithLoading(m, q, opts) {
    const html = answerPane(m, opts);
    const pending = loadAnswer(m, q, () => {
      const el = screen.querySelector(`.answer-pane[data-pane="${m.key}"].is-loading`);
      if (!el) return;
      const t = document.createElement("template");
      t.innerHTML = answerPane(m, opts).trim();
      const fresh = t.content.firstElementChild;
      el.querySelector(".pane-scroll").replaceWith(fresh.querySelector(".pane-scroll"));
      el.classList.remove("is-loading");
      el.removeAttribute("aria-busy");
      el.querySelector(".pane-scroll").classList.add("swap-in");
    });
    return pending ? answerPane(m, { ...opts, loading: true }) : html;
  }

  function answerPane(m, { tools = "", closeHref, loading = false }) {
    return `<article class="answer-pane${loading ? " is-loading" : ""}" data-pane="${m.key}" aria-label="${m.name} answer"${loading ? ' aria-busy="true"' : ""}>
      <header class="pane-head">
        ${modelLabel(m, 40)}
        <span class="pane-tools">${tools}<a class="icon-btn tonal" href="${closeHref}" aria-label="Close" title="Close">${icon("close")}</a></span>
      </header>
      <div class="pane-scroll">${loading ? answerSkeleton() : `
        <div class="pane-inner">
          <h2 class="answer-title">${m.title}</h2>
          <div class="bubble ai">
            <div class="prose">${m.body}</div>
            <div class="bubble-actions">
              <button class="chip" data-copy>${icon("content_copy")}Copy</button>
              <button class="chip" data-regen>${icon("refresh")}Regenerate</button>
              <button class="chip" data-save-answer="${m.key}">${icon("star")}Save</button>
            </div>
          </div>
        </div>`}
      </div>
      <footer class="pane-foot"><div class="pane-inner">${followBtn(m, state.lastQuery)}</div></footer>
    </article>`;
  }

  // Expand / collapse the answer (Side by Side view › collapsed list, 1494:37824): the list shrinks to
  // model names only and the answer takes the space. Toggled in place with a CSS transition.
  const collapseBtn = () => `<button class="icon-btn tonal" data-toggle-collapse aria-pressed="${!!state.answersCollapsed}"
      aria-label="${state.answersCollapsed ? "Show answer previews" : "Expand answer"}" title="${state.answersCollapsed ? "Show answer previews" : "Expand answer"}">${icon(state.answersCollapsed ? "close_fullscreen" : "open_in_full")}</button>`;

  function viewAnswerDesk(list, idx, q) {
    const m = list[idx];
    const prev = list[idx - 1];
    const next = list[idx + 1];
    const pager = `<span class="pager-group">
        <button class="pager-btn" ${prev ? `data-go="#/answer/${prev.key}?q=${qs(q)}"` : "disabled"}>${icon("chevron_left")}Prev</button>
        <button class="pager-btn" ${next ? `data-go="#/answer/${next.key}?q=${qs(q)}"` : "disabled"}>Next${icon("chevron_right")}</button>
      </span>
      ${collapseBtn()}`;
    const pane = paneWithLoading(m, q, { tools: pager, closeHref: `#/results?q=${qs(q)}` });
    // Prev / Next and list clicks swap only the answer: the list keeps its scroll and nothing re-animates.
    const current = screen.querySelector(".desk-answer .answer-list");
    if (current && screen.dataset.answerQ === q) {
      screen.querySelector(".answer-col .answer-pane").outerHTML = pane;
      current.querySelector(".compare-head").outerHTML = compareHead("list", q, m.key);
      current.querySelectorAll(".result").forEach((r) => {
        const on = r.getAttribute("href").startsWith(`#/answer/${m.key}?`);
        r.classList.toggle("is-on", on);
        if (!r.getAttribute("href")) return;
        if (on) { r.setAttribute("aria-current", "true"); r.scrollIntoView({ block: "nearest", behavior: "smooth" }); } else r.removeAttribute("aria-current");
      });
      return;
    }
    screen.dataset.answerQ = q;
    setView(`<div class="view desk-answer${state.answersCollapsed ? " is-collapsed" : ""}">
      <div class="desk-box">
        <aside class="answer-list" aria-label="Answers">
          ${compareHead("list", q, m.key)}
          <nav class="answer-scroll">${list.map((x) => listItem(x, -1, q, m.key)).join("")}</nav>
        </aside>
        <div class="answer-col">${guestBanner()}${pane}</div>
      </div>
    </div>`);
    screen.querySelector(".result.is-on")?.scrollIntoView({ block: "nearest" });
  }

  // Side by side: two slots (a, b); an empty slot shows the model picker.
  function viewCompare(params) {
    const q = params.get("q") || state.lastQuery;
    const a = params.has("a") || params.has("b") ? params.get("a") : orderedModels()[0].key;
    const b = params.get("b");
    const slot = (key, other, name) => {
      if (key) {
        const others = name === "a" ? [null, other] : [other, null];
        return paneWithLoading(modelByKey(key), q, { closeHref: compareHash(q, ...others) });
      }
      return `<section class="answer-pane picker" aria-label="Choose a model">
        <p class="picker-title">Select an AI model to compare.</p>
        <div class="picker-grid">
          ${orderedModels().filter((m) => m.key !== other).map((m) => `<button class="picker-item" data-go="${name === "a" ? compareHash(q, m.key, other) : compareHash(q, other, m.key)}">${modelLabel(m, 28)}</button>`).join("")}
        </div>
      </section>`;
    };
    setView(`<div class="view desk-answer">
      <div class="desk-box compare-box">
        ${compareHead("split", q, a || b)}
        ${guestBanner()}
        <div class="compare-panes">${slot(a, b, "a")}${slot(b, a, "b")}</div>
      </div>
    </div>`);
  }

  function viewAnswer(key, params) {
    const list = orderedModels();
    const idx = Math.max(0, list.findIndex((m) => m.key === key));
    const m = list[idx];
    const q = params.get("q") || state.lastQuery;
    state.lastQuery = q;
    if (isDesk()) { renderTopbar({ search: q }); return viewAnswerDesk(list, idx, q); }
    renderTopbar();
    const inner = `
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
      </div>`;
    const loadingInner = inner.replace(/<div class="answer-main">[\s\S]*$/, `<div class="answer-main">${answerSkeleton()}</div>`);
    const pending = loadAnswer(m, q, () => {
      const a = screen.querySelector(".view.answer");
      if (a && parseHash().parts[1] === m.key) { a.innerHTML = inner; a.querySelector(".answer-main").classList.add("swap-in"); }
    });
    const article = screen.querySelector(".view.answer");
    if (article) { article.innerHTML = pending ? loadingInner : inner; screen.scrollTop = 0; }
    else screen.innerHTML = `<article class="view answer">${pending ? loadingInner : inner}</article>`;

    const prev = list[idx - 1];
    const next = list[idx + 1];
    setDock(`<div class="pager-dock">
      <div class="pager">
        <button class="btn prev" ${prev ? `data-go="#/answer/${prev.key}?q=${encodeURIComponent(q)}"` : "disabled"} aria-label="Previous answer">${icon("chevron_left")}</button>
        <button class="btn next" ${next ? `data-go="#/answer/${next.key}?q=${encodeURIComponent(q)}"` : "disabled"} aria-label="Next answer">${icon("chevron_right")}</button>
      </div>
      ${followBtn(m, q)}
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
      convo = { id: `c${Date.now()}`, model: m.key, title: m.title, messages: [{ from: "ai", html: m.body }], saved: false, fromSearch: true };
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
            <div>${isDesk()
              ? `<div class="title-row"><h3 id="convo-name">${escapeHtml(convo.title)}</h3><button class="icon-btn" data-rename aria-label="Rename chat">${icon("edit")}</button></div>`
              : `<h3>${escapeHtml(convo.title)}</h3>`}<span>${m.id}</span></div>
          </div>`;
    }

    const desk = isDesk();
    if (desk && state.signedIn) {
      const f = folderOf(convo.id);
      if (f) state.openFolders.add(f.id);
    }
    setView(`<div class="view card-view${desk ? " desk-split" : ""}">
      ${desk ? (state.signedIn ? savedSidebar(convo.id) : signupSidebar()) : ""}
      <section class="card-panel convo" aria-label="Conversation">
        <div class="convo-head">
          ${desk
            ? `<button class="btn-link back-link" data-back>${icon("arrow_back")}${convo.fromSearch ? "Back to search" : "Back"}</button>`
            : `<button class="icon-btn md" data-back aria-label="Back">${icon("arrow_back")}</button>`}
          <h2>${escapeHtml(convo.title)}</h2>
          <button class="icon-btn md" data-soon="Conversation options" aria-label="More options">${icon("more_vert")}</button>
        </div>
        <div class="convo-body card-scroll" id="convo-body">
          ${titleBlock}
          ${convo.messages.map(renderMessage).join("")}
        </div>
        ${desk ? `<div class="panel-dock" id="panel-dock"></div>` : ""}
      </section>
    </div>`);
    syncSaveChips(convo);

    if (convo.kind === "message") {
      screen.querySelectorAll(".bubble-actions").forEach((a) => a.remove());
      wireFades();
      return;
    }
    const guest = !state.signedIn;
    const showTip = convo.fromSearch && !state.tipHidden && !store.get("iio.tipOff", false);
    setDock(`${showTip ? `<div class="tip" role="status">
        <div><p>Switch to the Search tab to keep comparing.</p>
        <label class="tip-check"><input type="checkbox" id="tip-off">Don’t show this again</label></div>
        <button class="tip-hide" data-hide-tip>Hide</button>
      </div>` : ""}<div class="input-dock${guest ? " guest" : ""}">
      <form class="composer" id="composer">
        <input name="msg" placeholder="${convo.agent && !convo.messages.length ? `Message ${escapeHtml(agentByKey(convo.agent).name)}` : "Type your follow-up question"}" aria-label="Follow-up question" autocomplete="off" enterkeyhint="send" ${convo.agent && !convo.messages.length ? `data-demo="${escapeHtml(agentByKey(convo.agent).demo || "")}"` : ""}>
        <button class="send" type="submit" aria-label="Send" disabled>${icon("arrow_forward")}</button>
      </form>
      ${guest && !desk ? `<div class="signup-banner"><p>Sign up now to save, organize &amp; ask unlimited follow-ups.</p><button class="btn btn-primary" data-auth="signup">Get started</button></div>` : ""}
    </div>`);

    const form = $("#composer");
    const send = form.querySelector(".send");
    if (form.msg.dataset.demo) typewriter(form.msg, [form.msg.dataset.demo]);
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
      const isPlan = /cheap|budget|afford|\$ ?1,?000|save money/i.test(text);
      const isAdoption = /pack|wear|weather|bring/i.test(text);
      const msg = { from: "ai", html: convo.agent ? AGENT_ANSWER(agentByKey(convo.agent), text) : isPlan ? PLAN_ANSWER : isAdoption ? ADOPTION_ANSWER : FOLLOW_UP_ANSWER(text) };
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

  // ── Desktop Saved: sidebar tree + table (Chat Page › Folder update) ──

  const OPENED = { ds: "Today", shinkansen: "Yesterday", ryokan: "22 Sep 2026", budget: "18 Sep 2026", meal: "15 Sep 2026", raise: "9 Sep 2026", party: "2 Sep 2026" };
  const openedOn = (id) => OPENED[id] || "Today";
  const itemType = (c) => (c.kind === "message" ? "Saved message" : c.agent ? "Agent chat" : "Chat");

  function savedSidebar(activeId) {
    const F = state.folders;
    const leaf = (id) => {
      const c = state.conversations[id];
      if (!c) return "";
      return `<li class="side-item"><a class="side-row${id === activeId ? " is-on" : ""}" href="#/chat/${id}">${itemIcon(c)}<span class="label">${escapeHtml(c.title)}</span></a>
        <button class="icon-btn side-more" data-row-menu="item:${id}" aria-label="More options for ${escapeHtml(c.title)}">${icon("more_vert")}</button></li>`;
    };
    return `<aside class="desk-side saved-side" aria-label="Saved items">
      <div class="side-top">
        <a class="side-row root${activeId === "root" ? " is-on" : ""}" href="#/chats">${icon("chat_bubble")}<span class="label">Saved items</span></a>
        <button class="icon-btn" data-new-folder aria-label="New folder" title="New folder">${icon("create_new_folder")}</button>
      </div>
      <ul class="side-tree">
        ${F.root.map(leaf).join("")}
        ${F.folders.map((f) => {
          const open = state.openFolders.has(f.id);
          return `<li class="side-folder">
            <div class="side-row folder${activeId === f.id ? " is-on" : ""}">
              <button class="caret-btn" data-toggle-folder="${f.id}" aria-expanded="${open}" aria-label="${open ? "Collapse" : "Expand"} ${escapeHtml(f.name)}">${icon("arrow_right", "caret")}</button>
              <a href="#/chats/folder/${f.id}">${icon("folder")}<span class="label">${escapeHtml(f.name)}</span></a>
            </div>
            ${open ? `<ul class="side-sub">${f.items.map(leaf).join("") || `<li class="side-empty">Empty folder</li>`}</ul>` : ""}
          </li>`;
        }).join("")}
      </ul>
    </aside>`;
  }

  function signupSidebar() {
    return `<aside class="desk-side signup-side" aria-label="Sign up">
      <div class="signup-card">
        <h3>Sign up now</h3>
        <ul>
          <li>Unlimited follow-ups</li>
          <li>Save your chats</li>
          <li>Organize them into folders</li>
          <li>Chat with AI agents</li>
        </ul>
        <button class="btn btn-primary" data-auth="signup">Get started</button>
      </div>
    </aside>`;
  }

  function savedTableRow(id) {
    const c = state.conversations[id];
    if (!c) return "";
    return `<tr class="${state.justAdded === id ? "is-new" : ""}">
      <td><a class="cell-link" href="#/chat/${id}">${itemIcon(c)}<span class="label">${escapeHtml(c.title)}</span></a></td>
      <td>${itemType(c)}</td><td>${openedOn(id)}</td>
      <td><button class="icon-btn" data-row-menu="item:${id}" aria-label="More options">${icon("more_vert")}</button></td>
    </tr>`;
  }
  function folderTableRow(f) {
    return `<tr>
      <td><a class="cell-link" href="#/chats/folder/${f.id}"><span class="row-ico">${icon("folder")}</span><span class="label">${escapeHtml(f.name)}</span></a></td>
      <td>Folder</td><td>${f.items.length ? openedOn(f.items[0]) : "—"}</td>
      <td><button class="icon-btn" data-row-menu="folder:${f.id}" aria-label="Folder options">${icon("more_vert")}</button></td>
    </tr>`;
  }

  function viewChatsDesk(folder) {
    const F = state.folders;
    const rows = folder
      ? folder.items.map(savedTableRow).join("") || `<tr><td colspan="4" class="table-empty">This folder is empty</td></tr>`
      : F.root.map(savedTableRow).join("") + F.folders.map(folderTableRow).join("");
    setView(`<div class="view card-view desk-split">
      ${savedSidebar(folder ? folder.id : "root")}
      <section class="card-panel saved-desk" aria-label="${folder ? escapeHtml(folder.name) : "Saved items"}">
        <div class="card-head">
          ${folder ? `<a class="btn-link back-link" href="#/chats">${icon("arrow_back")}Back</a>` : "<span></span>"}
          <h2>${folder ? escapeHtml(folder.name) : "Saved items"}</h2>
          ${folder
            ? `<button class="icon-btn md" data-row-menu="folder:${folder.id}" aria-label="Folder options">${icon("more_vert")}</button>`
            : `<button class="btn-link" data-new-folder>${icon("create_new_folder")}New folder</button>`}
        </div>
        <div class="card-scroll">
          <table class="saved-table">
            <thead><tr><th>Name</th><th>Type</th><th>Last opened</th><th><span class="sr-only">Actions</span></th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>
    </div>`);
    state.justAdded = null;
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
    if (isDesk()) return viewChatsDesk(folder);
    const rows = folder
      ? folder.items.map(savedRow).join("") || `<li class="srow-empty">This folder is empty</li>`
      : F.root.map(savedRow).join("") + F.folders.map(folderRow).join("");
    setView(`<div class="view card-view">
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
    </div>`);
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

  function filteredAgents() {
    const q = (state.exploreQuery || "").trim().toLowerCase();
    return allAgents().filter((a) => (state.exploreCat === "All" || a.cat === state.exploreCat)
      && (!q || `${a.name} ${a.by} ${a.cat} ${a.text}`.toLowerCase().includes(q)));
  }
  const agentListHtml = (list) => list.length
    ? list.map(agentCard).join("")
    : `<li class="agent-empty">${icon("search_off")}<p>No agents match “${escapeHtml(state.exploreQuery || "")}”${state.exploreCat !== "All" ? ` in ${state.exploreCat}` : ""}.</p><button class="btn btn-text" data-agent-reset>Clear filters</button></li>`;

  function viewExplore() {
    const cat = state.exploreCat;
    const list = filteredAgents();
    const searchForm = `<form class="searchbar agent-search" role="search" id="agent-search">
            <span class="icon-btn lead" aria-hidden="true">${icon("search")}</span>
            <input type="search" name="q" value="${escapeHtml(state.exploreQuery || "")}" placeholder="Search agents" aria-label="Search agents" autocomplete="off" enterkeyhint="search">
            <button type="button" class="icon-btn" data-agent-clear aria-label="Clear search" ${state.exploreQuery ? "" : "hidden"}>${icon("close")}</button>
          </form>`;
    if (isDesk()) {
      // Web App › Explore AI: search in the top bar, categories in the left column.
      renderTopbar({ extra: searchForm });
      setView(`<div class="view card-view desk-split explore-desk">
        ${exploreSide(cat)}
        <section class="card-panel agents-desk" aria-label="AI agents">
          <div class="card-head"><span></span><h2>${cat === "All" ? "All agents" : escapeHtml(cat)}</h2><span></span></div>
          <div class="card-scroll"><ul class="agent-grid" id="agent-grid">${agentListHtml(list)}</ul></div>
        </section>
      </div>`);
    } else {
    renderTopbar();
    setView(`<div class="view explore">
      <section class="agents-panel" aria-label="AI agents">
        <div class="agents-head">
          <div class="agents-top">${searchForm}<a class="icon-btn md my-agents-btn" href="#/agents" aria-label="My agents" title="My agents">${icon("manage_accounts")}</a></div>
          <div class="cat-chips" role="tablist" aria-label="Categories">
            ${AGENT_CATEGORIES.map((c) => `<button class="cat-chip${c === cat ? " is-on" : ""}" role="tab" aria-selected="${c === cat}" data-cat="${c}">${c}</button>`).join("")}
          </div>
        </div>
        <ul class="agent-grid" id="agent-grid">${agentListHtml(list)}</ul>
      </section>
    </div>`);
    }
    wireFades();
    const form = $("#agent-search");
    const clear = form.querySelector("[data-agent-clear]");
    form.addEventListener("submit", (e) => { e.preventDefault(); form.q.blur(); });
    form.q.addEventListener("input", () => {
      state.exploreQuery = form.q.value;
      clear.hidden = !form.q.value;
      $("#agent-grid").innerHTML = agentListHtml(filteredAgents());
      $("#agent-grid").scrollTop = 0;
      $("#agent-grid").dispatchEvent(new Event("scroll"));
    });
    clear.addEventListener("click", () => { form.q.value = ""; form.q.dispatchEvent(new Event("input")); form.q.focus({ preventScroll: true }); });
    typewriter(form.q, ["Search agents", "Try “Python”", "Try “budget”", "Try “quiz”"]);
    const on = screen.querySelector(".cat-chip.is-on");
    if (isDesk() && state.exploreFocus) { form.q.focus({ preventScroll: true }); state.exploreFocus = false; }
    if (on && cat !== "All") on.scrollIntoView({ block: "nearest", inline: "center" });
  }

  // ── My AI agents (Explore AI › Creating an AI Agent) ─────
  // Create AI Agent dialog → builder canvas → Save → My agents. Built agents join Explore and can be chatted with.

  function exploreSide(cat, mine = false) {
    return `<aside class="desk-side cat-side" aria-label="AI agents">
      <p class="side-label">Categories</p>
      ${AGENT_CATEGORIES.map((c) => `<button class="side-row cat-row${!mine && c === cat ? " is-on" : ""}" aria-pressed="${!mine && c === cat}" data-cat="${c}">${c}</button>`).join("")}
      <div class="side-section">
        <p class="side-label">My AI agents</p>
        <button class="side-row cat-row" data-create-agent>${icon("add")}Create agent</button>
        <a class="side-row cat-row${mine ? " is-on" : ""}" href="#/agents">${icon("manage_accounts")}Manage my agents</a>
      </div>
    </aside>`;
  }

  const AGENT_BLOCKS = [
    { sec: "Logic", items: [["choice", "Choice", "call_split"], ["map", "Map", "account_tree"], ["output", "Output", "logout"]] },
    { sec: "Agents orchestration", items: [["linear", "Linear Orchestrator", "linear_scale"], ["adaptive", "Adaptive Orchestrator", "hub"], ["graph", "Graph Orchestrator", "share"]] },
    { sec: "Agents", items: [["react", "ReAct Agent", "psychology"], ["reflection", "Reflection Agent", "cached"], ["simple", "Simple Agent", "smart_toy"]] },
    { sec: "Tools", items: [["tavily", "Tavily (search)", "travel_explore"], ["jina", "Jina (search)", "travel_explore"], ["exa", "Exa (search)", "travel_explore"], ["scaleserp", "ScaleSerp (search)", "travel_explore"]] },
  ];
  const blockById = (id) => { for (const g of AGENT_BLOCKS) { const b = g.items.find((x) => x[0] === id); if (b) return { id: b[0], name: b[1], icon: b[2], sec: g.sec }; } return null; };

  function myAgentCard(a) {
    return `<li class="my-agent">
      <button class="agent-card" data-agent="${a.key}">
        ${agentTile(a)}
        <span class="agent-body"><span class="agent-name">${escapeHtml(a.name)}</span><span class="agent-by">By ${escapeHtml(a.by)}</span><span class="agent-text">${escapeHtml(a.text)}</span></span>
      </button>
      <span class="my-agent-tools">
        <button class="icon-btn" data-edit-agent="${a.key}" aria-label="Edit ${escapeHtml(a.name)}" title="Edit">${icon("edit")}</button>
        <button class="icon-btn" data-delete-agent="${a.key}" aria-label="Delete ${escapeHtml(a.name)}" title="Delete">${icon("delete")}</button>
      </span>
    </li>`;
  }

  function viewMyAgents() {
    const list = state.myAgents;
    const grid = list.length
      ? `<ul class="agent-grid my-agent-grid">${list.map(myAgentCard).join("")}</ul>`
      : `<div class="agent-empty">${icon("smart_toy")}<p>You haven't built an agent yet.</p><button class="btn btn-primary" data-create-agent>${icon("add")}Create agent</button></div>`;
    if (isDesk()) {
      renderTopbar({ extra: `<form class="searchbar agent-search" role="search" onsubmit="return false"><span class="icon-btn lead" aria-hidden="true">${icon("search")}</span><input type="search" placeholder="Search agents" aria-label="Search agents" data-go-explore></form>` });
      setView(`<div class="view card-view desk-split explore-desk">
        ${exploreSide(state.exploreCat, true)}
        <section class="card-panel agents-desk" aria-label="My agents">
          <div class="card-head"><span></span><h2>My agents</h2><button class="icon-btn md" data-create-agent aria-label="Create agent" title="Create agent">${icon("add_circle")}</button></div>
          <div class="card-scroll">${grid}</div>
        </section>
      </div>`);
    } else {
      renderTopbar();
      setView(`<div class="view card-view">
        <section class="card-panel" aria-label="My agents">
          <div class="card-head"><a class="icon-btn md" href="#/explore" aria-label="Back to Explore AI">${icon("arrow_back")}</a><h2>My agents</h2><button class="icon-btn md" data-create-agent aria-label="Create agent">${icon("add")}</button></div>
          <div class="card-scroll my-agents-m">${grid}</div>
        </section>
      </div>`);
      wireFades();
    }
  }

  // Create AI Agent dialog: name, category, description, icon (PNG/JPG up to 2 MB, previewed only).
  function openAgentDialog(existing = null) {
    const d = existing ? { ...existing } : { name: "", cat: "", text: "", img: "" };
    const cats = AGENT_CATEGORIES.filter((c) => c !== "All");
    const wrap = openModal(`<form class="dlg agent-form-dlg" id="agent-form" novalidate>
      ${dialogHead(existing ? "Edit AI agent" : "Create AI agent")}
      <div class="dlg-body">
        ${field("name", "Name", { placeholder: "Enter a name for your AI agent", value: d.name })}
        <div class="auth-field select-field">
          <span class="auth-label">Category</span>
          <button type="button" class="auth-input select-btn${d.cat ? " has-value" : ""}" data-select-toggle aria-haspopup="listbox" aria-expanded="false"><span class="select-value">${d.cat || "Select a category"}</span>${icon("arrow_drop_down")}</button>
          <div class="select-menu" role="listbox" hidden>${cats.map((c) => `<button type="button" role="option" aria-selected="${c === d.cat}" data-select-option="${c}">${c}</button>`).join("")}</div>
        </div>
        <label class="auth-field feedback-message"><span class="auth-label">Description</span><textarea name="text" rows="3" placeholder="Add a brief description">${escapeHtml(d.text)}</textarea></label>
        <div class="upload">
          <p class="upload-label">Upload icon</p>
          <label class="upload-drop${d.img ? " has-img" : ""}" id="upload-drop">
            <input type="file" accept="image/png,image/jpeg" hidden id="upload-input">
            <span class="upload-preview">${d.img ? `<img src="${d.img}" alt="">` : icon("upload")}</span>
            <span class="upload-text"><span class="upload-link">Click to upload</span> or drag and drop</span>
            <span class="upload-hint">PNG or JPG (100×100px, max. 2 MB)</span>
          </label>
          <p class="upload-error" id="upload-error" hidden>Upload a PNG or JPG under 2 MB.</p>
        </div>
      </div>
      <div class="dlg-actions"><button type="button" class="btn btn-secondary" data-close-modal>Cancel</button><button class="btn btn-primary" type="submit">OK</button></div>
    </form>`);
    const form = wrap.querySelector("form");
    const submit = form.querySelector("[type=submit]");
    const menu = form.querySelector(".select-menu");
    const toggle = form.querySelector("[data-select-toggle]");
    const check = () => { submit.disabled = !(form.name.value.trim() && d.cat && form.text.value.trim()); };
    form.addEventListener("input", check);
    check();
    form.addEventListener("click", (e) => {
      const opt = e.target.closest("[data-select-option]");
      if (e.target.closest("[data-select-toggle]")) { menu.hidden = !menu.hidden; toggle.setAttribute("aria-expanded", String(!menu.hidden)); return; }
      if (opt) {
        d.cat = opt.dataset.selectOption;
        toggle.querySelector(".select-value").textContent = d.cat;
        toggle.classList.add("has-value");
        menu.querySelectorAll("[role=option]").forEach((o) => o.setAttribute("aria-selected", String(o === opt)));
        menu.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        check();
      }
    });
    const drop = form.querySelector("#upload-drop");
    const err = form.querySelector("#upload-error");
    const takeFile = (file) => {
      if (!file) return;
      const ok = /^image\/(png|jpeg)$/.test(file.type) && file.size <= 2 * 1024 * 1024;
      err.hidden = ok;
      drop.classList.toggle("is-error", !ok);
      if (!ok) return;
      const reader = new FileReader();
      reader.onload = () => {
        d.img = reader.result;
        drop.classList.add("has-img");
        drop.querySelector(".upload-preview").innerHTML = `<img src="${d.img}" alt="">`;
      };
      reader.readAsDataURL(file);
    };
    form.querySelector("#upload-input").addEventListener("change", (e) => takeFile(e.target.files[0]));
    drop.addEventListener("dragover", (e) => { e.preventDefault(); drop.classList.add("is-over"); });
    drop.addEventListener("dragleave", () => drop.classList.remove("is-over"));
    drop.addEventListener("drop", (e) => { e.preventDefault(); drop.classList.remove("is-over"); takeFile(e.dataTransfer.files[0]); });
    form.name.focus({ preventScroll: true });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (submit.disabled) return;
      Object.assign(d, { name: form.name.value.trim(), text: form.text.value.trim() });
      closeModal();
      if (existing) {
        Object.assign(existing, { name: d.name, cat: d.cat, text: d.text, img: d.img });
        persist();
        return go(`#/agents/build/${existing.key}`);
      }
      state.agentDraft = { key: `my-${Date.now()}`, name: d.name, cat: d.cat, text: d.text, img: d.img,
        by: `${state.user.first} ${state.user.last}`.trim(), icon: "smart_toy", bg: "#e8eaf6", fg: "#3949ab", rating: "New", convos: "0", flow: [], mine: true };
      go(`#/agents/build/${state.agentDraft.key}`);
    });
  }

  // Builder (option a): the Figma block panel; clicking a block adds it to a simple vertical flow.
  function viewAgentBuilder(key) {
    const a = state.agentDraft?.key === key ? state.agentDraft : state.myAgents.find((x) => x.key === key);
    if (!a) return go("#/agents");
    if (!isDesk()) { toast("The agent builder is available on desktop"); return go("#/agents"); }
    const flow = [...(a.flow || [])];
    let query = "";
    const closed = new Set();
    renderTopbar();
    const paletteHtml = () => AGENT_BLOCKS.map((g) => {
      const items = g.items.filter((b) => !query || b[1].toLowerCase().includes(query));
      if (!items.length) return "";
      const open = !closed.has(g.sec) || query;
      return `<div class="pal-group">
        <button class="pal-head" data-pal-toggle="${g.sec}" aria-expanded="${!!open}">${g.sec}${icon("expand_less")}</button>
        ${open ? items.map((b) => `<button class="pal-item" data-add-block="${b[0]}"><span class="pal-ico">${icon(b[2])}</span>${b[1]}</button>`).join("") : ""}
      </div>`;
    }).join("") || `<p class="pal-empty">No blocks match.</p>`;
    const canvasHtml = () => `<div class="flow">
      <div class="flow-node start"><span class="pal-ico">${icon("chat_bubble")}</span><span><strong>Input</strong><small>The user's message</small></span></div>
      ${flow.map((id, i) => { const b = blockById(id); return `<div class="flow-link" aria-hidden="true"></div>
        <div class="flow-node"><span class="pal-ico">${icon(b.icon)}</span><span><strong>${b.name}</strong><small>${b.sec}</small></span>
          <button class="icon-btn" data-remove-block="${i}" aria-label="Remove ${b.name}" title="Remove">${icon("close")}</button></div>`; }).join("")}
      ${flow.length ? "" : `<p class="flow-hint">Click a block on the left to add it to your agent.</p>`}
    </div>`;
    setView(`<div class="view card-view builder-view">
      <section class="card-panel builder" aria-label="Create agent">
        <div class="card-head"><a class="btn-link back-link" href="#/agents">${icon("arrow_back")}Back</a><h2>${state.agentDraft?.key === key ? "Create agent" : "Edit agent"}</h2><span></span></div>
        <div class="builder-bar">${agentTile(a, 28)}<strong>${escapeHtml(a.name)}</strong><span class="builder-cat">${escapeHtml(a.cat)}</span><button class="btn btn-primary" data-save-agent ${flow.length ? "" : "disabled"}>Save</button></div>
        <div class="builder-body">
          <aside class="palette" aria-label="Blocks">
            <label class="pal-search">${icon("search")}<input type="search" placeholder="Search" aria-label="Search blocks" id="pal-q"></label>
            <div class="pal-list" id="pal-list">${paletteHtml()}</div>
          </aside>
          <div class="canvas" id="canvas">${canvasHtml()}</div>
        </div>
      </section>
    </div>`);
    const refresh = () => {
      $("#canvas").innerHTML = canvasHtml();
      screen.querySelector("[data-save-agent]").disabled = !flow.length;
    };
    $("#pal-q").addEventListener("input", (e) => { query = e.target.value.trim().toLowerCase(); $("#pal-list").innerHTML = paletteHtml(); });
    screen.querySelector(".builder").addEventListener("click", (e) => {
      const t = e.target.closest("button");
      if (!t) return;
      if (t.dataset.palToggle) { const g = t.dataset.palToggle; if (closed.has(g)) closed.delete(g); else closed.add(g); $("#pal-list").innerHTML = paletteHtml(); return; }
      if (t.dataset.addBlock) { flow.push(t.dataset.addBlock); refresh(); $("#canvas").scrollTo({ top: $("#canvas").scrollHeight, behavior: "smooth" }); return; }
      if (t.dataset.removeBlock !== undefined) { flow.splice(+t.dataset.removeBlock, 1); refresh(); return; }
      if (t.hasAttribute("data-save-agent")) {
        a.flow = flow;
        if (state.agentDraft?.key === key) { state.myAgents.unshift(a); state.agentDraft = null; }
        persist();
        go("#/agents");
        toast(`“${a.name}” saved`);
      }
    });
  }

  function openDeleteAgent(key) {
    const a = state.myAgents.find((x) => x.key === key);
    if (!a) return;
    const wrap = openModal(`<div class="dlg">
      ${dialogHead("Delete agent?")}
      <div class="dlg-body"><p class="dlg-text">“${escapeHtml(a.name)}” will be deleted. Chats with it stay in Saved.</p></div>
      <div class="dlg-actions"><button class="btn btn-secondary" data-close-modal>Cancel</button><button class="btn btn-danger" data-confirm-delete>Delete</button></div>
    </div>`);
    wrap.querySelector("[data-confirm-delete]").addEventListener("click", () => {
      state.myAgents = state.myAgents.filter((x) => x.key !== key);
      persist();
      closeModal();
      route();
      toast("Agent deleted");
    });
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
      </div>
      <label class="auth-field"><span class="auth-label">Folder name</span><span class="auth-input"><input name="name" value="Untitled folder" placeholder=" " maxlength="40" autocomplete="off"></span></label>
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
      if (parseHash().parts[0] === "chats") viewChats(parseHash().parts[2]); else route();
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
    menuEl.innerHTML = `<button role="menuitem" data-act="rename" data-ref="${ref}">${icon("edit")}Rename</button>
      ${type === "item" ? `<button role="menuitem" data-act="move" data-ref="${ref}">${icon("drive_file_move")}Move</button>` : ""}
      <button role="menuitem" class="danger" data-act="delete" data-ref="${ref}">${icon("delete")}Delete</button>`;
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
      <div class="dlg-body"><label class="auth-field"><span class="auth-label">Name</span><span class="auth-input"><input name="name" value="${escapeHtml(itemTitle(ref) || "")}" placeholder=" " maxlength="80"></span></label></div>
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
        <p class="dlg-info">${icon("info")}Drag models to change the order of your results, then ${isDesk() ? "click" : "tap"} Save.</p>
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
        // capture on the list, not the row: moving the row in the DOM would drop its capture mid-drag
        list.setPointerCapture(e.pointerId);
        const move = (ev) => {
          const rows = [...list.children].filter((r) => r !== row);
          const after = rows.find((r) => { const b = r.getBoundingClientRect(); return ev.clientY < b.top + b.height / 2; }) || null;
          if (row.nextElementSibling !== after) list.insertBefore(row, after);
        };
        const up = () => {
          row.classList.remove("dragging");
          list.removeEventListener("pointermove", move);
          list.removeEventListener("pointerup", up);
          list.removeEventListener("pointercancel", up);
          order = [...list.children].map((r) => r.dataset.key);
        };
        list.addEventListener("pointermove", move);
        list.addEventListener("pointerup", up);
        list.addEventListener("pointercancel", up);
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
    const listView = () => `<div class="dlg sheet-dlg prompts-dlg">
      ${dialogHead("Custom prompts")}
      <div class="dlg-body">
        <p class="dlg-info">${icon("info")}Create prompts that shape every answer. The one you select is applied to all AI models.</p>
        <div class="prompt-tools">
          <label class="prompt-search">${icon("search")}<input type="search" placeholder="Search prompts" value="${escapeHtml(query)}" aria-label="Search prompts" id="prompt-q"></label>
          <button class="btn-link" data-prompt-new>${icon("add")}New prompt</button>
        </div>
        <div class="prompt-list" id="prompt-list">${listHtml()}</div>
      </div>
      <div class="dlg-actions"><button class="btn btn-text" data-prompt-clear ${selected ? "" : "disabled"}>Clear selection</button><span class="spacer"></span><button class="btn btn-secondary" data-close-modal>Cancel</button><button class="btn btn-primary" data-prompt-save ${selected === state.activePrompt ? "disabled" : ""}>Save</button></div>
    </div>`;
    const formView = (p) => `<form class="dlg sheet-dlg prompts-dlg" id="prompt-form">
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
        <input name="${name}" type="${type}" placeholder="${placeholder || " "}" value="${escapeHtml(value)}" autocomplete="${autocomplete}" ${type === "email" ? 'inputmode="email" autocapitalize="off"' : ""}>
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
    // Desktop chat keeps its composer inside the conversation panel.
    const inPanel = isDesk() && html && $("#panel-dock");
    if (inPanel) inPanel.innerHTML = html;
    dock.innerHTML = inPanel ? "" : html;
    app.classList.toggle("dock-open", !!html && !inPanel);
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

  const isSearchPage = (hash) => /^#\/?(results|answer|compare|$)/.test(hash || "#/") || hash === "" || hash === "#";

  function route() {
    // Remember where the user was on the Search tab (and how far they scrolled).
    if (state.currentHash && isSearchPage(state.currentHash)) state.searchScroll[state.currentHash] = screen.scrollTop;
    state.currentHash = location.hash || "#/";
    if (isSearchPage(state.currentHash)) state.searchHash = state.currentHash;
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
    app.classList.toggle("is-guest", !state.signedIn);
    if (isAuth) {
      topbar.innerHTML = "";
      topbar.dataset.sig = "";
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
      case "compare":
        if (!state.signedIn) {
          history.replaceState(null, "", `#/answer/${params.get("a") || params.get("b") || orderedModels()[0].key}?q=${qs(params.get("q") || state.lastQuery)}`);
          route();
          openGate("Sign up to compare side by side", "Put two AI answers next to each other and see which one fits best.");
          return;
        }
        // Side by side is desktop-only; on a phone it falls back to the single answer.
        if (!isDesk()) return go(`#/answer/${params.get("a") || params.get("b") || orderedModels()[0].key}?q=${qs(params.get("q") || state.lastQuery)}`);
        state.lastQuery = params.get("q") || state.lastQuery;
        renderTopbar({ search: state.lastQuery });
        viewCompare(params); setActiveTab("search"); break;
      case "chat": viewChat(arg, params); setActiveTab("chats"); break;
      case "chats": viewChats(parts[1] === "folder" ? parts[2] : null); setActiveTab("chats"); break;
      case "agents":
        if (!state.signedIn) { go("#/"); openGate("Sign up to build AI agents", "Create your own agents and chat with them anytime."); break; }
        if (arg === "build") viewAgentBuilder(parts[2]); else viewMyAgents();
        setActiveTab("explore"); break;
      case "explore":
        if (!state.signedIn) { go("#/"); openGate("Sign up to explore AI agents", "Chat with specialized agents for writing, coding, studying and more."); break; }
        viewExplore(); setActiveTab("explore"); break;
      default: viewHome(); setActiveTab("search");
    }
    if (page !== "chat") screen.scrollTop = 0;
    if (page === "answer" || page === "results") restoreSearchScroll();
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
        <button class="um-row" role="menuitem" data-feedback><span class="um-ico">${icon("mail")}</span><span>Leave feedback</span></button>
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

  // Contact Us › feedback form (1000x568 modal: intro left, form right). Sending is simulated.
  function openFeedback() {
    const u = state.signedIn ? state.user : null;
    const wrap = openModal(`<form class="dlg feedback-dlg" id="feedback-form" novalidate>
      ${dialogHead("Contact us")}
      <div class="feedback-body">
        <div class="feedback-intro">
          <h3>We value your feedback!</h3>
          <p>We’d love to hear your thoughts! Let us know what’s working, what can be improved, and any features you’d like to see.</p>
          <p>Submit your feedback using the form or contact us via email.</p>
          <a class="feedback-mail" href="mailto:get-involved@internet.io"><span class="feedback-mail-ico">${icon("mail")}</span>get-involved@internet.io</a>
        </div>
        <div class="feedback-fields">
          ${field("name", "Name", { placeholder: "Enter your name", value: u ? `${u.first} ${u.last}`.trim() : "", autocomplete: "name" })}
          ${field("email", "Email", { type: "email", placeholder: "your@email.com", value: u ? u.email : "", autocomplete: "email" })}
          ${field("subject", "Subject", { placeholder: "Briefly describe your feedback" })}
          <label class="auth-field feedback-message"><span class="auth-label">Message</span>
            <textarea name="message" rows="7" placeholder="Share what’s working, what can be improved, or any new features you’d like to see."></textarea></label>
        </div>
      </div>
      <div class="dlg-actions"><button type="button" class="btn btn-secondary" data-close-modal>Cancel</button><button class="btn btn-primary" type="submit">Send</button></div>
    </form>`, { id: "feedback-modal" });
    const form = wrap.querySelector("form");
    wireForm(form, (f) => EMAIL_RE.test(f.email.value.trim()) && f.message.value.trim(), () => {
      closeModal();
      toast("Thanks! Your feedback was sent");
    });
    (form.name.value ? form.subject : form.name).focus({ preventScroll: true });
  }

  // Home › Watch video: the 90-second launch video in a popup (Home Page › Video).
  function openVideo() {
    const wrap = openModal(`<div class="video-dlg" role="dialog" aria-modal="true" aria-label="internet.io launch video">
      <div class="video-frame is-loading"><video src="assets/launch-video.mp4" poster="assets/launch-video-poster.jpg" controls autoplay playsinline></video><span class="video-shimmer" aria-hidden="true"></span></div>
      <button class="btn video-close" data-close-modal>Close</button>
    </div>`, { id: "video-modal" });
    wrap.classList.add("video-backdrop");
    const v = wrap.querySelector("video");
    const ready = () => v.parentElement.classList.remove("is-loading");
    v.addEventListener("canplay", ready, { once: true });
    if (v.readyState >= 3) ready();
    v.play?.().catch(() => {});
  }

  // Desktop profile dialogs (Login/SignUp & Profiles › New Profile / Edit Profile).
  function openProfileDialog(index = null) {
    const editing = index !== null;
    const n = editing ? index + 1 : state.user.profiles.length + 1;
    const wrap = openModal(`<form class="dlg profile-dlg" id="profile-dlg" novalidate>
      ${dialogHead(editing ? "Edit your profile name" : "Create a new profile")}
      <div class="dlg-body">
        ${field("name", `Profile ${n}`, { placeholder: "Enter profile name (e.g., Work, Fun)", value: editing ? state.user.profiles[index].name : "" })}
        ${editing ? "" : `<p class="dlg-note">Create up to 3 profiles! One for work, one for fun, or one for someone else.</p>`}
      </div>
      <div class="dlg-actions"><button type="button" class="btn btn-secondary" data-close-modal>Cancel</button><button class="btn btn-primary" type="submit">${editing ? "Save" : "Create"}</button></div>
    </form>`);
    const form = wrap.querySelector("form");
    const submit = form.querySelector("[type=submit]");
    const check = () => { submit.disabled = !form.name.value.trim(); };
    form.name.addEventListener("input", check);
    check();
    form.name.focus({ preventScroll: true });
    form.name.select();
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      if (!name) return;
      if (editing) {
        state.user.profiles[index].name = name;
        toast("Profile renamed");
      } else {
        state.user.profiles.push({ name, color: PROFILE_COLORS[state.user.profiles.length % 3] });
        state.user.active = state.user.profiles.length - 1;
        toast(`Profile "${name}" created`);
      }
      closeModal();
      refreshAccountUI();
    });
  }

  function refreshAccountUI() {
    topbar.dataset.sig = "";
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
    if (t.hasAttribute("data-new-profile") && isDesk()) { closeMenu(); return openProfileDialog(); }
    if (t.hasAttribute("data-edit-profile") && isDesk()) { closeMenu(); return openProfileDialog(state.user.active); }
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
    if (t.hasAttribute("data-agent-reset")) { state.exploreQuery = ""; state.exploreCat = "All"; return viewExplore(); }
    if (t.dataset.cat) {
      state.exploreCat = t.dataset.cat;
      if (parseHash().parts[0] !== "explore") return go("#/explore");
      return viewExplore();
    }
    if (t.hasAttribute("data-create-agent")) return openAgentDialog();
    if (t.dataset.editAgent) return openAgentDialog(state.myAgents.find((x) => x.key === t.dataset.editAgent));
    if (t.dataset.deleteAgent) return openDeleteAgent(t.dataset.deleteAgent);
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

    if (t.dataset.go?.startsWith("#/compare") && !state.signedIn) {
      return openGate("Sign up to compare side by side", "Put two AI answers next to each other and see which one fits best.");
    }
    if (t.classList.contains("is-waiting")) return toast(FOLLOWUP_WAIT);
    if (t.dataset.go) return go(t.dataset.go);
    if (t.hasAttribute("data-back")) return history.length > 1 ? history.back() : go("#/chats");

    if (t.hasAttribute("data-clear")) {
      const input = $("#top-search input");
      input.value = "";
      return input.focus({ preventScroll: true });
    }

    if (t.dataset.tab === "search") {
      e.preventDefault();
      // Reselecting Search while on it goes home; from another tab it restores the last search screen.
      const onSearch = isSearchPage(location.hash || "#/");
      if (onSearch && location.hash !== "#/" && location.hash !== "") { state.searchScroll = {}; return go("#/"); }
      if (!onSearch) return go(state.searchHash);
      return;
    }
    if (t.dataset.tab === "explore" && !state.signedIn) {
      e.preventDefault();
      return openGate("Sign up to explore AI agents", "Chat with specialized agents for writing, coding, studying and more.");
    }
    if (t.dataset.tab === "chats" && !state.signedIn) {
      e.preventDefault();
      return openGate("Sign in to see your saved chats", "Save answers from any AI model and organize them into folders.");
    }


    if (t.dataset.toggleFolder) {
      const id = t.dataset.toggleFolder;
      if (state.openFolders.has(id)) state.openFolders.delete(id); else state.openFolders.add(id);
      const side = $(".saved-side");
      const { parts } = parseHash();
      side.outerHTML = savedSidebar(parts[0] === "chat" ? parts[1] : parts[2] || "root");
      $(`[data-toggle-folder="${id}"]`)?.focus({ preventScroll: true });
      return;
    }
    if (t.dataset.saveAnswer) {
      if (!state.signedIn) return openGate("Sign up to save answers", "Save answers from any AI model and organize them into folders.");
      const m = modelByKey(t.dataset.saveAnswer);
      const convo = { id: `c${Date.now()}`, model: m.key, title: m.title, messages: [{ from: "ai", html: m.body }], saved: false, fromSearch: true };
      state.conversations[convo.id] = convo;
      return openAddToFolder(convo);
    }
    if (t.hasAttribute("data-toggle-collapse")) {
      const box = screen.querySelector(".desk-answer");
      // Lock the snippet width to the expanded list so text never re-wraps while the list animates.
      const body = box?.querySelector(".result-body");
      if (body && !state.answersCollapsed) state.answerBodyW = body.offsetWidth;
      if (box && state.answerBodyW) box.style.setProperty("--body-w", `${state.answerBodyW}px`);
      state.answersCollapsed = !state.answersCollapsed;
      box?.classList.toggle("is-collapsed", state.answersCollapsed);
      t.outerHTML = collapseBtn();
      return;
    }
    if (t.hasAttribute("data-watch-video")) return openVideo();
    if (t.hasAttribute("data-feedback")) { e.preventDefault(); closeMenu(); return openFeedback(); }
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

  // Typing in the My agents search bar jumps to Explore with the query.
  document.addEventListener("input", (e) => {
    if (!e.target.matches?.("[data-go-explore]")) return;
    state.exploreQuery = e.target.value;
    state.exploreFocus = true;
    go("#/explore");
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
