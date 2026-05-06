import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Profile } from '../../core/services/api.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="about-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">About Me</span>
          <h2 class="section-title">Know Me Better</h2>
        </div>

        @if (profile(); as p) {
          <div class="about-content">
            <div class="about-text">
              <p class="summary">{{ p.summary }}</p>

              <div class="highlights">
                <h3>Core Competencies</h3>
                <div class="highlight-tags">
                  @for (highlight of p.highlights; track highlight) {
                    <span class="tag">{{ highlight }}</span>
                  }
                </div>
              </div>

              <div class="info-grid">
                <div class="info-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <div>
                    <span class="label">Name</span>
                    <span class="value">{{ p.name }}</span>
                  </div>
                </div>

                <div class="info-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <div>
                    <span class="label">Email</span>
                    <a class="value" [href]="'mailto:' + p.email">{{ p.email }}</a>
                  </div>
                </div>

                <div class="info-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <div>
                    <span class="label">Location</span>
                    <span class="value">{{ p.location }}</span>
                  </div>
                </div>

                <div class="info-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                  <div>
                    <span class="label">Experience</span>
                    <span class="value">{{ p.yearsOfExperience }}+ Years</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="about-visual">
              <div class="domain-cards">
                <div class="domain-card">
                  <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                  </div>
                  <h4>Healthcare</h4>
                  <p>HIPAA Compliant</p>
                </div>

                <div class="domain-card">
                  <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                  <h4>Fintech</h4>
                  <p>Trading Platforms</p>
                </div>

                <div class="domain-card">
                  <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                  </div>
                  <h4>Energy</h4>
                  <p>Bill Automation</p>
                </div>

                <div class="domain-card">
                  <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                    </svg>
                  </div>
                  <h4>AI & Agentic</h4>
                  <p>Claude Integration</p>
                </div>
              </div>
            </div>
          </div>
        } @else {
          <div class="loading-skeleton">
            <div class="skeleton"></div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .about-section {
      padding: 6rem 2rem;
      background: var(--bg-secondary);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;

      .section-tag {
        display: inline-block;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .section-title {
        font-size: clamp(2rem, 4vw, 2.5rem);
        font-weight: 700;
        color: var(--text-primary);
      }
    }

    .about-content {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 4rem;
      align-items: start;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    .about-text {
      .summary {
        font-size: 1.1rem;
        line-height: 1.8;
        color: var(--text-secondary);
        margin-bottom: 2rem;
      }

      .highlights {
        margin-bottom: 2rem;

        h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .highlight-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .tag {
          background: var(--bg-primary);
          padding: 0.5rem 1rem;
          border-radius: 25px;
          font-size: 0.9rem;
          color: var(--accent-primary);
          border: 1px solid var(--accent-primary);
        }
      }
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }

      .info-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
        background: var(--bg-primary);
        border-radius: 12px;
        border: 1px solid var(--border-color);

        svg {
          color: var(--accent-primary);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .label {
          display: block;
          font-size: 0.85rem;
          color: var(--text-tertiary);
          margin-bottom: 0.25rem;
        }

        .value {
          display: block;
          font-weight: 600;
          color: var(--text-primary);
        }

        a.value {
          text-decoration: none;
          transition: color 0.3s ease;

          &:hover {
            color: var(--accent-primary);
          }
        }
      }
    }

    .about-visual {
      .domain-cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;

        @media (max-width: 600px) {
          grid-template-columns: 1fr;
        }
      }

      .domain-card {
        background: var(--bg-primary);
        padding: 1.5rem;
        border-radius: 16px;
        border: 1px solid var(--border-color);
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          border-color: var(--accent-primary);
          box-shadow: 0 10px 30px rgba(79, 172, 254, 0.1);
        }

        .icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;

          svg {
            color: white;
          }
        }

        h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        p {
          font-size: 0.9rem;
          color: var(--text-tertiary);
        }
      }
    }

    .loading-skeleton {
      .skeleton {
        height: 400px;
        background: linear-gradient(90deg, var(--bg-primary) 25%, var(--bg-tertiary) 50%, var(--bg-primary) 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 16px;
      }
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `]
})
export class AboutComponent implements OnInit {
  private readonly apiService = inject(ApiService);

  readonly profile = signal<Profile | null>(null);

  ngOnInit(): void {
    this.apiService.getProfile().subscribe({
      next: (response) => {
        if (response.success) {
          this.profile.set(response.data);
        }
      }
    });
  }
}
