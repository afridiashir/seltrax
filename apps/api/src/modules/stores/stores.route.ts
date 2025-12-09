import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware";
import { stores,storeCreate } from "./stores.controller";

const router = Router();

router.use(auth);

router.get("/", stores);
router.post("/create", storeCreate);

export default router;

