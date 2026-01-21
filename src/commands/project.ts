// src/commands/project.ts
import { Command } from "@cliffy/command";
import { createClient } from "../utils/api.js";
import { printJson, printYaml, printTable } from "../utils/output.js";
import { handleApiError } from "../utils/error.js";

// Environment variables subcommand
const envCommand = new Command()
  .name("env")
  .description("Manage project environment variables")
  // project env list
  .command("list")
  .description("List environment variables for a project")
  .arguments("<project-slug:string>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, projectSlug) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET("/project/{project-slug}/envvar", {
        params: {
          path: { "project-slug": projectSlug },
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
        const headers = ["Name", "Value"];
        const rows = response.data.items.map((v) => [v.name, v.value]);
        printTable(headers, rows);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // project env get
  .command("get")
  .description("Get a masked environment variable")
  .arguments("<project-slug:string> <name:string>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, projectSlug, name) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET(
        "/project/{project-slug}/envvar/{name}",
        {
          params: {
            path: { "project-slug": projectSlug, name },
          },
        },
      );

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log(`Name: ${response.data.name}`);
        console.log(`Value: ${response.data.value}`);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // project env set
  .command("set")
  .description("Create or update an environment variable")
  .arguments("<project-slug:string> <name:string> <value:string>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, projectSlug, name, value) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.POST("/project/{project-slug}/envvar", {
        params: {
          path: { "project-slug": projectSlug },
        },
        body: { name, value },
      });

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
  // project env delete
  .command("delete")
  .description("Delete an environment variable")
  .arguments("<project-slug:string> <name:string>")
  .action(async (_options, projectSlug, name) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.DELETE(
        "/project/{project-slug}/envvar/{name}",
        {
          params: {
            path: { "project-slug": projectSlug, name },
          },
        },
      );

      if (response.error) {
        throw new Error(response.error.message);
      }

      console.log(`Environment variable '${name}' deleted.`);
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  });

// Checkout keys subcommand
const checkoutKeyCommand = new Command()
  .name("checkout-key")
  .description("Manage project checkout keys")
  // project checkout-key list
  .command("list")
  .description("List checkout keys for a project")
  .arguments("<project-slug:string>")
  .option("--digest <digest:string>", "Filter by key fingerprint prefix")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, projectSlug) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET(
        "/project/{project-slug}/checkout-key",
        {
          params: {
            path: { "project-slug": projectSlug },
            query: { digest: options.digest as "sha256" | "md5" | undefined },
          },
        },
      );

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        const headers = ["Fingerprint", "Type", "Preferred", "Created At"];
        const rows = response.data.items.map((k) => [
          k.fingerprint,
          k.type,
          k.preferred ? "Yes" : "No",
          k["created-at"],
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
  // project checkout-key create
  .command("create")
  .description("Create a checkout key")
  .arguments("<project-slug:string>")
  .option("--type <type:string>", "Key type (deploy-key or user-key)", {
    required: true,
  })
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, projectSlug) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.POST(
        "/project/{project-slug}/checkout-key",
        {
          params: {
            path: { "project-slug": projectSlug },
          },
          body: {
            type: options.type as "deploy-key" | "user-key",
          },
        },
      );

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log(`Checkout key created.`);
        console.log(`Fingerprint: ${response.data.fingerprint}`);
        console.log(`Type: ${response.data.type}`);
        if (response.data["public-key"]) {
          console.log(`Public Key: ${response.data["public-key"]}`);
        }
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // project checkout-key get
  .command("get")
  .description("Get a checkout key by fingerprint")
  .arguments("<project-slug:string> <fingerprint:string>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, projectSlug, fingerprint) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET(
        "/project/{project-slug}/checkout-key/{fingerprint}",
        {
          params: {
            path: { "project-slug": projectSlug, fingerprint },
          },
        },
      );

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log(`Fingerprint: ${response.data.fingerprint}`);
        console.log(`Type: ${response.data.type}`);
        console.log(`Preferred: ${response.data.preferred ? "Yes" : "No"}`);
        console.log(`Created At: ${response.data["created-at"]}`);
        if (response.data["public-key"]) {
          console.log(`Public Key: ${response.data["public-key"]}`);
        }
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // project checkout-key delete
  .command("delete")
  .description("Delete a checkout key")
  .arguments("<project-slug:string> <fingerprint:string>")
  .action(async (_options, projectSlug, fingerprint) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.DELETE(
        "/project/{project-slug}/checkout-key/{fingerprint}",
        {
          params: {
            path: { "project-slug": projectSlug, fingerprint },
          },
        },
      );

      if (response.error) {
        throw new Error(response.error.message);
      }

      console.log(`Checkout key ${fingerprint} deleted.`);
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  });

