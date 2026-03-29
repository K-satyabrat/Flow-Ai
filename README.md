# Future-blink

A small full-stack app that lets you type a prompt in a flow-based UI, run it against an OpenRouter chat completion model, and optionally save the prompt/response to MongoDB.

## Live demo

- Frontend: https://flow-ai-frontend-02o3.onrender.com/
- Backend: https://flow-ai-backend-qmu8.onrender.com/

## Tech stack

- Frontend: React + Vite, Tailwind CSS, `@xyflow/react`
- Backend: Node.js + Express, MongoDB (Mongoose)
- AI provider: OpenRouter (`/chat/completions`)

## Project structure

- `frontend/` - React client
- `backend/` - Express API + MongoDB persistence

## Prerequisites

- Node.js + npm
- MongoDB connection string (Atlas or local)
- OpenRouter API key

## Environment variables (backend)

Create `backend/.env` (you can copy `backend/.env.example`):

```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

## Run locally

### 1) Start the backend

```bash
cd backend
npm install
npm run dev
```

Backend starts at `http://localhost:5000` by default.

### 2) Start the frontend

```bash
cd frontend
npm install
npm run start
```

Vite prints the local dev URL (commonly `http://localhost:5173`).

## How it works

- Type your prompt in the left input node.
- Click **Run Flow** to call the backend and render the AI response in the right output node.
- Click **Save** to persist `{ prompt, response }` into MongoDB.

## API

Base URL: `http://localhost:5000`

- `GET /test` → `{ message: "server running" }`
- `POST /api/ask-ai`
  - Body: `{ "prompt": "…", "model": "optional-model-id" }`
  - Response: `{ "answer": "…" }`
- `POST /api/save`
  - Body: `{ "prompt": "…", "response": "…" }`
  - Response: `{ "message": "Saved successfully" }`


