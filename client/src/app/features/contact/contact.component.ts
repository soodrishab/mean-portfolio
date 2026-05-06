import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="contact-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Get in Touch</span>
          <h2 class="section-title">Let's Work Together</h2>
          <p class="section-subtitle">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </div>

        <div class="contact-content">
          <div class="contact-info">
            <div class="info-card">
              <div class="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <h4>Email</h4>
                <a href="mailto:rishabsood9@gmail.com">rishabsood9&#64;gmail.com</a>
              </div>
            </div>

            <div class="info-card">
              <div class="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div>
                <h4>Phone</h4>
                <a href="tel:+919592006999">+91 9592006999</a>
              </div>
            </div>

            <div class="info-card">
              <div class="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <h4>Location</h4>
                <span>Gurgaon, India · Open to Remote</span>
              </div>
            </div>

            <div class="social-links">
              <a href="https://github.com/rishabsood9" target="_blank" rel="noopener" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/rishabsood" target="_blank" rel="noopener" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://twitter.com/rishabsood1" target="_blank" rel="noopener" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
            </div>
          </div>

          <form class="contact-form" (ngSubmit)="onSubmit()" #form="ngForm">
            @if (showToast()) {
              <div class="toast-message">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span>Thank you for your message! I'll get back to you soon.</span>
              </div>
            }

            <div class="form-group">
                <label for="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  [(ngModel)]="formData.name"
                  #nameInput="ngModel"
                  required
                  placeholder="Your name"
                  [disabled]="isSubmitting()"
                  [class.invalid]="submitted() && nameInput.invalid"
                />
                @if (submitted() && nameInput.invalid) {
                  <span class="field-error">Name is required</span>
                }
              </div>

              <div class="form-group">
                <label for="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  [(ngModel)]="formData.email"
                  #emailInput="ngModel"
                  required
                  email
                  placeholder="your.email@example.com"
                  [disabled]="isSubmitting()"
                  [class.invalid]="submitted() && emailInput.invalid"
                />
                @if (submitted() && emailInput.invalid) {
                  <span class="field-error">
                    @if (emailInput.errors?.['required']) {
                      Email is required
                    } @else {
                      Please enter a valid email
                    }
                  </span>
                }
              </div>

              <div class="form-group">
                <label for="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  [(ngModel)]="formData.subject"
                  placeholder="What's this about?"
                  [disabled]="isSubmitting()"
                />
              </div>

              <div class="form-group">
                <label for="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  [(ngModel)]="formData.message"
                  #messageInput="ngModel"
                  required
                  rows="5"
                  placeholder="Tell me about your project or just say hello..."
                  [disabled]="isSubmitting()"
                  [class.invalid]="submitted() && messageInput.invalid"
                ></textarea>
                @if (submitted() && messageInput.invalid) {
                  <span class="field-error">Message is required</span>
                }
              </div>

              @if (submitError()) {
                <div class="error-message">
                  <p>{{ submitError() }}</p>
                </div>
              }

              <button
                type="submit"
                class="submit-btn"
                [disabled]="isSubmitting()"
              >
                @if (isSubmitting()) {
                  <span class="loading-spinner"></span>
                  Sending...
                } @else {
                  Send Message
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                }
              </button>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      padding: 6rem 2rem;
      background: var(--bg-secondary);
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;

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
        font-size: clamp(2rem, 4vw, 2.5rem);
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 1rem;
      }

      .section-subtitle {
        color: var(--text-secondary);
        font-size: 1.1rem;
        max-width: 600px;
        margin: 0 auto;
      }
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 4rem;
      align-items: start;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .info-card {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1.25rem;
      background: var(--bg-primary);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;

      &:hover {
        transform: translateX(5px);
        border-color: var(--accent-primary);
      }

      .info-icon {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        flex-shrink: 0;
      }

      h4 {
        font-size: 0.85rem;
        color: var(--text-tertiary);
        margin-bottom: 0.25rem;
      }

      a, span {
        color: var(--text-primary);
        font-weight: 500;
        text-decoration: none;
      }

      a:hover {
        color: var(--accent-primary);
      }
    }

    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;

      a {
        width: 44px;
        height: 44px;
        background: var(--bg-primary);
        border: 1px solid var(--border-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
        transition: all 0.3s ease;

        &:hover {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          color: white;
          transform: translateY(-3px);
        }
      }
    }

    .contact-form {
      background: var(--bg-primary);
      padding: 2rem;
      border-radius: 16px;
      border: 1px solid var(--border-color);
    }

    .form-group {
      margin-bottom: 1.5rem;

      label {
        display: block;
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
      }

      input, textarea {
        width: 100%;
        padding: 0.875rem 1rem;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        font-size: 1rem;
        color: var(--text-primary);
        transition: border-color 0.3s ease;

        &::placeholder {
          color: var(--text-tertiary);
        }

        &:focus {
          outline: none;
          border-color: var(--accent-primary);
        }

        &:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        &.invalid {
          border-color: #ef4444;
        }
      }

      .field-error {
        display: block;
        color: #ef4444;
        font-size: 0.8rem;
        margin-top: 0.35rem;
      }

      textarea {
        resize: vertical;
        min-height: 120px;
      }
    }

    .submit-btn {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s ease;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(79, 172, 254, 0.4);
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid white;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    .toast-message {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: #22c55e;
      color: white;
      padding: 1rem 1.25rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      animation: slideDown 0.3s ease, fadeOut 0.3s ease 4.7s forwards;

      svg {
        flex-shrink: 0;
      }

      span {
        font-size: 0.95rem;
        font-weight: 500;
      }
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    .error-message {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class ContactComponent {
  private readonly apiService = inject(ApiService);

  formData: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  readonly isSubmitting = signal(false);
  readonly submitError = signal<string | null>(null);
  readonly submitted = signal(false);
  readonly showToast = signal(false);

  onSubmit(): void {
    this.submitted.set(true);

    // Validate required fields
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      return;
    }

    if (this.isSubmitting()) return;

    this.isSubmitting.set(true);
    this.submitError.set(null);

    this.apiService.submitContact(this.formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.showToast.set(true);
          this.resetForm();
          // Auto-hide toast after 5 seconds
          setTimeout(() => this.showToast.set(false), 5000);
        }
      },
      error: (err) => {
        this.submitError.set(err.message || 'Failed to send message. Please try again.');
        this.isSubmitting.set(false);
      },
      complete: () => {
        this.isSubmitting.set(false);
      }
    });
  }

  private resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    this.submitted.set(false);
  }
}
