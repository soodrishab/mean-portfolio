# MEAN Stack Portfolio

A world-class portfolio website built with the full MEAN stack (MongoDB, Express.js, Angular 17+, Node.js).

![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=flat&logo=angular)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

## Features

- **Modern Angular 17+** with Standalone Components and Signals
- **Dark/Light Theme** with system preference detection
- **Portfolio Assistant** - Smart FAQ chatbot
- **Interactive Games** demonstrating Angular concepts:
  - Memory Game (Signals, Computed)
  - Vault Heist (Route Guards)
  - Potion Lab (Dependency Injection)
  - Quiz Game (Reactive Forms)
- **Responsive Design** - Mobile-first approach
- **Experience Timeline** with animations
- **Projects Showcase** with filtering
- **Contact Form** with backend integration

## Project Structure

```
Portfolio/
├── client/           # Angular 17 Frontend
│   ├── src/app/
│   │   ├── core/     # Services, guards, interceptors
│   │   ├── shared/   # Reusable components
│   │   ├── features/ # Feature modules (lazy-loaded)
│   │   └── pages/    # Game pages
├── server/           # Express.js Backend
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       └── middleware/
└── .claude/          # Claude Code configuration
```

## Quick Start

### Prerequisites
- Node.js 20+
- MongoDB (local or Atlas)
- Angular CLI (`npm install -g @angular/cli`)

### Frontend

```bash
cd client
npm install
ng serve
```

Open http://localhost:4200

### Backend

```bash
cd server
npm install
cp .env.example .env  # Configure environment variables
npm run seed          # Seed database
npm run dev
```

API runs on http://localhost:3000

## Deployment

- **Frontend**: GitHub Pages / Vercel / Netlify
- **Backend**: Railway / Render
- **Database**: MongoDB Atlas (free tier)

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | Angular 17, TypeScript, SCSS, RxJS |
| Backend | Node.js, Express.js, MongoDB, Mongoose |
| Testing | Jest, Jasmine, Karma |
| DevOps | GitHub Actions, Docker |

## Author

**Rishab Sood** - Senior MEAN Stack Developer

- GitHub: [@soodrishab](https://github.com/soodrishab)
- LinkedIn: [rishabsood](https://linkedin.com/in/rishabsood)

## License

MIT License - feel free to use this as a template for your own portfolio!
