// src/utils/api.ts
import OpenAPIClientAxios, { type ClientOptions } from 'openapi-fetch';
import { type paths } from '../types/circleci';  // 生成された型
import { loadConfig } from './config';
import { err, ok, type Result } from 'neverthrow';

export type CircleCIClient = OpenAPIClientAxios<paths>; // Corrected type definition


export async function createClient(): Promise<Result<CircleCIClient, Error>> {
  const configResult = await loadConfig();
  if (configResult.isErr()) {
    return err(new Error(`Failed to load config: ${configResult.error}`));
  }

  const config = configResult.value;
  const token = config.apiToken;

  if (!token) {
    return err(new Error("API token not found. Please set it using `circleci config set api-token <token>`"));
  }

  const options: ClientOptions = {
    baseUrl: 'https://circleci.com/api/v2',
      headers: {
        'Circle-Token': token,
      },
  }

  const client = new OpenAPIClientAxios({ definition: 'openapi.json', ...options });

  return ok(client as CircleCIClient);
}
