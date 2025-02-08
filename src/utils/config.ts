// src/utils/config.ts
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { homedir } from "node:os";
import { ok, err, Result } from "neverthrow";
import { parse, stringify } from "yaml";

const CONFIG_PATH = `${homedir()}/.circleci/config.yml`;

export interface CircleCIConfig {
  apiToken?: string;
  defaultProjectSlug?: string; // 例: gh/CircleCI-Public/api-preview-docs
}

export async function loadConfig(): Promise<Result<CircleCIConfig, Error>> {
  try {
    const configContent = await readFile(CONFIG_PATH, "utf-8");
    return ok(parse(configContent) as CircleCIConfig);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      // 設定ファイルがない場合は空の設定を返す
      return ok({});
    }
    return err(error);
  }
}

export async function saveConfig(
  config: CircleCIConfig,
): Promise<Result<null, Error>> {
  try {
    const dir = dirname(CONFIG_PATH);
    await mkdir(dir, { recursive: true });
    await writeFile(CONFIG_PATH, stringify(config), "utf-8");
    return ok(null);
  } catch (error: any) {
    return err(error);
  }
}

export async function setConfigValue(
  key: keyof CircleCIConfig,
  value: string,
): Promise<Result<null, Error>> {
  const configResult = await loadConfig();

  if (configResult.isErr()) {
    return err(configResult.error);
  }

  const config = configResult.value;

  if (Object.hasOwn(config, key)) {
    config[key] = value;
    return await saveConfig(config);
  }
  return err(new Error(`Invalid config key: ${key}`));
}
