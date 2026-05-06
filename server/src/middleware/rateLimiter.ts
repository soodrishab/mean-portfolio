import rateLimit from 'express-rate-limit';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    success: false,
    error: 'Too many requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Stricter limiter for contact form
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 contact form submissions per hour
  message: {
    success: false,
    error: 'Too many contact submissions, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Chat API limiter
export const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // Limit each IP to 20 chat messages per minute
  message: {
    success: false,
    error: 'Too many chat messages, please slow down.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

export default apiLimiter;
