/**
 * SYSTEM KERNEL - MAIN APPLICATION LOGIC
 * Handles client-side ASCII rendering, shell interactions, metrics simulation, 
 * interactive forms, tech tooltips, active states, and diagnostic outputs.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Core Services
  initSystemClocks();
  initSystemStats();
  initTerminalShell();
  initTechStackTooltips();
  initFooterControls();
  init3DCubeProjection();
  initScrollAnimations();
});

/* ==========================================================================
   01. CLOCKS & UPTIME TIMERS
   ========================================================================== */
function initSystemClocks() {
  const clockHeader = document.getElementById("clock-header");
  const uptimeVal = document.getElementById("sys-uptime-val");
  const timezoneVal = document.getElementById("local-timezone-val");

  // Format UTC Clock
  function updateClocks() {
    const now = new Date();
    const utcTime = now.toISOString().replace('T', ' ').substring(0, 19);
    if (clockHeader) {
      clockHeader.textContent = `SYS_TIME: ${utcTime} UTC`;
    }
  }

  // Calculate Uptime (simulating continuous operation since a baseline date)
  const bootEpoch = new Date("2005-06-01T08:00:00Z").getTime();
  function updateUptime() {
    const diff = Date.now() - bootEpoch;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (uptimeVal) {
      uptimeVal.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }

  // Detect and Display Timezone metadata
  try {
    const timeZoneStr = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offsetMin = new Date().getTimezoneOffset();
    const offsetSign = offsetMin <= 0 ? "+" : "-";
    const offsetHours = Math.floor(Math.abs(offsetMin) / 60);
    const offsetMins = Math.abs(offsetMin) % 60;
    const formattedOffset = `UTC${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMins).padStart(2, '0')}`;

    let tzCode = "IST";
    if (timeZoneStr.includes("Kolkata") || timeZoneStr.includes("Calcutta")) tzCode = "IST";
    else if (timeZoneStr.includes("America")) tzCode = "EST/PST";
    else if (timeZoneStr.includes("Europe")) tzCode = "GMT/CET";

    if (timezoneVal) {
      timezoneVal.textContent = `${timeZoneStr} (${tzCode}, ${formattedOffset})`;
    }
  } catch (err) {
    console.error("Timezone detection failed", err);
  }

  setInterval(updateClocks, 1000);
  setInterval(updateUptime, 1000);
  updateClocks();
  updateUptime();
}

/* ==========================================================================
   02. STATISTICS & TELEMETRY WIDGETS
   ========================================================================== */
function initSystemStats() {
  const cpuLoadHeader = document.getElementById("cpu-load-header");
  const ramMeter = document.getElementById("ram-meter");
  const ramText = document.getElementById("ram-text");
  const cpuLoadVal = document.getElementById("cpu-load-val");
  
  // CPU cells
  const cpuG1 = document.getElementById("cpu-g1");
  const cpuG2 = document.getElementById("cpu-g2");
  const cpuG3 = document.getElementById("cpu-g3");

  // Network TX/RX logs
  const netTx = document.getElementById("net-tx");
  const netRx = document.getElementById("net-rx");

  // System Logs stream simulation
  const sysLogLines = document.getElementById("sys-log-lines");
  const logMessages = [
    "sync_state: argo syncing active applications...",
    "prom_alert: slis checked [0 warnings, 0 critical]",
    "deploy_worker: replica scale down event on dev-pool-01",
    "security_audit: kube-bench scanning complete",
    "policy_verifier: signature check validated for core-service",
    "network_mesh: envoy gateway routing updated",
    "telemetry_daemon: pushing payloads to opentelemetry-collector",
    "etcd_status: sync latency 4ms (NOMINAL)"
  ];

  // Network Sparkline variables
  const sparkCanvas = document.getElementById("sparkline-canvas");
  let sparkPoints = Array(20).fill(20);

  function simulateTelemetry() {
    // 1. CPU load simulation
    const cpuLoad = Math.floor(25 + Math.random() * 55); // fluctuation between 25% and 80%
    if (cpuLoadHeader) cpuLoadHeader.textContent = `CPU: ${cpuLoad}%`;
    if (cpuLoadVal) cpuLoadVal.textContent = `LOAD: ${cpuLoad}%`;

    // 2. RAM load simulation
    const ramUsed = (78.4 + Math.random() * 6).toFixed(2);
    const ramPct = ((ramUsed / 128) * 100).toFixed(1);
    if (ramMeter) ramMeter.style.width = `${ramPct}%`;
    if (ramText) ramText.textContent = `USED: ${ramUsed} GB`;

    // 3. Update active gauge cells based on CPU load
    if (cpuLoad > 40 && cpuG1) cpuG1.classList.add("active");
    else if (cpuG1) cpuG1.classList.remove("active");

    if (cpuLoad > 60 && cpuG2) cpuG2.classList.add("active");
    else if (cpuG2) cpuG2.classList.remove("active");

    if (cpuLoad > 75 && cpuG3) cpuG3.classList.add("active");
    else if (cpuG3) cpuG3.classList.remove("active");

    // 4. Bandwidth rate updates
    const tx = (300 + Math.random() * 200).toFixed(1);
    const rx = (0.9 + Math.random() * 0.4).toFixed(2);
    if (netTx) netTx.textContent = `TX: ${tx} MB/s`;
    if (netRx) netRx.textContent = `RX: ${rx} GB/s`;

    // 5. Append random log entries to log pool
    if (sysLogLines && Math.random() > 0.6) {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)];
      
      const newLogDiv = document.createElement("div");
      newLogDiv.innerHTML = `&gt; [${timeStr}] ${randomLog}`;
      sysLogLines.appendChild(newLogDiv);

      // Keep only last 4 rows
      while (sysLogLines.children.length > 4) {
        sysLogLines.removeChild(sysLogLines.firstChild);
      }
    }

    // 6. Push data and draw sparkline
    sparkPoints.shift();
    sparkPoints.push(10 + Math.random() * 25);
    drawSparkline();
  }

  function drawSparkline() {
    if (!sparkCanvas) return;
    const ctx = sparkCanvas.getContext("2d");
    ctx.clearRect(0, 0, sparkCanvas.width, sparkCanvas.height);
    
    ctx.strokeStyle = "#65FF8F";
    ctx.lineWidth = 1.5;
    ctx.beginPath();

    const step = sparkCanvas.width / (sparkPoints.length - 1);
    for (let i = 0; i < sparkPoints.length; i++) {
      const x = i * step;
      // Invert Y axis for canvas coordinate mapping
      const y = sparkCanvas.height - sparkPoints[i];
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw gradient area below line
    ctx.lineTo(sparkCanvas.width, sparkCanvas.height);
    ctx.lineTo(0, sparkCanvas.height);
    ctx.fillStyle = "rgba(101, 255, 143, 0.05)";
    ctx.fill();
  }

  setInterval(simulateTelemetry, 800);
  simulateTelemetry();
}

