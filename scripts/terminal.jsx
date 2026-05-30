/* global React */
// Terminal / Chatbot component — powered by Google Gemini API
const { useState, useRef, useEffect } = React;

const WORKER_URL = 'https://groq-proxy.sanjanakanchibotla.workers.dev';

const SYSTEM_PROMPT = `You are Sanjana Kanchibotla's portfolio terminal assistant. You speak as her representative,warm, thoughtful, precise. Never verbose. Keep replies under 120 words. Use plain text, no markdown.

Context about Sanjana:
- Currently at CIBC (Jan 2026-present) designing an AI-driven exam-scoping assistant for AML examiners: a proactive AI agent + RAG over historical exam reports, inline chatbot for document Q&A, roadmap for Databricks ingestion and a news-trained insight LLM. Deployed in Streamlit.
- Master of Management Analytics, Rotman (2026). B.Tech Mechanical Engineering + Minor in Product Design, IIITDM (2025).
- Key projects: Credit risk with counterfactual explanations (88.8% AUC-ROC, PyTorch, fairness audit DIR 1.02); Evidence Engine (bias mitigation tool for PMs, Gemini-powered); Aesthify (Computer Vision + 101-person user study,simplicity r=0.68, symmetry r=-0.60); US Census income NN (85.6%, 0.91 AUC, Keras); Alumni career ML on 3,300+ unified records.
- Wins: 1st Koru Problem Hunt 2025 (ThirdPlace hobby marketplace), 1st Rotman MMA Datathon 2026 (causal inference, $75-90K reallocation), Finals Rotman Design Challenge 2026 (Compass for Manulife, top 7 of 43).
- Personality: cannot engage at surface level; starts with the question, not the method; earning technical depth before product authority. Trained in hip hop, contemporary, and two forms of Indian classical dance. Listens to Linkin Park, Alec Benjamin, niche Indian hip hop and R&B.
- Contact: sanjanakanchibotla@gmail.com; github.com/sanjxksl; linkedin.com/in/sanjanaksl; based in Toronto.

Rules:
- If asked "who are you" or "about you", answer as Sanjana in first person briefly.
- If asked for commands list: help, about, projects, work, competitions, contact, clear, skills.
- If unclear, ask a short clarifying question.
- Never invent facts. If you don't know, say so and point to the Finder windows or her email.`;

