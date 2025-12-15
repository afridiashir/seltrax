import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware";
import { storeContext } from "../../middlewares/storeContext.middleware";
import { collections, collectionsCreate, collectionUpdate, collectionDelete } from "./collections.controller";

const router = Router();

router.use(auth);
router.use(storeContext);

router.get("/", collections);
router.post("/create", collectionsCreate);
router.put("/update/:id", collectionUpdate);
router.delete("/:id", collectionDelete);


export default router;

