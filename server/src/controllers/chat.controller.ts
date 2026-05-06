import { Request, Response, NextFunction } from 'express';
import stringSimilarity from 'string-similarity';
import { ChatKnowledge, Profile, Experience, Skill } from '../models';
import { createError } from '../middleware/errorHandler';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Find best matching response from knowledge base
const findBestMatch = async (userMessage: string): Promise<string | null> => {
  const normalizedMessage = userMessage.toLowerCase().trim();

  // Get all knowledge entries
  const knowledge = await ChatKnowledge.find().sort({ priority: -1 });

  let bestMatch = {
    answer: '',
    score: 0
  };

  for (const entry of knowledge) {
    // Check keyword matches
    const keywordMatches = entry.keywords.filter(keyword =>
      normalizedMessage.includes(keyword.toLowerCase())
    );

    if (keywordMatches.length > 0) {
      const score = keywordMatches.length / entry.keywords.length;
      if (score > bestMatch.score) {
        bestMatch = { answer: entry.answer, score: score + entry.priority * 0.1 };
      }
    }

    // Check question similarity
    const similarity = stringSimilarity.compareTwoStrings(
      normalizedMessage,
      entry.question.toLowerCase()
    );

    if (similarity > bestMatch.score && similarity > 0.3) {
      bestMatch = { answer: entry.answer, score: similarity };
    }
  }

  return bestMatch.score > 0.2 ? bestMatch.answer : null;
};

// Generate dynamic response based on profile data
const generateDynamicResponse = async (userMessage: string): Promise<string | null> => {
  const normalizedMessage = userMessage.toLowerCase();

  // Check for experience-related questions
  if (normalizedMessage.includes('experience') || normalizedMessage.includes('work')) {
    const experiences = await Experience.find().sort({ startDate: -1 }).limit(3);
    if (experiences.length > 0) {
      const exp = experiences[0];
      return `I have ${experiences.length} significant roles on my resume. Currently, I'm working at ${exp.company} as a ${exp.position}. ${exp.description || ''}`;
    }
  }

  // Check for skills-related questions
  if (normalizedMessage.includes('skill') || normalizedMessage.includes('technology') ||
    normalizedMessage.includes('tech stack') || normalizedMessage.includes('know')) {
    const skills = await Skill.find().sort({ order: 1 });
    if (skills.length > 0) {
      const skillSummary = skills
        .map(s => `${s.category}: ${s.items.slice(0, 3).map(i => i.name).join(', ')}`)
        .join('; ');
      return `Here are my key skills: ${skillSummary}. Want to know more about any specific technology?`;
    }
  }

  // Check for Angular-specific questions
  if (normalizedMessage.includes('angular')) {
    return `I have extensive experience with Angular (versions 2-17), including standalone components, signals, RxJS, NGRX state management, and Angular Material. I've worked on complex enterprise applications like healthcare platforms at CitiusTech and private equity trading systems at EPAM.`;
  }

  // Check for Node.js questions
  if (normalizedMessage.includes('node') || normalizedMessage.includes('backend') ||
    normalizedMessage.includes('express')) {
    return `On the backend, I work with Node.js and Express.js to build RESTful APIs and microservices. I've integrated these with MongoDB, RabbitMQ, and various cloud services. At Nagarro, I built automated bill consolidation systems, and at CitiusTech, I designed HIPAA-compliant healthcare APIs.`;
  }

  // Check for AI/Claude questions
  if (normalizedMessage.includes('ai') || normalizedMessage.includes('claude') ||
    normalizedMessage.includes('llm') || normalizedMessage.includes('chatbot')) {
    return `I'm actively working with AI technologies! At EPAM, I developed an AI-powered chatbot agent that reads form structures and auto-prefills forms using Claude AI. I use Claude Code (CLI + VS Code) daily for code generation and refactoring, which has improved my sprint velocity by ~25%.`;
  }

  // Check for contact/hire questions
  if (normalizedMessage.includes('contact') || normalizedMessage.includes('hire') ||
    normalizedMessage.includes('reach') || normalizedMessage.includes('email')) {
    const profile = await Profile.findOne({ isActive: true });
    if (profile) {
      return `You can reach me at ${profile.email} or ${profile.phone}. I'm based in ${profile.location} and open to remote opportunities. Feel free to connect on LinkedIn or use the contact form on this website!`;
    }
  }

  return null;
};

// Default fallback responses
const getFallbackResponse = (): string => {
  const fallbacks = [
    "I'm not sure I understand. Could you ask about my experience, skills, projects, or how to contact me?",
    "That's an interesting question! I'm best at answering questions about my Angular, Node.js, and MEAN stack experience. What would you like to know?",
    "I'd love to help! Try asking about my work experience, technical skills, or projects I've built.",
    "Hmm, I'm not sure about that. Feel free to ask about my background as a Senior MEAN Stack Developer or my AI integration experience!"
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};

export const chat = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { message, history = [] } = req.body as {
      message: string;
      history?: ChatMessage[];
    };

    if (!message || typeof message !== 'string') {
      throw createError('Message is required', 400);
    }

    // Try to find a response
    let response = await findBestMatch(message);

    if (!response) {
      response = await generateDynamicResponse(message);
    }

    if (!response) {
      response = getFallbackResponse();
    }

    // Build conversation history
    const newHistory: ChatMessage[] = [
      ...history,
      { role: 'user', content: message },
      { role: 'assistant', content: response }
    ];

    res.json({
      success: true,
      data: {
        message: response,
        history: newHistory.slice(-10) // Keep last 10 messages
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getSuggestedQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const suggestions = [
      "What's your experience with Angular?",
      "Tell me about your Node.js projects",
      "What AI technologies do you work with?",
      "How can I contact you?",
      "What companies have you worked for?",
      "What's your tech stack?"
    ];

    res.json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    next(error);
  }
};
