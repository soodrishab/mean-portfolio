# Portfolio Project - Claude Code Context

## Project Overview

This is a world-class MEAN stack portfolio website for **Rishab Sood**, a Senior MEAN Stack Developer with 6+ years of experience.

## Tech Stack

### Frontend (client/)
- **Angular 17+** with Standalone Components
- **TypeScript** for type safety
- **SCSS** with CSS variables for theming
- **RxJS** for reactive programming
- **Angular Animations** for smooth transitions

### Backend (server/)
- **Node.js 20+** with TypeScript
- **Express.js** REST API
- **MongoDB** with Mongoose ODM
- **Jest** for testing (80% coverage target)

### Key Features
- Dark/Light mode toggle
- AI-powered chatbot (keyword-based)
- Interactive resume
- Project showcase with filtering
- Contact form with email notifications

## Architecture

```
Portfolio/
├── client/           # Angular frontend
│   ├── src/app/
│   │   ├── core/     # Services, guards, interceptors
│   │   ├── shared/   # Reusable components
│   │   └── features/ # Feature modules (lazy-loaded)
├── server/           # Express backend
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       └── middleware/
└── .claude/          # Claude Code configuration
```

## Coding Conventions

### Angular
- Use standalone components (no NgModules)
- Prefer Angular Signals over BehaviorSubject where possible
- Use OnPush change detection
- Follow Angular style guide naming conventions
- Lazy load feature modules

### TypeScript
- Strict mode enabled
- Prefer interfaces over types for objects
- Use readonly where applicable
- Avoid `any` type

### SCSS
- Use BEM naming convention
- CSS variables for theming
- Mobile-first responsive design

### Testing
- Jest for unit tests
- 80% code coverage minimum
- Test file naming: `*.spec.ts` (Angular) or `*.test.ts` (Node.js)

## Common Commands

```bash
# Frontend
cd client && ng serve          # Start dev server
cd client && ng build          # Build for production
cd client && ng test           # Run tests

# Backend
cd server && npm run dev       # Start dev server
cd server && npm run seed      # Seed database
cd server && npm test          # Run tests with coverage

# Both
npm install                    # Install dependencies
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/profile | Get profile data |
| GET | /api/experiences | Get work history |
| GET | /api/skills | Get skills |
| GET | /api/projects | Get projects |
| POST | /api/contact | Submit contact form |
| POST | /api/chat | Chat with AI assistant |

## Environment Variables

### Server (.env)
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 3000)
- `SMTP_*` - Email configuration
- `ALLOWED_ORIGINS` - CORS whitelist

## Deployment

- **Frontend**: GitHub Pages (rishabsood9.github.io)
- **Backend**: Railway (free tier)
- **Database**: MongoDB Atlas (free tier)