/* ==========================================================================
   03. CLIENT-SIDE ASCII IMAGE PROCESSING & CONVERSION
   ========================================================================== */

/* ==========================================================================
   04. INTERACTIVE SHELL EMULATOR
   ========================================================================== */
function initTerminalShell() {
  const shellInput = document.getElementById("shell-input");
  const shellOutput = document.getElementById("shell-output");
  const shellBody = document.querySelector(".shell-body");

  if (!shellInput || !shellOutput) return;

  const textBefore = document.querySelector(".shell-visible-text-before");
  const cursor = document.querySelector(".shell-cursor");
  const textAfter = document.querySelector(".shell-visible-text-after");

  const updateCustomCursor = () => {
    if (!textBefore || !cursor || !textAfter) return;
    const val = shellInput.value;
    const selStart = shellInput.selectionStart;

    const beforeText = val.substring(0, selStart);
    const cursorChar = val.substring(selStart, selStart + 1) || " ";
    const afterText = val.substring(selStart + 1);

    textBefore.textContent = beforeText;
    cursor.textContent = cursorChar;
    textAfter.textContent = afterText;
  };

  // Sync cursor on events
  ["input", "keydown", "keyup", "click", "focus", "blur"].forEach(event => {
    shellInput.addEventListener(event, () => {
      setTimeout(updateCustomCursor, 0);
    });
  });

  updateCustomCursor();

  const shellCommands = {
    help: () => `
Available system commands:
  <span class="accent-text">help</span>     - Display list of operation commands.
  <span class="accent-text">neofetch</span> - Display developer profile and host parameters.
  <span class="accent-text">skills</span>   - List operational skills stack.
  <span class="accent-text">projects</span> - Display repository listing database.
  <span class="accent-text">contact</span>  - Print network link channels.
  <span class="accent-text">about</span>    - Display bios details.
  <span class="accent-text">clear</span>    - Clear terminal logs.
  <span class="accent-text">sudo</span>     - Elevate privilege credentials.
    `,
    neofetch: () => `
<span class="accent-text">        _.-'''''''-._ </span>       <b>USER</b>: arya@platform
<span class="accent-text">      .'  ________   '.</span>      <b>ROLE</b>: Principal Cloud & Platform Architect
<span class="accent-text">     /   /        \\    \\</span>     <b>LOCATION</b>: Bangalore, IN
<span class="accent-text">    |   |          |    |</span>    <b>UPTIME</b>: 18+ Years (Since June 2005)
<span class="accent-text">    |   |          |    |</span>    <b>K8s CLUSTERS</b>: Multi-Cloud GKE & EKS
<span class="accent-text">     \\   \\________/    /</span>     <b>ACTIVE STACK</b>: GCP, AWS, Terraform, Python, PHP
<span class="accent-text">      '.             .'</span>      <b>SECURITY CHECKS</b>: [SOC 2 Type II // Zero-Trust]
<span class="accent-text">        '-._______.-' </span>       <b>AVAILABILITY</b>: Open for consultations
    `,
    skills: () => `
Operational Technology Grid:
  - <b>Cloud Architectures</b> : GCP, AWS, HA & Disaster Recovery, event-driven systems
  - <b>Platform & DX</b>       : Kubernetes (GKE, EKS), CI/CD Automation (Jenkins, GitLab CI)
  - <b>DevSecOps & Sec</b>     : Zero Trust Architecture, micro-segmentation, compliance (ISO 27001)
  - <b>IaC & Automation</b>    : Terraform, Ansible, Docker, drift elimination, AgenticAI, AIOps
  - <b>Full-Stack Engines</b>   : PHP (Symfony), Drupal, React, Backbone.js, Apigee, MySQL & MongoDB
    `,
    projects: () => `
Primary Project Indexes:
  - <b>ASO Hosting Platform</b>: AWS multi-region IaC deployment & CIS compliance
  - <b>JDI Backup Engine</b>: GCP-native event-driven GKE storage platform managing 10PB+
  - <b>AkzoNobel CMS Platform</b>: Globally distributed multi-market Drupal setup for 10M+ visitors
  - <b>akara-framework</b>: Monospace theme blueprint configuration core operator (★ 432)
    `,
    about: () => `
Aryashree Pritikrishna is a veteran Principal Architect with 18+ years designing enterprise cloud platforms, DevSecOps frameworks, and infrastructure automation. Production depth spans Kubernetes platform engineering, Zero Trust security, and microservices decomposition across GKE, EKS, GCP, and AWS environments serving 500K+ users at 99.97% availability.
    `,
    contact: () => `
REDIRECTING SHELL NETWORKS:
  - LinkedIn : <a href="https://linkedin.com/in/aryashreep" target="_blank" class="accent-text">linkedin.com/in/aryashreep</a>
  - GitHub   : <a href="https://github.com/aryashreep" target="_blank" class="accent-text">github.com/aryashreep</a>
  - Email    : <a href="mailto:aryashreep@gmail.com" class="accent-text">aryashreep@gmail.com</a>
  - Phone    : <a href="tel:+918147450705" class="accent-text">+91 8147450705</a>
  - WhatsApp : <a href="https://whatsapp.com/channel/0029Vb7P7MH4inozftn5oy26" target="_blank" class="accent-text">whatsapp.com/channel/0029Vb7P7MH4inozftn5oy26</a>
  - YouTube  : <a href="https://www.youtube.com/@AryashreePritikrishna" target="_blank" class="accent-text">youtube.com/@AryashreePritikrishna</a>
    `,
    sudo: () => `<span style="color: #ff5f57;">[ACCESS DENIED] User 'arya' is not in the sudoers file. This incident has been logged and reported.</span>`
  };

  shellInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const commandText = shellInput.value.trim();
      const cmdRaw = commandText.toLowerCase();
      
      // Print command line
      const userLine = document.createElement("p");
      userLine.innerHTML = `<span class="shell-prompt">arya@platform:~$</span> ${commandText}`;
      shellOutput.appendChild(userLine);

      if (cmdRaw === "clear") {
        shellOutput.innerHTML = "";
      } else if (shellCommands[cmdRaw]) {
        const result = document.createElement("div");
        result.style.whiteSpace = "pre-line";
        result.innerHTML = shellCommands[cmdRaw]();
        shellOutput.appendChild(result);
      } else if (commandText !== "") {
        const errorLine = document.createElement("p");
        errorLine.innerHTML = `bash: command not found: <span style="color: #ff5f57;">${commandText}</span>. Type <span class="accent-text">'help'</span> for operations list.`;
        shellOutput.appendChild(errorLine);
      }

      shellInput.value = "";
      updateCustomCursor();
      
      // Auto scroll down shell window
      if (shellBody) {
        shellBody.scrollTop = shellBody.scrollHeight;
      }
    }
  });
}