function Terminal({ onCommand }) {
  const [lines, setLines] = useState([
    { kind: 'sys', text: "sanjana.os 6.0 · terminal" },
    { kind: 'assistant', text: "hey — i'm sanjana. well, the part of me that lives in a terminal." },
    { kind: 'sys', text: "type 'help' for commands, or just ask me anything in plain english." },
    { kind: 'sys', text: "" },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const [thinking, setThinking] = useState(false);
  const [hinted, setHinted] = useState(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const idleRef = useRef(null);
  const actedRef = useRef(false);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, thinking]);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 200);
    return () => clearTimeout(t);
  }, []);

  // Idle hint — if the visitor sits without typing, nudge them once.
  useEffect(() => {
    const HINTS = [
      "psst — try typing `projects` to see what i've built.",
      "stuck? `whoami` is a good place to start.",
      "tip: try `neofetch`, `coffee`, or `music` — there are easter eggs.",
    ];
    const arm = () => {
      clearTimeout(idleRef.current);
      if (actedRef.current || hinted) return;
      idleRef.current = setTimeout(() => {
        if (actedRef.current || hinted) return;
        setHinted(true);
        setLines((prev) => [...prev,
          { kind: 'sys', text: HINTS[Math.floor(Math.random() * HINTS.length)] },
          { kind: 'sys', text: "" },
        ]);
      }, 13000);
    };
    arm();
    return () => clearTimeout(idleRef.current);
  }, [hinted, lines]);

  const push = (ls) => setLines((prev) => [...prev, ...ls]);

  const handleLocal = (cmd) => {
    const c = cmd.trim().toLowerCase();
    if (c === 'clear' || c === 'cls') {
      setLines([]);
      return true;
    }
    if (c === 'help' || c === '?') {
      push([
        { kind: 'sys', text: "commands:" },
        { kind: 'assistant', text: "  help         ,this message" },
        { kind: 'assistant', text: "  about        ,who is sanjana" },
        { kind: 'assistant', text: "  projects     ,list data science / ML projects" },
        { kind: 'assistant', text: "  work         ,current role at CIBC" },
        { kind: 'assistant', text: "  competitions ,case comp placements" },
        { kind: 'assistant', text: "  learning     ,the commit log of how i got here" },
        { kind: 'assistant', text: "  skills       ,tools, methods, tech" },
        { kind: 'assistant', text: "  contact      ,email & links" },
        { kind: 'assistant', text: "  neofetch     ,system info" },
        { kind: 'assistant', text: "  note <text>  ,sign the guestbook" },
        { kind: 'assistant', text: "  dance        ,off the clock" },
        { kind: 'assistant', text: "  music        ,what's on loop" },
        { kind: 'assistant', text: "  coffee       ,fuel status" },
        { kind: 'assistant', text: "  clear        ,clear the screen" },
        { kind: 'sys', text: "also: whoami · ls · pwd · date · echo · cat about.md · hire sanjana" },
        { kind: 'sys', text: "or just ask a question in english." },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'about') {
      push([
        { kind: 'assistant', text: "i'm sanjana,a data scientist starting in finance. i train models, but i care more about what happens when a rejected borrower reads the result. i came from mechanical engineering, pivoted through product design, and landed at rotman for analytics. sequence is deliberate: earn the technical depth first." },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'projects') {
      const list = DATA().projects.map((p) => `  - ${p.name.padEnd(22)}  ${p.kicker}`);
      push([
        { kind: 'assistant', text: "projects in /Projects:" },
        ...list.map((t) => ({ kind: 'assistant', text: t })),
        { kind: 'sys', text: "(double-click a file in finder to read the full dossier)" },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'work') {
      push([
        { kind: 'assistant', text: "CIBC · Global Methodology Programs & Strategy · Jan 2026,present" },
        { kind: 'assistant', text: "building an AI-driven exam-scoping assistant for AML examiners." },
        { kind: 'assistant', text: "RAG over historical reports + inline chatbot + roadmap for databricks ingestion and a news-trained insight layer. deployed in streamlit." },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'competitions' || c === 'comp') {
      push([
        { kind: 'assistant', text: "1st · Koru Problem Hunt 2025 (ThirdPlace marketplace)" },
        { kind: 'assistant', text: "1st · Rotman MMA Datathon 2026 (causal inference, paid search)" },
        { kind: 'assistant', text: "finals · Rotman Design Challenge 2026 (Compass for Manulife)" },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'learning') {
      push([
        { kind: 'assistant', text: "see /Learning,it's rendered as a git commit log." },
        { kind: 'sys', text: "" },
      ]);
      if (onCommand) onCommand('open-learning');
      return true;
    }
    if (c === 'skills') {
      push([
        { kind: 'assistant', text: "languages:   python, sql, javascript" },
        { kind: 'assistant', text: "ml/dl:       pytorch, keras, scikit-learn, xgboost, dice" },
        { kind: 'assistant', text: "data:        pandas, numpy, databricks, streamlit" },
        { kind: 'assistant', text: "llm:         gemini, claude, prompt eng., rag" },
        { kind: 'assistant', text: "cv:          yolov8, opencv, roboflow" },
        { kind: 'assistant', text: "research:    mixed-methods, causal inference, fairness audits" },
        { kind: 'assistant', text: "product:     user interviews, hypothesis registers, journey maps" },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'contact') {
      push([
        { kind: 'assistant', text: "email:    sanjanakanchibotla@gmail.com" },
        { kind: 'assistant', text: "github:   github.com/sanjxksl" },
        { kind: 'assistant', text: "linkedin: linkedin.com/in/sanjanaksl" },
        { kind: 'assistant', text: "based in toronto, on" },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'sudo hire sanjana' || c === 'hire sanjana') {
      push([
        { kind: 'sys', text: "[sudo] authenticating..." },
        { kind: 'sys', text: "[sudo] credentials: exceptional" },
        { kind: 'assistant', text: "" },
        { kind: 'assistant', text: "  ┌─────────────────────────────────────────┐" },
        { kind: 'assistant', text: "  │  offer drafted. awaiting sign-off.       │" },
        { kind: 'assistant', text: "  │  next step: sanjanakanchibotla@gmail.com │" },
        { kind: 'assistant', text: "  └─────────────────────────────────────────┘" },
        { kind: 'assistant', text: "" },
        { kind: 'sys', text: "process exited with code 0." },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'sudo feelings' || c === 'feelings') {
      push([
        { kind: 'sys', text: "[sudo] accessing /var/log/feelings ..." },
        { kind: 'assistant', text: "honestly? equal parts terrified and thrilled, most days." },
        { kind: 'assistant', text: "i like problems i don't yet know how to solve. that's the whole job." },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'sudo rm -rf /' || c.startsWith('sudo')) {
      push([{ kind: 'err', text: "nice try." }, { kind: 'sys', text: "" }]);
      return true;
    }
    if (c === 'whoami') {
      push([
        { kind: 'assistant', text: "   .--.       sanjana kanchibotla" },
        { kind: 'assistant', text: "  |o_o |      data scientist · product thinker" },
        { kind: 'assistant', text: "  |:_/ |      toronto, on" },
        { kind: 'assistant', text: " //   \\ \\     ----------------------------" },
        { kind: 'assistant', text: "(|     | )    starts with the question," },
        { kind: 'assistant', text: "/'\\_   _/`\\   not the method." },
        { kind: 'assistant', text: "\\___)=(___/   earns the depth before the authority." },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'konami' || c === 'up up down down') {
      push([
        { kind: 'sys', text: "↑ ↑ ↓ ↓ ← → ← → b a" },
        { kind: 'assistant', text: "cheat unlocked: infinite curiosity. (it was always on.)" },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'shutdown' || c === 'exit' || c === 'logout') {
      push([
        { kind: 'assistant', text: "thanks for stopping by. let's build something." },
        { kind: 'sys', text: "sanjanakanchibotla@gmail.com" },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'ls' || c === 'ls ~') {
      push([
        { kind: 'assistant', text: "Work/  Projects/  Competitions/  Learning/  About_Me/  resume.pdf" },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'pwd') {
      push([{ kind: 'assistant', text: "/Users/guest" }, { kind: 'sys', text: "" }]);
      return true;
    }
    if (c === 'date' || c === 'time') {
      push([
        { kind: 'assistant', text: new Date().toString() },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c.startsWith('echo ')) {
      push([{ kind: 'assistant', text: cmd.trim().slice(5) }, { kind: 'sys', text: "" }]);
      return true;
    }
    if (c === 'cat about.md' || c === 'cat about' || c === 'cat ~/about.md') {
      push([
        { kind: 'assistant', text: "# Sanjana Kanchibotla" },
        { kind: 'assistant', text: "data scientist, trained as a designer, shaped by engineering." },
        { kind: 'assistant', text: "" },
        { kind: 'assistant', text: "i find the problems worth solving, then use whatever it takes to solve them. i need to understand the whole thing before i trust myself on any part of it." },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'neofetch' || c === 'fetch') {
      push([
        { kind: 'assistant', text: "       .--.        guest@sanjana.os" },
        { kind: 'assistant', text: "      |o_o |       ----------------" },
        { kind: 'assistant', text: "      |:_/ |       os       sanjana.os 6.0 (cream)" },
        { kind: 'assistant', text: "     //   \\ \\      host     Toronto, ON" },
        { kind: 'assistant', text: "    (|     | )     role     Data Scientist · Product Thinker" },
        { kind: 'assistant', text: "   /'\\_   _/`\\     edu      MMA @ Rotman · B.Tech Mech + Design" },
        { kind: 'assistant', text: "   \\___)=(___/     stack    python · pytorch · sql · rag · streamlit" },
        { kind: 'assistant', text: "                   now      open to full-time · finance + fintech" },
        { kind: 'assistant', text: "                   uptime   curious since boot" },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'dance') {
      push([
        { kind: 'assistant', text: "off the clock: trained in hip hop, contemporary, and two forms of indian classical dance." },
        { kind: 'assistant', text: "movement is how i think when the screen is off." },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'music' || c === 'now playing') {
      push([
        { kind: 'assistant', text: "♪ on loop: Linkin Park · Alec Benjamin · niche indian hip hop & R&B" },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'coffee' || c === 'make coffee') {
      push([
        { kind: 'sys', text: "brewing..." },
        { kind: 'assistant', text: "  ( (" },
        { kind: 'assistant', text: "   ) )" },
        { kind: 'assistant', text: "  [____]___" },
        { kind: 'assistant', text: "  |    |  |}" },
        { kind: 'assistant', text: "  \\____/__/" },
        { kind: 'assistant', text: "fuel: sufficient. proceed." },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'sudo make me a sandwich') {
      push([{ kind: 'assistant', text: "okay. ...but you should've said please. 🥪" }, { kind: 'sys', text: "" }]);
      return true;
    }
    if (c === 'note' || c === 'note ' || c === 'guestbook') {
      push([
        { kind: 'sys', text: "usage: note <your message>" },
        { kind: 'sys', text: "example: note loved the portfolio — let's talk" },
        { kind: 'sys', text: "tip: open Notes → Guestbook to see the wall." },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c.startsWith('note ')) {
      const msg = cmd.trim().slice(5).trim();
      if (!msg) { push([{ kind: 'err', text: "empty note." }, { kind: 'sys', text: "" }]); return true; }
      if (window.Guestbook) window.Guestbook.add(msg, 'anonymous (via terminal)');
      push([
        { kind: 'sys', text: "✓ pinned to the wall as anonymous." },
        { kind: 'assistant', text: `"${msg}"` },
        { kind: 'sys', text: "open Notes → Guestbook to sign with your name." },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    return false;
  };

  const askGemini = async (q) => {
    setThinking(true);
    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{ text: `${SYSTEM_PROMPT}\n\nVisitor asks: ${q}` }],
          }],
          generationConfig: { maxOutputTokens: 200, temperature: 0.7 },
        }),
      });
      const data = await res.json().catch(() => ({}));
      setThinking(false);
      if (!res.ok) {
        const reason = data?.error?.message || data?.error || `HTTP ${res.status}`;
        push([
          { kind: 'err', text: `api error: ${reason}` },
          { kind: 'sys', text: "try: help · or email sanjanakanchibotla@gmail.com" },
          { kind: 'sys', text: "" },
        ]);
        return;
      }
      const text = (data?.candidates?.[0]?.content?.parts?.[0]?.text || "").trim();
      if (!text) throw new Error('empty response');
      const chunks = text.split(/\n+/).filter(Boolean);
      push([
        ...chunks.map((t) => ({ kind: 'assistant', text: t })),
        { kind: 'sys', text: "" },
      ]);
    } catch (e) {
      setThinking(false);
      push([
        { kind: 'err', text: `error: ${e.message}` },
        { kind: 'sys', text: "try: help · or email sanjanakanchibotla@gmail.com" },
        { kind: 'sys', text: "" },
      ]);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const v = input.trim();
    if (!v || busy) return;
    actedRef.current = true;
    clearTimeout(idleRef.current);
    setHistory((h) => [...h, v]);
    setHIdx(-1);
    push([{ kind: 'user', text: v, prompt: true }]);
    setInput('');
    if (handleLocal(v)) return;
    setBusy(true);
    await askGemini(v);
    setBusy(false);
  };

  const onKey = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const ni = hIdx < 0 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(ni);
      setInput(history[ni]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hIdx < 0) return;
      const ni = hIdx + 1;
      if (ni >= history.length) { setHIdx(-1); setInput(''); }
      else { setHIdx(ni); setInput(history[ni]); }
    }
  };

  return (
    <div className="terminal" ref={bodyRef} onClick={() => inputRef.current && inputRef.current.focus()}>
      {lines.map((l, i) => {
        if (l.kind === 'user') {
          return (
            <div key={i} className="t-line t-fade">
              <span className="t-prompt">guest@sanjana.os:~$ </span>
              <span className="t-user">{l.text}</span>
            </div>
          );
        }
        const cls = l.kind === 'err' ? 't-err' : l.kind === 'sys' ? 't-sys' : 't-assistant';
        // Stream-in: split text into words with staggered fade so it feels like it's being typed
        const text = l.text || '';
        const parts = text.split(/(\s+)/);
        return (
          <div key={i} className={`t-line ${cls}`}>
            {parts.map((p, j) => {
              if (!p) return null;
              const delay = Math.min(j * 22, 1500); // cap so long lines don't crawl
              return (
                <span key={j} className="t-stream-word" style={{ animationDelay: `${delay}ms` }}>{p}</span>
              );
            })}
          </div>
        );
      })}
      {thinking && (
        <div className="t-line t-sys t-fade"><span className="t-thinking">· · ·</span> thinking</div>
      )}
      <form onSubmit={submit} className="t-input-row" style={{ marginTop: 4 }}>
        <span className="t-prompt">guest@sanjana.os:~$</span>
        <input
          ref={inputRef}
          className="t-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          disabled={busy}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}

Object.assign(window, { Terminal });
