// Parse URLs
const parseURL = (url: string): URL => new URL(url);

// Return the current URL host
export const getURLHost = (url: string): string => parseURL(url).host;

// Return the current URL hostname
export const getURLHostname = (url: string): string => parseURL(url).hostname;

// Return the current URL pathname
export const getURLPathname = (url: string): string =>
  url ? parseURL(url).pathname : `#`;

// Return the current URL protocol
export const getURLProtocol = (url: string): string => parseURL(url).protocol;

// Return the current URL search
export const getURLSearch = (url: string): string => parseURL(url).search;

// Return the current URL hash
export const getURLHash = (url: string): string => parseURL(url).hash;

// Return the current URL origin
export const getURLOrigin = (url: string): string => parseURL(url).origin;

// Return the current URL port
export const getURLPort = (url: string): string => parseURL(url).port;

// Return the current URL search params
export const getURLSearchParams = (url: string): URLSearchParams =>
  parseURL(url).searchParams;
