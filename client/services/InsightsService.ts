import type { CancelablePromise } from "../core/CancelablePromise.ts";
import { OpenAPI } from "../core/OpenAPI.ts";
import { request as __request } from "../core/request.ts";
export class InsightsService {
  /**
   * Get summary metrics and trends for a project across it's workflows and branches
   * Get summary metrics and trends for a project at workflow and branch level.
   * Workflow runs going back at most 90 days are included in the aggregation window.
   * Trends are only supported upto last 30 days.
   * Please note that Insights is not a financial reporting tool and should not be used for precise credit reporting.  Credit reporting from Insights does not use the same source of truth as the billing information that is found in the Plan Overview page in the CircleCI UI, nor does the underlying data have the same data accuracy guarantees as the billing information in the CircleCI UI.  This may lead to discrepancies between credits reported from Insights and the billing information in the Plan Overview page of the CircleCI UI.  For precise credit reporting, always use the Plan Overview page in the CircleCI UI.
   * @returns any Aggregated summary metrics and trends by workflow and branches
   * @throws ApiError
   */
  public static getProjectWorkflowsPageData({
    projectSlug,
    reportingWindow,
    branches,
    workflowNames,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    projectSlug: string;
    /**
     * The time window used to calculate summary metrics. If not provided, defaults to last-90-days
     */
    reportingWindow?:
      | "last-7-days"
      | "last-90-days"
      | "last-24-hours"
      | "last-30-days"
      | "last-60-days";
    /**
     * The names of VCS branches to include in branch-level workflow metrics.
     */
    branches?: any;
    /**
     * The names of workflows to include in workflow-level metrics.
     */
    workflowNames?: any;
  }): CancelablePromise<{
    /**
     * A list of all the branches for a given project.
     */
    all_branches?: Array<string>;
    /**
     * A list of all the workflows for a given project.
     */
    all_workflows?: Array<string>;
    /**
     * The unique ID of the organization
     */
    org_id?: any;
    /**
     * Metrics and trends data aggregated for a given project.
     */
    project_data?: {
      /**
       * Metrics aggregated across all workflows and branches for a project.
       */
      metrics: {
        success_rate: number;
        /**
         * The average number of runs per day.
         */
        throughput: number;
        /**
         * The total credits consumed over the current timeseries interval.
         */
        total_credits_used: number;
        /**
         * Total duration, in seconds.
         */
        total_duration_secs: number;
        /**
         * The total number of runs, including runs that are still on-hold or running.
         */
        total_runs: number;
      };
      /**
       * Metric trends aggregated across all workflows and branches for a project.
       */
      trends: {
        /**
         * The trend value for the success rate.
         */
        success_rate: number;
        /**
         * Trend value for the average number of runs per day.
         */
        throughput: number;
        /**
         * The trend value for total credits consumed.
         */
        total_credits_used: number;
        /**
         * Trend value for total duration.
         */
        total_duration_secs: number;
        /**
         * The trend value for total number of runs.
         */
        total_runs: number;
      };
    };
    /**
     * The unique ID of the project
     */
    project_id?: any;
    /**
     * A list of metrics and trends data for branches for a given project.
     */
    project_workflow_branch_data?: Array<{
      /**
       * The VCS branch of a workflow's trigger.
       */
      branch: string;
      /**
       * Metrics aggregated across a workflow or branchfor a project.
       */
      metrics: {
        /**
         * The 95th percentile duration among a group of workflow runs.
         */
        p95_duration_secs: number;
        success_rate: number;
        /**
         * The total credits consumed over the current timeseries interval.
         */
        total_credits_used: number;
        /**
         * The total number of runs, including runs that are still on-hold or running.
         */
        total_runs: number;
      };
      /**
       * Trends aggregated across a workflow or branch for a project.
       */
      trends: {
        /**
         * The 95th percentile duration among a group of workflow runs.
         */
        p95_duration_secs: number;
        /**
         * The trend value for the success rate.
         */
        success_rate: number;
        /**
         * The trend value for total credits consumed.
         */
        total_credits_used: number;
        /**
         * The trend value for total number of runs.
         */
        total_runs: number;
      };
      /**
       * The name of the workflow.
       */
      workflow_name: string;
    }>;
    /**
     * A list of metrics and trends data for workflows for a given project.
     */
    project_workflow_data?: Array<{
      /**
       * Metrics aggregated across a workflow or branchfor a project.
       */
      metrics: {
        /**
         * The 95th percentile duration among a group of workflow runs.
         */
        p95_duration_secs: number;
        success_rate: number;
        /**
         * The total credits consumed over the current timeseries interval.
         */
        total_credits_used: number;
        /**
         * The total number of runs, including runs that are still on-hold or running.
         */
        total_runs: number;
      };
      /**
       * Trends aggregated across a workflow or branch for a project.
       */
      trends: {
        /**
         * The 95th percentile duration among a group of workflow runs.
         */
        p95_duration_secs: number;
        /**
         * The trend value for the success rate.
         */
        success_rate: number;
        /**
         * The trend value for total credits consumed.
         */
        total_credits_used: number;
        /**
         * The trend value for total number of runs.
         */
        total_runs: number;
      };
      /**
       * The name of the workflow.
       */
      workflow_name: string;
    }>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/insights/pages/{project-slug}/summary",
      path: {
        "project-slug": projectSlug,
      },
      query: {
        "reporting-window": reportingWindow,
        branches: branches,
        "workflow-names": workflowNames,
      },
    });
  }
  /**
   * Job timeseries data
   * Get timeseries data for all jobs within a workflow. Hourly granularity data is only retained for 48 hours while daily granularity data is retained for 90 days.
   * @returns any An array of timeseries data, one entry per job.
   * @throws ApiError
   */
  public static getJobTimeseries({
    projectSlug,
    workflowName,
    branch,
    granularity,
    startDate,
    endDate,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    projectSlug: string;
    /**
     * The name of the workflow.
     */
    workflowName: string;
    /**
     * The name of a vcs branch. If not passed we will scope the API call to the default branch.
     */
    branch?: string;
    /**
     * The granularity for which to query timeseries data.
     */
    granularity?: "daily" | "hourly";
    /**
     * Include only executions that started at or after this date. This must be specified if an end-date is provided.
     */
    startDate?: string;
    /**
     * Include only executions that started before this date. This date can be at most 90 days after the start-date.
     */
    endDate?: string;
  }): CancelablePromise<{
    /**
     * Aggregate metrics for a workflow at a time granularity
     */
    items: Array<{
      /**
       * The end time of the last execution included in the metrics.
       */
      max_ended_at: string;
      /**
       * Metrics relating to a workflow's runs.
       */
      metrics: {
        /**
         * Metrics relating to the duration of runs for a workflow.
         */
        duration_metrics: {
          /**
           * The max duration, in seconds, among a group of runs.
           */
          max: number;
          /**
           * The median duration, in seconds, among a group of runs.
           */
          median: number;
          /**
           * The minimum duration, in seconds, among a group of runs.
           */
          min: number;
          /**
           * The 95th percentile duration, in seconds, among a group of runs.
           */
          p95: number;
          /**
           * The total duration, in seconds, added across a group of runs.
           */
          total: number;
        };
        /**
         * The number of failed runs.
         */
        failed_runs: number;
        /**
         * The median credits consumed over the current timeseries interval.
         */
        median_credits_used: number;
        /**
         * The number of successful runs.
         */
        successful_runs: number;
        /**
         * The average number of runs per day.
         */
        throughput: number;
        /**
         * The total credits consumed over the current timeseries interval.
         */
        total_credits_used: number;
        /**
         * The total number of runs, including runs that are still on-hold or running.
         */
        total_runs: number;
      };
      /**
       * The start time for the earliest execution included in the metrics.
       */
      min_started_at: string;
      /**
       * The name of the workflow.
       */
      name: string;
      /**
       * The start of the interval for timeseries metrics.
       */
      timestamp: string;
    }>;
    /**
     * A token to pass as a `page-token` query parameter to return the next page of results.
     */
    next_page_token: string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/insights/time-series/{project-slug}/workflows/{workflow-name}/jobs",
      path: {
        "project-slug": projectSlug,
        "workflow-name": workflowName,
      },
      query: {
        branch: branch,
        granularity: granularity,
        "start-date": startDate,
        "end-date": endDate,
      },
    });
  }
  /**
   * Get summary metrics with trends for the entire org, and for each project.
   * Gets aggregated summary metrics with trends for the entire org.
   * Also gets aggregated metrics and trends for each project belonging to the org.
   * @returns any summary metrics with trends for an entire org and it's projects.
   * @throws ApiError
   */
  public static getOrgSummaryData({
    orgSlug,
    reportingWindow,
    projectNames,
  }: {
    /**
     * Org slug in the form `vcs-slug/org-name`. The `/` characters may be URL-escaped.
     */
    orgSlug: string;
    /**
     * The time window used to calculate summary metrics. If not provided, defaults to last-90-days
     */
    reportingWindow?:
      | "last-7-days"
      | "last-90-days"
      | "last-24-hours"
      | "last-30-days"
      | "last-60-days";
    /**
     * List of project names.
     */
    projectNames?: any;
  }): CancelablePromise<{
    /**
     * A list of all the project names in the organization.
     */
    all_projects: Array<string>;
    /**
     * Aggregated metrics for an org, with trends.
     */
    org_data: {
      /**
       * Metrics for a single org metrics.
       */
      metrics: {
        success_rate: number;
        /**
         * The average number of runs per day.
         */
        throughput: number;
        /**
         * The total credits consumed over the current timeseries interval.
         */
        total_credits_used: number;
        /**
         * Total duration, in seconds.
         */
        total_duration_secs: number;
        /**
         * The total number of runs, including runs that are still on-hold or running.
         */
        total_runs: number;
      };
      /**
       * Trends for a single org.
       */
      trends: {
        /**
         * The trend value for the success rate.
         */
        success_rate: number;
        /**
         * Trend value for the average number of runs per day.
         */
        throughput: number;
        /**
         * The trend value for total credits consumed.
         */
        total_credits_used: number;
        /**
         * Trend value for total duration.
         */
        total_duration_secs: number;
        /**
         * The trend value for total number of runs.
         */
        total_runs: number;
      };
    };
    /**
     * Metrics for a single project, across all branches
     */
    org_project_data: Array<{
      /**
       * Metrics for a single project, across all branches.
       */
      metrics: {
        success_rate: number;
        /**
         * The total credits consumed over the current timeseries interval.
         */
        total_credits_used: number;
        /**
         * Total duration, in seconds.
         */
        total_duration_secs: number;
        /**
         * The total number of runs, including runs that are still on-hold or running.
         */
        total_runs: number;
      };
      /**
       * The name of the project.
       */
      project_name: string;
      /**
       * Trends for a single project, across all branches.
       */
      trends: {
        /**
         * The trend value for the success rate.
         */
        success_rate: number;
        /**
         * The trend value for total credits consumed.
         */
        total_credits_used: number;
        /**
         * Trend value for total duration.
         */
        total_duration_secs: number;
        /**
         * The trend value for total number of runs.
         */
        total_runs: number;
      };
    }>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/insights/{org-slug}/summary",
      path: {
        "org-slug": orgSlug,
      },
      query: {
        "reporting-window": reportingWindow,
        "project-names": projectNames,
      },
    });
  }
  /**
   * Get all branches for a project
   * Get a list of all branches for a specified project. The list will only contain branches currently available within Insights. The maximum number of branches returned by this endpoint is 5,000.
   * @returns any A list of branches for a project
   * @throws ApiError
   */
  public static getAllInsightsBranches({
    projectSlug,
    workflowName,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    projectSlug: string;
    /**
     * The name of a workflow. If not passed we will scope the API call to the project.
     */
    workflowName?: string;
  }): CancelablePromise<{
    /**
     * A list of all the branches for a given project.
     */
    branches: Array<string>;
    /**
     * The unique ID of the organization
     */
    org_id: any;
    /**
     * The unique ID of the project
     */
    project_id: any;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/insights/{project-slug}/branches",
      path: {
        "project-slug": projectSlug,
      },
      query: {
        "workflow-name": workflowName,
      },
    });
  }
  /**
   * Get flaky tests for a project
   * Get a list of flaky tests for a given project. Flaky tests are branch agnostic.
   * A flaky test is a test that passed and failed in the same commit.
   * @returns any A list of flaky tests for a project
   * @throws ApiError
   */
  public static getFlakyTests({
    projectSlug,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    projectSlug: string;
  }): CancelablePromise<{
    /**
     * A list of all instances of flakes. Note that a test is no longer considered flaky after 2 weeks have passed without a flake. Each flake resets this timer.
     */
    "flaky-tests": Array<{
      /**
       * The class the test belongs to.
       */
      classname: string;
      /**
       * The file the test belongs to.
       */
      file: string;
      /**
       * The name of the job.
       */
      "job-name": string;
      /**
       * The number of the job.
       */
      "job-number": number;
      /**
       * The number of the pipeline.
       */
      "pipeline-number": number;
      /**
       * The source of the test.
       */
      source: string;
      /**
       * The name of the test.
       */
      "test-name": string;
      "time-wasted"?: number;
      /**
       * The number of times the test flaked.
       */
      "times-flaked": number;
      /**
       * The date and time when workflow was created.
       */
      "workflow-created-at": string;
      /**
       * The ID of the workflow associated with the provided test counts
       */
      "workflow-id": any;
      /**
       * The name of the workflow.
       */
      "workflow-name": string;
    }>;
    /**
     * A count of unique tests that have failed. If your project has N tests that have flaked multiple times each, this will be equal to N.
     */
    "total-flaky-tests": number;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/insights/{project-slug}/flaky-tests",
      path: {
        "project-slug": projectSlug,
      },
    });
  }
  /**
   * Get summary metrics for a project's workflows
   * Get summary metrics for a project's workflows.  Workflow runs going back at most 90 days are included in the aggregation window. Metrics are refreshed daily, and thus may not include executions from the last 24 hours.  Please note that Insights is not a financial reporting tool and should not be used for precise credit reporting.  Credit reporting from Insights does not use the same source of truth as the billing information that is found in the Plan Overview page in the CircleCI UI, nor does the underlying data have the same data accuracy guarantees as the billing information in the CircleCI UI.  This may lead to discrepancies between credits reported from Insights and the billing information in the Plan Overview page of the CircleCI UI.  For precise credit reporting, always use the Plan Overview page in the CircleCI UI.
   * @returns any A paginated list of summary metrics by workflow
   * @throws ApiError
   */
  public static getProjectWorkflowMetrics({
    projectSlug,
    pageToken,
    allBranches,
    branch,
    reportingWindow,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    projectSlug: string;
    /**
     * A token to retrieve the next page of results.
     */
    pageToken?: string;
    /**
     * Whether to retrieve data for all branches combined. Use either this parameter OR the branch name parameter.
     */
    allBranches?: boolean;
    /**
     * The name of a vcs branch. If not passed we will scope the API call to the default branch.
     */
    branch?: string;
    /**
     * The time window used to calculate summary metrics. If not provided, defaults to last-90-days
     */
    reportingWindow?:
      | "last-7-days"
      | "last-90-days"
      | "last-24-hours"
      | "last-30-days"
      | "last-60-days";
  }): CancelablePromise<{
    /**
     * Workflow summary metrics.
     */
    items: Array<{
      /**
       * Metrics relating to a workflow's runs.
       */
      metrics: {
        /**
         * Metrics relating to the duration of runs for a workflow.
         */
        duration_metrics: {
          /**
           * The max duration, in seconds, among a group of runs.
           */
          max: number;
          /**
           * The mean duration, in seconds, among a group of runs.
           */
          mean: number;
          /**
           * The median duration, in seconds, among a group of runs.
           */
          median: number;
          /**
           * The minimum duration, in seconds, among a group of runs.
           */
          min: number;
          /**
           * The 95th percentile duration, in seconds, among a group of runs.
           */
          p95: number;
          /**
           * The standard deviation, in seconds, among a group of runs.
           */
          standard_deviation: number;
        };
        /**
         * The number of failed runs.
         */
        failed_runs: number;
        /**
         * The mean time to recovery (mean time between failures and their next success) in seconds.
         */
        mttr: number;
        success_rate: number;
        /**
         * The number of successful runs.
         */
        successful_runs: number;
        /**
         * The average number of runs per day.
         */
        throughput: number;
        /**
         * The total credits consumed by the workflow in the aggregation window. Note that Insights is not a real time financial reporting tool and should not be used for credit reporting.
         */
        total_credits_used: number;
        /**
         * The number of recovered workflow executions per day.
         */
        total_recoveries: number;
        /**
         * The total number of runs, including runs that are still on-hold or running.
         */
        total_runs: number;
      };
      /**
       * The name of the workflow.
       */
      name: string;
      /**
       * The unique ID of the project
       */
      project_id: any;
      /**
       * The timestamp of the last build within the requested reporting window.
       */
      window_end: string;
      /**
       * The timestamp of the first build within the requested reporting window.
       */
      window_start: string;
    }>;
    /**
     * A token to pass as a `page-token` query parameter to return the next page of results.
     */
    next_page_token: string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/insights/{project-slug}/workflows",
      path: {
        "project-slug": projectSlug,
      },
      query: {
        "page-token": pageToken,
        "all-branches": allBranches,
        branch: branch,
        "reporting-window": reportingWindow,
      },
    });
  }
  /**
   * Get recent runs of a workflow
   * Get recent runs of a workflow. Runs going back at most 90 days are returned. Please note that Insights is not a financial reporting tool and should not be used for precise credit reporting.  Credit reporting from Insights does not use the same source of truth as the billing information that is found in the Plan Overview page in the CircleCI UI, nor does the underlying data have the same data accuracy guarantees as the billing information in the CircleCI UI.  This may lead to discrepancies between credits reported from Insights and the billing information in the Plan Overview page of the CircleCI UI.  For precise credit reporting, always use the Plan Overview page in the CircleCI UI.
   * @returns any A paginated list of recent workflow runs
   * @throws ApiError
   */
  public static getProjectWorkflowRuns({
    projectSlug,
    workflowName,
    allBranches,
    branch,
    pageToken,
    startDate,
    endDate,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    projectSlug: string;
    /**
     * The name of the workflow.
     */
    workflowName: string;
    /**
     * Whether to retrieve data for all branches combined. Use either this parameter OR the branch name parameter.
     */
    allBranches?: boolean;
    /**
     * The name of a vcs branch. If not passed we will scope the API call to the default branch.
     */
    branch?: string;
    /**
     * A token to retrieve the next page of results.
     */
    pageToken?: string;
    /**
     * Include only executions that started at or after this date. This must be specified if an end-date is provided.
     */
    startDate?: string;
    /**
     * Include only executions that started before this date. This date can be at most 90 days after the start-date.
     */
    endDate?: string;
  }): CancelablePromise<{
    /**
     * Recent workflow runs.
     */
    items: Array<{
      /**
       * The VCS branch of a Workflow's trigger.
       */
      branch: string;
      /**
       * The date and time the workflow was created.
       */
      created_at: string;
      /**
       * The number of credits used during execution. Note that Insights is not a real time financial reporting tool and should not be used for credit reporting.
       */
      credits_used: number;
      /**
       * The duration in seconds of a run.
       */
      duration: number;
      /**
       * The unique ID of the workflow.
       */
      id: string;
      /**
       * Describes if the job is an approval job or not. Approval jobs are intermediary jobs that are created to pause the workflow until approved.
       */
      is_approval: boolean;
      /**
       * Workflow status.
       */
      status: "success" | "failed" | "error" | "canceled" | "unauthorized";
      /**
       * The date and time the workflow stopped.
       */
      stopped_at: string;
    }>;
    /**
     * A token to pass as a `page-token` query parameter to return the next page of results.
     */
    next_page_token: string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/insights/{project-slug}/workflows/{workflow-name}",
      path: {
        "project-slug": projectSlug,
        "workflow-name": workflowName,
      },
      query: {
        "all-branches": allBranches,
        branch: branch,
        "page-token": pageToken,
        "start-date": startDate,
        "end-date": endDate,
      },
    });
  }
  /**
   * Get summary metrics for a project workflow's jobs.
   * Get summary metrics for a project workflow's jobs. Job runs going back at most 90 days are included in the aggregation window. Metrics are refreshed daily, and thus may not include executions from the last 24 hours. Please note that Insights is not a financial reporting tool and should not be used for precise credit reporting.  Credit reporting from Insights does not use the same source of truth as the billing information that is found in the Plan Overview page in the CircleCI UI, nor does the underlying data have the same data accuracy guarantees as the billing information in the CircleCI UI.  This may lead to discrepancies between credits reported from Insights and the billing information in the Plan Overview page of the CircleCI UI.  For precise credit reporting, always use the Plan Overview page in the CircleCI UI.
   * @returns any A paginated list of summary metrics by workflow job.
   * @throws ApiError
   */
  public static getProjectWorkflowJobMetrics({
    projectSlug,
    workflowName,
    pageToken,
    allBranches,
    branch,
    reportingWindow,
    jobName,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    projectSlug: string;
    /**
     * The name of the workflow.
     */
    workflowName: string;
    /**
     * A token to retrieve the next page of results.
     */
    pageToken?: string;
    /**
     * Whether to retrieve data for all branches combined. Use either this parameter OR the branch name parameter.
     */
    allBranches?: boolean;
    /**
     * The name of a vcs branch. If not passed we will scope the API call to the default branch.
     */
    branch?: string;
    /**
     * The time window used to calculate summary metrics. If not provided, defaults to last-90-days
     */
    reportingWindow?:
      | "last-7-days"
      | "last-90-days"
      | "last-24-hours"
      | "last-30-days"
      | "last-60-days";
    /**
     * The name of the jobs you would like to filter from your workflow. If not specified, all workflow jobs will be returned. The job name can either be the full job name or just a substring of the job name.
     */
    jobName?: string;
  }): CancelablePromise<{
    /**
     * Job summary metrics.
     */
    items: Array<{
      /**
       * Metrics relating to a workflow job's runs.
       */
      metrics: {
        /**
         * Metrics relating to the duration of runs for a workflow job.
         */
        duration_metrics: {
          /**
           * The max duration, in seconds, among a group of runs.
           */
          max: number;
          /**
           * The mean duration, in seconds, among a group of runs.
           */
          mean: number;
          /**
           * The median duration, in seconds, among a group of runs.
           */
          median: number;
          /**
           * The minimum duration, in seconds, among a group of runs.
           */
          min: number;
          /**
           * The 95th percentile duration, in seconds, among a group of runs.
           */
          p95: number;
          /**
           * The standard deviation, in seconds, among a group of runs.
           */
          standard_deviation: number;
        };
        /**
         * The number of failed runs.
         */
        failed_runs: number;
        success_rate: number;
        /**
         * The number of successful runs.
         */
        successful_runs: number;
        /**
         * The average number of runs per day.
         */
        throughput: number;
        /**
         * The total credits consumed by the job in the aggregation window. Note that Insights is not a real time financial reporting tool and should not be used for credit reporting.
         */
        total_credits_used: number;
        /**
         * The total number of runs, including runs that are still on-hold or running.
         */
        total_runs: number;
      };
      /**
       * The name of the job.
       */
      name: string;
      /**
       * The timestamp of the last build within the requested reporting window.
       */
      window_end: string;
      /**
       * The timestamp of the first build within the requested reporting window.
       */
      window_start: string;
    }>;
    /**
     * A token to pass as a `page-token` query parameter to return the next page of results.
     */
    next_page_token: string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/insights/{project-slug}/workflows/{workflow-name}/jobs",
      path: {
        "project-slug": projectSlug,
        "workflow-name": workflowName,
      },
      query: {
        "page-token": pageToken,
        "all-branches": allBranches,
        branch: branch,
        "reporting-window": reportingWindow,
        "job-name": jobName,
      },
    });
  }
  /**
   * Get metrics and trends for workflows
   * Get the metrics and trends for a particular workflow on a single branch or all branches
   * @returns any Metrics and trends for a workflow
   * @throws ApiError
   */
  public static getWorkflowSummary({
    projectSlug,
    workflowName,
    allBranches,
    branch,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    projectSlug: string;
    /**
     * The name of the workflow.
     */
    workflowName: string;
    /**
     * Whether to retrieve data for all branches combined. Use either this parameter OR the branch name parameter.
     */
    allBranches?: boolean;
    /**
     * The name of a vcs branch. If not passed we will scope the API call to the default branch.
     */
    branch?: string;
  }): CancelablePromise<{
    /**
     * Metrics aggregated across a workflow for a given time window.
     */
    metrics: {
      /**
       * The number of runs that ran to completion within the aggregation window
       */
      completed_runs: number;
      /**
       * Metrics relating to the duration of runs for a workflow.
       */
      duration_metrics: {
        /**
         * The max duration, in seconds, among a group of runs.
         */
        max: number;
        /**
         * The mean duration, in seconds, among a group of runs.
         */
        mean: number;
        /**
         * The median duration, in seconds, among a group of runs.
         */
        median: number;
        /**
         * The minimum duration, in seconds, among a group of runs.
         */
        min: number;
        /**
         * The 95th percentile duration, in seconds, among a group of runs.
         */
        p95: number;
        /**
         * The standard deviation, in seconds, among a group of runs.
         */
        standard_deviation: number;
      };
      /**
       * The number of failed runs.
       */
      failed_runs: number;
      /**
       * The mean time to recovery (mean time between failures and their next success) in seconds.
       */
      mttr: number;
      success_rate: number;
      /**
       * The number of successful runs.
       */
      successful_runs: number;
      /**
       * The average number of runs per day.
       */
      throughput: number;
      /**
       * The total credits consumed by the workflow in the aggregation window. Note that Insights is not a real time financial reporting tool and should not be used for credit reporting.
       */
      total_credits_used: number;
      /**
       * The total number of runs, including runs that are still on-hold or running.
       */
      total_runs: number;
      /**
       * The timestamp of the last build within the requested reporting window.
       */
      window_end: string;
      /**
       * The timestamp of the first build within the requested reporting window.
       */
      window_start: string;
    };
    /**
     * Trends for aggregated metrics across a workflow for a given time window.
     */
    trends: {
      /**
       * The trend value for number of failed runs.
       */
      failed_runs: number;
      /**
       * Trend value for the 50th percentile duration for a workflow for a given time window.
       */
      median_duration_secs: number;
      /**
       * trend for mean time to recovery (mean time between failures and their next success).
       */
      mttr: number;
      /**
       * Trend value for the 95th percentile duration for a workflow for a given time window.
       */
      p95_duration_secs: number;
      /**
       * The trend value for the success rate.
       */
      success_rate: number;
      /**
       * Trend value for the average number of runs per day.
       */
      throughput: number;
      /**
       * The trend value for total credits consumed.
       */
      total_credits_used: number;
      /**
       * The trend value for total number of runs.
       */
      total_runs: number;
    };
    /**
     * A list of all the workflow names for a given project.
     */
    workflow_names: Array<string>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/insights/{project-slug}/workflows/{workflow-name}/summary",
      path: {
        "project-slug": projectSlug,
        "workflow-name": workflowName,
      },
      query: {
        "all-branches": allBranches,
        branch: branch,
      },
    });
  }
  /**
   * Get test metrics for a project's workflows
   * Get test metrics for a project's workflows. Currently tests metrics are calculated based on 10 most recent workflow runs.
   * @returns any A list of test metrics by workflow
   * @throws ApiError
   */
  public static getProjectWorkflowTestMetrics({
    projectSlug,
    workflowName,
    branch,
    allBranches,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    projectSlug: string;
    /**
     * The name of the workflow.
     */
    workflowName: string;
    /**
     * The name of a vcs branch. If not passed we will scope the API call to the default branch.
     */
    branch?: string;
    /**
     * Whether to retrieve data for all branches combined. Use either this parameter OR the branch name parameter.
     */
    allBranches?: boolean;
  }): CancelablePromise<{
    /**
     * The average number of tests executed per run
     */
    average_test_count: number;
    /**
     * Metrics for the most frequently failing tests
     */
    most_failed_tests: Array<{
      /**
       * The class the test belongs to.
       */
      classname: string;
      /**
       * The number of times the test failed
       */
      failed_runs: number;
      /**
       * The file the test belongs to.
       */
      file: string;
      /**
       * Whether the test is flaky.
       */
      flaky: boolean;
      /**
       * The name of the job.
       */
      job_name: string;
      /**
       * The 95th percentile duration, in seconds, among a group of test runs.
       */
      p95_duration: number;
      /**
       * The source of the test.
       */
      source: string;
      /**
       * The name of the test.
       */
      test_name: string;
      /**
       * The total number of times the test was run.
       */
      total_runs: number;
    }>;
    /**
     * The number of tests with the same success rate being omitted from most_failed_tests
     */
    most_failed_tests_extra: number;
    /**
     * Metrics for the slowest running tests
     */
    slowest_tests: Array<{
      /**
       * The class the test belongs to.
       */
      classname: string;
      /**
       * The number of times the test failed
       */
      failed_runs: number;
      /**
       * The file the test belongs to.
       */
      file: string;
      /**
       * Whether the test is flaky.
       */
      flaky: boolean;
      /**
       * The name of the job.
       */
      job_name: string;
      /**
       * The 95th percentile duration, in seconds, among a group of test runs.
       */
      p95_duration: number;
      /**
       * The source of the test.
       */
      source: string;
      /**
       * The name of the test.
       */
      test_name: string;
      /**
       * The total number of times the test was run.
       */
      total_runs: number;
    }>;
    /**
     * The number of tests with the same duration rate being omitted from slowest_tests
     */
    slowest_tests_extra: number;
    /**
     * Test counts grouped by pipeline number and workflow id
     */
    test_runs: Array<{
      /**
       * The number of the pipeline associated with the provided test counts
       */
      pipeline_number: number;
      /**
       * The success rate calculated from test counts
       */
      success_rate: number;
      /**
       * Test counts for a given pipeline number
       */
      test_counts: {
        /**
         * The number of tests with the error status
         */
        error: number;
        /**
         * The number of tests with the failure status
         */
        failure: number;
        /**
         * The number of tests with the skipped status
         */
        skipped: number;
        /**
         * The number of tests with the success status
         */
        success: number;
        /**
         * The total number of tests
         */
        total: number;
      };
      /**
       * The ID of the workflow associated with the provided test counts
       */
      workflow_id: any;
    }>;
    /**
     * The total number of test runs
     */
    total_test_runs: number;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/insights/{project-slug}/workflows/{workflow-name}/test-metrics",
      path: {
        "project-slug": projectSlug,
        "workflow-name": workflowName,
      },
      query: {
        branch: branch,
        "all-branches": allBranches,
      },
    });
  }
}
