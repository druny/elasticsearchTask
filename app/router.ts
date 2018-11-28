import * as Router from "koa-router";

import pages from "./modules/pages";

const router = new Router();

router.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500;

    throw err;
  }
});

router.use("/pages", pages.router.routes());

export default router;
