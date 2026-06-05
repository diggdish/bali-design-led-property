const sliderTracks = document.querySelectorAll(".slider-track");
const slideInterval = 3800;
const heroInterval = 4600;
const sidebarMenu = document.querySelector(".sidebar-menu");
const menuToggle = document.querySelector(".menu-toggle");
const sidebarRows = document.querySelectorAll(".sidebar-row");
const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
const heroDots = Array.from(document.querySelectorAll(".hero-dots button"));

if (sidebarMenu && menuToggle) {
  const setSidebarOpen = (isOpen) => {
    sidebarMenu.classList.toggle("is-open", isOpen);
    sidebarMenu.setAttribute("aria-hidden", String(!isOpen));
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  };

  menuToggle.addEventListener("click", () => {
    setSidebarOpen(!sidebarMenu.classList.contains("is-open"));
  });

  sidebarMenu.addEventListener("click", (event) => {
    if (event.target === sidebarMenu || event.target.closest("a")) {
      setSidebarOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && sidebarMenu.classList.contains("is-open")) {
      setSidebarOpen(false);
      menuToggle.focus();
    }
  });
}

sidebarRows.forEach((row) => {
  const toggle = row.querySelector(".sidebar-row-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = row.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
});

if (heroSlides.length > 1 && heroDots.length === heroSlides.length) {
  let heroIndex = 0;

  const setHeroSlide = (nextIndex) => {
    heroIndex = (nextIndex + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === heroIndex);
    });

    heroDots.forEach((dot, index) => {
      const isActive = index === heroIndex;
      dot.classList.toggle("is-active", isActive);
      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => setHeroSlide(index));
  });

  setInterval(() => setHeroSlide(heroIndex + 1), heroInterval);
}

sliderTracks.forEach((track) => {
  const slides = Array.from(track.querySelectorAll(".slide"));
  if (slides.length < 2) return;

  let index = 0;
  let paused = false;

  const goToSlide = (nextIndex) => {
    index = nextIndex % slides.length;
    track.scrollTo({
      left: slides[index].offsetLeft,
      behavior: "smooth",
    });
  };

  const advance = () => {
    if (paused) return;
    goToSlide(index + 1);
  };

  track.addEventListener("mouseenter", () => {
    paused = true;
  });

  track.addEventListener("mouseleave", () => {
    paused = false;
  });

  track.addEventListener("focusin", () => {
    paused = true;
  });

  track.addEventListener("focusout", () => {
    paused = false;
  });

  track.addEventListener(
    "scroll",
    () => {
      const current = Math.round(track.scrollLeft / track.clientWidth);
      index = Math.max(0, Math.min(slides.length - 1, current));
    },
    { passive: true },
  );

  setInterval(advance, slideInterval);
});
