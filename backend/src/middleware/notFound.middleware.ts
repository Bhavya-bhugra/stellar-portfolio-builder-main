import { Request, Response } from 'express';
import { sendError } from '../utils/response.utils.js';

export const notFoundMiddleware = (_req: Request, res: Response): void => {
  sendError(res, 'Route not found', 404);
};
