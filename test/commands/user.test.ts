import { describe, it, expect, vi, beforeEach } from "vitest";
import { userCommand } from "../../src/commands/user.js";

describe("user command", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("command structure", () => {
    it("should have a me subcommand", () => {
      const subcommand = userCommand.getCommand("me");
      expect(subcommand?.getName()).toBe("me");
    });

    it("should have a collaborations subcommand", () => {
      const subcommand = userCommand.getCommand("collaborations");
      expect(subcommand?.getName()).toBe("collaborations");
    });

    it("should have a get subcommand", () => {
      const subcommand = userCommand.getCommand("get");
      expect(subcommand?.getName()).toBe("get");
    });
  });

  describe("me subcommand options", () => {
    it("should have --json and --yaml options", () => {
      const meCommand = userCommand.getCommand("me");
      const options = meCommand?.getOptions();
      const jsonOption = options?.find((o) => o.name === "json");
      const yamlOption = options?.find((o) => o.name === "yaml");
      expect(jsonOption).toBeDefined();
      expect(yamlOption).toBeDefined();
    });
  });

  describe("collaborations subcommand options", () => {
    it("should have --json and --yaml options", () => {
      const collaborationsCommand = userCommand.getCommand("collaborations");
      const options = collaborationsCommand?.getOptions();
      const jsonOption = options?.find((o) => o.name === "json");
      const yamlOption = options?.find((o) => o.name === "yaml");
      expect(jsonOption).toBeDefined();
      expect(yamlOption).toBeDefined();
    });
  });

  describe("get subcommand options", () => {
    it("should have --json and --yaml options", () => {
      const getCommand = userCommand.getCommand("get");
      const options = getCommand?.getOptions();
      const jsonOption = options?.find((o) => o.name === "json");
      const yamlOption = options?.find((o) => o.name === "yaml");
      expect(jsonOption).toBeDefined();
      expect(yamlOption).toBeDefined();
    });
  });
});
