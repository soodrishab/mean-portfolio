import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Card {
  id: number;
  tech: string;
  icon: string;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="game-section">
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
          <h1>🧠 Tech Stack Memory</h1>
          <p>Match the technology pairs to win!</p>
          <button class="features-btn" (click)="scrollToFeatures()">🅰️ See Angular Features</button>
        </div>

        <div class="game-description">
          <p><strong>How to Play:</strong> Click on cards to flip them and find matching technology pairs.
          Match all pairs with the fewest moves and fastest time to maximize your score.
          This game showcases Angular's reactive signals for state management!</p>
        </div>

        <div class="game-stats">
          <div class="stat">
            <span class="stat-icon">🎯</span>
            <span class="stat-value">{{ moves() }}</span>
            <span class="stat-label">Moves</span>
          </div>
          <div class="stat">
            <span class="stat-icon">✅</span>
            <span class="stat-value">{{ matchedPairs() }}</span>
            <span class="stat-label">Matched</span>
          </div>
          <div class="stat">
            <span class="stat-icon">⏱️</span>
            <span class="stat-value">{{ formatTime(elapsedTime()) }}</span>
            <span class="stat-label">Time</span>
          </div>
          <div class="stat">
            <span class="stat-icon">⭐</span>
            <span class="stat-value">{{ score() }}</span>
            <span class="stat-label">Score</span>
          </div>
        </div>

        @if (gameWon()) {
          <div class="win-overlay">
            <div class="win-modal">
              <h2>🎉 You Won!</h2>
              <div class="win-stats">
                <p><strong>{{ moves() }}</strong> moves</p>
                <p><strong>{{ formatTime(elapsedTime()) }}</strong> time</p>
                <p><strong>{{ score() }}</strong> points</p>
              </div>
              <div class="win-rating">
                @if (moves() <= 12) {
                  <span class="rating">🌟🌟🌟 Perfect Memory!</span>
                } @else if (moves() <= 18) {
                  <span class="rating">⭐⭐ Great Job!</span>
                } @else {
                  <span class="rating">⭐ Good Effort!</span>
                }
              </div>
              <button class="play-again-btn" (click)="resetGame()">Play Again</button>
            </div>
          </div>
        }

        <div class="game-board" [class.disabled]="isChecking()">
          @for (card of cards(); track card.id) {
            <div
              class="card"
              [class.flipped]="card.isFlipped"
              [class.matched]="card.isMatched"
              (click)="flipCard(card)"
            >
              <div class="card-inner">
                <div class="card-front">
                  <span class="question-mark">?</span>
                </div>
                <div class="card-back" [style.background]="card.color">
                  <span class="tech-icon">{{ card.icon }}</span>
                  <span class="tech-name">{{ card.tech }}</span>
                </div>
              </div>
            </div>
          }
        </div>

        <div class="game-controls">
          <button class="reset-btn" (click)="resetGame()">
            🔄 New Game
          </button>
        </div>

        <div id="angular-features" class="angular-features">
          <h3>🅰️ Angular Features Demonstrated</h3>
          <div class="features-grid">
            <div class="feature">
              <code>signal()</code>
              <span>Reactive state for cards, moves, time</span>
            </div>
            <div class="feature">
              <code>computed()</code>
              <span>Derived state for score, win condition</span>
            </div>
            <div class="feature">
              <code>&#64;for</code>
              <span>Template loop rendering cards</span>
            </div>
            <div class="feature">
              <code>&#64;if</code>
              <span>Conditional win screen display</span>
            </div>
            <div class="feature">
              <code>[class.x]</code>
              <span>Dynamic CSS class binding</span>
            </div>
            <div class="feature">
              <code>(click)</code>
              <span>Event binding for interactions</span>
            </div>
            <div class="feature">
              <code>track</code>
              <span>Optimized DOM updates</span>
            </div>
            <div class="feature">
              <code>Lazy Loading</code>
              <span>Route-based code splitting</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .game-section {
      min-height: 100vh;
      padding: 6rem 2rem 4rem;
      background: var(--bg-primary);
    }

    .container {
      max-width: 700px;
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
      font-size: 0.95rem;
      transition: color 0.2s;

      &:hover {
        color: var(--accent-primary);
      }
    }

    .game-header {
      text-align: center;
      margin-bottom: 1.5rem;

      h1 {
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
      }

      p {
        color: var(--text-secondary);
        font-size: 1.1rem;
        margin-bottom: 1rem;
      }
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
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05));
      border: 1px solid rgba(59, 130, 246, 0.3);
      border-radius: 12px;
      padding: 1rem 1.5rem;
      margin-bottom: 2rem;
      p { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin: 0; }
      strong { color: var(--text-primary); }
    }

    .game-stats {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;

      .stat {
        text-align: center;
        background: var(--bg-secondary);
        padding: 1rem 1.5rem;
        border-radius: 12px;
        border: 1px solid var(--border-color);
        min-width: 90px;
      }

      .stat-icon {
        display: block;
        font-size: 1.5rem;
        margin-bottom: 0.25rem;
      }

      .stat-value {
        display: block;
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
      }

      .stat-label {
        font-size: 0.75rem;
        color: var(--text-tertiary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }

    .game-board {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin-bottom: 2rem;
      perspective: 1000px;

      &.disabled {
        pointer-events: none;
      }

      @media (max-width: 500px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 0.75rem;
      }
    }

    .card {
      aspect-ratio: 1;
      cursor: pointer;
      perspective: 1000px;

      &.matched {
        .card-inner {
          transform: rotateY(180deg);
        }
        .card-back {
          animation: pulse-success 0.5s ease;
        }
      }

      &.flipped .card-inner {
        transform: rotateY(180deg);
      }
    }

    .card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      transform-style: preserve-3d;
    }

    .card-front,
    .card-back {
      position: absolute;
      inset: 0;
      backface-visibility: hidden;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .card-front {
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      border: 2px solid var(--border-color);

      .question-mark {
        font-size: 2.5rem;
        font-weight: 800;
        color: white;
        opacity: 0.8;
      }
    }

    .card-back {
      transform: rotateY(180deg);
      border: 2px solid transparent;

      .tech-icon {
        font-size: 2rem;
        margin-bottom: 0.25rem;
      }

      .tech-name {
        font-size: 0.7rem;
        font-weight: 600;
        color: white;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }

    .game-controls {
      text-align: center;
      margin-bottom: 3rem;
    }

    .reset-btn {
      padding: 0.75rem 2rem;
      background: var(--bg-secondary);
      color: var(--text-primary);
      border: 2px solid var(--border-color);
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        border-color: var(--accent-primary);
        color: var(--accent-primary);
      }
    }

    .win-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      animation: fade-in 0.3s ease;
    }

    .win-modal {
      background: var(--bg-primary);
      padding: 3rem;
      border-radius: 20px;
      text-align: center;
      max-width: 400px;
      animation: scale-in 0.3s ease;

      h2 {
        font-size: 2rem;
        color: var(--text-primary);
        margin-bottom: 1.5rem;
      }
    }

    .win-stats {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 1.5rem;

      p {
        color: var(--text-secondary);

        strong {
          display: block;
          font-size: 1.5rem;
          color: var(--accent-primary);
        }
      }
    }

    .win-rating {
      margin-bottom: 2rem;

      .rating {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--text-primary);
      }
    }

    .play-again-btn {
      padding: 1rem 2.5rem;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
      }
    }

    .angular-features {
      background: var(--bg-secondary);
      padding: 2rem;
      border-radius: 16px;
      border: 1px solid var(--border-color);

      h3 {
        text-align: center;
        color: var(--text-primary);
        margin-bottom: 1.5rem;
        font-size: 1.2rem;
      }
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

      code {
        display: block;
        color: var(--accent-primary);
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      span {
        font-size: 0.8rem;
        color: var(--text-tertiary);
      }
    }

    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes scale-in {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    @keyframes pulse-success {
      0%, 100% { transform: rotateY(180deg) scale(1); }
      50% { transform: rotateY(180deg) scale(1.1); }
    }

    @media (max-width: 768px) {
      .game-section {
        padding: 5rem 1rem 3rem;
      }

      .game-header h1 {
        font-size: 1.8rem;
      }

      .game-stats {
        gap: 0.75rem;

        .stat {
          padding: 0.75rem 1rem;
          min-width: 70px;
        }

        .stat-value {
          font-size: 1.2rem;
        }
      }

      .win-modal {
        padding: 2rem;
        margin: 1rem;

        h2 { font-size: 1.5rem; }
      }

      .win-stats {
        gap: 1rem;
        flex-wrap: wrap;

        p strong {
          font-size: 1.2rem;
        }
      }

      .angular-features {
        padding: 1.5rem 1rem;
      }
    }

    @media (max-width: 480px) {
      .nav-links {
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .game-stats .stat {
        min-width: 60px;
        padding: 0.5rem 0.75rem;
      }

      .card-front .question-mark {
        font-size: 1.8rem;
      }

      .card-back {
        .tech-icon { font-size: 1.5rem; }
        .tech-name { font-size: 0.6rem; }
      }
    }
  `]
})
export class GameComponent implements OnInit {
  private readonly techStack = [
    { tech: 'Angular', icon: '🅰️', color: '#DD0031' },
    { tech: 'Node.js', icon: '🟢', color: '#339933' },
    { tech: 'MongoDB', icon: '🍃', color: '#47A248' },
    { tech: 'TypeScript', icon: '🔷', color: '#3178C6' },
    { tech: 'Express', icon: '⚡', color: '#000000' },
    { tech: 'RxJS', icon: '🔄', color: '#B7178C' }
  ];

  // Signals - Reactive State
  readonly cards = signal<Card[]>([]);
  readonly moves = signal(0);
  readonly elapsedTime = signal(0);
  readonly isChecking = signal(false);

  // Computed - Derived State
  readonly matchedPairs = computed(() =>
    this.cards().filter(c => c.isMatched).length / 2
  );

  readonly gameWon = computed(() =>
    this.cards().length > 0 && this.cards().every(c => c.isMatched)
  );

  readonly score = computed(() => {
    const baseScore = this.matchedPairs() * 100;
    const movesPenalty = Math.max(0, (this.moves() - 12) * 5);
    const timePenalty = Math.floor(this.elapsedTime() / 10);
    return Math.max(0, baseScore - movesPenalty - timePenalty);
  });

  private flippedCards: Card[] = [];
  private timerInterval: any;

  ngOnInit(): void {
    this.initGame();
  }

  private initGame(): void {
    // Create pairs of cards
    const cardPairs: Card[] = [];
    let id = 0;

    this.techStack.forEach(tech => {
      // Add two of each card (pairs)
      for (let i = 0; i < 2; i++) {
        cardPairs.push({
          id: id++,
          tech: tech.tech,
          icon: tech.icon,
          color: tech.color,
          isFlipped: false,
          isMatched: false
        });
      }
    });

    // Shuffle cards using Fisher-Yates algorithm
    for (let i = cardPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }

    this.cards.set(cardPairs);
    this.startTimer();
  }

  private startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (!this.gameWon()) {
        this.elapsedTime.update(t => t + 1);
      }
    }, 1000);
  }

  flipCard(card: Card): void {
    // Ignore if already flipped, matched, or checking
    if (card.isFlipped || card.isMatched || this.isChecking()) {
      return;
    }

    // Flip the card
    this.updateCard(card.id, { isFlipped: true });
    this.flippedCards.push(card);

    // Check for match when two cards are flipped
    if (this.flippedCards.length === 2) {
      this.moves.update(m => m + 1);
      this.checkMatch();
    }
  }

  private checkMatch(): void {
    this.isChecking.set(true);
    const [card1, card2] = this.flippedCards;

    if (card1.tech === card2.tech) {
      // Match found!
      setTimeout(() => {
        this.updateCard(card1.id, { isMatched: true });
        this.updateCard(card2.id, { isMatched: true });
        this.flippedCards = [];
        this.isChecking.set(false);

        // Check for win
        if (this.gameWon()) {
          clearInterval(this.timerInterval);
        }
      }, 500);
    } else {
      // No match - flip back
      setTimeout(() => {
        this.updateCard(card1.id, { isFlipped: false });
        this.updateCard(card2.id, { isFlipped: false });
        this.flippedCards = [];
        this.isChecking.set(false);
      }, 1000);
    }
  }

  private updateCard(id: number, updates: Partial<Card>): void {
    this.cards.update(cards =>
      cards.map(c => c.id === id ? { ...c, ...updates } : c)
    );
  }

  resetGame(): void {
    clearInterval(this.timerInterval);
    this.moves.set(0);
    this.elapsedTime.set(0);
    this.flippedCards = [];
    this.isChecking.set(false);
    this.initGame();
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  scrollToFeatures(): void {
    document.getElementById('angular-features')?.scrollIntoView({ behavior: 'smooth' });
  }
}
