import { Command } from "../../deps.ts";
import {
  ENV_CIRCLE_BRANCH,
  ENV_CIRCLE_PROJECT_REPONAME,
  ENV_CIRCLE_USERNAME,
  ENV_CIRCLE_WORKFLOW_ID,
  ENV_CIRCLECI_TOKEN,
} from "../../env.ts";
import { isStringOrThrow } from "../../helper.ts";

export const handler = (options: {
  workflowId: string;
  branchName: string;
  userName: string;
  repoName: string;
  targetUserName?: string | undefined;
  token: string;
}) => {};

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
  .action(({ workflowId, branchName, userName, repoName, token }) => {
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
    handler({ workflowId, branchName, userName, repoName, token });
  });
