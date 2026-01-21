import { describe, it, expect, vi, beforeEach } from "vitest";
import { webhookCommand } from "../../src/commands/webhook.js";

describe("webhook command", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("command structure", () => {
    it("should have a list subcommand", () => {
      const subcommand = webhookCommand.getCommand("list");
      expect(subcommand?.getName()).toBe("list");
    });

    it("should have a get subcommand", () => {
      const subcommand = webhookCommand.getCommand("get");
      expect(subcommand?.getName()).toBe("get");
    });

    it("should have a create subcommand", () => {
      const subcommand = webhookCommand.getCommand("create");
      expect(subcommand?.getName()).toBe("create");
    });

    it("should have an update subcommand", () => {
      const subcommand = webhookCommand.getCommand("update");
      expect(subcommand?.getName()).toBe("update");
    });

    it("should have a delete subcommand", () => {
      const subcommand = webhookCommand.getCommand("delete");
      expect(subcommand?.getName()).toBe("delete");
    });
  });

  describe("list subcommand options", () => {
    it("should require --scope-id option", () => {
      const listCommand = webhookCommand.getCommand("list");
      const options = listCommand?.getOptions();
      const scopeIdOption = options?.find((o) => o.name === "scope-id");
      expect(scopeIdOption?.required).toBe(true);
    });

    it("should have --scope-type option with default", () => {
      const listCommand = webhookCommand.getCommand("list");
      const options = listCommand?.getOptions();
      const scopeTypeOption = options?.find((o) => o.name === "scope-type");
      expect(scopeTypeOption?.default).toBe("project");
    });
  });

  describe("create subcommand options", () => {
    it("should require --name option", () => {
      const createCommand = webhookCommand.getCommand("create");
      const options = createCommand?.getOptions();
      const nameOption = options?.find((o) => o.name === "name");
      expect(nameOption?.required).toBe(true);
    });

    it("should require --url option", () => {
      const createCommand = webhookCommand.getCommand("create");
      const options = createCommand?.getOptions();
      const urlOption = options?.find((o) => o.name === "url");
      expect(urlOption?.required).toBe(true);
    });

    it("should require --scope-id option", () => {
      const createCommand = webhookCommand.getCommand("create");
      const options = createCommand?.getOptions();
      const scopeIdOption = options?.find((o) => o.name === "scope-id");
      expect(scopeIdOption?.required).toBe(true);
    });

    it("should require --events option", () => {
      const createCommand = webhookCommand.getCommand("create");
      const options = createCommand?.getOptions();
      const eventsOption = options?.find((o) => o.name === "events");
      expect(eventsOption?.required).toBe(true);
    });

    it("should require --signing-secret option", () => {
      const createCommand = webhookCommand.getCommand("create");
      const options = createCommand?.getOptions();
      const signingSecretOption = options?.find((o) => o.name === "signing-secret");
      expect(signingSecretOption?.required).toBe(true);
    });
  });

  describe("update subcommand options", () => {
    it("should have optional update options", () => {
      const updateCommand = webhookCommand.getCommand("update");
      const options = updateCommand?.getOptions();
      expect(options?.find((o) => o.name === "name")).toBeDefined();
      expect(options?.find((o) => o.name === "url")).toBeDefined();
      expect(options?.find((o) => o.name === "events")).toBeDefined();
      expect(options?.find((o) => o.name === "verify-tls")).toBeDefined();
      expect(options?.find((o) => o.name === "signing-secret")).toBeDefined();
    });
  });
});
