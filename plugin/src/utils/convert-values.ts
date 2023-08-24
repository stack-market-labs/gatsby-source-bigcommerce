/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash";
import { isEmpty } from "./type-check";

// Convert string to lowercase
export const convertStringToLowercase = (e: string): string =>
  !isEmpty(e) ? _.toLower(e) : e;

// Convert string to uppercase
export const convertStringToUppercase = (e: string): string =>
  !isEmpty(e) ? _.toUpper(e) : e;

// Convert string to title case
export const convertStringToTitleCase = (e: string): string =>
  !isEmpty(e) ? _.startCase(_.camelCase(e)) : e;

// Convert string to camel case
export const convertStringToCamelCase = (e: string): string =>
  !isEmpty(e) ? _.camelCase(e) : e;

// Convert string to snake case
export const convertStringToSnakeCase = (e: string): string =>
  !isEmpty(e) ? _.snakeCase(e) : e;

// Convert string to kebab case
export const convertStringToKebabCase = (e: string): string =>
  !isEmpty(e) ? _.kebabCase(e) : e;

// Convert string to constant case
export const convertStringToConstantCase = (e: string): string =>
  !isEmpty(e) ? _.snakeCase(e).toUpperCase() : e;

// Convert string to sentence case
export const convertStringToSentenceCase = (e: string): string =>
  !isEmpty(e) ? _.upperFirst(_.toLower(e)) : e;

// Convert string to number
export const convertStringToNumber = (e: string): number =>
  !isEmpty(e) ? _.toNumber(e) : NaN;

// Convert string to boolean
export const convertStringToBoolean = (e: string): boolean =>
  !isEmpty(e) ? e === `true` : false;

// Convert string to array
export const convertStringToArray = (e: string): Array<any> =>
  !isEmpty(e) ? _.toArray(e) : [];

// Convert string to object
export const convertStringToObject = (e: string): Record<string, any> =>
  !isEmpty(e) ? JSON.parse(e) : {};

// Convert object to string
export const convertObjectToString = (e: Record<string, any>): string =>
  !isEmpty(e) ? JSON.stringify(e) : ``;

// Convert array to string
export const convertArrayToString = (e: Array<any>): string =>
  !isEmpty(e) ? _.join(e, ` `) : ``;

// Convert number to string
export const convertNumberToString = (e: number): string =>
  !isEmpty(e) ? _.toString(e) : ``;
