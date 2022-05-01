import { Command } from "../deps.ts";
import { cancel, name as cancelName } from "./pipeline/cancel.ts";

export const name = "pipeline";
export const pipeline = await new Command()
  .description("pipeline command")
  .command(cancelName, cancel);
