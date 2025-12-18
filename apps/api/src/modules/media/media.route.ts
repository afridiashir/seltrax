import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware";
import { storeContext } from "../../middlewares/storeContext.middleware";
import { media, mediaCreate, mediaUpdate, mediaDelete } from "./media.controller";

const router = Router();

router.use(auth);
router.use(storeContext);

router.get("/", media);
router.post("/create", mediaCreate);
router.put("/update/:id", mediaUpdate);
router.delete("/:id", mediaDelete);


export default router;

