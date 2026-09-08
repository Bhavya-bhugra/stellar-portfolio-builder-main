import { Request, Response, NextFunction } from 'express';
import { chatService } from '../services/chat.service.js';
import { sendSuccess } from '../utils/response.utils.js';
import { AskPayload } from '../types/chat.types.js';

export class ChatController {
  public ask = (
    req: Request<object, object, AskPayload>,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      const response = chatService.askQuestion(req.body.question);
      sendSuccess(res, 'Chat response generated successfully', response);
    } catch (error) {
      next(error);
    }
  };

  public getPrompts = (_req: Request, res: Response, next: NextFunction): void => {
    try {
      const prompts = chatService.getQuickPrompts();
      sendSuccess(res, 'Quick prompts retrieved successfully', prompts);
    } catch (error) {
      next(error);
    }
  };
}

export const chatController = new ChatController();
