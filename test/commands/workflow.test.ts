import { describe, it, expect, vi, beforeEach } from "vitest";
import { workflowCommand } from "../../src/commands/workflow.js";

describe("workflow command", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("command structure", () => {
    it("should have a get subcommand", () => {
      const subcommand = workflowCommand.getCommand("get");
      expect(subcommand?.getName()).toBe("get");
    });

    it("should have a jobs subcommand", () => {
      const subcommand = workflowCommand.getCommand("jobs");
      expect(subcommand?.getName()).toBe("jobs");
    });

    it("should have a rerun subcommand", () => {
      const subcommand = workflowCommand.getCommand("rerun");
      expect(subcommand?.getName()).toBe("rerun");
    });

    it("should have a cancel subcommand", () => {
      const subcommand = workflowCommand.getCommand("cancel");
      expect(subcommand?.getName()).toBe("cancel");
    });

    it("should have an approve subcommand", () => {
      const subcommand = workflowCommand.getCommand("approve");
      expect(subcommand?.getName()).toBe("approve");
    });
  });

  describe("get subcommand options", () => {
    it("should have --json and --yaml options", () => {
      const getCommand = workflowCommand.getCommand("get");
      const options = getCommand?.getOptions();
      const jsonOption = options?.find((o) => o.name === "json");
      const yamlOption = options?.find((o) => o.name === "yaml");
      expect(jsonOption).toBeDefined();
      expect(yamlOption).toBeDefined();
    });
  });

  describe("rerun subcommand options", () => {
    it("should have --from-failed option", () => {
      const rerunCommand = workflowCommand.getCommand("rerun");
      const options = rerunCommand?.getOptions();
      const fromFailedOption = options?.find((o) => o.name === "from-failed");
      expect(fromFailedOption).toBeDefined();
    });

    it("should have --sparse-tree option", () => {
      const rerunCommand = workflowCommand.getCommand("rerun");
      const options = rerunCommand?.getOptions();
      const sparseTreeOption = options?.find((o) => o.name === "sparse-tree");
      expect(sparseTreeOption).toBeDefined();
    });

    it("should have --jobs option", () => {
      const rerunCommand = workflowCommand.getCommand("rerun");
      const options = rerunCommand?.getOptions();
      const jobsOption = options?.find((o) => o.name === "jobs");
      expect(jobsOption).toBeDefined();
    });
  });
});
