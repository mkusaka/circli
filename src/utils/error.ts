// src/utils/error.ts

// Common error handling and error message definitions

export class APIError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly originalError?: Error,
  ) {
    super(message);
    this.name = "APIError";
  }
}

export function handleApiError(error: unknown): APIError {
  // Check error type and generate appropriate error message
  if (error instanceof Error) {
    return new APIError(error.message, undefined, error);
  }
  return new APIError("Unknown Error");
}
