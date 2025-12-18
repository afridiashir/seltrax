import { Router } from "express";
import * as ProductController from "./product.controller";

const router = Router();

// Products
router.post("/", ProductController.createProduct);
router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

// Variants
router.post("/:productId/variants", ProductController.createVariant);
router.put("/variants/:variantId", ProductController.updateVariant);
router.delete("/variants/:variantId", ProductController.deleteVariant);

export default router;
