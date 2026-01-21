import { describe, it, expect, vi, beforeEach } from "vitest";
import { contextCommand } from "../../src/commands/context.js";

describe("context command", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("command structure", () => {
    it("should have a list subcommand", () => {
      const subcommand = contextCommand.getCommand("list");
      expect(subcommand?.getName()).toBe("list");
    });

    it("should have a create subcommand", () => {
      const subcommand = contextCommand.getCommand("create");
      expect(subcommand?.getName()).toBe("create");
    });

    it("should have a get subcommand", () => {
      const subcommand = contextCommand.getCommand("get");
      expect(subcommand?.getName()).toBe("get");
    });

    it("should have a delete subcommand", () => {
      const subcommand = contextCommand.getCommand("delete");
      expect(subcommand?.getName()).toBe("delete");
    });

    it("should have an env subcommand", () => {
      const subcommand = contextCommand.getCommand("env");
      expect(subcommand?.getName()).toBe("env");
    });

    it("should have a restriction subcommand", () => {
      const subcommand = contextCommand.getCommand("restriction");
      expect(subcommand?.getName()).toBe("restriction");
    });
  });

  describe("env subcommand structure", () => {
    it("should have list, set, delete subcommands", () => {
      const envCommand = contextCommand.getCommand("env");
      expect(envCommand?.getCommand("list")?.getName()).toBe("list");
      expect(envCommand?.getCommand("set")?.getName()).toBe("set");
      expect(envCommand?.getCommand("delete")?.getName()).toBe("delete");
    });
  });

  describe("restriction subcommand structure", () => {
    it("should have list, create, delete subcommands", () => {
      const restrictionCommand = contextCommand.getCommand("restriction");
      expect(restrictionCommand?.getCommand("list")?.getName()).toBe("list");
      expect(restrictionCommand?.getCommand("create")?.getName()).toBe(
        "create",
      );
      expect(restrictionCommand?.getCommand("delete")?.getName()).toBe(
        "delete",
      );
    });
  });
});
