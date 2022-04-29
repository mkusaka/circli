import { ValidationError } from "./deps.ts";

export function isBooleanOrThrow(val: any, key: string): val is boolean {
  if (typeof val !== "boolean") {
    throw new ValidationError(
      "val required to be a boolean, but got no boolean value"
    );
  }
  return true;
}

export function isStringOrThrow(val: any, key: string): val is string {
  if (typeof val !== "string") {
    throw new ValidationError(
      "val required to be a string, but got no these value"
    );
  }
  return true;
}

export function isStringOrUndefinedOrThrow(
  val: any,
  key: string
): val is string | undefined {
  if (typeof val !== "string" && typeof val !== "undefined") {
    throw new ValidationError(
      "val required to be a string or undefined, but got no these value"
    );
  }
  return true;
}
