import { Request, Response } from "express";
import prisma from "@repo/db";
import { collectionCreateSchema, collectionUpdateSchema} from "@repo/zod-schemas";

export const collections = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;

    const collections = await prisma.coupons.findMany({
      where: {
        storeId,
      }
    });

    res.status(200).json({
      collections,
    });


  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};






export const collectionsCreate = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required in header." });
    }
    const parse =  collectionCreateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format() });
    }

    const { name, description, slug, imageUrl, headerImageUrl, seoTitle, seoDescription, seoKeywords, parentId}   = req.body;

    const collections = await prisma.collection.create({
      data: {
        storeId,
        name,
        description,
        slug,
        imageUrl,
        headerImageUrl,
        seoTitle,
        seoDescription,
        seoKeywords,
        parentId,
      },
    });

    res.status(201).json({ message: "Collection Added", collections });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const collectionUpdate = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    const collectionId = req.params.id;
    const parse =  collectionUpdateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format() });
    }

    const { name, description, slug, imageUrl, headerImageUrl, seoTitle, seoDescription, seoKeywords, parentId}   = req.body;

    const collectionUpdate = await prisma.collection.updateMany({
      where: { id: collectionId, storeId },
      data: {
        name,
        description,
        slug,
        imageUrl,
        headerImageUrl,
        seoTitle,
        seoDescription,
        seoKeywords,
        parentId,
      },
    });

    if (collectionUpdate.count === 0) {
        return res.status(404).json({ message: "Collection not found or no changes made" });
    }
    res.status(200).json({ message: "Collection Updated", collection: collectionUpdate });
    } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const collectionDelete = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    const collectionId = req.params.id;
    const deleted = await prisma.coupons.deleteMany({
      where: { id: collectionId, storeId },
    });
    if (deleted.count === 0) {
        return res.status(404).json({ message: "Collection not found" });
    }
    res.status(200).json({ message: "Collection Removed" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

