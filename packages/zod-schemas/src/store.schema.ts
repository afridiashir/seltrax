import { z } from "zod";

export const storeCreateSchema = z.object({
  name: z.string().min(1, "Store name is required").optional(),
});

export type StoreCreateInput = z.infer<typeof storeCreateSchema>;

export const storeUpdateSchema = z.object({
  name: z.string().min(1, "Store name is required").optional(),
  category: z.string().optional(),
  currency: z.string().optional(),
  logoUrl: z.string().url("Invalid URL").optional(),
  siteIcon: z.string().url("Invalid URL").optional(),
})

export type StoreUpdateInput = z.infer<typeof storeUpdateSchema>;