import { contactEmail } from "./social";

export const contactConfig = {
  recipient: contactEmail,
  maxMessageLength: 1200,
  minMessageLength: 20,
  successMessage: "Message sent — Jai Shree Ram",
  errorMessage: "Something went wrong. Please try again or email me directly.",
} as const;
