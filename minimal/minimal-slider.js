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
  const slider = track.closest(".project-slider");
  const dots = document.createElement("div");
  const dotButtons = slides.map((_, slideIndex) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show project image ${slideIndex + 1}`);
    dots.appendChild(dot);
    return dot;
  });

  let index = 0;
  let paused = false;

  dots.className = "slider-dots";
  dots.setAttribute("aria-label", "Project image controls");
  if (slider) slider.appendChild(dots);

  const setActiveDot = () => {
    dotButtons.forEach((dot, dotIndex) => {
      const isActive = dotIndex === index;
      dot.classList.toggle("is-active", isActive);
      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  const goToSlide = (nextIndex) => {
    index = nextIndex % slides.length;
    setActiveDot();
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
      setActiveDot();
    },
    { passive: true },
  );

  dotButtons.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      paused = true;
      goToSlide(dotIndex);
      window.setTimeout(() => {
        paused = false;
      }, slideInterval);
    });
  });

  setActiveDot();
  setInterval(advance, slideInterval);
});
