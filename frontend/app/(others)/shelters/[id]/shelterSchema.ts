import { z } from "zod";

export const shelterSchema = z.object({
  name: z.string(),
  address: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  phone: z.string(),
});

export type ShelterFormData = z.infer<typeof shelterSchema>;
