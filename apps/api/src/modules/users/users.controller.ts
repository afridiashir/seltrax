import { Request, Response } from "express";
import prisma from "../../db/prisma-client";
import { AuthenticatedRequest } from "../../types/request.types";


export const me = async (req: AuthenticatedRequest, res: Response) => {
    try {
        
        const userId = req.user?.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ user });

    } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: err.message || "Server error" });
    }
};

