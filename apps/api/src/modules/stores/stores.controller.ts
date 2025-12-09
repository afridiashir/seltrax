import { Request, Response } from "express";
import prisma from "../../db/prisma-client";
import { storeCreateSchema } from "@repo/zod-schemas";



export const stores = async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId)
      return res.status(401).json({ message: "Not authenticated" });
    const userId = req.user.userId;
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

export const storeCreate = async (req: Request, res: Response) => {
  try {
    const parse = storeCreateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({  errors: parse.error.format() });
    }

    if (!req.user?.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const userId = req.user.userId;
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


    res.status(201).json({ message: "Store created", store });


  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
}
