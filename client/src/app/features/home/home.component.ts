import { Component, inject, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Profile } from '../../core/services/api.service';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="home" class="hero">
      <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>

      <div class="hero-content">
        @if (profile(); as p) {
          <div class="hero-text" data-animate="fade-right">
            <span class="greeting">Hello, I'm</span>
            <h1 class="name text-shimmer">{{ p.name }}</h1>
            <h2 class="title">
              <span class="typing-text">{{ displayText() }}</span>
              <span class="cursor">|</span>
            </h2>
            <p class="summary">{{ p.tagline }}</p>

            <div class="hero-stats stagger-children">
              <div class="stat">
                <span class="stat-number">{{ p.yearsOfExperience }}+</span>
                <span class="stat-label">Years Experience</span>
              </div>
              <div class="stat">
                <span class="stat-number">4+</span>
                <span class="stat-label">Domains</span>
              </div>
              <div class="stat">
                <span class="stat-number">10+</span>
                <span class="stat-label">Projects</span>
              </div>
            </div>

            <div class="hero-actions">
              <button class="btn-primary" (click)="scrollTo('contact')">
                Get in Touch
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <a class="btn-secondary" [href]="p.resumeUrl" target="_blank" rel="noopener">
                Download CV
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </a>
            </div>

            <div class="social-links">
              @for (link of p.socialLinks; track link.platform) {
                <a
                  [href]="link.url"
                  target="_blank"
                  rel="noopener"
                  class="social-link"
                  [attr.aria-label]="link.platform"
                >
                  <i [class]="link.icon"></i>
                </a>
              }
            </div>
          </div>

          <div class="hero-image" data-animate="fade-left" data-delay="200">
            <div class="image-wrapper animate-float">
              <div class="image-border"></div>
              @if (p.avatar) {
                <img
                  [src]="p.avatar"
                  [alt]="p.name"
                  class="avatar"
                  [class.pressing]="isPressing()"
                  (mousedown)="startLongPress($event, p.avatar)"
                  (mouseup)="endLongPress()"
                  (mouseleave)="endLongPress()"
                  (touchstart)="startLongPress($event, p.avatar)"
                  (touchend)="endLongPress()"
                  (touchcancel)="endLongPress()"
                />
              } @else {
                <div class="avatar-initials"
                  [class.pressing]="isPressing()"
                  (mousedown)="startLongPress($event, null)"
                  (mouseup)="endLongPress()"
                  (mouseleave)="endLongPress()"
                  (touchstart)="startLongPress($event, null)"
                  (touchend)="endLongPress()"
                  (touchcancel)="endLongPress()">
                  {{ getInitials(p.name) }}
                </div>
              }
              <span class="long-press-hint">Hold to zoom</span>
            </div>
            <div class="tech-badges">
              <span class="badge">Angular</span>
              <span class="badge">Node.js</span>
              <span class="badge">MongoDB</span>
              <span class="badge">TypeScript</span>
            </div>
          </div>
        } @else {
          <div class="loading">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-subtitle"></div>
            <div class="skeleton skeleton-text"></div>
          </div>
        }
      </div>

      <div class="scroll-indicator" (click)="scrollTo('about')">
        <span>Scroll Down</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>

    <!-- Image Zoom Overlay -->
    @if (isZooming()) {
      <div class="zoom-overlay" (click)="endLongPress()" (touchend)="endLongPress()">
        <div class="zoom-container">
          @if (zoomImageSrc()) {
            <img [src]="zoomImageSrc()" alt="Zoomed profile" class="zoomed-image" />
          } @else {
            <div class="zoomed-initials">
              {{ profile()?.name ? getInitials(profile()!.name) : '' }}
            </div>
          }
        </div>
        <span class="zoom-hint">Release to close</span>
      </div>
    }
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      padding: 6rem 2rem 4rem;
    }

    .hero-background {
      position: absolute;
      inset: 0;
      z-index: -1;
    }

    .gradient-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.5;
      animation: float 20s ease-in-out infinite;

      &.orb-1 {
        width: 400px;
        height: 400px;
        background: var(--accent-primary);
        top: -100px;
        right: -100px;
      }

      &.orb-2 {
        width: 300px;
        height: 300px;
        background: var(--accent-secondary);
        bottom: -50px;
        left: -50px;
        animation-delay: -5s;
      }

      &.orb-3 {
        width: 200px;
        height: 200px;
        background: var(--accent-tertiary);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation-delay: -10s;
      }
    }

    .hero-content {
      max-width: 1200px;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }

    .hero-text {
      .greeting {
        display: inline-block;
        color: var(--accent-primary);
        font-size: 1.1rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
      }

      .name {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: 800;
        line-height: 1.1;
        margin-bottom: 0.5rem;
        background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-primary) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .title {
        font-size: clamp(1.25rem, 3vw, 1.75rem);
        color: var(--text-secondary);
        font-weight: 500;
        margin-bottom: 1rem;
        height: 2.5rem;
      }

      .typing-text {
        color: var(--accent-primary);
      }

      .cursor {
        animation: blink 1s step-end infinite;
      }

      .summary {
        color: var(--text-secondary);
        font-size: 1rem;
        line-height: 1.6;
        margin-bottom: 2rem;
        max-width: 500px;

        @media (max-width: 900px) {
          margin: 0 auto 2rem;
        }
      }
    }

    .hero-stats {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;

      @media (max-width: 900px) {
        justify-content: center;
      }

      .stat {
        text-align: center;

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: var(--accent-primary);
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }
      }
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;

      @media (max-width: 900px) {
        justify-content: center;
      }

      @media (max-width: 480px) {
        flex-direction: column;
      }
    }

    .btn-primary,
    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.5rem;
      border-radius: 30px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      color: white;
      border: none;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(79, 172, 254, 0.4);
      }
    }

    .btn-secondary {
      background: transparent;
      color: var(--text-primary);
      border: 2px solid var(--border-color);

      &:hover {
        border-color: var(--accent-primary);
        color: var(--accent-primary);
      }
    }

    .social-links {
      display: flex;
      gap: 1rem;

      @media (max-width: 900px) {
        justify-content: center;
      }

      .social-link {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: var(--bg-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
        transition: all 0.3s ease;

        &:hover {
          background: var(--accent-primary);
          color: white;
          transform: translateY(-3px);
        }
      }
    }

    .hero-image {
      position: relative;

      @media (max-width: 900px) {
        order: -1;
        margin-bottom: 2rem;
      }

      .image-wrapper {
        position: relative;
        width: 300px;
        height: 300px;
        margin: 0 auto;
        aspect-ratio: 1 / 1;
        flex-shrink: 0;

        @media (max-width: 480px) {
          width: 220px;
          height: 220px;
        }
      }

      .image-border {
        position: absolute;
        inset: -10px;
        border: 3px solid var(--accent-primary);
        border-radius: 50%;
        animation: rotate 20s linear infinite;
      }

      .avatar {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        border: 5px solid var(--bg-primary);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
      }

      .avatar-initials {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 5px solid var(--bg-primary);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 5rem;
        font-weight: 700;
        color: white;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      }

      .tech-badges {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: center;
        margin-top: 1.5rem;

        .badge {
          background: var(--bg-secondary);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
        }
      }
    }

    .scroll-indicator {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-tertiary);
      cursor: pointer;
      animation: bounce 2s infinite;

      span {
        font-size: 0.85rem;
      }
    }

    .loading {
      .skeleton {
        background: linear-gradient(90deg, var(--bg-secondary) 25%, var(--bg-tertiary) 50%, var(--bg-secondary) 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 4px;
        margin-bottom: 1rem;

        &-title {
          height: 60px;
          width: 80%;
        }

        &-subtitle {
          height: 30px;
          width: 60%;
        }

        &-text {
          height: 100px;
          width: 100%;
        }
      }
    }

    @keyframes float {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(30px, 30px); }
    }

    @keyframes blink {
      50% { opacity: 0; }
    }

    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
      40% { transform: translateX(-50%) translateY(-10px); }
      60% { transform: translateX(-50%) translateY(-5px); }
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    /* Image Zoom Overlay Styles */
    .zoom-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(10px);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease-out;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
    }

    .zoom-container {
      animation: zoomIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .zoomed-image {
      max-width: 90vw;
      max-height: 80vh;
      width: auto;
      height: auto;
      border-radius: 20px;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
      object-fit: contain;
    }

    .zoomed-initials {
      width: 70vmin;
      height: 70vmin;
      max-width: 500px;
      max-height: 500px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10rem;
      font-weight: 700;
      color: white;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
    }

    .zoom-hint {
      margin-top: 2rem;
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.9rem;
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes zoomIn {
      from {
        transform: scale(0.5);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.7; }
      50% { opacity: 1; }
    }

    /* Cursor hint on avatar */
    .avatar, .avatar-initials {
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &.pressing {
        transform: scale(0.92);
        box-shadow: 0 10px 30px rgba(79, 172, 254, 0.5);
      }
    }

    .long-press-hint {
      display: block;
      text-align: center;
      margin-top: 0.75rem;
      font-size: 0.75rem;
      color: var(--text-tertiary);
      opacity: 0.7;
    }
  `]
})
export class HomeComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly scrollService = inject(ScrollService);

  readonly profile = signal<Profile | null>(null);
  readonly displayText = signal('');
  readonly isZooming = signal(false);
  readonly zoomImageSrc = signal<string | null>(null);
  readonly isPressing = signal(false);

  private longPressTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly LONG_PRESS_DURATION = 400; // ms

  private readonly titles = [
    'Senior MEAN Stack Developer',
    'Angular Expert',
    'Node.js Specialist',
    'AI Integration Enthusiast',
    'Full-Stack Developer'
  ];

  private currentTitleIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;

  ngOnInit(): void {
    this.loadProfile();
    this.startTypingAnimation();
  }

  private loadProfile(): void {
    this.apiService.getProfile().subscribe({
      next: (response) => {
        if (response.success) {
          this.profile.set(response.data);
        }
      },
      error: (err) => console.error('Failed to load profile:', err)
    });
  }

  private startTypingAnimation(): void {
    const type = () => {
      const currentTitle = this.titles[this.currentTitleIndex];

      if (this.isDeleting) {
        this.displayText.set(currentTitle.substring(0, this.currentCharIndex - 1));
        this.currentCharIndex--;
      } else {
        this.displayText.set(currentTitle.substring(0, this.currentCharIndex + 1));
        this.currentCharIndex++;
      }

      let typeSpeed = this.isDeleting ? 50 : 100;

      if (!this.isDeleting && this.currentCharIndex === currentTitle.length) {
        typeSpeed = 2000; // Pause at end
        this.isDeleting = true;
      } else if (this.isDeleting && this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length;
        typeSpeed = 500; // Pause before new title
      }

      setTimeout(type, typeSpeed);
    };

    type();
  }

  scrollTo(sectionId: string): void {
    this.scrollService.scrollTo(sectionId);
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  startLongPress(event: Event, imageSrc: string | null): void {
    // Don't prevent default - let touch events work naturally
    this.isPressing.set(true);

    this.longPressTimer = setTimeout(() => {
      this.zoomImageSrc.set(imageSrc);
      this.isZooming.set(true);
      this.isPressing.set(false);
      // Prevent scrolling while zoomed
      document.body.style.overflow = 'hidden';
      // Vibrate on mobile if supported
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    }, this.LONG_PRESS_DURATION);
  }

  endLongPress(): void {
    this.isPressing.set(false);

    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }

    if (this.isZooming()) {
      this.isZooming.set(false);
      this.zoomImageSrc.set(null);
      document.body.style.overflow = '';
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.endLongPress();
  }
}
