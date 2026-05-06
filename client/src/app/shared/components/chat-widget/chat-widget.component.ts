import { Component, inject, signal, ElementRef, ViewChild, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../core/services/chat.service';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Chat Toggle Button -->
    <button
      class="chat-toggle"
      [class.open]="chatService.isOpen()"
      (click)="chatService.toggleChat()"
      aria-label="Toggle chat"
    >
      @if (chatService.isOpen()) {
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      } @else {
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span class="chat-badge">?</span>
      }
    </button>

    <!-- Chat Window -->
    @if (chatService.isOpen()) {
      <div class="chat-window">
        <div class="chat-header">
          <div class="header-info">
            <div class="avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            </div>
            <div>
              <h3>Portfolio Assistant</h3>
              <span class="status">Quick answers about Rishab</span>
            </div>
          </div>
          <button class="close-btn" (click)="chatService.closeChat()" aria-label="Close chat">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="chat-messages" #messagesContainer>
          @for (message of chatService.messages(); track $index) {
            <div class="message" [class.user]="message.role === 'user'" [class.assistant]="message.role === 'assistant'">
              <div class="message-content">
                {{ message.content }}
              </div>
            </div>
          }

          @if (chatService.isLoading()) {
            <div class="message assistant">
              <div class="message-content typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          }

          @if (chatService.error()) {
            <div class="error-message">
              {{ chatService.error() }}
            </div>
          }
        </div>

        <!-- Suggestions -->
        @if (chatService.messages().length <= 1) {
          <div class="suggestions">
            @for (suggestion of chatService.suggestions().slice(0, 4); track suggestion) {
              <button class="suggestion-chip" (click)="sendMessage(suggestion)">
                {{ suggestion }}
              </button>
            }
          </div>
        }

        <form class="chat-input" (submit)="onSubmit($event)">
          <input
            type="text"
            [(ngModel)]="inputMessage"
            name="message"
            placeholder="Ask me anything..."
            [disabled]="chatService.isLoading()"
            autocomplete="off"
          />
          <button
            type="submit"
            [disabled]="!inputMessage().trim() || chatService.isLoading()"
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </form>
      </div>
    }
  `,
  styles: [`
    .chat-toggle {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: 0 4px 20px rgba(79, 172, 254, 0.4);
      transition: all 0.3s ease;
      z-index: 1001;

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 25px rgba(79, 172, 254, 0.5);
      }

      &.open {
        background: var(--bg-secondary);
        color: var(--text-primary);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }
    }

    .chat-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background: var(--accent-secondary);
      color: white;
      font-size: 0.6rem;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 10px;
    }

    .chat-window {
      position: fixed;
      bottom: 6rem;
      right: 2rem;
      width: 380px;
      max-width: calc(100vw - 2rem);
      height: 500px;
      max-height: calc(100vh - 8rem);
      background: var(--bg-primary);
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 1000;
      border: 1px solid var(--border-color);
      animation: slideIn 0.3s ease-out;

      @media (max-width: 480px) {
        right: 1rem;
        bottom: 5rem;
        width: calc(100vw - 2rem);
        height: calc(100vh - 7rem);
      }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .chat-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      color: white;
    }

    .header-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .avatar {
        width: 36px;
        height: 36px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      h3 {
        font-size: 1rem;
        font-weight: 600;
        margin: 0;
      }

      .status {
        font-size: 0.75rem;
        opacity: 0.9;
      }
    }

    .close-btn {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      padding: 0.5rem;
      border-radius: 50%;
      cursor: pointer;
      color: white;
      transition: background 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .message {
      max-width: 85%;
      animation: fadeIn 0.3s ease;

      &.user {
        align-self: flex-end;

        .message-content {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          color: white;
          border-radius: 18px 18px 4px 18px;
        }
      }

      &.assistant {
        align-self: flex-start;

        .message-content {
          background: var(--bg-secondary);
          color: var(--text-primary);
          border-radius: 18px 18px 18px 4px;
        }
      }
    }

    .message-content {
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
      line-height: 1.5;

      &.typing {
        display: flex;
        gap: 4px;
        padding: 1rem;

        span {
          width: 8px;
          height: 8px;
          background: var(--text-tertiary);
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out;

          &:nth-child(1) { animation-delay: -0.32s; }
          &:nth-child(2) { animation-delay: -0.16s; }
        }
      }
    }

    .error-message {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.85rem;
      text-align: center;
    }

    .suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      padding: 0 1rem 1rem;
    }

    .suggestion-chip {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      padding: 0.5rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: var(--accent-primary);
        color: white;
        border-color: var(--accent-primary);
      }
    }

    .chat-input {
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
      border-top: 1px solid var(--border-color);

      input {
        flex: 1;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        padding: 0.75rem 1rem;
        border-radius: 25px;
        font-size: 0.9rem;
        color: var(--text-primary);
        outline: none;

        &:focus {
          border-color: var(--accent-primary);
        }

        &::placeholder {
          color: var(--text-tertiary);
        }
      }

      button {
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        border: none;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        cursor: pointer;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;

        &:hover:not(:disabled) {
          transform: scale(1.05);
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
  `]
})
export class ChatWidgetComponent {
  readonly chatService = inject(ChatService);

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  readonly inputMessage = signal('');

  constructor() {
    // Scroll to bottom when messages change
    effect(() => {
      const messages = this.chatService.messages();
      if (messages.length > 0) {
        setTimeout(() => this.scrollToBottom(), 0);
      }
    });
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      const container = this.messagesContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.sendMessage(this.inputMessage());
  }

  sendMessage(message: string): void {
    if (message.trim()) {
      this.chatService.sendMessage(message);
      this.inputMessage.set('');
    }
  }
}
