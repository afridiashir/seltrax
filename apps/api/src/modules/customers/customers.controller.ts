import { Request, Response } from "express";
import prisma from "@repo/db";
import { customerCreateSchema, customerUpdateSchema } from "@repo/zod-schemas";

export const customers = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;

    // Pagination
    const page = parseInt((req.query.page as string) || "1");
    const limit = parseInt((req.query.limit as string) || "10");
    const skip = (page - 1) * limit;

    // Search
    const search = (req.query.search as string) || "";

    // Sorting
    const sortBy = (req.query.sortBy as string) || "createdAt"; // default sort field
    const sortOrder = (req.query.sortOrder as string) === "asc" ? "asc" : "desc"; // default desc

    const customers = await prisma.customer.findMany({
      where: {
        storeId,
        OR: search
          ? [
            { firstName: { contains: search, mode: "insensitive" } },
            { lastName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
            { city: { contains: search, mode: "insensitive" } },
            { country: { contains: search, mode: "insensitive" } },
          ]
          : undefined,
      },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    });

    const total = await prisma.customer.count({
      where: {
        storeId,
        OR: search
          ? [
            { firstName: { contains: search, mode: "insensitive" } },
            { lastName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
            { city: { contains: search, mode: "insensitive" } },
            { country: { contains: search, mode: "insensitive" } },
          ]
          : undefined,
      },
    });
    const overAllCustomers = await prisma.customer.count({
      where: {
        storeId
      }
    });

    res.status(200).json({
      customers,
      overAllCustomers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const customerDetails = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    const customerId = req.params.id;
    const customer = await prisma.customer.findFirst({
      where: { id: customerId, storeId },
    });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ customer });
  }
  catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const customerCreate = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required in header." });
    }
    const parse = customerCreateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format() });
    }
    const { firstName, lastName, email, phone, address, state, city, country, zipCode, emailMarketing, smsMarketing, note } = req.body;

    const customer = await prisma.customer.create({
      data: {
        storeId,
        firstName,
        lastName,
        email,
        phone,
        address,
        state,
        city,
        country,
        zipCode,
        emailMarketing,
        smsMarketing,
        note
      },
    });
    res.status(201).json({ message: "Customer Created", customer });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const customerUpdate = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    const customerId = req.params.id;
    const parse = customerUpdateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format() });
    }
    const { firstName, lastName, email, phone, address, state, city, country, zipCode, emailMarketing, smsMarketing, note } = req.body;
    const customer = await prisma.customer.updateMany({
      where: { id: customerId, storeId },
      data: {
        firstName,
        lastName,
        email,
        phone,
        address,
        state,
        city,
        country,
        zipCode,
        emailMarketing,
        smsMarketing, 
        note
      },
    });
    if (customer.count === 0) {
      return res.status(404).json({ message: "Customer not found or no changes made" });
    }
    res.status(200).json({ message: "Customer Updated", customer });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const customerDelete = async (req: Request, res: Response) => {
  try {
    const storeId = req.context?.storeId;
    const customerId = req.params.id;
    const deleted = await prisma.customer.deleteMany({
      where: { id: customerId, storeId },
    });
    if (deleted.count === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer Deleted" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};