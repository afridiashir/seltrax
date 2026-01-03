import { Schema, z } from "zod";
import { is } from "zod/v4/locales";

// Domain Schemas 
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

export const domainSchemaType = z.object({
  id: z.string(),
  storeId: z.string(),
  domain : z.string(),
  isPrimary : z.string().optional(),
  status: z.string().optional(),
  lastChecked : z.date().optional(),
  createdAt : z.date().optional()
});

export type DomainSchemaType = z.infer<typeof domainSchemaType>;

// Shipping Schemas 

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

// Tax Rules  Schemas

export type TaxRuleInput = z.infer<typeof taxRuleCreateSchema>;

export const taxRuleUpdateSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  percentage: z.number().min(0).max(100).optional(),
  fixedAmount: z.number().min(0).optional(),
});

export type TaxRuleUpdateInput = z.infer<typeof taxRuleUpdateSchema>;

// Payment Gateway Schemas 

export const paymentGatewayCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export type PaymentGatewayInput = z.infer<typeof paymentGatewayCreateSchema>;

export const paymentGatewayUpdateSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
});

export type PaymentGatewayUpdateInput = z.infer<typeof paymentGatewayUpdateSchema>;

// Coupons Schemas 

export const couponCreateSchema = z.object({
  code: z.string().min(1, "Code is required"),
  discount: z.number().min(0, "Discount must be at least 0"),
  type: z.enum(["PERCENTAGE", "FIXED"]),
  minOrderValue: z.number().min(0).optional(),
  maxDiscount: z.number().min(0).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  usageLimit: z.number().min(1).optional(),
  isActive: z.boolean().optional(),
});

export type CouponInput = z.infer<typeof couponCreateSchema>;

export const couponUpdateSchema = z.object({
  code: z.string().min(1, "Code is required").optional(),
  discount: z.number().min(0, "Discount must be at least 0").optional(),
  type: z.enum(["PERCENTAGE", "FIXED"]).optional(),
  minOrderValue: z.number().min(0).optional(),
  maxDiscount: z.number().min(0).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  usageLimit: z.number().min(1).optional(),
  isActive: z.boolean().optional(),
});

export type CouponUpdateInput = z.infer<typeof couponUpdateSchema>;





