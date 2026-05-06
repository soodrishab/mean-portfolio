import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Profile, Experience, Skill, Project, ChatKnowledge } from '../models';

// Load .env file if it exists (local development)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Debug: Log which MongoDB URI is being used
const mongoUri = process.env.MONGODB_URI;
console.log('MONGODB_URI exists:', !!mongoUri);
console.log('MONGODB_URI starts with:', mongoUri ? mongoUri.substring(0, 20) + '...' : 'NOT SET');

const seedProfile = {
  name: 'Rishab Sood',
  title: 'Senior MEAN Stack Developer',
  tagline: 'Angular | Node.js | Express.js | MongoDB | TypeScript | AI-Integrated Applications',
  summary: `Senior MEAN Stack Developer with 6+ years building scalable, high-performance web applications for global enterprise clients across healthcare, fintech, energy, and private equity domains. Deep expertise across the MEAN stack — MongoDB, Express.js, Angular (2–17), and Node.js, with strong TypeScript fundamentals. Proven ability to own features end-to-end in agile squads, integrate complex microservice backends, and ship production-ready full-stack code. Experienced in remote collaboration with US-based clients and actively building AI-integrated applications using Claude AI, LLM APIs, and agentic workflows.`,
  email: 'rishabsood9@gmail.com',
  phone: '+91 9592006999',
  location: 'Gurgaon, India · Open to Remote',
  avatar: 'https://avatars.githubusercontent.com/u/53430901?v=4',
  resumeUrl: 'https://soodrishab.github.io/portfolio/assets/Rishab_Sood_Resume.pdf',
  yearsOfExperience: 6,
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com/rishabsood9', icon: 'fab fa-github' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/rishabsood', icon: 'fab fa-linkedin' },
    { platform: 'Twitter', url: 'https://twitter.com/rishabsood1', icon: 'fab fa-twitter' },
    { platform: 'Email', url: 'mailto:rishabsood9@gmail.com', icon: 'fas fa-envelope' }
  ],
  highlights: [
    '6+ Years of Experience',
    'MEAN Stack Expert',
    'AI-Integrated Applications',
    'Enterprise Clients',
    'Remote Collaboration'
  ],
  isActive: true
};

