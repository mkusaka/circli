import { Command } from "./deps.ts";
import { workflow } from "./subCommands/workflow.ts";

await new Command()
  .name("circli")
  .version("0.0.1")
  .description("circleci cli")
  .command("workflow", workflow)
  .parse(Deno.args);
