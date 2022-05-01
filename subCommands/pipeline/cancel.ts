import { Base64, Command } from "../../deps.ts";
import { ENV_CIRCLE_WORKFLOW_ID, ENV_CIRCLECI_TOKEN } from "../../env.ts";
import { isStringOrThrow } from "../../helper.ts";
import * as client from "../../client/index.ts";
import { logger } from "../../logger.ts";

export const handler = async (options: {
  workflowId: string;
  token?: string | undefined;
}) => {
  if (options.token) {
    client.OpenAPI.HEADERS = {
      authorization: `Basic ${Base64.encode(options.token)}`,
    };
  }

  logger.debug({ name: "log", value: "request started" });
  logger.info({ name: "workflowId", value: options.workflowId });

  const workflow = await client.WorkflowService.getWorkflowById({
    id: options.workflowId,
  });

  const pipelineId = workflow.pipeline_id;

  const workflows = await client.PipelineService.listWorkflowsByPipelineId({
    pipelineId,
  });

  const nonCanceledWorkflows = workflows.items.filter(
    (workflow) => workflow.status === "running" || workflow.status === "on_hold"
  );

  await Promise.all(
    nonCanceledWorkflows.map((workflow) => {
      return client.WorkflowService.cancelWorkflow({
        id: workflow.id,
      });
    })
  );

  logger.debug({ name: "log", value: "request finished" });
};

const defaultOrRequiredToken = () => {
  if (ENV_CIRCLECI_TOKEN) {
    return {
      default: function CIRCLECI_TOKEN() {
        return ENV_CIRCLECI_TOKEN;
      },
    } as const;
  }
  return {
    required: true,
  } as const;
};

const defaultOrRequiredWorkflowId = () => {
  if (ENV_CIRCLE_WORKFLOW_ID) {
    return {
      default: function WORKFLOW_ID() {
        return ENV_CIRCLE_WORKFLOW_ID;
      },
    } as const;
  }
  return {
    required: true,
  } as const;
};

export const cancel = await new Command()
  .description("cancel redundant workflow")
  .option(
    "-i, --workflow-id [type:string]",
    "workflow id you want to cancel",
    defaultOrRequiredWorkflowId()
  )
  .option(
    "--token [type:string]",
    "circleci user token",
    defaultOrRequiredToken()
  )
  .action(async ({ workflowId, token }) => {
    if (!isStringOrThrow(workflowId, "workflowId")) {
      return;
    }
    if (!isStringOrThrow(token, "token")) {
      return;
    }
    try {
      await handler({ workflowId, token });
    } catch (e) {
      throw new Error(`command execution error with: ${e}`, { cause: e });
    }
  });
