/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Decision } from "./Decision.ts";
export type DecisionLog = {
  created_at?: string;
  decision?: Decision;
  id?: string;
  metadata?: {
    build_number?: number;
    project_id?: string;
    ssh_rerun?: boolean;
    vcs?: {
      branch?: string;
      origin_repository_url?: string;
      release_tag?: string;
      target_repository_url?: string;
    };
  };
  /**
   * policy-name-to-hash-map
   */
  policies?: Record<string, string>;
  time_taken_ms?: number;
};
