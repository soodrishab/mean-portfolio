import { Component } from '@angular/core';
import { HomeComponent } from '../../features/home/home.component';
import { AboutComponent } from '../../features/about/about.component';
import { ExperienceComponent } from '../../features/experience/experience.component';
import { ProjectsComponent } from '../../features/projects/projects.component';
import { SkillsComponent } from '../../features/skills/skills.component';
import { ContactComponent } from '../../features/contact/contact.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    HomeComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
    ContactComponent
  ],
  template: `
    <app-home />
    <app-about />
    <app-experience />
    <app-projects />
    <app-skills />
    <app-contact />
  `
})
export class MainComponent {}
