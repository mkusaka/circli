import { Env } from "./deps.ts";

const env = new Env();

// const ENV_required = (
//   key: string,
//   checker?: (value: string | undefined) => boolean
// ): Result<string, string> => {
//   const ENV_value = env.get(key);
//   if (!value) {
//     return new Failure(`${key} is required but not set`);
//   }
//
//   if (checker && !checker(value)) {
//     return new Failure(`validation error for key: ${key}`);
//   }
//   return new Success(value);
// };
//
// const ENV_optional = (
//   key: string,
//   checker?: (value: string | undefined) => boolean
// ): Result<string | undefined, string> => {
//   const ENV_value = env.get(key);
//   if (checker && !checker(value)) {
//     return new Failure(`validation error for key: ${key}`);
//   }
//   return new Success(value);
// };

export const ENV_CIRCLECI_TOKEN: string | undefined = env.get("CIRCLECI_TOKEN");
export const ENV_CIRCLE_BRANCH = env.get("CIRCLE_BRANCH");
export const ENV_CIRCLE_BUILD_URL = env.get("CIRCLE_BUILD_URL");
export const ENV_CIRCLE_JOB = env.get("CIRCLE_JOB");
export const ENV_CIRCLE_OIDC_TOKEN = env.get("CIRCLE_OIDC_TOKEN");
export const ENV_CIRCLE_PR_REPONAME = env.get("CIRCLE_PR_REPONAME");
export const ENV_CIRCLE_PR_USERNAME = env.get("CIRCLE_PR_USERNAME");
export const ENV_CIRCLE_PROJECT_REPONAME = env.get("CIRCLE_PROJECT_REPONAME");
export const ENV_CIRCLE_PROJECT_USERNAME = env.get("CIRCLE_PROJECT_USERNAME");
export const ENV_CIRCLE_PULL_REQUEST = env.get("CIRCLE_PULL_REQUEST");
export const ENV_CIRCLE_REPOSITORY_URL = env.get("CIRCLE_REPOSITORY_URL");
export const ENV_CIRCLE_SHA1 = env.get("CIRCLE_SHA1");
export const ENV_CIRCLE_TAG = env.get("CIRCLE_TAG");
export const ENV_CIRCLE_USERNAME = env.get("CIRCLE_USERNAME");
export const ENV_CIRCLE_WORKFLOW_ID = env.get("CIRCLE_WORKFLOW_ID");
export const ENV_CIRCLE_WORKFLOW_JOB_ID = env.get("CIRCLE_WORKFLOW_JOB_ID");
export const ENV_CIRCLE_WORKFLOW_WORKSPACE_ID = env.get(
  "CIRCLE_WORKFLOW_WORKSPACE_ID"
);
export const ENV_CIRCLE_WORKING_DIRECTORY = env.get("CIRCLE_WORKING_DIRECTORY");
export const ENV_CIRCLE_INTERNAL_TASK_DATA = env.get(
  "CIRCLE_INTERNAL_TASK_DATA"
);
export const ENV_CIRCLE_COMPARE_URL = env.get("CIRCLE_COMPARE_URL");
