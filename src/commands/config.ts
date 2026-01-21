// src/commands/config.ts
import { Command } from "@cliffy/command";
import { z } from "zod";
import { setConfigValue } from "../utils/config.js";

// Map CLI keys to config keys with descriptions
const CONFIG_KEY_MAP = {
  "api-token": {
    configKey: "apiToken",
    description: "CircleCI API token for authentication",
  },
} as const;

// Zod schema for command input
const SetConfigSchema = z.object({
  key: z.enum(Object.keys(CONFIG_KEY_MAP) as [keyof typeof CONFIG_KEY_MAP]),
  value: z.string().min(1, "Value cannot be empty"),
});

export const configCommand = new Command()
  .name("config")
  .description("Manage CircleCI CLI configuration")
  .command("set")
  .description(
    `Set configuration values\n\nAvailable keys:\n${Object.entries(
      CONFIG_KEY_MAP,
    )
      .map(([key, { description }]) => `  ${key}: ${description}`)
      .join("\n")}`,
  )
  .arguments("<key:string> <value:string>")
  .complete("key", () => Object.keys(CONFIG_KEY_MAP))
  .action(async (options, key: string, value: string) => {
    const result = SetConfigSchema.safeParse({ key, value });
    if (!result.success) {
      console.error(result.error.issues.map((i) => i.message).join("\n"));
      process.exit(1);
    }

    const configKey = CONFIG_KEY_MAP[result.data.key].configKey;
    const setResult = await setConfigValue(configKey, result.data.value);

    if (setResult.isErr()) {
      console.error(`Failed to set ${key}: ${setResult.error.message}`);
      process.exit(1);
    }

    console.log(`${key} has been set successfully`);
  });
