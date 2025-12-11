import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware";
import { storeContext } from "../../middlewares/storeContext.middleware";
import { customers, customerCreate,customerDetails, customerUpdate, customerDelete } from "./customers.controller";

const router = Router();

router.use(auth);
router.use(storeContext);

router.get("/", customers);
router.get("/:id", customerDetails);

router.post("/create", customerCreate);

router.put("/update/:id", customerUpdate);

router.delete("/:id", customerDelete);


export default router;

