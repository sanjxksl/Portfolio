# sanjana.os

A portfolio built as a desktop operating system. Drag icons, open windows, run a terminal — it behaves like macOS because it's more interesting that way.

**Live → [sanjanaksl.com](https://sanjanaksl.com)**

---

## What it is

An interactive macOS-style desktop, built entirely with vanilla HTML, CSS, and React (no build step). Every element is functional:

- **Finder** — browse work, projects, competitions, and gallery folders
- **Windows** — draggable, resizable, stackable, with traffic-light controls
- **Dock** — launch any app; active apps show an indicator dot
- **Terminal** — a real chatbot (`⌘K` or click) that answers questions about the portfolio
- **Spotlight** — `⌘K` search across every project, app, and file
- **Boot sequence** — skip it or watch it
- **Desktop icons** — drag them anywhere; positions reset on refresh

---

## Stack

| Layer | Detail |
|---|---|
| UI | React 18 (CDN, no bundler) |
| Styling | Vanilla CSS with custom properties |
| Fonts | Cormorant Garamond · Fraunces · Inter · JetBrains Mono |
| Hosting | GitHub Pages |
| Domain | Cloudflare |

No framework. No build pipeline. One `index.html`.

---

## Content

- **Work** — AI exam-scoping assistant at CIBC (RAG + LLM)
- **Projects** — executive compensation anomaly detection · PEAD replication · ESG returns study · credit risk with counterfactual explanations · Aesthify (computer vision + design research) · evidence engine for product decisions
- **Competitions** — 1st place Rotman MMA Datathon · Finalist Koru Problem Hunt · Finalist Rotman Design Challenge (top 7/43)
- **Learning log** — a git-style commit history of what I'm currently studying
- **Notes** — what I'm reading, listening to, thinking about right now

---

## Running locally

No install needed — just open `index.html` in a browser:

```bash
git clone https://github.com/sanjxksl/portfolio.git
cd portfolio
open index.html
```

Or serve it to avoid any CORS quirks with local assets:

```bash
npx serve .
```

---

## Structure

```
portfolio/
├── index.html              # entry point — loads everything
├── scripts/
│   ├── app.jsx             # desktop shell, dock, icons, window manager
│   ├── window-system.jsx   # draggable/resizable window primitives
│   ├── content-views.jsx   # finder, about, resume, gallery views
│   ├── terminal.jsx        # chatbot terminal
│   ├── diagrams.jsx        # inline SVG architecture diagrams
│   └── data.js             # all portfolio content
├── styles/
│   ├── os.css              # desktop, dock, windows, responsive breakpoints
│   └── *.css               # per-view stylesheets
└── assets/ images/         # resume PDF, photos, icons
```

---

*Sanjana Kanchibotla — [linkedin.com/in/sanjanaksl](https://linkedin.com/in/sanjanaksl) · sanjanakanchibotla@gmail.com*

*Co-designed with [Claude](https://claude.ai) by Anthropic.*
