# Hardik Mantri - Personal Portfolio Website 🚀

A modern, multi-page personal developer portfolio built for **Hardik Mantri** (1st Year B.Tech Computer Science Engineering student at JECRC University, Jaipur).

---

## ✨ Features

- **Multi-Page Architecture**:
  - `index.html`: Hero with dynamic typewriter effect, particle canvas, quick stats, and featured projects.
  - `about.html`: Personal journey, JECRC University education timeline, coursework tags, and current learning radar.
  - `skills.html`: Animated skill progress bars grouped by Languages, Web Development, Tools, and Ongoing Learning.
  - `projects.html`: Interactive project showcase with category filtering (All, Web, C++, Tools), preview illustrations, tech tags, and live links.
  - `journey.html`: Strategic 4-year undergraduate vertical roadmap (Years 1 to 4).
  - `achievements.html`: Certifications, hackathon honors, and academic milestones with verification links.
  - `contact.html`: Glassmorphic contact form with client validation, animated submit state, toast notification, social links, and CV download.
- **Visual Design**:
  - Dark-first aesthetic with deep navy background (`#070a13`) and electric blue & purple gradient accents.
  - Polished Light/Dark mode switcher with state saved in `localStorage`.
  - Glassmorphic cards with subtle backdrop blur and hover lift effects.
  - Custom cursor glow and scroll progress bar at the top of the viewport.
  - Responsive mobile drawer navigation with hamburger animation.
- **Zero Build Dependencies**:
  - Built with clean, standard HTML5, CSS3, and modern vanilla JavaScript (ES6+).
  - Immediately deployable on **Vercel**, **GitHub Pages**, or **Netlify** with zero setup.

---

## 📁 Project Structure

```text
├── index.html                   # Homepage (Hero, Typewriter, Particle Canvas)
├── about.html                   # About Me (Story, Education, Coursework)
├── skills.html                  # Skills (Progress Bars, Grouped Toolkits)
├── projects.html                # Projects Showcase & Category Filters
├── journey.html                 # 4-Year B.Tech Timeline Roadmap
├── achievements.html            # Certifications, Hackathons & Honors
├── contact.html                 # Contact Form, Socials & Resume CTA
├── css/
│   └── style.css                # Design tokens, themes, animations & responsive styles
├── js/
│   └── main.js                  # Particle canvas, typewriter, theme toggle & interaction
├── assets/
│   ├── favicon.svg              # Brand monogram favicon (HM)
│   ├── Hardik_Mantri_Resume.html# Formatted, printable HTML resume
│   ├── project-algoverse.svg    # Visual preview for Algoverse
│   ├── project-campussync.svg   # Visual preview for CampusSync
│   ├── project-devfolio.svg     # Visual preview for DevFolio
│   ├── project-bankflow.svg     # Visual preview for BankFlow
│   ├── project-weatherpulse.svg # Visual preview for WeatherPulse
│   └── project-taskmaster.svg   # Visual preview for TaskMaster
└── README.md
```

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or run a local HTTP server:

```bash
# Using Python:
python -m http.server 8000

# Or using Node.js:
npx serve .
```

Then visit [http://localhost:8000](http://localhost:8000).

---

## 🌐 How to Deploy for Free

### Option 1: Vercel (Recommended)
1. Push this folder to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository. Since this is static HTML/CSS/JS, Vercel will deploy it instantly without any build commands.

### Option 2: GitHub Pages
1. Push this folder to a GitHub repository named `hardik-portfolio` (or `<your-username>.github.io`).
2. Go to repository **Settings** → **Pages**.
3. Under **Build and deployment**, set Source to **Deploy from a branch** and select the `main` branch root (`/`).
4. Click **Save**. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.
