# circli - Unofficial CircleCI CLI

`circli` is an unofficial command-line interface for [CircleCI](https://circleci.com/), designed to be intuitive and efficient, inspired by the GitHub CLI (`gh`). It allows you to interact with CircleCI projects, pipelines, workflows, and jobs directly from your terminal.

**Note:** This CLI is under active development. It is not officially supported by CircleCI.

## Features

- **Pipeline Management:**
  - List pipelines for a project or organization.
  - Trigger new pipelines.
  - View pipeline details (including configuration and values).
- **Workflow Management:**
  - List workflows within a pipeline.
  - View workflow details.
  - Rerun workflows (from failed or specific jobs).
  - Approve approval jobs.
  - Cancel workflows.
- **Job Management:**
  - List jobs within a workflow.
  - View job details.
  - View job artifacts.
  - View job test metadata.
  - Cancel jobs.
- **Context Management:**
  - List, create, show, delete contexts
  - List, create, update and delete environment variables
- **Project Management:**
  - Create project
  - Show project details
  - List, create, show, delete checkout keys
  - List, create, show, delete environment variables
  - Get, update project settings.
- **Schedule Management:**
  - List, create, get, update, delete scheduled pipelines
- **Insights:**
  - Get project summary metrics
  - Get workflows metrics
  - Get workflow summary metrics
  - List flaky tests
  - Get job time-series data.
  - Get a list of workflow runs.
  - Get workflow job metrics.
  - Get workflow test metrics.
- **Policy:**
  - Get, create, update, and delete policies.
  - Get decision logs.
  - Get/Set decision settings.
- **Webhook:**
  - List, create, get, update, delete webhooks
- **User:**
  - Get current user info
  - Get collaborations
  - Get user by ID
- **OIDC:**
  - Get, set, delete org/project OIDC custom claims
- **Usage:**
  - Create and get usage exports
- **Configuration:**
  - Easy setup and management of API tokens and default settings.
- **Output:**
  - Human-readable output by default.
  - JSON and YAML output options for scripting.

## Installation

### Using install script (Recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/mkusaka/circli/main/install.sh | bash
```

This will automatically detect your OS and architecture and install the appropriate binary.

#### Options

```bash
# Install specific version
curl -fsSL https://raw.githubusercontent.com/mkusaka/circli/main/install.sh | bash -s -- -v v0.0.13

# Install to custom directory
curl -fsSL https://raw.githubusercontent.com/mkusaka/circli/main/install.sh | bash -s -- -d ~/.local/bin
```

### Download binary manually

Download the appropriate binary for your platform from the [Releases page](https://github.com/mkusaka/circli/releases):

| Platform | Architecture     | Download                           |
| -------- | ---------------- | ---------------------------------- |
| Linux    | x64              | `circli-linux-x64.tar.gz`          |
| Linux    | x64 (older CPUs) | `circli-linux-x64-baseline.tar.gz` |
| Linux    | arm64            | `circli-linux-arm64.tar.gz`        |
| macOS    | Intel            | `circli-darwin-x64.tar.gz`         |
| macOS    | Apple Silicon    | `circli-darwin-arm64.tar.gz`       |
| Windows  | x64              | `circli-windows-x64.zip`           |

```bash
# Linux/macOS example
tar -xzf circli-linux-x64.tar.gz
chmod +x circli-linux-x64
sudo mv circli-linux-x64 /usr/local/bin/circli
```

### Using npm/pnpm

```bash
# Using pnpm
pnpm install --global circli

# Using npm
npm install --global circli
```

**Prerequisites for npm/pnpm installation:**

- Node.js (version 20 or later)

## Getting Started

1.  **Obtain a CircleCI API Token:**

    - Go to your CircleCI User Settings: [https://app.circleci.com/settings/user](https://app.circleci.com/settings/user)
    - Create a new Personal API Token.

2.  **Configure `circli`:**

    ```bash
    circli config set api-token <your-api-token>
    ```

    You can also set a default project slug:

    ```bash
    circli config set default-project-slug <your-project-slug>
    ```

    (e.g., `gh/CircleCI-Public/api-preview-docs`)

3.  **Start using `circli`!**

    ```bash
    circli pipeline list --project-slug <your-project-slug>
    ```

## Usage

```
circli <command> <subcommand> [options] [args]
```

**Available Commands:**

- `config`: Manage CLI configuration.
- `pipeline`: Interact with pipelines.
- `workflow`: Interact with workflows.
- `job`: Interact with jobs.
- `context`: Manage contexts.
- `project`: Manage projects.
- `schedule`: Manage scheduled pipelines.
- `insights`: Retrieve insights data.
- `policy`: Manage policies.
- `webhook`: Manage webhooks.
- `user`: View user information.
- `oidc`: Manage OIDC custom claims.
- `usage`: Manage usage exports.
- `help`: Display help information.
- `version`: Display the CLI version.

Use `circli <command> --help` or `circli <command> <subcommand> --help` to see available options and subcommands.

**Examples:**

- List pipelines for a project:

  ```bash
  circli pipeline list --project-slug gh/CircleCI-Public/api-preview-docs
  ```

- Trigger a new pipeline on the `main` branch:

  ```bash
  circli pipeline trigger --project-slug gh/CircleCI-Public/api-preview-docs --branch main
  ```

- Rerun a workflow from the failed job:

  ```bash
  circli workflow rerun <workflow-id> --from-failed
  ```

- List contexts:

  ```bash
  circli context list --owner-id <owner-id>
  ```

- View current user:

  ```bash
  circli user me
  ```

## Development

To contribute to `circli`, you'll need:

- Node.js 20+
- pnpm
- Bun (for building binaries)

1.  Clone the repository:

    ```bash
    git clone https://github.com/mkusaka/circli.git
    cd circli
    ```

2.  Install dependencies:

    ```bash
    pnpm install
    ```

3.  Generate types from CircleCI OpenAPI Spec:

    ```bash
    pnpm run generate-types
    ```

4.  Build the CLI:

    ```bash
    pnpm build
    ```

5.  Run the CLI locally:

    ```bash
    pnpm start -- <command> <subcommand> ...
    ```

    or

    ```bash
    node --import tsx src/index.ts -- <command> <subcommand> ...
    ```

6.  Run tests:

    ```bash
    pnpm test
    ```

7.  Build standalone binary (using Bun):

    ```bash
    bun build --compile --minify ./src/index.ts --outfile circli
    ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
