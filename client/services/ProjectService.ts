import type { project_settings } from "../models/project_settings.ts";
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
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    projectSlug: string;
  }): CancelablePromise<{
    id: string;
    /**
     * The name of the project
     */
    name: string;
    /**
     * The id of the organization the project belongs to
     */
    organization_id: string;
    /**
     * The name of the organization the project belongs to
     */
    organization_name: string;
    /**
     * The slug of the organization the project belongs to
     */
    organization_slug: string;
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    slug: string;
    /**
     * Information about the VCS that hosts the project source code.
     */
    vcs_info: {
      default_branch: string;
      /**
       * The VCS provider
       */
      provider: "Bitbucket" | "CircleCI" | "GitHub";
      /**
       * URL to the repository hosting the project's code
       */
      vcs_url: string;
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
   * Get all checkout keys
   * Returns a sequence of checkout keys for `:project`.
   * @returns any A sequence of checkout keys.
   * @throws ApiError
   */
  public static listCheckoutKeys({
    projectSlug,
    digest,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    projectSlug: string;
    /**
     * The fingerprint digest type to return. This may be either `md5` or `sha256`. If not passed, defaults to `md5`.
     */
    digest?: "sha256" | "md5";
  }): CancelablePromise<{
    items: Array<{
      /**
       * The date and time the checkout key was created.
       */
      "created-at": string;
      /**
       * An SSH key fingerprint.
       */
      fingerprint: string;
      /**
       * A boolean value that indicates if this key is preferred.
       */
      preferred: boolean;
      /**
       * A public SSH key.
       */
      "public-key": string;
      /**
       * The type of checkout key. This may be either `deploy-key` or `github-user-key`.
       */
      type: "deploy-key" | "github-user-key";
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
      query: {
        digest: digest,
      },
    });
  }
  /**
   * Create a new checkout key
   * Not available to projects that use GitLab or GitHub App. Creates a new checkout key. This API request is only usable with a user API token.
   * Please ensure that you have authorized your account with GitHub before creating user keys.
   * This is necessary to give CircleCI the permission to create a user key associated with
   * your GitHub user account. You can find this page by visiting Project Settings > Checkout SSH Keys
   * @returns any Error response.
   * @throws ApiError
   */
  public static createCheckoutKey({
    projectSlug,
    requestBody,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
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
   * Delete a checkout key
   * Deletes the checkout key via md5 or sha256 fingerprint. sha256 keys should be url-encoded.
   * @returns any A confirmation message.
   * @throws ApiError
   */
  public static deleteCheckoutKey({
    projectSlug,
    fingerprint,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
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
   * Returns an individual checkout key via md5 or sha256 fingerprint. sha256 keys should be url-encoded.
   * @returns any The checkout key.
   * @throws ApiError
   */
  public static getCheckoutKey({
    projectSlug,
    fingerprint,
  }: {
    /**
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    projectSlug: string;
    /**
     * An SSH key fingerprint.
     */
    fingerprint: string;
  }): CancelablePromise<{
    /**
     * The date and time the checkout key was created.
     */
    "created-at": string;
    /**
     * An SSH key fingerprint.
     */
    fingerprint: string;
    /**
     * A boolean value that indicates if this key is preferred.
     */
    preferred: boolean;
    /**
     * A public SSH key.
     */
    "public-key": string;
    /**
     * The type of checkout key. This may be either `deploy-key` or `github-user-key`.
     */
    type: "deploy-key" | "github-user-key";
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
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    projectSlug: string;
  }): CancelablePromise<{
    items: Array<{
      /**
       * The creation timestamp of the environment variable.
       */
      "created-at"?: any;
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
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
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
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
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
     * Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped. For projects that use GitLab or GitHub App, use `circleci` as the `vcs-slug`, replace `org-name` with the organization ID (found in Organization Settings), and replace `repo-name` with the project ID (found in Project Settings).
     */
    projectSlug: string;
    /**
     * The name of the environment variable.
     */
    name: string;
  }): CancelablePromise<{
    /**
     * The creation timestamp of the environment variable.
     */
    "created-at"?: any;
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
   * 🧪 Create a project
   * [__EXPERIMENTAL__]  Creates a new CircleCI project, and returns a list of the default advanced settings. Can only be called on a repo with a main branch and an existing config.yml file. Not yet available to projects that use GitLab or GitHub App.
   * @returns project_settings Successful response.
   * @throws ApiError
   */
  public static createProject({
    provider,
    organization,
    project,
  }: {
    /**
     * The `provider` segment of a project or org slug, the first of the three. This may be a VCS. For projects that use GitLab or GitHub App, use `circleci`.
     */
    provider: string;
    /**
     * The `organization` segment of a project or org slug, the second of the three. For GitHub OAuth or Bitbucket projects, this is the organization name. For projects that use GitLab or GitHub App, use the organization ID (found in Organization Settings).
     */
    organization: string;
    /**
     * The `project` segment of a project slug, the third of the three. For GitHub OAuth or Bitbucket projects, this is the repository name. For projects that use GitLab or GitHub App, use the project ID (found in Project Settings).
     */
    project: string;
  }): CancelablePromise<project_settings> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/project/{provider}/{organization}/{project}",
      path: {
        provider: provider,
        organization: organization,
        project: project,
      },
      errors: {
        400: `Unexpected request body provided.`,
        401: `Credentials provided are invalid.`,
        403: `None or insufficient credentials provided.`,
        404: `Either a branch or a project were not found.`,
        405: `Create projects using the API is currently supported for classic Github OAuth and Bitbucket projects only.`,
        429: `API rate limits exceeded.`,
        500: `Internal server error.`,
      },
    });
  }
  /**
   * 🧪 Get project settings
   * [__EXPERIMENTAL__] Returns a list of the advanced settings for a CircleCI project, whether enabled (true) or not (false).
   * @returns project_settings Successful response.
   * @throws ApiError
   */
  public static getProjectSettings({
    provider,
    organization,
    project,
  }: {
    /**
     * The `provider` segment of a project or org slug, the first of the three. This may be a VCS. For projects that use GitLab or GitHub App, use `circleci`.
     */
    provider: string;
    /**
     * The `organization` segment of a project or org slug, the second of the three. For GitHub OAuth or Bitbucket projects, this is the organization name. For projects that use GitLab or GitHub App, use the organization ID (found in Organization Settings).
     */
    organization: string;
    /**
     * The `project` segment of a project slug, the third of the three. For GitHub OAuth or Bitbucket projects, this is the repository name. For projects that use GitLab or GitHub App, use the project ID (found in Project Settings).
     */
    project: string;
  }): CancelablePromise<project_settings> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/project/{provider}/{organization}/{project}/settings",
      path: {
        provider: provider,
        organization: organization,
        project: project,
      },
      errors: {
        401: `Credentials provided are invalid.`,
        403: `None or insufficient credentials provided.`,
        404: `Insufficient credentials for a private project, OR the organization, project, or repository does not exist.`,
        429: `API rate limits exceeded.`,
        500: `Internal server error.`,
      },
    });
  }
  /**
   * 🧪 Update project settings
   * [__EXPERIMENTAL__] Updates one or more of the advanced settings for a CircleCI project.
   * @returns project_settings Successful response. Always includes the full advanced settings object. Returned even when the provided updates match the existing settings, but can also be returned when `oss: true` fails to set.
   * @throws ApiError
   */
  public static patchProjectSettings({
    provider,
    organization,
    project,
    requestBody,
  }: {
    /**
     * The `provider` segment of a project or org slug, the first of the three. This may be a VCS. For projects that use GitLab or GitHub App, use `circleci`.
     */
    provider: string;
    /**
     * The `organization` segment of a project or org slug, the second of the three. For GitHub OAuth or Bitbucket projects, this is the organization name. For projects that use GitLab or GitHub App, use the organization ID (found in Organization Settings).
     */
    organization: string;
    /**
     * The `project` segment of a project slug, the third of the three. For GitHub OAuth or Bitbucket projects, this is the repository name. For projects that use GitLab or GitHub App, use the project ID (found in Project Settings).
     */
    project: string;
    /**
     * The setting(s) to update, including one or more fields in the JSON object. Note that `oss: true` will only be set on projects whose underlying repositories are actually open source.
     */
    requestBody: project_settings;
  }): CancelablePromise<project_settings> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/project/{provider}/{organization}/{project}/settings",
      path: {
        provider: provider,
        organization: organization,
        project: project,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Request is malformed, e.g. with improperly encoded JSON`,
        401: `Credentials provided are invalid.`,
        403: `None or insufficient credentials provided.`,
        404: `Insufficient credentials for a private project, OR the organization, project, or repository does not exist.`,
        429: `API rate limits exceeded.`,
        500: `Internal server error.`,
      },
    });
  }
}
