import { Injectable, InjectionToken, inject } from '@angular/core';

// Injection Token for configuration
export const POTION_CONFIG = new InjectionToken<PotionConfig>('potion.config');

export interface PotionConfig {
  maxIngredients: number;
  bonusMultiplier: number;
}

export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  color: string;
  power: number;
  type: 'frontend' | 'backend' | 'database' | 'cloud';
}

export interface Potion {
  name: string;
  ingredients: Ingredient[];
  power: number;
  color: string;
  description: string;
}

// Base Ingredient Service
@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  readonly ingredients: Ingredient[] = [
    { id: 'angular', name: 'Angular', emoji: '🅰️', color: '#DD0031', power: 30, type: 'frontend' },
    { id: 'react', name: 'React', emoji: '⚛️', color: '#61DAFB', power: 28, type: 'frontend' },
    { id: 'vue', name: 'Vue', emoji: '💚', color: '#42B883', power: 25, type: 'frontend' },
    { id: 'nodejs', name: 'Node.js', emoji: '🟢', color: '#339933', power: 28, type: 'backend' },
    { id: 'python', name: 'Python', emoji: '🐍', color: '#3776AB', power: 30, type: 'backend' },
    { id: 'mongodb', name: 'MongoDB', emoji: '🍃', color: '#47A248', power: 25, type: 'database' },
    { id: 'postgres', name: 'PostgreSQL', emoji: '🐘', color: '#4169E1', power: 27, type: 'database' },
    { id: 'aws', name: 'AWS', emoji: '☁️', color: '#FF9900', power: 32, type: 'cloud' },
    { id: 'docker', name: 'Docker', emoji: '🐳', color: '#2496ED', power: 26, type: 'cloud' },
  ];

  getByType(type: string): Ingredient[] {
    return this.ingredients.filter(i => i.type === type);
  }

  getById(id: string): Ingredient | undefined {
    return this.ingredients.find(i => i.id === id);
  }
}

// Potion Brewing Service - demonstrates DI hierarchy
@Injectable({
  providedIn: 'root'
})
export class BrewingService {
  private readonly ingredientService = inject(IngredientService);

  readonly potionRecipes: Record<string, { ingredients: string[], name: string, description: string }> = {
    'angular+nodejs+mongodb': {
      ingredients: ['angular', 'nodejs', 'mongodb'],
      name: '🧪 MEAN Stack Elixir',
      description: 'The classic full-stack combination!'
    },
    'angular+nodejs': {
      ingredients: ['angular', 'nodejs'],
      name: '⚡ Full-Stack Fusion',
      description: 'Frontend meets backend!'
    },
    'mongodb+postgres': {
      ingredients: ['mongodb', 'postgres'],
      name: '💾 Database Blend',
      description: 'SQL meets NoSQL!'
    },
    'aws+docker': {
      ingredients: ['aws', 'docker'],
      name: '☁️ Cloud Potion',
      description: 'Deploy anywhere!'
    },
  };

  brew(ingredientIds: string[]): Potion {
    const sorted = [...ingredientIds].sort().join('+');
    const recipe = this.potionRecipes[sorted];
    const ingredients = ingredientIds
      .map(id => this.ingredientService.getById(id))
      .filter((i): i is Ingredient => i !== undefined);

    const totalPower = ingredients.reduce((sum, i) => sum + i.power, 0);
    const avgColor = ingredients[0]?.color || '#888';

    if (recipe) {
      return {
        name: recipe.name,
        ingredients,
        power: totalPower * 1.5, // Bonus for known recipe
        color: avgColor,
        description: recipe.description
      };
    }

    return {
      name: '🔮 Mystery Potion',
      ingredients,
      power: totalPower,
      color: avgColor,
      description: 'An experimental brew...'
    };
  }
}

// Score tracking service
@Injectable({
  providedIn: 'root'
})
export class PotionScoreService {
  private _totalScore = 0;
  private _potionsBrewed = 0;

  get totalScore(): number { return this._totalScore; }
  get potionsBrewed(): number { return this._potionsBrewed; }

  addScore(power: number): void {
    this._totalScore += Math.round(power);
    this._potionsBrewed++;
  }

  reset(): void {
    this._totalScore = 0;
    this._potionsBrewed = 0;
  }
}
