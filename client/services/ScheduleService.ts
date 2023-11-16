import type { CancelablePromise } from "../core/CancelablePromise.ts";
import { OpenAPI } from "../core/OpenAPI.ts";
import { request as __request } from "../core/request.ts";
export class ScheduleService {
  /**
   * Get all schedules
   * Returns all schedules for this project.
   * @returns any A sequence of schedules.
   * @throws ApiError
   */
  public static listSchedulesForProject({
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
       * The attribution actor who will run the scheduled pipeline.
       */
      actor: {
        /**
         * The unique ID of the user.
         */
        id: string;
        /**
         * The login information for the user on the VCS.
         */
        login: string;
        /**
         * The name of the user.
         */
        name: string;
      };
      /**
       * The date and time the pipeline was created.
       */
      "created-at": string;
      /**
       * Description of the schedule.
       */
      description: string;
      /**
       * The unique ID of the schedule.
       */
      id: string;
      /**
       * Name of the schedule.
       */
      name: string;
      /**
       * Pipeline parameters represented as key-value pairs. Must contain branch or tag.
       */
      parameters: Record<string, number | string | boolean>;
      /**
       * The project-slug for the schedule
       */
      "project-slug": string;
      /**
       * Timetable that specifies when a schedule triggers.
       */
      timetable:
        | {
            /**
             * Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.
             */
            "days-of-month"?: Array<number>;
            /**
             * Days in a week in which the schedule triggers.
             */
            "days-of-week": Array<
              "TUE" | "SAT" | "SUN" | "MON" | "THU" | "WED" | "FRI"
            >;
            /**
             * Hours in a day in which the schedule triggers.
             */
            "hours-of-day": Array<number>;
            /**
             * Months in which the schedule triggers.
             */
            months?: Array<
              | "MAR"
              | "NOV"
              | "DEC"
              | "JUN"
              | "MAY"
              | "OCT"
              | "FEB"
              | "APR"
              | "SEP"
              | "AUG"
              | "JAN"
              | "JUL"
            >;
            /**
             * Number of times a schedule triggers per hour, value must be between 1 and 60
             */
            "per-hour": number;
          }
        | {
            /**
             * Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.
             */
            "days-of-month": Array<number>;
            /**
             * Days in a week in which the schedule triggers.
             */
            "days-of-week"?: Array<
              "TUE" | "SAT" | "SUN" | "MON" | "THU" | "WED" | "FRI"
            >;
            /**
             * Hours in a day in which the schedule triggers.
             */
            "hours-of-day": Array<number>;
            /**
             * Months in which the schedule triggers.
             */
            months?: Array<
              | "MAR"
              | "NOV"
              | "DEC"
              | "JUN"
              | "MAY"
              | "OCT"
              | "FEB"
              | "APR"
              | "SEP"
              | "AUG"
              | "JAN"
              | "JUL"
            >;
            /**
             * Number of times a schedule triggers per hour, value must be between 1 and 60
             */
            "per-hour": number;
          };
      /**
       * The date and time the pipeline was last updated.
       */
      "updated-at": string;
    }>;
    /**
     * A token to pass as a `page-token` query parameter to return the next page of results.
     */
    next_page_token: string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/project/{project-slug}/schedule",
      path: {
        "project-slug": projectSlug,
      },
      query: {
        "page-token": pageToken,
      },
    });
  }
  /**
   * Create a schedule
   * Not yet available to projects that use GitLab or GitHub App. Creates a schedule and returns the created schedule.
   * @returns any Error response.
   * @throws ApiError
   */
  public static createSchedule({
    projectSlug,
    requestBody,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    projectSlug: string;
    requestBody?: {
      /**
       * The attribution-actor of the scheduled pipeline.
       */
      "attribution-actor": "current" | "system";
      /**
       * Description of the schedule.
       */
      description?: string;
      /**
       * Name of the schedule.
       */
      name: string;
      /**
       * Pipeline parameters represented as key-value pairs. Must contain branch or tag.
       */
      parameters: Record<string, number | string | boolean>;
      /**
       * Timetable that specifies when a schedule triggers.
       */
      timetable:
        | {
            /**
             * Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.
             */
            "days-of-month"?: Array<number>;
            /**
             * Days in a week in which the schedule triggers.
             */
            "days-of-week": Array<
              "TUE" | "SAT" | "SUN" | "MON" | "THU" | "WED" | "FRI"
            >;
            /**
             * Hours in a day in which the schedule triggers.
             */
            "hours-of-day": Array<number>;
            /**
             * Months in which the schedule triggers.
             */
            months?: Array<
              | "MAR"
              | "NOV"
              | "DEC"
              | "JUN"
              | "MAY"
              | "OCT"
              | "FEB"
              | "APR"
              | "SEP"
              | "AUG"
              | "JAN"
              | "JUL"
            >;
            /**
             * Number of times a schedule triggers per hour, value must be between 1 and 60
             */
            "per-hour": number;
          }
        | {
            /**
             * Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.
             */
            "days-of-month": Array<number>;
            /**
             * Days in a week in which the schedule triggers.
             */
            "days-of-week"?: Array<
              "TUE" | "SAT" | "SUN" | "MON" | "THU" | "WED" | "FRI"
            >;
            /**
             * Hours in a day in which the schedule triggers.
             */
            "hours-of-day": Array<number>;
            /**
             * Months in which the schedule triggers.
             */
            months?: Array<
              | "MAR"
              | "NOV"
              | "DEC"
              | "JUN"
              | "MAY"
              | "OCT"
              | "FEB"
              | "APR"
              | "SEP"
              | "AUG"
              | "JAN"
              | "JUL"
            >;
            /**
             * Number of times a schedule triggers per hour, value must be between 1 and 60
             */
            "per-hour": number;
          };
    };
  }): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/project/{project-slug}/schedule",
      path: {
        "project-slug": projectSlug,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Delete a schedule
   * Not yet available to projects that use GitLab or GitHub App. Deletes the schedule by id.
   * @returns any A confirmation message.
   * @throws ApiError
   */
  public static deleteScheduleById({
    scheduleId,
  }: {
    /**
     * The unique ID of the schedule.
     */
    scheduleId: string;
  }): CancelablePromise<{
    /**
     * A human-readable message
     */
    message: string;
  }> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/schedule/{schedule-id}",
      path: {
        "schedule-id": scheduleId,
      },
    });
  }
  /**
   * Get a schedule
   * Get a schedule by id.
   * @returns any A schedule object.
   * @throws ApiError
   */
  public static getScheduleById({
    scheduleId,
  }: {
    /**
     * The unique ID of the schedule.
     */
    scheduleId: string;
  }): CancelablePromise<{
    /**
     * The attribution actor who will run the scheduled pipeline.
     */
    actor: {
      /**
       * The unique ID of the user.
       */
      id: string;
      /**
       * The login information for the user on the VCS.
       */
      login: string;
      /**
       * The name of the user.
       */
      name: string;
    };
    /**
     * The date and time the pipeline was created.
     */
    "created-at": string;
    /**
     * Description of the schedule.
     */
    description: string;
    /**
     * The unique ID of the schedule.
     */
    id: string;
    /**
     * Name of the schedule.
     */
    name: string;
    /**
     * Pipeline parameters represented as key-value pairs. Must contain branch or tag.
     */
    parameters: Record<string, number | string | boolean>;
    /**
     * The project-slug for the schedule
     */
    "project-slug": string;
    /**
     * Timetable that specifies when a schedule triggers.
     */
    timetable:
      | {
          /**
           * Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.
           */
          "days-of-month"?: Array<number>;
          /**
           * Days in a week in which the schedule triggers.
           */
          "days-of-week": Array<
            "TUE" | "SAT" | "SUN" | "MON" | "THU" | "WED" | "FRI"
          >;
          /**
           * Hours in a day in which the schedule triggers.
           */
          "hours-of-day": Array<number>;
          /**
           * Months in which the schedule triggers.
           */
          months?: Array<
            | "MAR"
            | "NOV"
            | "DEC"
            | "JUN"
            | "MAY"
            | "OCT"
            | "FEB"
            | "APR"
            | "SEP"
            | "AUG"
            | "JAN"
            | "JUL"
          >;
          /**
           * Number of times a schedule triggers per hour, value must be between 1 and 60
           */
          "per-hour": number;
        }
      | {
          /**
           * Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.
           */
          "days-of-month": Array<number>;
          /**
           * Days in a week in which the schedule triggers.
           */
          "days-of-week"?: Array<
            "TUE" | "SAT" | "SUN" | "MON" | "THU" | "WED" | "FRI"
          >;
          /**
           * Hours in a day in which the schedule triggers.
           */
          "hours-of-day": Array<number>;
          /**
           * Months in which the schedule triggers.
           */
          months?: Array<
            | "MAR"
            | "NOV"
            | "DEC"
            | "JUN"
            | "MAY"
            | "OCT"
            | "FEB"
            | "APR"
            | "SEP"
            | "AUG"
            | "JAN"
            | "JUL"
          >;
          /**
           * Number of times a schedule triggers per hour, value must be between 1 and 60
           */
          "per-hour": number;
        };
    /**
     * The date and time the pipeline was last updated.
     */
    "updated-at": string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/schedule/{schedule-id}",
      path: {
        "schedule-id": scheduleId,
      },
    });
  }
  /**
   * Update a schedule
   * Not yet available to projects that use GitLab or GitHub App. Updates a schedule and returns the updated schedule.
   * @returns any A schedule object.
   * @throws ApiError
   */
  public static updateSchedule({
    scheduleId,
    requestBody,
  }: {
    /**
     * The unique ID of the schedule.
     */
    scheduleId: string;
    requestBody?: {
      /**
       * The attribution-actor of the scheduled pipeline.
       */
      "attribution-actor"?: "current" | "system";
      /**
       * Description of the schedule.
       */
      description?: string;
      /**
       * Name of the schedule.
       */
      name?: string;
      /**
       * Pipeline parameters represented as key-value pairs. Must contain branch or tag.
       */
      parameters?: Record<string, number | string | boolean>;
      /**
       * Timetable that specifies when a schedule triggers.
       */
      timetable?: {
        /**
         * Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.
         */
        "days-of-month"?: Array<number>;
        /**
         * Days in a week in which the schedule triggers.
         */
        "days-of-week"?: Array<
          "TUE" | "SAT" | "SUN" | "MON" | "THU" | "WED" | "FRI"
        >;
        /**
         * Hours in a day in which the schedule triggers.
         */
        "hours-of-day"?: Array<number>;
        /**
         * Months in which the schedule triggers.
         */
        months?: Array<
          | "MAR"
          | "NOV"
          | "DEC"
          | "JUN"
          | "MAY"
          | "OCT"
          | "FEB"
          | "APR"
          | "SEP"
          | "AUG"
          | "JAN"
          | "JUL"
        >;
        /**
         * Number of times a schedule triggers per hour, value must be between 1 and 60
         */
        "per-hour"?: number;
      };
    };
  }): CancelablePromise<{
    /**
     * The attribution actor who will run the scheduled pipeline.
     */
    actor: {
      /**
       * The unique ID of the user.
       */
      id: string;
      /**
       * The login information for the user on the VCS.
       */
      login: string;
      /**
       * The name of the user.
       */
      name: string;
    };
    /**
     * The date and time the pipeline was created.
     */
    "created-at": string;
    /**
     * Description of the schedule.
     */
    description: string;
    /**
     * The unique ID of the schedule.
     */
    id: string;
    /**
     * Name of the schedule.
     */
    name: string;
    /**
     * Pipeline parameters represented as key-value pairs. Must contain branch or tag.
     */
    parameters: Record<string, number | string | boolean>;
    /**
     * The project-slug for the schedule
     */
    "project-slug": string;
    /**
     * Timetable that specifies when a schedule triggers.
     */
    timetable:
      | {
          /**
           * Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.
           */
          "days-of-month"?: Array<number>;
          /**
           * Days in a week in which the schedule triggers.
           */
          "days-of-week": Array<
            "TUE" | "SAT" | "SUN" | "MON" | "THU" | "WED" | "FRI"
          >;
          /**
           * Hours in a day in which the schedule triggers.
           */
          "hours-of-day": Array<number>;
          /**
           * Months in which the schedule triggers.
           */
          months?: Array<
            | "MAR"
            | "NOV"
            | "DEC"
            | "JUN"
            | "MAY"
            | "OCT"
            | "FEB"
            | "APR"
            | "SEP"
            | "AUG"
            | "JAN"
            | "JUL"
          >;
          /**
           * Number of times a schedule triggers per hour, value must be between 1 and 60
           */
          "per-hour": number;
        }
      | {
          /**
           * Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.
           */
          "days-of-month": Array<number>;
          /**
           * Days in a week in which the schedule triggers.
           */
          "days-of-week"?: Array<
            "TUE" | "SAT" | "SUN" | "MON" | "THU" | "WED" | "FRI"
          >;
          /**
           * Hours in a day in which the schedule triggers.
           */
          "hours-of-day": Array<number>;
          /**
           * Months in which the schedule triggers.
           */
          months?: Array<
            | "MAR"
            | "NOV"
            | "DEC"
            | "JUN"
            | "MAY"
            | "OCT"
            | "FEB"
            | "APR"
            | "SEP"
            | "AUG"
            | "JAN"
            | "JUL"
          >;
          /**
           * Number of times a schedule triggers per hour, value must be between 1 and 60
           */
          "per-hour": number;
        };
    /**
     * The date and time the pipeline was last updated.
     */
    "updated-at": string;
  }> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/schedule/{schedule-id}",
      path: {
        "schedule-id": scheduleId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
