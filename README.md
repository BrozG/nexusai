# NexusAI — Web UI

> The official front-end interface for **NexusAI**, a scalable AI customer support platform powered by LoRA fine-tuned language models.

---

## 👥 Team Project

This is a collaborative project. Here's what each member contributed:

| Role | Contributor | Work Done |
|---|---|---|
| **AI Architecture & Backend Design** | [@BrozG](https://github.com/BrozG) | Designed the full system architecture — LoRA adapter pipeline, domain detection (Telecom, Banking etc.), Phi-2 fine-tuning, Vector Store integration for company policies, FastAPI backend design |
| **Web UI & Frontend** | [@kuhitjeetaray](https://github.com/kuhitjeetaray) | Built the Next.js frontend, Three.js hero, Admin Dashboard, Customer Portal |

---

## 🧠 System Architecture (Designed by @BrozG)

```
Company PDFs / Policies
        ↓
   Vector Store  ←──────────────────────────┐
        ↓                                   │
   Domain Detection (LoRA Adapter)          │
   [Telecom | Banking | Healthcare...]      │
        ↓                                   │
   Phi-2 LLM (frozen parameters)            │
   + LoRA Domain Adapter                    │
        ↓                                   │
   FastAPI Backend  ──────────────────── Web UI (Next.js)
```

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
| LLM | Microsoft Phi-2 + LoRA Adapters |
| Vector Store | FAISS / ChromaDB |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variables

Create a `.env.local` file:

```bash
FASTAPI_URL=https://your-ngrok-or-colab-url
```

### 3. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000 to see the UI.

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
