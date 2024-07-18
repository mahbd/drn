import { z } from "zod";

export const donationSchema = z.object({
  amount: z.number(),
});

export type DonationFormData = z.infer<typeof donationSchema>;
