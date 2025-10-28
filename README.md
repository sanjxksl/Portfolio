# Sanjana Kanchibotla - Portfolio Website

A sophisticated, minimal portfolio showcasing my journey at the intersection of design thinking, data analytics, business strategy, and engineering.

## 🎨 Design Philosophy

**Warm Coffee Aesthetic**: Cream, soft beige, warm browns, and gentle pastels that reflect my love for coffee shops, books, and thoughtful spaces.

**Minimal but Impactful**: Every element has meaning. No unnecessary decoration. Clean lines, smooth transitions, sophisticated interactions.

**Journey Theme**: The entire site represents my learning journey - not a linear path, but Robert Frost's "two roads" that I took both, converging into product strategy.

## ✨ Key Features

### Hero Section
- **Interactive ambient gradients** - Floating orbs in pastel tones (peach, sage, powder blue)
- **Custom cursor** - Smooth tracking with meaningful hover states
- **Authentic tagline**: "I turn curiosity into products people actually use"
- **Intersection tags**: Design Thinking • Data Analytics • Business Strategy • Engineering

### Recent Work
- Two featured projects: Ashok Leyland (predictive testing) and HyperHorizon (GTM strategy)
- Clean cards with hover effects
- Real content, no AI fluff

### Gallery
- **Horizontal infinite scroll** - Just experiences flowing by
- Pauses on hover
- No captions, just pure visual flow

### Work Page
- **Two categories**: Internships & Major Projects
- Real work experience: Ashok Leyland, HyperHorizon
- Major projects: Aesthify, Alumni Affairs, Red Ribbon Society
- Clean cards with tags and descriptions

### Learning Page ⭐ (The Star)
- **Robert Frost inspired**: "Two roads diverged in a wood, and I—I took both"
- **SVG path visualization** - Branching paths showing my journey
- **4 domain nodes**:
  - ⚙️ Engineering Foundation
  - 🎨 Design Thinking
  - 📊 Data & Analytics
  - 🎯 Product Strategy
- **Hover reveals project clouds** with detailed project cards
- **Click projects** for full case studies (coming soon)

### About Page
- **Photo background** - Me at the center
- **8 floating words**: poetry, dance, coffee, organize, overthink, curious, books, analytics
- **Hover words** to reveal personal stories
- **Authentic narrative** - No AI-speak, just me talking

### Footer / Contact
- Clean contact form
- "Where patterns meet poetry" tagline
- Email: sanjana.kanchibotla@rotman.utoronto.ca
- Phone: (416) 427-6330

## 📁 Project Structure

```
portfolio-final/
├── index.html              # Main HTML file
├── css/
│   ├── main.css           # Base styles, colors, typography
│   ├── hero.css           # Hero section with ambient gradients
│   ├── work.css           # Work experience page
│   ├── learning.css       # Learning page with forest metaphor
│   └── about.css          # About page with floating words
├── js/
│   ├── cursor.js          # Custom cursor tracking
│   ├── navigation.js      # Page transitions and nav behavior
│   ├── learning.js        # Learning page interactions
│   ├── about.js           # About page word hover effects
│   └── main.js            # Global utilities
└── assets/
    └── images/            # All images go here
```

## 🚀 Quick Start

### Option 1: Local Development
```bash
cd portfolio-final
python3 -m http.server 8000
# Open http://localhost:8000
```

### Option 2: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

### Option 3: Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd portfolio-final
netlify deploy --prod --dir=.
```

## 📸 Adding Your Content

### 1. Replace Images
Add these images to `assets/images/`:
- `ashok-leyland.jpg` - Ashok Leyland project thumbnail
- `hyperhorizon.jpg` - HyperHorizon project thumbnail
- `exp-1.jpg` through `exp-6.jpg` - Your event/experience photos
- `sanjana-headshot.jpg` - Your professional photo for about page

### 2. Update Content
All content is already authentic and based on your real work. But if you want to modify:
- Project descriptions: In `index.html` under relevant sections
- About page text: In the `.about-section`
- Word facts: In `js/about.js` in the `wordFacts` object

### 3. Add More Projects
To add projects to the learning page:
1. Open `index.html`
2. Find the `.project-cloud` section for your domain
3. Add a new `.project-card`:
```html
<div class="project-card" data-project="your-project-id">
    <h4>Project Title</h4>
    <span class="project-type">Project Type</span>
    <p>Brief description of what you did and learned.</p>
</div>
```

## 🎯 Features in Detail

### Custom Cursor
- Smooth tracking with acceleration
- Expands on interactive elements
- Mix-blend-mode for visibility on all backgrounds
- Hidden on mobile

### Navigation
- Auto-hides on scroll down (home page only)
- Always visible on other pages
- Smooth page transitions
- Active state tracking

### Learning Page Interactions
- **Hover on domain nodes** → Project cloud appears
- **Click on project cards** → Opens detailed case study (coming soon)
- **SVG paths animate** on page load
- **Clouds stay open** when hovering over them

### About Page Interactions
- **Hover on floating words** → Tooltip with personal story appears
- **Words float gently** up and down
- **Tooltip follows mouse** and stays on screen
- **Photo is centerpiece** with words orbiting around

## 🎨 Color Palette

```css
/* Coffee Tones */
--cream: #FAF7F2;
--soft-beige: #E8E3D8;
--warm-brown: #C4B5A0;
--coffee: #8B7355;
--dark-coffee: #5C4A3A;
--espresso: #3C2F23;

/* Accent Pastels */
--peach: #F4D9C6;
--sage: #C9D1C8;
--mauve: #D4C4D8;
--powder-blue: #C8D5E0;
```

## 📱 Responsive Design

- **Desktop**: Full experience with custom cursor and complex interactions
- **Tablet**: Simplified layout, touch-friendly interactions
- **Mobile**: 
  - Standard cursor (custom cursor hidden)
  - Stacked layouts
  - Touch gestures
  - Simplified navigation

## 🔮 Future Enhancements

1. **Project Detail Pages**: Full case studies for each project
2. **Blog Section**: Write about product thinking, data, and design
3. **Resume Download**: One-click CV download
4. **Dark Mode**: Optional dark theme (coffee → espresso)
5. **Animations**: Subtle scroll-triggered animations
6. **Contact Form Backend**: Actually send emails
7. **Analytics**: Track visitor engagement

## 💡 Technical Notes

- **No frameworks**: Pure HTML, CSS, JavaScript
- **No dependencies**: Everything is vanilla
- **Performance**: Lazy loading images, debounced scroll events
- **Accessibility**: Semantic HTML, keyboard navigation
- **SEO**: Meta tags, semantic structure (add later)

## 🤝 Connect

- **Email**: sanjana.kanchibotla@rotman.utoronto.ca
- **LinkedIn**: [linkedin.com/in/sanjanaksl](https://linkedin.com/in/sanjanaksl)
- **GitHub**: [github.com/sanjxksl](https://github.com/sanjxksl)

## 📄 License

This is my personal portfolio. Feel free to draw inspiration, but please don't copy directly. Build something that represents YOU, not me.

---

**Built with ☕ and curiosity**

*Where patterns meet poetry*
