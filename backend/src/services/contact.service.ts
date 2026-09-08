import { ContactPayload, ContactResult } from '../types/contact.types.js';

export class ContactService {
  public async processContactMessage(payload: ContactPayload): Promise<ContactResult> {
    console.log('[ContactService] Received contact message:', {
      name: payload.name.trim(),
      email: payload.email.trim(),
      subject: payload.subject.trim(),
      messageLength: payload.message.trim().length,
      receivedAt: new Date().toISOString(),
    });

    return {
      ok: true,
      message: 'Message sent — Jai Shree Ram',
    };
  }
}

export const contactService = new ContactService();
