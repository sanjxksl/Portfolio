/* global React, ReactDOM */
// Main app shell — desktop with scattered icons, big display title, native cursor.
const { useState, useEffect, useRef, useCallback } = React;

// ============================================================
// Boot sequence
// ============================================================
function Boot({ onDone }) {
  const [lines, setLines] = useState([]);
  const [greet, setGreet] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const script = [
      { t: '> booting sanjana.os v6.0', d: 150 },
      { t: '> mounting /work /projects /competitions /learning', d: 150, ok: true },
      { t: '> loading 24 years of context', d: 190, ok: true },
      { t: '> calibrating curiosity', d: 170, ok: true },
      { t: '> reading personality.docx', d: 180, ok: true },
      { t: '> palette · cream · brown · peony', d: 150, ok: true },
    ];
    let acc = 0;
    script.forEach((s) => {
      acc += s.d;
      setTimeout(() => setLines((ls) => [...ls, s]), acc);
    });
    // personal greeting beat
    setTimeout(() => setGreet(true), acc + 320);
    setTimeout(() => {
      setDone(true);
      setTimeout(onDone, 600);
    }, acc + 1500);
  }, [onDone]);

  const skip = () => { setDone(true); setTimeout(onDone, 200); };

  return (
    <div className={`boot ${done ? 'done' : ''}`} onClick={skip}>
      <div className="boot-inner">
        <div className="boot-lines">
          {lines.map((l, i) => (
            <div key={i} className="line">
              <span className="prompt">$</span>
              <span className="body">{l.t.replace(/^>\s*/, '')}</span>
              {l.ok && <span className="ok">ok</span>}
            </div>
          ))}
        </div>
        <div className={`boot-greet ${greet ? 'show' : ''}`}>
          good — you’re here.<span className="boot-cursor" />
        </div>
      </div>
      <button className="skip" onClick={(e) => { e.stopPropagation(); skip(); }}>
        skip ⎋
      </button>
    </div>
  );
}

// ============================================================
// Display title (centered behind icons) + peony folder anchor
// ============================================================
function DisplayTitle() {
  // Cursor-reactive subtle parallax
  const ref = useRef(null);
  useEffect(() => {
    const onMove = (e) => {
      const cx = (e.clientX / window.innerWidth - 0.5);
      const cy = (e.clientY / window.innerHeight - 0.5);
      if (ref.current) {
        ref.current.style.transform = `translate(calc(-50% + ${cx * -8}px), calc(-50% + ${cy * -6}px))`;
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return (
    <div className="display-title" ref={ref} aria-hidden="true">
      <span className="designer">sanjana's</span>
      <span className="portfolio">portfolio</span>
      <span className="year">(2026)</span>
      <span className="dt-subtitle">user-centered data scientist</span>
    </div>
  );
}

// ============================================================
// Living wallpaper — minimal drifting constellation (ink on cream)
// ============================================================
function LivingWallpaper() {
  const ref = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf, w, h, dpr;
    let nodes = [];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(46, Math.max(22, (w * h) / 42000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.4 + 0.8,
      }));
    };
    resize();
    window.addEventListener('resize', resize);

    const LINK = 132;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x, my = mouse.current.y;
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20;
      }
      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            const o = (1 - d / LINK) * 0.12;
            ctx.strokeStyle = `rgba(106, 61, 32, ${o})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      // nodes + cursor links
      for (const n of nodes) {
        const dm = Math.hypot(n.x - mx, n.y - my);
        const near = dm < 150;
        ctx.fillStyle = near ? 'rgba(176, 96, 122, 0.55)' : 'rgba(106, 61, 32, 0.28)';
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
        if (near) {
          const o = (1 - dm / 150) * 0.4;
          ctx.strokeStyle = `rgba(176, 96, 122, ${o})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mx, my); ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    if (reduce) { draw(); cancelAnimationFrame(raf); }
    else raf = requestAnimationFrame(draw);

    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} className="wallpaper-canvas" />;
}

// ============================================================
// Desktop Icons — scattered with default positions, draggable
// ============================================================
// no localStorage — positions always reset to defaults on refresh

