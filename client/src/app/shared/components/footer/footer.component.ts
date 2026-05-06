import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-brand">
            <h3 class="logo">Rishab Sood</h3>
            <p class="tagline">Senior MEAN Stack Developer</p>
          </div>

          <div class="footer-links">
            <div class="link-group">
              <h4>Quick Links</h4>
              <a (click)="navigateToSection('about')">About</a>
              <a (click)="navigateToSection('experience')">Experience</a>
              <a (click)="navigateToSection('projects')">Projects</a>
              <a (click)="navigateToSection('contact')">Contact</a>
            </div>

            <div class="link-group">
              <h4>Connect</h4>
              <a href="https://github.com/rishabsood9" target="_blank" rel="noopener">GitHub</a>
              <a href="https://linkedin.com/in/rishabsood" target="_blank" rel="noopener">LinkedIn</a>
              <a href="https://twitter.com/rishabsood1" target="_blank" rel="noopener">Twitter</a>
              <a href="mailto:rishabsood9@gmail.com">Email</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="copyright">
            &copy; {{ currentYear }} Rishab Sood. Built with Angular & Node.js
          </p>
          <button class="back-to-top" (click)="scrollToTop()" aria-label="Back to top">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--bg-secondary);
      padding: 4rem 2rem 2rem;
      border-top: 1px solid var(--border-color);
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 3rem;
      margin-bottom: 3rem;
    }

    .footer-brand {
      .logo {
        font-size: 1.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 0.5rem;
      }

      .tagline {
        color: var(--text-secondary);
        font-size: 0.9rem;
      }
    }

    .footer-links {
      display: flex;
      gap: 4rem;

      @media (max-width: 600px) {
        flex-direction: column;
        gap: 2rem;
      }
    }

    .link-group {
      h4 {
        color: var(--text-primary);
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      a {
        display: block;
        color: var(--text-secondary);
        text-decoration: none;
        margin-bottom: 0.5rem;
        transition: color 0.3s ease;
        cursor: pointer;

        &:hover {
          color: var(--accent-primary);
        }
      }
    }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 2rem;
      border-top: 1px solid var(--border-color);

      @media (max-width: 480px) {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }

    .copyright {
      color: var(--text-tertiary);
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .footer {
        padding: 3rem 1.5rem 1.5rem;
      }

      .footer-content {
        flex-direction: column;
        gap: 2rem;
        text-align: center;
      }

      .footer-links {
        justify-content: center;
      }
    }

    .back-to-top {
      background: var(--bg-tertiary);
      border: none;
      padding: 0.75rem;
      border-radius: 50%;
      cursor: pointer;
      color: var(--text-primary);
      transition: all 0.3s ease;

      &:hover {
        background: var(--accent-primary);
        color: white;
        transform: translateY(-3px);
      }
    }
  `]
})
export class FooterComponent {
  private readonly scrollService = inject(ScrollService);
  private readonly router = inject(Router);

  readonly currentYear = new Date().getFullYear();

  navigateToSection(sectionId: string): void {
    // Check if we're on the home page
    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      this.scrollService.scrollTo(sectionId);
    } else {
      // Navigate to home page first, then scroll after navigation completes
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.scrollService.scrollTo(sectionId);
        }, 100);
      });
    }
  }

  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }
}
