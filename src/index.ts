#!/usr/bin/env node
// src/index.ts
import { cli } from "./cli.js";

cli.parse(process.argv.slice(2));
