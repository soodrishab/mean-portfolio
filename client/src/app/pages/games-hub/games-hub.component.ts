import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-games-hub',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="games-hub">
      <div class="container">
        <a routerLink="/" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Portfolio
        </a>

        <div class="hub-header">
          <h1>🎮 Angular Feature Games</h1>
          <p>Interactive mini-games demonstrating Angular concepts</p>
        </div>

        <div class="info-section top">
          <h2>🅰️ Why These Games?</h2>
          <p>Each game is designed to showcase specific Angular features in an interactive way.
             Play them to see signals, dependency injection, route guards, and reactive forms in action!</p>
        </div>

        <div class="games-grid">
          @for (game of games; track game.route) {
            <a [routerLink]="game.route" class="game-card" [style.--card-color]="game.color">
              <div class="game-icon">{{ game.icon }}</div>
              <h3>{{ game.title }}</h3>
              <p>{{ game.description }}</p>
              <div class="features">
                @for (feature of game.features; track feature) {
                  <span class="feature-tag">{{ feature }}</span>
                }
              </div>
              <span class="play-btn">Play Now →</span>
            </a>
          }
        </div>

        </div>
    </section>
  `,
  styles: [`
    .games-hub {
      min-height: 100vh;
      padding: 6rem 2rem 4rem;
      background: var(--bg-primary);
    }

    .container { max-width: 1000px; margin: 0 auto; }

    .back-link {
      display: inline-flex; align-items: center; gap: 0.5rem;
      color: var(--text-secondary); text-decoration: none; margin-bottom: 2rem;
      transition: color 0.2s;
      &:hover { color: var(--accent-primary); }
    }

    .hub-header {
      text-align: center; margin-bottom: 3rem;
      h1 { font-size: 2.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem; }
      p { color: var(--text-secondary); font-size: 1.1rem; }
    }

    .games-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      margin-bottom: 3rem;

      @media (max-width: 700px) {
        grid-template-columns: 1fr;
      }
    }

    .game-card {
      display: flex;
      flex-direction: column;
      padding: 2rem;
      background: var(--bg-secondary);
      border-radius: 20px;
      border: 2px solid var(--border-color);
      text-decoration: none;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        border-color: var(--card-color);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);

        .play-btn {
          color: var(--card-color);
        }
      }

      .game-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      h3 {
        color: var(--text-primary);
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }

      p {
        color: var(--text-secondary);
        font-size: 0.95rem;
        line-height: 1.5;
        margin-bottom: 1rem;
        flex: 1;
      }

      .features {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
      }

      .feature-tag {
        background: var(--bg-primary);
        color: var(--text-tertiary);
        padding: 0.3rem 0.6rem;
        border-radius: 6px;
        font-size: 0.75rem;
        font-family: monospace;
        border: 1px solid var(--border-color);
      }

      .play-btn {
        color: var(--text-secondary);
        font-weight: 600;
        font-size: 0.95rem;
        transition: color 0.2s;
      }
    }

    .info-section {
      text-align: center;
      padding: 2rem;
      background: var(--bg-secondary);
      border-radius: 16px;
      border: 1px solid var(--border-color);

      &.top {
        margin-bottom: 2rem;
        background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(8, 145, 178, 0.1));
        border-color: var(--accent-primary);
      }

      h2 {
        color: var(--text-primary);
        margin-bottom: 1rem;
      }

      p {
        color: var(--text-secondary);
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.7;
      }

      @media (max-width: 480px) {
        padding: 1.5rem 1rem;
      }
    }

    @media (max-width: 768px) {
      .games-hub {
        padding: 5rem 1rem 3rem;
      }

      .hub-header {
        h1 { font-size: 1.8rem; }
        p { font-size: 1rem; }
      }

      .game-card {
        padding: 1.5rem;

        .game-icon { font-size: 2.5rem; }
        h3 { font-size: 1.2rem; }
      }
    }
  `]
})
export class GamesHubComponent {
  readonly games = [
    {
      route: '/game/memory',
      icon: '🧠',
      title: 'Tech Stack Memory',
      description: 'Match technology pairs in this classic memory game. Tests your recall while demonstrating Angular signals.',
      features: ['signal()', 'computed()', '@for', 'track'],
      color: '#3b82f6'
    },
    {
      route: '/game/vault',
      icon: '🔐',
      title: 'Vault Heist',
      description: 'Crack secure vaults by answering Angular questions. Login required - showcases route protection.',
      features: ['CanActivate', 'CanDeactivate', 'Guards', 'Router'],
      color: '#ef4444'
    },
    {
      route: '/game/potion',
      icon: '🧪',
      title: 'Tech Potion Lab',
      description: 'Mix technologies to brew powerful stack potions. Each ingredient is injected via services.',
      features: ['@Injectable', 'inject()', 'DI Hierarchy', 'Services'],
      color: '#f59e0b'
    },
    {
      route: '/game/quiz',
      icon: '📝',
      title: 'Angular Mastery Quiz',
      description: 'Test your Angular knowledge with reactive form-powered questions and validation.',
      features: ['FormGroup', 'FormBuilder', 'Validators', 'ReactiveFormsModule'],
      color: '#10b981'
    }
  ];
}
