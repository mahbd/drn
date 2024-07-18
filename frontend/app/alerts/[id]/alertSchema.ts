import z from "zod";

export const alertSchema = z.object({
  type: z.string().min(1),
  location: z.string().min(1),
  severity: z.string().min(1),
  description: z.string().min(1),
  isActive: z.boolean(),
});

export type AlertFormData = z.infer<typeof alertSchema>;
