import { Request, Response } from "express";
import prisma from "@repo/db";
import { paymentGatewayCreateSchema } from "@repo/zod-schemas";
import { ta } from "zod/v4/locales";

export const paymentGateways = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;

    const paymentGateways = await prisma.paymentGateway.findMany({
      where: {
        storeId,
      }
    });

    res.status(200).json({
      paymentGateways,
    });


  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};






export const paymentGatewaysCreate = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required in header." });
    }
    const parse =  paymentGatewayCreateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format() });
    }

    const { name , description } = req.body;

     const taxRuleData = await prisma.paymentGateway.create({
      data: {
        storeId,
        name,
        description
        },
    });


    res.status(201).json({ message: "Payment Gateway Added", taxRules: taxRuleData });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const paymentGatewayUpdate = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    const paymentGatewayId = req.params.id;
    const parse =  paymentGatewayCreateSchema.partial().safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format() });
    }
    
    const { name , description } = req.body;

     const paymentGateway = await prisma.paymentGateway.updateMany({
      where: { id: paymentGatewayId, storeId },
      data: {
        name,
        description
      },
    });



    if (paymentGateway.count === 0) {
        return res.status(404).json({ message: "Payment Gateway not found or no changes made" });
    }
    res.status(200).json({ message: "Payment Gateway Updated", paymentGateway });
    } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const paymentGatewayDelete = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    const paymentGatewayId = req.params.id;
    const deleted = await prisma.paymentGateway.deleteMany({
      where: { id: paymentGatewayId, storeId },
    });
    if (deleted.count === 0) {
        return res.status(404).json({ message: "Payment Gateway not found" });
    }
    res.status(200).json({ message: "Payment Gateway Removed" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

