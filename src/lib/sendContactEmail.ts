import { resendClient } from '@/lib/resendClient';
import { contactFormSchema } from '@/schemas/contactFormSchema';
import { z } from 'zod';

const CONTACT_RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL as string;
const CONTACT_SENDER_EMAIL = process.env.CONTACT_SENDER_EMAIL as string;

export async function sendContactEmail({
  firstName,
  lastName,
  email,
  phone,
  message,
}: z.infer<typeof contactFormSchema>) {
  const { data, error } = await resendClient.emails.send({
    from: CONTACT_SENDER_EMAIL,
    to: CONTACT_RECIPIENT_EMAIL,
    subject: `LFC Golf Cart Tracker - Contact Message: ${firstName} ${lastName}`,
    text: `
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Message: ${message}
`,
  });

  return { data, error };
}
