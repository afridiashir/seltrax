import {z} from "zod";

export const mediaCreateSchema = z.object({
    url: z.url(),
    type: z.string(),
    mimeType: z.string(),
    size: z.int(),
    altText: z.string().optional(),
});

export type MediaCreateInput = z.infer<typeof mediaCreateSchema>;

export const mediaUpdateSchema = z.object({
    altText : z.string().optional()
})

export type MediaUpdateInput = z.infer<typeof mediaUpdateSchema>;