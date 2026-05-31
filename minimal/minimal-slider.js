const sliderTracks = document.querySelectorAll(".slider-track");
const slideInterval = 3800;

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
