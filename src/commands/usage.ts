// src/commands/usage.ts
import { Command } from "@cliffy/command";
import { createClient } from "../utils/api.js";
import { printJson, printYaml } from "../utils/output.js";
import { handleApiError } from "../utils/error.js";

export const usageCommand = new Command()
  .name("usage")
  .description("Manage CircleCI usage export")
  // usage export create
  .command("export")
  .description("Manage usage exports")
  .command("create")
  .description("Create a usage export job")
  .arguments("<org-id:string>")
  .option("--start <start:string>", "Start date (ISO 8601)", { required: true })
  .option("--end <end:string>", "End date (ISO 8601)", { required: true })
  .option("--shared-org-ids <ids:string>", "Comma-separated shared org IDs")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, orgId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const sharedOrgIds = options.sharedOrgIds
        ? options.sharedOrgIds.split(",").map((id: string) => id.trim())
        : undefined;

      const response = await client.POST("/organizations/{org_id}/usage_export_job", {
        params: {
          path: { org_id: orgId },
        },
        body: {
          start: options.start,
          end: options.end,
          shared_org_ids: sharedOrgIds,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log(`Usage export job created.`);
        console.log(`Job ID: ${response.data.usage_export_job_id}`);
        console.log(`State: ${response.data.state}`);
        console.log(`Start: ${response.data.start}`);
        console.log(`End: ${response.data.end}`);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // usage export get
  .command("get")
  .description("Get a usage export job")
  .arguments("<org-id:string> <job-id:string>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, orgId, jobId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET(
        "/organizations/{org_id}/usage_export_job/{usage_export_job_id}",
        {
          params: {
            path: { org_id: orgId, usage_export_job_id: jobId },
          },
        }
      );

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log(`Job ID: ${response.data.usage_export_job_id}`);
        console.log(`State: ${response.data.state}`);
        if (response.data.download_urls && response.data.download_urls.length > 0) {
          console.log("\nDownload URLs:");
          for (const url of response.data.download_urls) {
            console.log(`  - ${url}`);
          }
        }
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  });
