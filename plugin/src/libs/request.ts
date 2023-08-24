/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  ResponseType,
} from "axios";
import * as https from "https";
import {
  AUTH_HEADERS,
  REQUEST_BIGCOMMERCE_API_URL,
  REQUEST_CONCURRENCY,
  REQUEST_DEBOUNCE_INTERVAL,
  REQUEST_PENDING_COUNT,
  REQUEST_THROTTLE_INTERVAL,
  REQUEST_TIMEOUT,
} from "../constants";
import { IRequestOptions, IRequestRunParams } from "../types";
import {
  convertObjectToString,
  convertStringToLowercase,
  convertStringToUppercase,
} from "../utils/convert-values";
import { debounce } from "../utils/debounce";
import { throttle } from "../utils/throttle";

export class Request {
  private _hostname: string;
  private _headers: typeof AUTH_HEADERS | Record<string, string>;
  private _responseType: ResponseType;
  private _requestTimeout: typeof REQUEST_TIMEOUT | number;
  private _requestThrottleInterval: typeof REQUEST_THROTTLE_INTERVAL | number;
  private _requestDebounceInterval: typeof REQUEST_DEBOUNCE_INTERVAL | number;
  private _requestConcurrency: typeof REQUEST_CONCURRENCY | number;
  private _pendingRequests: typeof REQUEST_PENDING_COUNT | number;

  constructor(hostname: string, options: IRequestOptions = {}) {
    const {
      headers = AUTH_HEADERS,
      requestTimeout = REQUEST_TIMEOUT,
      requestThrottleInterval = REQUEST_THROTTLE_INTERVAL,
      requestDebounceInterval = REQUEST_DEBOUNCE_INTERVAL,
      requestConcurrency = REQUEST_CONCURRENCY,
    } = options;

    this._hostname = hostname;
    this._headers = headers;
    this._responseType = `json`;
    this._pendingRequests = REQUEST_PENDING_COUNT;
    this._requestTimeout = requestTimeout;
    this._requestThrottleInterval = requestThrottleInterval;
    this._requestDebounceInterval = requestDebounceInterval;
    this._requestConcurrency = requestConcurrency;
  }

  /**
   * @description Handle running API requests
   */
  async run(options: IRequestRunParams) {
    const {
      url = null,
      method = null,
      body = null,
      headers = null,
      reporter,
    } = options;
    const updatedMethod = convertStringToLowercase(method);

    const config: AxiosRequestConfig = {
      baseURL: this._hostname,
      headers: {
        ...this._headers,
        ...headers,
      },
      responseType: this._responseType,
      timeout: this._requestTimeout,
      httpsAgent: new https.Agent({ keepAlive: true }),
    };

    const requestAxiosInstance: AxiosInstance = axios.create(config);

    requestAxiosInstance.interceptors.request.use(
      (config) => {
        const debounceInterval = debounce(
          () => this._pendingRequests--,
          this._requestDebounceInterval
        );
        const throttleInterval = throttle(() => {
          clearInterval(throttleInterval as unknown as number);
          debounceInterval();
          return config;
        }, this._requestThrottleInterval);

        if (this._pendingRequests <= this._requestConcurrency) {
          throttleInterval();
        }

        if (this._pendingRequests > this._requestConcurrency) {
          reporter.warn(
            `[${convertStringToUppercase(method)}] ${
              REQUEST_BIGCOMMERCE_API_URL + url
            } - (THROTTLED) (${this._pendingRequests} pending ${
              this._pendingRequests > 1 ? `requests` : `request`
            })`
          );
        }

        this._pendingRequests++;
        return config;
      },
      (error: any) => {
        reporter.error(
          `[${convertStringToUppercase(method)}] ${
            REQUEST_BIGCOMMERCE_API_URL + url
          } - (ERROR)`
        );
        reporter.error(
          `\n`,
          `${
            error?.message ||
            convertObjectToString(error) ||
            `An error occurred. Please try again later.`
          }`,
          `\n`
        );
        return Promise.reject(error);
      }
    );

    requestAxiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        this._pendingRequests = Math.max(
          0,
          this._pendingRequests > 0 ? this._pendingRequests - 1 : 0
        );
        reporter.info(
          `[${convertStringToUppercase(method)}] ${
            REQUEST_BIGCOMMERCE_API_URL + url
          } - (${response?.status} ${response?.statusText}) - (${
            this._pendingRequests
          } pending ${
            this._pendingRequests > 1 || this._pendingRequests === 0
              ? `requests`
              : `request`
          })`
        );
        return response;
      },
      (error: AxiosError) => {
        if (error.response) {
          this._pendingRequests = Math.max(
            0,
            this._pendingRequests > 0 ? this._pendingRequests - 1 : 0
          );
          reporter.error(
            `[${convertStringToUppercase(method)}] ${
              REQUEST_BIGCOMMERCE_API_URL + url
            } - (${error.response.status} ${error.response.statusText})`
          );
          reporter.error(
            `\n`,
            `${
              error?.message ||
              convertObjectToString(error) ||
              `An error occurred. Please try again later.`
            }`,
            `\n`
          );
        } else if (error.request) {
          this._pendingRequests--;
          reporter.error(
            `[${convertStringToUppercase(method)}] ${
              REQUEST_BIGCOMMERCE_API_URL + url
            } - (NO RESPONSE)`
          );
          reporter.error(
            `\n`,
            `${
              error?.message ||
              convertObjectToString(error) ||
              `No response from the server. Please check your internet connection or try again later.`
            }`,
            `\n`
          );
        }
        return Promise.reject(error);
      }
    );

    switch (updatedMethod) {
      case `get`:
        return await requestAxiosInstance.get(url, body);
      case `post`:
        return await requestAxiosInstance.post(url, body);
      default:
        throw new Error(
          `The ${updatedMethod} method is currently not supported.`
        );
    }
  }
}
