import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { GameAuthService } from '../services/game-auth.service';

// CanActivate Guard - Checks if user is logged in
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(GameAuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirect to vault login
  router.navigate(['/vault']);
  return false;
};

// CanActivate Guard - Checks if user has required level
export const levelGuard: CanActivateFn = (route, state) => {
  const authService = inject(GameAuthService);
  const router = inject(Router);

  const requiredLevel = route.data?.['requiredLevel'] ?? 1;

  if (!authService.isAuthenticated()) {
    router.navigate(['/vault']);
    return false;
  }

  if (authService.currentLevel() >= requiredLevel) {
    return true;
  }

  // Redirect to vault selection with message
  router.navigate(['/vault/select'], {
    queryParams: { blocked: requiredLevel }
  });
  return false;
};

// CanDeactivate Guard - Confirms leaving during active game
export interface CanLeaveGame {
  canLeave: () => boolean;
}

export const leaveGameGuard: CanDeactivateFn<CanLeaveGame> = (component) => {
  if (component.canLeave && !component.canLeave()) {
    return confirm('🚨 Are you sure you want to leave? Your progress will be lost!');
  }
  return true;
};
