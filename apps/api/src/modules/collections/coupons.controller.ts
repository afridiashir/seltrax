import { Request, Response } from "express";
import prisma from "@repo/db";
import { couponCreateSchema, couponUpdateSchema,  } from "@repo/zod-schemas";

export const coupons = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;

    const coupons = await prisma.coupons.findMany({
      where: {
        storeId,
      }
    });

    res.status(200).json({
      coupons,
    });


  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};






export const couponsCreate = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required in header." });
    }
    const parse =  couponCreateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format() });
    }

    const { code, discount, type, minOrderValue, maxDiscount, startDate, endDate, usageLimit } = req.body;

    const couponsData = await prisma.coupons.create({
      data: {
        storeId,
        code,
        discount,
        type,
        minOrderValue,
        maxDiscount,
        startDate,
        endDate,
        usageLimit,
      },
    });

    res.status(201).json({ message: "Coupon Added", shipping: couponsData });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const couponsUpdate = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    const couponId = req.params.id;
    const parse =  couponUpdateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format() });
    }

    const { code, discount, type, minOrderValue, maxDiscount, startDate, endDate, usageLimit, isActive } = req.body;

    const couponUpdate = await prisma.coupons.updateMany({
      where: { id: couponId, storeId },
      data: {
        code,
        discount,
        type,
        minOrderValue,
        maxDiscount,
        startDate,
        endDate,
        usageLimit,
        isActive,
      },
    });

    if (couponUpdate.count === 0) {
        return res.status(404).json({ message: "Coupon not found or no changes made" });
    }
    res.status(200).json({ message: "Coupon Updated", coupon: couponUpdate });
    } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const couponDelete = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    const couponId = req.params.id;
    const deleted = await prisma.coupons.deleteMany({
      where: { id: couponId, storeId },
    });
    if (deleted.count === 0) {
        return res.status(404).json({ message: "Shipping not found" });
    }
    res.status(200).json({ message: "Shipping Removed" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

