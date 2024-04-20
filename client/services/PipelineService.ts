import type { CancelablePromise } from "../core/CancelablePromise.ts";
import { OpenAPI } from "../core/OpenAPI.ts";
import { request as __request } from "../core/request.ts";
export class PipelineService {
  /**
   * Get a list of pipelines
   * Returns all pipelines for the most recently built projects (max 250) you follow in an organization.
   * @returns any A sequence of pipelines.
   * @throws ApiError
   */
  public static listPipelines({
    orgSlug,
    pageToken,
    mine,
  }: {
    /**
     * Org slug in the form `vcs-slug/org-name`. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug` and replace the `org-name` with the organization ID (found in Organization Settings).
     */
    orgSlug?: string;
    /**
     * A token to retrieve the next page of results.
     */
    pageToken?: string;
    /**
     * Only include entries created by your user.
     */
    mine?: boolean;
  }): CancelablePromise<{
    items: Array<{
      /**
       * The date and time the pipeline was created.
       */
      created_at: string;
      /**
       * A sequence of errors that have occurred within the pipeline.
       */
      errors: Array<{
        /**
         * A human-readable error message.
         */
        message: string;
        /**
         * The type of error.
         */
        type:
          | "config"
          | "config-fetch"
          | "timeout"
          | "permission"
          | "other"
          | "plan";
      }>;
      /**
       * The unique ID of the pipeline.
       */
      id: string;
      /**
       * The number of the pipeline.
       */
      number: number;
      /**
       * The project-slug for the pipeline.
       */
      project_slug: string;
      /**
       * The current state of the pipeline.
       */
      state: "created" | "errored" | "setup-pending" | "setup" | "pending";
      /**
       * A summary of the trigger.
       */
      trigger: {
        /**
         * The user who triggered the Pipeline.
         */
        actor: {
          /**
           * URL to the user's avatar on the VCS
           */
          avatar_url: string;
          /**
           * The login information for the user on the VCS.
           */
          login: string;
        };
        /**
         * The date and time the trigger was received.
         */
        received_at: string;
        /**
         * The type of trigger.
         */
        type: "scheduled_pipeline" | "explicit" | "api" | "webhook";
      };
      trigger_parameters?: Record<string, string | number | boolean>;
      /**
       * The date and time the pipeline was last updated.
       */
      updated_at?: string;
      /**
       * VCS information for the pipeline.
       */
      vcs?: {
        /**
         * The branch where the pipeline ran. The HEAD commit on this branch was used for the pipeline. Note that `branch` and `tag` are mutually exclusive. To trigger a pipeline for a PR by number use `pull/<number>/head` for the PR ref or `pull/<number>/merge` for the merge ref (GitHub only).
         */
        branch?: string;
        /**
         * The latest commit in the pipeline.
         */
        commit?: {
          /**
           * The body of the commit message.
           */
          body: string;
          /**
           * The subject of the commit message.
           */
          subject: string;
        };
        /**
         * URL for the repository where the trigger originated. For fork-PR pipelines, this is the URL to the fork. For other pipelines the `origin_` and `target_repository_url`s will be the same.
         */
        origin_repository_url: string;
        /**
         * Name of the VCS provider (e.g. GitHub, Bitbucket).
         */
        provider_name: string;
        /**
         * The code review id.
         */
        review_id?: string;
        /**
         * The code review URL.
         */
        review_url?: string;
        /**
         * The code revision the pipeline ran.
         */
        revision: string;
        /**
         * The tag used by the pipeline. The commit that this tag points to was used for the pipeline. Note that `branch` and `tag` are mutually exclusive.
         */
        tag?: string;
        /**
         * URL for the repository the trigger targets (i.e. the repository where the PR will be merged). For fork-PR pipelines, this is the URL to the parent repo. For other pipelines, the `origin_` and `target_repository_url`s will be the same.
         */
        target_repository_url: string;
      };
    }>;
    /**
     * A token to pass as a `page-token` query parameter to return the next page of results.
     */
    next_page_token: string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/pipeline",
      query: {
        "org-slug": orgSlug,
        "page-token": pageToken,
        mine: mine,
      },
    });
  }
  /**
   * Continue a pipeline
   * Continue a pipeline from the setup phase. For information on using pipeline parameters with dynamic configuration, see the [Pipeline values and parameters](https://circleci.com/docs/pipeline-variables/#pipeline-parameters-and-dynamic-configuration) docs.
   * @returns any A confirmation message.
   * @throws ApiError
   */
  public static continuePipeline({
    requestBody,
  }: {
    requestBody?: {
      /**
       * A configuration string for the pipeline.
       */
      configuration: string;
      /**
       * A pipeline continuation key.
       */
      "continuation-key": string;
      /**
       * An object containing pipeline parameters and their values. Pipeline parameters have the following size limits: 100 max entries, 128 maximum key length, 512 maximum value length.
       */
      parameters?: Record<string, number | string | boolean>;
    };
  }): CancelablePromise<{
    /**
     * A human-readable message
     */
    message: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/pipeline/continue",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Get a pipeline by ID
   * Returns a pipeline by the pipeline ID.
   * @returns any A pipeline object.
   * @throws ApiError
   */
  public static getPipelineById({
    pipelineId,
  }: {
    /**
     * The unique ID of the pipeline.
     */
    pipelineId: string;
  }): CancelablePromise<{
    /**
     * The date and time the pipeline was created.
     */
    created_at: string;
    /**
     * A sequence of errors that have occurred within the pipeline.
     */
    errors: Array<{
      /**
       * A human-readable error message.
       */
      message: string;
      /**
       * The type of error.
       */
      type:
        | "config"
        | "config-fetch"
        | "timeout"
        | "permission"
        | "other"
        | "plan";
    }>;
    /**
     * The unique ID of the pipeline.
     */
    id: string;
    /**
     * The number of the pipeline.
     */
    number: number;
    /**
     * The project-slug for the pipeline.
     */
    project_slug: string;
    /**
     * The current state of the pipeline.
     */
    state: "created" | "errored" | "setup-pending" | "setup" | "pending";
    /**
     * A summary of the trigger.
     */
    trigger: {
      /**
       * The user who triggered the Pipeline.
       */
      actor: {
        /**
         * URL to the user's avatar on the VCS
         */
        avatar_url: string;
        /**
         * The login information for the user on the VCS.
         */
        login: string;
      };
      /**
       * The date and time the trigger was received.
       */
      received_at: string;
      /**
       * The type of trigger.
       */
      type: "scheduled_pipeline" | "explicit" | "api" | "webhook";
    };
    trigger_parameters?: Record<string, string | number | boolean>;
    /**
     * The date and time the pipeline was last updated.
     */
    updated_at?: string;
    /**
     * VCS information for the pipeline.
     */
    vcs?: {
      /**
       * The branch where the pipeline ran. The HEAD commit on this branch was used for the pipeline. Note that `branch` and `tag` are mutually exclusive. To trigger a pipeline for a PR by number use `pull/<number>/head` for the PR ref or `pull/<number>/merge` for the merge ref (GitHub only).
       */
      branch?: string;
      /**
       * The latest commit in the pipeline.
       */
      commit?: {
        /**
         * The body of the commit message.
         */
        body: string;
        /**
         * The subject of the commit message.
         */
        subject: string;
      };
      /**
       * URL for the repository where the trigger originated. For fork-PR pipelines, this is the URL to the fork. For other pipelines the `origin_` and `target_repository_url`s will be the same.
       */
      origin_repository_url: string;
      /**
       * Name of the VCS provider (e.g. GitHub, Bitbucket).
       */
      provider_name: string;
      /**
       * The code review id.
       */
      review_id?: string;
      /**
       * The code review URL.
       */
      review_url?: string;
      /**
       * The code revision the pipeline ran.
       */
      revision: string;
      /**
       * The tag used by the pipeline. The commit that this tag points to was used for the pipeline. Note that `branch` and `tag` are mutually exclusive.
       */
      tag?: string;
      /**
       * URL for the repository the trigger targets (i.e. the repository where the PR will be merged). For fork-PR pipelines, this is the URL to the parent repo. For other pipelines, the `origin_` and `target_repository_url`s will be the same.
       */
      target_repository_url: string;
    };
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/pipeline/{pipeline-id}",
      path: {
        "pipeline-id": pipelineId,
      },
    });
  }
  /**
   * Get a pipeline's configuration
   * Returns a pipeline's configuration by ID.
   * @returns any The configuration strings for the pipeline.
   * @throws ApiError
   */
  public static getPipelineConfigById({
    pipelineId,
  }: {
    /**
     * The unique ID of the pipeline.
     */
    pipelineId: string;
  }): CancelablePromise<{
    /**
     * The compiled configuration for the pipeline, after all orb expansion has been performed. If there were errors processing the pipeline's configuration, then this field may be empty.
     */
    compiled: string;
    /**
     * The compiled setup configuration for the pipeline, after all orb expansion has been performed. If there were errors processing the pipeline's setup workflows, then this field may be empty.
     */
    "compiled-setup-config"?: string;
    /**
     * The setup configuration for the pipeline used for Setup Workflows. If there were errors processing the pipeline's configuration or if setup workflows are not enabled, then this field should not exist
     */
    "setup-config"?: string;
    /**
     * The source configuration for the pipeline, before any config compilation has been performed. If there is no config, then this field will be empty.
     */
    source: string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/pipeline/{pipeline-id}/config",
      path: {
        "pipeline-id": pipelineId,
      },
    });
  }
  /**
   * Get a pipeline's workflows
   * Returns a paginated list of workflows by pipeline ID.
   * @returns any A paginated list of workflow objects.
   * @throws ApiError
   */
  public static listWorkflowsByPipelineId({
    pipelineId,
    pageToken,
  }: {
    /**
     * The unique ID of the pipeline.
     */
    pipelineId: string;
    /**
     * A token to retrieve the next page of results.
     */
    pageToken?: string;
  }): CancelablePromise<{
    /**
     * A list of workflows.
     */
    items: Array<{
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
    }>;
    /**
     * A token to pass as a `page-token` query parameter to return the next page of results.
     */
    next_page_token: string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/pipeline/{pipeline-id}/workflow",
      path: {
        "pipeline-id": pipelineId,
      },
      query: {
        "page-token": pageToken,
      },
    });
  }
  /**
   * Get all pipelines
   * Returns all pipelines for this project.
   * @returns any A sequence of pipelines.
   * @throws ApiError
   */
  public static listPipelinesForProject({
    projectSlug,
    branch,
    pageToken,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    projectSlug: string;
    /**
     * The name of a vcs branch.
     */
    branch?: string;
    /**
     * A token to retrieve the next page of results.
     */
    pageToken?: string;
  }): CancelablePromise<{
    items: Array<{
      /**
       * The date and time the pipeline was created.
       */
      created_at: string;
      /**
       * A sequence of errors that have occurred within the pipeline.
       */
      errors: Array<{
        /**
         * A human-readable error message.
         */
        message: string;
        /**
         * The type of error.
         */
        type:
          | "config"
          | "config-fetch"
          | "timeout"
          | "permission"
          | "other"
          | "plan";
      }>;
      /**
       * The unique ID of the pipeline.
       */
      id: string;
      /**
       * The number of the pipeline.
       */
      number: number;
      /**
       * The project-slug for the pipeline.
       */
      project_slug: string;
      /**
       * The current state of the pipeline.
       */
      state: "created" | "errored" | "setup-pending" | "setup" | "pending";
      /**
       * A summary of the trigger.
       */
      trigger: {
        /**
         * The user who triggered the Pipeline.
         */
        actor: {
          /**
           * URL to the user's avatar on the VCS
           */
          avatar_url: string;
          /**
           * The login information for the user on the VCS.
           */
          login: string;
        };
        /**
         * The date and time the trigger was received.
         */
        received_at: string;
        /**
         * The type of trigger.
         */
        type: "scheduled_pipeline" | "explicit" | "api" | "webhook";
      };
      trigger_parameters?: Record<string, string | number | boolean>;
      /**
       * The date and time the pipeline was last updated.
       */
      updated_at?: string;
      /**
       * VCS information for the pipeline.
       */
      vcs?: {
        /**
         * The branch where the pipeline ran. The HEAD commit on this branch was used for the pipeline. Note that `branch` and `tag` are mutually exclusive. To trigger a pipeline for a PR by number use `pull/<number>/head` for the PR ref or `pull/<number>/merge` for the merge ref (GitHub only).
         */
        branch?: string;
        /**
         * The latest commit in the pipeline.
         */
        commit?: {
          /**
           * The body of the commit message.
           */
          body: string;
          /**
           * The subject of the commit message.
           */
          subject: string;
        };
        /**
         * URL for the repository where the trigger originated. For fork-PR pipelines, this is the URL to the fork. For other pipelines the `origin_` and `target_repository_url`s will be the same.
         */
        origin_repository_url: string;
        /**
         * Name of the VCS provider (e.g. GitHub, Bitbucket).
         */
        provider_name: string;
        /**
         * The code review id.
         */
        review_id?: string;
        /**
         * The code review URL.
         */
        review_url?: string;
        /**
         * The code revision the pipeline ran.
         */
        revision: string;
        /**
         * The tag used by the pipeline. The commit that this tag points to was used for the pipeline. Note that `branch` and `tag` are mutually exclusive.
         */
        tag?: string;
        /**
         * URL for the repository the trigger targets (i.e. the repository where the PR will be merged). For fork-PR pipelines, this is the URL to the parent repo. For other pipelines, the `origin_` and `target_repository_url`s will be the same.
         */
        target_repository_url: string;
      };
    }>;
    /**
     * A token to pass as a `page-token` query parameter to return the next page of results.
     */
    next_page_token: string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/project/{project-slug}/pipeline",
      path: {
        "project-slug": projectSlug,
      },
      query: {
        branch: branch,
        "page-token": pageToken,
      },
    });
  }
  /**
   * Trigger a new pipeline
   * Not yet available to projects that use GitLab or GitHub App. Triggers a new pipeline on the project.
   * @returns any Error response.
   * @throws ApiError
   */
  public static triggerPipeline({
    projectSlug,
    requestBody,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    projectSlug: string;
    requestBody?: {
      /**
       * The branch where the pipeline ran. The HEAD commit on this branch was used for the pipeline. Note that `branch` and `tag` are mutually exclusive. To trigger a pipeline for a PR by number use `pull/<number>/head` for the PR ref or `pull/<number>/merge` for the merge ref (GitHub only).
       */
      branch?: string;
      /**
       * An object containing pipeline parameters and their values. Pipeline parameters have the following size limits: 100 max entries, 128 maximum key length, 512 maximum value length.
       */
      parameters?: Record<string, number | string | boolean>;
      /**
       * The tag used by the pipeline. The commit that this tag points to was used for the pipeline. Note that `branch` and `tag` are mutually exclusive.
       */
      tag?: string;
    };
  }): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/project/{project-slug}/pipeline",
      path: {
        "project-slug": projectSlug,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Get your pipelines
   * Returns a sequence of all pipelines for this project triggered by the user.
   * @returns any A sequence of pipelines.
   * @throws ApiError
   */
  public static listMyPipelines({
    projectSlug,
    pageToken,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    projectSlug: string;
    /**
     * A token to retrieve the next page of results.
     */
    pageToken?: string;
  }): CancelablePromise<{
    items: Array<{
      /**
       * The date and time the pipeline was created.
       */
      created_at: string;
      /**
       * A sequence of errors that have occurred within the pipeline.
       */
      errors: Array<{
        /**
         * A human-readable error message.
         */
        message: string;
        /**
         * The type of error.
         */
        type:
          | "config"
          | "config-fetch"
          | "timeout"
          | "permission"
          | "other"
          | "plan";
      }>;
      /**
       * The unique ID of the pipeline.
       */
      id: string;
      /**
       * The number of the pipeline.
       */
      number: number;
      /**
       * The project-slug for the pipeline.
       */
      project_slug: string;
      /**
       * The current state of the pipeline.
       */
      state: "created" | "errored" | "setup-pending" | "setup" | "pending";
      /**
       * A summary of the trigger.
       */
      trigger: {
        /**
         * The user who triggered the Pipeline.
         */
        actor: {
          /**
           * URL to the user's avatar on the VCS
           */
          avatar_url: string;
          /**
           * The login information for the user on the VCS.
           */
          login: string;
        };
        /**
         * The date and time the trigger was received.
         */
        received_at: string;
        /**
         * The type of trigger.
         */
        type: "scheduled_pipeline" | "explicit" | "api" | "webhook";
      };
      trigger_parameters?: Record<string, string | number | boolean>;
      /**
       * The date and time the pipeline was last updated.
       */
      updated_at?: string;
      /**
       * VCS information for the pipeline.
       */
      vcs?: {
        /**
         * The branch where the pipeline ran. The HEAD commit on this branch was used for the pipeline. Note that `branch` and `tag` are mutually exclusive. To trigger a pipeline for a PR by number use `pull/<number>/head` for the PR ref or `pull/<number>/merge` for the merge ref (GitHub only).
         */
        branch?: string;
        /**
         * The latest commit in the pipeline.
         */
        commit?: {
          /**
           * The body of the commit message.
           */
          body: string;
          /**
           * The subject of the commit message.
           */
          subject: string;
        };
        /**
         * URL for the repository where the trigger originated. For fork-PR pipelines, this is the URL to the fork. For other pipelines the `origin_` and `target_repository_url`s will be the same.
         */
        origin_repository_url: string;
        /**
         * Name of the VCS provider (e.g. GitHub, Bitbucket).
         */
        provider_name: string;
        /**
         * The code review id.
         */
        review_id?: string;
        /**
         * The code review URL.
         */
        review_url?: string;
        /**
         * The code revision the pipeline ran.
         */
        revision: string;
        /**
         * The tag used by the pipeline. The commit that this tag points to was used for the pipeline. Note that `branch` and `tag` are mutually exclusive.
         */
        tag?: string;
        /**
         * URL for the repository the trigger targets (i.e. the repository where the PR will be merged). For fork-PR pipelines, this is the URL to the parent repo. For other pipelines, the `origin_` and `target_repository_url`s will be the same.
         */
        target_repository_url: string;
      };
    }>;
    /**
     * A token to pass as a `page-token` query parameter to return the next page of results.
     */
    next_page_token: string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/project/{project-slug}/pipeline/mine",
      path: {
        "project-slug": projectSlug,
      },
      query: {
        "page-token": pageToken,
      },
    });
  }
  /**
   * Get a pipeline by pipeline number
   * Returns a pipeline by the pipeline number.
   * @returns any A pipeline object.
   * @throws ApiError
   */
  public static getPipelineByNumber({
    projectSlug,
    pipelineNumber,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    projectSlug: string;
    /**
     * The number of the pipeline.
     */
    pipelineNumber: any;
  }): CancelablePromise<{
    /**
     * The date and time the pipeline was created.
     */
    created_at: string;
    /**
     * A sequence of errors that have occurred within the pipeline.
     */
    errors: Array<{
      /**
       * A human-readable error message.
       */
      message: string;
      /**
       * The type of error.
       */
      type:
        | "config"
        | "config-fetch"
        | "timeout"
        | "permission"
        | "other"
        | "plan";
    }>;
    /**
     * The unique ID of the pipeline.
     */
    id: string;
    /**
     * The number of the pipeline.
     */
    number: number;
    /**
     * The project-slug for the pipeline.
     */
    project_slug: string;
    /**
     * The current state of the pipeline.
     */
    state: "created" | "errored" | "setup-pending" | "setup" | "pending";
    /**
     * A summary of the trigger.
     */
    trigger: {
      /**
       * The user who triggered the Pipeline.
       */
      actor: {
        /**
         * URL to the user's avatar on the VCS
         */
        avatar_url: string;
        /**
         * The login information for the user on the VCS.
         */
        login: string;
      };
      /**
       * The date and time the trigger was received.
       */
      received_at: string;
      /**
       * The type of trigger.
       */
      type: "scheduled_pipeline" | "explicit" | "api" | "webhook";
    };
    trigger_parameters?: Record<string, string | number | boolean>;
    /**
     * The date and time the pipeline was last updated.
     */
    updated_at?: string;
    /**
     * VCS information for the pipeline.
     */
    vcs?: {
      /**
       * The branch where the pipeline ran. The HEAD commit on this branch was used for the pipeline. Note that `branch` and `tag` are mutually exclusive. To trigger a pipeline for a PR by number use `pull/<number>/head` for the PR ref or `pull/<number>/merge` for the merge ref (GitHub only).
       */
      branch?: string;
      /**
       * The latest commit in the pipeline.
       */
      commit?: {
        /**
         * The body of the commit message.
         */
        body: string;
        /**
         * The subject of the commit message.
         */
        subject: string;
      };
      /**
       * URL for the repository where the trigger originated. For fork-PR pipelines, this is the URL to the fork. For other pipelines the `origin_` and `target_repository_url`s will be the same.
       */
      origin_repository_url: string;
      /**
       * Name of the VCS provider (e.g. GitHub, Bitbucket).
       */
      provider_name: string;
      /**
       * The code review id.
       */
      review_id?: string;
      /**
       * The code review URL.
       */
      review_url?: string;
      /**
       * The code revision the pipeline ran.
       */
      revision: string;
      /**
       * The tag used by the pipeline. The commit that this tag points to was used for the pipeline. Note that `branch` and `tag` are mutually exclusive.
       */
      tag?: string;
      /**
       * URL for the repository the trigger targets (i.e. the repository where the PR will be merged). For fork-PR pipelines, this is the URL to the parent repo. For other pipelines, the `origin_` and `target_repository_url`s will be the same.
       */
      target_repository_url: string;
    };
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/project/{project-slug}/pipeline/{pipeline-number}",
      path: {
        "project-slug": projectSlug,
        "pipeline-number": pipelineNumber,
      },
    });
  }
}
