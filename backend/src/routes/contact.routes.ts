import { Router } from 'express';
import { z } from 'zod';
import { contactController } from '../controllers/contact.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { contactRateLimiter } from '../middleware/rateLimit.middleware.js';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(100, 'Name is too long.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  subject: z.string().trim().min(1, 'Please add a subject.').max(200, 'Subject is too long.'),
  message: z
    .string()
    .trim()
    .min(20, 'Message must be at least 20 characters.')
    .max(1200, 'Message must be under 1200 characters.'),
});

const router = Router();

router.post('/', contactRateLimiter, validate(contactSchema, 'body'), contactController.submitContact);

export default router;
