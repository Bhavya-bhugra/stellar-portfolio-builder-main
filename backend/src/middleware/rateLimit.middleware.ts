import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

export const globalRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_GLOBAL_WINDOW_MS,
  max: env.RATE_LIMIT_GLOBAL_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
});

export const contactRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_CONTACT_WINDOW_MS,
  max: env.RATE_LIMIT_CONTACT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many contact submissions from this IP, please try again later.',
  },
});

export const chatRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_CHAT_WINDOW_MS,
  max: env.RATE_LIMIT_CHAT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many chat requests from this IP, please try again later.',
  },
});
