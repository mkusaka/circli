import { describe, it, expect, vi, beforeEach } from "vitest";
import { insightsCommand } from "../../src/commands/insights.js";

describe("insights command", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("command structure", () => {
    it("should have a summary subcommand", () => {
      const subcommand = insightsCommand.getCommand("summary");
      expect(subcommand?.getName()).toBe("summary");
    });

    it("should have a branches subcommand", () => {
      const subcommand = insightsCommand.getCommand("branches");
      expect(subcommand?.getName()).toBe("branches");
    });

    it("should have a flaky-tests subcommand", () => {
      const subcommand = insightsCommand.getCommand("flaky-tests");
      expect(subcommand?.getName()).toBe("flaky-tests");
    });

    it("should have a workflows subcommand", () => {
      const subcommand = insightsCommand.getCommand("workflows");
      expect(subcommand?.getName()).toBe("workflows");
    });

    it("should have a job-timeseries subcommand", () => {
      const subcommand = insightsCommand.getCommand("job-timeseries");
      expect(subcommand?.getName()).toBe("job-timeseries");
    });

    it("should have a workflow subcommand", () => {
      const subcommand = insightsCommand.getCommand("workflow");
      expect(subcommand?.getName()).toBe("workflow");
    });
  });

  describe("summary subcommand options", () => {
    it("should have --project-slug option", () => {
      const summaryCommand = insightsCommand.getCommand("summary");
      const options = summaryCommand?.getOptions();
      const projectSlugOption = options?.find((o) => o.name === "project-slug");
      expect(projectSlugOption).toBeDefined();
    });

    it("should have --org-slug option", () => {
      const summaryCommand = insightsCommand.getCommand("summary");
      const options = summaryCommand?.getOptions();
      const orgSlugOption = options?.find((o) => o.name === "org-slug");
      expect(orgSlugOption).toBeDefined();
    });

    it("should have --reporting-window option", () => {
      const summaryCommand = insightsCommand.getCommand("summary");
      const options = summaryCommand?.getOptions();
      const reportingWindowOption = options?.find(
        (o) => o.name === "reporting-window",
      );
      expect(reportingWindowOption).toBeDefined();
    });
  });

  describe("workflow subcommand structure", () => {
    it("should have runs, jobs, summary, tests subcommands", () => {
      const workflowCommand = insightsCommand.getCommand("workflow");
      expect(workflowCommand?.getCommand("runs")?.getName()).toBe("runs");
      expect(workflowCommand?.getCommand("jobs")?.getName()).toBe("jobs");
      expect(workflowCommand?.getCommand("summary")?.getName()).toBe("summary");
      expect(workflowCommand?.getCommand("tests")?.getName()).toBe("tests");
    });
  });

  describe("workflows subcommand options", () => {
    it("should have --branch option", () => {
      const workflowsCommand = insightsCommand.getCommand("workflows");
      const options = workflowsCommand?.getOptions();
      const branchOption = options?.find((o) => o.name === "branch");
      expect(branchOption).toBeDefined();
    });
  });

  describe("job-timeseries subcommand options", () => {
    it("should have date and granularity options", () => {
      const jobTimeseriesCommand = insightsCommand.getCommand("job-timeseries");
      const options = jobTimeseriesCommand?.getOptions();
      expect(options?.find((o) => o.name === "start-date")).toBeDefined();
      expect(options?.find((o) => o.name === "end-date")).toBeDefined();
      expect(options?.find((o) => o.name === "granularity")).toBeDefined();
    });
  });
});
