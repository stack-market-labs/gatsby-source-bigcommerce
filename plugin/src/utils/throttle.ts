/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash";

// Perform throttle operation
export const throttle = <T extends (...args: Array<any>) => any>(
  func: T,
  delay: number
): _.DebouncedFunc<T> => _.throttle(func, delay);
