import { Command } from "./deps.ts";
import { workflow } from "./subCommands/workflow.ts";
import { ENV_CIRCLECI_TOKEN } from "./env.ts";
import { OpenAPI } from "./client/index.ts";
import packageJson from "./package.json" assert { type: "json" };

OpenAPI.HEADERS = {
  ...(ENV_CIRCLECI_TOKEN
    ? {
        authorization: `Basic ${ENV_CIRCLECI_TOKEN}`,
      }
    : {}),
};

await new Command()
  .name("circli")
  .version(packageJson.version)
  .description("circleci cli")
  .command("workflow", workflow)
  .parse(Deno.args);
