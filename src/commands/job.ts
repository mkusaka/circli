// src/commands/job.ts
import { Command } from "@cliffy/command";
import { createClient } from "../utils/api.js";
import { printJson, printYaml, printTable } from "../utils/output.js";
import { handleApiError } from "../utils/error.js";

export const jobCommand = new Command()
  .name("job")
  .description("Manage CircleCI jobs")
  // job get
  .command("get")
  .description("Get job details")
  .arguments("<project-slug:string> <job-number:number>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, projectSlug, jobNumber) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET("/project/{project-slug}/job/{job-number}", {
        params: {
          path: { "project-slug": projectSlug, "job-number": jobNumber },
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
        console.log(`Name: ${response.data.name}`);
        console.log(`Number: ${response.data.number}`);
        console.log(`Status: ${response.data.status}`);
        console.log(`Started At: ${response.data.started_at || "-"}`);
        console.log(`Stopped At: ${response.data.stopped_at || "-"}`);
        console.log(`Duration: ${response.data.duration || "-"}ms`);
        console.log(`Web URL: ${response.data.web_url}`);
        if (response.data.executor) {
          console.log(`Executor Type: ${response.data.executor.type || "-"}`);
          console.log(`Resource Class: ${response.data.executor.resource_class || "-"}`);
        }
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // job cancel by job-id
  .command("cancel")
  .description("Cancel a job")
  .option("--job-id <jobId:string>", "Cancel by job ID (UUID)")
  .option("--project-slug <projectSlug:string>", "Project slug (for cancel by job number)")
  .option("--job-number <jobNumber:number>", "Job number (for cancel by job number)")
  .action(async (options) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      if (options.jobId) {
        // Cancel by job ID
        const response = await client.POST("/jobs/{job-id}/cancel", {
          params: {
            path: { "job-id": options.jobId },
          },
        });

        if (response.error) {
          throw new Error(response.error.message);
        }

        console.log(`Job ${options.jobId} cancelled.`);
      } else if (options.projectSlug && options.jobNumber) {
        // Cancel by project slug and job number
        const response = await client.POST(
          "/project/{project-slug}/job/{job-number}/cancel",
          {
            params: {
              path: {
                "project-slug": options.projectSlug,
                "job-number": options.jobNumber,
              },
            },
          }
        );

        if (response.error) {
          throw new Error(response.error.message);
        }

        console.log(
          `Job #${options.jobNumber} in ${options.projectSlug} cancelled.`
        );
      } else {
        console.error(
          "Please provide either --job-id or both --project-slug and --job-number"
        );
        process.exit(1);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // job artifacts
  .command("artifacts")
  .description("Get artifacts for a job")
  .arguments("<project-slug:string> <job-number:number>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, projectSlug, jobNumber) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET(
        "/project/{project-slug}/{job-number}/artifacts",
        {
          params: {
            path: { "project-slug": projectSlug, "job-number": jobNumber },
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
        const headers = ["Path", "URL", "Node Index"];
        const rows = response.data.items.map((a) => [
          a.path,
          a.url,
          a.node_index !== undefined ? String(a.node_index) : "-",
        ]);
        printTable(headers, rows);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // job tests
  .command("tests")
  .description("Get test metadata for a job")
  .arguments("<project-slug:string> <job-number:number>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, projectSlug, jobNumber) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET(
        "/project/{project-slug}/{job-number}/tests",
        {
          params: {
            path: { "project-slug": projectSlug, "job-number": jobNumber },
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
        const headers = ["Name", "Classname", "Result", "Run Time", "File"];
        const rows = response.data.items.map((t) => [
          t.name,
          t.classname || "-",
          t.result || "-",
          t.run_time !== undefined ? `${t.run_time}s` : "-",
          t.file || "-",
        ]);
        printTable(headers, rows);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  });
