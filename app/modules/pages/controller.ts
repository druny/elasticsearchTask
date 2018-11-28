import { SearchResponse } from "elasticsearch";
import { IRouterContext } from "koa-router";

import ElasticsearchConstructor from "../../services/ElasticsearchConstructor";

interface NextType {
  (): Promise<any>;
}

const elasticSearch = new ElasticsearchConstructor("page-views");

export const getByFieldController = async (ctx: IRouterContext, next: NextType) => {
  const { type, value } = ctx.query;

  const result: SearchResponse<any> = await elasticSearch.getByField(type, value);

  ctx.body = result;

  await next();
};

export const searchByStringController = async (ctx: IRouterContext, next: NextType) => {
  const searchQuery = ctx.query.s;

  const result: SearchResponse<any> = await elasticSearch.fuzzySearch(searchQuery);

  ctx.body = result;

  await next();
};
