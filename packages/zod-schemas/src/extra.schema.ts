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

export type DomainUpdateInput = z.infer<typeof domainUpdateSchema>;

export const shippingCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be at least 0"),
  minOrderPrice: z.number().min(0).optional().nullable(),
  maxOrderPrice: z.number().min(0).optional().nullable(),
  minWeight: z.number().min(0).optional().nullable(),
  maxWeight: z.number().min(0).optional().nullable(),
  estimatedDeliveryDays: z.number().min(0).optional(),
});

export type ShippingInput = z.infer<typeof shippingCreateSchema>;

export const shippingUpdateSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  price: z.number().min(0, "Price must be at least 0").optional(),
  minOrderPrice: z.number().min(0).optional(),
  maxOrderPrice: z.number().min(0).optional(),
  minWeight: z.number().min(0).optional(),
  maxWeight: z.number().min(0).optional(),
  estimatedDeliveryDays: z.number().min(0).optional(),
});

export type ShippingUpdateInput = z.infer<typeof shippingUpdateSchema>;

export const taxRuleCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  percentage: z.number().min(0).max(100).optional(),
  fixedAmount: z.number().min(0).optional(),
});


export type TaxRuleInput = z.infer<typeof taxRuleCreateSchema>;

export const taxRuleUpdateSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  percentage: z.number().min(0).max(100).optional(),
  fixedAmount: z.number().min(0).optional(),
});

export type TaxRuleUpdateInput = z.infer<typeof taxRuleUpdateSchema>;

export const paymentGatewayCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export type PaymentGatewayInput = z.infer<typeof paymentGatewayCreateSchema>;

