import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Project } from '../../core/services/api.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="projects-section">
      <div class="container">
        <div class="section-header" data-animate="fade-up">
          <span class="section-tag">Portfolio</span>
          <h2 class="section-title">Featured Projects</h2>
          <p class="section-subtitle">Showcasing real-world applications I've built</p>
        </div>

        <div class="filter-tabs" data-animate="fade-up" data-delay="100">
          <button
            class="filter-btn"
            [class.active]="!selectedTech()"
            (click)="filterByTech(null)"
          >
            All Projects ({{ projects().length }})
          </button>
          @for (tech of uniqueTechnologies(); track tech) {
            <button
              class="filter-btn"
              [class.active]="selectedTech() === tech"
              (click)="filterByTech(tech)"
            >
              {{ tech }} ({{ getCountForTech(tech) }})
            </button>
          }
        </div>

        <div class="projects-grid stagger-children">
          @for (project of filteredProjects(); track project._id) {
            <article class="project-card card-3d" [class.featured]="project.isFeatured">
              <div class="card-icon" [attr.data-category]="project.category">
                @switch (project.category) {
                  @case ('ai') {
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
                      <circle cx="8" cy="14" r="1"/>
                      <circle cx="16" cy="14" r="1"/>
                    </svg>
                  }
                  @default {
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <polyline points="16 18 22 12 16 6"/>
                      <polyline points="8 6 2 12 8 18"/>
                      <line x1="12" y1="2" x2="12" y2="22"/>
                    </svg>
                  }
                }
              </div>

              <div class="card-content">
                @if (project.isFeatured) {
                  <span class="featured-badge">⭐ Featured</span>
                }
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.description }}</p>

                @if (project.features && project.features.length > 0) {
                  <ul class="features-list">
                    @for (feature of project.features.slice(0, 3); track feature) {
                      <li>{{ feature }}</li>
                    }
                  </ul>
                }

                <div class="tech-stack">
                  @for (tech of project.technologies; track tech) {
                    <span class="tech-badge">{{ tech }}</span>
                  }
                </div>

                <div class="card-actions">
                  @if (project.githubUrl) {
                    <a [href]="project.githubUrl" target="_blank" rel="noopener" class="action-link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                      </svg>
                      View Code
                    </a>
                  }
                  @if (project.demoUrl) {
                    <a [href]="project.demoUrl" target="_blank" rel="noopener" class="action-link primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      Live Demo
                    </a>
                  }
                </div>
              </div>
            </article>
          }
        </div>

        @if (filteredProjects().length === 0 && projects().length > 0) {
          <div class="no-results">
            <p>No projects found with {{ selectedTech() }}</p>
            <button class="reset-btn" (click)="filterByTech(null)">Show All Projects</button>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .projects-section {
      padding: 6rem 2rem;
      background: var(--bg-secondary);
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;

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
        margin-bottom: 0.75rem;
      }

      .section-title {
        font-size: clamp(2rem, 4vw, 2.5rem);
        font-weight: 800;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
      }

      .section-subtitle {
        color: var(--text-secondary);
        font-size: 1.1rem;
      }
    }

    .filter-tabs {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 3rem;
    }

    .filter-btn {
      background: var(--bg-primary);
      border: 2px solid var(--border-color);
      padding: 0.6rem 1.25rem;
      border-radius: 10px;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--accent-primary);
        color: var(--accent-primary);
      }

      &.active {
        background: var(--accent-primary);
        border-color: var(--accent-primary);
        color: white;
      }
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;

      @media (max-width: 400px) {
        grid-template-columns: 1fr;
      }
    }

    .project-card {
      background: var(--bg-primary);
      border-radius: 16px;
      padding: 1.75rem;
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;

      &:hover {
        transform: translateY(-5px);
        border-color: var(--accent-primary);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);

        .card-icon {
          transform: scale(1.1);
        }
      }

      &.featured {
        border: 2px solid var(--accent-primary);
        background: linear-gradient(135deg, var(--bg-primary) 0%, rgba(37, 99, 235, 0.03) 100%);
      }
    }

    .card-icon {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      margin-bottom: 1.25rem;
      transition: transform 0.3s ease;
    }

    .card-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .featured-badge {
      display: inline-block;
      color: var(--accent-primary);
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .project-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
    }

    .project-description {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .features-list {
      list-style: none;
      padding: 0;
      margin: 0 0 1rem;

      li {
        position: relative;
        padding-left: 1.25rem;
        margin-bottom: 0.4rem;
        font-size: 0.85rem;
        color: var(--text-tertiary);

        &::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--accent-secondary);
          font-weight: 600;
        }
      }
    }

    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1.25rem;
      margin-top: auto;
    }

    .tech-badge {
      background: var(--bg-tertiary);
      color: var(--text-secondary);
      padding: 0.3rem 0.65rem;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .card-actions {
      display: flex;
      gap: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
    }

    .action-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: var(--accent-primary);
      }

      &.primary {
        color: var(--accent-primary);

        &:hover {
          color: var(--accent-secondary);
        }
      }
    }

    .no-results {
      text-align: center;
      padding: 3rem;

      p {
        color: var(--text-secondary);
        margin-bottom: 1rem;
      }

      .reset-btn {
        background: var(--accent-primary);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 10px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
        }
      }
    }
  `]
})
export class ProjectsComponent implements OnInit {
  private readonly apiService = inject(ApiService);

  readonly projects = signal<Project[]>([]);
  readonly selectedTech = signal<string | null>(null);
  readonly uniqueTechnologies = signal<string[]>([]);
  readonly filteredProjects = signal<Project[]>([]);

  ngOnInit(): void {
    this.apiService.getProjects().subscribe({
      next: (response) => {
        if (response.success) {
          this.projects.set(response.data);
          this.filteredProjects.set(response.data);
          this.extractTechnologies();
        }
      }
    });
  }

  private extractTechnologies(): void {
    const allTechs = this.projects().flatMap((p) => p.technologies);
    const uniqueTechs = [...new Set(allTechs)].slice(0, 5);
    this.uniqueTechnologies.set(uniqueTechs);
  }

  filterByTech(tech: string | null): void {
    this.selectedTech.set(tech);

    if (!tech) {
      this.filteredProjects.set(this.projects());
    } else {
      this.filteredProjects.set(
        this.projects().filter((p) => p.technologies.includes(tech))
      );
    }
  }

  getCountForTech(tech: string): number {
    return this.projects().filter((p) => p.technologies.includes(tech)).length;
  }
}
