import { Command } from "../deps.ts";
import { cancelRedundant } from "./workflow/cancelRedundant.ts";

export const workflow = await new Command()
  .description("workflow command")
  .command("cancel_redundant_workflow", cancelRedundant);
