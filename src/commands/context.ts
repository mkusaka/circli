// src/commands/context.ts
import { Command } from "@cliffy/command";
import { createClient } from "../utils/api.js";
import { printJson, printYaml, printTable } from "../utils/output.js";
import { handleApiError } from "../utils/error.js";
import { z } from "zod";

const envCommand = new Command()
  .name("env")
  .description("Manage context environment variables")
  // context env list
  .command("list")
  .description("List environment variables in a context")
  .arguments("<context-id:string>")
  .option("--page-token <token:string>", "Next page token")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, contextId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET(
        "/context/{context-id}/environment-variable",
        {
          params: {
            path: { "context-id": contextId },
            query: { "page-token": options.pageToken },
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
        const headers = ["Variable", "Created At", "Updated At"];
        const rows = response.data.items.map((v) => [
          v.variable,
          v.created_at || "-",
          v.updated_at || "-",
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
  // context env set
  .command("set")
  .description("Set an environment variable in a context")
  .arguments("<context-id:string> <name:string> <value:string>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, contextId, name, value) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.PUT(
        "/context/{context-id}/environment-variable/{env-var-name}",
        {
          params: {
            path: { "context-id": contextId, "env-var-name": name },
          },
          body: { value },
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
        console.log(`Environment variable '${name}' set successfully.`);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // context env delete
  .command("delete")
  .description("Delete an environment variable from a context")
  .arguments("<context-id:string> <name:string>")
  .action(async (_options, contextId, name) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.DELETE(
        "/context/{context-id}/environment-variable/{env-var-name}",
        {
          params: {
            path: { "context-id": contextId, "env-var-name": name },
          },
        }
      );

      if (response.error) {
        throw new Error(response.error.message);
      }

      console.log(
        `Environment variable '${name}' deleted from context ${contextId}.`
      );
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  });

const restrictionCommand = new Command()
  .name("restriction")
  .description("Manage context restrictions (experimental)")
  // context restriction list
  .command("list")
  .description("List context restrictions")
  .arguments("<context-id:string>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, contextId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET("/context/{context_id}/restrictions", {
        params: {
          path: { context_id: contextId },
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
        const headers = ["ID", "Name", "Type", "Value"];
        const items = response.data.items || [];
        const rows = items.map((r) => [
          r.id || "-",
          r.name || "-",
          r.restriction_type || "-",
          r.restriction_value || "-",
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
  // context restriction create
  .command("create")
  .description("Create a context restriction")
  .arguments("<context-id:string>")
  .option("--project-id <projectId:string>", "Project ID to restrict to")
  .option(
    "--restriction-type <type:string>",
    "Restriction type (e.g., project)",
    { default: "project" }
  )
  .option("--restriction-value <value:string>", "Restriction value (UUID)")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, contextId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.POST(
        "/context/{context_id}/restrictions",
        {
          params: {
            path: { context_id: contextId },
          },
          body: {
            project_id: options.projectId,
            restriction_type: options.restrictionType,
            restriction_value: options.restrictionValue,
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
        console.log(`Restriction created for context ${contextId}.`);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // context restriction delete
  .command("delete")
  .description("Delete a context restriction")
  .arguments("<context-id:string> <restriction-id:string>")
  .action(async (_options, contextId, restrictionId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.DELETE(
        "/context/{context_id}/restrictions/{restriction_id}",
        {
          params: {
            path: { context_id: contextId, restriction_id: restrictionId },
          },
        }
      );

      if (response.error) {
        throw new Error(response.error.message);
      }

      console.log(
        `Restriction ${restrictionId} deleted from context ${contextId}.`
      );
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  });

export const contextCommand = new Command()
  .name("context")
  .description("Manage CircleCI contexts")
  // context list
  .command("list")
  .description("List contexts for an owner")
  .option("--owner-id <ownerId:string>", "Organization ID (UUID)", {
    required: true,
  })
  .option("--owner-type <ownerType:string>", "Owner type (organization)", {
    default: "organization",
  })
  .option("--page-token <token:string>", "Next page token")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options) => {
    const schema = z.object({
      ownerId: z.string(),
      ownerType: z.string(),
      pageToken: z.string().optional(),
      json: z.boolean().optional(),
      yaml: z.boolean().optional(),
    });
    const validated = schema.safeParse(options);
    if (!validated.success) {
      console.error(validated.error.message);
      process.exit(1);
    }

    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET("/context", {
        params: {
          query: {
            "owner-id": validated.data.ownerId,
            "owner-type": validated.data.ownerType as "account" | "organization",
            "page-token": validated.data.pageToken,
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (validated.data.json) {
        printJson(response.data);
      } else if (validated.data.yaml) {
        printYaml(response.data);
      } else {
        const headers = ["ID", "Name", "Created At"];
        const rows = response.data.items.map((c) => [
          c.id,
          c.name,
          c.created_at,
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
  // context create
  .command("create")
  .description("Create a new context")
  .option("--name <name:string>", "Context name", { required: true })
  .option("--owner-id <ownerId:string>", "Organization ID (UUID)", {
    required: true,
  })
  .option("--owner-type <ownerType:string>", "Owner type (organization)", {
    default: "organization",
  })
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options) => {
    const schema = z.object({
      name: z.string(),
      ownerId: z.string(),
      ownerType: z.string(),
      json: z.boolean().optional(),
      yaml: z.boolean().optional(),
    });
    const validated = schema.safeParse(options);
    if (!validated.success) {
      console.error(validated.error.message);
      process.exit(1);
    }

    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.POST("/context", {
        body: {
          name: validated.data.name,
          owner: {
            id: validated.data.ownerId,
            type: validated.data.ownerType as "account" | "organization",
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (validated.data.json) {
        printJson(response.data);
      } else if (validated.data.yaml) {
        printYaml(response.data);
      } else {
        console.log(`Context created: ${response.data.id}`);
        console.log(`Name: ${response.data.name}`);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // context get
  .command("get")
  .description("Get a context by ID")
  .arguments("<context-id:string>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, contextId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET("/context/{context-id}", {
        params: {
          path: { "context-id": contextId },
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
        console.log(`Created At: ${response.data.created_at}`);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // context delete
  .command("delete")
  .description("Delete a context")
  .arguments("<context-id:string>")
  .action(async (_options, contextId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.DELETE("/context/{context-id}", {
        params: {
          path: { "context-id": contextId },
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      console.log(`Context ${contextId} deleted successfully.`);
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  .command("env", envCommand)
  .reset()
  .command("restriction", restrictionCommand);
