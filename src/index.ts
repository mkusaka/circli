#!/usr/bin/env node
// src/index.ts
import { cli } from "./cli";

if (import.meta.main) {
  cli.parse(Deno.args);
}
