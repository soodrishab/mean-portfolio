import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ChatWidgetComponent } from './shared/components/chat-widget/chat-widget.component';
import { AnimationService } from './core/services/animation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    ChatWidgetComponent
  ],
  template: `
    <app-navbar />
    <main>
      <router-outlet />
    </main>
    <app-footer />
    <app-chat-widget />
  `,
  styles: [`
    main {
      min-height: 100vh;
    }
  `]
})
export class App implements OnInit {
  private animationService = inject(AnimationService);

  ngOnInit(): void {
    this.animationService.init();
  }
}
