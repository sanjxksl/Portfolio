/* global React */
// Content views — index card, finder, dossier, about, learning graph, gallery

const DATA = () => window.PORTFOLIO;

// ==================== Icons ====================
const Icon = {
  folder: () => (<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M1 4a1 1 0 0 1 1-1h4l1.5 1.5H14a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4z"/></svg>),
  file: () => (<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 2h5l3 3v9H4z"/></svg>),
  hash: () => (<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 2v12M11 2v12M2 6h12M2 11h12"/></svg>),
  tag: () => (<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2h5l7 7-5 5-7-7V2z"/><circle cx="5" cy="5" r="1" fill="currentColor"/></svg>),
  photo: () => (<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="2" y="3" width="12" height="10" rx="1"/><circle cx="6" cy="7" r="1.2"/><path d="M3 11l3-3 2 2 2-3 3 4"/></svg>),
  terminal: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>),
  mail: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>),
  github: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2C5.7 21.5 5 19.3 5 19.3c-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>),
};

// ==================== HERO: Index Card ====================
function IndexCardHero({ onOpen }) {
  const o = DATA().owner;
  return (
    <div className="index-card">
      <div className="left">
        <div className="photo-frame">
          <img src="images/headshot.png" alt="Sanjana Kanchibotla" />
          <div className="caption">PLATE I · TORONTO · 2026</div>
        </div>
        <div className="meta">
          <div><span className="k">Vol.</span> V · Ed. i</div>
          <div><span className="k">Subject</span> Portfolio, 2023 – 26</div>
          <div><span className="k">Archivist</span> self</div>
          <div><span className="k">Location</span> {o.location}</div>
        </div>
      </div>

      <div className="right">
        <div className="stamp">Draft · for review</div>
        <div className="kicker">Index Card · 001</div>
        <h1 className="name">Sanjana <em>Kanchibotla</em></h1>
        <svg className="flourish" viewBox="0 0 220 14" preserveAspectRatio="none">
          <path d="M0,7 C 40,0 80,14 110,7 C 140,0 180,14 220,7" />
        </svg>
        <div className="role">data scientist, trained as a designer,<br/>shaped by engineering</div>
        <div className="sentence">
          I find the problems worth solving, then use <em>whatever it takes</em> to solve them.
        </div>

        <div className="links">
          <div className="link-row" onClick={() => onOpen('finder', 'projects')}>
            <span className="k">Projects</span>
            <span className="v">the files, in order</span>
            <span className="arrow">→</span>
          </div>
          <div className="link-row" onClick={() => onOpen('finder', 'about')}>
            <span className="k">About</span>
            <span className="v">a quieter page</span>
            <span className="arrow">→</span>
          </div>
          <div className="link-row" onClick={() => onOpen('terminal')}>
            <span className="k">Terminal</span>
            <span className="v">ask something direct</span>
            <span className="arrow">→</span>
          </div>
          <div className="link-row" onClick={() => window.open('mailto:' + o.email)}>
            <span className="k">Write</span>
            <span className="v">{o.email}</span>
            <span className="arrow">↗</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== FINDER ====================
function FinderSidebar({ activeFolder, onOpenFolder, activeTag, onOpenTag }) {
  const pinnedTags = ["Python", "FinTech", "WRDS", "Empirical Finance", "Explainable AI", "Product Strategy"];

  return (
    <div className="finder-sidebar">
      <div className="group">
        <div className="group-title">Library</div>
        {DATA().folders.map((f) => (
          <div key={f.id}
               className={`item ${activeFolder === f.id && !activeTag ? 'active' : ''}`}
               onClick={() => { onOpenFolder(f.id); onOpenTag(null); }}>
            <span className="ico"><Icon.folder /></span>
            <span>{f.name}</span>
          </div>
        ))}
        <div className={`item ${activeFolder === 'gallery' && !activeTag ? 'active' : ''}`}
             onClick={() => { onOpenFolder('gallery'); onOpenTag(null); }}>
          <span className="ico"><Icon.photo /></span>
          <span>Gallery</span>
        </div>
      </div>

      <div className="group">
        <div className="group-title">Tags</div>
        {pinnedTags.map((t) => (
          <div key={t}
               className={`item ${activeTag === t ? 'active' : ''}`}
               onClick={() => { onOpenTag(t); }}>
            <span className="ico"><Icon.tag /></span>
            <span style={{ fontSize: 12, letterSpacing: '0.01em' }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== GALLERY GRID + LIGHTBOX ====================
function GalleryView() {
  const { useState: useS, useEffect: useE, useCallback: useC, useMemo: useM } = React;
  const captions = DATA().gallery || [];
  const [images, setImages] = useS([]);
  const [lightbox, setLightbox] = useS(null); // index or null
  const [view, setView] = useS('all');         // years | months | days | all
  const [zoom, setZoom] = useS(2);              // 1 sparse → 4 dense
  const [showInfo, setShowInfo] = useS(false);

  useE(() => {
    const found = [];
    let i = 1;
    const tryNext = () => {
      if (i > 30) { setImages(found.slice()); return; }
      const num = String(i).padStart(2, '0');
      const img = new Image();
      img.onload = () => {
        found.push({
          src: `images/gallery/${num}.jpeg`,
          caption: captions[i - 1] || '',
          w: img.naturalWidth,
          h: img.naturalHeight,
          ratio: img.naturalWidth / img.naturalHeight,
        });
        i++;
        tryNext();
      };
      img.onerror = () => setImages(found.slice());
      img.src = `images/gallery/${num}.jpeg`;
    };
    tryNext();
  }, []);

  const prev = useC(() => setLightbox((n) => (n - 1 + images.length) % images.length), [images.length]);
  const next = useC(() => setLightbox((n) => (n + 1) % images.length), [images.length]);

  useE(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') setLightbox(null);
      else if (e.key.toLowerCase() === 'i') setShowInfo((s) => !s);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, prev, next]);

  // Group photos into "sections" with fake but plausible date headers.
  // We don't have EXIF here so we infer rolling months from index.
  const sections = useM(() => {
    if (!images.length) return [];
    const now = new Date(2026, 4, 1); // May 2026
    const groups = [];
    images.forEach((img, idx) => {
      // every 3 photos shift one month back, so we get ~3-4 sections for ~8 images
      const monthOffset = Math.floor(idx / 3);
      const d = new Date(now.getFullYear(), now.getMonth() - monthOffset, 12 - idx);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const label = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      const day = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      const cur = groups[groups.length - 1];
      if (cur && cur.key === key) cur.items.push({ img, idx, day });
      else groups.push({ key, label, items: [{ img, idx, day }] });
    });
    return groups;
  }, [images]);

  if (!images.length) {
    return (
      <div className="photos-app">
        <div className="photos-toolbar">
          <div className="photos-titlebar">
            <h2 className="photos-title">Library</h2>
          </div>
        </div>
        <div className="photos-empty">Loading photos…</div>
      </div>
    );
  }

  const cur = lightbox !== null ? images[lightbox] : null;

  return (
    <div className="photos-app">
      {/* Top toolbar */}
      <div className="photos-toolbar">
        <div className="photos-titlebar">
          <h2 className="photos-title">
            {view === 'years' && 'Years'}
            {view === 'months' && 'Months'}
            {view === 'days' && 'Days'}
            {view === 'all' && 'All Photos'}
          </h2>
          <span className="photos-count">{images.length} Photos</span>
        </div>
        <div className="photos-seg">
          {[
            { id: 'years', label: 'Years' },
            { id: 'months', label: 'Months' },
            { id: 'days', label: 'Days' },
            { id: 'all', label: 'All Photos' },
          ].map((v) => (
            <button
              key={v.id}
              className={`photos-seg-btn ${view === v.id ? 'on' : ''}`}
              onClick={() => setView(v.id)}
            >{v.label}</button>
          ))}
        </div>
        <div className="photos-zoom">
          <button className="photos-zoom-btn" onClick={() => setZoom((z) => Math.max(1, z - 1))} aria-label="Smaller">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 8h8"/></svg>
          </button>
          <button className="photos-zoom-btn" onClick={() => setZoom((z) => Math.min(4, z + 1))} aria-label="Larger">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 8h8M8 4v8"/></svg>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className={`photos-body zoom-${zoom} view-${view}`}>
        {view === 'all' && (
          <div className="photos-grid-all">
            {images.map((img, i) => (
              <button key={img.src} className="photos-cell" onClick={() => setLightbox(i)} aria-label={img.caption || `Photo ${i + 1}`}>
                <img src={img.src} alt={img.caption} loading="lazy" />
              </button>
            ))}
          </div>
        )}

        {(view === 'days' || view === 'months') && sections.map((sec) => (
          <div key={sec.key} className="photos-section">
            <div className="photos-section-head">
              <span className="photos-section-title">{sec.label}</span>
              <span className="photos-section-sub">{sec.items.length} photos</span>
            </div>
            <div className={`photos-grid-${view === 'days' ? 'days' : 'months'}`}>
              {sec.items.map(({ img, idx }, k) => (
                <button
                  key={img.src}
                  className={`photos-cell ${view === 'months' && k === 0 ? 'hero' : ''}`}
                  onClick={() => setLightbox(idx)}
                >
                  <img src={img.src} alt={img.caption} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {view === 'years' && (
          <div className="photos-years">
            {sections.slice(0, 3).map((sec, i) => {
              const first = sec.items[0];
              return (
                <button
                  key={sec.key}
                  className="photos-year"
                  onClick={() => { setView('months'); }}
                >
                  <div className="photos-year-img">
                    <img src={first.img.src} alt="" loading="lazy" />
                  </div>
                  <div className="photos-year-meta">
                    <span className="photos-year-num">{sec.label.split(' ')[1] || '2026'}</span>
                    <span className="photos-year-month">{sec.label.split(' ')[0]}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox — portal to body so it escapes the window's containing block */}
      {cur && ReactDOM.createPortal(
        <div className="photos-lightbox" onClick={() => setLightbox(null)}>
          <div className="photos-lb-bar" onClick={(e) => e.stopPropagation()}>
            <button className="photos-lb-icon" onClick={() => setLightbox(null)} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M15 6l-9 9M6 6l9 9"/></svg>
            </button>
            <div className="photos-lb-title">
              <div className="photos-lb-title-main">{cur.caption || 'Untitled'}</div>
              <div className="photos-lb-title-sub">{lightbox + 1} of {images.length}</div>
            </div>
            <div className="photos-lb-actions">
              <button className="photos-lb-icon" onClick={() => setShowInfo((s) => !s)} aria-label="Info" title="Info (i)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v0M11 12h1v5h1"/></svg>
              </button>
              <button className="photos-lb-icon" onClick={() => window.open(cur.src, '_blank')} aria-label="Share">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 3l-4 4h3v8h2V7h3l-4-4zM5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>
              </button>
            </div>
          </div>

          <div className="photos-lb-stage" onClick={(e) => e.stopPropagation()}>
            <button className="photos-lb-arrow left" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"/></svg>
            </button>
            <img key={cur.src} src={cur.src} alt={cur.caption} className="photos-lb-img" />
            <button className="photos-lb-arrow right" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
            </button>

            {showInfo && (
              <div className="photos-lb-info" onClick={(e) => e.stopPropagation()}>
                <div className="photos-lb-info-head">Info</div>
                {cur.caption && <p className="photos-lb-info-caption">{cur.caption}</p>}
                <div className="photos-lb-info-row"><span>Dimensions</span><span>{cur.w} × {cur.h}</span></div>
                <div className="photos-lb-info-row"><span>Aspect</span><span>{cur.ratio.toFixed(2)}</span></div>
                <div className="photos-lb-info-row"><span>File</span><span style={{ fontFamily: 'monospace', fontSize: 11 }}>{cur.src.split('/').pop()}</span></div>
              </div>
            )}
          </div>

          {/* Filmstrip */}
          <div className="photos-lb-strip" onClick={(e) => e.stopPropagation()}>
            {images.map((img, i) => (
              <button
                key={img.src}
                className={`photos-lb-thumb ${i === lightbox ? 'active' : ''}`}
                onClick={() => setLightbox(i)}
              >
                <img src={img.src} alt="" />
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

function FinderContent({ folder, tag, activeFileId, onOpenFile }) {
  const d = DATA();

  // Gallery view
  if (folder === 'gallery' && !tag) {
    return <GalleryView />;
  }

  // About view — single file shortcut
  if (folder === 'about' && !tag) {
    const files = [
      { id: 'about', name: 'about_me', ext: 'md', type: 'DOC', date: '2026', kicker: 'the quieter page' },
      { id: 'resume', name: 'resume', ext: 'pdf', type: 'PDF', date: '2026', kicker: 'one-pager' },
    ];
    return (
      <div className="finder-content">
        <div className="finder-toolbar">
          <span>About · 2 items</span>
          <span>modified Apr 2026</span>
        </div>
        <div className="file-list">
          {files.map((f) => (
            <div key={f.id}
                 className={`file-row ${activeFileId === f.id ? 'active' : ''}`}
                 onClick={() => onOpenFile({ ...f, _kind: f.id === 'resume' ? 'resume' : 'about' })}>
              <div className="ico">{f.ext === 'pdf' ? '¶' : '§'}</div>
              <div>
                <div className="name">{f.name}<span style={{ color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)', fontSize: 11, marginLeft: 4 }}>.{f.ext}</span></div>
                <div className="sub">{f.kicker}</div>
              </div>
              <div className="kind">{f.type}</div>
              <div className="date">{f.date}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Tag filter — flatten work + projects + competitions
  let items;
  let title;
  if (tag) {
    const all = [...d.work, ...d.projects, ...d.competitions];
    items = all.filter((x) => (x.tags || []).includes(tag));
    title = `Tag · ${tag}`;
  } else {
    items = d[folder] || [];
    title = d.folders.find((f) => f.id === folder)?.name || folder;
  }

  // Split projects into headline + coursework groups
  const isProjects = !tag && folder === 'projects';
  const headline = isProjects ? items.filter((x) => !x.coursework) : items;
  const coursework = isProjects ? items.filter((x) => x.coursework) : [];

  const renderRow = (it) => {
    const [base, ext] = splitExt(it.name);
    return (
      <div key={it.id}
           className={`file-row ${activeFileId === it.id ? 'active' : ''}`}
           onClick={() => onOpenFile({ ...it, _kind: 'doc' })}>
        <div className="ico">{glyphFor(it.type)}</div>
        <div>
          <div className="name">{base}<span style={{ color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)', fontSize: 11, marginLeft: 4 }}>{ext}</span></div>
          <div className="sub">{it.kicker}</div>
        </div>
        <div className="kind">{it.type}</div>
        <div className="date">{it.date}</div>
      </div>
    );
  };

  return (
    <div className="finder-content">
      <div className="finder-toolbar">
        <span>{title} · {items.length} {items.length === 1 ? 'item' : 'items'}</span>
        <span>sorted · chronological</span>
      </div>
      <div className="file-list">
        {headline.map(renderRow)}
        {coursework.length > 0 && (
          <>
            <div style={{
              padding: '14px 14px 6px',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ink-faint)',
              borderTop: '1px solid var(--ink-faint)',
              marginTop: 8,
            }}>
              Coursework / Earlier
            </div>
            {coursework.map(renderRow)}
          </>
        )}
      </div>
    </div>
  );
}

function splitExt(name) {
  const i = name.lastIndexOf('.');
  if (i < 0) return [name, ''];
  return [name.slice(0, i), name.slice(i)];
}
function glyphFor(t) {
  if (t === 'EXP') return '¶';
  if (t === 'CASE') return '◊';
  if (t === 'ML' || t === 'DL' || t === 'CV' || t === 'DS' || t === 'AI') return '∂';
  return '§';
}

// ==================== TABLEAU EMBED ====================
function TableauEmbed({ path, href }) {
  const containerRef = React.useRef(null);
  const initialised = React.useRef(false);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || initialised.current) return;
    initialised.current = true;

    const obj = el.getElementsByTagName('object')[0];
    if (!obj) return;
    obj.style.width = '100%';
    obj.style.height = (el.offsetWidth * 0.75) + 'px';

    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    obj.parentNode.insertBefore(script, obj);

    return () => { if (script.parentNode) script.parentNode.removeChild(script); };
  }, []);

  const html = `<object class="tableauViz" style="display:none;">
    <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F"/>
    <param name="embed_code_version" value="3"/>
    <param name="site_root" value=""/>
    <param name="name" value="${path}"/>
    <param name="tabs" value="yes"/>
    <param name="toolbar" value="yes"/>
    <param name="animate_transition" value="yes"/>
    <param name="display_static_image" value="yes"/>
    <param name="display_spinner" value="yes"/>
    <param name="display_overlay" value="yes"/>
    <param name="display_count" value="yes"/>
    <param name="language" value="en-US"/>
  </object>`;

  return (
    <div style={{ margin: '20px 0', border: '1px solid var(--ink-faint)', borderRadius: 4, overflow: 'hidden' }}>
      <div ref={containerRef} style={{ position: 'relative', background: '#fff' }} dangerouslySetInnerHTML={{ __html: html }} />
      <div style={{ padding: '8px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-faint)', borderTop: '1px solid var(--ink-faint)', background: 'var(--paper-soft)' }}>
        Live Tableau Public dashboard. {href && <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Open in Tableau Public ↗</a>}
      </div>
    </div>
  );
}

// ==================== DOC (Dossier) ====================
function DocView({ item }) {
  const onTagClick = (t) => {
    window.dispatchEvent(new CustomEvent('open-tag', { detail: t }));
  };
  return (
    <div className="doc">
      {item.kicker && <div className="kicker">{item.kicker}</div>}
      <h1 dangerouslySetInnerHTML={{ __html: item.title }} />
      {item.subtitle && <div className="subtitle">{item.subtitle}</div>}

      {item.links?.github && (
        <a href={item.links.github} target="_blank" rel="noopener noreferrer" className="doc-github-link">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
          {item.links.github.replace('https://github.com/', '')}
        </a>
      )}

      {item.metrics && (
        window.MetricStrip
          ? <window.MetricStrip items={item.metrics} />
          : (
            <div className="metrics">
              {item.metrics.map((m, i) => (
                <div className="metric" key={i}>
                  <div className="v">{m.v}</div>
                  <div className="l">{m.l}</div>
                </div>
              ))}
            </div>
          )
      )}

      {item.arch && (
        <div className="arch-diagram">
          {item.arch.map((step, i) => (
            <React.Fragment key={i}>
              <div className="arch-node">{step}</div>
              {i < item.arch.length - 1 && <div className="arch-arrow">›</div>}
            </React.Fragment>
          ))}
        </div>
      )}

      {window.ProjectDiagram && <window.ProjectDiagram id={item.id} />}

      {(item.body || []).map((b, i) => (
        <React.Fragment key={i}>
          {b.h && <h3>{b.h}</h3>}
          {b.p && <p>{b.p}</p>}
          {b.quote && <blockquote className="doc-quote">{b.quote}</blockquote>}
          {b.list && <ul>{b.list.map((li, j) => <li key={j}>{li}</li>)}</ul>}
        </React.Fragment>
      ))}

      {item.tableauPath && (
        <TableauEmbed path={item.tableauPath} href={item.links?.tableau} />
      )}

      {item.links?.tableau && !item.tableauPath && (
        <div style={{ margin: '24px 0 16px' }}>
          <a href={item.links.tableau} target="_blank" rel="noopener noreferrer"
             style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', border: '1px solid var(--ink)', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink)', textDecoration: 'none', background: 'var(--paper)' }}>
            Tableau ↗
          </a>
        </div>
      )}

      {item.tags && (
        <>
          <hr/>
          <div className="tag-row">
            {item.tags.map((t) => (
              <span key={t} className="tag" onClick={() => onTagClick(t)}>{t}</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ==================== ABOUT ====================
function AboutDoc() {
  const d = DATA();
  const p = d.personality;
  return (
    <div className="about-doc">
      <div className="hero-row">
        <img src="images/headshot.png" alt="" />
        <div>
          <h1>{d.owner.name}</h1>
          <div className="role">{d.owner.role}</div>
        </div>
      </div>

      {p.paragraphs.map((para, i) => <p key={i}>{para}</p>)}

      <div className="about-section-head">Education</div>
      {d.education.map((e, i) => (
        <div key={i} className="about-edu-row">
          <span className="about-edu-year">{e.year}</span>
          <span>
            <div className="about-edu-school">{e.school}</div>
            <div className="about-edu-prog">{e.program}</div>
          </span>
        </div>
      ))}

      <div className="about-section-head">Recognitions</div>
      <ul>
        {d.achievements.map((a, i) => <li key={i}>{a}</li>)}
      </ul>
    </div>
  );
}

// ==================== NOW (macOS Notes — dark mode) ====================
function NowView() {
  const { useState: useS } = React;
  const d = DATA();
  const n = d.now || {};
  const [sel, setSel] = useS(0);
  // Track which entries are expanded within each note. Default: all open.
  const [openMap, setOpenMap] = useS({
    reading: (n.reading || []).map(() => true),
    studying: (n.studying || []).map(() => true),
  });
  const toggle = (group, idx) => setOpenMap((m) => ({
    ...m,
    [group]: m[group].map((v, i) => (i === idx ? !v : v)),
  }));
  const setAll = (group, val) => setOpenMap((m) => ({
    ...m,
    [group]: m[group].map(() => val),
  }));

  const today = new Date();
  const dateLabel = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const timeLabel = today.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const listDate = today.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' });

  // Chevron caret
  const Chev = ({ open }) => (
    <svg className={`dnotes-chev ${open ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );

  const readingOpen = (openMap.reading || []).filter(Boolean).length;
  const studyingOpen = (openMap.studying || []).filter(Boolean).length;

  const notes = [
    {
      title: 'Currently Reading',
      preview: (n.reading || [])[0]?.title || '',
      date: listDate,
      content: (
        <div>
          <div className="dnotes-section">
            <button
              className="dnotes-section-head"
              onClick={() => setAll('reading', readingOpen < (openMap.reading?.length || 0))}
            >
              <Chev open={readingOpen > 0} />
              <span className="dnotes-section-title">Reading list</span>
              <span className="dnotes-section-count">{(n.reading || []).length} items</span>
            </button>
            <div className="dnotes-section-body">
              {(n.reading || []).map((b, i) => {
                const open = !!(openMap.reading || [])[i];
                return (
                  <div key={i} className={`dnotes-entry collapsible ${open ? 'open' : ''}`}>
                    <button className="dnotes-entry-head" onClick={() => toggle('reading', i)}>
                      <Chev open={open} />
                      <span className="dnotes-entry-title">{b.title}</span>
                    </button>
                    <div className="dnotes-entry-body">
                      {b.author && <div className="dnotes-entry-by">— {b.author}</div>}
                      {b.note && <p className="dnotes-entry-note">{b.note}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Currently Learning',
      preview: (n.studying || [])[0]?.title || '',
      date: listDate,
      content: (
        <div>
          <div className="dnotes-section">
            <button
              className="dnotes-section-head"
              onClick={() => setAll('studying', studyingOpen < (openMap.studying?.length || 0))}
            >
              <Chev open={studyingOpen > 0} />
              <span className="dnotes-section-title">Currently studying</span>
              <span className="dnotes-section-count">{(n.studying || []).length} topics</span>
            </button>
            <ul className="dnotes-checklist">
              {(n.studying || []).map((s, i) => {
                const open = !!(openMap.studying || [])[i];
                return (
                  <li key={i} className={`dnotes-study ${open ? 'open' : ''}`}>
                    <button className="dnotes-study-head" onClick={() => toggle('studying', i)}>
                      <Chev open={open} />
                      <span className={`dnotes-check ${s.checked ? 'on' : ''}`} aria-hidden="true" />
                      <span className="dnotes-study-title" style={{ color: s.checked ? '#8e8e93' : '#e5e5e7', textDecoration: s.checked ? 'line-through' : 'none' }}>{s.title}</span>
                    </button>
                    {s.items && s.items.length > 0 && (
                      <ul className="dnotes-study-items">
                        {s.items.map((item, j) => (
                          <li key={j}>
                            <span>–</span>{item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ),
    },
  ];

  // SF-Symbol-style toolbar glyphs
  const tools = [
    { label: 'Lock', path: 'M7 9V7a5 5 0 0 1 10 0v2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h1zm2 0h6V7a3 3 0 0 0-6 0v2z' },
    { label: 'Delete', path: 'M9 4h6l1 2h4v2H4V6h4l1-2zm-3 5h12l-1 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 9z' },
    { label: 'New', path: 'M18 4H6a2 2 0 0 0-2 2v14l4-4h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-6 3h0v6m-3-3h6' },
    { label: 'Format', path: 'M5 4h14v3H5V4zm2 5h10v2H7V9zm-2 5h14v2H5v-2zm2 5h10v2H7v-2z' },
    { label: 'Checklist', path: 'M4 6l2 2 4-4M4 13l2 2 4-4M4 20l2 2 4-4M13 6h8M13 13h8M13 20h8' },
    { label: 'Table', path: 'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm0 6h18M9 3v18' },
    { label: 'Photo', path: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm2 11l4-5 3 4 2-2 4 5H6z M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z' },
    { label: 'Share', path: 'M12 3l-4 4h3v8h2V7h3l-4-4zM5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6h-2v6H7v-6H5z' },
  ];

  return (
    <div className="dnotes-app">
      {/* Folders rail */}
      <div className="dnotes-rail">
        <div className="dnotes-rail-section">
          <div className="dnotes-rail-head">iCloud</div>
          <div className="dnotes-rail-item active">
            <svg className="dnotes-rail-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h18M3 12h18M3 17h18"/></svg>
            <span>All iCloud</span>
            <span className="dnotes-rail-count">{notes.length}</span>
          </div>
          <div className="dnotes-rail-item">
            <svg className="dnotes-rail-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z"/></svg>
            <span>Notes</span>
            <span className="dnotes-rail-count">{notes.length}</span>
          </div>
        </div>
        <div className="dnotes-rail-section">
          <div className="dnotes-rail-head">Smart Folders</div>
          <div className="dnotes-rail-item">
            <svg className="dnotes-rail-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4l2 5 5 1-4 4 1 5-4-3-4 3 1-5-4-4 5-1z" transform="translate(5 0)"/></svg>
            <span>Pinned</span>
          </div>
          <div className="dnotes-rail-item">
            <svg className="dnotes-rail-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 7h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7zM9 4h6v3H9z"/></svg>
            <span>Recently Deleted</span>
          </div>
        </div>
      </div>

      {/* Notes list */}
      <div className="dnotes-list">
        <div className="dnotes-list-head">
          <div className="dnotes-search-wrap">
            <svg className="dnotes-search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="6"/><path d="M16 16l4 4"/></svg>
            <input className="dnotes-search" placeholder="Search" readOnly />
          </div>
          <div className="dnotes-list-title">All iCloud</div>
          <div className="dnotes-list-sub">{notes.length} Notes</div>
        </div>
        <div className="dnotes-list-body">
          {notes.map((note, i) => (
            <div key={i} className={`dnotes-item ${sel === i ? 'active' : ''}`} onClick={() => setSel(i)}>
              <div className="dnotes-item-title">{note.title}</div>
              <div className="dnotes-item-meta">
                <span className="dnotes-item-date">{note.date}</span>
                <span className="dnotes-item-preview">{note.preview}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active note */}
      <div className="dnotes-content">
        <div className="dnotes-content-toolbar">
          {tools.map((t, i) => (
            <button key={i} className="dnotes-tool" title={t.label} aria-label={t.label}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d={t.path} />
              </svg>
            </button>
          ))}
        </div>
        <div className="dnotes-content-body">
          <div className="dnotes-content-stamp">{dateLabel} at {timeLabel}</div>
          <h1 className="dnotes-content-title">{notes[sel]?.title}</h1>
          {notes[sel]?.content}
        </div>
      </div>
    </div>
  );
}

// ==================== LEARNING (git log terminal) ====================
function LearningArchive() {
  const items = DATA().learning;
  const { useState: useS } = React;
  const [openIdx, setOpenIdx] = useS(0);
  const today = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });

  // Stable color per branch name
  const branchColor = (name) => {
    const palette = ['#7ec98f', '#7fb3e8', '#e8a87c', '#d68aa3', '#c9a96e', '#b08fd4', '#6cb9b3'];
    let h = 0; for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 997;
    return palette[h % palette.length];
  };

  return (
    <div className="gitlog">
      {/* Terminal title bar within the window */}
      <div className="gitlog-bar">
        <span className="gitlog-bar-prompt">guest@portfolio:~/career</span>
        <span className="gitlog-bar-sep">·</span>
        <span className="gitlog-bar-branch">git:(<span style={{ color: '#7ec98f' }}>main</span>)</span>
        <span className="gitlog-bar-spacer" />
        <span className="gitlog-bar-time">{today}</span>
      </div>

      {/* Command line */}
      <div className="gitlog-cmd">
        <span className="gitlog-prompt">$</span>
        <span className="gitlog-cmd-text">git log --graph --decorate --branches --oneline</span>
        <span className="gitlog-caret" />
      </div>

      {/* Stats header */}
      <div className="gitlog-stats">
        <span>commits: <b>{items.length}</b></span>
        <span>branches: <b>{new Set(items.map(i => i.branch)).size}</b></span>
        <span>HEAD <span className="gitlog-head-pill">→ {items.find(i => i.head)?.branch || items[0].branch}</span></span>
      </div>

      {/* Log body */}
      <div className="gitlog-body">
        {items.map((it, i) => {
          const open = openIdx === i;
          const colour = branchColor(it.branch);
          return (
            <div
              key={it.hash}
              className={`gitlog-row ${open ? 'open' : ''} ${it.head ? 'head' : ''} ${it.current ? 'current' : ''}`}
              onClick={() => setOpenIdx(open ? -1 : i)}
            >
              <div className="gitlog-graph">
                <span className="gitlog-rail" style={{ background: colour, opacity: 0.45 }} />
                <span className={`gitlog-node ${it.head ? 'head' : it.current ? 'current' : ''}`} style={{ borderColor: colour, background: it.head ? colour : (it.current ? `${colour}33` : 'transparent') }} />
              </div>
              <div className="gitlog-main">
                <div className="gitlog-line">
                  <span className="gitlog-hash" style={{ color: colour }}>{it.hash}</span>
                  {it.head && <span className="gitlog-head-tag">HEAD →</span>}
                  <span className="gitlog-branch-tag" style={{ color: colour, borderColor: `${colour}55`, background: `${colour}10` }}>
                    <span className="gitlog-branch-dot" style={{ background: colour }} />
                    {it.branch}
                  </span>
                  <span className="gitlog-date">{it.date}</span>
                </div>
                <div className="gitlog-msg">{it.msg}</div>
                <div className={`gitlog-desc ${open ? 'open' : ''}`}>
                  <div className="gitlog-desc-inner">
                    <div className="gitlog-diff">
                      <span className="gitlog-diff-add">+ added context</span>
                      <span className="gitlog-diff-meta">commit {it.hash.padEnd(40, '·')}</span>
                    </div>
                    <p>{it.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="gitlog-end">
          <span className="gitlog-prompt">$</span>
          <span className="gitlog-caret blink" />
        </div>
      </div>
    </div>
  );
}

// ==================== RESUME (PDF) ====================
function ResumeView() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#2a231e' }}>
      <object data="assets/resume.pdf?v=202505061431" type="application/pdf" style={{ width: '100%', height: '100%' }}>
        <div style={{ padding: 32, textAlign: 'center', color: 'var(--paper)' }}>
          <p>Your browser cannot display the PDF inline.</p>
          <a href="assets/resume.pdf?v=202505061431" target="_blank" rel="noopener" style={{ color: 'var(--ochre)' }}>Open in a new tab</a>
        </div>
      </object>
    </div>
  );
}

Object.assign(window, {
  Icon, IndexCardHero, FinderSidebar, FinderContent, GalleryView, DocView, AboutDoc, LearningArchive, ResumeView, NowView,
});
