import { z } from 'zod';

export const registerUserSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address.'),
  name: z.string().trim().min(2, 'Name must be at least 2 characters.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