// Folder SVG (blue, like macOS)
function FolderIcon({ color = 'blue' }) {
  const fills = color === 'peony'
    ? { back: '#c46a85', front: '#d68aa3' }
    : { back: '#4f86b8', front: '#6a9cc8' };
  return (
    <svg viewBox="0 0 64 56" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12 Q4 8 8 8 L24 8 L30 14 L56 14 Q60 14 60 18 L60 48 Q60 52 56 52 L8 52 Q4 52 4 48 Z" fill={fills.back} />
      <path d="M2 18 Q2 14 6 14 L58 14 Q62 14 62 18 L60 50 Q60 54 56 54 L6 54 Q2 54 2 50 Z" fill={fills.front} />
      <path d="M4 18 L60 18 L60 22 Q32 24 4 22 Z" fill="rgba(255,255,255,0.18)" />
    </svg>
  );
}

// Doc/PDF icon
function DocIcon() {
  return (
    <svg viewBox="0 0 64 56" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 6 L40 6 L52 18 L52 50 Q52 52 50 52 L14 52 Q12 52 12 50 L12 8 Q12 6 14 6 Z" fill="#f5efe1" stroke="#c9bda7" strokeWidth="1" />
      <path d="M40 6 L40 18 L52 18 Z" fill="#ddd1bb" />
      <line x1="20" y1="28" x2="44" y2="28" stroke="#c9bda7" strokeWidth="1.2" />
      <line x1="20" y1="33" x2="44" y2="33" stroke="#c9bda7" strokeWidth="1.2" />
      <line x1="20" y1="38" x2="38" y2="38" stroke="#c9bda7" strokeWidth="1.2" />
      <line x1="20" y1="43" x2="44" y2="43" stroke="#c9bda7" strokeWidth="1.2" />
    </svg>
  );
}

// App icons (terminal, mail, github)
function TerminalAppIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="56" height="52" rx="9" fill="#1a1410" />
      <rect x="4" y="6" width="56" height="14" rx="9" fill="#3d2c20" />
      <rect x="4" y="14" width="56" height="6" fill="#3d2c20" />
      <circle cx="11" cy="13" r="2" fill="#ec6a5e" />
      <circle cx="18" cy="13" r="2" fill="#f4bf4f" />
      <circle cx="25" cy="13" r="2" fill="#62c454" />
      <text x="14" y="38" fill="#d68aa3" fontFamily="monospace" fontSize="10" fontWeight="600">$ _</text>
    </svg>
  );
}

function MailAppIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="14" width="56" height="40" rx="6" fill="#f5efe1" stroke="#c9bda7" strokeWidth="1" />
      <path d="M4 18 L32 38 L60 18" fill="none" stroke="#9c4a64" strokeWidth="2" />
      <path d="M4 50 L24 32 M60 50 L40 32" fill="none" stroke="#c9bda7" strokeWidth="1" />
    </svg>
  );
}

// macOS Photos app — 7-petal pinwheel rosette around a white core
function GalleryAppIcon() {
  // colours match real macOS Photos icon, going clockwise from top
  const petals = [
    { a: 0,   f1: '#fde047', f2: '#facc15' }, // yellow
    { a: 51,  f1: '#fb923c', f2: '#f97316' }, // orange
    { a: 102, f1: '#f87171', f2: '#ef4444' }, // red
    { a: 154, f1: '#f472b6', f2: '#db2777' }, // magenta
    { a: 206, f1: '#a78bfa', f2: '#7c3aed' }, // purple
    { a: 257, f1: '#60a5fa', f2: '#2563eb' }, // blue
    { a: 308, f1: '#4ade80', f2: '#16a34a' }, // green
  ];
  const cx = 32, cy = 32;
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="photosBg" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0%" stopColor="#fafafa" />
          <stop offset="100%" stopColor="#e6e6e6" />
        </radialGradient>
        {petals.map((p, i) => (
          <linearGradient key={i} id={`photoPet${i}`} x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor={p.f1} />
            <stop offset="100%" stopColor={p.f2} />
          </linearGradient>
        ))}
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="12" fill="url(#photosBg)" />
      <g transform={`translate(${cx} ${cy})`}>
        {petals.map((p, i) => (
          <g key={i} transform={`rotate(${p.a})`}>
            {/* tear-drop petal pointing up, rounded outer edge */}
            <path
              d="M 0 -22 C 6 -22 9 -16 9 -10 C 9 -5 5 -2 0 -2 C -5 -2 -9 -5 -9 -10 C -9 -16 -6 -22 0 -22 Z"
              fill={`url(#photoPet${i})`}
            />
          </g>
        ))}
        <circle r="9" fill="#ffffff" />
      </g>
    </svg>
  );
}

