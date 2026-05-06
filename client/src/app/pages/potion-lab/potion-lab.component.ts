import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IngredientService,
  BrewingService,
  PotionScoreService,
  Ingredient,
  Potion
} from '../../core/services/potion.service';

@Component({
  selector: 'app-potion-lab',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="potion-section">
      <div class="container">
        <div class="nav-links">
          <a routerLink="/games" class="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Games
          </a>
          <span class="separator">|</span>
          <a routerLink="/" class="back-link">
            Back to Portfolio
          </a>
        </div>

        <div class="game-header">
          <h1>🧪 Tech Potion Lab</h1>
          <p>Mix technologies to brew powerful stack potions!</p>
          <button class="features-btn" (click)="scrollToFeatures()">🅰️ See Angular Features</button>
        </div>

        <div class="game-description">
          <p><strong>How to Play:</strong> Select 2-3 tech ingredients from different categories and brew them together.
          Secret recipes (like Angular + Node.js + MongoDB = MEAN Stack) give bonus power!
          This game demonstrates Angular's dependency injection with multiple services working together.</p>
        </div>

        <div class="game-stats">
          <div class="stat">
            <span class="stat-value">{{ scoreService.potionsBrewed }}</span>
            <span class="stat-label">Potions Brewed</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ scoreService.totalScore }}</span>
            <span class="stat-label">Total Power</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ selectedIngredients().length }}/3</span>
            <span class="stat-label">Ingredients</span>
          </div>
        </div>

        <div class="lab-container">
          <div class="ingredients-panel">
            <h3>📦 Ingredients</h3>
            <div class="ingredient-categories">
              @for (category of categories; track category.type) {
                <div class="category">
                  <h4>{{ category.label }}</h4>
                  <div class="ingredient-list">
                    @for (ingredient of getIngredientsByType(category.type); track ingredient.id) {
                      <button
                        class="ingredient-btn"
                        [class.selected]="isSelected(ingredient.id)"
                        [class.disabled]="!canSelect(ingredient.id)"
                        [style.--ingredient-color]="ingredient.color"
                        (click)="toggleIngredient(ingredient)"
                      >
                        <span class="emoji">{{ ingredient.emoji }}</span>
                        <span class="name">{{ ingredient.name }}</span>
                        <span class="power">+{{ ingredient.power }}</span>
                      </button>
                    }
                  </div>
                </div>
              }
            </div>
          </div>

          <div class="cauldron-panel">
            <div class="cauldron" [class.brewing]="isBrewing()">
              <div class="cauldron-contents" [style.background]="cauldronColor()">
                @for (ing of selectedIngredients(); track ing.id) {
                  <span class="floating-ingredient">{{ ing.emoji }}</span>
                }
              </div>
              <div class="cauldron-bubbles">
                @if (isBrewing()) {
                  @for (i of [1,2,3,4,5]; track i) {
                    <div class="bubble" [style.--delay]="i * 0.2 + 's'"></div>
                  }
                }
              </div>
            </div>

            <div class="brew-controls">
              <button
                class="brew-btn"
                [disabled]="selectedIngredients().length < 2 || isBrewing()"
                (click)="brewPotion()"
              >
                @if (isBrewing()) {
                  ⏳ Brewing...
                } @else {
                  🔥 Brew Potion
                }
              </button>
              <button class="clear-btn" (click)="clearSelection()" [disabled]="isBrewing()">
                🗑️ Clear
              </button>
            </div>
          </div>
        </div>

        @if (lastPotion()) {
          <div class="potion-result" [style.--potion-color]="lastPotion()!.color">
            <div class="potion-bottle">🧪</div>
            <h3>{{ lastPotion()!.name }}</h3>
            <p>{{ lastPotion()!.description }}</p>
            <div class="potion-stats">
              <span class="power-badge">⚡ {{ lastPotion()!.power | number:'1.0-0' }} Power</span>
            </div>
            <div class="potion-ingredients">
              @for (ing of lastPotion()!.ingredients; track ing.id) {
                <span class="ing-badge" [style.background]="ing.color">{{ ing.emoji }} {{ ing.name }}</span>
              }
            </div>
          </div>
        }

        <div class="recipes-hint">
          <h3>💡 Secret Recipes</h3>
          <p>Try combining: Angular + Node.js + MongoDB for a bonus!</p>
        </div>

        <div id="angular-features" class="angular-features">
          <h3>🅰️ Angular Features Demonstrated</h3>
          <div class="features-grid">
            <div class="feature">
              <code>&#64;Injectable()</code>
              <span>Services with providedIn: 'root'</span>
            </div>
            <div class="feature">
              <code>inject()</code>
              <span>Modern dependency injection</span>
            </div>
            <div class="feature">
              <code>Service Hierarchy</code>
              <span>BrewingService uses IngredientService</span>
            </div>
            <div class="feature">
              <code>InjectionToken</code>
              <span>Custom config injection (in service)</span>
            </div>
            <div class="feature">
              <code>Singleton Pattern</code>
              <span>Shared state across components</span>
            </div>
            <div class="feature">
              <code>Encapsulation</code>
              <span>Private state, public methods</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .potion-section {
      min-height: 100vh;
      padding: 6rem 2rem 4rem;
      background: var(--bg-primary);
    }

    .container { max-width: 1000px; margin: 0 auto; }

    .nav-links {
      display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem;
    }

    .separator { color: var(--text-tertiary); }

    .back-link {
      display: inline-flex; align-items: center; gap: 0.5rem;
      color: var(--text-secondary); text-decoration: none;
      &:hover { color: var(--accent-primary); }
    }

    .game-header {
      text-align: center; margin-bottom: 1.5rem;
      h1 { font-size: 2.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem; }
      p { color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 1rem; }
    }

    .features-btn {
      padding: 0.5rem 1.25rem;
      background: transparent;
      border: 2px solid var(--accent-primary);
      border-radius: 25px;
      color: var(--accent-primary);
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s;
      &:hover { background: var(--accent-primary); color: white; }
    }

    .game-description {
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05));
      border: 1px solid rgba(245, 158, 11, 0.3);
      border-radius: 12px;
      padding: 1rem 1.5rem;
      margin-bottom: 2rem;
      text-align: center;
      p { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin: 0; }
      strong { color: var(--text-primary); }
    }

    .game-stats {
      display: flex; justify-content: center; gap: 2rem; margin-bottom: 2rem; flex-wrap: wrap;
      .stat {
        text-align: center; background: var(--bg-secondary); padding: 1rem 2rem;
        border-radius: 12px; border: 1px solid var(--border-color);
      }
      .stat-value { display: block; font-size: 1.75rem; font-weight: 700; color: var(--accent-primary); }
      .stat-label { font-size: 0.8rem; color: var(--text-tertiary); text-transform: uppercase; }
    }

    .lab-container {
      display: grid; grid-template-columns: 1fr 300px; gap: 2rem; margin-bottom: 2rem;
      @media (max-width: 768px) { grid-template-columns: 1fr; }
    }

    .ingredients-panel {
      background: var(--bg-secondary); padding: 1.5rem; border-radius: 16px;
      border: 1px solid var(--border-color);
      h3 { color: var(--text-primary); margin-bottom: 1rem; }
    }

    .category {
      margin-bottom: 1.25rem;
      &:last-child { margin-bottom: 0; }
      h4 { color: var(--text-tertiary); font-size: 0.8rem; text-transform: uppercase; margin-bottom: 0.5rem; }
    }

    .ingredient-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }

    .ingredient-btn {
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.5rem 0.75rem; background: var(--bg-primary);
      border: 2px solid var(--border-color); border-radius: 10px;
      cursor: pointer; transition: all 0.2s;
      .emoji { font-size: 1.25rem; }
      .name { color: var(--text-primary); font-size: 0.85rem; font-weight: 500; }
      .power { color: var(--text-tertiary); font-size: 0.75rem; }
      &:hover:not(.disabled) { border-color: var(--ingredient-color); transform: translateY(-2px); }
      &.selected { border-color: var(--ingredient-color); background: rgba(37,99,235,0.1); box-shadow: 0 0 10px var(--ingredient-color); }
      &.disabled { opacity: 0.5; cursor: not-allowed; }
    }

    .cauldron-panel {
      display: flex; flex-direction: column; align-items: center; gap: 1.5rem;
    }

    .cauldron {
      width: 200px; height: 200px; position: relative;
      background: linear-gradient(180deg, #2a2a3e 0%, #1a1a2e 100%);
      border-radius: 0 0 100px 100px; border: 4px solid #444;
      overflow: hidden;
      &::before {
        content: ''; position: absolute; top: -20px; left: -10px; right: -10px; height: 30px;
        background: #555; border-radius: 10px;
      }
    }

    .cauldron-contents {
      position: absolute; bottom: 0; left: 0; right: 0; height: 70%;
      background: linear-gradient(180deg, #6366f1 0%, #4f46e5 100%);
      display: flex; align-items: center; justify-content: center; gap: 0.5rem;
      transition: background 0.5s;
    }

    .floating-ingredient {
      font-size: 2rem; animation: float 2s ease-in-out infinite;
    }

    .cauldron-bubbles {
      position: absolute; bottom: 20%; left: 0; right: 0;
      .bubble {
        position: absolute; width: 15px; height: 15px;
        background: rgba(255,255,255,0.3); border-radius: 50%;
        animation: bubble 1.5s ease-in-out infinite;
        animation-delay: var(--delay);
        left: calc(20% + var(--delay) * 50);
      }
    }

    .brew-controls { display: flex; gap: 1rem; }

    .brew-btn {
      padding: 1rem 2rem; background: linear-gradient(135deg, #f59e0b, #d97706);
      color: white; border: none; border-radius: 12px; font-size: 1.1rem; font-weight: 600;
      cursor: pointer; transition: all 0.2s;
      &:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 5px 20px rgba(245,158,11,0.3); }
      &:disabled { opacity: 0.5; cursor: not-allowed; }
    }

    .clear-btn {
      padding: 1rem 1.5rem; background: var(--bg-secondary); border: 2px solid var(--border-color);
      border-radius: 12px; color: var(--text-secondary); cursor: pointer; transition: all 0.2s;
      &:hover:not(:disabled) { border-color: #ef4444; color: #ef4444; }
    }

    .potion-result {
      text-align: center; padding: 2rem; background: var(--bg-secondary);
      border-radius: 16px; border: 2px solid var(--potion-color); margin-bottom: 2rem;
      animation: appear 0.5s ease;
      .potion-bottle { font-size: 4rem; margin-bottom: 1rem; }
      h3 { color: var(--text-primary); font-size: 1.5rem; margin-bottom: 0.5rem; }
      p { color: var(--text-secondary); margin-bottom: 1rem; }
      .power-badge {
        display: inline-block; padding: 0.5rem 1rem; background: var(--potion-color);
        color: white; border-radius: 20px; font-weight: 600; margin-bottom: 1rem;
      }
    }

    .potion-ingredients { display: flex; justify-content: center; gap: 0.5rem; flex-wrap: wrap; }
    .ing-badge { padding: 0.3rem 0.75rem; border-radius: 20px; color: white; font-size: 0.85rem; }

    .recipes-hint {
      text-align: center; padding: 1.5rem; background: rgba(245,158,11,0.1);
      border-radius: 12px; margin-bottom: 2rem;
      h3 { color: var(--text-primary); margin-bottom: 0.5rem; }
      p { color: var(--text-secondary); }
    }

    .angular-features {
      background: var(--bg-secondary); padding: 2rem; border-radius: 16px; border: 1px solid var(--border-color);
      h3 { text-align: center; color: var(--text-primary); margin-bottom: 1.5rem; }
    }

    .features-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }

    .feature {
      background: var(--bg-primary); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-color);
      code { display: block; color: var(--accent-primary); font-family: monospace; font-weight: 600; margin-bottom: 0.5rem; }
      span { font-size: 0.8rem; color: var(--text-tertiary); }
    }

    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    @keyframes bubble { 0% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(-80px) scale(0.5); opacity: 0; } }
    @keyframes appear { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }

    @media (max-width: 768px) {
      .potion-section { padding: 5rem 1rem 3rem; }
      .game-header h1 { font-size: 1.8rem; }
      .game-stats { gap: 1rem; }
      .game-stats .stat { padding: 0.75rem 1.25rem; }
      .cauldron { width: 160px; height: 160px; }
      .floating-ingredient { font-size: 1.5rem; }
      .brew-controls { flex-direction: column; }
      .brew-btn, .clear-btn { width: 100%; }
      .angular-features { padding: 1.5rem 1rem; }
    }

    @media (max-width: 480px) {
      .nav-links { flex-wrap: wrap; gap: 0.5rem; }
      .ingredient-btn { padding: 0.4rem 0.6rem; }
      .ingredient-btn .emoji { font-size: 1rem; }
      .ingredient-btn .name { font-size: 0.75rem; }
    }
  `]
})
export class PotionLabComponent {
  private readonly ingredientService = inject(IngredientService);
  private readonly brewingService = inject(BrewingService);
  readonly scoreService = inject(PotionScoreService);

  readonly selectedIngredients = signal<Ingredient[]>([]);
  readonly isBrewing = signal(false);
  readonly lastPotion = signal<Potion | null>(null);

  readonly categories = [
    { type: 'frontend', label: 'Frontend' },
    { type: 'backend', label: 'Backend' },
    { type: 'database', label: 'Database' },
    { type: 'cloud', label: 'Cloud' }
  ];

  readonly cauldronColor = computed(() => {
    const ingredients = this.selectedIngredients();
    if (ingredients.length === 0) return 'linear-gradient(180deg, #6366f1 0%, #4f46e5 100%)';
    const colors = ingredients.map(i => i.color);
    return `linear-gradient(180deg, ${colors[0]} 0%, ${colors[colors.length - 1] || colors[0]} 100%)`;
  });

  getIngredientsByType(type: string): Ingredient[] {
    return this.ingredientService.getByType(type);
  }

  isSelected(id: string): boolean {
    return this.selectedIngredients().some(i => i.id === id);
  }

  canSelect(id: string): boolean {
    return this.selectedIngredients().length < 3 || this.isSelected(id);
  }

  toggleIngredient(ingredient: Ingredient): void {
    if (this.isBrewing()) return;

    if (this.isSelected(ingredient.id)) {
      this.selectedIngredients.update(list => list.filter(i => i.id !== ingredient.id));
    } else if (this.selectedIngredients().length < 3) {
      this.selectedIngredients.update(list => [...list, ingredient]);
    }
  }

  clearSelection(): void {
    this.selectedIngredients.set([]);
    this.lastPotion.set(null);
  }

  brewPotion(): void {
    if (this.selectedIngredients().length < 2) return;

    this.isBrewing.set(true);

    setTimeout(() => {
      const ids = this.selectedIngredients().map(i => i.id);
      const potion = this.brewingService.brew(ids);
      this.lastPotion.set(potion);
      this.scoreService.addScore(potion.power);
      this.selectedIngredients.set([]);
      this.isBrewing.set(false);
    }, 2000);
  }

  scrollToFeatures(): void {
    document.getElementById('angular-features')?.scrollIntoView({ behavior: 'smooth' });
  }
}
