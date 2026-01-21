// src/commands/workflow.ts
import { Command } from "@cliffy/command";
import { createClient } from "../utils/api.js";
import { printJson, printYaml, printTable } from "../utils/output.js";
import { handleApiError } from "../utils/error.js";

export const workflowCommand = new Command()
  .name("workflow")
  .description("Manage CircleCI workflows")
  // workflow get
  .command("get")
  .description("Get a workflow by ID")
  .arguments("<workflow-id:string>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, workflowId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET("/workflow/{id}", {
        params: {
          path: { id: workflowId },
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
        console.log(`Status: ${response.data.status}`);
        console.log(`Pipeline ID: ${response.data.pipeline_id}`);
        console.log(`Pipeline Number: ${response.data.pipeline_number}`);
        console.log(`Project Slug: ${response.data.project_slug}`);
        console.log(`Created At: ${response.data.created_at}`);
        console.log(`Stopped At: ${response.data.stopped_at || "-"}`);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // workflow jobs
  .command("jobs")
  .description("List jobs in a workflow")
  .arguments("<workflow-id:string>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, workflowId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET("/workflow/{id}/job", {
        params: {
          path: { id: workflowId },
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
        const headers = ["ID", "Name", "Type", "Status", "Job Number", "Started At"];
        const rows = response.data.items.map((j) => [
          j.id,
          j.name,
          j.type || "-",
          j.status || "-",
          j.job_number !== undefined ? String(j.job_number) : "-",
          j.started_at || "-",
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
  // workflow rerun
  .command("rerun")
  .description("Rerun a workflow")
  .arguments("<workflow-id:string>")
  .option("--from-failed", "Rerun from failed jobs only")
  .option("--sparse-tree", "Use sparse tree for rerun")
  .option("--jobs <jobs:string>", "Comma-separated list of job IDs to rerun")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, workflowId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const body: {
        enable_ssh?: boolean;
        from_failed?: boolean;
        jobs?: string[];
        sparse_tree?: boolean;
      } = {};

      if (options.fromFailed) {
        body.from_failed = true;
      }
      if (options.sparseTree) {
        body.sparse_tree = true;
      }
      if (options.jobs) {
        body.jobs = options.jobs.split(",").map((j: string) => j.trim());
      }

      const response = await client.POST("/workflow/{id}/rerun", {
        params: {
          path: { id: workflowId },
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
        console.log(`Workflow ${workflowId} rerun initiated.`);
        console.log(`New Workflow ID: ${response.data.workflow_id}`);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // workflow cancel
  .command("cancel")
  .description("Cancel a workflow")
  .arguments("<workflow-id:string>")
  .action(async (_options, workflowId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.POST("/workflow/{id}/cancel", {
        params: {
          path: { id: workflowId },
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      console.log(`Workflow ${workflowId} cancelled.`);
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // workflow approve
  .command("approve")
  .description("Approve a pending approval job in a workflow")
  .arguments("<workflow-id:string> <approval-request-id:string>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, workflowId, approvalRequestId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.POST("/workflow/{id}/approve/{approval_request_id}", {
        params: {
          path: { id: workflowId, approval_request_id: approvalRequestId },
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
        console.log(`Approval request ${approvalRequestId} approved in workflow ${workflowId}.`);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  });
