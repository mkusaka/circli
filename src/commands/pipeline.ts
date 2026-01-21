// src/commands/pipeline.ts
import { Command } from "@cliffy/command";
import { createClient } from "../utils/api.js";
import { printJson, printYaml, printTable } from "../utils/output.js";
import { handleApiError } from "../utils/error.js";
import { z } from "zod";
import type { paths } from "../types/circleci.js";

// Common branch names for completion
const COMMON_BRANCHES = ["main", "master", "develop", "staging", "production"];

export const pipelineCommand = new Command()
  .name("pipeline")
  .description("Manage CircleCI pipelines")
  // pipeline list
  .command("list")
  .description("List pipelines (use 'pipeline mine' for your own pipelines)")
  .option(
    "--project-slug <slug:string>",
    "Project slug (e.g., gh/CircleCI-Public/api-preview-docs)",
    { required: true },
  )
  .option("--branch <branch:string>", "Filter by branch")
  .option("--page-token <token:string>", "Next page token")
  .option("--limit <number:number>", "Max number of pipelines to display (client-side)", {
    default: 10,
  })
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .complete("branch", () => COMMON_BRANCHES)
  .complete("project-slug", async () => ["gh/", "bb/"])
  .action(async (options) => {
    const schema = z.object({
      projectSlug: z.string(),
      branch: z.string().optional(),
      pageToken: z.string().optional(),
      limit: z.number().int().positive(),
      json: z.boolean().optional(),
      yaml: z.boolean().optional(),
    });
    const validated = schema.safeParse(options);
    if (!validated.success) {
      console.error(validated.error.message);
      process.exit(1);
    }
    const { projectSlug, branch, pageToken, limit, json, yaml } = validated.data;

    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET("/project/{project-slug}/pipeline", {
        params: {
          path: { "project-slug": projectSlug },
          query: {
            branch: branch,
            "page-token": pageToken,
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      // Apply client-side limit (API doesn't support limit parameter)
      const items = response.data.items.slice(0, limit);

      if (json) {
        printJson({ ...response.data, items });
      } else if (yaml) {
        printYaml({ ...response.data, items });
      } else {
        const headers = ["ID", "Number", "State", "Trigger", "Created At"];
        const rows = items.map(
          (
            p: paths["/project/{project-slug}/pipeline"]["get"]["responses"]["200"]["content"]["application/json"]["items"][number],
          ) => [p.id, String(p.number), p.state, p.trigger.type, p.created_at],
        );
        printTable(headers, rows);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      if (handledError.originalError) {
        console.error(handledError.originalError);
      }
      process.exit(1);
    }
  })
  .reset()
  // pipeline get (by ID or by number)
  .command("get")
  .description("Get a pipeline by ID or number")
  .option("--pipeline-id <pipelineId:string>", "Pipeline ID (UUID)")
  .option("--project-slug <projectSlug:string>", "Project slug (for get by number)")
  .option("--pipeline-number <pipelineNumber:number>", "Pipeline number")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      let data;
      if (options.pipelineId) {
        const response = await client.GET("/pipeline/{pipeline-id}", {
          params: {
            path: { "pipeline-id": options.pipelineId },
          },
        });
        if (response.error) {
          throw new Error(response.error.message);
        }
        data = response.data;
      } else if (options.projectSlug && options.pipelineNumber) {
        const response = await client.GET("/project/{project-slug}/pipeline/{pipeline-number}", {
          params: {
            path: {
              "project-slug": options.projectSlug,
              "pipeline-number": options.pipelineNumber,
            },
          },
        });
        if (response.error) {
          throw new Error(response.error.message);
        }
        data = response.data;
      } else {
        console.error(
          "Please provide either --pipeline-id or both --project-slug and --pipeline-number",
        );
        process.exit(1);
      }

      if (options.json) {
        printJson(data);
      } else if (options.yaml) {
        printYaml(data);
      } else {
        console.log(`ID: ${data.id}`);
        console.log(`Number: ${data.number}`);
        console.log(`State: ${data.state}`);
        console.log(`Created At: ${data.created_at}`);
        console.log(`Updated At: ${data.updated_at || "-"}`);
        console.log(`Trigger Type: ${data.trigger.type}`);
        console.log(`Trigger Actor: ${data.trigger.actor.login}`);
        if (data.vcs) {
          console.log(`Branch: ${data.vcs.branch || "-"}`);
          console.log(`Revision: ${data.vcs.revision || "-"}`);
        }
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // pipeline trigger
  .command("trigger")
  .description("Trigger a new pipeline")
  .option("--project-slug <projectSlug:string>", "Project slug (for GitHub OAuth/Bitbucket)")
  .option("--provider <provider:string>", "VCS provider (github, bitbucket)")
  .option("--organization <organization:string>", "Organization name")
  .option("--project <project:string>", "Project name")
  .option("--branch <branch:string>", "Branch to build")
  .option("--tag <tag:string>", "Tag to build")
  .option("--parameters <parameters:string>", "Pipeline parameters as JSON string")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      let data;
      const params: { [key: string]: string | number | boolean } = {};
      if (options.parameters) {
        try {
          Object.assign(params, JSON.parse(options.parameters));
        } catch {
          console.error("Invalid JSON for --parameters");
          process.exit(1);
        }
      }

      if (options.projectSlug) {
        // Use the old API for GitHub OAuth and Bitbucket
        const response = await client.POST("/project/{project-slug}/pipeline", {
          params: {
            path: { "project-slug": options.projectSlug },
          },
          body: {
            branch: options.branch,
            tag: options.tag,
            parameters: Object.keys(params).length > 0 ? params : undefined,
          },
        });
        if (response.error) {
          throw new Error(response.error.message);
        }
        data = response.data;
      } else if (options.provider && options.organization && options.project) {
        // Use the new API for GitHub App
        const validProviders = ["github", "gh", "bitbucket", "bb", "circleci"] as const;
        type Provider = (typeof validProviders)[number];
        if (!validProviders.includes(options.provider as Provider)) {
          console.error(
            `Invalid provider: ${options.provider}. Must be one of: ${validProviders.join(", ")}`,
          );
          process.exit(1);
        }
        const response = await client.POST(
          "/project/{provider}/{organization}/{project}/pipeline/run",
          {
            params: {
              path: {
                provider: options.provider as Provider,
                organization: options.organization,
                project: options.project,
              },
            },
            body: {
              checkout: options.branch
                ? { branch: options.branch }
                : options.tag
                  ? { tag: options.tag }
                  : undefined,
              parameters: Object.keys(params).length > 0 ? params : undefined,
            },
          },
        );
        if (response.error) {
          throw new Error(response.error.message);
        }
        data = response.data;
      } else {
        console.error(
          "Please provide either --project-slug or all of --provider, --organization, and --project",
        );
        process.exit(1);
      }

      if (options.json) {
        printJson(data);
      } else if (options.yaml) {
        printYaml(data);
      } else {
        console.log(`Pipeline triggered.`);
        console.log(`ID: ${data.id}`);
        console.log(`Number: ${data.number}`);
        console.log(`State: ${data.state}`);
        console.log(`Created At: ${data.created_at}`);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // pipeline config
  .command("config")
  .description("Get the configuration for a pipeline")
  .arguments("<pipeline-id:string>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, pipelineId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET("/pipeline/{pipeline-id}/config", {
        params: {
          path: { "pipeline-id": pipelineId },
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
        console.log("Source:");
        console.log(response.data.source);
        if (response.data.compiled) {
          console.log("\nCompiled:");
          console.log(response.data.compiled);
        }
        if (response.data["setup-config"]) {
          console.log("\nSetup Config:");
          console.log(response.data["setup-config"]);
        }
        if (response.data["compiled-setup-config"]) {
          console.log("\nCompiled Setup Config:");
          console.log(response.data["compiled-setup-config"]);
        }
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // pipeline values
  .command("values")
  .description("Get pipeline values")
  .arguments("<pipeline-id:string>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, pipelineId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET("/pipeline/{pipeline-id}/values", {
        params: {
          path: { "pipeline-id": pipelineId },
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
        printJson(response.data);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // pipeline workflows
  .command("workflows")
  .description("List workflows for a pipeline")
  .arguments("<pipeline-id:string>")
  .option("--page-token <token:string>", "Next page token")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, pipelineId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET("/pipeline/{pipeline-id}/workflow", {
        params: {
          path: { "pipeline-id": pipelineId },
          query: { "page-token": options.pageToken },
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
        const headers = ["ID", "Name", "Status", "Created At", "Stopped At"];
        const rows = response.data.items.map((w) => [
          w.id,
          w.name,
          w.status,
          w.created_at,
          w.stopped_at || "-",
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
  // pipeline continue (for dynamic config)
  .command("continue")
  .description("Continue a pipeline from the setup phase (for dynamic config)")
  .option("--continuation-key <key:string>", "Continuation key", {
    required: true,
  })
  .option("--configuration <configuration:string>", "The configuration string for the pipeline")
  .option("--parameters <parameters:string>", "Pipeline parameters as JSON string")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      let params: { [key: string]: string | number | boolean } | undefined;
      if (options.parameters) {
        try {
          params = JSON.parse(options.parameters);
        } catch {
          console.error("Invalid JSON for --parameters");
          process.exit(1);
        }
      }

      if (!options.configuration) {
        console.error("--configuration is required for pipeline continue");
        process.exit(1);
      }

      const response = await client.POST("/pipeline/continue", {
        body: {
          "continuation-key": options.continuationKey as string,
          configuration: options.configuration,
          parameters: params,
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
        console.log("Pipeline continued successfully.");
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // pipeline mine
  .command("mine")
  .description("List my pipelines for a project")
  .option("--project-slug <projectSlug:string>", "Project slug", {
    required: true,
  })
  .option("--page-token <token:string>", "Next page token")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET("/project/{project-slug}/pipeline/mine", {
        params: {
          path: { "project-slug": options.projectSlug },
          query: { "page-token": options.pageToken },
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
        const headers = ["ID", "Number", "State", "Trigger", "Created At"];
        const rows = response.data.items.map((p) => [
          p.id,
          String(p.number),
          p.state,
          p.trigger.type,
          p.created_at,
        ]);
        printTable(headers, rows);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  });
