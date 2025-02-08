// src/commands/pipeline.ts
import { Command } from "@cliffy/command";
import { createClient } from "../utils/api";
import { printJson, printYaml, printTable } from "../utils/output";
import { handleApiError } from "../utils/error";
import { z } from "zod"; // 型チェックをより詳細にするためzodを利用

export const pipelineCommand = new Command()
  .name("pipeline")
  .description("Manage CircleCI pipelines")
  .command("list", "List pipelines")
  .option(
    "--project-slug <slug:string>",
    "Project slug (e.g., gh/CircleCI-Public/api-preview-docs)",
    { required: true },
  )
  .option("--mine", "Show only my pipelines")
  .option("--branch <branch:string>", "Filter by branch")
  .option("--page-token <token:string>", "Next page token")
  .option("--limit <number:number>", "Max number of pipelines to fetch", {
    default: 10,
  })
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options) => {
    // バリデーション(Zodを利用)
    const schema = z.object({
      projectSlug: z.string(),
      mine: z.boolean().optional(),
      branch: z.string().optional(),
      pageToken: z.string().optional(),
      limit: z.number().int().positive(),
      json: z.boolean().optional(),
      yaml: z.boolean().optional(),
    });
    const validated = schema.safeParse(options);
    if (!validated.success) {
      console.error(validated.error.message);
      Deno.exit(1);
    }
    const { projectSlug, mine, branch, pageToken, limit, json, yaml } =
      validated.data;

    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      Deno.exit(1); // cliffy は Deno 依存なので
    }

    const client = clientResult.value;

    try {
      const response = await client.get("/project/{project-slug}/pipeline", {
        params: {
          path: { "project-slug": projectSlug },
          query: {
            mine: mine,
            branch: branch,
            "page-token": pageToken,
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (json) {
        printJson(response.data);
      } else if (yaml) {
        printYaml(response.data);
      } else {
        // 人間が読みやすい形式で出力
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
      if (handledError.originalError) {
        console.error(handledError.originalError);
      }
      Deno.exit(1);
    }
  });
