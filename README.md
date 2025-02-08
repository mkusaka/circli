```markdown
# circli - Unofficial CircleCI CLI

`circli` is an unofficial command-line interface for [CircleCI](https://circleci.com/), designed to be intuitive and efficient, inspired by the GitHub CLI (`gh`). It allows you to interact with CircleCI projects, pipelines, workflows, and jobs directly from your terminal.

**Note:** This CLI is under active development and is not yet feature-complete. It is not officially supported by CircleCI.

## Features

*   **Pipeline Management:**
    *   List pipelines for a project or organization.
    *   Trigger new pipelines.
    *   View pipeline details (including configuration and values).
*   **Workflow Management:**
    *   List workflows within a pipeline.
    *   View workflow details.
    *   Rerun workflows (from failed or specific jobs).
    *   Approve approval jobs.
    *   Cancel workflows.
*   **Job Management:**
    *   List jobs within a workflow.
    *   View job details.
    *   View job artifacts.
    *    View job test metadata
    *   Cancel jobs.
    *   View job logs (streaming supported).
* **Context Management:**
    * List, create, show, delete contexts
    * List, create, update and delete environment variables
* **Project Management**
    * Create project
    * Show project details
    * List, create, show, delete checkout keys
    * List, create, show, delete environment variables
    * Get, update project settings.
* **Insights:**
    * Get project summary metrics
    * Get workflows metrics
    * Get workflow summary metrics
    * List flaky tests
    * Get job time-series data.
    * Get a list of workflow runs.
    * Get workflow job metrics.
    * Get workflow test metrics.
* **Policy:**
    * Get, create, update, and delete policies.
    * Get decision logs.
    * Get/Set decision settings.
*   **Configuration:**
    *   Easy setup and management of API tokens and default settings.
*   **Output:**
    *   Human-readable output by default.
    *   JSON and YAML output options for scripting.

## Installation

### Prerequisites

*   Node.js (version 20 or later)
*   npm or pnpm

### Using pnpm (Recommended)

```bash
pnpm install --global circli
```
### Using npm
```
npm install --global circli
```

## Getting Started

1.  **Obtain a CircleCI API Token:**
    *   Go to your CircleCI User Settings: [https://app.circleci.com/settings/user](https://app.circleci.com/settings/user)
    *   Create a new Personal API Token.

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

*   `config`: Manage CLI configuration.
*   `pipeline`: Interact with pipelines.
*   `workflow`: Interact with workflows.
*   `job`: Interact with jobs.
*   `context`: Manage contexts.
*   `project`: Manage Projects.
*  `insights`: Retrieve insights data.
* `policy`: Manage policies.
* `webhook`: Manage webhooks
*   `help`: Display help information.
*   `version`: Display the CLI version.

Use `circli <command> --help` or `circli <command> <subcommand> --help` to see available options and subcommands.

**Examples:**

*   List pipelines for a project:

    ```bash
    circli pipeline list --project-slug gh/CircleCI-Public/api-preview-docs
    ```

*   Trigger a new pipeline on the `main` branch:

    ```bash
    circli pipeline trigger gh/CircleCI-Public/api-preview-docs --branch main
    ```

*   Rerun a workflow from the failed job:

    ```bash
    circli workflow rerun <workflow-id> --from-failed
    ```

*   View job logs:

    ```bash
    circli job logs <job-number> --project-slug <project-slug>
    ```

*   Stream job logs:
    ```bash
    circli job logs <job-number> --project-slug <project-slug> --follow
    ```
* List contexts
    ```
    circli context list --owner-slug <owner-slug>
    ```

## Development

To contribute to `circli`, you'll need:

*   Node.js 20+
*   pnpm

1.  Clone the repository:

    ```bash
    git clone https://github.com/mkusaka/circli.git  # Replace with your fork
    cd circli
    ```

2.  Install dependencies:

    ```bash
    pnpm install
    ```
3.  Generate types from CircleCI OpenAPI Spec
    ```
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
    ```
    node --import tsx src/index.ts -- <command> <subcommand> ...
    ```

6.  Run tests:
    ```
     pnpm test
    ```
## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) (to be created) for guidelines.

## License

MIT License
```

**Key improvements and explanations in the README:**

*   **Clear Introduction:**  States the purpose of the CLI, mentions it's unofficial, and highlights its inspiration.
*   **Features:**  Provides a concise overview of the CLI's capabilities, organized by functional area.
*   **Installation:**  Gives clear instructions for installation using both `pnpm` (recommended) and `npm`.
*   **Getting Started:**  Walks the user through the essential steps of obtaining an API token and configuring the CLI.
*   **Usage:** Explains the general command structure and provides examples.
*   **Available Commands:** Lists the main commands, making it easy to discover functionality.
*   **Examples:**  Includes concrete examples of common commands, making it easier for users to get started.
*   **Development:** Provides clear instructions for setting up a development environment, building, running, and testing the CLI.  This encourages contributions.
*   **Contributing:**  Indicates that contributions are welcome and points to a (future) `CONTRIBUTING.md`.
*   **License:** Specifies the license (MIT).
* **Executable:** includes how to run executable locally
* **pnpm dlx:** removed redundant `pnpm dlx`

This README provides a solid foundation for users and contributors to understand, use, and develop the `circli` CLI. Remember to create a `CONTRIBUTING.md` file with more detailed contribution guidelines.
