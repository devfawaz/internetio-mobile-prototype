# internet.io — mobile prototype

A clickable mobile prototype of **internet.io**, a search product that asks several AI models the same question and lets you compare, follow up on and save their answers. Built from the "📱 Mobile" page of the internet.io Figma file.

**Live:** https://devfawaz.github.io/internetio-mobile-prototype/

## Flows

- **Search → Results → Answer:** answers from 7 models (OpenAI, Meta, Gemini, Azure, Perplexity, Anthropic, Cohere). Step through them with Prev / Next.
- **Ask follow-up:** opens a conversation with a simulated AI reply.
- **Sign up:** email sign-up → create your first profile, or Continue with Google / Facebook → "Almost there" details → profile. Adapted for mobile from the desktop design. Login screen included.
- **Signed out vs signed in:** guests get one free follow-up and a sign-up banner; saving, Chats and unlimited follow-ups need an account. After signing up you return to where you left off. Sign out from the avatar menu.
- **Saved:** flat list with folders, saved messages, Add to folder, New Folder, and a ⋮ menu to rename, move or delete.
- **Personalise:** reorder AI models (drag handles) and manage custom prompts — pick one as active, create, edit, delete with undo.
- **Profiles:** accounts with several profiles choose one after login; switch, create or rename from the account menu.
- **Explore AI:** browse agents by category, open an agent's details and start a chat with it (rename the chat with the pencil). Agent names, creators and stats are example content.

Best viewed on a phone, or in a desktop browser where it renders at iPhone size with an iOS status bar and home indicator.

Add `?reset` to the URL to restore the sample data (useful between recording takes).

## Stack

Plain HTML, CSS and JavaScript — no build step. Fonts: Inter and Material Symbols (Google Fonts). Model logos and the wordmark are exported from the Figma file.

## Run locally

```bash
npx serve .
```
