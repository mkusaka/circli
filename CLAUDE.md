# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

circli is an unofficial CLI for CircleCI, inspired by the GitHub CLI (`gh`). It provides terminal-based interaction with CircleCI's API for managing pipelines, workflows, jobs, contexts, and more.

## Development Commands

```bash
pnpm build          # Compile TypeScript
pnpm start          # Run CLI locally (node --import tsx src/index.ts)
pnpm test           # Run all tests with Vitest
pnpm lint           # Lint with oxlint
pnpm format         # Format with oxfmt
pnpm format:check   # Check formatting
pnpm generate-types # Regenerate types from swagger.json
pnpm update         # Update CircleCI OpenAPI spec
```

**Running a single test:**
```bash
pnpm test src/commands/pipeline  # Run tests matching path
pnpm test -t "test name"         # Run tests matching name
```

## Architecture

**Entry point:** `src/index.ts` → `src/cli.ts`

**CLI Framework:** `@cliffy/command` - Commands are registered in `src/cli.ts` and implemented in `src/commands/`.

**API Layer:**
- `src/types/circleci.ts` - Auto-generated types from CircleCI OpenAPI spec (`swagger.json`)
- `src/utils/api.ts` - Type-safe API client using `openapi-fetch`

**Key Patterns:**

1. **Error Handling:** Uses `neverthrow` for `Result<T, E>` types. Always check `isOk()`/`isErr()` on API responses.

2. **Command Structure:** Each command module exports a Command instance. Subcommands are chained with `.command()` and `.reset()`. Standard output options: `--json`, `--yaml`.

3. **Config:** User config stored at `~/.circli/config.yml`, managed by `src/utils/config.ts`.

4. **Output:** Use formatters from `src/utils/output.ts` for consistent JSON/YAML/table output.

## Testing

- Framework: Vitest with global test functions
- API mocking: MSW (Mock Service Worker)
- Mock handlers: `test/mocks/handlers.ts`
- Test setup mocks the config module to provide a test token

## Type Generation

When the CircleCI API changes:
1. Run `pnpm update` to fetch latest OpenAPI spec
2. Run `pnpm generate-types` to regenerate `src/types/circleci.ts`
