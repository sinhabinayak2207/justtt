/* Rakesh home page interactions.
   Extracted verbatim from the template's inline GSAP embeds:
   1. hero -> navbar logo scroll-shrink   2. hero load-in timeline */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('[rakesh scroll-shrink] GSAP or ScrollTrigger not loaded. Enable both in Site Settings → GSAP integration.');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const h1      = document.querySelector('[data-scroll-h1="rakesh"]');
    const logo    = document.querySelector('[data-scroll-logo="rakesh"]');
    const section = document.querySelector('[data-scroll-trigger="rakesh"]');

    if (!h1 || !logo || !section) {
      console.warn('[rakesh scroll-shrink] missing element', { h1, logo, section });
      return;
    }

    // Restrict the animation to tablet + desktop. matchMedia handles teardown
    // automatically when the viewport crosses below 768px.
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      gsap.set(h1, { transformOrigin: 'center center', force3D: true });

      let targetX = 0;
      let targetY = 0;
      let targetScale = 1;

      const measure = () => {
        gsap.set(h1, { x: 0, y: 0, scale: 1 });
        const h1Rect   = h1.getBoundingClientRect();
        const logoRect = logo.getBoundingClientRect();
        const sectionH = section.offsetHeight;

        targetX     = (logoRect.left + logoRect.width / 2) - (h1Rect.left + h1Rect.width / 2);
        const h1CY  = h1Rect.top + h1Rect.height / 2;
        const logoCY = logoRect.top + logoRect.height / 2;
        targetY     = logoCY - (h1CY - sectionH);
        targetScale = logoRect.height / h1Rect.height;
      };
      measure();

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true,
        onRefresh: measure,
        onUpdate(self) {
          const p = self.progress;
          gsap.set(h1, {
            x: targetX * p,
            y: targetY * p,
            scale: 1 + (targetScale - 1) * p,
          });
        },
        onLeave() {
          gsap.set(h1,   { opacity: 0 });
          gsap.set(logo, { opacity: 1 });
        },
        onEnterBack() {
          gsap.set(h1,   { opacity: 1 });
          gsap.set(logo, { opacity: 0 });
        },
      });

      // Cleanup when leaving this breakpoint (e.g. resizing down to mobile).
      return () => {
        st.kill();
        gsap.set(h1,   { clearProps: 'all' });
        gsap.set(logo, { clearProps: 'all' });
      };
    });
  });

document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') {
      console.warn('[rakesh hero-load] GSAP not loaded. Enable it in Site Settings → GSAP integration.');
      return;
    }

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const nav      = document.querySelector('.nav');
      const bg       = document.querySelector('.section_home .home-background');
      const gradient = document.querySelector('.section_home .hero_gradient');
      const h1       = document.querySelector('.section_home .h1-huge');
      const desc     = document.querySelector('.section_home .max-description');
      const cta      = document.querySelector('.section_home .home_layout-content > div:last-child');

      if (!nav || !bg || !gradient || !h1 || !desc || !cta) {
        console.warn('[rakesh hero-load] missing element', { nav, bg, gradient, h1, desc, cta });
        return;
      }

      // Initial states (would normally be CSS; applied via GSAP so the embed
      // stays within the "GSAP custom code" marketplace exception).
      gsap.set(nav,      { opacity: 0, y: -60 });
      gsap.set(bg,       { scale: 1.12 });
      gsap.set(gradient, { opacity: 0 });
      gsap.set(h1,       { clipPath: 'inset(100% 0 0 0)' });
      gsap.set(desc,     { opacity: 0, y: 24 });
      gsap.set(cta,      { opacity: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl
        .to(nav,      { y: 0, opacity: 1, duration: 0.9 }, 0)
        .to(bg,       { scale: 1, duration: 1.6, ease: 'power3.out' }, 0)
        .to(gradient, { opacity: 1, duration: 1.2 }, 0.2)
        .to(h1,       { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'expo.out' }, 0.5)
        .to(desc,     { y: 0, opacity: 1, duration: 0.8 }, 1.0)
        .to(cta,      { y: 0, opacity: 1, duration: 0.8 }, 1.15);

      // matchMedia cleanup: clear inline styles when resizing below 768px so
      // the hero returns to its static template state on mobile.
      return () => {
        tl.kill();
        gsap.set([nav, bg, gradient, h1, desc, cta], { clearProps: 'all' });
      };
    });
  });


/* The elements added after the template's own interactions were baked (the two
   services flank images and the single agent card) are not known to the runtime,
   so give them an equivalent scroll reveal here. */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    // fromTo with immediateRender:false, not from(): a .from() tween hides the element
    // the moment it is created, so anything that stops ScrollTrigger from firing leaves
    // the content permanently invisible. This way the element renders normally and only
    // dips to its start state when the trigger actually runs.
    gsap.fromTo(
      el,
      { opacity: 0, y: 48 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'expo.out',
        immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    );
  });
});
