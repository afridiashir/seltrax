import { z } from "zod";
const domainRegex = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

export const domainCreateSchema =  z.object({
  domain: z.string()
  .trim()
  .toLowerCase()
  .refine((val:any) => domainRegex.test(val), {
    message: "Invalid domain (expected something like example.com)",
    }),
  isPrimary: z.boolean().optional(),
});

export type DomainInput = z.infer<typeof domainCreateSchema>;

export const domainUpdateSchema = z.object({
    isPrimary: z.boolean().optional(),
    status: z.enum(["PENDING", "VERIFIED","ACTIVE","FAILED"]).optional(),
});
