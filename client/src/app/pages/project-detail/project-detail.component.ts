import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService, Project } from '../../core/services/api.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="project-detail">
      <div class="container">
        <a routerLink="/" fragment="projects" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Projects
        </a>

        @if (project(); as p) {
          <article class="project-content">
            <header class="project-header">
              @if (p.isFeatured) {
                <span class="featured-badge">⭐ Featured Project</span>
              }
              <h1>{{ p.title }}</h1>
              <p class="description">{{ p.longDescription || p.description }}</p>

              <div class="tech-stack">
                @for (tech of p.technologies; track tech) {
                  <span class="tech-badge">{{ tech }}</span>
                }
              </div>

              <div class="actions">
                @if (p.githubUrl) {
                  <a [href]="p.githubUrl" target="_blank" rel="noopener" class="action-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                    View Source Code
                  </a>
                }
                @if (p.demoUrl) {
                  <a [href]="p.demoUrl" target="_blank" rel="noopener" class="action-btn primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    Live Demo
                  </a>
                }
              </div>
            </header>

            @if (p.features && p.features.length > 0) {
              <section class="features-section">
                <h2>Key Features</h2>
                <ul class="features-list">
                  @for (feature of p.features; track feature) {
                    <li>{{ feature }}</li>
                  }
                </ul>
              </section>
            }
          </article>
        } @else {
          <div class="loading">
            <div class="skeleton"></div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .project-detail {
      min-height: 100vh;
      padding: 6rem 2rem 4rem;
      background: var(--bg-primary);
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-secondary);
      text-decoration: none;
      margin-bottom: 2rem;
      font-size: 0.95rem;
      transition: color 0.2s;

      &:hover {
        color: var(--accent-primary);
      }
    }

    .project-header {
      margin-bottom: 3rem;

      h1 {
        font-size: clamp(2rem, 5vw, 3rem);
        font-weight: 800;
        color: var(--text-primary);
        margin-bottom: 1rem;
      }

      .description {
        font-size: 1.1rem;
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: 1.5rem;
      }
    }

    .featured-badge {
      display: inline-block;
      color: var(--accent-primary);
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 2rem;
    }

    .tech-badge {
      background: var(--bg-secondary);
      color: var(--text-secondary);
      padding: 0.4rem 0.8rem;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: 10px;
      font-size: 0.95rem;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s;
      background: var(--bg-secondary);
      color: var(--text-primary);
      border: 1px solid var(--border-color);

      &:hover {
        border-color: var(--accent-primary);
        color: var(--accent-primary);
      }

      &.primary {
        background: var(--accent-primary);
        color: white;
        border-color: var(--accent-primary);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(37, 99, 235, 0.3);
        }
      }
    }

    .features-section {
      background: var(--bg-secondary);
      padding: 2rem;
      border-radius: 16px;
      border: 1px solid var(--border-color);

      h2 {
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 1.5rem;
      }
    }

    .features-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        position: relative;
        padding-left: 1.75rem;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
        color: var(--text-secondary);
        line-height: 1.6;

        &:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        &::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--accent-primary);
          font-weight: 700;
        }
      }
    }

    .loading {
      .skeleton {
        height: 400px;
        background: linear-gradient(90deg, var(--bg-secondary) 25%, var(--bg-tertiary) 50%, var(--bg-secondary) 75%);
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
export class ProjectDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);

  readonly project = signal<Project | null>(null);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.apiService.getProjectBySlug(slug).subscribe({
        next: (response) => {
          if (response.success) {
            this.project.set(response.data);
          }
        }
      });
    }
  }
}