const seedExperiences = [
  {
    company: 'EPAM Systems',
    companyUrl: 'https://www.epam.com',
    companyLogo: '/assets/images/companies/epam.png',
    position: 'Senior Software Developer',
    location: 'Remote / India',
    startDate: new Date('2025-01-01'),
    endDate: null,
    isCurrentRole: true,
    description: 'Working with iAlta, a New York-based private equity trading platform startup, in remote collaboration.',
    projects: [
      {
        name: 'Private Equity Trading Platform',
        client: 'iAlta',
        description: 'Full-stack development for a private equity trading platform',
        achievements: [
          'Spearheaded migration of legacy Angular modules to standalone component architecture, reducing bundle size by ~30%',
          'Developed deep understanding of private equity and financial marketplace domain',
          'Designed and implemented pixel-perfect, responsive Angular interfaces with Node.js/Express.js REST endpoints',
          'Established comprehensive Storybook component library with test cases',
          'Designed AI-powered chatbot agent that auto-prefills forms, improving sprint velocity by ~25%'
        ],
        technologies: ['Angular 16+', 'Node.js', 'Standalone Components', 'TypeScript', 'Storybook', 'Claude AI', 'REST APIs']
      }
    ],
    technologies: ['Angular 16+', 'Node.js', 'TypeScript', 'Storybook', 'Claude AI', 'Agentic AI', 'REST APIs'],
    order: 1
  },
  {
    company: 'CitiusTech',
    companyUrl: 'https://www.citiustech.com',
    companyLogo: '/assets/images/companies/citiustech.png',
    position: 'Senior Software Engineer',
    location: 'Gurgaon, India',
    startDate: new Date('2022-02-01'),
    endDate: new Date('2025-01-01'),
    isCurrentRole: false,
    description: 'Healthcare domain expertise with leading US-based clients.',
    projects: [
      {
        name: 'Patient Data Management',
        client: 'DaVita',
        description: 'Leading US-based kidney care and dialysis services provider',
        achievements: [
          'Gained deep understanding of US healthcare workflows including HIPAA compliance requirements',
          'Architected and delivered patient registration module on MEAN stack',
          'Designed RESTful Node.js/Express.js APIs with AWS cloud integration',
          'Authored unit test suites using Jasmine achieving high code coverage'
        ],
        technologies: ['Angular 16', 'Node.js', 'Express.js', 'MongoDB', 'AWS', 'Jasmine', 'REST APIs', 'HIPAA']
      },
      {
        name: 'Responsive Media User Interface',
        client: 'Arthrex',
        description: 'Global medical device company specializing in orthopedic products',
        achievements: [
          'Acquired working knowledge of DICOM protocol and medical imaging standards',
          'Engineered Angular 12 media management system with i18n support',
          'Built Node.js/Express.js microservices with MongoDB, RabbitMQ, and MinIO',
          'Implemented multi-language support for 5+ languages'
        ],
        technologies: ['Angular 12', 'Node.js', 'Express.js', 'MongoDB', 'RabbitMQ', 'MinIO', 'DICOM', 'Datadog', 'i18n']
      }
    ],
    technologies: ['Angular 12-16', 'Node.js', 'Express.js', 'MongoDB', 'AWS', 'RabbitMQ', 'Healthcare IT'],
    order: 2
  },
  {
    company: 'Nagarro',
    companyUrl: 'https://www.nagarro.com',
    companyLogo: '/assets/images/companies/nagarro.png',
    position: 'Software Engineer',
    location: 'Gurgaon, India',
    startDate: new Date('2019-07-01'),
    endDate: new Date('2022-02-01'),
    isCurrentRole: false,
    description: 'Full-stack development for enterprise clients in energy and social good sectors.',
    projects: [
      {
        name: 'Automated Bill Consolidation',
        client: 'Engie',
        description: 'French multinational energy and utilities company',
        achievements: [
          'Gained understanding of energy billing workflows and utility pricing models',
          'Engineered Angular + Node.js/Express.js solution automating complex bill consolidation',
          'Implemented NGRX state management, reducing redundant network calls by ~40%'
        ],
        technologies: ['Angular', 'Node.js', 'Express.js', 'MongoDB', 'NGRX', 'REST APIs']
      },
      {
        name: 'CRM Feedback Tracker',
        client: 'Blackbaud',
        description: 'US-based cloud software company serving the social good sector',
        achievements: [
          'Developed real-time web-based feedback form on MEAN stack',
          'Worked across full SDLC — development, testing, deployment, and maintenance'
        ],
        technologies: ['Angular', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'CRM']
      }
    ],
    technologies: ['Angular', 'Node.js', 'Express.js', 'MongoDB', 'NGRX', 'JavaScript'],
    order: 3
  }
];

