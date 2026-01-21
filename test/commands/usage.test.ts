import { describe, it, expect, vi, beforeEach } from "vitest";
import { usageCommand } from "../../src/commands/usage.js";

describe("usage command", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("command structure", () => {
    it("should have an export subcommand", () => {
      const subcommand = usageCommand.getCommand("export");
      expect(subcommand?.getName()).toBe("export");
    });

    it("export subcommand should have description", () => {
      const subcommand = usageCommand.getCommand("export");
      expect(subcommand?.getDescription()).toBe("Manage usage exports");
    });
  });

  describe("command name and description", () => {
    it("should have correct name", () => {
      expect(usageCommand.getName()).toBe("usage");
    });

    it("should have correct description", () => {
      expect(usageCommand.getDescription()).toBe(
        "Manage CircleCI usage export",
      );
    });
  });
});