// Settings subcommand
const settingsCommand = new Command()
  .name("settings")
  .description("Manage project settings (experimental)")
  // project settings get
  .command("get")
  .description("Get project settings")
  .arguments("<provider:string> <organization:string> <project:string>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, provider, organization, project) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET(
        "/project/{provider}/{organization}/{project}/settings",
        {
          params: {
            path: { provider, organization, project },
          },
        },
      );

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        const advanced = response.data.advanced || {};
        console.log("Advanced Settings:");
        console.log(`  Build Fork PRs: ${advanced.build_fork_prs}`);
        console.log(
          `  Fork PR Runs On Self-Hosted: ${advanced.forks_receive_secret_env_vars}`,
        );
        console.log(`  Build PRs: ${advanced.build_prs_only}`);
        console.log(`  Autocancel Builds: ${advanced.autocancel_builds}`);
        console.log(`  OSS: ${advanced.oss}`);
        console.log(`  Set GitHub Status: ${advanced.set_github_status}`);
        console.log(`  Setup Workflows: ${advanced.setup_workflows}`);
        console.log(
          `  Write Settings Required: ${advanced.write_settings_requires_admin}`,
        );
        if (advanced.disable_ssh !== undefined) {
          console.log(`  Disable SSH: ${advanced.disable_ssh}`);
        }
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // project settings update
  .command("update")
  .description("Update project settings")
  .arguments("<provider:string> <organization:string> <project:string>")
  .option("--build-fork-prs <value:boolean>", "Build pull requests from forks")
  .option("--autocancel-builds <value:boolean>", "Auto-cancel redundant builds")
  .option("--oss <value:boolean>", "Free and open source project")
  .option("--set-github-status <value:boolean>", "Set GitHub status")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, provider, organization, project) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const advanced: Record<string, boolean | undefined> = {};
      if (options.buildForkPrs !== undefined) {
        advanced.build_fork_prs = options.buildForkPrs;
      }
      if (options.autocancelBuilds !== undefined) {
        advanced.autocancel_builds = options.autocancelBuilds;
      }
      if (options.oss !== undefined) {
        advanced.oss = options.oss;
      }
      if (options.setGithubStatus !== undefined) {
        advanced.set_github_status = options.setGithubStatus;
      }

      const response = await client.PATCH(
        "/project/{provider}/{organization}/{project}/settings",
        {
          params: {
            path: { provider, organization, project },
          },
          body: { advanced },
        },
      );

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log("Project settings updated successfully.");
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  });

export const projectCommand = new Command()
  .name("project")
  .description("Manage CircleCI projects")
  // project get
  .command("get")
  .description("Get a project by slug")
  .arguments("<project-slug:string>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, projectSlug) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET("/project/{project-slug}", {
        params: {
          path: { "project-slug": projectSlug },
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
        console.log(`Slug: ${response.data.slug}`);
        console.log(`Name: ${response.data.name}`);
        console.log(`ID: ${response.data.id}`);
        console.log(`Organization Name: ${response.data.organization_name}`);
        console.log(`Organization Slug: ${response.data.organization_slug}`);
        console.log(`Organization ID: ${response.data.organization_id}`);
        if (response.data.vcs_info) {
          console.log(`VCS URL: ${response.data.vcs_info.vcs_url}`);
          console.log(`Provider: ${response.data.vcs_info.provider}`);
          console.log(
            `Default Branch: ${response.data.vcs_info.default_branch}`,
          );
        }
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // project create (experimental)
  .command("create")
  .description("Create a new project (experimental)")
  .arguments("<provider:string> <organization:string> <project:string>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, provider, organization, project) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.POST(
        "/project/{provider}/{organization}/{project}",
        {
          params: {
            path: { provider, organization, project },
          },
        },
      );

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log(`Project created.`);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  .command("env", envCommand)
  .reset()
  .command("checkout-key", checkoutKeyCommand)
  .reset()
  .command("settings", settingsCommand);
