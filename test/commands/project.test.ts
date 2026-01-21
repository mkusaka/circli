import { describe, it, expect, vi, beforeEach } from "vitest";
import { projectCommand } from "../../src/commands/project.js";

describe("project command", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("command structure", () => {
    it("should have a get subcommand", () => {
      const subcommand = projectCommand.getCommand("get");
      expect(subcommand?.getName()).toBe("get");
    });

    it("should have a create subcommand", () => {
      const subcommand = projectCommand.getCommand("create");
      expect(subcommand?.getName()).toBe("create");
    });

    it("should have an env subcommand", () => {
      const subcommand = projectCommand.getCommand("env");
      expect(subcommand?.getName()).toBe("env");
    });

    it("should have a checkout-key subcommand", () => {
      const subcommand = projectCommand.getCommand("checkout-key");
      expect(subcommand?.getName()).toBe("checkout-key");
    });

    it("should have a settings subcommand", () => {
      const subcommand = projectCommand.getCommand("settings");
      expect(subcommand?.getName()).toBe("settings");
    });
  });

  describe("env subcommand structure", () => {
    it("should have list, get, set, delete subcommands", () => {
      const envCommand = projectCommand.getCommand("env");
      expect(envCommand?.getCommand("list")?.getName()).toBe("list");
      expect(envCommand?.getCommand("get")?.getName()).toBe("get");
      expect(envCommand?.getCommand("set")?.getName()).toBe("set");
      expect(envCommand?.getCommand("delete")?.getName()).toBe("delete");
    });
  });

  describe("checkout-key subcommand structure", () => {
    it("should have list, create, get, delete subcommands", () => {
      const checkoutKeyCommand = projectCommand.getCommand("checkout-key");
      expect(checkoutKeyCommand?.getCommand("list")?.getName()).toBe("list");
      expect(checkoutKeyCommand?.getCommand("create")?.getName()).toBe("create");
      expect(checkoutKeyCommand?.getCommand("get")?.getName()).toBe("get");
      expect(checkoutKeyCommand?.getCommand("delete")?.getName()).toBe("delete");
    });
  });

  describe("settings subcommand structure", () => {
    it("should have get and update subcommands", () => {
      const settingsCommand = projectCommand.getCommand("settings");
      expect(settingsCommand?.getCommand("get")?.getName()).toBe("get");
      expect(settingsCommand?.getCommand("update")?.getName()).toBe("update");
    });
  });

  describe("settings update subcommand options", () => {
    it("should have build and config options", () => {
      const settingsCommand = projectCommand.getCommand("settings");
      const updateCommand = settingsCommand?.getCommand("update");
      const options = updateCommand?.getOptions();
      expect(options?.find((o) => o.name === "build-fork-prs")).toBeDefined();
      expect(options?.find((o) => o.name === "autocancel-builds")).toBeDefined();
      expect(options?.find((o) => o.name === "oss")).toBeDefined();
      expect(options?.find((o) => o.name === "set-github-status")).toBeDefined();
    });
  });
});
