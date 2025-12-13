import { Request, Response } from "express";
import prisma from "@repo/db";
import { domainCreateSchema, domainUpdateSchema } from "@repo/zod-schemas";

export const domains = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;

    const domains = await prisma.domain.findMany({
      where: {
        storeId,
      }
    });

    res.status(200).json({
      domains,
    });


  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};



export const domainCreate = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required in header." });
    }
    const parse =  domainCreateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format() });
    }
    const { domain, isPrimary } = req.body;

    const domainExists = await prisma.domain.findUnique({
      where: { domain },
    });
    if (domainExists) {
      return res.status(400).json({ message: "Domain already exists" });
    }

    if(isPrimary){
      await prisma.domain.updateMany({
        where: { storeId },
        data: { isPrimary: isPrimary || false },
      });
    }
    
    const domainData = await prisma.domain.create({
      data: {
        storeId,
        domain,
        },
    });
    res.status(201).json({ message: "Domain Added", domain: domainData });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const domainUpdate = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    const domainId = req.params.id;
    const parse =  domainUpdateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format() });
    }
    const { isPrimary,status } = req.body;

    if(isPrimary){
      await prisma.domain.updateMany({
        where: { storeId },
        data: { isPrimary: false },
      });
    }

    const domain = await prisma.domain.updateMany({
      where: { id: domainId, storeId },
        data: {
          isPrimary : isPrimary || false,
          status,
          lastChecked: new Date(),
        },
    });
    if (domain.count === 0) {
        return res.status(404).json({ message: "Domain not found or no changes made" });
    }
    res.status(200).json({ message: "Domain Updated", domain });
    } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const domainDelete = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    const domainId = req.params.id;
    const deleted = await prisma.domain.deleteMany({
      where: { id: domainId, storeId },
    });
    if (deleted.count === 0) {
        return res.status(404).json({ message: "Domain not found" });
    }
    res.status(200).json({ message: "Domain Removed" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};