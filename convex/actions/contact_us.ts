"use node";

import { internalAction } from "../_generated/server";
import { v } from "convex/values";

declare const process: {
  env: {
    RESEND_API_KEY?: string;
    RESEND_FROM_EMAIL?: string;
    NEXT_PUBLIC_SUPPORT_EMAIL?: string;
    NEXT_PUBLIC_APP_NAME?: string;
  };
};

type SendEmailPayload = {
  from: string;
  to: string[];
  subject: string;
  text: string;
  reply_to?: string;
};

const sendEmail = async (payload: SendEmailPayload) => {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Resend API request failed: ${response.status} ${errorText}`,
    );
  }
};

export const sendInquiryEmails = internalAction({
  args: {
    first_name: v.string(),
    last_name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (_ctx, args) => {
    const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
    const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Joyful Pet Transport";
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? supportEmail;

    if (!supportEmail) {
      throw new Error("NEXT_PUBLIC_SUPPORT_EMAIL is not set");
    }

    if (!fromEmail) {
      throw new Error(
        "RESEND_FROM_EMAIL or NEXT_PUBLIC_SUPPORT_EMAIL must be configured",
      );
    }

    const inquirySubject = `New Inquiry from ${args.first_name} ${args.last_name}`;

    const inquiryMessage = [
      "A new inquiry has been submitted through the Contact Us form.",
      "",
      `First Name: ${args.first_name}`,
      `Last Name: ${args.last_name}`,
      `Email: ${args.email}`,
      "",
      "Message:",
      args.message,
    ].join("\n");

    const followUpSubject = "Re: Your Request for Pet Relocation Assistance";
    const followUpMessage = [
      "Good day,",
      "",
      "Thank you for reaching out to us through our website. We have received your inquiry and truly appreciate your interest in our services.",
      "",
      "Our team is currently reviewing your message, and we will get back to you shortly with the information you need. If you have any additional details or questions you would like to share in the meantime, please feel free to reply to this email.",
      "",
      "We look forward to assisting you.",
      "",
      "Best regards,",
      `${appName} Team`,
    ].join("\n");

    // uncomment when resend is ready
    // await sendEmail({
    //   from: fromEmail,
    //   to: [supportEmail],
    //   subject: inquirySubject,
    //   text: inquiryMessage,
    //   reply_to: args.email,
    // });

    // await sendEmail({
    //   from: fromEmail,
    //   to: [args.email],
    //   subject: followUpSubject,
    //   text: followUpMessage,
    //   reply_to: supportEmail,
    // });
  },
});
