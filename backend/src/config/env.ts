import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform((val) => parseInt(val, 10)).default('5000'),
  FRONTEND_URL: z.string().default('http://localhost:8081'),
  CHESS_USERNAME: z.string().default('yash_2805'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Rate limiting overrides
  RATE_LIMIT_GLOBAL_WINDOW_MS: z.string().transform((val) => parseInt(val, 10)).default('900000'), // 15 mins
  RATE_LIMIT_GLOBAL_MAX: z.string().transform((val) => parseInt(val, 10)).default('100'),

  RATE_LIMIT_CONTACT_WINDOW_MS: z.string().transform((val) => parseInt(val, 10)).default('900000'), // 15 mins
  RATE_LIMIT_CONTACT_MAX: z.string().transform((val) => parseInt(val, 10)).default('5'),

  RATE_LIMIT_CHAT_WINDOW_MS: z.string().transform((val) => parseInt(val, 10)).default('60000'), // 1 min
  RATE_LIMIT_CHAT_MAX: z.string().transform((val) => parseInt(val, 10)).default('30'),

  // Chess in-memory cache TTL
  CHESS_CACHE_TTL_MS: z.string().transform((val) => parseInt(val, 10)).default('300000'), // 5 mins
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables configuration');
}

export const env = parsedEnv.data;
