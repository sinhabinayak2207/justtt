const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");
const floatingMedia = document.querySelector("[data-float]");
const slider = document.querySelector("[data-slider]");
const quotes = slider ? Array.from(slider.querySelectorAll(".quote")) : [];
const sliderButtons = slider ? Array.from(slider.querySelectorAll("[data-slide]")) : [];
const form = document.querySelector(".contact-form");
const toast = document.querySelector(".toast");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (reducedMotion) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealVisibleItems = () => {
    revealItems.forEach((item) => {
      if (item.classList.contains("is-visible")) {
        return;
      }

      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
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
    { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    revealObserver.observe(item);
  });

  revealVisibleItems();
  window.addEventListener("scroll", revealVisibleItems, { passive: true });
  window.addEventListener("resize", revealVisibleItems);
}

const animateCounter = (counter) => {
  const target = Number(counter.dataset.count);
  const duration = 1200;
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
  { threshold: 0.6 },
);

counters.forEach((counter) => counterObserver.observe(counter));

if (floatingMedia && !reducedMotion) {
  floatingMedia.addEventListener("mousemove", (event) => {
    const rect = floatingMedia.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    floatingMedia.style.transform = `translate3d(${x * 10}px, ${y * 10}px, 0)`;
  });

  floatingMedia.addEventListener("mouseleave", () => {
    floatingMedia.style.transform = "translate3d(0, 0, 0)";
  });
}

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
    window.setInterval(() => {
      showQuote((currentQuote + 1) % quotes.length);
    }, 4200);
  }
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  toast?.classList.add("is-visible");
  form.reset();
  window.setTimeout(() => toast?.classList.remove("is-visible"), 1800);
});
