import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware";
import { storeContext } from "../../middlewares/storeContext.middleware";
import { taxRules, taxRulesCreate, taxRuleUpdate, taxRuleDelete } from "./taxRules.controller";

const router = Router();

router.use(auth);
router.use(storeContext);

router.get("/", taxRules);

router.post("/create", taxRulesCreate);

router.put("/update/:id", taxRuleUpdate);

router.delete("/:id", taxRuleDelete);


export default router;

