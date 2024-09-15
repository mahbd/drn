import {z} from 'zod';

export const incidentSchema = z.object({
    incidentType: z.string(),
    assignedVolunteers: z.array(z.number()).optional(),
    latitude: z.string(),
    longitude: z.string(),
    description: z.string().optional()
});

export type IncidentFormData = z.infer<typeof incidentSchema>;