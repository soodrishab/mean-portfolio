import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Experience } from '../../core/services/api.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="experience-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Career Journey</span>
          <h2 class="section-title">Professional Experience</h2>
        </div>

        <div class="timeline">
          @for (exp of experiences(); track exp._id; let i = $index) {
            <div class="timeline-item">
              <div class="timeline-marker">
                <div class="marker-dot" [class.current]="exp.isCurrentRole"></div>
                <div class="marker-line"></div>
              </div>

              <div class="timeline-content">
                <div class="exp-header">
                  <div class="exp-main">
                    <a [href]="exp.companyUrl" target="_blank" rel="noopener" class="company">
                      {{ exp.company }}
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                    <span class="position">{{ exp.position }}</span>
                  </div>
                  <div class="exp-meta">
                    <span class="date" [class.current]="exp.isCurrentRole">
                      {{ formatDate(exp.startDate) }} — {{ exp.isCurrentRole ? 'Present' : formatDate(exp.endDate) }}
                    </span>
                    <span class="location">{{ exp.location }}</span>
                  </div>
                </div>

                @if (exp.description) {
                  <p class="description">{{ exp.description }}</p>
                }

                @for (project of exp.projects; track project.name) {
                  <div class="project">
                    <div class="project-title">
                      <span class="project-name">{{ project.name }}</span>
                      <span class="client">{{ project.client }}</span>
                    </div>
                    <p class="project-desc">{{ project.description }}</p>
                    <ul class="achievements">
                      @for (achievement of project.achievements; track achievement) {
                        <li>{{ achievement }}</li>
                      }
                    </ul>
                    <div class="tech-tags">
                      @for (tech of project.technologies; track tech) {
                        <span class="tag">{{ tech }}</span>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>

        @if (experiences().length === 0) {
          <div class="loading">
            @for (i of [1, 2, 3]; track i) {
              <div class="skeleton-item"></div>
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .experience-section {
      padding: 6rem 2rem;
      background: var(--bg-primary);
    }

    .container {
      max-width: 900px;
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
        font-size: 0.95rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 0.5rem;
      }

      .section-title {
        font-size: clamp(2rem, 4vw, 2.5rem);
        font-weight: 800;
        color: var(--text-primary);
      }
    }

    .timeline {
      position: relative;
    }

    .timeline-item {
      display: flex;
      gap: 2rem;
      padding-bottom: 3rem;

      &:last-child {
        padding-bottom: 0;

        .marker-line {
          display: none;
        }
      }
    }

    .timeline-marker {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;

      .marker-dot {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--bg-tertiary);
        border: 3px solid var(--bg-primary);
        box-shadow: 0 0 0 3px var(--border-color);
        z-index: 1;
        transition: all 0.3s;

        &.current {
          background: var(--accent-primary);
          box-shadow: 0 0 0 3px var(--accent-primary), 0 0 15px rgba(37, 99, 235, 0.4);
        }
      }

      .marker-line {
        width: 2px;
        flex: 1;
        background: var(--border-color);
        margin-top: 0.5rem;
      }
    }

    .timeline-content {
      flex: 1;
      padding-top: 0;
    }

    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;

      @media (max-width: 600px) {
        flex-direction: column;
        gap: 0.5rem;
      }
    }

    .exp-main {
      .company {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.4rem;
        font-weight: 700;
        color: var(--text-primary);
        text-decoration: none;
        transition: color 0.2s;

        svg {
          opacity: 0;
          transition: opacity 0.2s;
        }

        &:hover {
          color: var(--accent-primary);
          svg { opacity: 1; }
        }
      }

      .position {
        display: block;
        color: var(--accent-primary);
        font-weight: 600;
        font-size: 1rem;
        margin-top: 0.25rem;
      }
    }

    .exp-meta {
      text-align: right;

      @media (max-width: 600px) {
        text-align: left;
      }

      .date {
        display: block;
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--text-secondary);

        &.current {
          color: var(--accent-primary);
        }
      }

      .location {
        display: block;
        font-size: 0.85rem;
        color: var(--text-tertiary);
        margin-top: 0.2rem;
      }
    }

    .description {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1.25rem;
      padding-left: 1rem;
      border-left: 3px solid var(--accent-primary);
    }

    .project {
      background: var(--bg-secondary);
      padding: 1.25rem 1.5rem;
      border-radius: 12px;
      margin-bottom: 1rem;
      border: 1px solid var(--border-color);
      transition: border-color 0.2s;

      &:hover {
        border-color: var(--accent-primary);
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    .project-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.5rem;
      flex-wrap: wrap;

      .project-name {
        font-weight: 600;
        color: var(--text-primary);
        font-size: 1.05rem;
      }

      .client {
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
      }
    }

    .project-desc {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .achievements {
      list-style: none;
      padding: 0;
      margin: 0 0 1rem;

      li {
        position: relative;
        padding-left: 1.25rem;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        color: var(--text-secondary);
        line-height: 1.6;

        &::before {
          content: '▹';
          position: absolute;
          left: 0;
          color: var(--accent-primary);
          font-weight: 600;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
    }

    .tag {
      background: var(--bg-primary);
      color: var(--text-tertiary);
      padding: 0.3rem 0.65rem;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 500;
      border: 1px solid var(--border-color);
      transition: all 0.2s;

      &:hover {
        color: var(--accent-primary);
        border-color: var(--accent-primary);
      }
    }

    .loading {
      .skeleton-item {
        height: 300px;
        margin-bottom: 2rem;
        background: linear-gradient(90deg, var(--bg-secondary) 25%, var(--bg-tertiary) 50%, var(--bg-secondary) 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 12px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `]
})
export class ExperienceComponent implements OnInit {
  private readonly apiService = inject(ApiService);

  readonly experiences = signal<Experience[]>([]);

  ngOnInit(): void {
    this.apiService.getExperiences().subscribe({
      next: (response) => {
        if (response.success) {
          this.experiences.set(response.data);
        }
      }
    });
  }

  formatDate(dateString: string | null): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
}
