import type { CancelablePromise } from "../core/CancelablePromise.ts";
import { OpenAPI } from "../core/OpenAPI.ts";
import { request as __request } from "../core/request.ts";
export class WebhookService {
  /**
   * List webhooks
   * Get a list of outbound webhooks that match the given scope-type and scope-id
   * @returns any A list of webhooks
   * @throws ApiError
   */
  public static getWebhooks({
    scopeId,
    scopeType,
  }: {
    /**
     * ID of the scope being used (at the moment, only project ID is supported)
     */
    scopeId: string;
    /**
     * Type of the scope being used
     */
    scopeType: "project";
  }): CancelablePromise<{
    items: Array<{
      /**
       * The date and time the webhook was created.
       */
      "created-at": string;
      /**
       * Events that will trigger the webhook
       */
      events: Array<"workflow-completed" | "job-completed">;
      /**
       * The unique ID of the webhook
       */
      id: string;
      /**
       * Name of the webhook
       */
      name: string;
      /**
       * The scope in which the relevant events that will trigger webhooks
       */
      scope: {
        /**
         * ID of the scope being used (at the moment, only project ID is supported)
         */
        id: string;
        /**
         * Type of the scope being used
         */
        type: string;
      };
      /**
       * Masked value of the secret used to build an HMAC hash of the payload and passed as a header in the webhook request
       */
      "signing-secret": string;
      /**
       * The date and time the webhook was last updated.
       */
      "updated-at": string;
      /**
       * URL to deliver the webhook to. Note: protocol must be included as well (only https is supported)
       */
      url: string;
      /**
       * Whether to enforce TLS certificate verification when delivering the webhook
       */
      "verify-tls": boolean;
    }>;
    /**
     * A token to pass as a `page-token` query parameter to return the next page of results.
     */
    next_page_token: string;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/webhook",
      query: {
        "scope-id": scopeId,
        "scope-type": scopeType,
      },
    });
  }
  /**
   * Create an outbound webhook
   * Creates an outbound webhook.
   * @returns any Error response.
   * @throws ApiError
   */
  public static createWebhook({
    requestBody,
  }: {
    requestBody?: {
      /**
       * Events that will trigger the webhook
       */
      events: Array<"workflow-completed" | "job-completed">;
      /**
       * Name of the webhook
       */
      name: string;
      /**
       * The scope in which the relevant events that will trigger webhooks
       */
      scope: {
        /**
         * ID of the scope being used (at the moment, only project ID is supported)
         */
        id: string;
        /**
         * Type of the scope being used
         */
        type: "project";
      };
      /**
       * Secret used to build an HMAC hash of the payload and passed as a header in the webhook request
       */
      "signing-secret": string;
      /**
       * URL to deliver the webhook to. Note: protocol must be included as well (only https is supported)
       */
      url: string;
      /**
       * Whether to enforce TLS certificate verification when delivering the webhook
       */
      "verify-tls": boolean;
    };
  }): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/webhook",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Delete an outbound webhook
   * Deletes an outbound webhook
   * @returns any A confirmation message
   * @throws ApiError
   */
  public static deleteWebhook({
    webhookId,
  }: {
    /**
     * ID of the webhook (UUID)
     */
    webhookId: string;
  }): CancelablePromise<{
    /**
     * A human-readable message
     */
    message: string;
  }> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/webhook/{webhook-id}",
      path: {
        "webhook-id": webhookId,
      },
    });
  }
  /**
   * Get a webhook
   * Get an outbound webhook by id.
   * @returns any A webhook
   * @throws ApiError
   */
  public static getWebhookById({
    webhookId,
  }: {
    /**
     * ID of the webhook (UUID)
     */
    webhookId: string;
  }): CancelablePromise<{
    /**
     * The date and time the webhook was created.
     */
    "created-at": string;
    /**
     * Events that will trigger the webhook
     */
    events: Array<"workflow-completed" | "job-completed">;
    /**
     * The unique ID of the webhook
     */
    id: string;
    /**
     * Name of the webhook
     */
    name: string;
    /**
     * The scope in which the relevant events that will trigger webhooks
     */
    scope: {
      /**
       * ID of the scope being used (at the moment, only project ID is supported)
       */
      id: string;
      /**
       * Type of the scope being used
       */
      type: string;
    };
    /**
     * Masked value of the secret used to build an HMAC hash of the payload and passed as a header in the webhook request
     */
    "signing-secret": string;
    /**
     * The date and time the webhook was last updated.
     */
    "updated-at": string;
    /**
     * URL to deliver the webhook to. Note: protocol must be included as well (only https is supported)
     */
    url: string;
    /**
     * Whether to enforce TLS certificate verification when delivering the webhook
     */
    "verify-tls": boolean;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/webhook/{webhook-id}",
      path: {
        "webhook-id": webhookId,
      },
    });
  }
  /**
   * Update an outbound webhook
   * Updates an outbound webhook.
   * @returns any A webhook
   * @throws ApiError
   */
  public static updateWebhook({
    webhookId,
    requestBody,
  }: {
    /**
     * ID of the webhook (UUID)
     */
    webhookId: string;
    requestBody?: {
      /**
       * Events that will trigger the webhook
       */
      events?: Array<"workflow-completed" | "job-completed">;
      /**
       * Name of the webhook
       */
      name?: string;
      /**
       * Secret used to build an HMAC hash of the payload and passed as a header in the webhook request
       */
      "signing-secret"?: string;
      /**
       * URL to deliver the webhook to. Note: protocol must be included as well (only https is supported)
       */
      url?: string;
      /**
       * Whether to enforce TLS certificate verification when delivering the webhook
       */
      "verify-tls"?: boolean;
    };
  }): CancelablePromise<{
    /**
     * The date and time the webhook was created.
     */
    "created-at": string;
    /**
     * Events that will trigger the webhook
     */
    events: Array<"workflow-completed" | "job-completed">;
    /**
     * The unique ID of the webhook
     */
    id: string;
    /**
     * Name of the webhook
     */
    name: string;
    /**
     * The scope in which the relevant events that will trigger webhooks
     */
    scope: {
      /**
       * ID of the scope being used (at the moment, only project ID is supported)
       */
      id: string;
      /**
       * Type of the scope being used
       */
      type: string;
    };
    /**
     * Masked value of the secret used to build an HMAC hash of the payload and passed as a header in the webhook request
     */
    "signing-secret": string;
    /**
     * The date and time the webhook was last updated.
     */
    "updated-at": string;
    /**
     * URL to deliver the webhook to. Note: protocol must be included as well (only https is supported)
     */
    url: string;
    /**
     * Whether to enforce TLS certificate verification when delivering the webhook
     */
    "verify-tls": boolean;
  }> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/webhook/{webhook-id}",
      path: {
        "webhook-id": webhookId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