/* ==========================================================================
   05. TECH STACK INTERACTIVE DATA DETAILS
   ========================================================================== */
function initTechStackTooltips() {
  const techTags = document.querySelectorAll(".tech-tag");
  const techDetails = document.getElementById("tech-details");

  if (!techDetails) return;

  techTags.forEach((tag) => {
    tag.addEventListener("mouseenter", () => {
      const desc = tag.getAttribute("data-desc");
      const name = tag.querySelector(".tag-name").textContent;
      
      // Simulate real-time console feedback
      techDetails.innerHTML = `&gt; <span class="accent-text">[QUERYING TOOL DATA]</span>: <b>${name}</b><br>&gt; <span class="color-text-secondary">${desc}</span>`;
      techDetails.style.borderColor = "var(--color-accent)";
    });

    tag.addEventListener("mouseleave", () => {
      techDetails.innerHTML = `&gt; Hover over a technology tag to inspect system architecture integration details.`;
      techDetails.style.borderColor = "var(--color-border)";
    });
  });
}

/* ==========================================================================
   06. FOOTER CONTROLS & INTERACTIONS
   ========================================================================== */
function initFooterControls() {
  // Escalating page scroll to top
  const escBtn = document.getElementById("btn-escalate-top");
  if (escBtn) {
    escBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

/* ==========================================================================
   07. SCROLL REVEAL & INTERACTION CONTROLS
   ========================================================================== */
function initScrollAnimations() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  // Dynamic Highlight Active Section in Navbar
  function handleNavScroll() {
    let scrollPos = window.scrollY + 180; // offset matches header heights

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("data-sec") === id) {
            link.classList.add("active");
          }
        });
      }
    });

    // Reveal animations on entering viewport
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;

    reveals.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 120;

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("active");
      }
    });
  }

  // Setup reveal class on target elements
  const itemsToReveal = [
    ".solution-card",
    ".repo-panel",
    ".writing-item",
    ".status-panel",
    ".tech-panel",
    ".cert-card",
    ".contact-networks",
    ".world-map-panel",
    ".newsletter-panel"
  ];

  itemsToReveal.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add("reveal");
    });
  });

  window.addEventListener("scroll", handleNavScroll);
  // Trigger once at load
  handleNavScroll();
}

