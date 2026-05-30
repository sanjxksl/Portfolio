# sanjana.os

A portfolio built as a macOS desktop. Drag things, open windows, run the terminal. It's more interesting than a webpage.

**Live → [sanjanaksl.com](https://sanjanaksl.com)**

---

## What's in it

**Desktop**
- Draggable icons with default scatter positions (reset on refresh)
- Boot sequence on first load — skip it or let it run
- Dock with bounce animation; active apps show a dot indicator
- Menubar with live clock, wifi and battery icons, online status, and ⌘K shortcut

**Windows**
- Draggable, resizable, stackable
- Traffic-light close/minimise/fullscreen controls
- Window sizes adapt to viewport; stay in bounds on resize

**Finder**
- Browse Work, Projects, Competitions, and Gallery folders
- Filter by tag from the sidebar (6 pinned tags)
- Each project opens as a document with inline SVG architecture diagrams and metrics

**Gallery (Photos)**
- View by Years, Months, Days, or All Photos
- Zoom controls (4 density levels)
- Lightbox with keyboard navigation (← → Esc) and info overlay (I)

**Terminal**
- Type `help` to see all commands
- Useful ones: `whoami`, `ls`, `cat about.md`, `neofetch`, `hire sanjana`
- Fun ones: `dance`, `music`, `coffee`
- `note <your message>` — signs the guestbook

**Guestbook**
- Leave a note, named or anonymous
- Stored in localStorage (per-browser)
- Seeded with a few entries so it doesn't look empty

**Spotlight** (`⌘K`)
- Searches across every project, app, and file

**Learning log**
- Git-style commit history of what I'm studying, branched by domain

**Notes**
- What I'm currently reading (with notes) and a to-do list of things I'm learning, with sublists

---

## Stack

| Layer | Detail |
|---|---|
| UI | React 18 via CDN, no bundler |
| Styling | Vanilla CSS, custom properties |
| Fonts | Cormorant Garamond · Fraunces · Inter · JetBrains Mono |
| Hosting | GitHub Pages |
| Domain | Cloudflare DNS |

No framework. No build step. One `index.html`.

---

## Content

- **Work** — ExamScopeAI: semantic search over 12 years of CIBC AML examination history (RAG pipeline, in progress at CIBC)
- **Projects** — executive compensation anomaly detection · PEAD replication · ESG factor returns · credit risk with counterfactual explanations · Aesthify (computer vision + design scoring) · evidence engine for product decisions
- **Competitions** — 1st place Rotman MMA Datathon · 1st place Koru Problem Hunt · Top 7 teams Manulife × Rotman Design Challenge

---

## Running locally

```bash
git clone https://github.com/sanjxksl/portfolio.git
cd portfolio
open index.html
```

Or with a local server to avoid asset CORS issues:

```bash
npx serve .
```

---

## Structure

```
portfolio/
├── index.html              # entry point
├── scripts/
│   ├── app.jsx             # desktop, dock, menubar, window manager
│   ├── window-system.jsx   # draggable/resizable window primitives
│   ├── content-views.jsx   # finder, gallery, about, guestbook, notes
│   ├── terminal.jsx        # terminal + all commands
│   ├── diagrams.jsx        # inline SVG project diagrams
│   └── data.js             # all content lives here
├── styles/
│   └── os.css              # everything visual
└── assets/ images/         # resume PDF, gallery photos
```

---

*Sanjana Kanchibotla — [linkedin.com/in/sanjanaksl](https://linkedin.com/in/sanjanaksl) · sanjanakanchibotla@gmail.com*