// macOS Finder — the classic two-tone happy-face mark
function FinderAppIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="finderLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5f5f7" />
          <stop offset="100%" stopColor="#cfd2d6" />
        </linearGradient>
        <linearGradient id="finderDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fb3e8" />
          <stop offset="100%" stopColor="#3d72b3" />
        </linearGradient>
        <clipPath id="finderClip">
          <rect x="4" y="4" width="56" height="56" rx="13" />
        </clipPath>
      </defs>
      <g clipPath="url(#finderClip)">
        {/* Light half (left) */}
        <rect x="4" y="4" width="28" height="56" fill="url(#finderLight)" />
        {/* Dark half (right) */}
        <rect x="32" y="4" width="28" height="56" fill="url(#finderDark)" />
        {/* Subtle seam shadow */}
        <rect x="31.6" y="4" width="0.8" height="56" fill="rgba(0,0,0,0.08)" />
        {/* Eyes — tall ovals */}
        <ellipse cx="22" cy="26" rx="2.4" ry="5.4" fill="#1d1d1f" />
        <ellipse cx="42" cy="26" rx="2.4" ry="5.4" fill="#1d1d1f" />
        {/* Smile — curve across the seam */}
        <path d="M 18 40 Q 32 51 46 40" stroke="#1d1d1f" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      </g>
      {/* Outer stroke for crispness on dark backgrounds */}
      <rect x="4.25" y="4.25" width="55.5" height="55.5" rx="12.75" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="0.5" />
    </svg>
  );
}

function GithubAppIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="56" height="56" rx="11" fill="#2b1e16" />
      <path d="M32 16 C22 16 14 24 14 34 C14 42 19 48 26 50 C27 50 27 50 27 49 C27 49 27 47 27 45 C22 46 21 43 21 43 C20 41 19 41 19 41 C18 40 19 40 19 40 C20 40 21 41 21 41 C22 43 25 43 26 42 C26 41 26 40 27 40 C23 39 19 38 19 32 C19 30 20 29 21 28 C21 28 20 26 21 23 C21 23 23 23 26 25 C28 24 30 24 32 24 C34 24 36 24 38 25 C41 23 43 23 43 23 C44 26 43 28 43 28 C44 29 45 30 45 32 C45 38 41 39 37 40 C38 40 38 41 38 43 C38 46 38 49 38 49 C38 50 38 50 39 50 C46 48 51 42 51 34 C51 24 43 16 32 16 Z"
            fill="#f5efe1" />
    </svg>
  );
}

function LinkedInAppIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="56" height="56" rx="10" fill="#0a66c2" />
      <rect x="13" y="19" width="9" height="9" rx="2" fill="white" />
      <rect x="13" y="31" width="9" height="16" fill="white" />
      <path d="M26 31h8v3.5c1.5-2.8 4.5-4.5 8-4.5 5.5 0 8 3.5 8 9.5V47h-8v-6.5c0-2.5-1-4-3.5-4s-4.5 1.5-4.5 4.5V47h-8V31z" fill="white" />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg viewBox="0 0 64 56" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 4 L40 4 L52 16 L52 52 Q52 54 50 54 L14 54 Q12 54 12 52 L12 6 Q12 4 14 4 Z" fill="#f5efe1" stroke="#c9bda7" strokeWidth="1" />
      <path d="M40 4 L40 16 L52 16 Z" fill="#ddd1bb" />
      <text x="22" y="34" fill="#9c4a64" fontFamily="serif" fontWeight="700" fontSize="11" fontStyle="italic">CV</text>
      <line x1="18" y1="40" x2="46" y2="40" stroke="#c9bda7" strokeWidth="1" />
      <line x1="18" y1="44" x2="42" y2="44" stroke="#c9bda7" strokeWidth="1" />
      <line x1="18" y1="48" x2="38" y2="48" stroke="#c9bda7" strokeWidth="1" />
    </svg>
  );
}

function NotesAppIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="56" height="56" rx="10" fill="#ffd426" />
      <line x1="14" y1="21" x2="50" y2="21" stroke="#8a6300" strokeWidth="1.8" />
      <line x1="14" y1="30" x2="50" y2="30" stroke="#8a6300" strokeWidth="1.8" />
      <line x1="14" y1="39" x2="42" y2="39" stroke="#8a6300" strokeWidth="1.8" />
      <line x1="14" y1="48" x2="34" y2="48" stroke="#8a6300" strokeWidth="1.8" />
    </svg>
  );
}

function LearningLogIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" overflow="hidden">
      <rect x="0" y="0" width="64" height="64" rx="8" fill="#1a1410" />
      <rect x="0" y="0" width="64" height="16" rx="8" fill="#3d2c20" />
      <rect x="0" y="10" width="64" height="6" fill="#3d2c20" />
      <circle cx="11" cy="9" r="2" fill="#ec6a5e" />
      <circle cx="18" cy="9" r="2" fill="#f4bf4f" />
      <circle cx="25" cy="9" r="2" fill="#62c454" />
      <text x="7" y="29" fill="#d68aa3" fontFamily="monospace" fontSize="6" fontWeight="600">* a1f9d  QUANT</text>
      <text x="7" y="39" fill="#7a6552" fontFamily="monospace" fontSize="6">* b3c1e  MLOPS</text>
      <text x="7" y="49" fill="#7a6552" fontFamily="monospace" fontSize="6">* 7a2c1  PROD</text>
    </svg>
  );
}

// Default desktop icons & positions (percent-based for responsiveness)
// anchor_h: 'left'|'right'  anchor_v: 'top'|'bottom'
// dx/dy: px from that edge of the .desktop-icons container
function DiaryIcon() {
  // Substack logomark — orange tile, white "stack" symbol
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="56" height="56" rx="11" fill="#FF6719" />
      <rect x="18" y="20" width="28" height="4.6" fill="#fff" />
      <rect x="18" y="28.7" width="28" height="4.6" fill="#fff" />
      <path d="M18 37.4 h28 v12.2 l-14 -6.6 -14 6.6 z" fill="#fff" />
    </svg>
  );
}

function getDefaultIcons() {
  return [
    { id: 'work',         label: 'work',         kind: 'folder', color: 'blue',  anchor_h:'left', dx:32,   anchor_v:'top', dy:77,  action: { type: 'finder', folder: 'work' } },
    { id: 'notion',       label: 'Notes',        kind: 'notion',                 anchor_h:'right', dx:35,  anchor_v:'top', dy:113, action: { type: 'reading' } },
    { id: 'projects',     label: 'projects',     kind: 'folder', color: 'blue',  anchor_h:'left', dx:149,  anchor_v:'top', dy:80,  action: { type: 'finder', folder: 'projects' } },
    { id: 'headshot',     label: 'about.png',    kind: 'image', src: 'images/headshot.png', anchor_h:'left', dx:35, anchor_v:'top', dy:186, action: { type: 'about' } },
    { id: 'learning',     label: 'log',           kind: 'learning',               anchor_h:'right', dx:125, anchor_v:'top', dy:114, action: { type: 'launch', id: 'learning' } },
    { id: 'competitions', label: 'competitions', kind: 'folder', color: 'peony', anchor_h:'left', dx:34,   anchor_v:'top', dy:319, action: { type: 'finder', folder: 'competitions' } },
    { id: 'resume',       label: 'resume.pdf',   kind: 'resume',                 anchor_h:'left', dx:148,  anchor_v:'top', dy:191, action: { type: 'launch', id: 'resume' } },
  ];
}

