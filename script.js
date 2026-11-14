// Mobile menu toggle
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// Scroll reveal animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Case study dropdown
document.querySelectorAll(".case-toggle").forEach((btn) => {
  const panel = document.getElementById(btn.getAttribute("aria-controls"));
  if (!panel) return;
  const label = btn.querySelector(".case-label");
  const project = btn.closest(".project");

  const setOpen = (open) => {
    panel.classList.toggle("open", open);
    panel.setAttribute("aria-hidden", String(!open));
    btn.setAttribute("aria-expanded", String(open));
    label.textContent = open ? "Hide case study" : "Case study";
    project.classList.toggle("case-open", open);
    if (open) {
      setTimeout(() => panel.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
    }
  };

  btn.addEventListener("click", () => setOpen(!panel.classList.contains("open")));
  panel.querySelectorAll(".case-close").forEach((closeBtn) =>
    closeBtn.addEventListener("click", () => {
      setOpen(false);
      btn.scrollIntoView({ behavior: "smooth", block: "center" });
    })
  );
});

// Slide viewer (arrows, swipe, dots, keyboard)
document.querySelectorAll(".slider").forEach((slider) => {
  const track = slider.querySelector(".slides");
  const slides = [...track.children];
  const wrap = slider.parentElement;
  const count = wrap.querySelector(".slide-count");
  const dotsWrap = wrap.querySelector(".dots");

  const current = () =>
    track.clientWidth ? Math.round(track.scrollLeft / track.clientWidth) : 0;
  const go = (i) => {
    const n = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: n * track.clientWidth, behavior: "smooth" });
  };

  const dots = slides.map((_, i) => {
    const d = document.createElement("button");
    d.type = "button";
    d.className = "dot";
    d.setAttribute("aria-label", "Go to slide " + (i + 1));
    d.addEventListener("click", () => go(i));
    dotsWrap.appendChild(d);
    return d;
  });

  const update = () => {
    const i = current();
    count.textContent = "Slide " + (i + 1) + " / " + slides.length;
    dots.forEach((d, n) => d.classList.toggle("active", n === i));
  };

  slider.querySelector(".prev").addEventListener("click", () => go(current() - 1));
  slider.querySelector(".next").addEventListener("click", () => go(current() + 1));
  track.addEventListener("scroll", () => requestAnimationFrame(update));
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(current() + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(current() - 1); }
  });
  window.addEventListener("resize", update);
  update();
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();