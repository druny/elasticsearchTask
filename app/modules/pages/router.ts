import * as Router from "koa-router";

const router = new Router();

import { getByFieldController, searchByStringController } from "./controller";
import { getByFieldValidator, searchByStringValidator } from "./validators";

router.get("/field", getByFieldValidator, getByFieldController);
router.get("/search", searchByStringValidator, searchByStringController);

export default router;
