# Micro-SaaS Project Specification: 3D-Enhanced AI Code Explainer

This document outlines the complete architecture, implementation workflow, and constraints for building an AI-powered **Code Explainer** micro-project. It is designed to be fed directly into an AI coding assistant (like Claude Code) to generate the entire codebase with modern styling, strict security boundaries, and high-fidelity 3D transition components.

---

## 1. Project Tech Stack & Architecture

- **Frontend:** React.js, TypeScript, Tailwind CSS
- **Interactive 3D Layer:** React Three Fiber (`@react-three/fiber`), `@react-three/drei`, `three`
- **Backend:** Node.js (Express), TypeScript, native HTTP clients (configured for Groq Cloud API compatibility)
- **API Target:** **Groq Cloud API** (Utilizing fast models like `llama-3.3-70b-versatile` or `mixtral-8x7b-32768`)

---

## 2. Core Constraints & Feature Set

### A. Input Restrictions (Token & Line Controls)
To prevent API abuse, excessive token consumption, and rate-limiting issues, the system must enforce strict input bounds on both the frontend and the backend:
1. **Line Limit:** Maximum **100 lines of code** per single request.
2. **Character Limit:** Maximum **6,000 characters**.
3. **Validation Flow:** 
   - **Frontend:** Disable the submit button and render an error badge if lines > 100 or characters > 6,000.
   - **Backend:** Validate the string input. If it fails the length/line rules, return a `400 Bad Request` status immediately without forwarding the request to Groq.

### B. High-Animation UI & 3D Component Integration
Adhering to a highly polished, clean, modern look with elegant appearing transitions:
1. **The 3D Hero Hub:** An interactive, abstract 3D viewport rendered via React Three Fiber positioned alongside or behind the code container. It consists of an abstract floating "code mesh" or a hyper-realistic geometric node cluster that reacts subtly to mouse movements and changes color or velocity when an API call is active.
2. **Framer Motion Elements:** Clean fade-in, scale-up transitions (`duration: 0.5, ease: "easeOut"`) applied to the input terminal, output explanation card, and validation banners as they mount.

---

## 3. Step-by-Step Implementation Guide

### Step 1: Backend Setup & Groq Cloud API Integration

1. **Initialize Node.js + TypeScript Environment:**
   Create an Express server handling a single `POST /api/explain` endpoint.

2. **Secure Environment Configurations:**
   Never expose the Groq Cloud API key to the frontend. Store it inside a secure `.env` file on the server.
   ```env
   GROQ_API_KEY=gsk_your_actual_groq_cloud_api_key_here
   PORT=5000
   ```

3. **Install Dependencies:**
   ```bash
   npm install express cors dotenv dotenv-expand
   npm install --save-dev typescript @types/express @types/node ts-node
   ```

4. **Implementation Logic (`server.ts`):**
   - Read `code` and `language` fields from `req.body`.
   - **Line and Character Count Restrictions Check:**
     ```typescript
     const lineCount = code.split(/\r\n|\r|\n/).length;
      if (lineCount > 100) {
        return res.status(400).json({ error: "Code exceeds the maximum limit of 100 lines." });
      }
      if (code.length > 6000) {
        return res.status(400).json({ error: "Code exceeds the maximum limit of 6,000 characters." });
     }
     ```
   - **Groq Cloud Fetch Invocation:** Send a direct payload to `https://api.groq.com/openai/v1/chat/completions` using a system prompt that enforces structural clarity:
     - Model: `llama-3.3-70b-versatile`
     - System Instructions: *"You are an elite software architect. Explain the following code step-by-step. Provide a high-level overview, followed by a markdown line-by-line breakdown, and end with an optimization or complexity analysis."*

### Step 2: 3D Interactive Layer Installation (`React Component`)

1. **Install 3D Packages:**
   ```bash
   npm install three @react-three/fiber @react-three/drei
   npm install @types/three --save-dev
   ```

2. **Create the `CodeMesh3D.tsx` Component:**
   - Implement an interactive canvas wrapping a `<mesh>` containing a `torusKnotGeometry` or a particle grid (`points`).
   - Add a subtle floating rotation animation within a custom frame loop (`useFrame`).
   - Use standard desaturated mesh materials (`meshPhysicalMaterial`) with cool slate-grey, deep indigo, or metallic finishes to maintain a clean, ultra-modern aesthetic.

### Step 3: Frontend Interface & Smooth Transitions

1. **Input Terminal:**
   A sleek text area resembling an IDE terminal window, styled with Tailwind CSS (`bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl`).
   - Real-time line count display indicator positioned in the bottom corner (`{lineCount}/100 lines`).

2. **Result Visualization:**
   A dedicated output pane utilizing markdown formatting for crisp code blocks and bullet points.

---

## 4. Key Security & Operational Measures

- **Rate Limiting:** Implement `express-rate-limit` on the Node.js backend to limit individual IP addresses to a max of 10 requests per minute.
- **CORS Configuration:** Explicitly restrict CORS permissions to match only your local frontend or production domain (`zemz.pro`). Do not use `cors(*)`.
- **Error Obfuscation:** Catch internal API connection failures seamlessly. If the Groq API key is invalid or rate-limited, return a generic descriptive payload (`"Explanation service is temporarily unavailable"`) to avoid revealing API keys or system traces in stack strings.

---

## 5. Blueprint Prompts for Generation

When pasting this into your developer AI agent, use the following execution prompt:

> *"Generate a complete, production-ready full-stack setup using the specifications detailed above. Create a TypeScript Express backend verifying input counts strictly under 100 lines / 6000 chars, forwarding requests to the Groq Cloud endpoint. Create a gorgeous React frontend incorporating an interactive React Three Fiber floating element, reactive status styles, smooth Framer Motion appearing transitions, and complete error handling."*
