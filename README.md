# Linguify

[![React](https://img.shields.io/badge/React-19%2B-61dafb?logo=react&logoColor=white)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4%2B-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12%2B-ff69b4?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vite](https://img.shields.io/badge/Vite-7%2B-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![Jest](https://img.shields.io/badge/Jest-30%2B-c21325?logo=jest&logoColor=white)](https://jestjs.io)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![Status](https://img.shields.io/badge/Status-In_Development-yellow)](#)

**Linguify** is a fullstack web application for multilingual text work. It combines a React frontend with a Vercel Serverless Function backend, providing translation, text-to-speech, synonym lookup and a contact form backed by a real email API.

🔗 **Live:** [linguify-web.vercel.app](https://linguify-web.vercel.app)

---

## Screenshots

### Start Page

<img src="docs/screenshots/entry.png" width="600" height="350" alt="Start Page" />

### Menu Page

<img src="docs/screenshots/menu.png" width="600" height="350" alt="Menu Page" />

### Translator Module

<img src="docs/screenshots/translator.png" width="600" height="350" alt="Translator" />

### Synonym Finder

<img src="docs/screenshots/synonym-finder.png" width="600" height="350" alt="Synonym Finder" />

### Settings

<img src="docs/screenshots/settings.png" width="600" height="400" alt="Settings" />

### About App

<img src="docs/screenshots/about.png" width="600" height="400" alt="About App" />

### Help

<img src="docs/screenshots/help.png" width="600" height="400" alt="Help and Support" />

### Contact

<img src="docs/screenshots/contact.png" width="600" height="350" alt="Contact" />

### 404 Not Found Page

<img src="docs/screenshots/404.png" width="600" height="350" alt="404 Not Found Page" />

---

## Table of Contents

- [Features](#features)
- [Technical Overview](#technical-overview)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [APIs & Services](#apis--services)
- [Testing](#testing)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)

---

## Features

### Translation

- Direct translation between 20 languages via MyMemory API
- Live character counter with 250-character limit
- Smooth result animation on translation arrival
- **Keyboard shortcuts:** `Cmd/Ctrl + Enter` to translate, `Esc` to clear
- Optional auto-clear (immediate or delayed) and auto-copy

### Text-to-Speech

- Reads input and output text aloud in the selected language
- Uses the browser's built-in Web Speech API
- Independent playback controls per field (stop/start)
- Automatically uses CJK-optimized font (Noto Sans JP) for Asian languages

### Synonym Finder

- Alternative wording suggestions via Datamuse API
- Animated result chips with staggered entrance
- Enter key shortcut for faster lookup
- English words recommended (Datamuse is English-only)

### Settings

- Auto-clear input (immediate or 3-second delay)
- Auto-copy translation output to clipboard
- All changes auto-persisted to `localStorage` via `useEffect` — no save button

### Contact Form

- Connected to **Resend** email API via a Vercel Serverless Function
- Input sanitization (HTML injection prevention)
- Server-side email format validation
- Rate limiting via **Upstash Redis** (sliding window: 2 requests / 5 min per IP)
- Separate Express.js server for local development with `express-rate-limit`

### Navigation & UX

- Animated menu with staggered button fly-in (Framer Motion)
- Entrance animations on every page (consistent `scale + opacity` pattern)
- Floating multilingual background characters on the start page
- Client-side routing with React Router + dedicated 404 page
- Smooth translate button spinner (cross-fade, no hard jump)
- Layout-shift-free error and copy notifications (opacity overlay pattern)

## Technical Overview

| Area               | Technology                                                                        |
| ------------------ | --------------------------------------------------------------------------------- |
| **Frontend**       | React 19, TailwindCSS 4, Framer Motion                                            |
| **Build Tool**     | Vite 7                                                                            |
| **Routing**        | React Router                                                                      |
| **State**          | React Hooks, Custom Hooks, Context API                                            |
| **Animations**     | Framer Motion (page transitions, stagger, AnimatePresence) + custom CSS keyframes |
| **Backend (prod)** | Vercel Serverless Function (`api/contact.js`)                                     |
| **Backend (dev)**  | Express.js (`backend/server.js`)                                                  |
| **Email**          | Resend API                                                                        |
| **Rate Limiting**  | Upstash Redis + `@upstash/ratelimit` (prod) / `express-rate-limit` (dev)          |
| **Persistence**    | Browser `localStorage`                                                            |
| **Testing**        | Jest 30 + React Testing Library                                                   |
| **Deployment**     | Vercel                                                                            |

---

## Architecture

```
Browser (React SPA)
    │
    ├── Translation  ──────────────► MyMemory API (external)
    ├── Synonym Finder ────────────► Datamuse API (external)
    ├── Text-to-Speech ────────────► Web Speech API (browser built-in)
    │
    └── Contact Form
            │
            ├── Production ────────► Vercel Serverless Function
            │                              │
            │                        Upstash Redis (rate limit)
            │                              │
            │                          Resend API ──► Email
            │
            └── Local Dev ─────────► Express.js server (localhost:3000)
                                           │
                                     express-rate-limit
                                           │
                                       Resend API ──► Email
```

### Frontend Structure

- **Pages** — each with a Framer Motion entrance animation
- **Layouts** — page wrappers for consistent card/container structure
- **Components** — reusable UI elements (buttons, selectors, text areas, tooltips)
- **Custom Hooks** — application logic separated from UI:
  - `useTranslator()` — translation, API calls, three-layer error handling
  - `useLanguageSwitcher()` — language selection and swap
  - `useSpeech()` — Web Speech API wrapper
  - `useSettings()` — SettingsContext consumer
- **Context** — `SettingsContext` provides global settings state without prop drilling; auto-persisted via `useEffect`

---

## Project Structure

```
linguify/
│
├── api/
│   └── contact.js              # Vercel Serverless Function (prod backend)
│
├── backend/
│   ├── server.js               # Express.js dev server
│   └── package.json
│
├── docs/
│   └── screenshots/            # README screenshots
│
├── src/
│   ├── __tests__/              # Jest + React Testing Library tests
│   ├── components/             # Reusable UI components
│   ├── context/                # SettingsContext (global state)
│   ├── data/                   # Static data (language list + helper)
│   ├── hooks/                  # Custom React hooks
│   ├── layout/                 # Page layout wrappers
│   ├── pages/                  # Application pages
│   ├── App.jsx                 # Routing configuration
│   ├── index.css               # Global styles + CSS animations
│   └── main.jsx                # Entry point
│
├── vercel.json                 # Vercel routing config (SPA + API rewrites)
├── vite.config.js
├── tailwind.config.js
├── jest.config.cjs
└── package.json
```

---

## APIs & Services

### MyMemory Translation API -> For Translating

`https://api.mymemory.translated.net/`

### Datamuse API -> For Synonym Finding

`https://api.datamuse.com/`

### Resend API -> For Email Sending

`https://resend.com`

### Upstash Redis -> For persistent Rate Limiting

`https://upstash.com`

---

## Testing

Tests are written with [Jest](https://jestjs.io) and [React Testing Library](https://testing-library.com).

### Run tests

```bash
npm test
```

### Test files

| File                                 | What is tested                                                                                                |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `__tests__/ErrorBox.test.jsx`        | Invisible (opacity-0) on null/empty, visible (opacity-100) with message, updates on prop change               |
| `__tests__/TranslateButton.test.jsx` | Arrow visible in idle state, spinner visible while translating, click handler, disabled button ignores clicks |

### Testing approach

Tests focus on **user-visible behaviour**:

- `render()` mounts components into a virtual DOM (jsdom)
- `screen` queries elements the same way a user would see them
- `fireEvent` simulates real interactions such as clicks
- `queryByText` is used to assert absence of elements without throwing

---

## Local Development

### Frontend

```bash
git clone <repository-url>
cd linguify
npm install
npm run dev
# → http://localhost:5173
```

### Backend (for Contact Form)

```bash
cd backend
npm install
# Create a .env file
npm run dev
# → http://localhost:3000
```

---

## Deployment

The app is deployed on **Vercel**.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## Environment Variables

### Frontend (`.env`)

```env
VITE_API_URL=http://localhost:3000
```

### Backend (`backend/.env`)

```env
RESEND_API_KEY=your_resend_api_key
SENDER_EMAIL=your_verified_sender@yourdomain.com
RECIPIENT_EMAIL=your_email@example.com
```

### Vercel (Dashboard → Project -> Settings → Environment Variables)

```env
RESEND_API_KEY=your_resend_api_key
SENDER_EMAIL=your_verified_sender@yourdomain.com
RECIPIENT_EMAIL=your_email@example.com
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

> **List `.env` file in `.gitignore`.**
