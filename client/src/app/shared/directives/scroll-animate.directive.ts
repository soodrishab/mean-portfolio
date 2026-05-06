import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  @Input() appScrollAnimate: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'flip' = 'fade-up';
  @Input() animateDelay: number = 0;
  @Input() animateDuration: number = 600;
  @Input() animateOnce: boolean = true;

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setupInitialState();
    this.setupObserver();
  }

  private setupInitialState(): void {
    const element = this.el.nativeElement;

    this.renderer.setStyle(element, 'opacity', '0');
    this.renderer.setStyle(element, 'transition', `all ${this.animateDuration}ms ease-out ${this.animateDelay}ms`);

    switch (this.appScrollAnimate) {
      case 'fade-up':
        this.renderer.setStyle(element, 'transform', 'translateY(50px)');
        break;
      case 'fade-down':
        this.renderer.setStyle(element, 'transform', 'translateY(-50px)');
        break;
      case 'fade-left':
        this.renderer.setStyle(element, 'transform', 'translateX(50px)');
        break;
      case 'fade-right':
        this.renderer.setStyle(element, 'transform', 'translateX(-50px)');
        break;
      case 'zoom-in':
        this.renderer.setStyle(element, 'transform', 'scale(0.8)');
        break;
      case 'flip':
        this.renderer.setStyle(element, 'transform', 'perspective(1000px) rotateX(20deg)');
        break;
    }
  }

  private setupObserver(): void {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateIn();
          if (this.animateOnce) {
            this.observer.unobserve(entry.target);
          }
        } else if (!this.animateOnce) {
          this.setupInitialState();
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  private animateIn(): void {
    const element = this.el.nativeElement;
    this.renderer.setStyle(element, 'opacity', '1');
    this.renderer.setStyle(element, 'transform', 'translateY(0) translateX(0) scale(1) rotateX(0)');
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
