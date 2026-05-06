import { Injectable, signal, computed } from '@angular/core';

export interface Player {
  username: string;
  level: number;
  score: number;
  unlockedVaults: number[];
}

@Injectable({
  providedIn: 'root'
})
export class GameAuthService {
  // Signals for reactive state
  private readonly _player = signal<Player | null>(null);
  private readonly _isAuthenticated = signal(false);

  // Public computed signals
  readonly player = this._player.asReadonly();
  readonly isAuthenticated = this._isAuthenticated.asReadonly();

  readonly currentLevel = computed(() => this._player()?.level ?? 0);
  readonly canAccessVault = (vaultLevel: number) => {
    const player = this._player();
    return player !== null && player.level >= vaultLevel;
  };

  login(username: string, password: string): boolean {
    // Simulate authentication (password is "angular" for demo)
    if (password === 'angular') {
      this._player.set({
        username,
        level: 1,
        score: 0,
        unlockedVaults: [1]
      });
      this._isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this._player.set(null);
    this._isAuthenticated.set(false);
  }

  levelUp(): void {
    this._player.update(p => {
      if (!p) return p;
      const newLevel = Math.min(p.level + 1, 3);
      return {
        ...p,
        level: newLevel,
        unlockedVaults: [...p.unlockedVaults, newLevel]
      };
    });
  }

  addScore(points: number): void {
    this._player.update(p => p ? { ...p, score: p.score + points } : p);
  }
}
