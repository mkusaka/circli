import { Command, Base64 } from "../../deps.ts";
import {
  ENV_CIRCLE_BRANCH,
  ENV_CIRCLE_PROJECT_REPONAME,
  ENV_CIRCLE_USERNAME,
  ENV_CIRCLE_WORKFLOW_ID,
  ENV_CIRCLECI_TOKEN,
} from "../../env.ts";
import { isStringOrThrow, projectSlug } from "../../helper.ts";
import * as client from "../../client/index.ts";
import { logger } from "../../logger.ts";

export const handler = async (options: {
  workflowId: string;
  branchName: string;
  userName: string;
  repoName: string;
  targetUserName?: string | undefined;
  token?: string | undefined;
}) => {
  if (options.token) {
    client.OpenAPI.HEADERS = {
      authorization: `Basic ${Base64.encode(options.token)}`,
    };
  }

  logger.debug({ name: "log", value: "request started" });
  logger.debug({ name: "workflowId", value: options.workflowId });
  logger.debug({ name: "branchName", value: options.branchName });
  logger.debug({ name: "userName", value: options.userName });
  logger.debug({ name: "repoName", value: options.repoName });
  logger.debug({ name: "targetUserName", value: options.targetUserName });

  const currentWorkflow = await client.WorkflowService.getWorkflowById({
    id: options.workflowId,
  });

  logger.debug({ name: "currentWorkflow", value: currentWorkflow });

  const workflowName = currentWorkflow.name;

  const currentPipeline = await client.PipelineService.getPipelineById({
    pipelineId: currentWorkflow.pipeline_id,
  });

  logger.debug({ name: "currentPipeline", value: currentPipeline });
  const vcs = currentPipeline.vcs?.provider_name || "";
  const slug = projectSlug(vcs, options.userName, options.repoName);

  const pipelineIds = (
    await client.PipelineService.listPipelinesForProject({
      projectSlug: slug,
      branch: options.branchName,
    })
  ).items
    .filter((pipeline) => {
      if (options.targetUserName) {
        return (
          pipeline.state === "created" &&
          pipeline.trigger.actor.login === options.targetUserName
        );
      }
      return pipeline.state === "created";
    })
    .map((pipeline) => pipeline.id);

  logger.debug({ name: "pipelineIds", value: pipelineIds });

  const cancelTargetWorkflowIds = (
    await Promise.all(
      pipelineIds.map((id) => {
        return client.PipelineService.listWorkflowsByPipelineId({
          pipelineId: id,
        });
      })
    )
  ).flatMap(({ items }) =>
    items
      .filter(
        (item) =>
          (item.status == "on_hold" || item.status === "running") &&
          item.name === workflowName &&
          item.id !== options.workflowId
      )
      .map((item) => item.id)
  );

  logger.debug({
    name: "cancelTargetWorkflowIds",
    value: cancelTargetWorkflowIds,
  });

  await Promise.all(
    cancelTargetWorkflowIds.map((id) => {
      return client.WorkflowService.cancelWorkflow({ id });
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

const defaultOrRequiredBranchName = () => {
  if (ENV_CIRCLE_BRANCH) {
    return {
      default: function CIRCLE_BRANCH() {
        return ENV_CIRCLE_BRANCH;
      },
    } as const;
  }
  return {
    required: true,
  } as const;
};

const defaultOrRequiredUserName = () => {
  if (ENV_CIRCLE_USERNAME) {
    return {
      default: function CIRCLE_USERNAME() {
        return ENV_CIRCLE_USERNAME;
      },
    } as const;
  }
  return {
    required: true,
  } as const;
};

const defaultOrRequiredRepoName = () => {
  if (ENV_CIRCLE_PROJECT_REPONAME) {
    return {
      default: function CIRCLE_PROJECT_REPONAME() {
        return ENV_CIRCLE_PROJECT_REPONAME;
      },
    } as const;
  }
  return {
    required: true,
  } as const;
};

export const cancelRedundant = await new Command()
  .description("cancel redundant workflow")
  .option(
    "-i, --workflow-id [type:string]",
    "workflow id you want to cancel",
    defaultOrRequiredWorkflowId()
  )
  .option(
    "-b, --branch-name [type:string]",
    "branch name you want to cancel",
    defaultOrRequiredBranchName()
  )
  .option(
    "-u, --user-name [type:string]",
    "circleci project username",
    defaultOrRequiredUserName()
  )
  .option(
    "-r, --repo-name [type:string]",
    "circleci project repo name",
    defaultOrRequiredRepoName()
  )
  .option("--target-user-name [type:string]", "circleci target user name")
  .option(
    "--token [type:string]",
    "circleci user token",
    defaultOrRequiredToken()
  )
  .action(async ({ workflowId, branchName, userName, repoName, token }) => {
    if (!isStringOrThrow(workflowId, "workflowId")) {
      return;
    }
    if (!isStringOrThrow(branchName, "branchName")) {
      return;
    }
    if (!isStringOrThrow(userName, "userName")) {
      return;
    }
    if (!isStringOrThrow(repoName, "repoName")) {
      return;
    }
    if (!isStringOrThrow(token, "token")) {
      return;
    }
    try {
      await handler({ workflowId, branchName, userName, repoName, token });
    } catch (e) {
      throw new Error(`command execution error with: ${e}`, { cause: e });
    }
  });
