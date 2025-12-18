import { Request, Response } from "express";
import prisma from "@repo/db";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      slug,
      price,
      salePrice,
      status,
      variants = [],
    } = req.body;

    const storeId = req.context?.storeId; // from auth middleware

    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required in header." });
    }


    const product = await prisma.product.create({
      data: {
        storeId,
        title,
        description,
        slug,
        price,
        salePrice,
        status,
        variants:
          variants.length > 0
            ? {
                create: variants.map((v: any) => ({
                  sku: v.sku,
                  barcode: v.barcode,
                  price: v.price,
                  salePrice: v.salePrice,
                  stock: v.stock,
                  options: {
                    create: v.options?.map((o: any) => ({
                      optionId: o.optionId,
                      valueId: o.valueId,
                    })),
                  },
                })),
              }
            : {
                // Default variant for simple product
                create: {
                  sku: `SKU-${Date.now()}`,
                  price,
                  salePrice,
                  stock: 0,
                },
              },
      },
      include: {
        variants: true,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error });
  }
};


export const getProducts = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId; // from auth middleware

    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required in header." });
    }

    const products = await prisma.product.findMany({
      where: { storeId },
      include: {
        variants: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};


export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        options: {
          include: {
            values: true,
          },
        },
        variants: {
          include: {
            options: {
              include: {
                option: true,
                value: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.update({
      where: { id },
      data: req.body,
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};


export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id },
    });

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};


export const createVariant = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { sku, barcode, price, salePrice, stock, options } = req.body;

    if(!productId){
      
      return res.status(400).json({ message: "Store ID is required in header." });
    }

    const variant = await prisma.productVariant.create({
      data: {
        productId,
        sku,
        barcode,
        price,
        salePrice,
        stock,
        options: {
          create: options.map((o: any) => ({
            optionId: o.optionId,
            valueId: o.valueId,
          })),
        },
      },
    });

    res.status(201).json(variant);
  } catch (error) {
    res.status(500).json({ message: "Failed to create variant" });
  }
};


export const updateVariant = async (req: Request, res: Response) => {
  try {
    const { variantId } = req.params;

    const variant = await prisma.productVariant.update({
      where: { id: variantId },
      data: req.body,
    });

    res.json(variant);
  } catch (error) {
    res.status(500).json({ message: "Failed to update variant" });
  }
};


export const deleteVariant = async (req: Request, res: Response) => {
  try {
    const { variantId } = req.params;

    await prisma.productVariant.delete({
      where: { id: variantId },
    });

    res.json({ message: "Variant deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete variant" });
  }
};
