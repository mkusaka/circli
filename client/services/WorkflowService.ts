import type { CancelablePromise } from "../core/CancelablePromise.ts";
import { OpenAPI } from "../core/OpenAPI.ts";
import { request as __request } from "../core/request.ts";
export class WorkflowService {
  /**
   * Get a workflow
   * Returns summary fields of a workflow by ID.
   * @returns any A workflow object.
   * @throws ApiError
   */
  public static getWorkflowById({
    id,
  }: {
    /**
     * The unique ID of the workflow.
     */
    id: string;
  }): CancelablePromise<{
    canceled_by?: string;
    /**
     * The date and time the workflow was created.
     */
    created_at: string;
    errored_by?: string;
    /**
     * The unique ID of the workflow.
     */
    id: string;
    /**
     * The name of the workflow.
     */
    name: string;
    /**
     * The ID of the pipeline this workflow belongs to.
     */
    pipeline_id: string;
    /**
     * The number of the pipeline this workflow belongs to.
     */
    pipeline_number: number;
    /**
     * The project-slug for the pipeline this workflow belongs to.
     */
    project_slug: string;
    started_by: string;
    /**
     * The current status of the workflow.
     */
    status:
      | "success"
      | "running"
      | "not_run"
      | "failed"
      | "error"
      | "failing"
      | "on_hold"
      | "canceled"
      | "unauthorized";
    /**
     * The date and time the workflow stopped.
     */
    stopped_at: string;
    /**
     * Tag used for the workflow
     */
    tag?: "setup";
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/workflow/{id}",
      path: {
        id: id,
      },
    });
  }
  /**
   * Approve a job
   * Approves a pending approval job in a workflow.
   * @returns any Error response.
   * @throws ApiError
   */
  public static approvePendingApprovalJobById({
    approvalRequestId,
    id,
  }: {
    /**
     * The ID of the job being approved.
     */
    approvalRequestId: string;
    /**
     * The unique ID of the workflow.
     */
    id: string;
  }): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/workflow/{id}/approve/{approval_request_id}",
      path: {
        approval_request_id: approvalRequestId,
        id: id,
      },
    });
  }
  /**
   * Cancel a workflow
   * Cancels a running workflow.
   * @returns any Error response.
   * @throws ApiError
   */
  public static cancelWorkflow({
    id,
  }: {
    /**
     * The unique ID of the workflow.
     */
    id: string;
  }): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/workflow/{id}/cancel",
      path: {
        id: id,
      },
    });
  }
  /**
   * Get a workflow's jobs
   * Returns a sequence of jobs for a workflow.
   * @returns any A paginated sequence of jobs.
   * @throws ApiError
   */
  public static listWorkflowJobs({
    id,
  }: {
    /**
     * The unique ID of the workflow.
     */
    id: string;
  }): CancelablePromise<{
    items: Array<{
      /**
       * The unique ID of the job.
       */
      approval_request_id?: string;
      /**
       * The unique ID of the user.
       */
      approved_by?: string;
      /**
       * The unique ID of the user.
       */
      canceled_by?: string;
      /**
       * A sequence of the unique job IDs for the jobs that this job depends upon in the workflow.
       */
      dependencies: Array<string>;
      /**
       * The unique ID of the job.
       */
      id: string;
      /**
       * The number of the job.
       */
      job_number?: number;
      /**
       * The name of the job.
       */
      name: string;
      /**
       * The project-slug for the job.
       */
      project_slug: string;
      /**
       * A sequence of the unique jobs and required statuses that this job depends upon in the workflow.
       */
      requires?: Record<string, Array<"success" | "failed" | "canceled">>;
      /**
       * The date and time the job started.
       */
      started_at: string;
      /**
       * The current status of the job.
       */
      status:
        | "success"
        | "running"
        | "not_run"
        | "failed"
        | "retried"
        | "queued"
        | "not_running"
        | "infrastructure_fail"
        | "timedout"
        | "on_hold"
        | "terminated-unknown"
        | "blocked"
        | "canceled"
        | "unauthorized";
      /**
       * The time when the job stopped.
       */
      stopped_at?: string;
      /**
       * The type of job.
       */
      type: "build" | "approval";
    }>;
    /**
     * A token to pass as a `page-token` query parameter to return the next page of results.
     */
    next_page_token: string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/workflow/{id}/job",
      path: {
        id: id,
      },
    });
  }
  /**
   * Rerun a workflow
   * Reruns a workflow.
   * @returns any Error response.
   * @throws ApiError
   */
  public static rerunWorkflow({
    id,
    requestBody,
  }: {
    /**
     * The unique ID of the workflow.
     */
    id: string;
    requestBody?: {
      /**
       * Whether to enable SSH access for the triggering user on the newly-rerun job. Requires the jobs parameter to be used and so is mutually exclusive with the from_failed parameter.
       */
      enable_ssh?: boolean;
      /**
       * Whether to rerun the workflow from the failed job. Mutually exclusive with the jobs parameter.
       */
      from_failed?: boolean;
      /**
       * A list of job IDs to rerun.
       */
      jobs?: Array<string>;
      /**
       * Completes rerun using sparse trees logic, an optimization for workflows that have disconnected subgraphs. Requires jobs parameter and so is mutually exclusive with the from_failed parameter.
       */
      sparse_tree?: boolean;
    };
  }): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/workflow/{id}/rerun",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
