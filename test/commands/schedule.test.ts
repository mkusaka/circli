import { describe, it, expect, vi, beforeEach } from "vitest";
import { scheduleCommand } from "../../src/commands/schedule.js";

describe("schedule command", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("command structure", () => {
    it("should have a list subcommand", () => {
      const subcommand = scheduleCommand.getCommand("list");
      expect(subcommand?.getName()).toBe("list");
    });

    it("should have a get subcommand", () => {
      const subcommand = scheduleCommand.getCommand("get");
      expect(subcommand?.getName()).toBe("get");
    });

    it("should have a create subcommand", () => {
      const subcommand = scheduleCommand.getCommand("create");
      expect(subcommand?.getName()).toBe("create");
    });

    it("should have an update subcommand", () => {
      const subcommand = scheduleCommand.getCommand("update");
      expect(subcommand?.getName()).toBe("update");
    });

    it("should have a delete subcommand", () => {
      const subcommand = scheduleCommand.getCommand("delete");
      expect(subcommand?.getName()).toBe("delete");
    });
  });

  describe("create subcommand options", () => {
    it("should require --name option", () => {
      const createCommand = scheduleCommand.getCommand("create");
      const options = createCommand?.getOptions();
      const nameOption = options?.find((o) => o.name === "name");
      expect(nameOption?.required).toBe(true);
    });

    it("should require --branch option", () => {
      const createCommand = scheduleCommand.getCommand("create");
      const options = createCommand?.getOptions();
      const branchOption = options?.find((o) => o.name === "branch");
      expect(branchOption?.required).toBe(true);
    });

    it("should require --per-hour option", () => {
      const createCommand = scheduleCommand.getCommand("create");
      const options = createCommand?.getOptions();
      const perHourOption = options?.find((o) => o.name === "per-hour");
      expect(perHourOption?.required).toBe(true);
    });

    it("should have timetable options", () => {
      const createCommand = scheduleCommand.getCommand("create");
      const options = createCommand?.getOptions();
      expect(options?.find((o) => o.name === "hours-of-day")).toBeDefined();
      expect(options?.find((o) => o.name === "days-of-week")).toBeDefined();
      expect(options?.find((o) => o.name === "days-of-month")).toBeDefined();
      expect(options?.find((o) => o.name === "months")).toBeDefined();
    });
  });

  describe("update subcommand options", () => {
    it("should have optional update options", () => {
      const updateCommand = scheduleCommand.getCommand("update");
      const options = updateCommand?.getOptions();
      expect(options?.find((o) => o.name === "name")).toBeDefined();
      expect(options?.find((o) => o.name === "description")).toBeDefined();
      expect(options?.find((o) => o.name === "per-hour")).toBeDefined();
    });
  });
});
