import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main/main.component').then((m) => m.MainComponent),
    title: 'Rishab Sood | Senior MEAN Stack Developer'
  },
  {
    path: 'games',
    loadComponent: () =>
      import('./pages/games-hub/games-hub.component').then((m) => m.GamesHubComponent),
    title: 'Angular Games | Rishab Sood Portfolio'
  },
  {
    path: 'game',
    redirectTo: 'games',
    pathMatch: 'full'
  },
  {
    path: 'game/memory',
    loadComponent: () =>
      import('./pages/game/game.component').then((m) => m.GameComponent),
    title: 'Tech Memory | Angular Games'
  },
  {
    path: 'game/vault',
    loadComponent: () =>
      import('./pages/vault-game/vault-game.component').then((m) => m.VaultGameComponent),
    title: 'Vault Heist | Angular Games'
  },
  {
    path: 'game/potion',
    loadComponent: () =>
      import('./pages/potion-lab/potion-lab.component').then((m) => m.PotionLabComponent),
    title: 'Potion Lab | Angular Games'
  },
  {
    path: 'game/quiz',
    loadComponent: () =>
      import('./pages/quiz-game/quiz-game.component').then((m) => m.QuizGameComponent),
    title: 'Angular Quiz | Angular Games'
  },
  {
    path: 'project/:slug',
    loadComponent: () =>
      import('./pages/project-detail/project-detail.component').then(
        (m) => m.ProjectDetailComponent
      ),
    title: 'Project Details | Rishab Sood'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
