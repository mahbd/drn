import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(4),
  phone: z.string().min(11),
  address: z.string().min(4),
  password: z.string().min(4),
  confirmPassword: z.string().min(4),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
