import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'portfolio-theme';

  // Using Angular Signals for reactive state
  readonly theme = signal<Theme>(this.getInitialTheme());
  readonly isDark = signal<boolean>(this.theme() === 'dark');

  constructor() {
    // Effect to sync theme changes
    effect(() => {
      const currentTheme = this.theme();
      this.isDark.set(currentTheme === 'dark');
      this.applyTheme(currentTheme);
      this.saveTheme(currentTheme);
    });

    // Listen for system theme changes
    if (isPlatformBrowser(this.platformId)) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (!this.hasStoredTheme()) {
          this.theme.set(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  private getInitialTheme(): Theme {
    if (isPlatformBrowser(this.platformId)) {
      // Check localStorage first
      const stored = localStorage.getItem(this.storageKey) as Theme | null;
      if (stored && (stored === 'light' || stored === 'dark')) {
        return stored;
      }

      // Fall back to system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  }

  private hasStoredTheme(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.storageKey) !== null;
    }
    return false;
  }

  private applyTheme(theme: Theme): void {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('data-theme', theme);
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(`${theme}-theme`);

      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          'content',
          theme === 'dark' ? '#1a1a2e' : '#ffffff'
        );
      }
    }
  }

  private saveTheme(theme: Theme): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, theme);
    }
  }

  toggleTheme(): void {
    this.theme.update((current) => (current === 'light' ? 'dark' : 'light'));
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }
}
