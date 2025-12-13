import { Request, Response } from "express";
import prisma from "@repo/db";
import { shippingCreateSchema, shippingUpdateSchema } from "@repo/zod-schemas";

export const shipping = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;

    const shippings = await prisma.shippingRate.findMany({
      where: {
        storeId,
      }
    });

    res.status(200).json({
      shippings,
    });


  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};






export const shippingCreate = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required in header." });
    }
    const parse =  shippingCreateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format() });
    }

    const { name, price, minOrderPrice, maxOrderPrice, minWeight, maxWeight, estimatedDeliveryDays } = req.body;

    const shippingData = await prisma.shippingRate.create({
      data: {
        storeId,
        name,
        price,
        minOrderPrice,
        maxOrderPrice,
        minWeight,
        maxWeight,
        estimatedDeliveryDays,
        },
    });

    res.status(201).json({ message: "Shipping Added", shipping: shippingData });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const shippingUpdate = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    const shippingId = req.params.id;
    const parse =  shippingUpdateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format() });
    }
    const { name, price, minOrderPrice, maxOrderPrice, minWeight, maxWeight, estimatedDeliveryDays } = req.body;

    const shipping = await prisma.shippingRate.updateMany({
      where: { id: shippingId, storeId },
      data: {
        name,
        price,
        minOrderPrice,
        maxOrderPrice,
        minWeight,
        maxWeight,
        estimatedDeliveryDays,
      },
    });

    if (shipping.count === 0) {
        return res.status(404).json({ message: "Shipping not found or no changes made" });
    }
    res.status(200).json({ message: "Shipping Updated", shipping });
    } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const shippingDelete = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    const shippingId = req.params.id;
    const deleted = await prisma.shippingRate.deleteMany({
      where: { id: shippingId, storeId },
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


export const shippingRate = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;

    // Receive order total from request body
    const { orderTotal, orderWeight } = req.query;
    console.log(req.query.orderTotal, req.query.orderWeight);

    if (!orderTotal) {
      return res.status(400).json({ message: "orderTotal is required" });
    }

    // Fetch all valid shipping rates for this store
    const rates = await prisma.shippingRate.findMany({
      where: {
        storeId,

        AND: [
          // Price conditions
          {
            OR: [
              { minOrderPrice: null },
              { minOrderPrice: { lte: +orderTotal } }
            ]
          },
          {
            OR: [
              { maxOrderPrice: null },
              { maxOrderPrice: { gte: +orderTotal } }
            ]
          },

          // Weight conditions (optional)
          {
            OR: [
              { minWeight: null },
              { minWeight: { lte: Number(orderWeight) ?? 0 } }
            ]
          },
          {
            OR: [
              { maxWeight: null },
              { maxWeight: { gte: Number(orderWeight) ?? 0 } }
            ]
          }
        ]
      },

      orderBy: {
        price: "asc" // best rate = lowest price
      }
    });

    return res.json({
      bestRate: rates[0] || null,  // this is the BEST shipping rate
    });

  } catch (error) {
    console.error("Shipping Rate Error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};