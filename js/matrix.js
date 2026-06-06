/*
 * MATRIX DIGITAL RAIN ENGINE
 * Renders a high-performance, low-opacity terminal background stream.
 */

(function () {
  const canvas = document.getElementById("matrix-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  
  // Matrix characters configuration (Katakana + Latin + Binary)
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ".split("");
  const fontSize = 14;
  
  let columns = 0;
  let drops = [];
  let speeds = [];

  // Initialize canvas coordinates
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    columns = Math.floor(canvas.width / fontSize) + 1;
    
    // Rebuild drops and speeds arrays on resize
    const oldLength = drops.length;
    drops.length = columns;
    speeds.length = columns;
    
    for (let i = 0; i < columns; i++) {
      if (i >= oldLength) {
        drops[i] = Math.random() * -100; // start off-screen
        speeds[i] = 1 + Math.random() * 2.5; // randomized drop speeds
      }
    }
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Render loop control
  let lastTime = 0;
  const fps = 24; // Lower frame rate for organic retro feel and low CPU footprint
  const interval = 1000 / fps;

  function draw(timestamp) {
    requestAnimationFrame(draw);
    
    const delta = timestamp - lastTime;
    if (delta < interval) return;
    
    lastTime = timestamp - (delta % interval);

    // Trail overlay color matches design system background
    ctx.fillStyle = "rgba(5, 5, 5, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#65FF8F";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < columns; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Draw random character
      // Highlight leading character with higher brightness
      if (Math.random() > 0.98) {
        ctx.fillStyle = "#ffffff";
      } else {
        ctx.fillStyle = "rgba(101, 255, 143, 0.28)"; // Dim background drops
      }

      ctx.fillText(char, x, y);

      // Reset drop to top with randomized position once off-screen
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
        speeds[i] = 1 + Math.random() * 2.5;
      }
      
      drops[i] += speeds[i] * 0.45; // Move down
    }
  }

  // Start the simulation loop
  requestAnimationFrame(draw);
})();
