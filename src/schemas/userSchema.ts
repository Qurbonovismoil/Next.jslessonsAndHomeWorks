import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  price: z.string().min(1, { message: 'Price is required' }).refine((val) => !isNaN(Number(val)), {
    message: 'Price must be a valid number',
  }),
  avatar: z.string().url({ message: 'Must be a valid URL' }).or(z.literal('')),
});

export type UserFormData = z.infer<typeof userSchema>;
