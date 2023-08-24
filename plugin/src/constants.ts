export const NODE_TYPES = {
  Post: "Post",
  Author: "Author",
  Asset: "Asset",
} as const;

export const CACHE_KEYS = {
  Timestamp: "timestamp",
} as const;

/**
 * The IDs for your errors can be arbitrary (since they are scoped to your plugin), but it's good practice to have a system for them.
 * For example, you could start all third-party API errors with 1000x, all transformation errors with 2000x, etc.
 */
export const ERROR_CODES = {
  GraphQLSourcing: "10000",
} as const;

// Environment
export const IS_DEV = process.env.NODE_ENV === "development";
export const IS_PROD = process.env.NODE_ENV === "production";

// App
export const APP_NAME = "@stackmarketlabs/gatsby-source-bigcommerce";

// Request
export const REQUEST_BIGCOMMERCE_API_URL = "https://api.bigcommerce.com";
export const REQUEST_ACCEPT_HEADER = "application/json";
export const REQUEST_TIMEOUT = 60000;
export const REQUEST_THROTTLE_INTERVAL = 500;
export const REQUEST_DEBOUNCE_INTERVAL = 500;
export const REQUEST_CONCURRENCY = 100;
export const REQUEST_PENDING_COUNT = 0;
export const REQUEST_MAX_COUNT = 0;

// Headers
export const ACCESS_CONTROL_ALLOW_HEADERS = "Content-Type,Accept";
export const ACCESS_CONTROL_ALLOW_CREDENTIALS = true;
export const CORS_ORIGIN = "*";

// Hooks
export const BIGCOMMERCE_WEBHOOK_API_ENDPOINT = "/v3/hooks";

// Auth
export const AUTH_HEADERS = {} as const;
