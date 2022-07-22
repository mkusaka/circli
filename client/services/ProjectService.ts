import type { CancelablePromise } from "../core/CancelablePromise.ts";
import { OpenAPI } from "../core/OpenAPI.ts";
import { request as __request } from "../core/request.ts";
export class ProjectService {
  /**
   * Get a project
   * Retrieves a project by project slug.
   * @returns any A project object
   * @throws ApiError
   */
  public static getProjectBySlug({
    projectSlug,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.
     */
    projectSlug: string;
  }): CancelablePromise<{
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.
     */
    slug: string;
    /**
     * The name of the project
     */
    name: string;
    id: string;
    /**
     * The name of the organization the project belongs to
     */
    organization_name: string;
    /**
     * The slug of the organization the project belongs to
     */
    organization_slug: string;
    /**
     * The id of the organization the project belongs to
     */
    organization_id: string;
    /**
     * Information about the VCS that hosts the project source code.
     */
    vcs_info: {
      /**
       * URL to the repository hosting the project's code
       */
      vcs_url: string;
      /**
       * The VCS provider
       */
      provider: "Bitbucket" | "CircleCI" | "GitHub";
      default_branch: string;
    };
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/project/{project-slug}",
      path: {
        "project-slug": projectSlug,
      },
    });
  }
  /**
   * Create a new checkout key
   * Creates a new checkout key. This API request is only usable with a user API token.
   * @returns any Error response.
   * @throws ApiError
   */
  public static createCheckoutKey({
    projectSlug,
    requestBody,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.
     */
    projectSlug: string;
    requestBody?: {
      /**
       * The type of checkout key to create. This may be either `deploy-key` or `user-key`.
       */
      type: "user-key" | "deploy-key";
    };
  }): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/project/{project-slug}/checkout-key",
      path: {
        "project-slug": projectSlug,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Get all checkout keys
   * Returns a sequence of checkout keys for `:project`.
   * @returns any A sequence of checkout keys.
   * @throws ApiError
   */
  public static listCheckoutKeys({
    projectSlug,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.
     */
    projectSlug: string;
  }): CancelablePromise<{
    items: Array<{
      /**
       * A public SSH key.
       */
      "public-key": string;
      /**
       * The type of checkout key. This may be either `deploy-key` or `github-user-key`.
       */
      type: "deploy-key" | "github-user-key";
      /**
       * An SSH key fingerprint.
       */
      fingerprint: string;
      /**
       * A boolean value that indicates if this key is preferred.
       */
      preferred: boolean;
      /**
       * The date and time the checkout key was created.
       */
      "created-at": string;
    }>;
    /**
     * A token to pass as a `page-token` query parameter to return the next page of results.
     */
    next_page_token: string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/project/{project-slug}/checkout-key",
      path: {
        "project-slug": projectSlug,
      },
    });
  }
  /**
   * Delete a checkout key
   * Deletes the checkout key.
   * @returns any A confirmation message.
   * @throws ApiError
   */
  public static deleteCheckoutKey({
    projectSlug,
    fingerprint,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.
     */
    projectSlug: string;
    /**
     * An SSH key fingerprint.
     */
    fingerprint: string;
  }): CancelablePromise<{
    /**
     * A human-readable message
     */
    message: string;
  }> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/project/{project-slug}/checkout-key/{fingerprint}",
      path: {
        "project-slug": projectSlug,
        fingerprint: fingerprint,
      },
    });
  }
  /**
   * Get a checkout key
   * Returns an individual checkout key.
   * @returns any The checkout key.
   * @throws ApiError
   */
  public static getCheckoutKey({
    projectSlug,
    fingerprint,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.
     */
    projectSlug: string;
    /**
     * An SSH key fingerprint.
     */
    fingerprint: string;
  }): CancelablePromise<{
    /**
     * A public SSH key.
     */
    "public-key": string;
    /**
     * The type of checkout key. This may be either `deploy-key` or `github-user-key`.
     */
    type: "deploy-key" | "github-user-key";
    /**
     * An SSH key fingerprint.
     */
    fingerprint: string;
    /**
     * A boolean value that indicates if this key is preferred.
     */
    preferred: boolean;
    /**
     * The date and time the checkout key was created.
     */
    "created-at": string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/project/{project-slug}/checkout-key/{fingerprint}",
      path: {
        "project-slug": projectSlug,
        fingerprint: fingerprint,
      },
    });
  }
  /**
   * List all environment variables
   * Returns four 'x' characters, in addition to the last four ASCII characters of the value, consistent with the display of environment variable values on the CircleCI website.
   * @returns any A sequence of environment variables.
   * @throws ApiError
   */
  public static listEnvVars({
    projectSlug,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.
     */
    projectSlug: string;
  }): CancelablePromise<{
    items: Array<{
      /**
       * The name of the environment variable.
       */
      name: string;
      /**
       * The value of the environment variable.
       */
      value: string;
    }>;
    /**
     * A token to pass as a `page-token` query parameter to return the next page of results.
     */
    next_page_token: string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/project/{project-slug}/envvar",
      path: {
        "project-slug": projectSlug,
      },
    });
  }
  /**
   * Create an environment variable
   * Creates a new environment variable.
   * @returns any Error response.
   * @throws ApiError
   */
  public static createEnvVar({
    projectSlug,
    requestBody,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.
     */
    projectSlug: string;
    requestBody?: {
      /**
       * The name of the environment variable.
       */
      name: string;
      /**
       * The value of the environment variable.
       */
      value: string;
    };
  }): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/project/{project-slug}/envvar",
      path: {
        "project-slug": projectSlug,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Get a masked environment variable
   * Returns the masked value of environment variable :name.
   * @returns any The environment variable.
   * @throws ApiError
   */
  public static getEnvVar({
    projectSlug,
    name,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.
     */
    projectSlug: string;
    /**
     * The name of the environment variable.
     */
    name: string;
  }): CancelablePromise<{
    /**
     * The name of the environment variable.
     */
    name: string;
    /**
     * The value of the environment variable.
     */
    value: string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/project/{project-slug}/envvar/{name}",
      path: {
        "project-slug": projectSlug,
        name: name,
      },
    });
  }
  /**
   * Delete an environment variable
   * Deletes the environment variable named :name.
   * @returns any A confirmation message.
   * @throws ApiError
   */
  public static deleteEnvVar({
    projectSlug,
    name,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.
     */
    projectSlug: string;
    /**
     * The name of the environment variable.
     */
    name: string;
  }): CancelablePromise<{
    /**
     * A human-readable message
     */
    message: string;
  }> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/project/{project-slug}/envvar/{name}",
      path: {
        "project-slug": projectSlug,
        name: name,
      },
    });
  }
}
