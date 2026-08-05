import { contactConfig } from "@/config/contact";
import { delay } from "@/utils/misc";
import type { ContactPayload, ContactResult } from "@/types";

export const contactService = {
  async sendMessage(payload: ContactPayload): Promise<ContactResult> {
    // TODO(backend): replace with a real POST to the contact endpoint.
    await delay(900);
    if (!payload.email.includes("@")) {
      return { ok: false, message: contactConfig.errorMessage };
    }
    return { ok: true, message: contactConfig.successMessage };
  },
};
