// src/commands/policy.ts
import { Command } from "@cliffy/command";
import { createClient } from "../utils/api.js";
import { printJson, printYaml, printTable } from "../utils/output.js";
import { handleApiError } from "../utils/error.js";

const decisionSubcommand = new Command()
  .name("decision")
  .description("Manage policy decisions")
  // policy decision list
  .command("list")
  .description("List decision audit logs")
  .arguments("<owner-id:string>")
  .option("--context <context:string>", "Policy context (config, plan)", {
    default: "config",
  })
  .option("--status <status:string>", "Filter by status")
  .option(
    "--after <after:string>",
    "Return decisions after this date (ISO 8601)",
  )
  .option("--branch <branch:string>", "Filter by branch")
  .option("--project-id <projectId:string>", "Filter by project ID")
  .option("--offset <offset:number>", "Page offset")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, ownerId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET(
        "/owner/{ownerID}/context/{context}/decision",
        {
          params: {
            path: { ownerID: ownerId, context: options.context },
            query: {
              status: options.status,
              after: options.after,
              branch: options.branch,
              project_id: options.projectId,
              offset: options.offset,
            },
          },
        },
      );

      if (response.error) {
        throw new Error(response.error.error);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        const headers = ["ID", "Status", "Created At"];
        const rows = (
          response.data as { id: string; status: string; created_at: string }[]
        ).map((d) => [d.id, d.status, d.created_at]);
        printTable(headers, rows);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // policy decision get
  .command("get")
  .description("Get a decision audit log")
  .arguments("<owner-id:string> <decision-id:string>")
  .option("--context <context:string>", "Policy context", { default: "config" })
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, ownerId, decisionId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET(
        "/owner/{ownerID}/context/{context}/decision/{decisionID}",
        {
          params: {
            path: {
              ownerID: ownerId,
              context: options.context,
              decisionID: decisionId,
            },
          },
        },
      );

      if (response.error) {
        throw new Error(response.error.error);
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
  // policy decision make
  .command("make")
  .description("Make a decision based on policy")
  .arguments("<owner-id:string>")
  .option("--context <context:string>", "Policy context", { default: "config" })
  .option("--input <input:string>", "Input data as JSON string", {
    required: true,
  })
  .option("--metadata <metadata:string>", "Metadata as JSON string")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, ownerId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      // Validate that input is valid JSON, but pass the string directly to API
      try {
        JSON.parse(options.input);
      } catch {
        console.error("Invalid JSON for --input");
        process.exit(1);
      }

      let metadata: Record<string, unknown> | undefined;
      if (options.metadata) {
        try {
          metadata = JSON.parse(options.metadata);
        } catch {
          console.error("Invalid JSON for --metadata");
          process.exit(1);
        }
      }

      const response = await client.POST(
        "/owner/{ownerID}/context/{context}/decision",
        {
          params: {
            path: { ownerID: ownerId, context: options.context },
          },
          body: {
            input: options.input,
            metadata,
          },
        },
      );

      if (response.error) {
        throw new Error(response.error.error);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log(`Status: ${response.data.status}`);
        if (
          response.data.enabled_rules &&
          response.data.enabled_rules.length > 0
        ) {
          console.log("\nEnabled Rules:");
          for (const rule of response.data.enabled_rules) {
            console.log(`  - ${rule}`);
          }
        }
        if (
          response.data.soft_failures &&
          response.data.soft_failures.length > 0
        ) {
          console.log("\nSoft Failures:");
          for (const f of response.data.soft_failures) {
            console.log(`  - ${f.rule}: ${f.reason}`);
          }
        }
        if (
          response.data.hard_failures &&
          response.data.hard_failures.length > 0
        ) {
          console.log("\nHard Failures:");
          for (const f of response.data.hard_failures) {
            console.log(`  - ${f.rule}: ${f.reason}`);
          }
        }
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  });

const settingsSubcommand = new Command()
  .name("settings")
  .description("Manage policy decision settings")
  // policy settings get
  .command("get")
  .description("Get decision settings")
  .arguments("<owner-id:string>")
  .option("--context <context:string>", "Policy context", { default: "config" })
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, ownerId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET(
        "/owner/{ownerID}/context/{context}/decision/settings",
        {
          params: {
            path: { ownerID: ownerId, context: options.context },
          },
        },
      );

      if (response.error) {
        throw new Error(response.error.error);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log(`Enabled: ${response.data.enabled}`);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // policy settings set
  .command("set")
  .description("Set decision settings")
  .arguments("<owner-id:string>")
  .option("--context <context:string>", "Policy context", { default: "config" })
  .option("--enabled <enabled:boolean>", "Enable or disable decisions", {
    required: true,
  })
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, ownerId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.PATCH(
        "/owner/{ownerID}/context/{context}/decision/settings",
        {
          params: {
            path: { ownerID: ownerId, context: options.context },
          },
          body: {
            enabled: options.enabled,
          },
        },
      );

      if (response.error) {
        throw new Error(response.error.error);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log(
          `Decision settings updated. Enabled: ${response.data.enabled}`,
        );
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  });

const bundleSubcommand = new Command()
  .name("bundle")
  .description("Manage policy bundles")
  // policy bundle get
  .command("get")
  .description("Get a policy bundle")
  .arguments("<owner-id:string>")
  .option("--context <context:string>", "Policy context", { default: "config" })
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, ownerId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET(
        "/owner/{ownerID}/context/{context}/policy-bundle",
        {
          params: {
            path: { ownerID: ownerId, context: options.context },
          },
        },
      );

      if (response.error) {
        throw new Error(response.error.error);
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
  // policy bundle create
  .command("create")
  .description("Create (replace) a policy bundle")
  .arguments("<owner-id:string>")
  .option("--context <context:string>", "Policy context", { default: "config" })
  .option(
    "--policies <policies:string>",
    "Policy bundle as JSON object mapping name to content",
    { required: true },
  )
  .option("--dry-run", "Validate without creating")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, ownerId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      let policies: Record<string, string>;
      try {
        policies = JSON.parse(options.policies);
      } catch {
        console.error("Invalid JSON for --policies");
        process.exit(1);
      }

      const response = await client.POST(
        "/owner/{ownerID}/context/{context}/policy-bundle",
        {
          params: {
            path: { ownerID: ownerId, context: options.context },
            query: { dry: options.dryRun },
          },
          body: { policies },
        },
      );

      if (response.error) {
        throw new Error(response.error.error);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log("Policy bundle created successfully.");
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  });

const documentSubcommand = new Command()
  .name("document")
  .description("Manage policy documents")
  // policy document get
  .command("get")
  .description("Get a policy document")
  .arguments("<owner-id:string> <policy-name:string>")
  .option("--context <context:string>", "Policy context", { default: "config" })
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, ownerId, policyName) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET(
        "/owner/{ownerID}/context/{context}/policy-bundle/{policyName}",
        {
          params: {
            path: { ownerID: ownerId, context: options.context, policyName },
          },
        },
      );

      if (response.error) {
        throw new Error(response.error.error);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  });

export const policyCommand = new Command()
  .name("policy")
  .description("Manage CircleCI config policies")
  .command("decision", decisionSubcommand)
  .reset()
  .command("settings", settingsSubcommand)
  .reset()
  .command("bundle", bundleSubcommand)
  .reset()
  .command("document", documentSubcommand);
