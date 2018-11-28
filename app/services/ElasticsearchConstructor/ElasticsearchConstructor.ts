import * as elasticsearch from "elasticsearch";
import * as config from "config";

const host = config.get("esBaseUrl");

interface ElasticsearchConstructorInterface {
  index: string;
  elasticClient: elasticsearch.Client;
  init(): void;
  getByField(): Promise<any>;
}

export default class ElasticsearchConstructor {
  index: string;
  elasticClient: elasticsearch.Client;

  constructor(index: string) {
    const elasticClient = new elasticsearch.Client({
      host,
      log: "info"
    });

    this.index = index;
    this.elasticClient = elasticClient;
  }

  getByField(type: string, value: any) {
    const index = this.index;
    const body = {
      query: {
        match: {
          [type]: value
        }
      }
    };

    return this.elasticClient.search({ index, body });
  }

  fuzzySearch(value: any) {
    const index = this.index;
    const body = {
      query: {
        query_string: {
          query: `*${value}*`,
          fields: ["event_type", "domain", "ip"]
        }
      }
    };

    return this.elasticClient.search({ index, body });
  }
}
