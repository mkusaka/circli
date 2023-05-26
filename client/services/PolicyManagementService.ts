import type { BundleDiff } from "../models/BundleDiff.ts";
import type { BundlePayload } from "../models/BundlePayload.ts";
import type { Decision } from "../models/Decision.ts";
import type { DecisionLog } from "../models/DecisionLog.ts";
import type { DecisionSettings } from "../models/DecisionSettings.ts";
import type { Policy } from "../models/Policy.ts";
import type { PolicyBundle } from "../models/PolicyBundle.ts";
import type { CancelablePromise } from "../core/CancelablePromise.ts";
import { OpenAPI } from "../core/OpenAPI.ts";
import { request as __request } from "../core/request.ts";
export class PolicyManagementService {
  /**
   * Retrieves the owner's decision audit logs.
   * This endpoint will return a list of decision audit logs that were made using this owner's policies.
   * @returns DecisionLog Decision logs successfully retrieved.
   * @throws ApiError
   */
  public static getDecisionLogs({
    ownerId,
    context,
    status,
    after,
    before,
    branch,
    projectId,
    offset,
  }: {
    ownerId: string;
    context: string;
    /**
     * Return decisions matching this decision status.
     */
    status?: string;
    /**
     * Return decisions made after this date.
     */
    after?: string;
    /**
     * Return decisions made before this date.
     */
    before?: string;
    /**
     * Return decisions made on this branch.
     */
    branch?: string;
    /**
     * Return decisions made for this project.
     */
    projectId?: string;
    /**
     * Sets the offset when retrieving the decisions, for paging.
     */
    offset?: number;
  }): CancelablePromise<Array<DecisionLog>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/owner/{ownerID}/context/{context}/decision",
      path: {
        ownerID: ownerId,
        context: context,
      },
      query: {
        status: status,
        after: after,
        before: before,
        branch: branch,
        project_id: projectId,
        offset: offset,
      },
      errors: {
        400: `The request is malformed (e.g, a given path parameter is invalid)
        `,
        401: `The request is unauthorized
        `,
        403: `The user is forbidden from making this request
        `,
        500: `Something unexpected happened on the server.`,
      },
    });
  }
  /**
   * Makes a decision
   * This endpoint will evaluate input data (config+metadata) against owner's stored policies and return a decision.
   * @returns Decision Decision rendered by applying the policy against the provided data. Response will be modeled by the data and rego processed.
   * @throws ApiError
   */
  public static makeDecision({
    ownerId,
    context,
    requestBody,
  }: {
    ownerId: string;
    context: string;
    requestBody?: {
      input: string;
      metadata?: any;
    };
  }): CancelablePromise<Decision> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/owner/{ownerID}/context/{context}/decision",
      path: {
        ownerID: ownerId,
        context: context,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `The request is malformed
        `,
        401: `The request is unauthorized
        `,
        500: `Something unexpected happened on the server.`,
      },
    });
  }
  /**
   * Get the decision settings
   * This endpoint retrieves the current decision settings (eg enable/disable policy evaluation)
   * @returns DecisionSettings Decision settings successfully retrieved.
   * @throws ApiError
   */
  public static getDecisionSettings({
    ownerId,
    context,
  }: {
    ownerId: string;
    context: string;
  }): CancelablePromise<DecisionSettings> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/owner/{ownerID}/context/{context}/decision/settings",
      path: {
        ownerID: ownerId,
        context: context,
      },
      errors: {
        400: `The request is malformed (e.g, a given path parameter is invalid)
        `,
        401: `The request is unauthorized
        `,
        403: `The user is forbidden from making this request
        `,
        500: `Something unexpected happened on the server.`,
      },
    });
  }
  /**
   * Set the decision settings
   * This endpoint allows modifying decision settings (eg enable/disable policy evaluation)
   * @returns DecisionSettings Decision settings successfully set.
   * @throws ApiError
   */
  public static setDecisionSettings({
    ownerId,
    context,
    requestBody,
  }: {
    ownerId: string;
    context: string;
    requestBody?: DecisionSettings;
  }): CancelablePromise<DecisionSettings> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/owner/{ownerID}/context/{context}/decision/settings",
      path: {
        ownerID: ownerId,
        context: context,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `The request is malformed (e.g, a given path parameter is invalid)
        `,
        401: `The request is unauthorized
        `,
        403: `The user is forbidden from making this request
        `,
        500: `Something unexpected happened on the server.`,
      },
    });
  }
  /**
   * Retrieves the owner's decision audit log by given decisionID
   * This endpoint will retrieve a decision for a given decision log ID
   * @returns DecisionLog Decision log successfully retrieved.
   * @throws ApiError
   */
  public static getDecisionLog({
    ownerId,
    context,
    decisionId,
  }: {
    ownerId: string;
    context: string;
    decisionId: string;
  }): CancelablePromise<DecisionLog> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/owner/{ownerID}/context/{context}/decision/{decisionID}",
      path: {
        ownerID: ownerId,
        context: context,
        decisionID: decisionId,
      },
      errors: {
        400: `The request is malformed (e.g, a given path parameter is invalid)
        `,
        401: `The request is unauthorized
        `,
        403: `The user is forbidden from making this request
        `,
        404: `There was no decision log found for given decision_id, and owner_id.
        `,
        500: `Something unexpected happened on the server.`,
      },
    });
  }
  /**
   * Retrieves Policy Bundle for a given decision log ID
   * This endpoint will retrieve a policy bundle for a given decision log ID
   * @returns PolicyBundle Policy-Bundle retrieved successfully for given decision log ID
   * @throws ApiError
   */
  public static getDecisionLogPolicyBundle({
    ownerId,
    context,
    decisionId,
  }: {
    ownerId: string;
    context: string;
    decisionId: string;
  }): CancelablePromise<PolicyBundle> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/owner/{ownerID}/context/{context}/decision/{decisionID}/policy-bundle",
      path: {
        ownerID: ownerId,
        context: context,
        decisionID: decisionId,
      },
      errors: {
        400: `The request is malformed (e.g, a given path parameter is invalid)
        `,
        401: `The request is unauthorized
        `,
        403: `The user is forbidden from making this request
        `,
        404: `There was no decision log found for given decision_id, and owner_id.
        `,
        500: `Something unexpected happened on the server.`,
      },
    });
  }
  /**
   * Retrieves Policy Bundle
   * This endpoint will retrieve a policy bundle
   * @returns PolicyBundle Policy-Bundle retrieved successfully.
   * @throws ApiError
   */
  public static getPolicyBundle({
    ownerId,
    context,
  }: {
    ownerId: string;
    context: string;
  }): CancelablePromise<PolicyBundle> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/owner/{ownerID}/context/{context}/policy-bundle",
      path: {
        ownerID: ownerId,
        context: context,
      },
      errors: {
        400: `The request is malformed (e.g, a given path parameter is invalid)
        `,
        401: `The request is unauthorized
        `,
        403: `The user is forbidden from making this request
        `,
        500: `Something unexpected happened on the server.`,
      },
    });
  }
  /**
   * Creates policy bundle for the context
   * This endpoint replaces the current policy bundle with the provided policy bundle
   * @returns BundleDiff Policy-Bundle diff successfully returned.
   * @throws ApiError
   */
  public static createPolicyBundle({
    ownerId,
    context,
    dry,
    requestBody,
  }: {
    ownerId: string;
    context: string;
    dry?: boolean;
    requestBody?: BundlePayload;
  }): CancelablePromise<BundleDiff> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/owner/{ownerID}/context/{context}/policy-bundle",
      path: {
        ownerID: ownerId,
        context: context,
      },
      query: {
        dry: dry,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `The request is malformed (e.g, a given path parameter is invalid)
        `,
        401: `The request is unauthorized
        `,
        403: `The user is forbidden from making this request
        `,
        413: `The request exceeds the maximum payload size for policy bundles ~2.5Mib
        `,
        500: `Something unexpected happened on the server.`,
      },
    });
  }
  /**
   * Retrieves a policy document
   * This endpoint will retrieve a policy document.
   * @returns Policy Policy retrieved successfully.
   * @throws ApiError
   */
  public static getPolicyDocument({
    ownerId,
    context,
    policyName,
  }: {
    ownerId: string;
    context: string;
    /**
     * the policy name set by the rego policy_name rule
     */
    policyName: string;
  }): CancelablePromise<Policy> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/owner/{ownerID}/context/{context}/policy-bundle/{policyName}",
      path: {
        ownerID: ownerId,
        context: context,
        policyName: policyName,
      },
      errors: {
        400: `The request is malformed (e.g, a given path parameter is invalid)
        `,
        401: `The request is unauthorized
        `,
        403: `The user is forbidden from making this request
        `,
        404: `There was no policy that was found with the given owner_id and policy name.
        `,
        500: `Something unexpected happened on the server.`,
      },
    });
  }
}
