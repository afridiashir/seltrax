import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware";
import { stores,storeCreate, storeUsers, storeDetails,storeUpdate } from "./stores.controller";
import { storeContext } from "../../middlewares/storeContext.middleware";

const router = Router();

router.use(auth);

router.get("/", stores);
router.post("/create", storeCreate);
router.get("/users",storeContext,storeUsers);
router.get("/details",storeContext,storeDetails);
router.post('/update',storeContext,storeUpdate);

export default router;

