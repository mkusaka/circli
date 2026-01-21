// src/cli.ts
import { Command } from "@cliffy/command";
import { pipelineCommand } from "./commands/pipeline.js";
import { configCommand } from "./commands/config.js";
import { workflowCommand } from "./commands/workflow.js";
import { jobCommand } from "./commands/job.js";
import { contextCommand } from "./commands/context.js";
import { projectCommand } from "./commands/project.js";
import { scheduleCommand } from "./commands/schedule.js";
import { insightsCommand } from "./commands/insights.js";
import { policyCommand } from "./commands/policy.js";
import { webhookCommand } from "./commands/webhook.js";
import { userCommand } from "./commands/user.js";
import { oidcCommand } from "./commands/oidc.js";
import { usageCommand } from "./commands/usage.js";

export const cli = new Command()
  .name("circleci")
  .version("0.1.0")
  .description("Command line interface for CircleCI")
  .globalOption("--debug", "Enable debug logging")
  .command("config", configCommand)
  .command("pipeline", pipelineCommand)
  .command("workflow", workflowCommand)
  .command("job", jobCommand)
  .command("context", contextCommand)
  .command("project", projectCommand)
  .command("schedule", scheduleCommand)
  .command("insights", insightsCommand)
  .command("policy", policyCommand)
  .command("webhook", webhookCommand)
  .command("user", userCommand)
  .command("oidc", oidcCommand)
  .command("usage", usageCommand);