function DesktopIcons({ onAction }) {
  const [icons] = useState(getDefaultIcons);
  const [selected, setSelected] = useState(null);
  const [pos, setPos] = useState({});  // drag overrides only; resets on refresh
  const dragRef = useRef(null);

  // Returns CSS style using anchor edges, falling back to drag position if set
  const getIconStyle = (icon) => {
    const p = pos[icon.id];
    if (p) return { left: p.x, top: p.y };
    return {
      [icon.anchor_h]: icon.dx,
      [icon.anchor_v]: icon.dy,
    };
  };

  const handleDragStart = (e, icon) => {
    e.preventDefault();
    setSelected(icon.id);
    const startX = e.clientX, startY = e.clientY;
    // Resolve current pixel top-left so dragging starts from the right spot
    let ox, oy;
    const saved = pos[icon.id];
    if (saved) {
      ox = saved.x; oy = saved.y;
    } else {
      const cw = window.innerWidth - 60;
      const ch = window.innerHeight - 130;
      ox = icon.anchor_h === 'right' ? cw - icon.dx - 86 : icon.dx;
      oy = icon.anchor_v === 'bottom' ? ch - icon.dy - 86 : icon.dy;
    }
    dragRef.current = { id: icon.id, sx: startX, sy: startY, ox, oy, moved: false };

    const onMove = (ev) => {
      const d = dragRef.current;
      if (!d) return;
      const dx = ev.clientX - d.sx, dy = ev.clientY - d.sy;
      if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
      setPos((p) => ({ ...p, [d.id]: { x: d.ox + dx, y: d.oy + dy } }));
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      dragRef.current = null;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const handleDoubleClick = (icon) => onAction(icon.action);

  useEffect(() => {
    const onClick = (e) => { if (!e.target.closest('.di')) setSelected(null); };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, []);



  return (
    <div className="desktop-icons">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className={`di ${selected === icon.id ? 'selected' : ''}`}
          style={getIconStyle(icon)}
          onMouseDown={(e) => handleDragStart(e, icon)}
          onDoubleClick={() => handleDoubleClick(icon)}
        >
          <div className={`icon-art ${icon.kind === 'image' ? 'image-thumb' : ''}`}>
            {icon.kind === 'folder' && <FolderIcon color={icon.color} />}
            {icon.kind === 'doc' && <DocIcon />}
            {icon.kind === 'resume' && <ResumeIcon />}
            {icon.kind === 'image' && <img src={icon.src} alt={icon.label} draggable="false" />}
            {icon.kind === 'app-terminal' && <TerminalAppIcon />}
            {icon.kind === 'app-mail' && <MailAppIcon />}
            {icon.kind === 'app-github' && <GithubAppIcon />}
            {icon.kind === 'notion' && <NotesAppIcon />}
            {icon.kind === 'learning' && <LearningLogIcon />}
            {icon.kind === 'diary' && <DiaryIcon />}
          </div>
          <span className="label">{icon.label}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Menubar
// ============================================================
function Menubar({ activeApp }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);
  const day = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  return (
    <div className="menubar">
      <span className="apple"></span>
      <span className="app-name">{activeApp}</span>
      <span className="menu-item">File</span>
      <span className="menu-item">Edit</span>
      <span className="menu-item">View</span>
      <span className="menu-item">Window</span>
      <span className="right">
        <span className="mb-status" title="online">
          <span className="mb-dot" />
          guest
        </span>
        {/* wifi */}
        <svg className="mb-ico" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M2 5.5a12 12 0 0 1 16 0" /><path d="M5 8.5a8 8 0 0 1 10 0" /><path d="M7.5 11.5a4 4 0 0 1 5 0" />
          <circle cx="10" cy="14" r="0.6" fill="currentColor" stroke="none" />
        </svg>
        {/* battery */}
        <svg className="mb-ico mb-batt" viewBox="0 0 28 14" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="1" y="2.5" width="22" height="9" rx="2.5" />
          <rect x="3" y="4.5" width="15" height="5" rx="1" fill="currentColor" stroke="none" />
          <rect x="24.5" y="5" width="2" height="4" rx="1" fill="currentColor" stroke="none" />
        </svg>
        <span className="mb-key" title="Spotlight">⌘K</span>
        <span className="mb-clock"><span className="mb-day">{day}</span><span className="mb-time">{time}</span></span>
      </span>
    </div>
  );
}

// ============================================================
// Dock
// ============================================================
// Apps that appear in the dock only while their window is open
const DYNAMIC_DOCK = {
  reading: { label: 'Notes',  render: () => <NotesAppIcon /> },
  learning: { label: 'Logs',  render: () => <LearningLogIcon /> },
};

function Dock({ openApps, windows, onLaunch }) {
  const [bouncing, setBouncing] = useState(null);
  const bounce = (id) => {
    setBouncing(id);
    setTimeout(() => setBouncing((cur) => (cur === id ? null : cur)), 650);
  };
  const launch = (id, arg) => {
    bounce(id);
    if (arg) onLaunch(id, arg); else onLaunch(id);
  };
  const items = [
    { id: 'finder',   label: 'Finder',        render: () => <FinderAppIcon /> },
    { id: 'gallery',  label: 'Gallery',       render: () => <GalleryAppIcon />, galleryAction: true },
    { sep: true },
    { id: 'terminal', label: 'Terminal', render: () => <TerminalAppIcon /> },
    { id: 'resume',   label: 'Resume',          render: () => <ResumeIcon /> },
    { sep: true },
    { id: 'mail',     label: 'Contact',    render: () => <MailAppIcon />,     href: 'mailto:sanjanakanchibotla@gmail.com' },
    { id: 'linkedin', label: 'LinkedIn',   render: () => <img src="assets/linkedin.png" alt="LinkedIn" />, href: 'https://linkedin.com/in/sanjanaksl' },
    { id: 'github',   label: 'GitHub',     render: () => <img src="assets/github.png" alt="GitHub" />,     href: 'https://github.com/sanjxksl' },
    { id: 'substack', label: 'Substack',   render: () => <DiaryIcon />,        href: 'https://sansdiary.substack.com' },
  ];

  // Dynamic items: only visible while their window is open
  const dynamicItems = Object.entries(DYNAMIC_DOCK)
    .filter(([id]) => windows.some((w) => w.id === id))
    .map(([id, cfg]) => ({ id, ...cfg }));

  return (
    <div className="dock">
      {items.map((it, i) => {
        if (it.sep) return <div key={`sep-${i}`} className="dock-sep" />;
        const isOpen = it.id === 'finder'
          ? openApps.some(id => id === 'finder' || id === 'about' || id.startsWith('doc-'))
          : openApps.includes(it.id);
        const bouncyId = it.galleryAction ? 'gallery' : it.id;
        const isBouncing = bouncing === bouncyId;
        const cls = `dock-item ${isOpen ? 'open' : ''} ${isBouncing ? 'bouncing' : ''}`;
        const inner = (<>{it.render()}<span className="tip">{it.label}</span></>);
        if (it.href) return (
          <a key={it.id} href={it.href} target={it.href.startsWith('http') ? '_blank' : undefined} rel="noopener" className={cls} onClick={() => bounce(it.id)}>{inner}</a>
        );
        if (it.galleryAction) return (
          <div key={it.id} className={cls} onClick={() => launch('finder', 'gallery')}>{inner}</div>
        );
        return (
          <div key={it.id} className={cls} onClick={() => launch(it.id)}>{inner}</div>
        );
      })}
      {dynamicItems.length > 0 && <div className="dock-sep" />}
      {dynamicItems.map((it) => (
        <div key={it.id} className={`dock-item open ${bouncing === it.id ? 'bouncing' : ''}`} onClick={() => launch(it.id)}>
          {it.render()}
          <span className="tip">{it.label}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Spotlight (⌘K)
// ============================================================
function Spotlight({ open, onClose, onLaunch, onOpenFile }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);
  useEffect(() => { setQ(''); setSel(0); }, [open]);

  if (!open) return null;
  const d = window.PORTFOLIO;
  const all = [
    { kind: 'app', name: 'Finder', k: 'App', go: () => onLaunch('finder') },
    { kind: 'app', name: 'Terminal', k: 'App', go: () => onLaunch('terminal') },
    { kind: 'app', name: 'About', k: 'App', go: () => onLaunch('about') },
    { kind: 'app', name: 'Learning Log', k: 'App', go: () => onLaunch('learning') },
    { kind: 'app', name: 'Substack', k: 'Link', go: () => window.open('https://sansdiary.substack.com', '_blank') },
    { kind: 'app', name: 'Resume.pdf', k: 'File', go: () => onLaunch('resume') },
    { kind: 'app', name: 'Gallery', k: 'App', go: () => { onLaunch('finder'); } },
    ...[...d.work, ...d.projects, ...d.competitions].map((p) => ({
      kind: 'doc', name: p.name, k: p.type, item: p, go: () => onOpenFile(p),
    })),
  ];
  const results = q
    ? all.filter((r) => (r.name + ' ' + r.k).toLowerCase().includes(q.toLowerCase())).slice(0, 9)
    : all.slice(0, 9);

  const onKey = (e) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') { setSel((s) => Math.min(s + 1, results.length - 1)); e.preventDefault(); }
    if (e.key === 'ArrowUp') { setSel((s) => Math.max(s - 1, 0)); e.preventDefault(); }
    if (e.key === 'Enter' && results[sel]) { results[sel].go(); onClose(); }
  };

  return (
    <div className="spotlight-bg" onClick={onClose}>
      <div className="spotlight" onClick={(e) => e.stopPropagation()}>
        <div className="sp-input-row">
          <span className="sigil">§</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); setSel(0); }}
            onKeyDown={onKey}
            placeholder="search the archive…"
          />
        </div>
        <div className="sp-results">
          {results.length === 0 && (
            <div style={{ padding: '18px 18px', color: 'var(--ink-faint)', fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>
              no matches in this edition.
            </div>
          )}
          {results.map((r, i) => (
            <div key={i} className={`sp-item ${i === sel ? 'sel' : ''}`}
                 onMouseEnter={() => setSel(i)}
                 onClick={() => { r.go(); onClose(); }}>
              <span className="name">{r.name}</span>
              <span className="k">{r.k}</span>
            </div>
          ))}
        </div>
        <div className="sp-hint">
          <span>↑↓ navigate · ⏎ open</span>
          <span>⎋ close</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// App
// ============================================================
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "skipBoot": false
}/*EDITMODE-END*/;

function App() {
  const wm = useWindowManager();
  const [booted, setBooted] = useState(TWEAK_DEFAULTS.skipBoot);
  const [folderOpen, setFolderOpen] = useState('about');
  const [activeTag, setActiveTag] = useState(null);
  const [activeFile, setActiveFile] = useState(null);
  const [spotOpen, setSpotOpen] = useState(false);

  // ⌘K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSpotOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Auto-open terminal as a widget after boot
  useEffect(() => {
    if (!booted) return;
    const tvw = window.innerWidth, tvh = window.innerHeight;
    const tw = Math.round(Math.min(520, Math.max(360, tvw * 0.32)));
    const th = Math.round(Math.min(320, Math.max(220, tvh * 0.28)));
    // Clamp so the window can't extend past the viewport edge
    const finalTw = Math.min(tw, tvw - 40);
    const finalTh = Math.min(th, tvh - 140);
    const finalX = Math.max(20, tvw - finalTw - 24);
    const finalY = Math.max(40, tvh - finalTh - 100);
    wm.openWindow({
      id: 'terminal',
      title: 'Terminal — guest@portfolio.os',
      x: finalX,
      y: finalY,
      w: finalTw, h: finalTh,
      kind: 'terminal',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted]);

  // Keep windows inside the viewport when the user resizes the browser
  useEffect(() => {
    const onResize = () => {
      const vw = window.innerWidth, vh = window.innerHeight;
      wm.windows.forEach((w) => {
        const nw = Math.min(w.w, vw - 40);
        const nh = Math.min(w.h, vh - 120);
        // Clamp x/y so the right/bottom edge stays inside the viewport
        const maxX = Math.max(20, vw - nw - 20);
        const maxY = Math.max(32, vh - nh - 80);
        const nx = Math.max(20, Math.min(maxX, w.x));
        const ny = Math.max(32, Math.min(maxY, w.y));
        if (nw !== w.w || nh !== w.h || nx !== w.x || ny !== w.y) {
          wm.updateWindow(w.id, { w: nw, h: nh, x: nx, y: ny });
        }
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [wm]);

  // Tag click events
  useEffect(() => {
    const h = (e) => {
      setActiveTag(e.detail);
      setFolderOpen('work');
      launch('finder');
    };
    window.addEventListener('open-tag', h);
    return () => window.removeEventListener('open-tag', h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const launch = useCallback((id, arg) => {
    const existing = wm.windows.find((w) => w.id === id);
    if (existing) { wm.focusWindow(id); return; }
    const vw = window.innerWidth, vh = window.innerHeight;
    const clamp = (lo, val, hi) => Math.max(lo, Math.min(hi, val));
    // Sizes scale with viewport, clamped to a usable range per app kind
    const specs = {
      finder:   {
        title: 'Finder', kind: 'finder',
        w: clamp(520, Math.round(vw * 0.62), 960),
        h: clamp(400, Math.round(vh * 0.70), 660),
      },
      terminal: {
        title: 'Terminal — guest@portfolio.os', kind: 'terminal',
        w: clamp(420, Math.round(vw * 0.42), 700),
        h: clamp(280, Math.round(vh * 0.50), 460),
      },
      about:    {
        title: 'about.md', kind: 'about',
        w: clamp(520, Math.round(vw * 0.50), 720),
        h: clamp(440, Math.round(vh * 0.78), 720),
      },
      learning: {
        title: 'learning.log', kind: 'learning',
        w: clamp(540, Math.round(vw * 0.55), 800),
        h: clamp(440, Math.round(vh * 0.74), 680),
      },
      resume:   {
        title: 'resume.pdf', kind: 'resume',
        w: clamp(540, Math.round(vw * 0.55), 780),
        h: clamp(440, Math.round(vh * 0.80), 720),
      },
      reading:  {
        title: 'Notes', kind: 'reading',
        w: clamp(560, Math.round(vw * 0.62), 880),
        h: clamp(420, Math.round(vh * 0.68), 620),
      },
      diary:    {
        title: 'Diary — sans diary', kind: 'diary',
        w: clamp(420, Math.round(vw * 0.40), 560),
        h: clamp(440, Math.round(vh * 0.74), 680),
        disabled: true,
      },
    };
    const s = specs[id];
    if (!s) return;
    const offset = wm.windows.length * 22;
    const w = Math.min(s.w, vw - 40);
    const h = Math.min(s.h, vh - 80);
    const x = Math.max(20, Math.round((vw - w) / 2) + offset);
    const y = Math.max(32, Math.round((vh - 116 - h) / 2) + offset);
    wm.openWindow({ id, x, y, w, h, kind: s.kind, title: s.title });
    if (id === 'finder' && arg) { setFolderOpen(arg); setActiveTag(null); }
    else if (id === 'finder' && !arg) { setFolderOpen('about'); setActiveTag(null); }
  }, [wm]);

  const openFile = (item) => {
    if (item._kind === 'about' || item.id === 'about') { launch('about'); return; }
    if (item._kind === 'resume' || item.id === 'resume') { launch('resume'); return; }
    setActiveFile(item.id);
    const id = `doc-${item.id}`;
    const vw = window.innerWidth, vh = window.innerHeight;
    if (wm.windows.find((w) => w.id === id)) { wm.focusWindow(id); return; }
    const offset = wm.windows.length * 18;
    const w = Math.min(720, Math.max(440, Math.round(vw * 0.55)));
    const h = Math.min(700, Math.max(400, Math.round((vh - 116) * 0.85)));
    wm.openWindow({
      id,
      title: item.name,
      x: Math.max(20, Math.round((vw - w) / 2) + offset),
      y: Math.max(40, 80 + offset),
      w, h,
      kind: 'doc',
      item,
    });
  };

  // Action dispatch from desktop icons
  const handleIconAction = useCallback((action) => {
    if (!action) return;
    if (action.type === 'finder') {
      launch('finder', action.folder);
    } else if (action.type === 'gallery') {
      launch('finder', 'gallery');
    } else if (action.type === 'about') {
      launch('about');
    } else if (action.type === 'reading') {
      launch('reading');
    } else if (action.type === 'launch') {
      launch(action.id);
    } else if (action.type === 'href') {
      window.open(action.href, action.href.startsWith('http') ? '_blank' : '_self');
    }
  }, [launch]);

  const openApps = wm.windows.filter((w) => !w.minimized).map((w) => w.id);
  const focused = wm.windows.find((w) => w.id === wm.focusId);
  let activeApp = 'Finder';
  if (focused) {
    activeApp = ({
      finder: 'Finder', terminal: 'Terminal',
      about: 'About', learning: 'Learning', doc: 'Preview', resume: 'Preview', reading: 'Notes',
    })[focused.kind] || 'Finder';
  }

  return (
    <>
      {!booted && <Boot onDone={() => setBooted(true)} />}

      <div className="wallpaper" />
      <DisplayTitle />
      <DesktopIcons onAction={handleIconAction} />

      <Menubar activeApp={activeApp} />

      {wm.windows.map((w) => (
        <Window
          key={w.id}
          win={w}
          focused={wm.focusId === w.id}
          onClose={() => wm.closeWindow(w.id)}
          onMinimize={() => wm.minimizeWindow(w.id)}
          onFocus={() => wm.focusWindow(w.id)}
          onMove={(p) => wm.updateWindow(w.id, p)}
          onResize={(s) => wm.updateWindow(w.id, s)}
        >
          {w.kind === 'finder' && (
            <div className="finder">
              <FinderSidebar
                activeFolder={folderOpen}
                onOpenFolder={(f) => { setFolderOpen(f); setActiveTag(null); }}
                activeTag={activeTag}
                onOpenTag={setActiveTag}
              />
              <FinderContent
                folder={folderOpen}
                tag={activeTag}
                activeFileId={activeFile}
                onOpenFile={openFile}
              />
            </div>
          )}
          {w.kind === 'terminal' && (
            <Terminal onCommand={(c) => {
              if (c === 'open-learning') launch('learning');
              if (c === 'open-about') launch('about');
              if (c === 'open-projects') launch('finder');
              if (c === 'open-resume') launch('resume');
            }} />
          )}
          {w.kind === 'learning' && <LearningArchive />}
          {w.kind === 'about' && <AboutDoc />}
          {w.kind === 'doc' && <DocView item={w.item} />}
          {w.kind === 'resume' && <ResumeView />}
          {w.kind === 'reading' && <NowView />}
          {w.kind === 'diary' && <DiaryView />}
        </Window>
      ))}

      <Dock openApps={openApps} windows={wm.windows} onLaunch={launch} />

      <Spotlight
        open={spotOpen}
        onClose={() => setSpotOpen(false)}
        onLaunch={launch}
        onOpenFile={openFile}
      />

      <div className="mobile-warning">
        <h1>This is a desktop portfolio.</h1>
        <p>It's built as a small operating system. Try it on a laptop.</p>
        <p style={{ fontFamily: 'var(--font-mono)', opacity: 0.6, fontSize: 12, marginTop: 14 }}>sanjanakanchibotla@gmail.com</p>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
