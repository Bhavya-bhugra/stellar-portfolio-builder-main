import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.js';
import { sendError } from '../utils/response.utils.js';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const errorMiddleware = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;

  let message = err.message || 'Internal server error';

  if (env.NODE_ENV === 'production' && (!isAppError || statusCode === 500)) {
    message = 'An internal server error occurred';
  }

  if (env.NODE_ENV === 'development') {
    console.error('[ErrorMiddleware] Captured Error:', err);
  }

  sendError(res, message, statusCode);
};
