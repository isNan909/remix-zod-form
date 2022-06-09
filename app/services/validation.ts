import { z } from 'zod';

export const ValidatePost = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  confirmEmail: z.string().email(),
  expertise: z.enum([
    'Product Designer',
    'Frontend Developer',
    'Backend Developer',
    'Fullstack Developer',
  ]),
  url: z.string().url().optional(),
  availability: z.enum(['Full-time', 'Part-time', 'Contract', 'Freelance']),
  description: z.string().nullable(),
})
  .refine((data) => data.email === data.confirmEmail, {
    message: 'Email and confirmEmail should be same email',
    path: ['confirmEmail'],
  });