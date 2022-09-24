import type { CancelablePromise } from "../core/CancelablePromise.ts";
import { OpenAPI } from "../core/OpenAPI.ts";
import { request as __request } from "../core/request.ts";
export class UserService {
  /**
   * User Information
   * Provides information about the user that is currently signed in.
   * @returns any User login information.
   * @throws ApiError
   */
  public static getCurrentUser(): CancelablePromise<{
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
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/me",
    });
  }
  /**
   * Collaborations
   * Provides the set of organizations of which a user is a member or a collaborator.
   *
   * The set of organizations that a user can collaborate on is composed of:
   *
   * * Organizations that the current user belongs to across VCS types (e.g. BitBucket, GitHub)
   * * The parent organization of repository that the user can collaborate on, but is not necessarily a member of
   * * The organization of the current user's account
   * @returns any Collaborations
   * @throws ApiError
   */
  public static getCollaborations(): CancelablePromise<
    Array<{
      /**
       * URL to the user's avatar on the VCS
       */
      avatar_url: string;
      /**
       * The UUID of the organization
       */
      id: string;
      /**
       * The name of the organization
       */
      name: string;
      /**
       * The slug of the organization
       */
      slug: string;
      /**
       * The VCS provider
       */
      "vcs-type": string;
    }>
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/me/collaborations",
    });
  }
  /**
   * User Information
   * Provides information about the user with the given ID.
   * @returns any User login information.
   * @throws ApiError
   */
  public static getUser({
    id,
  }: {
    /**
     * The unique ID of the user.
     */
    id: string;
  }): CancelablePromise<{
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
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/user/{id}",
      path: {
        id: id,
      },
    });
  }
}
