// src/commands/insights.ts
import { Command } from "@cliffy/command";
import { createClient } from "../utils/api.js";
import { printJson, printYaml, printTable } from "../utils/output.js";
import { handleApiError } from "../utils/error.js";

const workflowSubcommand = new Command()
  .name("workflow")
  .description("Workflow-specific insights")
  // insights workflow runs
  .command("runs")
  .description("Get recent runs for a workflow")
  .arguments("<project-slug:string> <workflow-name:string>")
  .option("--branch <branch:string>", "Filter by branch")
  .option("--start-date <startDate:string>", "Start date (ISO 8601)")
  .option("--end-date <endDate:string>", "End date (ISO 8601)")
  .option("--page-token <token:string>", "Next page token")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, projectSlug, workflowName) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET("/insights/{project-slug}/workflows/{workflow-name}", {
        params: {
          path: {
            "project-slug": projectSlug,
            "workflow-name": workflowName,
          },
          query: {
            branch: options.branch,
            "start-date": options.startDate,
            "end-date": options.endDate,
            "page-token": options.pageToken,
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
        const headers = ["ID", "Status", "Duration", "Credits", "Created At"];
        const rows = response.data.items.map((r) => [
          r.id,
          r.status,
          `${r.duration}s`,
          String(r.credits_used || 0),
          r.created_at,
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
  // insights workflow jobs
  .command("jobs")
  .description("Get job metrics for a workflow")
  .arguments("<project-slug:string> <workflow-name:string>")
  .option("--branch <branch:string>", "Filter by branch")
  .option("--page-token <token:string>", "Next page token")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, projectSlug, workflowName) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET("/insights/{project-slug}/workflows/{workflow-name}/jobs", {
        params: {
          path: {
            "project-slug": projectSlug,
            "workflow-name": workflowName,
          },
          query: {
            branch: options.branch,
            "page-token": options.pageToken,
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
        const headers = ["Name", "Success Rate", "Throughput", "Avg Duration", "Total Runs"];
        const rows = response.data.items.map((j) => [
          j.name,
          j.metrics?.success_rate !== undefined
            ? `${(j.metrics.success_rate * 100).toFixed(1)}%`
            : "-",
          String(j.metrics?.throughput || 0),
          j.metrics?.duration_metrics?.mean !== undefined
            ? `${j.metrics.duration_metrics.mean.toFixed(0)}s`
            : "-",
          String(j.metrics?.total_runs || 0),
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
  // insights workflow summary
  .command("summary")
  .description("Get workflow summary metrics and trends")
  .arguments("<project-slug:string> <workflow-name:string>")
  .option("--branch <branch:string>", "Filter by branch")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, projectSlug, workflowName) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET(
        "/insights/{project-slug}/workflows/{workflow-name}/summary",
        {
          params: {
            path: {
              "project-slug": projectSlug,
              "workflow-name": workflowName,
            },
            query: { branch: options.branch },
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
        const metrics = response.data.metrics || {};
        const trends = response.data.trends || {};
        console.log("Current Metrics:");
        console.log(`  Total Runs: ${metrics.total_runs || 0}`);
        console.log(`  Successful Runs: ${metrics.successful_runs || 0}`);
        console.log(`  Failed Runs: ${metrics.failed_runs || 0}`);
        console.log(
          `  Success Rate: ${metrics.success_rate !== undefined ? (metrics.success_rate * 100).toFixed(1) + "%" : "-"}`,
        );
        console.log(`  Throughput: ${metrics.throughput || 0}`);
        console.log(`  MTTR: ${metrics.mttr || "-"}`);
        console.log(`  Total Credits: ${metrics.total_credits_used || 0}`);
        console.log("\nTrends (vs previous window):");
        console.log(`  Total Runs: ${trends.total_runs || 0}`);
        console.log(`  Success Rate: ${trends.success_rate || 0}`);
        console.log(`  Throughput: ${trends.throughput || 0}`);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // insights workflow tests
  .command("tests")
  .description("Get test metrics for a workflow")
  .arguments("<project-slug:string> <workflow-name:string>")
  .option("--branch <branch:string>", "Filter by branch")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, projectSlug, workflowName) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET(
        "/insights/{project-slug}/workflows/{workflow-name}/test-metrics",
        {
          params: {
            path: {
              "project-slug": projectSlug,
              "workflow-name": workflowName,
            },
            query: { branch: options.branch },
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
        console.log(`Average Test Count: ${response.data.average_test_count}`);
        console.log(`Most Failed Tests:`);
        const tests = response.data.most_failed_tests || [];
        if (tests.length === 0) {
          console.log("  No failed tests");
        } else {
          for (const t of tests.slice(0, 10)) {
            console.log(
              `  - ${t.test_name} (${t.classname || "no class"}): ${t.failed_runs || 0} failures`,
            );
          }
        }
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  });

export const insightsCommand = new Command()
  .name("insights")
  .description("Get CircleCI insights and analytics")
  // insights summary (project)
  .command("summary")
  .description("Get project or organization summary")
  .option("--project-slug <projectSlug:string>", "Project slug for project summary")
  .option("--org-slug <orgSlug:string>", "Organization slug for org summary")
  .option(
    "--reporting-window <window:string>",
    "Reporting window (last-7-days, last-30-days, etc.)",
  )
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
      if (options.projectSlug) {
        const response = await client.GET("/insights/pages/{project-slug}/summary", {
          params: {
            path: { "project-slug": options.projectSlug },
            query: {
              "reporting-window": options.reportingWindow as
                | "last-7-days"
                | "last-24-hours"
                | "last-30-days"
                | "last-60-days"
                | "last-90-days"
                | undefined,
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
          printJson(response.data);
        }
      } else if (options.orgSlug) {
        const response = await client.GET("/insights/{org-slug}/summary", {
          params: {
            path: { "org-slug": options.orgSlug },
            query: {
              "reporting-window": options.reportingWindow as
                | "last-7-days"
                | "last-24-hours"
                | "last-30-days"
                | "last-60-days"
                | "last-90-days"
                | undefined,
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
          const data = response.data;
          const metrics = data.org_data?.metrics || {};
          console.log("Organization Summary:");
          console.log(`  Total Runs: ${metrics.total_runs || 0}`);
          console.log(
            `  Success Rate: ${metrics.success_rate !== undefined ? (metrics.success_rate * 100).toFixed(1) + "%" : "-"}`,
          );
          console.log(`  Total Credits: ${metrics.total_credits_used || 0}`);
        }
      } else {
        console.error("Please provide either --project-slug or --org-slug");
        process.exit(1);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // insights branches
  .command("branches")
  .description("List branches for a project")
  .arguments("<project-slug:string>")
  .option("--workflow-name <workflowName:string>", "Filter by workflow name")
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
      const response = await client.GET("/insights/{project-slug}/branches", {
        params: {
          path: { "project-slug": projectSlug },
          query: { "workflow-name": options.workflowName },
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
        console.log("Branches:");
        for (const branch of response.data.branches || []) {
          console.log(`  - ${branch}`);
        }
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // insights flaky-tests
  .command("flaky-tests")
  .description("Get flaky tests for a project")
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
      const response = await client.GET("/insights/{project-slug}/flaky-tests", {
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
        const headers = ["Test Name", "Classname", "File", "Source", "Times Flaked"];
        const rows =
          response.data["flaky-tests"]?.map((t) => [
            t["test-name"] || "-",
            t.classname || "-",
            t.file || "-",
            t.source || "-",
            String(t["times-flaked"] || 0),
          ]) || [];
        if (rows.length === 0) {
          console.log("No flaky tests found.");
        } else {
          console.log(`Total Flaky Tests: ${response.data["total-flaky-tests"] || 0}`);
          printTable(headers, rows);
        }
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // insights workflows
  .command("workflows")
  .description("Get workflow metrics for a project")
  .arguments("<project-slug:string>")
  .option("--branch <branch:string>", "Filter by branch")
  .option("--page-token <token:string>", "Next page token")
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
      const response = await client.GET("/insights/{project-slug}/workflows", {
        params: {
          path: { "project-slug": projectSlug },
          query: {
            branch: options.branch,
            "page-token": options.pageToken,
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
        const headers = ["Name", "Success Rate", "Total Runs", "Avg Duration", "Total Credits"];
        const rows = response.data.items.map((w) => [
          w.name,
          w.metrics?.success_rate !== undefined
            ? `${(w.metrics.success_rate * 100).toFixed(1)}%`
            : "-",
          String(w.metrics?.total_runs || 0),
          w.metrics?.duration_metrics?.mean !== undefined
            ? `${w.metrics.duration_metrics.mean.toFixed(0)}s`
            : "-",
          String(w.metrics?.total_credits_used || 0),
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
  // insights job timeseries
  .command("job-timeseries")
  .description("Get job time series data")
  .arguments("<project-slug:string> <workflow-name:string>")
  .option("--branch <branch:string>", "Filter by branch")
  .option("--start-date <startDate:string>", "Start date (ISO 8601)")
  .option("--end-date <endDate:string>", "End date (ISO 8601)")
  .option("--granularity <granularity:string>", "Granularity (daily, hourly)")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, projectSlug, workflowName) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET(
        "/insights/time-series/{project-slug}/workflows/{workflow-name}/jobs",
        {
          params: {
            path: {
              "project-slug": projectSlug,
              "workflow-name": workflowName,
            },
            query: {
              branch: options.branch,
              "start-date": options.startDate,
              "end-date": options.endDate,
              granularity: options.granularity as "daily" | "hourly" | undefined,
            },
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
        printJson(response.data);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  .command("workflow", workflowSubcommand);
