```markdown
# 🚀 ZenJEE - Autonomous AI-Driven JEE Preparation Platform

ZenJEE is a next-generation, AI-powered Learning Management System (LMS) designed for Joint Entrance Examination (JEE) aspirants. Powered by **Google Gemini 2.5 Flash**, it acts as an autonomous tutor that dynamically generates study plans, renders mathematical concepts in LaTeX, and builds custom assessments targeting a student's specific weak areas.

## ✨ Key Features for Judges to Evaluate

1. **Agentic Study Planner:** Analyzes local telemetry (syllabus coverage and test accuracy) to generate a highly optimized, 4-day targeted study schedule.
2. **Dynamic Weakness Assailant:** Intercepts daily tests to inject brand-new, AI-hallucinated MCQs targeting the student's weakest topics, preventing answer memorization.
3. **Mathematical AI Tutor:** A chatbot capable of parsing complex JEE queries and rendering beautiful textbook-grade LaTeX equations and formulas.
4. **Spaced Repetition System (SRS):** A built-in SM-2 algorithm that spaces out question revisions based on historical user performance.
5. **Zero-Friction Modals:** Integrated YouTube lectures and PDF viewers that open seamlessly within the app without breaking flow state.

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite), Tailwind CSS, React-Router-DOM
* **Math Rendering:** React-Markdown, remark-math, rehype-katex
* **Backend:** Node.js, Express.js, CORS
* **AI Provider:** Google Generative AI SDK (`gemini-2.5-flash`)
* **Database:** Browser LocalStorage (NoSQL mock for MVP)

---

## ⚙️ Setup & Installation Instructions

This project uses a decoupled Client-Server architecture. You will need to run **two separate terminals** to start the application.

### Prerequisites
* Node.js (v18 or higher)
* A valid [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Step 1: Set up the AI Backend (Terminal 1)
The backend handles all secure communication with the Gemini API.

```bash
# Navigate to the server directory
cd server

# Install backend dependencies
npm install

# Create an environment file
touch .env
```

Open the `server/.env` file and add your Gemini API Key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=5000
```

Start the server:
```bash
node index.js
# Expected output: "Secure AI Backend running on port 5000"
```

### Step 2: Set up the React Frontend (Terminal 2)
Leave Terminal 1 running. Open a new terminal in the **root** folder of the project.

```bash
# Install frontend dependencies
npm install

# Start the Vite development server
npm run dev
# Expected output: "Local: http://localhost:5173/"
```
Click the local link to open the app in your browser.

---

## 🧪 Testing Guide & Mock Data for Judges

To experience the full capabilities of ZenJEE, please follow these testing steps:

### 1. Authentication (Mock)
* **Action:** On the login screen, enter any name (e.g., "Judge Test") and email. 
* **Why:** The app uses local storage to maintain session state, avoiding complex DB setups for the demo.

### 2. The AI Tutor (LaTeX Rendering)
* **Action:** From the Dashboard, click the main search bar to open the Chatbot.
* **Mock Inputs to Try:**
  * *"Derive the formula for the maximum height of a projectile."*
  * *"What is the difference between SN1 and SN2 reactions? Provide examples."*
  * *"Solve the integral of e^x (sin x + cos x) dx."*
* **What to look for:** Notice the high-speed streaming response and the flawless formatting of mathematical LaTeX (`$math$`) into readable textbook equations. Look for the dynamic routing buttons that appear at the bottom of the AI's response.

### 3. The Autonomous Planner
* **Action:** Click "My Study Space" in the top navigation bar. Click **"Refresh Plan"**.
* **What to look for:** The app analyzes the mock local storage data, packages the user's "Weakness Signature", and queries Gemini. It returns a strictly formatted JSON schedule targeting specific weak points (e.g., Physics: Kinematics).

### 4. Interactive Learning Modules
* **Action:** Go to Dashboard -> **Physics** -> **Electrostatics** (Chapter 1).
* **What to look for:** Click the Video Thumbnail to see the seamless YouTube modal. Click "Short Notes Review" at the bottom to see a highly structured, LaTeX-rich markdown cheat sheet generated for the chapter.

### 5. Custom Test Builder
* **Action:** Go to Dashboard -> **Custom AI Paper**.
* **What to look for:** Select your desired subjects, chapter weightage, and difficulty, and let the engine construct a customized assessment array.

---

## 📂 Project Structure Overview

```text
├── server/                 # Node.js + Express API Gateway
│   ├── index.js            # AI Route handlers & Gemini Prompts
│   ├── .env                # API Keys
│   └── package.json
├── src/                    # React Frontend
│   ├── components/         # Reusable UI widgets
│   ├── data/               # Mock DB: chaptersData.js, questionsData.js
│   ├── pages/              # Route views (Dashboard, Planner, Search, etc.)
│   ├── services/           # api.js (Backend connector), auth.js
│   ├── App.jsx             # React Router configuration
│   └── main.jsx            # Entry point
├── tailwind.config.js      # Styling configuration
└── package.json            # Frontend dependencies
```

## 🤝 Known Limitations (MVP)
* Data is stored in LocalStorage. Clearing browser data will reset progress.
* Hitting the 15 Requests-Per-Minute free-tier limit of the Gemini API will trigger a graceful `429 Too Many Requests` warning in the UI. Please wait 60 seconds if this occurs.
```
