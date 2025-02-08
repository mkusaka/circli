// src/commands/config.ts
import { Command } from "@cliffy/command";
import { z } from "zod";
import { setConfigValue } from "../utils/config.js";

// Define configurable keys and their descriptions
const CONFIGURABLE_KEYS = {
  "api-token": "CircleCI API token for authentication",
  // Add more configuration keys here as needed
} as const;

type ConfigKey = keyof typeof CONFIGURABLE_KEYS;

export const configCommand = new Command()
  .name("config")
  .description("Manage CircleCI CLI configuration")
  .command(
    "set",
    `Set configuration values\n\nAvailable keys:\n${Object.entries(CONFIGURABLE_KEYS)
      .map(([key, desc]) => `  ${key}: ${desc}`)
      .join("\n")}`,
  )
  .arguments("<key:string> <value:string>")
  .action(async (options, key: string, value: string) => {
    // Validate the key
    if (!Object.keys(CONFIGURABLE_KEYS).includes(key)) {
      console.error(
        `Invalid key: ${key}\nAvailable keys: ${Object.keys(CONFIGURABLE_KEYS).join(
          ", ",
        )}`,
      );
      process.exit(1);
    }

    if (key === "api-token") {
      const result = await setConfigValue("apiToken", value);
      if (result.isErr()) {
        console.error(`Failed to set API token: ${result.error.message}`);
        process.exit(1);
      }
      console.log("API token has been set successfully");
    }
  });
