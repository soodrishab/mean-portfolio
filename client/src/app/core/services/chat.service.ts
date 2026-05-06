import { Injectable, inject, signal } from '@angular/core';
import { ApiService, ChatMessage } from './api.service';
import { firstValueFrom } from 'rxjs';

export interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly apiService = inject(ApiService);

  // State signals
  readonly messages = signal<ChatMessage[]>([]);
  readonly isOpen = signal<boolean>(false);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly suggestions = signal<string[]>([]);

  constructor() {
    this.loadSuggestions();
  }

  private async loadSuggestions(): Promise<void> {
    try {
      const response = await firstValueFrom(this.apiService.getChatSuggestions());
      if (response.success) {
        this.suggestions.set(response.data);
      }
    } catch {
      // Use default suggestions if API fails
      this.suggestions.set([
        "What's your experience with Angular?",
        "Tell me about your projects",
        "How can I contact you?",
        "What AI technologies do you use?"
      ]);
    }
  }

  toggleChat(): void {
    this.isOpen.update((open) => !open);

    // Add welcome message if first time opening
    if (this.isOpen() && this.messages().length === 0) {
      this.messages.set([
        {
          role: 'assistant',
          content:
            "Hi! I'm Rishab's AI assistant. I can answer questions about his experience, skills, projects, and how to get in touch. What would you like to know?"
        }
      ]);
    }
  }

  openChat(): void {
    this.isOpen.set(true);
    if (this.messages().length === 0) {
      this.messages.set([
        {
          role: 'assistant',
          content:
            "Hi! I'm Rishab's AI assistant. I can answer questions about his experience, skills, projects, and how to get in touch. What would you like to know?"
        }
      ]);
    }
  }

  closeChat(): void {
    this.isOpen.set(false);
  }

  async sendMessage(content: string): Promise<void> {
    if (!content.trim() || this.isLoading()) {
      return;
    }

    const userMessage: ChatMessage = { role: 'user', content: content.trim() };

    // Add user message to history
    this.messages.update((msgs) => [...msgs, userMessage]);
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const response = await firstValueFrom(
        this.apiService.sendChatMessage(content, this.messages())
      );

      if (response.success) {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: response.data.message
        };
        this.messages.update((msgs) => [...msgs, assistantMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (err) {
      this.error.set('Sorry, I had trouble processing that. Please try again.');
      console.error('Chat error:', err);
    } finally {
      this.isLoading.set(false);
    }
  }

  clearChat(): void {
    this.messages.set([
      {
        role: 'assistant',
        content:
          "Hi! I'm Rishab's AI assistant. How can I help you today?"
      }
    ]);
    this.error.set(null);
  }
}
