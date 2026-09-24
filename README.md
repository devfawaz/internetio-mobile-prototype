# internet.io — mobile prototype

A clickable mobile prototype of **internet.io**, a search product that asks several AI models the same question and lets you compare, follow up on and save their answers. Built from the "📱 Mobile" page of the internet.io Figma file.

**Live:** https://devfawaz.github.io/internetio-mobile-prototype/

## Flows

- **Search → Results → Answer:** answers from 7 models (OpenAI, Meta, Gemini, Azure, Perplexity, Anthropic, Cohere). Step through them with Prev / Next.
- **Ask follow-up:** opens a conversation with a simulated AI reply.
- **Signed out vs signed in:** start as a guest (Login / Sign up, one free follow-up, sign-up banner). Sign in from the sheet to unlock Chats, saving and unlimited follow-ups. Sign out from the avatar menu.
- **Chats:** folder tree with expandable folders, new folders and saved conversations.

Best viewed on a phone, or in a desktop browser where it renders at iPhone size with an iOS status bar and home indicator.

## Stack

Plain HTML, CSS and JavaScript — no build step. Fonts: Inter and Material Symbols (Google Fonts). Model logos and the wordmark are exported from the Figma file.

## Run locally

```bash
npx serve .
```
