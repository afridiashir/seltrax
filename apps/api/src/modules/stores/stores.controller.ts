import { Request, Response } from "express";
import prisma from "@repo/db";
import { storeCreateSchema, storeUpdateSchema } from "@repo/zod-schemas";
import { AuthenticatedRequest } from "../../types/request.types";

export const stores = async (req: Request, res: Response) => {
  try {

    const userId = req.user?.id;

    const userStores = await prisma.userStoreRole.findMany({
      where: { userId },
      select: {
        store: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          }
        },
        role: true,
      },
    });
    const stores = userStores.map((usr) => ({
      id: usr.store.id,
      name: usr.store.name,
      role: usr.role,
      createdAt: usr.store.createdAt,
    }));
    res.json({ stores });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};
// Store Create 
export const storeCreate = async (req: Request, res: Response) => {
  try {
    const parse = storeCreateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({  errors: parse.error.format() });
    }

    if (!req.user?.id) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const userId = req.user.id;
    const { name, category, currency } = req.body;

    const store = await prisma.store.create({
      data: {
        name,
        category,
        currency,
        ownerId: userId, }});

      await prisma.userStoreRole.create({
        data: {
          userId,
          storeId: store.id,
          role: "ADMIN",
        },
      });


    res.status(201).json({ message: "Store updated", store });


  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
}


export const storeUsers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const storeId = req.context?.storeId;

    const users = await prisma.userStoreRole.findMany({
      where: { storeId },
      select: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
        },
        role: true,
      },
    });
    const result = users.map((usr) => ({
      id: usr.user.id,
      name: usr.user.name,
      email: usr.user.email,
      role: usr.role,
      createdAt: usr.user.createdAt,
    }));
    res.json({ users: result });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};


export const storeDetails = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    const store = await prisma.store.findUnique({
      where: { id: storeId },
      select: {
        id: true,
        name: true,
        category: true,
        logoUrl: true,
        siteIcon: true,

        currency: true,
        createdAt: true,
      },
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }
    res.status(200).json({ store });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const storeUpdate = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    
    const parse = storeUpdateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({  errors: parse.error.format() });
    }
    const { name, category, currency, logoUrl, siteIcon } = req.body;
    console.log(req.body.logoUrl);

    const updatedStore = await prisma.store.update({
      where: { id: storeId },
      data: {
        name,
        category,
        currency,
        logoUrl,
        siteIcon,
      },
    });
    res.status(200).json({ message: "Store Created", store: updatedStore });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};