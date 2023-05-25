/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JSONDuration } from "./JSONDuration.ts";
export type ClaimResponse = {
  audience?: Array<string>;
  audience_updated_at?: string;
  org_id: string;
  project_id?: string;
  ttl?: JSONDuration;
  ttl_updated_at?: string;
};
