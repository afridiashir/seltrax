import { NextFunction, Request, Response } from "express";
export function storeContext(req:Request, res:Response, next:NextFunction) {
  const storeId = req.header("x-store-id");

  if (!storeId) {
    return res.status(400).json({ error: "x-store-id header is required" });
  }

  req.context = { storeId };
  next();
}
