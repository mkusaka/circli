import { describe, it, expect, vi, beforeEach } from "vitest";
import { oidcCommand } from "../../src/commands/oidc.js";

describe("oidc command", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("command structure", () => {
    it("should have an org subcommand", () => {
      const subcommand = oidcCommand.getCommand("org");
      expect(subcommand?.getName()).toBe("org");
    });

    it("should have a project subcommand", () => {
      const subcommand = oidcCommand.getCommand("project");
      expect(subcommand?.getName()).toBe("project");
    });
  });

  describe("org subcommand structure", () => {
    it("should have get, set, delete subcommands", () => {
      const orgCommand = oidcCommand.getCommand("org");
      expect(orgCommand?.getCommand("get")?.getName()).toBe("get");
      expect(orgCommand?.getCommand("set")?.getName()).toBe("set");
      expect(orgCommand?.getCommand("delete")?.getName()).toBe("delete");
    });
  });

  describe("org set subcommand options", () => {
    it("should have --audience option", () => {
      const orgCommand = oidcCommand.getCommand("org");
      const setCommand = orgCommand?.getCommand("set");
      const options = setCommand?.getOptions();
      const audienceOption = options?.find((o) => o.name === "audience");
      expect(audienceOption).toBeDefined();
    });

    it("should have --json and --yaml options", () => {
      const orgCommand = oidcCommand.getCommand("org");
      const setCommand = orgCommand?.getCommand("set");
      const options = setCommand?.getOptions();
      const jsonOption = options?.find((o) => o.name === "json");
      const yamlOption = options?.find((o) => o.name === "yaml");
      expect(jsonOption).toBeDefined();
      expect(yamlOption).toBeDefined();
    });
  });

  describe("project subcommand structure", () => {
    it("should have get, set, delete subcommands", () => {
      const projectCommand = oidcCommand.getCommand("project");
      expect(projectCommand?.getCommand("get")?.getName()).toBe("get");
      expect(projectCommand?.getCommand("set")?.getName()).toBe("set");
      expect(projectCommand?.getCommand("delete")?.getName()).toBe("delete");
    });
  });

  describe("project set subcommand options", () => {
    it("should have --audience option", () => {
      const projectCommand = oidcCommand.getCommand("project");
      const setCommand = projectCommand?.getCommand("set");
      const options = setCommand?.getOptions();
      const audienceOption = options?.find((o) => o.name === "audience");
      expect(audienceOption).toBeDefined();
    });

    it("should have --json and --yaml options", () => {
      const projectCommand = oidcCommand.getCommand("project");
      const setCommand = projectCommand?.getCommand("set");
      const options = setCommand?.getOptions();
      const jsonOption = options?.find((o) => o.name === "json");
      const yamlOption = options?.find((o) => o.name === "yaml");
      expect(jsonOption).toBeDefined();
      expect(yamlOption).toBeDefined();
    });
  });
});
