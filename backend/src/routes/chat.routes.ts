import { Router } from 'express';
import { z } from 'zod';
import { chatController } from '../controllers/chat.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { chatRateLimiter } from '../middleware/rateLimit.middleware.js';

const askSchema = z.object({
  question: z
    .string({
      required_error: 'Question is required',
      invalid_type_error: 'Question must be a string',
    })
    .trim()
    .min(1, 'Question cannot be empty')
    .max(500, 'Question is too long'),
});

const router = Router();

router.post('/ask', chatRateLimiter, validate(askSchema, 'body'), chatController.ask);
router.get('/prompts', chatController.getPrompts);

export default router;
