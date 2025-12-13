import { Router } from "express";
import { auth } from "../../../middlewares/auth.middleware";
import { storeContext } from "../../../middlewares/storeContext.middleware";
import { shipping, shippingCreate, shippingUpdate, shippingDelete, shippingRate } from "./shipping.controller";

const router = Router();

router.use(auth);
router.use(storeContext);

router.get("/", shipping);

router.get("/rates", shippingRate);

router.post("/create", shippingCreate);

router.put("/update/:id", shippingUpdate);

router.delete("/:id", shippingDelete);


export default router;

