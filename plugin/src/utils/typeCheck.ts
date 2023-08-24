/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash";

// Check if the value is not null or undefined
export const isNotNullOrUndefined = <T>(e: T | null | undefined): e is T =>
  !_.isNull(e) && !_.isUndefined(e);

// Check if the given value is a object and not null or undefined
export const isObjectType = (e: any): e is Record<string, any> =>
  isNotNullOrUndefined(e) && _.isPlainObject(e);

// Check if the given value is a array and not null or undefined
export const isArrayType = (e: any): e is Array<any> =>
  isNotNullOrUndefined(e) && _.isArray(e);

// Check if the given value is a string and not null or undefined
export const isStringType = (e: any): e is string =>
  isNotNullOrUndefined(e) && _.isString(e);

// Check if the given value is a number and not null or undefined
export const isNumberType = (e: any): e is number =>
  isNotNullOrUndefined(e) && _.isFinite(e);

// Check if the given value is a boolean and not null or undefined
export const isBooleanType = (e: any): e is boolean =>
  isNotNullOrUndefined(e) && _.isBoolean(e);

// Check if the given valid value is empty
export const isEmpty = (e: any): boolean => {
  if (isStringType(e) || isArrayType(e) || isObjectType(e)) {
    return _.size(e) === 0;
  } else if (isNumberType(e)) {
    return e === 0;
  } else {
    return true;
  }
};
