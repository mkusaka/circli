// src/utils/error.ts

// 共通のエラー処理や、特定のエラーメッセージの定義

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
  // AxiosError などの型をチェックして、適切なエラーメッセージを生成
  if (error instanceof Error) {
    return new APIError(error.message, undefined, error);
  }
  return new APIError("Unknown Error");
}
