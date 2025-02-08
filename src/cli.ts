import { Command } from "@cliffy/command";
import { pipelineCommand } from "./commands/pipeline";
//import { workflowCommand } from './commands/workflow';
//import { jobCommand } from './commands/job';
//import { contextCommand } from './commands/context';
//import { configCommand } from './commands/config';

export const cli = new Command()
  .name("circleci")
  .version("0.1.0")
  .description("Command line interface for CircleCI")
  .globalOption("--debug", "Enable debug logging") // global option として追加
  .command("pipeline", pipelineCommand);
//   .command('workflow', workflowCommand)
//   .command('job', jobCommand)
//   .command('context', contextCommand)
//   .command('config', configCommand)
