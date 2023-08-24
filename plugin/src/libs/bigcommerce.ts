/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AUTH_HEADERS,
  REQUEST_BIGCOMMERCE_API_URL,
  REQUEST_CONCURRENCY,
  REQUEST_DEBOUNCE_INTERVAL,
  REQUEST_MAX_COUNT,
  REQUEST_THROTTLE_INTERVAL,
  REQUEST_TIMEOUT,
} from "../constants";
import { IBigCommerceConfig, IRequestProps } from "../types";
import { convertObjectToString } from "../utils/convertValues";
import { Request } from "./request";

export class BigCommerce {
  // private _clientId: string
  // private _secret: string
  private _storeHash: string;
  private _headers: typeof AUTH_HEADERS | Record<string, string>;
  private _requestTimeout: typeof REQUEST_TIMEOUT | number;
  private _requestThrottleInterval: typeof REQUEST_THROTTLE_INTERVAL | number;
  private _requestDebounceInterval: typeof REQUEST_DEBOUNCE_INTERVAL | number;
  private _requestConcurrency: typeof REQUEST_CONCURRENCY | number;
  private _requestMaxCount: typeof REQUEST_MAX_COUNT | number;
  private _reporter: any;

  constructor(config: IBigCommerceConfig) {
    if (!config) {
      throw new Error(
        `BigCommerce API config required. It is required to make any call to the API`
      );
    }

    // this._clientId = config.clientId
    // this._secret = config.secret
    this._storeHash = config.storeHash;
    this._headers = config.headers || AUTH_HEADERS;
    this._requestTimeout = config.requestTimeout || REQUEST_TIMEOUT;
    this._requestThrottleInterval =
      config.requestThrottleInterval || REQUEST_THROTTLE_INTERVAL;
    this._requestDebounceInterval =
      config.requestDebounceInterval || REQUEST_DEBOUNCE_INTERVAL;
    this._requestConcurrency = config.requestConcurrency || REQUEST_CONCURRENCY;
    this._requestMaxCount = config.requestMaxCount || REQUEST_MAX_COUNT;
    this._reporter = config.reporter;
  }

  async request({ url, method = ``, body, headers }: IRequestProps) {
    const fullPath = `/stores/${this._storeHash}${url}`;
    const endpointUrl = new URL(fullPath, REQUEST_BIGCOMMERCE_API_URL);

    const request = new Request(REQUEST_BIGCOMMERCE_API_URL, {
      headers: {
        ...this._headers,
        ...headers,
      },
      requestTimeout: this._requestTimeout,
      requestThrottleInterval: this._requestThrottleInterval,
      requestDebounceInterval: this._requestDebounceInterval,
      requestMaxCount: this._requestMaxCount,
      requestConcurrency: this._requestConcurrency,
    });

    const { data } = await request.run({
      url: fullPath,
      method,
      body,
      headers,
      reporter: this._reporter,
    });

    if (`meta` in data && `pagination` in data.meta) {
      const { total_pages: totalPages, current_page: currentPage } =
        data.meta.pagination;

      if (totalPages > currentPage) {
        const promises = [];

        for (
          let nextPage = currentPage + 1;
          nextPage <= totalPages;
          nextPage++
        ) {
          endpointUrl.searchParams.set(`page`, nextPage);

          promises.push(
            request.run({
              url: `${endpointUrl.pathname}${endpointUrl.search}`,
              method: `get`,
              body,
              headers,
              reporter: this._reporter,
            })
          );
        }

        await Promise.allSettled(promises)
          .then((res) => {
            res.forEach((result) => {
              // Check if the promise was fulfilled
              if (result.status === `fulfilled`) {
                const subItemData = result.value.data.data || null;
                data.data = data.data.concat(subItemData);
              } else if (result.status === `rejected`) {
                console.error(result.reason);
              }
            });
          })
          .catch((err) => {
            this._reporter.error(
              `[ERROR] ${
                err?.message ||
                convertObjectToString(err) ||
                `There was an error while fetching and expanding items. Please try again later.`
              }`
            );
            return Promise.reject(err);
          });

        data.meta.pagination.total_pages = totalPages;
        data.meta.pagination.current_page = totalPages;
      }
    }

    return `data` in data ? data.data : data;
  }

  async get({
    url,
    body,
    headers,
  }: {
    url: string;
    body?: never;
    headers?: Record<string, string>;
  }) {
    const results = await this.request({ url, method: `get`, body, headers });
    return results;
  }

  async post({
    url,
    body,
    headers,
  }: {
    url: string;
    body?: never;
    headers?: Record<string, string>;
  }) {
    const results = await this.request({ url, method: `post`, body, headers });
    return results;
  }
}
