import { Command, Base64 } from "./deps.ts";
import { workflow, name as workflowName } from "./subCommands/workflow.ts";
import { pipeline, name as pipelineName } from "./subCommands/pipeline.ts";
import { ENV_CIRCLECI_TOKEN } from "./env.ts";
import { OpenAPI } from "./client/index.ts";
import packageJson from "./package.json" assert { type: "json" };

OpenAPI.HEADERS = {
  ...(ENV_CIRCLECI_TOKEN
    ? {
        authorization: `Basic ${Base64.encode(ENV_CIRCLECI_TOKEN)}`,
      }
    : {}),
};

await new Command()
  .name(packageJson.name)
  .version(packageJson.version)
  .description("circleci cli")
  .command(workflowName, workflow)
  .command(pipelineName, pipeline)
  .parse(Deno.args);