const seedSkills = [
  {
    category: 'Frontend',
    categoryIcon: 'fas fa-laptop-code',
    items: [
      { name: 'Angular 2-17', icon: 'angular', proficiency: 95 },
      { name: 'TypeScript', icon: 'typescript', proficiency: 92 },
      { name: 'JavaScript (ES6+)', icon: 'javascript', proficiency: 90 },
      { name: 'RxJS', icon: 'rxjs', proficiency: 88 },
      { name: 'NGRX', icon: 'ngrx', proficiency: 85 },
      { name: 'HTML5/CSS3/SCSS', icon: 'html5', proficiency: 90 },
      { name: 'Angular Material', icon: 'angular', proficiency: 88 },
      { name: 'Reactive & Template Forms', icon: 'angular', proficiency: 90 },
      { name: 'Storybook', icon: 'storybook', proficiency: 80 }
    ],
    order: 1
  },
  {
    category: 'Backend',
    categoryIcon: 'fas fa-server',
    items: [
      { name: 'Node.js', icon: 'nodejs', proficiency: 90 },
      { name: 'Express.js', icon: 'express', proficiency: 90 },
      { name: 'RESTful APIs', icon: 'api', proficiency: 92 },
      { name: 'GraphQL', icon: 'graphql', proficiency: 75 },
      { name: 'RabbitMQ', icon: 'rabbitmq', proficiency: 70 }
    ],
    order: 2
  },
  {
    category: 'Database',
    categoryIcon: 'fas fa-database',
    items: [
      { name: 'MongoDB', icon: 'mongodb', proficiency: 88 },
      { name: 'MySQL/PostgreSQL', icon: 'mysql', proficiency: 80 },
      { name: 'Couchbase', icon: 'couchbase', proficiency: 65 },
      { name: 'MinIO', icon: 'minio', proficiency: 70 }
    ],
    order: 3
  },
  {
    category: 'AI & Agentic',
    categoryIcon: 'fas fa-robot',
    items: [
      { name: 'Claude AI (CLI + VS Code)', icon: 'claude', proficiency: 85 },
      { name: 'LLM API Integration', icon: 'api', proficiency: 80 },
      { name: 'Prompt Engineering', icon: 'brain', proficiency: 82 },
      { name: 'Agentic Workflows', icon: 'workflow', proficiency: 78 },
      { name: 'Chatbot Development', icon: 'chatbot', proficiency: 80 },
      { name: 'LangChain', icon: 'langchain', proficiency: 70 },
      { name: 'MCP (Model Context Protocol)', icon: 'mcp', proficiency: 75 }
    ],
    order: 4
  },
  {
    category: 'Cloud & DevOps',
    categoryIcon: 'fas fa-cloud',
    items: [
      { name: 'AWS', icon: 'aws', proficiency: 75 },
      { name: 'Docker', icon: 'docker', proficiency: 72 },
      { name: 'Jenkins', icon: 'jenkins', proficiency: 70 },
      { name: 'GitHub Actions', icon: 'github', proficiency: 78 },
      { name: 'Datadog', icon: 'datadog', proficiency: 68 }
    ],
    order: 5
  },
  {
    category: 'Testing & Tools',
    categoryIcon: 'fas fa-vial',
    items: [
      { name: 'Jest', icon: 'jest', proficiency: 85 },
      { name: 'Jasmine', icon: 'jasmine', proficiency: 85 },
      { name: 'Karma', icon: 'karma', proficiency: 82 },
      { name: 'Postman', icon: 'postman', proficiency: 90 },
      { name: 'Git', icon: 'git', proficiency: 92 }
    ],
    order: 6
  }
];

const seedProjects = [
  {
    title: 'AI Chatbot Agent',
    slug: 'ai-chatbot-agent',
    description: 'AI-powered chatbot that reads form structures, intelligently converses with users, and auto-prefills forms based on responses.',
    longDescription: 'Designed and developed at EPAM Systems for iAlta\'s private equity trading platform. The chatbot agent leverages Claude AI to understand form requirements and guide users through data entry, reducing manual effort and improving user experience.',
    thumbnail: '/assets/images/projects/chatbot.png',
    images: [],
    demoUrl: '',
    githubUrl: '',
    technologies: ['Angular', 'Node.js', 'Claude AI', 'TypeScript', 'REST APIs'],
    features: [
      'Intelligent form structure reading',
      'Natural language conversation',
      'Auto-form prefilling',
      'Context-aware responses'
    ],
    category: 'ai',
    isFeatured: true,
    isLive: true,
    order: 1
  },
  {
    title: 'Buffer-Overflow',
    slug: 'buffer-overflow',
    description: 'Community-driven Q&A platform where users can ask and answer questions with up-vote/down-vote functionality.',
    longDescription: 'A Stack Overflow-inspired Q&A web application built with Angular and .NET, featuring user authentication, question posting, answer submission, and community voting system.',
    thumbnail: '/assets/images/projects/buffer-overflow.png',
    images: [],
    demoUrl: '',
    githubUrl: 'https://github.com/rishabsood9/BufferOverflowFrontend',
    technologies: ['Angular', '.NET', 'C#', 'SQL Server', 'REST APIs'],
    features: [
      'User authentication & authorization',
      'Question & answer posting',
      'Up-vote/down-vote system',
      'Search functionality'
    ],
    category: 'web',
    isFeatured: true,
    isLive: true,
    order: 2
  },
  {
    title: 'Real-Time Covid Meter',
    slug: 'real-time-covid-meter',
    description: 'Real-time COVID-19 statistics tracker allowing users to search and view country-specific case data.',
    longDescription: 'A web application that fetches real-time COVID-19 data from external APIs, displaying active cases, total cases, deaths, and recoveries for any country.',
    thumbnail: '/assets/images/projects/covid-meter.png',
    images: [],
    demoUrl: '',
    githubUrl: 'https://github.com/rishabsood9/Real-Time-Covid-Meter',
    technologies: ['Angular', 'TypeScript', 'REST APIs', 'Chart.js'],
    features: [
      'Real-time data fetching',
      'Country search functionality',
      'Data visualization',
      'Responsive design'
    ],
    category: 'web',
    isFeatured: true,
    isLive: true,
    order: 3
  },
  {
    title: 'Book Reading Event Manager',
    slug: 'book-reading-event',
    description: 'MVC web application for managing book-reading events where users can create events and invite friends via email.',
    longDescription: 'Built using 3-layer architecture with MVC pattern. Features event creation, user registration, email invitations, and secure authentication.',
    thumbnail: '/assets/images/projects/book-event.png',
    images: [],
    demoUrl: '',
    githubUrl: 'https://github.com/rishabsood9/Book-Reading-Event',
    technologies: ['Angular', '.NET', 'MVC', 'SQL Server', 'Email Integration'],
    features: [
      'Event creation & management',
      'Email invitations',
      'User authentication',
      'RSVP tracking'
    ],
    category: 'web',
    isFeatured: false,
    isLive: true,
    order: 4
  }
];

