import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware";
import { storeContext } from "../../middlewares/storeContext.middleware";
import { domains, domainCreate, domainUpdate, domainDelete } from "./domains.controller";

const router = Router();

router.use(auth);
router.use(storeContext);

router.get("/", domains);

router.post("/create", domainCreate);

router.put("/update/:id", domainUpdate);

router.delete("/:id", domainDelete);


export default router;

