import { Router } from "express";
import { auth } from "../../../middlewares/auth.middleware";
import { storeContext } from "../../../middlewares/storeContext.middleware";
import { paymentGateways, paymentGatewaysCreate, paymentGatewayUpdate, paymentGatewayDelete } from "./paymentGateways.controller";

const router = Router();

router.use(auth);
router.use(storeContext);

router.get("/", paymentGateways);

router.post("/create", paymentGatewaysCreate);

router.put("/update/:id", paymentGatewayUpdate);

router.delete("/:id", paymentGatewayDelete);


export default router;

