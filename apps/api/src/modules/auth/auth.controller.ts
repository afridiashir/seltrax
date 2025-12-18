import { Request, Response } from "express";
import prisma from "@repo/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "@repo/zod-schemas";
import { error } from "console";

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.format() });
    }

    const { name, email, password } = req.body;


    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    }, );

    return res.json({ message: "User Registered Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.format() });
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id,
       },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({ token, email: user.email, name: user.name, });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
