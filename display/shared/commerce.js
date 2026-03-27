export function initCommerceMotion() {
  const loader = document.querySelector('[data-loader]');
  const revealItems = document.querySelectorAll('[data-reveal]');
  const cardItems = document.querySelectorAll('[data-card]');
  let hasRun = false;

  const hideLoader = () => {
    if (!loader) return;
    loader.classList.add('hidden');
    window.setTimeout(() => loader.remove(), 700);
  };

  const initCursor = () => {
    const root = document.body;
    if (!root) return;

    const prefersCoarse = window.matchMedia?.('(pointer: coarse)')?.matches;
    if (prefersCoarse) {
      root.style.cursor = 'auto';
      const existing = document.querySelector('.cursor');
      existing?.remove();
      return;
    }

    let cursor = document.querySelector('.cursor');
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.className = 'cursor';
      document.body.appendChild(cursor);
    }

    window.addEventListener(
      'pointermove',
      (event) => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
      },
      { passive: true }
    );
  };

  const revealFallback = () => {
    if (revealItems.length) {
      revealItems.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.08}s`;
        el.classList.add('revealed');
      });
    }
  };

  const runMotion = () => {
    if (hasRun) return;
    hasRun = true;

    initCursor();

    const gsap = window.gsap;
    if (!gsap) {
      revealFallback();
      hideLoader();
      return;
    }

    try {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (loader) {
        timeline
          .to(loader, { autoAlpha: 0, duration: 0.55 })
          .set(loader, { display: 'none' })
          .call(() => loader.remove());
      }

      if (revealItems.length) {
        timeline.from(
          revealItems,
          {
            y: 28,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            onComplete: revealFallback
          },
          loader ? '-=0.15' : 0
        );
      } else {
        revealFallback();
      }

      if (cardItems.length) {
        timeline.from(
          cardItems,
          {
            y: 22,
            opacity: 0,
            duration: 0.65,
            stagger: 0.08
          },
          '-=0.5'
        );
      }
    } catch (error) {
      revealFallback();
      hideLoader();
    }
  };

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    window.requestAnimationFrame(runMotion);
  } else {
    document.addEventListener('DOMContentLoaded', runMotion, { once: true });
    window.addEventListener('load', runMotion, { once: true });
  }

  window.setTimeout(runMotion, 1600);
  window.setTimeout(hideLoader, 2200);
}

export function wirePageProgress() {
  const progress = document.querySelector('[data-progress-fill]');
  if (!progress) return;

  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, percent))}%`;
  };

  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
}

export function setButtonBusy(button, isBusy, idleText, busyText) {
  if (!button) return;
  button.disabled = isBusy;
  button.textContent = isBusy ? busyText : idleText;
}
