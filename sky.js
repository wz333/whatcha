// The sky's clouds, with parallax, as on Learn (CloudLayer in HomeView.swift). They sit
// together on one fixed layer that moves up at 0.4 of the scroll (--speed in style.css), so
// they drift by more slowly than the card in front of them. Each hangs off one side of the
// card, partly tucked behind it; on a phone, where the card fills the width, that is the
// screen's edge, as in the app. The page sets --scroll on <html> once a frame while scrolling.
(() => {
  // Learn's clouds: which side, how far down, how wide. The first ones keep clear of the
  // header. Past the end, the list repeats further down.
  const clouds = [
    [true, 190, 120], [false, 66, 130], [false, 300, 110], [true, 510, 110],
    [false, 670, 140], [true, 830, 150], [false, 1050, 120], [true, 1230, 130],
    [false, 1410, 150], [true, 1610, 120], [false, 1810, 130], [true, 2010, 140],
  ];
  const period = 2010 + 200 - 66;

  // CloudShape: a flat-bottomed base with three bumps, in a 100 x 50 box.
  const shape =
    '<path d="M13.75 22.5h72.5a13.75 13.75 0 0 1 0 27.5h-72.5a13.75 13.75 0 0 1 0-27.5z' +
    "M8 30.5a18 15.5 0 1 1 36 0a18 15.5 0 1 1-36 0z" +
    "M30 21a21 21 0 1 1 42 0a21 21 0 1 1-42 0z" +
    'M56 26.5a17 15.5 0 1 1 34 0a17 15.5 0 1 1-34 0z"/>';
  const svg = "http://www.w3.org/2000/svg";
  const root = document.documentElement;
  let layer;

  function draw() {
    layer?.remove();
    layer = document.createElement("div");
    layer.className = "sky";
    layer.setAttribute("aria-hidden", "true");
    layer.innerHTML =
      `<svg width="0" height="0" style="position:absolute"><linearGradient id="cloud-fill" x1="0" y1="0" x2="0" y2="1">` +
      `<stop offset="0" class="cloud-top"/><stop offset="1" class="cloud-bottom"/></linearGradient></svg>`;

    const card = document.querySelector(".card")?.getBoundingClientRect();
    const width = root.clientWidth;
    const cardLeft = card ? card.left : 0;
    const cardRight = card ? card.right : width;
    // Enough clouds to reach the bottom of a fully scrolled page.
    const speed = matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0.4;
    const reach = (root.scrollHeight - innerHeight) * speed + innerHeight;

    for (let round = 0; ; round++) {
      let placed = false;
      for (const [leading, y, w] of clouds) {
        const top = y + round * period;
        if (top > reach) continue;
        placed = true;
        // A third of it behind the card, or off the screen's edge when the card is that close.
        const x = leading
          ? Math.max(-w * 0.35, cardLeft - w * 0.65)
          : Math.min(width - w * 0.6, cardRight - w * 0.35);
        const el = document.createElementNS(svg, "svg");
        el.setAttribute("class", "cloud");
        el.setAttribute("viewBox", "0 0 100 50");
        el.setAttribute("width", w);
        el.setAttribute("height", w / 2);
        el.style.left = x + "px";
        el.style.top = top + "px";
        el.innerHTML = shape;
        layer.append(el);
      }
      if (!placed) break;
    }
    document.body.prepend(layer);
  }

  let queued = false;
  function update() {
    root.style.setProperty("--scroll", scrollY + "px");
    queued = false;
  }
  addEventListener("scroll", () => {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }, { passive: true });

  let width = innerWidth;
  addEventListener("resize", () => {
    if (innerWidth !== width) { width = innerWidth; draw(); }
    update();
  });
  // A question opening on Support makes the page taller.
  document.addEventListener("toggle", draw, true);

  addEventListener("DOMContentLoaded", () => { draw(); update(); });
})();
