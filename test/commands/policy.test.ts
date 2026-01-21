import { describe, it, expect, vi, beforeEach } from "vitest";
import { policyCommand } from "../../src/commands/policy.js";

describe("policy command", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("command structure", () => {
    it("should have a decision subcommand", () => {
      const subcommand = policyCommand.getCommand("decision");
      expect(subcommand?.getName()).toBe("decision");
    });

    it("should have a settings subcommand", () => {
      const subcommand = policyCommand.getCommand("settings");
      expect(subcommand?.getName()).toBe("settings");
    });

    it("should have a bundle subcommand", () => {
      const subcommand = policyCommand.getCommand("bundle");
      expect(subcommand?.getName()).toBe("bundle");
    });

    it("should have a document subcommand", () => {
      const subcommand = policyCommand.getCommand("document");
      expect(subcommand?.getName()).toBe("document");
    });
  });

  describe("decision subcommand structure", () => {
    it("should have list, get, make subcommands", () => {
      const decisionCommand = policyCommand.getCommand("decision");
      expect(decisionCommand?.getCommand("list")?.getName()).toBe("list");
      expect(decisionCommand?.getCommand("get")?.getName()).toBe("get");
      expect(decisionCommand?.getCommand("make")?.getName()).toBe("make");
    });
  });

  describe("decision list subcommand options", () => {
    it("should have context option with default", () => {
      const decisionCommand = policyCommand.getCommand("decision");
      const listCommand = decisionCommand?.getCommand("list");
      const options = listCommand?.getOptions();
      const contextOption = options?.find((o) => o.name === "context");
      expect(contextOption).toBeDefined();
      expect(contextOption?.default).toBe("config");
    });

    it("should have filter options", () => {
      const decisionCommand = policyCommand.getCommand("decision");
      const listCommand = decisionCommand?.getCommand("list");
      const options = listCommand?.getOptions();
      expect(options?.find((o) => o.name === "status")).toBeDefined();
      expect(options?.find((o) => o.name === "after")).toBeDefined();
      expect(options?.find((o) => o.name === "branch")).toBeDefined();
      expect(options?.find((o) => o.name === "project-id")).toBeDefined();
    });
  });

  describe("decision make subcommand options", () => {
    it("should require --input option", () => {
      const decisionCommand = policyCommand.getCommand("decision");
      const makeCommand = decisionCommand?.getCommand("make");
      const options = makeCommand?.getOptions();
      const inputOption = options?.find((o) => o.name === "input");
      expect(inputOption?.required).toBe(true);
    });
  });

  describe("settings subcommand structure", () => {
    it("should have get and set subcommands", () => {
      const settingsCommand = policyCommand.getCommand("settings");
      expect(settingsCommand?.getCommand("get")?.getName()).toBe("get");
      expect(settingsCommand?.getCommand("set")?.getName()).toBe("set");
    });
  });

  describe("settings set subcommand options", () => {
    it("should require --enabled option", () => {
      const settingsCommand = policyCommand.getCommand("settings");
      const setCommand = settingsCommand?.getCommand("set");
      const options = setCommand?.getOptions();
      const enabledOption = options?.find((o) => o.name === "enabled");
      expect(enabledOption?.required).toBe(true);
    });
  });

  describe("bundle subcommand structure", () => {
    it("should have get and create subcommands", () => {
      const bundleCommand = policyCommand.getCommand("bundle");
      expect(bundleCommand?.getCommand("get")?.getName()).toBe("get");
      expect(bundleCommand?.getCommand("create")?.getName()).toBe("create");
    });
  });

  describe("bundle create subcommand options", () => {
    it("should require --policies option", () => {
      const bundleCommand = policyCommand.getCommand("bundle");
      const createCommand = bundleCommand?.getCommand("create");
      const options = createCommand?.getOptions();
      const policiesOption = options?.find((o) => o.name === "policies");
      expect(policiesOption?.required).toBe(true);
    });

    it("should have --dry-run option", () => {
      const bundleCommand = policyCommand.getCommand("bundle");
      const createCommand = bundleCommand?.getCommand("create");
      const options = createCommand?.getOptions();
      const dryRunOption = options?.find((o) => o.name === "dry-run");
      expect(dryRunOption).toBeDefined();
    });
  });

  describe("document subcommand structure", () => {
    it("should have get subcommand", () => {
      const documentCommand = policyCommand.getCommand("document");
      expect(documentCommand?.getCommand("get")?.getName()).toBe("get");
    });
  });
});
