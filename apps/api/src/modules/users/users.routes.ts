import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware";
import { me } from "./users.controller";

const router = Router();

router.use(auth);

router.get("/me",me);

export default router;

