import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GameAuthService } from '../../core/services/game-auth.service';
import { CanLeaveGame } from '../../core/guards/vault.guard';

@Component({
  selector: 'app-vault-game',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <section class="vault-section">
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
          <h1>🔐 Vault Heist</h1>
          <p>Crack the vaults using Angular Route Guards!</p>
          <button class="features-btn" (click)="scrollToFeatures()">🅰️ See Angular Features</button>
        </div>

        <div class="game-description">
          <p><strong>How to Play:</strong> Login as an agent (password: "angular") to access the vault system.
          Each vault is protected by a route guard that checks your level. Answer Angular questions correctly
          to crack vaults and level up. Try to leave mid-game to see the CanDeactivate guard in action!</p>
        </div>

        @if (!authService.isAuthenticated()) {
          <!-- Login Screen -->
          <div class="login-panel">
            <div class="vault-door">
              <div class="vault-circle">
                <span class="lock-icon">🔒</span>
              </div>
            </div>

            <h2>Agent Login Required</h2>
            <p class="hint">Password hint: The framework we're demonstrating 😉</p>

            <form (ngSubmit)="login()" class="login-form">
              <div class="input-group">
                <label>Agent Name</label>
                <input
                  type="text"
                  [(ngModel)]="username"
                  name="username"
                  placeholder="Enter your codename"
                  required
                />
              </div>
              <div class="input-group">
                <label>Access Code</label>
                <input
                  type="password"
                  [(ngModel)]="password"
                  name="password"
                  placeholder="Enter password"
                  required
                />
              </div>
              @if (loginError()) {
                <p class="error">❌ Access Denied! Wrong password.</p>
              }
              <button type="submit" class="login-btn">
                🔓 Access Vault System
              </button>
            </form>
          </div>
        } @else {
          <!-- Vault Selection -->
          <div class="vault-system">
            <div class="agent-status">
              <span class="agent-name">Agent: {{ authService.player()?.username }}</span>
              <span class="agent-level">Level: {{ authService.player()?.level }}</span>
              <span class="agent-score">Score: {{ authService.player()?.score }}</span>
              <button class="logout-btn" (click)="logout()">Logout</button>
            </div>

            <div class="vaults-grid">
              @for (vault of vaults; track vault.level) {
                <div
                  class="vault-card"
                  [class.unlocked]="authService.canAccessVault(vault.level)"
                  [class.active]="activeVault() === vault.level"
                  (click)="selectVault(vault.level)"
                >
                  <div class="vault-icon">
                    @if (authService.canAccessVault(vault.level)) {
                      <span>🔓</span>
                    } @else {
                      <span>🔒</span>
                    }
                  </div>
                  <h3>{{ vault.name }}</h3>
                  <p>{{ vault.description }}</p>
                  <span class="vault-level">Level {{ vault.level }} Required</span>
                  @if (completedVaults().includes(vault.level)) {
                    <span class="completed-badge">✅ Completed</span>
                  }
                </div>
              }
            </div>

            @if (activeVault()) {
              <div class="vault-challenge">
                <h3>🎯 Vault {{ activeVault() }} Challenge</h3>
                <p class="challenge-desc">{{ getCurrentChallenge().question }}</p>

                <div class="code-buttons">
                  @for (option of getCurrentChallenge().options; track option) {
                    <button
                      class="code-btn"
                      [class.correct]="showResult() && option === getCurrentChallenge().answer"
                      [class.wrong]="showResult() && selectedAnswer() === option && option !== getCurrentChallenge().answer"
                      (click)="submitAnswer(option)"
                      [disabled]="showResult()"
                    >
                      {{ option }}
                    </button>
                  }
                </div>

                @if (showResult()) {
                  <div class="result" [class.success]="isCorrect()">
                    @if (isCorrect()) {
                      <p>🎉 Correct! +{{ getCurrentChallenge().points }} points</p>
                      @if (activeVault()! < 3 && !completedVaults().includes(activeVault()! + 1)) {
                        <p>🔓 Vault {{ activeVault()! + 1 }} unlocked!</p>
                      }
                    } @else {
                      <p>❌ Wrong! The answer was: {{ getCurrentChallenge().answer }}</p>
                    }
                    <button class="next-btn" (click)="nextChallenge()">
                      {{ activeVault()! < 3 ? 'Next Vault →' : 'Play Again' }}
                    </button>
                  </div>
                }
              </div>
            }
          </div>
        }

        <div id="angular-features" class="angular-features">
          <h3>🅰️ Angular Features Demonstrated</h3>
          <div class="features-grid">
            <div class="feature">
              <code>CanActivate</code>
              <span>Guards routes - requires login</span>
            </div>
            <div class="feature">
              <code>CanDeactivate</code>
              <span>Confirms before leaving game</span>
            </div>
            <div class="feature">
              <code>Route Data</code>
              <span>requiredLevel passed to guard</span>
            </div>
            <div class="feature">
              <code>inject()</code>
              <span>Functional guard injection</span>
            </div>
            <div class="feature">
              <code>Router.navigate()</code>
              <span>Programmatic navigation</span>
            </div>
            <div class="feature">
              <code>queryParams</code>
              <span>Passing blocked level info</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .vault-section {
      min-height: 100vh;
      padding: 6rem 2rem 4rem;
      background: var(--bg-primary);
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 2rem;
    }

    .separator {
      color: var(--text-tertiary);
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.2s;
      &:hover { color: var(--accent-primary); }
    }

    .game-header {
      text-align: center;
      margin-bottom: 1.5rem;
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
      &:hover {
        background: var(--accent-primary);
        color: white;
      }
    }

    .game-description {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 12px;
      padding: 1rem 1.5rem;
      margin-bottom: 2rem;
      p { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin: 0; }
      strong { color: var(--text-primary); }
    }

    .login-panel {
      max-width: 400px;
      margin: 0 auto;
      text-align: center;

      h2 { color: var(--text-primary); margin-bottom: 0.5rem; }
      .hint { color: var(--text-tertiary); font-size: 0.9rem; margin-bottom: 2rem; }
    }

    .vault-door {
      margin-bottom: 2rem;
      .vault-circle {
        width: 120px;
        height: 120px;
        margin: 0 auto;
        background: linear-gradient(145deg, #2a2a3e, #1a1a2e);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 4px solid var(--border-color);
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        .lock-icon { font-size: 3rem; }
      }
    }

    .login-form {
      background: var(--bg-secondary);
      padding: 2rem;
      border-radius: 16px;
      border: 1px solid var(--border-color);
    }

    .input-group {
      margin-bottom: 1.25rem;
      text-align: left;
      label { display: block; color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem; }
      input {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 2px solid var(--border-color);
        border-radius: 10px;
        background: var(--bg-primary);
        color: var(--text-primary);
        font-size: 1rem;
        &:focus { outline: none; border-color: var(--accent-primary); }
      }
    }

    .error { color: #ef4444; font-size: 0.9rem; margin-bottom: 1rem; }

    .login-btn {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      &:hover { transform: translateY(-2px); box-shadow: 0 5px 20px rgba(37,99,235,0.3); }
    }

    .vault-system { margin-bottom: 3rem; }

    .agent-status {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;
      margin-bottom: 2rem;
      padding: 1rem;
      background: var(--bg-secondary);
      border-radius: 12px;
      border: 1px solid var(--border-color);

      span { color: var(--text-secondary); font-size: 0.95rem; }
      .agent-name { color: var(--accent-primary); font-weight: 600; }
      .agent-level { color: #10b981; font-weight: 600; }
      .agent-score { color: #f59e0b; font-weight: 600; }
    }

    .logout-btn {
      padding: 0.5rem 1rem;
      background: transparent;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.2s;
      &:hover { border-color: #ef4444; color: #ef4444; }
    }

    .vaults-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 2rem;
      @media (max-width: 600px) { grid-template-columns: 1fr; }
    }

    .vault-card {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 16px;
      border: 2px solid var(--border-color);
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
      position: relative;
      opacity: 0.6;

      &.unlocked { opacity: 1; border-color: var(--accent-primary); }
      &.active { background: rgba(37,99,235,0.1); transform: scale(1.02); }
      &:hover { transform: translateY(-3px); }

      .vault-icon { font-size: 2.5rem; margin-bottom: 0.75rem; }
      h3 { color: var(--text-primary); font-size: 1.1rem; margin-bottom: 0.5rem; }
      p { color: var(--text-tertiary); font-size: 0.85rem; margin-bottom: 0.75rem; }
      .vault-level { display: block; font-size: 0.75rem; color: var(--accent-primary); font-weight: 600; }
      .completed-badge {
        position: absolute; top: 10px; right: 10px;
        background: #10b981; color: white;
        padding: 0.2rem 0.5rem; border-radius: 6px; font-size: 0.7rem;
      }
    }

    .vault-challenge {
      background: var(--bg-secondary);
      padding: 2rem;
      border-radius: 16px;
      border: 1px solid var(--border-color);
      text-align: center;

      h3 { color: var(--text-primary); margin-bottom: 1rem; }
      .challenge-desc { color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 1.5rem; }
    }

    .code-buttons {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      max-width: 500px;
      margin: 0 auto 1.5rem;
    }

    .code-btn {
      padding: 1rem;
      background: var(--bg-primary);
      border: 2px solid var(--border-color);
      border-radius: 10px;
      color: var(--text-primary);
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s;
      &:hover:not(:disabled) { border-color: var(--accent-primary); }
      &.correct { background: #10b981; border-color: #10b981; color: white; }
      &.wrong { background: #ef4444; border-color: #ef4444; color: white; }
      &:disabled { cursor: not-allowed; opacity: 0.7; }
    }

    .result {
      padding: 1.5rem;
      border-radius: 12px;
      background: rgba(239,68,68,0.1);
      &.success { background: rgba(16,185,129,0.1); }
      p { color: var(--text-primary); margin-bottom: 0.5rem; }
    }

    .next-btn {
      margin-top: 1rem;
      padding: 0.75rem 2rem;
      background: var(--accent-primary);
      color: white;
      border: none;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      &:hover { transform: translateY(-2px); }
    }

    .angular-features {
      background: var(--bg-secondary);
      padding: 2rem;
      border-radius: 16px;
      border: 1px solid var(--border-color);
      h3 { text-align: center; color: var(--text-primary); margin-bottom: 1.5rem; }
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }

    .feature {
      background: var(--bg-primary);
      padding: 1rem;
      border-radius: 10px;
      border: 1px solid var(--border-color);
      code { display: block; color: var(--accent-primary); font-family: monospace; font-weight: 600; margin-bottom: 0.5rem; }
      span { font-size: 0.8rem; color: var(--text-tertiary); }
    }

    @media (max-width: 768px) {
      .vault-section { padding: 5rem 1rem 3rem; }
      .game-header h1 { font-size: 1.8rem; }
      .agent-status { gap: 0.75rem; padding: 0.75rem; font-size: 0.85rem; }
      .vault-card { padding: 1rem; }
      .vault-challenge { padding: 1.5rem; }
      .code-buttons { grid-template-columns: 1fr; }
      .angular-features { padding: 1.5rem 1rem; }
    }

    @media (max-width: 480px) {
      .nav-links { flex-wrap: wrap; gap: 0.5rem; }
      .vault-door .vault-circle { width: 100px; height: 100px; }
      .login-form { padding: 1.5rem; }
    }
  `]
})
export class VaultGameComponent implements CanLeaveGame {
  readonly authService = inject(GameAuthService);
  private readonly router = inject(Router);

  username = '';
  password = '';
  readonly loginError = signal(false);
  readonly activeVault = signal<number | null>(null);
  readonly selectedAnswer = signal<string | null>(null);
  readonly showResult = signal(false);
  readonly isCorrect = signal(false);
  readonly completedVaults = signal<number[]>([]);

  readonly vaults = [
    { level: 1, name: 'Bronze Vault', description: 'Entry level security' },
    { level: 2, name: 'Silver Vault', description: 'Advanced encryption' },
    { level: 3, name: 'Gold Vault', description: 'Maximum security' }
  ];

  readonly challenges = [
    { level: 1, question: 'Which decorator marks a class as injectable?', options: ['@Component', '@Injectable', '@NgModule', '@Directive'], answer: '@Injectable', points: 100 },
    { level: 2, question: 'Which guard interface prevents route activation?', options: ['CanDeactivate', 'CanLoad', 'CanActivate', 'Resolve'], answer: 'CanActivate', points: 200 },
    { level: 3, question: 'What function creates a functional guard in Angular 15+?', options: ['createGuard()', 'inject()', 'guardFn()', 'CanActivateFn'], answer: 'CanActivateFn', points: 300 }
  ];

  canLeave(): boolean {
    return !this.activeVault() || this.showResult();
  }

  login(): void {
    if (this.authService.login(this.username, this.password)) {
      this.loginError.set(false);
    } else {
      this.loginError.set(true);
    }
  }

  logout(): void {
    this.authService.logout();
    this.activeVault.set(null);
    this.completedVaults.set([]);
  }

  selectVault(level: number): void {
    if (this.authService.canAccessVault(level)) {
      this.activeVault.set(level);
      this.showResult.set(false);
      this.selectedAnswer.set(null);
    }
  }

  getCurrentChallenge() {
    return this.challenges.find(c => c.level === this.activeVault()) || this.challenges[0];
  }

  submitAnswer(answer: string): void {
    this.selectedAnswer.set(answer);
    this.showResult.set(true);
    const challenge = this.getCurrentChallenge();

    if (answer === challenge.answer) {
      this.isCorrect.set(true);
      this.authService.addScore(challenge.points);
      this.completedVaults.update(v => [...v, this.activeVault()!]);
      if (this.activeVault()! < 3) {
        this.authService.levelUp();
      }
    } else {
      this.isCorrect.set(false);
    }
  }

  nextChallenge(): void {
    if (this.activeVault()! < 3) {
      this.activeVault.update(v => v! + 1);
    } else {
      this.activeVault.set(1);
      this.completedVaults.set([]);
    }
    this.showResult.set(false);
    this.selectedAnswer.set(null);
  }

  scrollToFeatures(): void {
    document.getElementById('angular-features')?.scrollIntoView({ behavior: 'smooth' });
  }
}
