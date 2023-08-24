/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash";

// Perform debounce operation
export const debounce = <T extends (...args: Array<any>) => any>(
  func: T,
  delay: number
): _.DebouncedFunc<T> => _.debounce(func, delay);
