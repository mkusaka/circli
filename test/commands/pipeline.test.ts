import { describe, it, expect, vi, beforeEach } from "vitest";
import { pipelineCommand } from "../../src/commands/pipeline.js";

describe("pipeline command", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("command structure", () => {
    it("should have a list subcommand", () => {
      const subcommand = pipelineCommand.getCommand("list");
      expect(subcommand?.getName()).toBe("list");
    });

    it("should have a get subcommand", () => {
      const subcommand = pipelineCommand.getCommand("get");
      expect(subcommand?.getName()).toBe("get");
    });

    it("should have a trigger subcommand", () => {
      const subcommand = pipelineCommand.getCommand("trigger");
      expect(subcommand?.getName()).toBe("trigger");
    });

    it("should have a config subcommand", () => {
      const subcommand = pipelineCommand.getCommand("config");
      expect(subcommand?.getName()).toBe("config");
    });

    it("should have a values subcommand", () => {
      const subcommand = pipelineCommand.getCommand("values");
      expect(subcommand?.getName()).toBe("values");
    });

    it("should have a workflows subcommand", () => {
      const subcommand = pipelineCommand.getCommand("workflows");
      expect(subcommand?.getName()).toBe("workflows");
    });

    it("should have a continue subcommand", () => {
      const subcommand = pipelineCommand.getCommand("continue");
      expect(subcommand?.getName()).toBe("continue");
    });

    it("should have a mine subcommand", () => {
      const subcommand = pipelineCommand.getCommand("mine");
      expect(subcommand?.getName()).toBe("mine");
    });
  });

  describe("list subcommand options", () => {
    it("should require --project-slug option", () => {
      const listCommand = pipelineCommand.getCommand("list");
      const options = listCommand?.getOptions();
      const projectSlugOption = options?.find((o) => o.name === "project-slug");
      expect(projectSlugOption?.required).toBe(true);
    });

    it("should not have --mine option (use 'pipeline mine' subcommand)", () => {
      const listCommand = pipelineCommand.getCommand("list");
      const options = listCommand?.getOptions();
      const mineOption = options?.find((o) => o.name === "mine");
      expect(mineOption).toBeUndefined();
    });

    it("should have --branch option", () => {
      const listCommand = pipelineCommand.getCommand("list");
      const options = listCommand?.getOptions();
      const branchOption = options?.find((o) => o.name === "branch");
      expect(branchOption).toBeDefined();
    });

    it("should have --json and --yaml options", () => {
      const listCommand = pipelineCommand.getCommand("list");
      const options = listCommand?.getOptions();
      const jsonOption = options?.find((o) => o.name === "json");
      const yamlOption = options?.find((o) => o.name === "yaml");
      expect(jsonOption).toBeDefined();
      expect(yamlOption).toBeDefined();
    });
  });

  describe("get subcommand options", () => {
    it("should have --pipeline-id option", () => {
      const getCommand = pipelineCommand.getCommand("get");
      const options = getCommand?.getOptions();
      const pipelineIdOption = options?.find((o) => o.name === "pipeline-id");
      expect(pipelineIdOption).toBeDefined();
    });

    it("should have --project-slug and --pipeline-number options", () => {
      const getCommand = pipelineCommand.getCommand("get");
      const options = getCommand?.getOptions();
      const projectSlugOption = options?.find((o) => o.name === "project-slug");
      const pipelineNumberOption = options?.find(
        (o) => o.name === "pipeline-number",
      );
      expect(projectSlugOption).toBeDefined();
      expect(pipelineNumberOption).toBeDefined();
    });
  });

  describe("trigger subcommand options", () => {
    it("should have --project-slug option", () => {
      const triggerCommand = pipelineCommand.getCommand("trigger");
      const options = triggerCommand?.getOptions();
      const projectSlugOption = options?.find((o) => o.name === "project-slug");
      expect(projectSlugOption).toBeDefined();
    });

    it("should have --provider, --organization, --project options", () => {
      const triggerCommand = pipelineCommand.getCommand("trigger");
      const options = triggerCommand?.getOptions();
      const providerOption = options?.find((o) => o.name === "provider");
      const orgOption = options?.find((o) => o.name === "organization");
      const projectOption = options?.find((o) => o.name === "project");
      expect(providerOption).toBeDefined();
      expect(orgOption).toBeDefined();
      expect(projectOption).toBeDefined();
    });

    it("should have --branch and --tag options", () => {
      const triggerCommand = pipelineCommand.getCommand("trigger");
      const options = triggerCommand?.getOptions();
      const branchOption = options?.find((o) => o.name === "branch");
      const tagOption = options?.find((o) => o.name === "tag");
      expect(branchOption).toBeDefined();
      expect(tagOption).toBeDefined();
    });

    it("should have --parameters option", () => {
      const triggerCommand = pipelineCommand.getCommand("trigger");
      const options = triggerCommand?.getOptions();
      const parametersOption = options?.find((o) => o.name === "parameters");
      expect(parametersOption).toBeDefined();
    });
  });
});
