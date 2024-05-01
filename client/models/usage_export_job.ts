/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type usage_export_job = {
  /**
   * A list of pre signed urls that the client can use to download the results of a Usage Export.
   */
  download_urls: Array<string>;
  end: string;
  start: string;
  state: "created" | "processing" | "failed" | "completed";
  usage_export_job_id: string;
};
