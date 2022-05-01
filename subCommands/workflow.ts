import { Command } from "../deps.ts";
import {
  cancelRedundant,
  name as cancelRedundantName,
} from "./workflow/cancelRedundant.ts";
import { cancel, name as cancelName } from "./workflow/cancel.ts";

export const name = "workflow";
export const workflow = await new Command()
  .description("workflow command")
  .command(cancelRedundantName, cancelRedundant)
  .command(cancelName, cancel);