/* ==========================================================================
   08. 3D ASCII CUBE PROJECTION ENGINE
   ========================================================================== */
function init3DCubeProjection() {
  const container = document.getElementById("cube-projection");
  if (!container) return;

  const width = 60;
  const height = 22;

  // 3D Cube Vertices (8 corners)
  const vertices = [
    [-1, -1, -1], [ 1, -1, -1], [ 1,  1, -1], [-1,  1, -1],
    [-1, -1,  1], [ 1, -1,  1], [ 1,  1,  1], [-1,  1,  1]
  ];

  // 3D Cube Edges (12 lines connecting the corners)
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // Back face
    [4, 5], [5, 6], [6, 7], [7, 4], // Front face
    [0, 4], [1, 5], [2, 6], [3, 7]  // Side edges
  ];

  let angleX = 0;
  let angleY = 0;
  let angleZ = 0;

  let speedMultiplier = 1.0;

  // Add mouse interaction to speed up rotation on hover
  const parentPanel = document.querySelector(".world-map-panel");
  if (parentPanel) {
    parentPanel.addEventListener("mouseenter", () => {
      speedMultiplier = 3.0;
    });
    parentPanel.addEventListener("mouseleave", () => {
      speedMultiplier = 1.0;
    });
  }

  // Bresenham's Line Drawing Algorithm for character grids
  function drawLine(x0, y0, x1, y1, char, buffer) {
    x0 = Math.floor(x0);
    y0 = Math.floor(y0);
    x1 = Math.floor(x1);
    y1 = Math.floor(y1);

    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = (x0 < x1) ? 1 : -1;
    const sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
      if (x0 >= 0 && x0 < width && y0 >= 0 && y0 < height) {
        buffer[y0][x0] = char;
      }

      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
  }

  function renderFrame() {
    // 1. Initialize buffer with empty background points (·)
    const buffer = Array.from({ length: height }, () => Array(width).fill('<span class="cube-i">·</span>'));

    // 2. Increment rotation angles
    angleX += 0.015 * speedMultiplier;
    angleY += 0.02 * speedMultiplier;
    angleZ += 0.008 * speedMultiplier;

    // 3. Project and transform vertices
    const projected = [];
    const radX = angleX;
    const radY = angleY;
    const radZ = angleZ;

    vertices.forEach(([x, y, z]) => {
      // Rotation around X axis
      let y1 = y * Math.cos(radX) - z * Math.sin(radX);
      let z1 = y * Math.sin(radX) + z * Math.cos(radX);

      // Rotation around Y axis
      let x2 = x * Math.cos(radY) + z1 * Math.sin(radY);
      let z2 = -x * Math.sin(radY) + z1 * Math.cos(radY);

      // Rotation around Z axis
      let x3 = x2 * Math.cos(radZ) - y1 * Math.sin(radZ);
      let y3 = x2 * Math.sin(radZ) + y1 * Math.cos(radZ);

      // Perspective Projection
      const distance = 2.5;
      const zoomX = width * 0.45;
      const zoomY = height * 0.8; // Aspect ratio correction for monospace fonts

      const scale = 1 / (distance + z2 * 0.5);
      const px = Math.floor(width / 2 + x3 * scale * zoomX);
      const py = Math.floor(height / 2 + y3 * scale * zoomY);

      projected.push([px, py]);
    });

    // 4. Draw Edges
    edges.forEach(([u, v]) => {
      const [x0, y0] = projected[u];
      const [x1, y1] = projected[v];
      drawLine(x0, y0, x1, y1, '<span class="cube-edge">o</span>', buffer);
    });

    // 5. Draw Vertices (Corners) as glowing nodes
    projected.forEach(([x, y]) => {
      if (x >= 0 && x < width && y >= 0 && y < height) {
        buffer[y][x] = '<span class="cube-node">●</span>';
      }
    });

    // 6. Convert buffer to HTML string
    const frameHTML = buffer.map(row => row.join("")).join("\n");
    container.innerHTML = frameHTML;

    // Update telemetry log panels
    const telX = document.getElementById("telemetry-rx");
    const telY = document.getElementById("telemetry-ry");
    const telZ = document.getElementById("telemetry-rz");
    if (telX) telX.textContent = (angleX % (2 * Math.PI)).toFixed(2);
    if (telY) telY.textContent = (angleY % (2 * Math.PI)).toFixed(2);
    if (telZ) telZ.textContent = (angleZ % (2 * Math.PI)).toFixed(2);

    requestAnimationFrame(renderFrame);
  }

  renderFrame();
}
