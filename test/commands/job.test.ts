import { describe, it, expect, vi, beforeEach } from "vitest";
import { jobCommand } from "../../src/commands/job.js";

describe("job command", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("command structure", () => {
    it("should have a get subcommand", () => {
      const subcommand = jobCommand.getCommand("get");
      expect(subcommand?.getName()).toBe("get");
    });

    it("should have a cancel subcommand", () => {
      const subcommand = jobCommand.getCommand("cancel");
      expect(subcommand?.getName()).toBe("cancel");
    });

    it("should have an artifacts subcommand", () => {
      const subcommand = jobCommand.getCommand("artifacts");
      expect(subcommand?.getName()).toBe("artifacts");
    });

    it("should have a tests subcommand", () => {
      const subcommand = jobCommand.getCommand("tests");
      expect(subcommand?.getName()).toBe("tests");
    });
  });

  describe("cancel subcommand options", () => {
    it("should have --job-id option", () => {
      const cancelCommand = jobCommand.getCommand("cancel");
      const options = cancelCommand?.getOptions();
      const jobIdOption = options?.find((o) => o.name === "job-id");
      expect(jobIdOption).toBeDefined();
    });

    it("should have --project-slug and --job-number options", () => {
      const cancelCommand = jobCommand.getCommand("cancel");
      const options = cancelCommand?.getOptions();
      const projectSlugOption = options?.find((o) => o.name === "project-slug");
      const jobNumberOption = options?.find((o) => o.name === "job-number");
      expect(projectSlugOption).toBeDefined();
      expect(jobNumberOption).toBeDefined();
    });
  });

  describe("artifacts subcommand options", () => {
    it("should have --json and --yaml options", () => {
      const artifactsCommand = jobCommand.getCommand("artifacts");
      const options = artifactsCommand?.getOptions();
      const jsonOption = options?.find((o) => o.name === "json");
      const yamlOption = options?.find((o) => o.name === "yaml");
      expect(jsonOption).toBeDefined();
      expect(yamlOption).toBeDefined();
    });
  });

  describe("tests subcommand options", () => {
    it("should have --json and --yaml options", () => {
      const testsCommand = jobCommand.getCommand("tests");
      const options = testsCommand?.getOptions();
      const jsonOption = options?.find((o) => o.name === "json");
      const yamlOption = options?.find((o) => o.name === "yaml");
      expect(jsonOption).toBeDefined();
      expect(yamlOption).toBeDefined();
    });
  });
});
