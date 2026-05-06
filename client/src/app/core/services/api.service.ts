import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, shareReplay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Profile {
  _id: string;
  name: string;
  title: string;
  tagline: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  resumeUrl: string;
  yearsOfExperience: number;
  socialLinks: SocialLink[];
  highlights: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Experience {
  _id: string;
  company: string;
  companyUrl: string;
  companyLogo: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrentRole: boolean;
  description: string;
  projects: ExperienceProject[];
  technologies: string[];
}

export interface ExperienceProject {
  name: string;
  client: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Skill {
  _id: string;
  category: string;
  categoryIcon: string;
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  icon: string;
  proficiency: number;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  images: string[];
  demoUrl: string;
  githubUrl: string;
  technologies: string[];
  features: string[];
  category: string;
  isFeatured: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  message: string;
  history: ChatMessage[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  // Cache for profile and skills (they don't change often)
  private profileCache$?: Observable<ApiResponse<Profile>>;
  private skillsCache$?: Observable<ApiResponse<Skill[]>>;

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error(error.error?.error || 'An error occurred'));
  }

  // Profile
  getProfile(): Observable<ApiResponse<Profile>> {
    if (!this.profileCache$) {
      this.profileCache$ = this.http
        .get<ApiResponse<Profile>>(`${this.baseUrl}/profile`)
        .pipe(
          retry(2),
          shareReplay(1),
          catchError(this.handleError)
        );
    }
    return this.profileCache$;
  }

  // Experiences
  getExperiences(): Observable<ApiResponse<Experience[]>> {
    return this.http
      .get<ApiResponse<Experience[]>>(`${this.baseUrl}/experiences`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Skills
  getSkills(): Observable<ApiResponse<Skill[]>> {
    if (!this.skillsCache$) {
      this.skillsCache$ = this.http
        .get<ApiResponse<Skill[]>>(`${this.baseUrl}/skills`)
        .pipe(
          retry(2),
          shareReplay(1),
          catchError(this.handleError)
        );
    }
    return this.skillsCache$;
  }

  // Projects
  getProjects(technology?: string): Observable<ApiResponse<Project[]>> {
    const url = technology
      ? `${this.baseUrl}/projects?technology=${encodeURIComponent(technology)}`
      : `${this.baseUrl}/projects`;

    return this.http
      .get<ApiResponse<Project[]>>(url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getProjectBySlug(slug: string): Observable<ApiResponse<Project>> {
    return this.http
      .get<ApiResponse<Project>>(`${this.baseUrl}/projects/${slug}`)
      .pipe(catchError(this.handleError));
  }

  getTechnologies(): Observable<ApiResponse<string[]>> {
    return this.http
      .get<ApiResponse<string[]>>(`${this.baseUrl}/projects/technologies`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Contact
  submitContact(data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }): Observable<ApiResponse<{ id: string }>> {
    return this.http
      .post<ApiResponse<{ id: string }>>(`${this.baseUrl}/contact`, data)
      .pipe(catchError(this.handleError));
  }

  // Chat
  sendChatMessage(
    message: string,
    history: ChatMessage[] = []
  ): Observable<ApiResponse<ChatResponse>> {
    return this.http
      .post<ApiResponse<ChatResponse>>(`${this.baseUrl}/chat`, { message, history })
      .pipe(catchError(this.handleError));
  }

  getChatSuggestions(): Observable<ApiResponse<string[]>> {
    return this.http
      .get<ApiResponse<string[]>>(`${this.baseUrl}/chat/suggestions`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
