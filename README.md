# PatternForge ⚡️

PatternForge is a modern, interactive learning platform designed for computer science students and self-taught developers who understand basic syntax but struggle with recognizing and applying data structure and algorithm (DSA) patterns.

Unlike traditional coding platforms that immediately drop you into an empty code editor with a wall of text, PatternForge focuses on the **"Why"** before the **"How"**. It breaks down complex patterns into highly visual, interactive, intuition-first steps.

---

## 🎯 MVP Features
The MVP currently features a complete **14-Step Hash Map Pattern Lesson** ("Find the Pair"), built with modern web technologies.

- **Interactive Trace Visualizations:** Step through algorithmic logic with state-based iterators.
- **Clickable Code Stories:** Read Python code like a book. Click on lines of code to reveal plain-English explanations of what they do and why they are there.
- **Pre-Coding Planning Prompts:** Before writing code, users must articulate their mental model, forcing them to understand the data structure rather than just guessing.
- **Pattern Mastery Cards:** Summarizes the Clue, Mental Model, Time/Space Complexity, and required Data Structure so learners can recognize the pattern in the wild.
- **Code Fill-in-the-Blanks:** Check your understanding dynamically with granular success and error feedback.
- **Modern UI/UX:** Built with a soothing light-mode aesthetic, utilizing deep indigo accents and clean typography (Inter).

---

## 🛠️ Technology Stack
- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Styling:** Vanilla CSS Modules with custom CSS Variables (No Tailwind)
- **Icons:** Lucide React
- **Language:** TypeScript

---

## 🚀 Getting Started

To run PatternForge locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HarshithM834/PatternForge.git
   cd PatternForge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the localhost port provided in the terminal (usually `http://localhost:5173`).

---

## 📂 Project Structure

```
PatternForge/
├── src/
│   ├── components/       # Reusable UI elements (GlossaryTerm, InteractiveTrace, CodeEditor, etc.)
│   ├── pages/            # Main page views (LandingPage, LessonPage, CompletionPage)
│   ├── assets/           # Static assets like icons and images
│   ├── App.tsx           # Main application router
│   ├── index.css         # Global CSS variables and resets
│   └── main.tsx          # React DOM entry point
├── public/               # Public static files
├── index.html            # HTML entry point
└── package.json          # Project metadata and dependencies
```

---

## 🧠 Core Philosophy
1. **Intuition First:** Explain the brute-force approach and why it fails before introducing the optimized pattern.
2. **Read Before Writing:** Developers spend more time reading code than writing it. Teach pattern recognition by reading and explaining code lines.
3. **Beautiful by Default:** Learning should not happen in a sterile environment. A premium, modern UI keeps learners engaged.

---

*Built for those who want to master algorithms, not just memorize them.*
