import { z } from "zod";

export const collectionCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    slug: z.string().min(1, "Slug is required"),
    imageUrl: z.string().url().optional(),
    headerImageUrl: z.string().url().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    seoKeywords: z.string().optional(),
    parentId: z.string().uuid().optional(),
});

export type CollectionCreateInput = z.infer<typeof collectionCreateSchema>;

export const collectionUpdateSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    description: z.string().optional(),
    slug: z.string().min(1, "Slug is required").optional(),
    imageUrl: z.string().url().optional(),
    headerImageUrl: z.string().url().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    seoKeywords: z.string().optional(),
    parentId: z.string().uuid().optional(),
});

export type CollectionUpdateInput = z.infer<typeof collectionUpdateSchema>;

