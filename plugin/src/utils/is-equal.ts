/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash";
import { isEmpty } from "./type-check";

// Check if the given parameters are equal
export const isEqual = <T extends Record<string, any> | Array<any>>(
  e: T,
  f: T
): boolean => !isEmpty(e) && !isEmpty(f) && _.isEqual(e, f);
