// src/commands/webhook.ts
import { Command } from "@cliffy/command";
import { createClient } from "../utils/api.js";
import { printJson, printYaml, printTable } from "../utils/output.js";
import { handleApiError } from "../utils/error.js";

export const webhookCommand = new Command()
  .name("webhook")
  .description("Manage CircleCI webhooks")
  // webhook list
  .command("list")
  .description("List webhooks for a project")
  .option("--scope-id <scopeId:string>", "Scope ID (project)", { required: true })
  .option("--scope-type <scopeType:string>", "Scope type (project)", { default: "project" })
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
      const response = await client.GET("/webhook", {
        params: {
          query: {
            "scope-id": options.scopeId,
            "scope-type": "project" as const,
          },
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
        const headers = ["ID", "Name", "URL", "Verify TLS", "Signing Secret"];
        const rows = response.data.items.map((w) => [
          w.id,
          w.name,
          w.url,
          w["verify-tls"] ? "Yes" : "No",
          w["signing-secret"] ? "Set" : "-",
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
  // webhook get
  .command("get")
  .description("Get a webhook by ID")
  .arguments("<webhook-id:string>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, webhookId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET("/webhook/{webhook-id}", {
        params: {
          path: { "webhook-id": webhookId },
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
        console.log(`ID: ${response.data.id}`);
        console.log(`Name: ${response.data.name}`);
        console.log(`URL: ${response.data.url}`);
        console.log(`Verify TLS: ${response.data["verify-tls"]}`);
        console.log(`Events: ${response.data.events.join(", ")}`);
        console.log(`Scope ID: ${response.data.scope.id}`);
        console.log(`Scope Type: ${response.data.scope.type}`);
        console.log(`Created At: ${response.data["created-at"]}`);
        console.log(`Updated At: ${response.data["updated-at"]}`);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // webhook create
  .command("create")
  .description("Create a webhook")
  .option("--name <name:string>", "Webhook name", { required: true })
  .option("--url <url:string>", "Webhook URL", { required: true })
  .option("--scope-id <scopeId:string>", "Scope ID", { required: true })
  .option("--scope-type <scopeType:string>", "Scope type (project)", { default: "project" })
  .option("--events <events:string>", "Comma-separated events (workflow-completed, job-completed)", { required: true })
  .option("--verify-tls", "Verify TLS certificate", { default: true })
  .option("--signing-secret <secret:string>", "Signing secret for verification", { required: true })
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
      const events = options.events.split(",").map((e: string) => e.trim());

      const response = await client.POST("/webhook", {
        body: {
          name: options.name,
          url: options.url,
          scope: {
            id: options.scopeId,
            type: "project" as const,
          },
          events: events as ("workflow-completed" | "job-completed")[],
          "verify-tls": options.verifyTls,
          "signing-secret": options.signingSecret,
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
        console.log(`Webhook created.`);
        console.log(`ID: ${response.data.id}`);
        console.log(`Name: ${response.data.name}`);
        console.log(`URL: ${response.data.url}`);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // webhook update
  .command("update")
  .description("Update a webhook")
  .arguments("<webhook-id:string>")
  .option("--name <name:string>", "New webhook name")
  .option("--url <url:string>", "New webhook URL")
  .option("--events <events:string>", "Comma-separated events")
  .option("--verify-tls <verifyTls:boolean>", "Verify TLS certificate")
  .option("--signing-secret <secret:string>", "New signing secret")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, webhookId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const body: {
        name?: string;
        url?: string;
        events?: ("workflow-completed" | "job-completed")[];
        "verify-tls"?: boolean;
        "signing-secret"?: string;
      } = {};
      if (options.name) body.name = options.name;
      if (options.url) body.url = options.url;
      if (options.events) {
        body.events = options.events.split(",").map((e: string) => e.trim()) as ("workflow-completed" | "job-completed")[];
      }
      if (options.verifyTls !== undefined) {
        body["verify-tls"] = options.verifyTls;
      }
      if (options.signingSecret) {
        body["signing-secret"] = options.signingSecret;
      }

      const response = await client.PUT("/webhook/{webhook-id}", {
        params: {
          path: { "webhook-id": webhookId },
        },
        body,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log(`Webhook ${webhookId} updated.`);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // webhook delete
  .command("delete")
  .description("Delete a webhook")
  .arguments("<webhook-id:string>")
  .action(async (_options, webhookId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.DELETE("/webhook/{webhook-id}", {
        params: {
          path: { "webhook-id": webhookId },
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      console.log(`Webhook ${webhookId} deleted.`);
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  });
