import * as Koa from "koa";
import * as config from "config";

import router from "./router";

const app = new Koa();

const PORT = config.get("port");

app.use(router.routes());

export const run = () => app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
