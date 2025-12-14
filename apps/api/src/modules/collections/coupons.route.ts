import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware";
import { storeContext } from "../../middlewares/storeContext.middleware";
import { coupons, couponsCreate, couponsUpdate, couponDelete } from "./coupons.controller";

const router = Router();

router.use(auth);
router.use(storeContext);

router.get("/", coupons);
router.post("/create", couponsCreate);
router.put("/update/:id", couponsUpdate);
router.delete("/:id", couponDelete);


export default router;

