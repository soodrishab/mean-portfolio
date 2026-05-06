import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header
      class="navbar"
      [class.scrolled]="scrollService.isScrolled()"
      [class.mobile-open]="isMobileMenuOpen()"
    >
      <div class="navbar-container">
        <a class="logo" routerLink="/" (click)="goHome()">
          <span class="logo-text">RS</span>
        </a>

        <nav class="nav-links" [class.open]="isMobileMenuOpen()">
          @for (item of navItems; track item.id) {
            <a
              class="nav-link"
              [class.active]="scrollService.activeSection() === item.id"
              (click)="scrollTo(item.id)"
            >
              {{ item.label }}
            </a>
          }
          <a class="nav-link game-link" routerLink="/games" (click)="closeMobileMenu()">
            🎮 Games
          </a>
        </nav>

        <div class="nav-actions">
          <button
            class="theme-toggle"
            (click)="themeService.toggleTheme()"
            [attr.aria-label]="themeService.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            @if (themeService.isDark()) {
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            }
          </button>

          <a
            class="cta-button"
            href="/assets/resume/Rishab_Sood_Resume.pdf"
            target="_blank"
            rel="noopener"
          >
            Resume
          </a>

          <button
            class="mobile-toggle"
            (click)="toggleMobileMenu()"
            [attr.aria-label]="isMobileMenuOpen() ? 'Close menu' : 'Open menu'"
          >
            <span class="hamburger" [class.open]="isMobileMenuOpen()">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      <div class="scroll-progress">
        <div
          class="progress-bar"
          [style.width.%]="scrollService.scrollProgress()"
        ></div>
      </div>
    </header>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 1rem 2rem;
      transition: all 0.3s ease;
      background: transparent;

      &.scrolled {
        background: var(--bg-primary);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        padding: 0.75rem 2rem;
      }
    }

    .navbar-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      cursor: pointer;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      text-decoration: none;

      .logo-text {
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }

    .nav-links {
      display: flex;
      gap: 2rem;

      @media (max-width: 768px) {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--bg-primary);
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;

        &.open {
          opacity: 1;
          visibility: visible;
        }
      }
    }

    .nav-link {
      color: var(--text-secondary);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
      cursor: pointer;
      position: relative;

      &:hover,
      &.active {
        color: var(--accent-primary);
      }

      &.active::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--accent-primary);
        border-radius: 2px;
      }

      &.game-link {
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 600;
      }

      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .theme-toggle {
      background: none;
      border: none;
      color: var(--text-primary);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      &:hover {
        background: var(--bg-secondary);
        color: var(--accent-primary);
      }
    }

    .cta-button {
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      color: white;
      padding: 0.5rem 1.25rem;
      border-radius: 25px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
      }

      @media (max-width: 768px) {
        display: none;
      }
    }

    .mobile-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      z-index: 1001;

      @media (max-width: 768px) {
        display: block;
      }
    }

    .hamburger {
      display: flex;
      flex-direction: column;
      gap: 5px;

      span {
        width: 24px;
        height: 2px;
        background: var(--text-primary);
        transition: all 0.3s ease;
      }

      &.open {
        span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        span:nth-child(2) {
          opacity: 0;
        }
        span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
      }
    }

    .scroll-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--bg-tertiary);
    }

    .progress-bar {
      height: 100%;
      background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
      transition: width 0.1s ease;
    }
  `]
})
export class NavbarComponent {
  private readonly router = inject(Router);
  readonly themeService = inject(ThemeService);
  readonly scrollService = inject(ScrollService);

  readonly isMobileMenuOpen = signal(false);

  readonly navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  goHome(): void {
    this.router.navigate(['/']);
    this.isMobileMenuOpen.set(false);
  }

  scrollTo(sectionId: string): void {
    // If not on main page, navigate first
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.scrollService.scrollTo(sectionId);
        }, 100);
      });
    } else {
      this.scrollService.scrollTo(sectionId);
    }
    this.isMobileMenuOpen.set(false);
  }
}
