/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash";

/**
 * @description Perform debounce operation
 * @param func Function to debounce
 * @param delay Debounce delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: Array<any>) => any>(
  func: T,
  delay: number
): _.DebouncedFunc<T> => _.debounce(func, delay);
