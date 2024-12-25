import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

export const logFormSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(1, { message: 'First name is required' })
    .max(50, { message: 'First name must be at most 50 characters long' }),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(1, { message: 'Last name is required' })
    .max(50, { message: 'Last name must be at most 50 characters long' }),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .refine((val) => isValidPhoneNumber(val, 'US'), {
      message: 'Invalid phone number',
    }),
  cartNum: z
    .string({ required_error: 'Golf cart number is required' })
    .refine((val) => ['ONE', 'TWO', 'THREE', 'FOUR'].includes(val), {
      message: 'Invalid golf cart number',
    }),
});
