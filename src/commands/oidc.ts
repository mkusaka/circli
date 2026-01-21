// src/commands/oidc.ts
import { Command } from "@cliffy/command";
import { createClient } from "../utils/api.js";
import { printJson, printYaml } from "../utils/output.js";
import { handleApiError } from "../utils/error.js";

const orgSubcommand = new Command()
  .name("org")
  .description("Manage organization OIDC claims")
  // oidc org get
  .command("get")
  .description("Get organization OIDC claims")
  .arguments("<org-id:string>")
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
      const response = await client.GET("/org/{orgID}/oidc-custom-claims", {
        params: {
          path: { orgID: orgId },
        },
      });

      if (response.error) {
        throw new Error(response.error.error);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log("Organization ID:", response.data.org_id);
        console.log("\nAudience:");
        for (const a of response.data.audience || []) {
          console.log(`  - ${a}`);
        }
        console.log("\nAudience Updated At:", response.data.audience_updated_at || "-");
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // oidc org set
  .command("set")
  .description("Update organization OIDC claims")
  .arguments("<org-id:string>")
  .option("--audience <audience:string>", "Comma-separated audience values")
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
      const audience = options.audience
        ? options.audience.split(",").map((a: string) => a.trim())
        : [];

      const response = await client.PATCH("/org/{orgID}/oidc-custom-claims", {
        params: {
          path: { orgID: orgId },
        },
        body: { audience },
      });

      if (response.error) {
        throw new Error(response.error.error);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log("Organization OIDC claims updated.");
        console.log("Organization ID:", response.data.org_id);
        console.log("\nAudience:");
        for (const a of response.data.audience || []) {
          console.log(`  - ${a}`);
        }
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // oidc org delete
  .command("delete")
  .description("Delete organization OIDC claims")
  .arguments("<org-id:string>")
  .action(async (_options, orgId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.DELETE("/org/{orgID}/oidc-custom-claims", {
        params: {
          path: { orgID: orgId },
          query: { claims: "audience" },
        },
      });

      if (response.error) {
        throw new Error(response.error.error);
      }

      console.log("Organization OIDC claims deleted.");
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  });

const projectSubcommand = new Command()
  .name("project")
  .description("Manage project OIDC claims")
  // oidc project get
  .command("get")
  .description("Get project OIDC claims")
  .arguments("<org-id:string> <project-id:string>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, orgId, projectId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET("/org/{orgID}/project/{projectID}/oidc-custom-claims", {
        params: {
          path: { orgID: orgId, projectID: projectId },
        },
      });

      if (response.error) {
        throw new Error(response.error.error);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log("Organization ID:", response.data.org_id);
        console.log("Project ID:", response.data.project_id);
        console.log("\nAudience:");
        for (const a of response.data.audience || []) {
          console.log(`  - ${a}`);
        }
        console.log("\nAudience Updated At:", response.data.audience_updated_at || "-");
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // oidc project set
  .command("set")
  .description("Update project OIDC claims")
  .arguments("<org-id:string> <project-id:string>")
  .option("--audience <audience:string>", "Comma-separated audience values")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, orgId, projectId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const audience = options.audience
        ? options.audience.split(",").map((a: string) => a.trim())
        : [];

      const response = await client.PATCH("/org/{orgID}/project/{projectID}/oidc-custom-claims", {
        params: {
          path: { orgID: orgId, projectID: projectId },
        },
        body: { audience },
      });

      if (response.error) {
        throw new Error(response.error.error);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log("Project OIDC claims updated.");
        console.log("Organization ID:", response.data.org_id);
        console.log("Project ID:", response.data.project_id);
        console.log("\nAudience:");
        for (const a of response.data.audience || []) {
          console.log(`  - ${a}`);
        }
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // oidc project delete
  .command("delete")
  .description("Delete project OIDC claims")
  .arguments("<org-id:string> <project-id:string>")
  .action(async (_options, orgId, projectId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.DELETE("/org/{orgID}/project/{projectID}/oidc-custom-claims", {
        params: {
          path: { orgID: orgId, projectID: projectId },
          query: { claims: "audience" },
        },
      });

      if (response.error) {
        throw new Error(response.error.error);
      }

      console.log("Project OIDC claims deleted.");
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  });

export const oidcCommand = new Command()
  .name("oidc")
  .description("Manage CircleCI OIDC claims")
  .command("org", orgSubcommand)
  .reset()
  .command("project", projectSubcommand);
