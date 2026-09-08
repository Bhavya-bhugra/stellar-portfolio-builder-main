import { Request, Response, NextFunction } from 'express';
import { contactService } from '../services/contact.service.js';
import { sendSuccess } from '../utils/response.utils.js';
import { ContactPayload } from '../types/contact.types.js';

export class ContactController {
  public submitContact = async (
    req: Request<object, object, ContactPayload>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await contactService.processContactMessage(req.body);
      sendSuccess(res, result.message, result);
    } catch (error) {
      next(error);
    }
  };
}

export const contactController = new ContactController();
