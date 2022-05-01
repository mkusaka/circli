import { Command } from "../deps.ts";
import { cancelRedundant } from "./workflow/cancelRedundant.ts";
import { cancel } from "./workflow/cancel.ts";

export const workflow = await new Command()
  .description("workflow command")
  .command("cancel_redundant", cancelRedundant)
  .command("cancel", cancel);
