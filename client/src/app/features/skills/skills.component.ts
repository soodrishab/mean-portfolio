import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Skill } from '../../core/services/api.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="skills-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Expertise</span>
          <h2 class="section-title">Technical Skills</h2>
        </div>

        <div class="skills-compact">
          @for (skill of skills(); track skill._id) {
            <div class="skill-group">
              <h3 class="group-title">
                <span class="group-icon">{{ getCategoryEmoji(skill.category) }}</span>
                {{ skill.category }}
              </h3>
              <div class="skill-tags">
                @for (item of skill.items; track item.name) {
                  <span class="skill-tag" [class.expert]="item.proficiency >= 90" [class.advanced]="item.proficiency >= 75 && item.proficiency < 90">
                    {{ item.name }}
                  </span>
                }
              </div>
            </div>
          }
        </div>

        @if (skills().length === 0) {
          <div class="loading-state">
            @for (i of [1, 2, 3]; track i) {
              <div class="skeleton-group"></div>
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .skills-section {
      padding: 5rem 2rem;
      background: var(--bg-secondary);
    }

    .container {
      max-width: 1000px;
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
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .section-title {
        font-size: clamp(1.75rem, 4vw, 2.25rem);
        font-weight: 700;
        color: var(--text-primary);
      }
    }

    .skills-compact {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .skill-group {
      background: var(--bg-primary);
      padding: 1.25rem;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;

      &:hover {
        border-color: var(--accent-primary);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      }
    }

    .group-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.03em;

      .group-icon {
        font-size: 1.1rem;
      }
    }

    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .skill-tag {
      display: inline-block;
      padding: 0.35rem 0.75rem;
      background: var(--bg-tertiary);
      color: var(--text-secondary);
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 500;
      transition: all 0.2s ease;

      &:hover {
        background: var(--accent-primary);
        color: white;
        transform: translateY(-2px);
      }

      &.expert {
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        color: white;
      }

      &.advanced {
        background: var(--accent-primary);
        color: white;
        opacity: 0.85;
      }
    }

    .loading-state {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;

      .skeleton-group {
        height: 120px;
        background: linear-gradient(90deg, var(--bg-primary) 25%, var(--bg-tertiary) 50%, var(--bg-primary) 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 12px;
      }
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `]
})
export class SkillsComponent implements OnInit {
  private readonly apiService = inject(ApiService);

  readonly skills = signal<Skill[]>([]);

  ngOnInit(): void {
    this.apiService.getSkills().subscribe({
      next: (response) => {
        if (response.success) {
          this.skills.set(response.data);
        }
      }
    });
  }

  getCategoryEmoji(category: string): string {
    const emojis: Record<string, string> = {
      'Frontend': '🎨',
      'Backend': '⚙️',
      'Database': '🗄️',
      'Cloud & DevOps': '☁️',
      'AI & Agentic': '🤖',
      'Testing': '🧪',
      'Tools': '🛠️'
    };
    return emojis[category] || '💻';
  }
}
