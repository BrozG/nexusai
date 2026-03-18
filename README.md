# NexusAI — Web UI

> The official front-end interface for **NexusAI**, a scalable AI customer support platform powered by LoRA fine-tuned language models.

---

## What is this?

This is the **Next.js web UI** for the NexusAI system. It connects to a FastAPI backend (running on Colab or a local server) that serves domain-specific LoRA adapters on top of `microsoft/phi-2`.

The interface includes:
- 🌐 **Landing / Hero** — animated immersive hero built with Three.js
- 💬 **Customer Portal** — end-user chat interface with live AI responses
- 📊 **Admin Dashboard** — monitor active adapters, API health, and response metrics
- 🔌 **REST proxy** — Next.js API route that forwards requests to the FastAPI model server

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 + custom CSS |
| 3D / Hero | Three.js |
| State | React hooks |
| Fonts | Barlow Condensed · DM Mono |
| Backend | FastAPI (external, via `FASTAPI_URL` env var) |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variables

Create a `.env.local` file:

```env
FASTAPI_URL=https://your-ngrok-or-colab-url
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the UI.

---

## Project Structure

```
nexusai/
├── app/
│   ├── page.tsx              # Landing page (hero)
│   ├── chat/page.tsx         # Customer chat portal
│   ├── dashboard/page.tsx    # Admin dashboard
│   ├── api/chat/route.ts     # Proxy → FastAPI backend
│   ├── layout.tsx            # Root layout + fonts
│   └── globals.css           # Global styles
├── components/
│   ├── ui/
│   │   └── horizon-hero-section.tsx  # Animated 3D hero
│   ├── ChatInterface.tsx
│   ├── JsonPanel.tsx
│   └── ...
└── public/
```

---

## Backend

The model server is a separate FastAPI service. Make sure it is running and accessible before using the chat or dashboard features. See the `after_aikosh/` directory in the parent repo for backend setup.

---

## License

MIT
