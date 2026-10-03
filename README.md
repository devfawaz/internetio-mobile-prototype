# internet.io: responsive prototype

A clickable, responsive prototype of **internet.io**, a search product that asks several AI models the same question and lets you compare, follow up on and save their answers. Built from the "📱 Mobile" and "🖥️ Web App" pages of the internet.io Figma file.

**Live:** https://devfawaz.github.io/internetio-mobile-prototype/

## Flows

- **Search → Results → Answer:** answers from 7 models (OpenAI, Meta, Gemini, Azure, Perplexity, Anthropic, Cohere). A new search streams in: cards shimmer while each model answers and the status line cycles ("Gathering AI responses…", "3 of 7 answers in…"). Step through answers with Prev / Next; only the answer changes, not the page.
- **Side by side (desktop, signed in):** compare two answers next to each other; close one to pick another model. Guests are asked to sign up.
- **Collapse the answer list (desktop):** the expand button shrinks the list to model names so the answer gets the space.
- **Ask follow-up:** opens a conversation with a simulated AI reply. It waits until every model has answered.
- **Sign up:** email sign-up → create your first profile, or Continue with Google / Facebook → "Almost there" details → profile. Adapted for mobile from the desktop design. Login screen included.
- **Signed out vs signed in:** guests get 5 free questions (searches and follow-ups) with a sign-up banner in chats; saving, Saved, Explore AI and unlimited questions need an account. After signing up you return to where you left off. Sign out from the avatar menu.
- **Saved:** flat list with folders, saved messages, Add to folder, New Folder, and a ⋮ menu to rename, move or delete.
- **Personalise:** reorder AI models (drag handles) and manage custom prompts: pick one as active, create, edit, delete with undo.
- **Profiles:** accounts with several profiles choose one after login; switch, create or rename from the account menu (dialogs on desktop).
- **Explore AI:** browse agents by category, open an agent's details and start a chat with it (rename the chat with the pencil). Agent names, creators and stats are example content.
- **Build your own agent:** Create agent → name, category, description and icon (the image is only previewed in the browser) → a block builder on desktop (logic, orchestration, agents, tools) → Save. Built agents appear in My agents (edit, delete) and in Explore.
- **Feedback:** the mail icon, "Leave feedback" and "Contact us" open the feedback form. Sending is simulated.
- **Launch video:** "Watch video" on the home page plays the 90-second launch video in a popup.

## Desktop and mobile

- **1024px and wider:** the desktop web app. A left navigation rail, a search bar in the header, answers in a list with a detail pane, a **side-by-side view** to compare two models (desktop only), Saved as a folder sidebar plus a table, Explore AI with a category column, and centered auth cards and dialogs.
- **Narrower:** the Android mobile app (Material 3), with a bottom navigation bar and bottom sheets.
- **`?mobile`:** keeps the phone view in a desktop browser, at Pixel 10 Pro size with Android system bars. Use it for mobile recordings.

Both layouts share the same state, sample data and flows. Screens update only the parts that change, with subtle motion throughout (switched off when the system asks for reduced motion).

Add `?reset` to the URL to restore the sample data (useful between recording takes).

## Stack

Plain HTML, CSS and JavaScript: no build step. Colours, type, spacing, radius and motion come from the internet.io design tokens in `tokens.css`. Fonts: Inter and Material Symbols (Google Fonts). Model logos and the wordmark are exported from the Figma file.

## Run locally

```bash
npx serve .
```
