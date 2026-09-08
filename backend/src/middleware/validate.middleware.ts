import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { sendError } from '../utils/response.utils.js';

type RequestValidationSource = 'body' | 'query' | 'params';

export const validate = (
  schema: ZodSchema,
  source: RequestValidationSource = 'body'
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req[source]);
      req[source] = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join(', ');
        sendError(res, `Validation failed: ${errorMessage}`, 400);
        return;
      }
      next(error);
    }
  };
};
