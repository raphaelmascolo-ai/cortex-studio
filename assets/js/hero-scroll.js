/* ============================================================
   HERO VIDEO — Scroll-driven parallax & fade
   - Video zooms slightly as you scroll
   - Content fades out and moves up
   - Overlay darkens progressively
   - Smooth, performant (requestAnimationFrame)
   ============================================================ */

(function () {
  const hero = document.querySelector('.hero-video-section');
  if (!hero) return;

  const video = hero.querySelector('.hero-video');
  const overlay = hero.querySelector('.hero-video-overlay');
  const content = hero.querySelector('.hero-scroll-content');
  const scrollIndicator = hero.querySelector('.hero-scroll-indicator');

  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      const heroH = hero.offsetHeight;

      // How far we've scrolled past the top of the hero (0 at top, 1 at bottom)
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / heroH);

      // Video: subtle zoom (1x → 1.15x)
      if (video) {
        const scale = 1 + progress * 0.15;
        video.style.transform = `scale(${scale})`;
      }

      // Overlay: darken from base to almost black
      if (overlay) {
        const baseOpacity = 0.3;
        const maxOpacity = 0.9;
        const opacity = baseOpacity + progress * (maxOpacity - baseOpacity);
        overlay.style.background = `rgba(12, 15, 26, ${opacity})`;
      }

      // Content: fade out + move up
      if (content) {
        const contentFade = Math.max(0, 1 - progress * 2.5); // fades out in first 40% of scroll
        const contentShift = progress * -60; // moves up 60px
        content.style.opacity = contentFade;
        content.style.transform = `translateY(${contentShift}px)`;
      }

      // Scroll indicator: fade out quickly
      if (scrollIndicator) {
        const indicatorFade = Math.max(0, 1 - progress * 5); // fades in first 20%
        scrollIndicator.style.opacity = indicatorFade;
      }

      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();
