import { Response } from 'express';
import { ApiResponse } from '../types/api.types.js';

export const sendSuccess = <T>(
  res: Response,
  message?: string,
  data?: T,
  statusCode = 200
): Response => {
  const responseBody: ApiResponse<T> = {
    success: true,
  };

  if (message !== undefined) {
    responseBody.message = message;
  }

  if (data !== undefined) {
    responseBody.data = data;
  }

  return res.status(statusCode).json(responseBody);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
  error?: string
): Response => {
  const responseBody: ApiResponse = {
    success: false,
    message,
  };

  if (error !== undefined) {
    responseBody.error = error;
  }

  return res.status(statusCode).json(responseBody);
};
