import type { ClaimResponse } from "../models/ClaimResponse.ts";
import type { PatchClaimsRequest } from "../models/PatchClaimsRequest.ts";
import type { CancelablePromise } from "../core/CancelablePromise.ts";
import { OpenAPI } from "../core/OpenAPI.ts";
import { request as __request } from "../core/request.ts";
export class OidcTokenManagementService {
  /**
   * Delete org-level claims
   * Deletes org-level custom claims of OIDC identity tokens
   * @returns ClaimResponse Claims successfully deleted.
   * @throws ApiError
   */
  public static deleteOrgClaims({
    orgId,
    claims,
  }: {
    orgId: string;
    /**
     * comma separated list of claims to delete. Valid values are "audience" and "ttl".
     */
    claims: string;
  }): CancelablePromise<ClaimResponse> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/org/{orgID}/oidc-custom-claims",
      path: {
        orgID: orgId,
      },
      query: {
        claims: claims,
      },
      errors: {
        400: `The request is malformed (e.g, a given path parameter is invalid)
        `,
        403: `The user is forbidden from making this request
        `,
        500: `Something unexpected happened on the server.`,
      },
    });
  }
  /**
   * Get org-level claims
   * Fetches org-level custom claims of OIDC identity tokens
   * @returns ClaimResponse Claims successfully fetched.
   * @throws ApiError
   */
  public static getOrgClaims({
    orgId,
  }: {
    orgId: string;
  }): CancelablePromise<ClaimResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/org/{orgID}/oidc-custom-claims",
      path: {
        orgID: orgId,
      },
      errors: {
        400: `The request is malformed (e.g, a given path parameter is invalid)
        `,
        403: `The user is forbidden from making this request
        `,
        500: `Something unexpected happened on the server.`,
      },
    });
  }
  /**
   * Patch org-level claims
   * Creates/Updates org-level custom claims of OIDC identity tokens
   * @returns ClaimResponse Claims successfully patched.
   * @throws ApiError
   */
  public static patchOrgClaims({
    orgId,
    requestBody,
  }: {
    orgId: string;
    requestBody?: PatchClaimsRequest;
  }): CancelablePromise<ClaimResponse> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/org/{orgID}/oidc-custom-claims",
      path: {
        orgID: orgId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `The request is malformed (e.g, a given path parameter is invalid)
        `,
        403: `The user is forbidden from making this request
        `,
        500: `Something unexpected happened on the server.`,
      },
    });
  }
  /**
   * Delete project-level claims
   * Deletes project-level custom claims of OIDC identity tokens
   * @returns ClaimResponse Claims successfully deleted.
   * @throws ApiError
   */
  public static deleteProjectClaims({
    orgId,
    projectId,
    claims,
  }: {
    orgId: string;
    projectId: string;
    /**
     * comma separated list of claims to delete. Valid values are "audience" and "ttl".
     */
    claims: string;
  }): CancelablePromise<ClaimResponse> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/org/{orgID}/project/{projectID}/oidc-custom-claims",
      path: {
        orgID: orgId,
        projectID: projectId,
      },
      query: {
        claims: claims,
      },
      errors: {
        400: `The request is malformed (e.g, a given path parameter is invalid)
        `,
        403: `The user is forbidden from making this request
        `,
        500: `Something unexpected happened on the server.`,
      },
    });
  }
  /**
   * Get project-level claims
   * Fetches project-level custom claims of OIDC identity tokens
   * @returns ClaimResponse Claims successfully fetched.
   * @throws ApiError
   */
  public static getProjectClaims({
    orgId,
    projectId,
  }: {
    orgId: string;
    projectId: string;
  }): CancelablePromise<ClaimResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/org/{orgID}/project/{projectID}/oidc-custom-claims",
      path: {
        orgID: orgId,
        projectID: projectId,
      },
      errors: {
        400: `The request is malformed (e.g, a given path parameter is invalid)
        `,
        403: `The user is forbidden from making this request
        `,
        500: `Something unexpected happened on the server.`,
      },
    });
  }
  /**
   * Patch project-level claims
   * Creates/Updates project-level custom claims of OIDC identity tokens
   * @returns ClaimResponse Claims successfully patched.
   * @throws ApiError
   */
  public static patchProjectClaims({
    orgId,
    projectId,
    requestBody,
  }: {
    orgId: string;
    projectId: string;
    requestBody?: PatchClaimsRequest;
  }): CancelablePromise<ClaimResponse> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/org/{orgID}/project/{projectID}/oidc-custom-claims",
      path: {
        orgID: orgId,
        projectID: projectId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `The request is malformed (e.g, a given path parameter is invalid)
        `,
        403: `The user is forbidden from making this request
        `,
        500: `Something unexpected happened on the server.`,
      },
    });
  }
}
