import { Command } from "./deps.ts";
import { workflow } from "./subCommands/workflow.ts";
import { ENV_CIRCLECI_TOKEN } from "./env.ts";
import { OpenAPI } from "./client/index.ts";

OpenAPI.HEADERS = {
  ...(ENV_CIRCLECI_TOKEN
    ? {
        "Circle-Token": ENV_CIRCLECI_TOKEN,
      }
    : {}),
};

await new Command()
  .name("circli")
  .version("0.0.1")
  .description("circleci cli")
  .command("workflow", workflow)
  .parse(Deno.args);
