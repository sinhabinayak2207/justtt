const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuOpen = document.querySelector("[data-menu-open]");
const menuClose = document.querySelector("[data-menu-close]");
const menuLinks = document.querySelectorAll("[data-menu-link]");
const hero = document.querySelector("[data-hero]");
const heroTitle = document.querySelector('[data-scroll-h1="doorly"]');
const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");
const parallaxItems = document.querySelectorAll("[data-parallax]");
const darkSections = document.querySelectorAll("[data-dark-section]");
const slider = document.querySelector("[data-slider]");
const quotes = slider ? Array.from(slider.querySelectorAll(".quote")) : [];
const sliderButtons = slider ? Array.from(slider.querySelectorAll("[data-slide]")) : [];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const openMenu = () => {
  menu?.classList.add("is-open");
  menu?.setAttribute("aria-hidden", "false");
  document.body.classList.add("menu-open");
};

const closeMenu = () => {
  menu?.classList.remove("is-open");
  menu?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("menu-open");
};

menuOpen?.addEventListener("click", openMenu);
menuClose?.addEventListener("click", closeMenu);
menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const updateScrollMotion = () => {
  const scrollY = window.scrollY;
  const heroHeight = hero?.offsetHeight || window.innerHeight;
  const heroProgress = Math.min(scrollY / Math.max(heroHeight, 1), 1);
  const headerProbeY = 42;
  const isDarkSection = Array.from(darkSections).some((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= headerProbeY && rect.bottom >= headerProbeY;
  });

  header?.classList.toggle("has-logo", scrollY > 80);
  header?.classList.toggle("is-light", !isDarkSection);

  if (heroTitle) {
    const translateY = Math.round(heroProgress * 560 * 1000) / 1000;
    const scale = Math.max(0.28, Math.round((1 - heroProgress * 0.86) * 10000) / 10000);
    heroTitle.style.transform = heroProgress <= 0.001
      ? "translate3d(0px, 0px, 0px)"
      : `translate3d(0px, ${translateY}px, 0px) scale(${scale}, ${scale})`;
    heroTitle.style.clipPath = "inset(0% 0px 0px)";
  }

  parallaxItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const speed = Number(item.dataset.speed || 0);
    const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
    item.style.setProperty("--parallax", String(Math.round(centerOffset * speed)));
  });
};

let ticking = false;
const requestScrollMotion = () => {
  if (ticking || reducedMotion) {
    return;
  }

  ticking = true;
  requestAnimationFrame(() => {
    updateScrollMotion();
    ticking = false;
  });
};

updateScrollMotion();
window.addEventListener("scroll", requestScrollMotion, { passive: true });
window.addEventListener("resize", updateScrollMotion);

if (reducedMotion) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealVisibleItems = () => {
    const revealLine = window.scrollY + window.innerHeight * 0.84;

    revealItems.forEach((item) => {
      if (item.classList.contains("is-visible")) {
        return;
      }

      const rect = item.getBoundingClientRect();
      const itemTop = rect.top + window.scrollY;
      if (itemTop < revealLine) {
        item.classList.add("is-visible");
      }
    });
  };

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;
    revealObserver.observe(item);
  });

  revealVisibleItems();
  window.addEventListener("scroll", revealVisibleItems, { passive: true });
  window.addEventListener("resize", revealVisibleItems);
}

const animateCounter = (counter) => {
  const target = Number(counter.dataset.count);
  const duration = 1100;
  const startTime = performance.now();

  const tick = (time) => {
    const progress = Math.min((time - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = Math.round(target * eased);

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.55 },
);

counters.forEach((counter) => counterObserver.observe(counter));

let currentQuote = 0;
const showQuote = (index) => {
  currentQuote = index;
  quotes.forEach((quote, quoteIndex) => {
    quote.classList.toggle("is-active", quoteIndex === currentQuote);
  });
  sliderButtons.forEach((button, buttonIndex) => {
    button.classList.toggle("is-active", buttonIndex === currentQuote);
  });
};

if (quotes.length) {
  showQuote(0);
  sliderButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showQuote(Number(button.dataset.slide));
    });
  });

  if (!reducedMotion) {
    slider.addEventListener("mouseenter", () => showQuote((currentQuote + 1) % quotes.length));
  }
}
