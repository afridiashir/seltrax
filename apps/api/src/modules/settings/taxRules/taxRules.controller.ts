import { Request, Response } from "express";
import prisma from "@repo/db";
import { taxRuleCreateSchema, taxRuleUpdateSchema } from "@repo/zod-schemas";
import { ta } from "zod/v4/locales";

export const taxRules = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;

    const taxRules = await prisma.taxRules.findMany({
      where: {
        storeId,
      }
    });

    res.status(200).json({
      taxRules,
    });


  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};






export const taxRulesCreate = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required in header." });
    }
    const parse =  taxRuleCreateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format() });
    }

    const { name, percentage, fixedAmount } = req.body;

     const taxRuleData = await prisma.taxRules.create({
      data: {
        storeId,
        name,
        percentage,
        fixedAmount,
        },
    });


    res.status(201).json({ message: "Tax Rules Added", taxRules: taxRuleData });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const taxRuleUpdate = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    const taxRuleId = req.params.id;
    const parse =  taxRuleUpdateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format() });
    }
    const { name, percentage, fixedAmount } = req.body;

     const taxRule = await prisma.taxRules.updateMany({
      where: { id: taxRuleId, storeId },
      data: {
        name,
        percentage,
        fixedAmount,
      },
    });



    if (taxRule.count === 0) {
        return res.status(404).json({ message: "Tax Rule not found or no changes made" });
    }
    res.status(200).json({ message: "Tax Rule Updated", taxRule });
    } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const taxRuleDelete = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    const taxRuleId = req.params.id;
    const deleted = await prisma.shippingRate.deleteMany({
      where: { id: taxRuleId, storeId },
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

