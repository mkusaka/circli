import { assertEquals } from "vitest/assert"; // vitest の assert を利用
import { describe, it, beforeEach } from "vitest";
import { pipelineCommand } from "../../src/commands/pipeline";
import { Command } from "@cliffy/command";

describe("pipeline command", () => {
  let command: Command;

  beforeEach(() => {
    command = pipelineCommand;
  });

  it("should have a list subcommand", () => {
    const subcommand = command.getCommand("list");
    assertEquals(subcommand?.getName(), "list");
  });
});
