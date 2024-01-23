/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type project_settings = {
  advanced?: {
    /**
     * Except for the default branch, cancel running pipelines on a branch when a new pipeline starts on that branch.
     */
    autocancel_builds?: boolean;
    /**
     * Run builds for pull requests from forks.
     */
    build_fork_prs?: boolean;
    /**
     * Once enabled, we will only build branches that have associated pull requests open.
     */
    build_prs_only?: boolean;
    /**
     * When set to true, job re-runs with SSH debugging access will be disabled for the project.
     */
    disable_ssh?: boolean;
    /**
     * Run builds for forked pull requests with this project's configuration, environment variables, and secrets.
     */
    forks_receive_secret_env_vars?: boolean;
    /**
     * Free and Open Source. Enabling this grants additional credits, and lets others see your builds, both through the web UI and the API.
     */
    oss?: boolean;
    /**
     * This field is used in conjunction with the `build_prs_only`, it allows you to specify a list of branches that will always triger a build. The value passed will overwrite the existing value.
     */
    pr_only_branch_overrides?: Array<string>;
    /**
     * Report the status of every pushed commit to GitHub's status API. Updates reported per job.
     */
    set_github_status?: boolean;
    /**
     * Enabling allows you to conditionally trigger configurations outside of the primary `.circleci` parent directory.
     */
    setup_workflows?: boolean;
    /**
     * Whether updating these settings requires a user to be an organization administrator. When disabled, updating settings can be done by any member.
     */
    write_settings_requires_admin?: boolean;
  };
};
