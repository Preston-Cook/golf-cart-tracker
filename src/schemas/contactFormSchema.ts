import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

export const contactFormSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(1, { message: 'First name is required' })
    .max(50, { message: 'First name must be at most 50 characters long' }),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(1, { message: 'Last name is required' })
    .max(50, { message: 'Last name must be at most 50 characters long' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email format' })
    .max(100, { message: 'Email must be at most 100 characters long' }),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .refine((val) => isValidPhoneNumber(val, 'US'), {
      message: 'Invalid phone number',
    }),
  message: z
    .string({ required_error: 'Message is required' })
    .min(10, { message: 'Message must be at least 10 characters long' })
    .max(1000, { message: 'Message must be at most 1000 characters long' }),
});
