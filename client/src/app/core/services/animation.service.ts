import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private observer!: IntersectionObserver;
  private initialized = false;

  constructor(private ngZone: NgZone) {}

  init(): void {
    if (this.initialized || typeof window === 'undefined') return;

    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animated');
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -80px 0px',
          threshold: 0.1
        }
      );

      // Observe all elements with data-animate attribute
      this.observeElements();

      // Re-observe on route changes (for lazy-loaded content)
      const mutationObserver = new MutationObserver(() => {
        this.observeElements();
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    });

    this.initialized = true;
  }

  private observeElements(): void {
    const elements = document.querySelectorAll('[data-animate]:not(.observed)');
    elements.forEach(el => {
      el.classList.add('observed');
      this.observer.observe(el);
    });

    // Also handle stagger-children
    const staggerElements = document.querySelectorAll('.stagger-children:not(.observed)');
    staggerElements.forEach(el => {
      el.classList.add('observed');
      this.observer.observe(el);
    });
  }
}
