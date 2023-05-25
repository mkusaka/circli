/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Violation } from "./Violation.ts";
export type Decision = {
  enabled_rules?: Array<string>;
  hard_failures?: Array<Violation>;
  reason?: string;
  soft_failures?: Array<Violation>;
  status: string;
};
