import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware";
import { storeContext } from "../../middlewares/storeContext.middleware";
import { domains, customerCreate,customerDetails, customerUpdate, customerDelete } from "./domains.controller";

const router = Router();

router.use(auth);
router.use(storeContext);

router.get("/", domains);
router.get("/:id", customerDetails);

router.post("/create", customerCreate);

router.put("/update/:id", customerUpdate);

router.delete("/:id", customerDelete);


export default router;

