import type { CancelablePromise } from "../core/CancelablePromise.ts";
import { OpenAPI } from "../core/OpenAPI.ts";
import { request as __request } from "../core/request.ts";
export class ContextService {
  /**
   * Create a new context
   * @returns any The new context
   * @throws ApiError
   */
  public static createContext({
    requestBody,
  }: {
    requestBody?: {
      /**
       * The user defined name of the context.
       */
      name: string;
      owner:
        | {
            /**
             * The unique ID of the owner of the context. Specify either this or slug.
             */
            id: string;
            /**
             * The type of the owner. Defaults to "organization". Accounts are only used as context owners in server.
             */
            type?: "account" | "organization";
          }
        | {
            /**
             * A string that represents an organization. Specify either this or id. Cannot be used for accounts.
             */
            slug: string;
            /**
             * The type of owner. Defaults to "organization". Accounts are only used as context owners in server and must be specified by an id instead of a slug.
             */
            type?: "organization";
          };
    };
  }): CancelablePromise<{
    /**
     * The unique ID of the context.
     */
    id: string;
    /**
     * The user defined name of the context.
     */
    name: string;
    /**
     * The date and time the context was created.
     */
    created_at: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/context",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * List contexts
   * List all contexts for an owner.
   * @returns any A paginated list of contexts
   * @throws ApiError
   */
  public static listContexts({
    ownerId,
    ownerSlug,
    ownerType,
    pageToken,
  }: {
    /** The unique ID of the owner of the context. Specify either this or owner-slug. **/
    ownerId?: string;
    /** A string that represents an organization. Specify either this or owner-id. Cannot be used for accounts. **/
    ownerSlug?: string;
    /** The type of the owner. Defaults to "organization". Accounts are only used as context owners in server. **/
    ownerType?: "account" | "organization";
    /** A token to retrieve the next page of results. **/
    pageToken?: string;
  }): CancelablePromise<{
    items: Array<{
      /**
       * The unique ID of the context.
       */
      id: string;
      /**
       * The user defined name of the context.
       */
      name: string;
      /**
       * The date and time the context was created.
       */
      created_at: string;
    }>;
    /**
     * A token to pass as a `page-token` query parameter to return the next page of results.
     */
    next_page_token: string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/context",
      query: {
        "owner-id": ownerId,
        "owner-slug": ownerSlug,
        "owner-type": ownerType,
        "page-token": pageToken,
      },
    });
  }
  /**
   * Get a context
   * Returns basic information about a context.
   * @returns any The context
   * @throws ApiError
   */
  public static getContext({
    contextId,
  }: {
    /** ID of the context (UUID) **/
    contextId: string;
  }): CancelablePromise<{
    /**
     * The unique ID of the context.
     */
    id: string;
    /**
     * The user defined name of the context.
     */
    name: string;
    /**
     * The date and time the context was created.
     */
    created_at: string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/context/{context-id}",
      path: {
        "context-id": contextId,
      },
    });
  }
  /**
   * Delete a context
   * @returns any A confirmation message
   * @throws ApiError
   */
  public static deleteContext({
    contextId,
  }: {
    /** ID of the context (UUID) **/
    contextId: string;
  }): CancelablePromise<{
    /**
     * A human-readable message
     */
    message: string;
  }> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/context/{context-id}",
      path: {
        "context-id": contextId,
      },
    });
  }
  /**
   * List environment variables
   * List information about environment variables in a context, not including their values.
   * @returns any A paginated list of environment variables
   * @throws ApiError
   */
  public static listEnvironmentVariablesFromContext({
    contextId,
  }: {
    /** ID of the context (UUID) **/
    contextId: string;
  }): CancelablePromise<{
    items: Array<{
      /**
       * The name of the environment variable
       */
      variable: string;
      /**
       * The date and time the environment variable was created.
       */
      created_at: string;
      /**
       * ID of the context (UUID)
       */
      context_id: string;
    }>;
    /**
     * A token to pass as a `page-token` query parameter to return the next page of results.
     */
    next_page_token: string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/context/{context-id}/environment-variable",
      path: {
        "context-id": contextId,
      },
    });
  }
  /**
   * Remove an environment variable
   * Delete an environment variable from a context.
   * @returns any A confirmation message
   * @throws ApiError
   */
  public static deleteEnvironmentVariableFromContext({
    envVarName,
    contextId,
  }: {
    /** The name of the environment variable **/
    envVarName: string;
    /** ID of the context (UUID) **/
    contextId: string;
  }): CancelablePromise<{
    /**
     * A human-readable message
     */
    message: string;
  }> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/context/{context-id}/environment-variable/{env-var-name}",
      path: {
        "env-var-name": envVarName,
        "context-id": contextId,
      },
    });
  }
  /**
   * Add or update an environment variable
   * Create or update an environment variable within a context. Returns information about the environment variable, not including its value.
   * @returns any The new environment variable
   * @throws ApiError
   */
  public static addEnvironmentVariableToContext({
    contextId,
    envVarName,
    requestBody,
  }: {
    /** ID of the context (UUID) **/
    contextId: string;
    /** The name of the environment variable **/
    envVarName: string;
    requestBody?: {
      /**
       * The value of the environment variable
       */
      value: string;
    };
  }): CancelablePromise<
    | {
        /**
         * The name of the environment variable
         */
        variable: string;
        /**
         * The date and time the environment variable was created.
         */
        created_at: string;
        /**
         * ID of the context (UUID)
         */
        context_id: string;
      }
    | {
        /**
         * A human-readable message
         */
        message: string;
      }
  > {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/context/{context-id}/environment-variable/{env-var-name}",
      path: {
        "context-id": contextId,
        "env-var-name": envVarName,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
