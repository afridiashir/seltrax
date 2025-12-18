import { Request, Response } from "express";
import prisma from "@repo/db";
import { collectionCreateSchema, collectionUpdateSchema, mediaCreateSchema, mediaUpdateSchema} from "@repo/zod-schemas";

export const media = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;

    const media = await prisma.media.findMany({
      where: {
        storeId,
      }
    });

    res.status(200).json({
      media,
    });


  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};






export const mediaCreate = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required in header." });
    }
    const parse =  mediaCreateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format() });
    }

    const {url, type, mimeType, size, altText} = req.body;

    const media = await prisma.media.create({
      data:{
        storeId,
        url,
        type,
        mimeType,
        size,
        altText
      }
    })

    res.status(201).json({ message: "Media Added", media });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const mediaUpdate = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    const mediaId = req.params.id;
    const parse =  mediaUpdateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format() });
    }

    const { altText}   = req.body;

    const mediaUpdate = await prisma.media.updateMany({
      where: { id: mediaId, storeId },
      data: {
        altText
      },
    });

    if (mediaUpdate.count === 0) {
        return res.status(404).json({ message: "Media not found or no changes made" });
    }
    res.status(200).json({ message: "Media Updated", mediaUpdate });
    } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const mediaDelete = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    const mediaId = req.params.id;
    const deleted = await prisma.media.deleteMany({
      where: { id: mediaId, storeId },
    });
    if (deleted.count === 0) {
        return res.status(404).json({ message: "Media not found" });
    }
    res.status(200).json({ message: "Media Removed" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

