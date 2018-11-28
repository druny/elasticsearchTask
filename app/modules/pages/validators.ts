import { IRouterContext } from "koa-router";

interface NextType {
  (): Promise<any>;
}

export const getByFieldValidator = async (ctx: IRouterContext, next: NextType) => {
  const allowedTypes = ["event_type", "domain", "blacklisted", "ip"];

  const { type, value } = ctx.query;

  if (!type || !value) {
    ctx.status = 400;
    ctx.body = { message: "Provide mandatory fields", fields: ["type", "value"] };

    return;
  }

  if (!allowedTypes.includes(type)) {
    ctx.status = 409;
    ctx.body = { allowedTypes, message: "Forbidden" };

    return;
  }

  await next();
};

export const searchByStringValidator = async (ctx: IRouterContext, next: NextType) => {
  const searchQuery = ctx.query.s;

  if (!searchQuery) {
    ctx.status = 400;
    ctx.body = { message: "Provide mandatory field", field: "s" };

    return;
  }

  await next();
};
