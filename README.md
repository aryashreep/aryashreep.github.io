# Terminal OS Portfolio - Principal Platform Architect

A premium, interactive retro-terminal styled portfolio website designed for a Principal Platform & Cloud Architect (Aryashree Pritikrishna).

## 🚀 Key Features
- **Interactive Terminal Shell**: A custom console emulator supporting commands like `help`, `skills`, `neofetch`, and `sudo` with auto-scroll and history outputs.
- **High-Fidelity Custom Caret**: A terminal-grade blinking block cursor that responds to active focus, blur states, and maps correctly on arrow key caret navigation.
- **3D ASCII Wireframe Projection Engine**: A custom perspective 3D matrix wireframe cube running Bresenham's line algorithm on text grids, featuring telemetry logging and hover-accelerated rotation speeds.
- **Matrix Digital Rain Canvas**: A lightweight canvas background particle rain stream that dynamically clears, fades, and renders symbols matching the primary theme.
- **Aesthetic Scanlines & Flicker**: CSS overlays providing an authentic CRT monitor scanline grid, border ticks, dashed dividers, and glowing shadows.
- **SEO & Structured Data Optimized**: Integrated Open Graph elements, Twitter Card data, robots directives, and a JSON-LD structured `Person` schema for search engine snippet indexing.
- **Full Responsiveness**: Mobile-first grid layouts wrapping text elements and ASCII structures gracefully down to 320px viewports.

---

## 📁 Project Structure
```text
C:/laragon/www/portfolio/
├── assets/
│   └── profile.png          # Portrait photo (converted to ASCII on canvas at runtime)
├── css/
│   ├── main.css             # Theme tokens, custom block cursor, CRT scanlines, layouts
│   └── responsive.css       # Breakdown media queries (desktop, tablet, mobile viewports)
├── js/
│   ├── app.js               # Clock timers, neofetch outputs, terminal input sync, 3D wireframe
│   └── matrix.js            # Canvas digital rain stream rendering loop
├── index.html               # Main page layout & structural content
└── README.md                # Project documentation & local hosting instructions
```

---

## 💻 Terminal Console Commands
Visitors can type the following commands inside the hero section shell simulator:

| Command | Action |
| :--- | :--- |
| `help` | Display list of operational commands |
| `neofetch` | Print operator bios metadata and system stack specifications |
| `skills` | Output detailed Operational Technology Grid details (IaC, microservices, databases) |
| `projects` | List primary cloud-native open source projects index |
| `about` | Print standard bios overview |
| `contact` | Print communication channel link grids (LinkedIn, GitHub, YouTube, etc.) |
| `clear` | Wipe console history |
| `sudo` | Test administrator command privilege escalation |

---

## 🛠️ Local Hosting & Setup

Since the portfolio is built on pure **Vanilla HTML, CSS, and JavaScript** without heavy compile-time framework dependencies, setup is extremely straightforward.

### Requirements
A local web server environment (e.g., Laragon, Apache, Nginx, or VS Code Live Server extension) is recommended to load `assets/profile.png` inside the HTML5 Canvas converter without browser CORS security restrictions.

### Deployment steps
1. Clone or copy the folder contents into your server root directory (e.g. `C:\laragon\www\portfolio`).
2. Start your local environment web services (Apache).
3. Access the website via your configured local loop domain (e.g. `http://localhost/portfolio` or `http://portfolio.local`).
