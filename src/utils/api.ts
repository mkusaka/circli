import createCircleClient from "openapi-fetch"; // using default export
import type { paths } from "../types/circleci.js";
import { loadConfig } from "./config.js";
import { err, ok, type Result } from "neverthrow";

export type CircleCIClient = ReturnType<typeof createCircleClient<paths>>; // Client type

export async function createClient(): Promise<Result<CircleCIClient, Error>> {
  const configResult = await loadConfig();
  if (configResult.isErr()) {
    return err(new Error(`Failed to load config: ${configResult.error}`));
  }

  const config = configResult.value;
  const token = config.apiToken;

  if (!token) {
    return err(
      new Error("API token not found. Please set it using `circleci config set api-token <token>`"),
    );
  }

  const client = createCircleClient<paths>({
    baseUrl: "https://circleci.com/api/v2",
    headers: {
      "Circle-Token": token,
    },
  });

  return ok(client);
}
