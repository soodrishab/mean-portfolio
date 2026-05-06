import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// Custom Validator Example
function matchAnswer(correctIndex: number) {
  return (control: AbstractControl) => {
    return control.value === correctIndex ? null : { wrongAnswer: true };
  };
}

@Component({
  selector: 'app-quiz-game',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <section class="quiz-section">
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
          <h1>📝 Angular Mastery Quiz</h1>
          <p>Test your Angular knowledge with reactive forms!</p>
          <button class="features-btn" (click)="scrollToFeatures()">🅰️ See Angular Features</button>
        </div>

        <div class="game-description">
          <p><strong>How to Play:</strong> Answer 5 Angular questions to test your knowledge.
          Each correct answer earns 10 points. Watch the form status indicators to see
          reactive forms in action - valid/invalid states, touched, and dirty tracking!</p>
        </div>

        <div class="progress-bar">
          <div class="progress" [style.width.%]="progressPercent()"></div>
          <span class="progress-text">{{ currentIndex() + 1 }} / {{ questions.length }}</span>
        </div>

        @if (!quizComplete()) {
          <form [formGroup]="quizForm" (ngSubmit)="submitAnswer()" class="quiz-form">
            <div class="question-card">
              <span class="question-number">Question {{ currentIndex() + 1 }}</span>
              <h2>{{ currentQuestion().question }}</h2>

              <div class="options-list">
                @for (option of currentQuestion().options; track $index) {
                  <label
                    class="option-label"
                    [class.selected]="quizForm.get('answer')?.value === $index"
                    [class.correct]="showResult() && $index === currentQuestion().correctIndex"
                    [class.wrong]="showResult() && quizForm.get('answer')?.value === $index && $index !== currentQuestion().correctIndex"
                  >
                    <input
                      type="radio"
                      formControlName="answer"
                      [value]="$index"
                      [attr.disabled]="showResult() ? true : null"
                    />
                    <span class="option-marker">{{ ['A', 'B', 'C', 'D'][$index] }}</span>
                    <span class="option-text">{{ option }}</span>
                  </label>
                }
              </div>

              @if (showResult()) {
                <div class="explanation" [class.correct]="isCorrect()">
                  @if (isCorrect()) {
                    <p>✅ Correct! +10 points</p>
                  } @else {
                    <p>❌ Wrong! The correct answer was: {{ currentQuestion().options[currentQuestion().correctIndex] }}</p>
                  }
                  <p class="explain-text">{{ currentQuestion().explanation }}</p>
                </div>
              }

              <div class="form-status">
                <span [class.valid]="quizForm.valid" [class.invalid]="quizForm.invalid && quizForm.touched">
                  Form Status: {{ quizForm.valid ? '✓ Valid' : '✗ Invalid' }}
                </span>
                <span>Touched: {{ quizForm.touched ? 'Yes' : 'No' }}</span>
                <span>Dirty: {{ quizForm.dirty ? 'Yes' : 'No' }}</span>
              </div>
            </div>

            <div class="quiz-actions">
              @if (!showResult()) {
                <button
                  type="submit"
                  class="submit-btn"
                  [disabled]="quizForm.invalid"
                >
                  Submit Answer
                </button>
              } @else {
                <button
                  type="button"
                  class="next-btn"
                  (click)="nextQuestion()"
                >
                  {{ isLastQuestion() ? 'See Results' : 'Next Question →' }}
                </button>
              }
            </div>
          </form>
        } @else {
          <div class="results-card">
            <h2>🎉 Quiz Complete!</h2>
            <div class="score-display">
              <span class="score">{{ score() }}</span>
              <span class="max-score">/ {{ questions.length * 10 }}</span>
            </div>
            <div class="rating">
              @if (score() >= 40) {
                <span class="badge expert">🏆 Angular Expert!</span>
              } @else if (score() >= 25) {
                <span class="badge good">⭐ Good Knowledge!</span>
              } @else {
                <span class="badge learning">📚 Keep Learning!</span>
              }
            </div>
            <p class="stats">You got {{ correctAnswers() }} out of {{ questions.length }} correct</p>
            <button class="restart-btn" (click)="restartQuiz()">Play Again</button>
          </div>
        }

        <div id="angular-features" class="angular-features">
          <h3>🅰️ Angular Features Demonstrated</h3>
          <div class="features-grid">
            <div class="feature">
              <code>FormGroup</code>
              <span>Groups form controls together</span>
            </div>
            <div class="feature">
              <code>FormBuilder</code>
              <span>Injected service to build forms</span>
            </div>
            <div class="feature">
              <code>Validators</code>
              <span>Built-in validation rules</span>
            </div>
            <div class="feature">
              <code>Custom Validator</code>
              <span>matchAnswer() function</span>
            </div>
            <div class="feature">
              <code>formControlName</code>
              <span>Binds input to form control</span>
            </div>
            <div class="feature">
              <code>Form State</code>
              <span>valid, touched, dirty tracking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .quiz-section {
      min-height: 100vh;
      padding: 6rem 2rem 4rem;
      background: var(--bg-primary);
    }

    .container { max-width: 700px; margin: 0 auto; }

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
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 12px;
      padding: 1rem 1.5rem;
      margin-bottom: 2rem;
      p { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin: 0; }
      strong { color: var(--text-primary); }
    }

    .progress-bar {
      position: relative; height: 8px; background: var(--bg-tertiary);
      border-radius: 4px; margin-bottom: 2rem; overflow: visible;
      .progress {
        height: 100%; background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
        border-radius: 4px; transition: width 0.3s ease;
      }
      .progress-text {
        position: absolute; right: 0; top: -25px;
        font-size: 0.85rem; color: var(--text-tertiary);
      }
    }

    .quiz-form { margin-bottom: 2rem; }

    .question-card {
      background: var(--bg-secondary); padding: 2rem; border-radius: 16px;
      border: 1px solid var(--border-color); margin-bottom: 1.5rem;
      .question-number {
        display: inline-block; background: var(--accent-primary); color: white;
        padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;
        font-weight: 600; margin-bottom: 1rem;
      }
      h2 { color: var(--text-primary); font-size: 1.3rem; margin-bottom: 1.5rem; line-height: 1.5; }
    }

    .options-list { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem; }

    .option-label {
      display: flex; align-items: center; gap: 1rem;
      padding: 1rem 1.25rem; background: var(--bg-primary);
      border: 2px solid var(--border-color); border-radius: 12px;
      cursor: pointer; transition: all 0.2s;
      input { display: none; }
      .option-marker {
        width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
        background: var(--bg-tertiary); border-radius: 8px; font-weight: 600;
        color: var(--text-secondary);
      }
      .option-text { color: var(--text-primary); flex: 1; }
      &:hover:not(.correct):not(.wrong) { border-color: var(--accent-primary); }
      &.selected {
        border-color: var(--accent-primary); background: rgba(37,99,235,0.05);
        .option-marker { background: var(--accent-primary); color: white; }
      }
      &.correct {
        border-color: #10b981; background: rgba(16,185,129,0.1);
        .option-marker { background: #10b981; color: white; }
      }
      &.wrong {
        border-color: #ef4444; background: rgba(239,68,68,0.1);
        .option-marker { background: #ef4444; color: white; }
      }
    }

    .explanation {
      padding: 1rem; border-radius: 10px; background: rgba(239,68,68,0.1);
      border-left: 4px solid #ef4444; margin-bottom: 1rem;
      &.correct { background: rgba(16,185,129,0.1); border-color: #10b981; }
      p { color: var(--text-primary); margin-bottom: 0.5rem; &:last-child { margin: 0; } }
      .explain-text { color: var(--text-secondary); font-size: 0.9rem; }
    }

    .form-status {
      display: flex; gap: 1.5rem; flex-wrap: wrap;
      padding-top: 1rem; border-top: 1px solid var(--border-color);
      span {
        font-size: 0.8rem; color: var(--text-tertiary); font-family: monospace;
        &.valid { color: #10b981; }
        &.invalid { color: #ef4444; }
      }
    }

    .quiz-actions { display: flex; justify-content: center; }

    .submit-btn, .next-btn {
      padding: 1rem 3rem; background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      color: white; border: none; border-radius: 12px; font-size: 1.1rem;
      font-weight: 600; cursor: pointer; transition: all 0.2s;
      &:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 5px 20px rgba(37,99,235,0.3); }
      &:disabled { opacity: 0.5; cursor: not-allowed; }
    }

    .results-card {
      text-align: center; padding: 3rem; background: var(--bg-secondary);
      border-radius: 20px; border: 1px solid var(--border-color); margin-bottom: 2rem;
      h2 { font-size: 2rem; color: var(--text-primary); margin-bottom: 1.5rem; }
    }

    .score-display {
      margin-bottom: 1.5rem;
      .score { font-size: 4rem; font-weight: 800; color: var(--accent-primary); }
      .max-score { font-size: 2rem; color: var(--text-tertiary); }
    }

    .rating {
      margin-bottom: 1rem;
      .badge {
        display: inline-block; padding: 0.75rem 1.5rem; border-radius: 30px;
        font-size: 1.2rem; font-weight: 600;
        &.expert { background: linear-gradient(135deg, #10b981, #059669); color: white; }
        &.good { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; }
        &.learning { background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; }
      }
    }

    .stats { color: var(--text-secondary); margin-bottom: 2rem; }

    .restart-btn {
      padding: 1rem 2.5rem; background: var(--accent-primary); color: white;
      border: none; border-radius: 12px; font-size: 1.1rem; font-weight: 600;
      cursor: pointer; transition: all 0.2s;
      &:hover { transform: translateY(-2px); }
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

    @media (max-width: 768px) {
      .quiz-section { padding: 5rem 1rem 3rem; }
      .game-header h1 { font-size: 1.8rem; }
      .question-card { padding: 1.5rem; }
      .question-card h2 { font-size: 1.1rem; }
      .option-label { padding: 0.75rem 1rem; gap: 0.75rem; }
      .option-marker { width: 28px; height: 28px; font-size: 0.9rem; }
      .form-status { gap: 1rem; }
      .results-card { padding: 2rem; }
      .score-display .score { font-size: 3rem; }
      .angular-features { padding: 1.5rem 1rem; }
    }

    @media (max-width: 480px) {
      .nav-links { flex-wrap: wrap; gap: 0.5rem; }
      .submit-btn, .next-btn { padding: 0.875rem 2rem; font-size: 1rem; }
    }
  `]
})
export class QuizGameComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  quizForm!: FormGroup;
  readonly currentIndex = signal(0);
  readonly score = signal(0);
  readonly correctAnswers = signal(0);
  readonly showResult = signal(false);
  readonly quizComplete = signal(false);
  readonly isCorrect = signal(false);

  readonly questions: Question[] = [
    {
      id: 1,
      question: 'Which decorator is used to inject dependencies in Angular?',
      options: ['@Component', '@Injectable', '@Input', '@Inject'],
      correctIndex: 3,
      explanation: '@Inject() decorator is used for dependency injection, especially for tokens.'
    },
    {
      id: 2,
      question: 'What is the purpose of FormBuilder service?',
      options: ['Build UI components', 'Create reactive forms easily', 'Build routes', 'Create HTTP requests'],
      correctIndex: 1,
      explanation: 'FormBuilder is a service that provides convenient methods to create FormGroup and FormControl instances.'
    },
    {
      id: 3,
      question: 'Which method subscribes to form value changes?',
      options: ['onChange()', 'valueChanges', 'subscribe()', 'watch()'],
      correctIndex: 1,
      explanation: 'valueChanges is an Observable that emits whenever the form value changes.'
    },
    {
      id: 4,
      question: 'What does Validators.required do?',
      options: ['Makes field optional', 'Validates email format', 'Ensures field is not empty', 'Sets default value'],
      correctIndex: 2,
      explanation: 'Validators.required ensures the form control has a non-empty value.'
    },
    {
      id: 5,
      question: 'How do you access a specific form control?',
      options: ['form.control(name)', 'form.get(name)', 'form[name]', 'form.find(name)'],
      correctIndex: 1,
      explanation: 'form.get(controlName) returns the AbstractControl for the specified name.'
    }
  ];

  readonly currentQuestion = computed(() => this.questions[this.currentIndex()]);
  readonly progressPercent = computed(() => ((this.currentIndex() + 1) / this.questions.length) * 100);
  readonly isLastQuestion = computed(() => this.currentIndex() === this.questions.length - 1);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.quizForm = this.fb.group({
      answer: [null, [Validators.required]]
    });
  }

  submitAnswer(): void {
    if (this.quizForm.invalid) return;

    const selectedAnswer = this.quizForm.get('answer')?.value;
    const correct = selectedAnswer === this.currentQuestion().correctIndex;

    this.isCorrect.set(correct);
    this.showResult.set(true);

    if (correct) {
      this.score.update(s => s + 10);
      this.correctAnswers.update(c => c + 1);
    }
  }

  nextQuestion(): void {
    if (this.isLastQuestion()) {
      this.quizComplete.set(true);
    } else {
      this.currentIndex.update(i => i + 1);
      this.showResult.set(false);
      this.quizForm.reset();
    }
  }

  restartQuiz(): void {
    this.currentIndex.set(0);
    this.score.set(0);
    this.correctAnswers.set(0);
    this.showResult.set(false);
    this.quizComplete.set(false);
    this.quizForm.reset();
  }

  scrollToFeatures(): void {
    document.getElementById('angular-features')?.scrollIntoView({ behavior: 'smooth' });
  }
}
