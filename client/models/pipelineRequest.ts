/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type pipelineRequest = {
  checkout?: {
    /**
     * The branch that should be used to check out code on a checkout step.
     * Note that branch and tag are mutually exclusive.
     * To trigger a pipeline for a PR by number use pull/<number>/head for the PR ref or pull/<number>/merge for the merge ref (GitHub only)
     *
     */
    branch?: string;
    /**
     * The tag that should be used to check out code on a checkout step.
     * The commit that this tag points to is used for the pipeline. Note that branch and tag are mutually exclusive.
     *
     */
    tag?: string;
  };
  config?: {
    /**
     * The branch that should be used to fetch the config file.
     * Note that branch and tag are mutually exclusive.
     * To trigger a pipeline for a PR by number use pull/<number>/head for the PR ref or pull/<number>/merge for the merge ref (GitHub only)
     *
     */
    branch?: string;
    /**
     * The tag that should be used to fetch the config file.
     * The commit that this tag points to is used for the pipeline.
     * Note that branch and tag are mutually exclusive.
     *
     */
    tag?: string;
  };
  /**
   * The unique id for the pipeline definition. This can be found in the page Project Settings > Pipelines.
   */
  definition_id?: string;
  /**
   * An object containing pipeline parameters and their values.
   * Pipeline parameters have the following size limits: 100 max entries, 128 maximum key length, 512 maximum value length.
   *
   */
  parameters?: any;
};
