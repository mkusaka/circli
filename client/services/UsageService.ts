import type { get_usage_export_job_status } from "../models/get_usage_export_job_status.ts";
import type { usage_export_job } from "../models/usage_export_job.ts";
import type { CancelablePromise } from "../core/CancelablePromise.ts";
import { OpenAPI } from "../core/OpenAPI.ts";
import { request as __request } from "../core/request.ts";
export class UsageService {
  /**
   * Create a usage export
   * Submits a request to create a usage export for an organization.
   * @returns usage_export_job Usage export created successfully
   * @throws ApiError
   */
  public static createUsageExport({
    orgId,
    requestBody,
  }: {
    /**
     * An opaque identifier of an organization.
     */
    orgId: string;
    requestBody: {
      /**
       * The end date & time (inclusive) of the range from which data will be pulled. Must be no more than 31 days after `start`.
       */
      end: string;
      shared_org_ids?: Array<string>;
      /**
       * The start date & time (inclusive) of the range from which data will be pulled. Must be no more than one year ago.
       */
      start: string;
    };
  }): CancelablePromise<usage_export_job> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/organizations/{org_id}/usage_export_job",
      path: {
        org_id: orgId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Unexpected request body provided.`,
        401: `Credentials provided are invalid.`,
        404: `Entity not found.`,
        429: `API rate limits exceeded.`,
        500: `Internal server error.`,
      },
    });
  }
  /**
   * Get a usage export
   * Gets a usage export for an organization.
   * @returns get_usage_export_job_status Usage export fetched successfully
   * @throws ApiError
   */
  public static getUsageExport({
    orgId,
    usageExportJobId,
  }: {
    /**
     * An opaque identifier of an organization.
     */
    orgId: string;
    /**
     * An opaque identifier of a usage export job.
     */
    usageExportJobId: string;
  }): CancelablePromise<get_usage_export_job_status> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/organizations/{org_id}/usage_export_job/{usage_export_job_id}",
      path: {
        org_id: orgId,
        usage_export_job_id: usageExportJobId,
      },
      errors: {
        400: `Unexpected request body provided.`,
        401: `Credentials provided are invalid.`,
        404: `Entity not found.`,
        429: `API rate limits exceeded.`,
        500: `Internal server error.`,
      },
    });
  }
}
