// src/cli.ts
import { Command } from "@cliffy/command";
import { pipelineCommand } from "./commands/pipeline.js";
import { configCommand } from "./commands/config.js";
//import { workflowCommand } from './commands/workflow';
//import { jobCommand } from './commands/job';
//import { contextCommand } from './commands/context';

export const cli = new Command()
  .name("circleci")
  .version("0.1.0")
  .description("Command line interface for CircleCI")
  .globalOption("--debug", "Enable debug logging") // global option として追加
  .command("pipeline", pipelineCommand)
  .command("config", configCommand);
//   .command('workflow', workflowCommand)
//   .command('job', jobCommand)
//   .command('context', contextCommand)
