const sliderTracks = document.querySelectorAll(".slider-track");
const slideInterval = 3800;
const sidebarMenu = document.querySelector(".sidebar-menu");
const menuToggle = document.querySelector(".menu-toggle");
const sidebarClose = document.querySelector(".sidebar-close");

if (sidebarMenu && menuToggle && sidebarClose) {
  const setSidebarOpen = (isOpen) => {
    sidebarMenu.classList.toggle("is-open", isOpen);
    sidebarMenu.setAttribute("aria-hidden", String(!isOpen));
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  };

  menuToggle.addEventListener("click", () => {
    setSidebarOpen(!sidebarMenu.classList.contains("is-open"));
  });

  sidebarClose.addEventListener("click", () => {
    setSidebarOpen(false);
    menuToggle.focus();
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
