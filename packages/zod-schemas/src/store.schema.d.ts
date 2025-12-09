import { z } from "zod";
export declare const storeCreateSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export type StoreCreateInput = z.infer<typeof storeCreateSchema>;
//# sourceMappingURL=store.schema.d.ts.map