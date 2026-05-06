import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly activeSection = signal<string>('');
  readonly scrollProgress = signal<number>(0);
  readonly isScrolled = signal<boolean>(false);

  private sections: string[] = [
    'home',
    'about',
    'experience',
    'projects',
    'skills',
    'contact'
  ];

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollListener();
    }
  }

  private initScrollListener(): void {
    window.addEventListener('scroll', () => {
      this.updateScrollState();
      this.updateActiveSection();
    });
  }

  private updateScrollState(): void {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    this.scrollProgress.set(Math.min(progress, 100));
    this.isScrolled.set(scrollTop > 50);
  }

  private updateActiveSection(): void {
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    for (const sectionId of this.sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          this.activeSection.set(sectionId);
          break;
        }
      }
    }
  }

  scrollTo(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
