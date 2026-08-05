import { useState } from "react";

import { contactConfig } from "@/config/contact";
import { contactService } from "@/services/contactService";
import type { ContactPayload, ContactResult } from "@/types";

const EMPTY_FORM: ContactPayload = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function useContactForm() {
  const [form, setForm] = useState<ContactPayload>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactPayload, string>>>({});
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function validate(payload: ContactPayload) {
    const nextErrors: Partial<Record<keyof ContactPayload, string>> = {};

    if (!payload.name.trim()) nextErrors.name = "Please enter your name.";
    if (!payload.email.trim()) nextErrors.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!payload.subject.trim()) nextErrors.subject = "Please add a subject.";
    if (!payload.message.trim()) nextErrors.message = "Please add a message.";
    else if (payload.message.trim().length < contactConfig.minMessageLength) {
      nextErrors.message = `Message must be at least ${contactConfig.minMessageLength} characters.`;
    } else if (payload.message.trim().length > contactConfig.maxMessageLength) {
      nextErrors.message = `Message must be under ${contactConfig.maxMessageLength} characters.`;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function updateField(field: keyof ContactPayload, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus(null);
  }

  async function submit(): Promise<ContactResult | null> {
    if (!validate(form)) return null;

    setSubmitting(true);
    setStatus(null);

    try {
      const result = await contactService.sendMessage(form);
      setStatus({ type: result.ok ? "success" : "error", message: result.message });
      if (result.ok) {
        setForm(EMPTY_FORM);
      }
      return result;
    } catch {
      const fallback = {
        ok: false,
        message: contactConfig.errorMessage,
      } satisfies ContactResult;
      setStatus({ type: "error", message: fallback.message });
      return fallback;
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setForm(EMPTY_FORM);
    setErrors({});
    setStatus(null);
  }

  return {
    form,
    errors,
    status,
    submitting,
    updateField,
    submit,
    reset,
  };
}