const seedChatKnowledge = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    question: 'Hello',
    answer: "Hello! I'm Rishab's AI assistant. I can tell you about his experience, skills, projects, or how to get in touch. What would you like to know?",
    category: 'greeting',
    priority: 10
  },
  {
    keywords: ['experience', 'years', 'work', 'career'],
    question: 'Tell me about your experience',
    answer: "I have 6+ years of experience as a MEAN Stack Developer. I've worked at EPAM Systems (current), CitiusTech, and Nagarro, building enterprise applications for clients in healthcare, fintech, energy, and private equity domains.",
    category: 'experience',
    priority: 9
  },
  {
    keywords: ['angular', 'frontend', 'ui'],
    question: "What's your Angular experience?",
    answer: "I have extensive Angular experience (versions 2-17), including standalone components, signals, RxJS, NGRX state management, and Angular Material. At EPAM, I led Angular migration reducing bundle size by 30%. I build pixel-perfect, responsive interfaces with comprehensive Storybook component libraries.",
    category: 'skills',
    priority: 9
  },
  {
    keywords: ['node', 'nodejs', 'backend', 'express', 'api'],
    question: 'Tell me about your backend experience',
    answer: "I specialize in Node.js and Express.js for building RESTful APIs and microservices. I've integrated these with MongoDB, RabbitMQ, MinIO, and various AWS services. My work includes HIPAA-compliant healthcare APIs at CitiusTech and automated billing systems at Nagarro.",
    category: 'skills',
    priority: 9
  },
  {
    keywords: ['ai', 'claude', 'llm', 'chatbot', 'artificial intelligence', 'machine learning'],
    question: 'What AI technologies do you work with?',
    answer: "I'm actively working with AI technologies! At EPAM, I developed an AI-powered chatbot using Claude AI that auto-prefills forms. I use Claude Code (CLI + VS Code) daily, achieving ~25% improvement in sprint velocity. I also work with LangChain, prompt engineering, and agentic workflows.",
    category: 'skills',
    priority: 10
  },
  {
    keywords: ['mongodb', 'database', 'sql', 'data'],
    question: 'What databases do you work with?',
    answer: "I primarily work with MongoDB in the MEAN stack, but also have experience with MySQL, PostgreSQL, Couchbase, and MinIO. I design efficient schemas and integrate databases with Node.js backends for optimal performance.",
    category: 'skills',
    priority: 7
  },
  {
    keywords: ['contact', 'email', 'reach', 'hire', 'connect'],
    question: 'How can I contact you?',
    answer: "You can reach me at rishabsood9@gmail.com or call +91 9592006999. I'm based in Gurgaon, India, and open to remote opportunities. Connect with me on LinkedIn (linkedin.com/in/rishabsood) or use the contact form on this website!",
    category: 'contact',
    priority: 8
  },
  {
    keywords: ['project', 'portfolio', 'built', 'created'],
    question: 'What projects have you built?',
    answer: "Notable projects include: 1) AI Chatbot Agent at EPAM for auto-filling forms, 2) Patient Data Management system for DaVita (healthcare), 3) Buffer-Overflow Q&A platform, 4) Real-Time Covid Meter, and 5) Automated Bill Consolidation for Engie. Check the Projects section for more!",
    category: 'projects',
    priority: 8
  },
  {
    keywords: ['company', 'companies', 'employer', 'worked'],
    question: 'What companies have you worked for?',
    answer: "I've worked at: EPAM Systems (current) - building private equity trading platform for iAlta, CitiusTech (2022-2025) - healthcare software for DaVita and Arthrex, and Nagarro (2019-2022) - energy solutions for Engie and CRM for Blackbaud.",
    category: 'experience',
    priority: 8
  },
  {
    keywords: ['education', 'degree', 'university', 'study'],
    question: 'What is your educational background?',
    answer: "I have a B.Tech in Computer Science & Engineering from Guru Nanak Dev University, Amritsar (2015-2019). During my studies, I was the Technical Head of the Computer Engineering Student Society and organized HackZeroToOne, a techno-cultural festival.",
    category: 'education',
    priority: 7
  },
  {
    keywords: ['tech stack', 'technologies', 'tools', 'skills'],
    question: 'What is your tech stack?',
    answer: "My core stack is MEAN: MongoDB, Express.js, Angular (2-17), and Node.js with TypeScript. I also work with RxJS, NGRX, Angular Material, GraphQL, RabbitMQ, AWS, Docker, and AI tools like Claude AI and LangChain. For testing: Jest, Jasmine, and Karma.",
    category: 'skills',
    priority: 9
  },
  {
    keywords: ['healthcare', 'hipaa', 'medical', 'health'],
    question: 'Do you have healthcare domain experience?',
    answer: "Yes! At CitiusTech, I worked on healthcare projects for DaVita (kidney care) and Arthrex (medical devices). I gained deep understanding of HIPAA compliance, patient registration workflows, and medical imaging standards like DICOM.",
    category: 'domain',
    priority: 8
  },
  {
    keywords: ['forms', 'reactive forms', 'template forms', 'angular forms', 'form validation'],
    question: 'What is your experience with Angular Forms?',
    answer: "I'm proficient in both Reactive Forms and Template-driven Forms in Angular. I use Reactive Forms for complex scenarios requiring dynamic validation, form arrays, and custom validators. Template Forms work great for simpler use cases. I implement robust form validation, error handling, and user-friendly feedback patterns.",
    category: 'skills',
    priority: 8
  },
  {
    keywords: ['rxjs', 'observables', 'operators', 'reactive programming', 'streams'],
    question: 'What is your RxJS experience?',
    answer: "I have strong RxJS expertise including Observables, Subjects, and operators like switchMap, mergeMap, combineLatest, debounceTime, and distinctUntilChanged. I use RxJS for HTTP requests, state management, real-time data streams, and complex async operations. I follow best practices for subscription management and memory leak prevention.",
    category: 'skills',
    priority: 8
  },
  {
    keywords: ['thank', 'thanks', 'bye', 'goodbye'],
    question: 'Thank you',
    answer: "You're welcome! Feel free to reach out if you have more questions. You can contact Rishab at rishabsood9@gmail.com or connect on LinkedIn. Have a great day!",
    category: 'farewell',
    priority: 5
  }
];

const seedDatabase = async (): Promise<void> => {
  try {
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) {
      throw new Error('MONGODB_URI environment variable is not set!');
    }
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(dbUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Profile.deleteMany({}),
      Experience.deleteMany({}),
      Skill.deleteMany({}),
      Project.deleteMany({}),
      ChatKnowledge.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Insert seed data
    await Profile.create(seedProfile);
    console.log('Profile seeded');

    await Experience.insertMany(seedExperiences);
    console.log('Experiences seeded');

    await Skill.insertMany(seedSkills);
    console.log('Skills seeded');

    await Project.insertMany(seedProjects);
    console.log('Projects seeded');

    await ChatKnowledge.insertMany(seedChatKnowledge);
    console.log('Chat knowledge seeded');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
