/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  PluginOptions as GatsbyDefaultPluginOptions,
  IPluginRefOptions,
} from "gatsby";
import {
  AUTH_HEADERS,
  NODE_TYPES,
  REQUEST_CONCURRENCY,
  REQUEST_DEBOUNCE_INTERVAL,
  REQUEST_MAX_COUNT,
  REQUEST_PENDING_COUNT,
  REQUEST_THROTTLE_INTERVAL,
  REQUEST_TIMEOUT,
} from "./constants";

export interface IBigCommerceConfig {
  clientId: string;
  secret: string;
  storeHash: string;
  responseType?: string;
  headers?: Record<string, string>;
  requestTimeout?: number;
  requestThrottleInterval?: number;
  requestDebounceInterval?: number;
  requestConcurrency?: number;
  requestMaxCount?: number;
  reporter: any;
}

export interface IRequestProps {
  url: string;
  method?: string;
  body?: never;
  headers?: Record<string, string>;
}

export interface IRequestOptions {
  headers?: typeof AUTH_HEADERS | Record<string, string>;
  requestTimeout?: typeof REQUEST_TIMEOUT | number;
  requestThrottleInterval?: typeof REQUEST_THROTTLE_INTERVAL | number;
  requestDebounceInterval?: typeof REQUEST_DEBOUNCE_INTERVAL | number;
  requestMaxCount?: typeof REQUEST_MAX_COUNT | number;
  requestConcurrency?: typeof REQUEST_CONCURRENCY | number;
  pendingRequests?: typeof REQUEST_PENDING_COUNT | number;
}

export interface IRequestRunParams {
  url?: string;
  method?: string;
  body?: never | null;
  headers?: Record<string, string>;
  reporter: any;
}

export interface IAuthorInput {
  id: number;
  name: string;
}

export interface IPostImageInput {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface IPostInput {
  id: number;
  slug: string;
  title: string;
  image: IPostImageInput;
  author: string;
}

export type NodeBuilderInput =
  | { type: typeof NODE_TYPES.Author; data: IAuthorInput }
  | { type: typeof NODE_TYPES.Post; data: IPostInput };

interface IPluginOptionsKeys {
  endpoint: string;
}

/**
 * Gatsby expects the plugin options to be of type "PluginOptions" for gatsby-node APIs (e.g. sourceNodes)
 */
export interface IPluginOptionsInternal
  extends IPluginOptionsKeys,
    GatsbyDefaultPluginOptions {}

/**
 * These are the public TypeScript types for consumption in gatsby-config
 */
export interface IPluginOptions extends IPluginOptionsKeys, IPluginRefOptions {}
