declare const _default: {
    readonly openapi: "3.0.0";
    readonly info: {
        readonly version: "v2";
        readonly title: "CircleCI API";
        readonly description: "This describes the resources that make up the CircleCI API v2.";
        readonly license: {
            readonly name: "MIT";
        };
    };
    readonly servers: readonly [{
        readonly url: "https://circleci.com/api/v2";
    }];
    readonly security: readonly [{
        readonly api_key_header: readonly [];
    }, {
        readonly basic_auth: readonly [];
    }, {
        readonly api_key_query: readonly [];
    }];
    readonly paths: {
        readonly "/context": {
            readonly post: {
                readonly summary: "Create a new context";
                readonly tags: readonly ["Context"];
                readonly operationId: "createContext";
                readonly responses: {
                    readonly "200": {
                        readonly description: "The new context";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                            readonly description: "The unique ID of the context.";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The user defined name of the context.";
                                        };
                                        readonly created_at: {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the context was created.";
                                            readonly example: "2015-09-21T17:29:21.042Z";
                                        };
                                    };
                                    readonly required: readonly ["id", "name", "created_at"];
                                    readonly title: "Context";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly requestBody: {
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "The user defined name of the context.";
                                    };
                                    readonly owner: {
                                        readonly oneOf: readonly [{
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly format: "uuid";
                                                    readonly description: "The unique ID of the owner of the context. Specify either this or slug.";
                                                };
                                                readonly type: {
                                                    readonly enum: readonly ["account", "organization"];
                                                    readonly type: "string";
                                                    readonly description: "The type of the owner. Defaults to \"organization\". Accounts are only used as context owners in server.";
                                                    readonly example: "organization";
                                                };
                                            };
                                            readonly required: readonly ["id"];
                                        }, {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly slug: {
                                                    readonly type: "string";
                                                    readonly description: "A string that represents an organization. Specify either this or id. Cannot be used for accounts.";
                                                };
                                                readonly type: {
                                                    readonly enum: readonly ["organization"];
                                                    readonly type: "string";
                                                    readonly description: "The type of owner. Defaults to \"organization\". Accounts are only used as context owners in server and must be specified by an id instead of a slug.";
                                                };
                                            };
                                            readonly required: readonly ["slug"];
                                        }];
                                    };
                                };
                                readonly required: readonly ["name", "owner"];
                            };
                        };
                    };
                };
            };
            readonly get: {
                readonly summary: "List contexts";
                readonly description: "List all contexts for an owner.";
                readonly tags: readonly ["Context"];
                readonly operationId: "listContexts";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A paginated list of contexts";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly items: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly format: "uuid";
                                                        readonly description: "The unique ID of the context.";
                                                    };
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly description: "The user defined name of the context.";
                                                    };
                                                    readonly created_at: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The date and time the context was created.";
                                                        readonly example: "2015-09-21T17:29:21.042Z";
                                                    };
                                                };
                                                readonly required: readonly ["id", "name", "created_at"];
                                                readonly title: "Context";
                                            };
                                        };
                                        readonly next_page_token: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "A token to pass as a `page-token` query parameter to return the next page of results.";
                                        };
                                    };
                                    readonly required: readonly ["items", "next_page_token"];
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "query";
                    readonly name: "owner-id";
                    readonly description: "The unique ID of the owner of the context. Specify either this or owner-slug.";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: false;
                }, {
                    readonly in: "query";
                    readonly name: "owner-slug";
                    readonly description: "A string that represents an organization. Specify either this or owner-id. Cannot be used for accounts.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: false;
                }, {
                    readonly in: "query";
                    readonly name: "owner-type";
                    readonly description: "The type of the owner. Defaults to \"organization\". Accounts are only used as context owners in server.";
                    readonly schema: {
                        readonly type: "string";
                        readonly enum: readonly ["account", "organization"];
                    };
                    readonly required: false;
                }, {
                    readonly in: "query";
                    readonly name: "page-token";
                    readonly description: "A token to retrieve the next page of results.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: false;
                    readonly allowEmptyValue: true;
                }];
            };
        };
        readonly "/context/{context-id}": {
            readonly delete: {
                readonly summary: "Delete a context";
                readonly tags: readonly ["Context"];
                readonly operationId: "deleteContext";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A confirmation message";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                            readonly description: "A human-readable message";
                                        };
                                    };
                                    readonly required: readonly ["message"];
                                    readonly description: "message response";
                                    readonly title: "MessageResponse";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "context-id";
                    readonly description: "ID of the context (UUID)";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                }];
            };
            readonly get: {
                readonly summary: "Get a context";
                readonly description: "Returns basic information about a context.";
                readonly tags: readonly ["Context"];
                readonly operationId: "getContext";
                readonly responses: {
                    readonly "200": {
                        readonly description: "The context";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                            readonly description: "The unique ID of the context.";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The user defined name of the context.";
                                        };
                                        readonly created_at: {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the context was created.";
                                            readonly example: "2015-09-21T17:29:21.042Z";
                                        };
                                    };
                                    readonly required: readonly ["id", "name", "created_at"];
                                    readonly title: "Context";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "context-id";
                    readonly description: "ID of the context (UUID)";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                }];
            };
        };
        readonly "/context/{context-id}/environment-variable": {
            readonly get: {
                readonly summary: "List environment variables";
                readonly description: "List information about environment variables in a context, not including their values.";
                readonly tags: readonly ["Context"];
                readonly operationId: "listEnvironmentVariablesFromContext";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A paginated list of environment variables";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly items: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly variable: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the environment variable";
                                                        readonly example: "POSTGRES_USER";
                                                    };
                                                    readonly created_at: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The date and time the environment variable was created.";
                                                        readonly example: "2015-09-21T17:29:21.042Z";
                                                    };
                                                    readonly context_id: {
                                                        readonly type: "string";
                                                        readonly format: "uuid";
                                                        readonly description: "ID of the context (UUID)";
                                                    };
                                                };
                                                readonly required: readonly ["variable", "created_at", "context_id"];
                                            };
                                        };
                                        readonly next_page_token: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "A token to pass as a `page-token` query parameter to return the next page of results.";
                                        };
                                    };
                                    readonly required: readonly ["items", "next_page_token"];
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "context-id";
                    readonly description: "ID of the context (UUID)";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                }];
            };
        };
        readonly "/context/{context-id}/environment-variable/{env-var-name}": {
            readonly delete: {
                readonly summary: "Remove an environment variable";
                readonly description: "Delete an environment variable from a context.";
                readonly tags: readonly ["Context"];
                readonly operationId: "deleteEnvironmentVariableFromContext";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A confirmation message";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                            readonly description: "A human-readable message";
                                        };
                                    };
                                    readonly required: readonly ["message"];
                                    readonly description: "message response";
                                    readonly title: "MessageResponse";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "env-var-name";
                    readonly description: "The name of the environment variable";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "POSTGRES_USER";
                }, {
                    readonly in: "path";
                    readonly name: "context-id";
                    readonly description: "ID of the context (UUID)";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                }];
            };
            readonly put: {
                readonly summary: "Add or update an environment variable";
                readonly description: "Create or update an environment variable within a context. Returns information about the environment variable, not including its value.";
                readonly tags: readonly ["Context"];
                readonly operationId: "addEnvironmentVariableToContext";
                readonly responses: {
                    readonly "200": {
                        readonly description: "The new environment variable";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly anyOf: readonly [{
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly variable: {
                                                readonly type: "string";
                                                readonly description: "The name of the environment variable";
                                                readonly example: "POSTGRES_USER";
                                            };
                                            readonly created_at: {
                                                readonly type: "string";
                                                readonly format: "date-time";
                                                readonly description: "The date and time the environment variable was created.";
                                                readonly example: "2015-09-21T17:29:21.042Z";
                                            };
                                            readonly context_id: {
                                                readonly type: "string";
                                                readonly format: "uuid";
                                                readonly description: "ID of the context (UUID)";
                                            };
                                        };
                                        readonly required: readonly ["variable", "created_at", "context_id"];
                                    }, {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly message: {
                                                readonly type: "string";
                                                readonly description: "A human-readable message";
                                            };
                                        };
                                        readonly required: readonly ["message"];
                                        readonly description: "message response";
                                        readonly title: "MessageResponse";
                                    }];
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "context-id";
                    readonly description: "ID of the context (UUID)";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                }, {
                    readonly in: "path";
                    readonly name: "env-var-name";
                    readonly description: "The name of the environment variable";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "POSTGRES_USER";
                }];
                readonly requestBody: {
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly value: {
                                        readonly type: "string";
                                        readonly description: "The value of the environment variable";
                                        readonly example: "some-secret-value";
                                    };
                                };
                                readonly required: readonly ["value"];
                            };
                        };
                    };
                };
            };
        };
        readonly "/insights/pages/{project-slug}/summary": {
            readonly get: {
                readonly summary: "Get summary metrics and trends for a project across it's workflows and branches";
                readonly description: "Get summary metrics and trends for a project at workflow and branch level. \n             Workflow runs going back at most 90 days are included in the aggregation window. \n             Trends are only supported upto last 30 days. \n             Metrics are refreshed daily, and thus may not include executions from the last 24 hours. \n             Please note that Insights is not a real time financial reporting tool and should not be used for credit reporting. \n             The most up to date credit information can be found in Plan Overview in the CircleCI UI.";
                readonly tags: readonly ["Insights"];
                readonly operationId: "getProjectWorkflowsPageData";
                readonly responses: {
                    readonly "200": {
                        readonly description: "Aggregated summary metrics and trends by workflow and branches";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly org_id: {
                                            readonly description: "The unique ID of the organization";
                                        };
                                        readonly project_id: {
                                            readonly description: "The unique ID of the project";
                                        };
                                        readonly project_data: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly metrics: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly total_runs: {
                                                            readonly type: "integer";
                                                            readonly format: "int64";
                                                            readonly minimum: 0;
                                                            readonly description: "The total number of runs.";
                                                        };
                                                        readonly total_duration_secs: {
                                                            readonly type: "integer";
                                                            readonly format: "int64";
                                                            readonly minimum: 0;
                                                            readonly description: "Total duration, in seconds.";
                                                        };
                                                        readonly total_credits_used: {
                                                            readonly type: "integer";
                                                            readonly format: "int64";
                                                            readonly minimum: 0;
                                                            readonly description: "The total credits consumed over the current timeseries interval.";
                                                        };
                                                        readonly success_rate: {
                                                            readonly type: "number";
                                                            readonly format: "float";
                                                        };
                                                        readonly throughput: {
                                                            readonly type: "number";
                                                            readonly format: "float";
                                                            readonly description: "The average number of runs per day.";
                                                        };
                                                    };
                                                    readonly required: readonly ["total_runs", "total_duration_secs", "total_credits_used", "success_rate", "throughput"];
                                                    readonly description: "Metrics aggregated across all workflows and branches for a project.";
                                                };
                                                readonly trends: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly total_runs: {
                                                            readonly type: "number";
                                                            readonly format: "float";
                                                            readonly description: "The trend value for total number of runs.";
                                                        };
                                                        readonly total_duration_secs: {
                                                            readonly type: "number";
                                                            readonly format: "float";
                                                            readonly description: "Trend value for total duration.";
                                                        };
                                                        readonly total_credits_used: {
                                                            readonly type: "number";
                                                            readonly format: "float";
                                                            readonly description: "The trend value for total credits consumed.";
                                                        };
                                                        readonly success_rate: {
                                                            readonly type: "number";
                                                            readonly format: "float";
                                                            readonly description: "The trend value for the success rate.";
                                                        };
                                                        readonly throughput: {
                                                            readonly type: "number";
                                                            readonly format: "float";
                                                            readonly description: "Trend value for the average number of runs per day.";
                                                        };
                                                    };
                                                    readonly required: readonly ["total_runs", "total_duration_secs", "total_credits_used", "success_rate", "throughput"];
                                                    readonly description: "Metric trends aggregated across all workflows and branches for a project.";
                                                };
                                            };
                                            readonly required: readonly ["metrics", "trends"];
                                            readonly description: "Metrics and trends data aggregated for a given project.";
                                        };
                                        readonly project_workflow_data: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly workflow_name: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the workflow.";
                                                        readonly example: "build-and-test";
                                                    };
                                                    readonly metrics: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly total_credits_used: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The total credits consumed over the current timeseries interval.";
                                                            };
                                                            readonly p95_duration_secs: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                                readonly description: "The 95th percentile duration among a group of workflow runs.";
                                                            };
                                                            readonly total_runs: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The total number of runs.";
                                                            };
                                                            readonly success_rate: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                            };
                                                        };
                                                        readonly required: readonly ["total_credits_used", "p95_duration_secs", "total_runs", "success_rate"];
                                                        readonly description: "Metrics aggregated across a workflow or branchfor a project.";
                                                    };
                                                    readonly trends: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly total_credits_used: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                                readonly description: "The trend value for total credits consumed.";
                                                            };
                                                            readonly p95_duration_secs: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                                readonly description: "The 95th percentile duration among a group of workflow runs.";
                                                            };
                                                            readonly total_runs: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                                readonly description: "The trend value for total number of runs.";
                                                            };
                                                            readonly success_rate: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                                readonly description: "The trend value for the success rate.";
                                                            };
                                                        };
                                                        readonly required: readonly ["total_credits_used", "p95_duration_secs", "total_runs", "success_rate"];
                                                        readonly description: "Trends aggregated across a workflow or branch for a project.";
                                                    };
                                                };
                                                readonly required: readonly ["workflow_name", "metrics", "trends"];
                                            };
                                            readonly description: "A list of metrics and trends data for workflows for a given project.";
                                        };
                                        readonly project_workflow_branch_data: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly workflow_name: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the workflow.";
                                                        readonly example: "build-and-test";
                                                    };
                                                    readonly branch: {
                                                        readonly type: "string";
                                                        readonly description: "The VCS branch of a workflow's trigger.";
                                                        readonly example: "main";
                                                    };
                                                    readonly metrics: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly total_credits_used: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The total credits consumed over the current timeseries interval.";
                                                            };
                                                            readonly p95_duration_secs: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                                readonly description: "The 95th percentile duration among a group of workflow runs.";
                                                            };
                                                            readonly total_runs: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The total number of runs.";
                                                            };
                                                            readonly success_rate: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                            };
                                                        };
                                                        readonly required: readonly ["total_credits_used", "p95_duration_secs", "total_runs", "success_rate"];
                                                        readonly description: "Metrics aggregated across a workflow or branchfor a project.";
                                                    };
                                                    readonly trends: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly total_credits_used: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                                readonly description: "The trend value for total credits consumed.";
                                                            };
                                                            readonly p95_duration_secs: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                                readonly description: "The 95th percentile duration among a group of workflow runs.";
                                                            };
                                                            readonly total_runs: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                                readonly description: "The trend value for total number of runs.";
                                                            };
                                                            readonly success_rate: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                                readonly description: "The trend value for the success rate.";
                                                            };
                                                        };
                                                        readonly required: readonly ["total_credits_used", "p95_duration_secs", "total_runs", "success_rate"];
                                                        readonly description: "Trends aggregated across a workflow or branch for a project.";
                                                    };
                                                };
                                                readonly required: readonly ["workflow_name", "branch", "metrics", "trends"];
                                            };
                                            readonly description: "A list of metrics and trends data for branches for a given project.";
                                        };
                                        readonly all_branches: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly description: "The VCS branch of a workflow's trigger.";
                                                readonly example: "main";
                                            };
                                            readonly description: "A list of all the branches for a given project.";
                                        };
                                        readonly all_workflows: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly description: "The name of the workflow.";
                                                readonly example: "build-and-test";
                                            };
                                            readonly description: "A list of all the workflows for a given project.";
                                        };
                                    };
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }, {
                    readonly in: "query";
                    readonly name: "reporting-window";
                    readonly description: "The time window used to calculate summary metrics.";
                    readonly schema: {
                        readonly type: "string";
                        readonly enum: readonly ["last-7-days", "last-90-days", "last-24-hours", "last-30-days", "last-60-days"];
                    };
                    readonly required: false;
                    readonly example: "last-90-days";
                }, {
                    readonly in: "query";
                    readonly name: "branches";
                    readonly description: "The names of VCS branches to include in branch-level workflow metrics.";
                    readonly schema: {
                        readonly type: "object";
                    };
                    readonly required: false;
                    readonly example: "A single branch: ?branches=main or for multiple branches: ?branches=main&branches=feature&branches=dev";
                }, {
                    readonly in: "query";
                    readonly name: "workflow-names";
                    readonly description: "The names of workflows to include in workflow-level metrics.";
                    readonly schema: {
                        readonly type: "object";
                    };
                    readonly required: false;
                    readonly example: "A single workflow name: ?workflow-names=build-test-deploy or \n    for multiple workflow names: ?workflow-names=build&workflow-names=test-and-deploy.";
                }];
            };
        };
        readonly "/insights/time-series/{project-slug}/workflows/{workflow-name}/jobs": {
            readonly get: {
                readonly summary: "Job timeseries data";
                readonly description: "Get timeseries data for all jobs within a workflow.";
                readonly tags: readonly ["Insights"];
                readonly operationId: "getJobTimeseries";
                readonly responses: {
                    readonly "200": {
                        readonly description: "An array of timeseries data, one entry per job.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly next_page_token: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "A token to pass as a `page-token` query parameter to return the next page of results.";
                                        };
                                        readonly items: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the workflow.";
                                                        readonly example: "build-and-test";
                                                    };
                                                    readonly min_started_at: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The start time for the earliest execution included in the metrics.";
                                                    };
                                                    readonly max_ended_at: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The end time of the last execution included in the metrics.";
                                                    };
                                                    readonly timestamp: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The start of the interval for timeseries metrics.";
                                                    };
                                                    readonly metrics: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly total_runs: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The total number of runs.";
                                                            };
                                                            readonly failed_runs: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The number of failed runs.";
                                                            };
                                                            readonly successful_runs: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The number of successful runs.";
                                                            };
                                                            readonly throughput: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                                readonly description: "The average number of runs per day.";
                                                            };
                                                            readonly median_credits_used: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The median credits consumed over the current timeseries interval.";
                                                            };
                                                            readonly total_credits_used: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The total credits consumed over the current timeseries interval.";
                                                            };
                                                            readonly duration_metrics: {
                                                                readonly type: "object";
                                                                readonly properties: {
                                                                    readonly min: {
                                                                        readonly type: "integer";
                                                                        readonly format: "int64";
                                                                        readonly minimum: 0;
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The minimum duration, in seconds, among a group of runs.";
                                                                    };
                                                                    readonly median: {
                                                                        readonly type: "integer";
                                                                        readonly format: "int64";
                                                                        readonly minimum: 0;
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The median duration, in seconds, among a group of runs.";
                                                                    };
                                                                    readonly max: {
                                                                        readonly type: "integer";
                                                                        readonly format: "int64";
                                                                        readonly minimum: 0;
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The max duration, in seconds, among a group of runs.";
                                                                    };
                                                                    readonly p95: {
                                                                        readonly type: "integer";
                                                                        readonly format: "int64";
                                                                        readonly minimum: 0;
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The 95th percentile duration, in seconds, among a group of runs.";
                                                                    };
                                                                    readonly total: {
                                                                        readonly type: "integer";
                                                                        readonly format: "int64";
                                                                        readonly minimum: 0;
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The total duration, in seconds, added across a group of runs.";
                                                                    };
                                                                };
                                                                readonly required: readonly ["min", "median", "max", "p95", "total"];
                                                                readonly description: "Metrics relating to the duration of runs for a workflow.";
                                                            };
                                                        };
                                                        readonly required: readonly ["total_runs", "failed_runs", "successful_runs", "throughput", "median_credits_used", "total_credits_used", "duration_metrics"];
                                                        readonly description: "Metrics relating to a workflow's runs.";
                                                    };
                                                };
                                                readonly required: readonly ["name", "min_started_at", "max_ended_at", "timestamp", "metrics"];
                                            };
                                            readonly description: "Aggregate metrics for a workflow at a time granularity";
                                        };
                                    };
                                    readonly required: readonly ["next_page_token", "items"];
                                    readonly description: "Project level timeseries metrics response";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }, {
                    readonly in: "path";
                    readonly name: "workflow-name";
                    readonly description: "The name of the workflow.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "build-and-test";
                }, {
                    readonly in: "query";
                    readonly name: "branch";
                    readonly description: "The name of a vcs branch. If not passed we will scope the API call to the default branch.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: false;
                }, {
                    readonly in: "query";
                    readonly name: "granularity";
                    readonly description: "The granularity for which to query timeseries data.";
                    readonly schema: {
                        readonly type: "string";
                        readonly enum: readonly ["daily", "hourly"];
                    };
                    readonly required: false;
                    readonly example: "hourly";
                }, {
                    readonly in: "query";
                    readonly name: "start-date";
                    readonly description: "Include only executions that started at or after this date. This must be specified if an end-date is provided.";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "date-time";
                    };
                    readonly required: false;
                    readonly example: "2020-08-21T13:26:29Z";
                }, {
                    readonly in: "query";
                    readonly name: "end-date";
                    readonly description: "Include only executions that started before this date. This date can be at most 90 days after the start-date.";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "date-time";
                    };
                    readonly required: false;
                    readonly example: "2020-09-04T13:26:29Z";
                }];
            };
        };
        readonly "/insights/{org-slug}/summary": {
            readonly get: {
                readonly summary: "Get summary metrics with trends for the entire org, and for each project.";
                readonly description: "Gets aggregated summary metrics with trends for the entire org. \n              Also gets aggregated metrics and trends for each project belonging to the org.";
                readonly tags: readonly ["Insights"];
                readonly operationId: "getOrgSummaryData";
                readonly responses: {
                    readonly "200": {
                        readonly description: "summary metrics with trends for an entire org and it's projects.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly org_data: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly metrics: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly total_runs: {
                                                            readonly type: "integer";
                                                            readonly format: "int64";
                                                            readonly minimum: 0;
                                                            readonly description: "The total number of runs.";
                                                        };
                                                        readonly total_duration_secs: {
                                                            readonly type: "integer";
                                                            readonly format: "int64";
                                                            readonly minimum: 0;
                                                            readonly description: "Total duration, in seconds.";
                                                        };
                                                        readonly total_credits_used: {
                                                            readonly type: "integer";
                                                            readonly format: "int64";
                                                            readonly minimum: 0;
                                                            readonly description: "The total credits consumed over the current timeseries interval.";
                                                        };
                                                        readonly success_rate: {
                                                            readonly type: "number";
                                                            readonly format: "float";
                                                        };
                                                        readonly throughput: {
                                                            readonly type: "number";
                                                            readonly format: "float";
                                                            readonly description: "The average number of runs per day.";
                                                        };
                                                    };
                                                    readonly required: readonly ["total_runs", "total_duration_secs", "total_credits_used", "success_rate", "throughput"];
                                                    readonly description: "Metrics for a single org metrics.";
                                                };
                                                readonly trends: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly total_runs: {
                                                            readonly type: "number";
                                                            readonly format: "float";
                                                            readonly description: "The trend value for total number of runs.";
                                                        };
                                                        readonly total_duration_secs: {
                                                            readonly type: "number";
                                                            readonly format: "float";
                                                            readonly description: "Trend value for total duration.";
                                                        };
                                                        readonly total_credits_used: {
                                                            readonly type: "number";
                                                            readonly format: "float";
                                                            readonly description: "The trend value for total credits consumed.";
                                                        };
                                                        readonly success_rate: {
                                                            readonly type: "number";
                                                            readonly format: "float";
                                                            readonly description: "The trend value for the success rate.";
                                                        };
                                                        readonly throughput: {
                                                            readonly type: "number";
                                                            readonly format: "float";
                                                            readonly description: "Trend value for the average number of runs per day.";
                                                        };
                                                    };
                                                    readonly required: readonly ["total_runs", "total_duration_secs", "total_credits_used", "success_rate", "throughput"];
                                                    readonly description: "Trends for a single org.";
                                                };
                                            };
                                            readonly required: readonly ["metrics", "trends"];
                                            readonly description: "Aggregated metrics for an org, with trends.";
                                        };
                                        readonly org_project_data: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly project_name: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the project.";
                                                        readonly example: "api-preview-docs";
                                                    };
                                                    readonly metrics: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly total_credits_used: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The total credits consumed over the current timeseries interval.";
                                                            };
                                                            readonly total_duration_secs: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "Total duration, in seconds.";
                                                            };
                                                            readonly total_runs: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The total number of runs.";
                                                            };
                                                            readonly success_rate: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                            };
                                                        };
                                                        readonly required: readonly ["total_credits_used", "total_duration_secs", "total_runs", "success_rate"];
                                                        readonly description: "Metrics for a single project, across all branches.";
                                                    };
                                                    readonly trends: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly total_credits_used: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                                readonly description: "The trend value for total credits consumed.";
                                                            };
                                                            readonly total_duration_secs: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                                readonly description: "Trend value for total duration.";
                                                            };
                                                            readonly total_runs: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                                readonly description: "The trend value for total number of runs.";
                                                            };
                                                            readonly success_rate: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                                readonly description: "The trend value for the success rate.";
                                                            };
                                                        };
                                                        readonly required: readonly ["total_credits_used", "total_duration_secs", "total_runs", "success_rate"];
                                                        readonly description: "Trends for a single project, across all branches.";
                                                    };
                                                };
                                                readonly required: readonly ["project_name", "metrics", "trends"];
                                            };
                                            readonly description: "Metrics for a single project, across all branches";
                                        };
                                        readonly all_projects: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                            readonly "x-nullable": true;
                                            readonly description: "A list of all the project names in the organization.";
                                        };
                                    };
                                    readonly required: readonly ["org_data", "org_project_data", "all_projects"];
                                    readonly description: "Summary metrics with trends for the entire org, and for each project.";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "org-slug";
                    readonly description: "Org slug in the form `vcs-slug/org-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public";
                }, {
                    readonly in: "query";
                    readonly name: "reporting-window";
                    readonly description: "The time window used to calculate summary metrics.";
                    readonly schema: {
                        readonly type: "string";
                        readonly enum: readonly ["last-7-days", "last-90-days", "last-24-hours", "last-30-days", "last-60-days"];
                    };
                    readonly required: false;
                    readonly example: "last-90-days";
                }, {
                    readonly in: "query";
                    readonly name: "project-names";
                    readonly description: "List of project names.";
                    readonly schema: {
                        readonly type: "object";
                    };
                    readonly required: false;
                    readonly example: "For a single project: ?project-names=some-project or for multiple projects: ?project-names=some-project1&project-names=some-project2";
                }];
            };
        };
        readonly "/insights/{project-slug}/branches": {
            readonly get: {
                readonly summary: "Get all branches for a project";
                readonly description: "Get a list of all branches for a specified project. The list will only contain branches currently available within Insights. The maximum number of branches returned by this endpoint is 5,000.";
                readonly tags: readonly ["Insights"];
                readonly operationId: "getAllInsightsBranches";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A list of branches for a project";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {};
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }, {
                    readonly in: "query";
                    readonly name: "workflow-name";
                    readonly description: "The name of a workflow. If not passed we will scope the API call to the project.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: false;
                    readonly example: "build-and-test";
                }];
            };
        };
        readonly "/insights/{project-slug}/flaky-tests": {
            readonly get: {
                readonly summary: "Get flaky tests for a project";
                readonly description: "Get a list of flaky tests for a given project. Flaky tests are branch agnostic. \n             A flaky test is a test that passed and failed in the same commit.";
                readonly tags: readonly ["Insights"];
                readonly operationId: "getFlakyTests";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A list of flaky tests for a project";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly "flaky-tests": {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly "time-wasted": {
                                                        readonly allOf: readonly [{
                                                            readonly type: "integer";
                                                            readonly format: "int64";
                                                        }, {
                                                            readonly type: "integer";
                                                            readonly format: "int64";
                                                            readonly minimum: 0;
                                                        }];
                                                    };
                                                    readonly "workflow-created-at": {
                                                        readonly description: "The date and time when workflow was created.";
                                                    };
                                                    readonly "workflow-id": {
                                                        readonly description: "The ID of the workflow associated with the provided test counts";
                                                    };
                                                    readonly classname: {
                                                        readonly type: "string";
                                                        readonly "x-nullable": true;
                                                        readonly description: "The class the test belongs to.";
                                                    };
                                                    readonly "pipeline-number": {
                                                        readonly allOf: readonly [{
                                                            readonly type: "integer";
                                                            readonly format: "int64";
                                                        }, {
                                                            readonly type: "integer";
                                                            readonly format: "int64";
                                                            readonly minimum: 0;
                                                        }];
                                                        readonly description: "The number of the pipeline.";
                                                    };
                                                    readonly "workflow-name": {
                                                        readonly type: "string";
                                                        readonly description: "The name of the workflow.";
                                                    };
                                                    readonly "test-name": {
                                                        readonly type: "string";
                                                        readonly description: "The name of the test.";
                                                    };
                                                    readonly "job-name": {
                                                        readonly type: "string";
                                                        readonly description: "The name of the job.";
                                                    };
                                                    readonly "job-number": {
                                                        readonly allOf: readonly [{
                                                            readonly type: "integer";
                                                            readonly format: "int64";
                                                        }, {
                                                            readonly type: "integer";
                                                            readonly format: "int64";
                                                            readonly minimum: 0;
                                                        }];
                                                        readonly description: "The number of the job.";
                                                    };
                                                    readonly "times-flaked": {
                                                        readonly type: "integer";
                                                        readonly format: "int64";
                                                        readonly minimum: 0;
                                                        readonly description: "The number of times the test flaked.";
                                                    };
                                                    readonly source: {
                                                        readonly type: "string";
                                                        readonly "x-nullable": true;
                                                        readonly description: "The source of the test.";
                                                    };
                                                    readonly file: {
                                                        readonly type: "string";
                                                        readonly "x-nullable": true;
                                                        readonly description: "The file the test belongs to.";
                                                    };
                                                };
                                                readonly required: readonly ["workflow-created-at", "classname", "job-number", "times-flaked", "source", "pipeline-number", "file", "workflow-name", "job-name", "workflow-id", "test-name"];
                                            };
                                            readonly description: "A list of all instances of flakes. Note that a test is no longer considered flaky after 2 weeks have passed without a flake. Each flake resets this timer.";
                                        };
                                        readonly "total-flaky-tests": {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly description: "A count of unique tests that have failed. If your project has N tests that have flaked multiple times each, this will be equal to N.";
                                            readonly example: 5;
                                        };
                                    };
                                    readonly required: readonly ["flaky-tests", "total-flaky-tests"];
                                    readonly description: "Flaky tests response";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }];
            };
        };
        readonly "/insights/{project-slug}/workflows": {
            readonly get: {
                readonly summary: "Get summary metrics for a project's workflows";
                readonly description: "Get summary metrics for a project's workflows. Workflow runs going back at most 90 days are included in the aggregation window. Metrics are refreshed daily, and thus may not include executions from the last 24 hours. Please note that Insights is not a real time financial reporting tool and should not be used for credit reporting. The most up to date credit information can be found in Plan Overview in the CircleCI UI.";
                readonly tags: readonly ["Insights"];
                readonly operationId: "getProjectWorkflowMetrics";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A paginated list of summary metrics by workflow";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly items: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the workflow.";
                                                        readonly example: "build-and-test";
                                                    };
                                                    readonly window_start: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The start of the aggregation window for workflow metrics.";
                                                    };
                                                    readonly window_end: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The end of the aggregation window for workflow metrics.";
                                                    };
                                                    readonly metrics: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly total_runs: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The total number of runs.";
                                                            };
                                                            readonly successful_runs: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The number of successful runs.";
                                                            };
                                                            readonly mttr: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly "x-nullable": true;
                                                                readonly description: "The mean time to recovery (mean time between failures and their next success) in seconds.";
                                                            };
                                                            readonly total_credits_used: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly "x-nullable": true;
                                                                readonly description: "The total credits consumed by the workflow in the aggregation window. Note that Insights is not a real time financial reporting tool and should not be used for credit reporting.";
                                                            };
                                                            readonly failed_runs: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The number of failed runs.";
                                                            };
                                                            readonly success_rate: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                            };
                                                            readonly duration_metrics: {
                                                                readonly type: "object";
                                                                readonly properties: {
                                                                    readonly min: {
                                                                        readonly type: "integer";
                                                                        readonly format: "int64";
                                                                        readonly minimum: 0;
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The minimum duration, in seconds, among a group of runs.";
                                                                    };
                                                                    readonly mean: {
                                                                        readonly type: "integer";
                                                                        readonly format: "int64";
                                                                        readonly minimum: 0;
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The mean duration, in seconds, among a group of runs.";
                                                                    };
                                                                    readonly median: {
                                                                        readonly type: "integer";
                                                                        readonly format: "int64";
                                                                        readonly minimum: 0;
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The median duration, in seconds, among a group of runs.";
                                                                    };
                                                                    readonly p95: {
                                                                        readonly type: "integer";
                                                                        readonly format: "int64";
                                                                        readonly minimum: 0;
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The 95th percentile duration, in seconds, among a group of runs.";
                                                                    };
                                                                    readonly max: {
                                                                        readonly type: "integer";
                                                                        readonly format: "int64";
                                                                        readonly minimum: 0;
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The max duration, in seconds, among a group of runs.";
                                                                    };
                                                                    readonly standard_deviation: {
                                                                        readonly type: "number";
                                                                        readonly format: "float";
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The standard deviation, in seconds, among a group of runs.";
                                                                    };
                                                                };
                                                                readonly required: readonly ["min", "mean", "median", "p95", "max", "standard_deviation"];
                                                                readonly description: "Metrics relating to the duration of runs for a workflow.";
                                                            };
                                                            readonly total_recoveries: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly "x-nullable": true;
                                                                readonly description: "The number of recovered workflow executions per day.";
                                                            };
                                                            readonly throughput: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                                readonly description: "The average number of runs per day.";
                                                            };
                                                        };
                                                        readonly required: readonly ["success_rate", "total_runs", "failed_runs", "successful_runs", "throughput", "mttr", "total_recoveries", "total_credits_used", "duration_metrics"];
                                                        readonly description: "Metrics relating to a workflow's runs.";
                                                    };
                                                };
                                                readonly required: readonly ["name", "window_start", "window_end", "metrics"];
                                            };
                                            readonly description: "Workflow summary metrics.";
                                        };
                                        readonly next_page_token: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "A token to pass as a `page-token` query parameter to return the next page of results.";
                                        };
                                    };
                                    readonly required: readonly ["items", "next_page_token"];
                                    readonly description: "Paginated workflow summary metrics.";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }, {
                    readonly in: "query";
                    readonly name: "page-token";
                    readonly description: "A token to retrieve the next page of results.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: false;
                    readonly allowEmptyValue: true;
                }, {
                    readonly in: "query";
                    readonly name: "all-branches";
                    readonly description: "Whether to retrieve data for all branches combined. Use either this parameter OR the branch name parameter.";
                    readonly schema: {
                        readonly type: "boolean";
                    };
                    readonly required: false;
                }, {
                    readonly in: "query";
                    readonly name: "branch";
                    readonly description: "The name of a vcs branch. If not passed we will scope the API call to the default branch.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: false;
                }, {
                    readonly in: "query";
                    readonly name: "reporting-window";
                    readonly description: "The time window used to calculate summary metrics.";
                    readonly schema: {
                        readonly type: "string";
                        readonly enum: readonly ["last-7-days", "last-90-days", "last-24-hours", "last-30-days", "last-60-days"];
                    };
                    readonly required: false;
                    readonly example: "last-90-days";
                }];
            };
        };
        readonly "/insights/{project-slug}/workflows/{workflow-name}": {
            readonly get: {
                readonly summary: "Get recent runs of a workflow";
                readonly description: "Get recent runs of a workflow. Runs going back at most 90 days are returned. Please note that Insights is not a real time financial reporting tool and should not be used for credit reporting. The most up to date credit information can be found in Plan Overview in the CircleCI UI.";
                readonly tags: readonly ["Insights"];
                readonly operationId: "getProjectWorkflowRuns";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A paginated list of recent workflow runs";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly items: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly format: "uuid";
                                                        readonly description: "The unique ID of the workflow.";
                                                    };
                                                    readonly branch: {
                                                        readonly type: "string";
                                                        readonly description: "The VCS branch of a Workflow's trigger.";
                                                        readonly example: "main";
                                                    };
                                                    readonly duration: {
                                                        readonly type: "integer";
                                                        readonly format: "int64";
                                                        readonly minimum: 0;
                                                        readonly "x-nullable": true;
                                                        readonly description: "The duration in seconds of a run.";
                                                    };
                                                    readonly created_at: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The date and time the workflow was created.";
                                                    };
                                                    readonly stopped_at: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly "x-nullable": true;
                                                        readonly description: "The date and time the workflow stopped.";
                                                    };
                                                    readonly credits_used: {
                                                        readonly type: "integer";
                                                        readonly format: "int64";
                                                        readonly minimum: 0;
                                                        readonly description: "The number of credits used during execution. Note that Insights is not a real time financial reporting tool and should not be used for credit reporting.";
                                                    };
                                                    readonly status: {
                                                        readonly enum: readonly ["success", "failed", "error", "canceled", "unauthorized"];
                                                        readonly type: "string";
                                                        readonly "x-nullable": true;
                                                        readonly description: "Workflow status.";
                                                    };
                                                };
                                                readonly required: readonly ["id", "branch", "duration", "created_at", "stopped_at", "credits_used", "status"];
                                            };
                                            readonly description: "Recent workflow runs.";
                                        };
                                        readonly next_page_token: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "A token to pass as a `page-token` query parameter to return the next page of results.";
                                        };
                                    };
                                    readonly required: readonly ["items", "next_page_token"];
                                    readonly description: "Paginated recent workflow runs.";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }, {
                    readonly in: "path";
                    readonly name: "workflow-name";
                    readonly description: "The name of the workflow.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "build-and-test";
                }, {
                    readonly in: "query";
                    readonly name: "all-branches";
                    readonly description: "Whether to retrieve data for all branches combined. Use either this parameter OR the branch name parameter.";
                    readonly schema: {
                        readonly type: "boolean";
                    };
                    readonly required: false;
                }, {
                    readonly in: "query";
                    readonly name: "branch";
                    readonly description: "The name of a vcs branch. If not passed we will scope the API call to the default branch.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: false;
                }, {
                    readonly in: "query";
                    readonly name: "page-token";
                    readonly description: "A token to retrieve the next page of results.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: false;
                    readonly allowEmptyValue: true;
                }, {
                    readonly in: "query";
                    readonly name: "start-date";
                    readonly description: "Include only executions that started at or after this date. This must be specified if an end-date is provided.";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "date-time";
                    };
                    readonly required: false;
                    readonly example: "2020-08-21T13:26:29Z";
                }, {
                    readonly in: "query";
                    readonly name: "end-date";
                    readonly description: "Include only executions that started before this date. This date can be at most 90 days after the start-date.";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "date-time";
                    };
                    readonly required: false;
                    readonly example: "2020-09-04T13:26:29Z";
                }];
            };
        };
        readonly "/insights/{project-slug}/workflows/{workflow-name}/jobs": {
            readonly get: {
                readonly summary: "Get summary metrics for a project workflow's jobs.";
                readonly description: "Get summary metrics for a project workflow's jobs. Job runs going back at most 90 days are included in the aggregation window. Metrics are refreshed daily, and thus may not include executions from the last 24 hours. Please note that Insights is not a real time financial reporting tool and should not be used for credit reporting. The most up to date credit information can be found in Plan Overview in the CircleCI UI.";
                readonly tags: readonly ["Insights"];
                readonly operationId: "getProjectWorkflowJobMetrics";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A paginated list of summary metrics by workflow job.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly items: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the job.";
                                                    };
                                                    readonly window_start: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The start of the aggregation window for job metrics.";
                                                    };
                                                    readonly window_end: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The end of the aggregation window for job metrics.";
                                                    };
                                                    readonly metrics: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly success_rate: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                            };
                                                            readonly total_runs: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The total number of runs.";
                                                            };
                                                            readonly failed_runs: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The number of failed runs.";
                                                            };
                                                            readonly successful_runs: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The number of successful runs.";
                                                            };
                                                            readonly throughput: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                                readonly description: "The average number of runs per day.";
                                                            };
                                                            readonly total_credits_used: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The total credits consumed by the job in the aggregation window. Note that Insights is not a real time financial reporting tool and should not be used for credit reporting.";
                                                            };
                                                            readonly duration_metrics: {
                                                                readonly type: "object";
                                                                readonly properties: {
                                                                    readonly min: {
                                                                        readonly type: "integer";
                                                                        readonly format: "int64";
                                                                        readonly minimum: 0;
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The minimum duration, in seconds, among a group of runs.";
                                                                    };
                                                                    readonly mean: {
                                                                        readonly type: "integer";
                                                                        readonly format: "int64";
                                                                        readonly minimum: 0;
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The mean duration, in seconds, among a group of runs.";
                                                                    };
                                                                    readonly median: {
                                                                        readonly type: "integer";
                                                                        readonly format: "int64";
                                                                        readonly minimum: 0;
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The median duration, in seconds, among a group of runs.";
                                                                    };
                                                                    readonly p95: {
                                                                        readonly type: "integer";
                                                                        readonly format: "int64";
                                                                        readonly minimum: 0;
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The 95th percentile duration, in seconds, among a group of runs.";
                                                                    };
                                                                    readonly max: {
                                                                        readonly type: "integer";
                                                                        readonly format: "int64";
                                                                        readonly minimum: 0;
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The max duration, in seconds, among a group of runs.";
                                                                    };
                                                                    readonly standard_deviation: {
                                                                        readonly type: "number";
                                                                        readonly format: "float";
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The standard deviation, in seconds, among a group of runs.";
                                                                    };
                                                                };
                                                                readonly required: readonly ["min", "mean", "median", "p95", "max", "standard_deviation"];
                                                                readonly description: "Metrics relating to the duration of runs for a workflow job.";
                                                            };
                                                        };
                                                        readonly required: readonly ["success_rate", "total_runs", "failed_runs", "successful_runs", "throughput", "total_credits_used", "duration_metrics"];
                                                        readonly description: "Metrics relating to a workflow job's runs.";
                                                    };
                                                };
                                                readonly required: readonly ["name", "window_start", "window_end", "metrics"];
                                            };
                                            readonly description: "Job summary metrics.";
                                        };
                                        readonly next_page_token: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "A token to pass as a `page-token` query parameter to return the next page of results.";
                                        };
                                    };
                                    readonly required: readonly ["items", "next_page_token"];
                                    readonly description: "Paginated workflow job summary metrics.";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }, {
                    readonly in: "path";
                    readonly name: "workflow-name";
                    readonly description: "The name of the workflow.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "build-and-test";
                }, {
                    readonly in: "query";
                    readonly name: "page-token";
                    readonly description: "A token to retrieve the next page of results.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: false;
                    readonly allowEmptyValue: true;
                }, {
                    readonly in: "query";
                    readonly name: "all-branches";
                    readonly description: "Whether to retrieve data for all branches combined. Use either this parameter OR the branch name parameter.";
                    readonly schema: {
                        readonly type: "boolean";
                    };
                    readonly required: false;
                }, {
                    readonly in: "query";
                    readonly name: "branch";
                    readonly description: "The name of a vcs branch. If not passed we will scope the API call to the default branch.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: false;
                }, {
                    readonly in: "query";
                    readonly name: "reporting-window";
                    readonly description: "The time window used to calculate summary metrics.";
                    readonly schema: {
                        readonly type: "string";
                        readonly enum: readonly ["last-7-days", "last-90-days", "last-24-hours", "last-30-days", "last-60-days"];
                    };
                    readonly required: false;
                    readonly example: "last-90-days";
                }];
            };
        };
        readonly "/insights/{project-slug}/workflows/{workflow-name}/summary": {
            readonly get: {
                readonly summary: "Get metrics and trends for workflows";
                readonly description: "Get the metrics and trends for a particular workflow on a single branch or all branches";
                readonly tags: readonly ["Insights"];
                readonly operationId: "getWorkflowSummary";
                readonly responses: {
                    readonly "200": {
                        readonly description: "Metrics and trends for a workflow";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly metrics: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly total_runs: {
                                                    readonly type: "integer";
                                                    readonly format: "int64";
                                                    readonly minimum: 0;
                                                    readonly description: "The total number of runs.";
                                                };
                                                readonly successful_runs: {
                                                    readonly type: "integer";
                                                    readonly format: "int64";
                                                    readonly minimum: 0;
                                                    readonly description: "The number of successful runs.";
                                                };
                                                readonly mttr: {
                                                    readonly type: "integer";
                                                    readonly format: "int64";
                                                    readonly minimum: 0;
                                                    readonly "x-nullable": true;
                                                    readonly description: "The mean time to recovery (mean time between failures and their next success) in seconds.";
                                                };
                                                readonly total_credits_used: {
                                                    readonly type: "integer";
                                                    readonly format: "int64";
                                                    readonly minimum: 0;
                                                    readonly "x-nullable": true;
                                                    readonly description: "The total credits consumed by the workflow in the aggregation window. Note that Insights is not a real time financial reporting tool and should not be used for credit reporting.";
                                                };
                                                readonly failed_runs: {
                                                    readonly type: "integer";
                                                    readonly format: "int64";
                                                    readonly minimum: 0;
                                                    readonly description: "The number of failed runs.";
                                                };
                                                readonly success_rate: {
                                                    readonly type: "number";
                                                    readonly format: "float";
                                                };
                                                readonly window_start: {
                                                    readonly type: "string";
                                                    readonly format: "date-time";
                                                    readonly description: "The start of the aggregation window for workflow metrics.";
                                                };
                                                readonly duration_metrics: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly min: {
                                                            readonly type: "integer";
                                                            readonly format: "int64";
                                                            readonly minimum: 0;
                                                            readonly "x-nullable": true;
                                                            readonly description: "The minimum duration, in seconds, among a group of runs.";
                                                        };
                                                        readonly mean: {
                                                            readonly type: "integer";
                                                            readonly format: "int64";
                                                            readonly minimum: 0;
                                                            readonly "x-nullable": true;
                                                            readonly description: "The mean duration, in seconds, among a group of runs.";
                                                        };
                                                        readonly median: {
                                                            readonly type: "integer";
                                                            readonly format: "int64";
                                                            readonly minimum: 0;
                                                            readonly "x-nullable": true;
                                                            readonly description: "The median duration, in seconds, among a group of runs.";
                                                        };
                                                        readonly p95: {
                                                            readonly type: "integer";
                                                            readonly format: "int64";
                                                            readonly minimum: 0;
                                                            readonly "x-nullable": true;
                                                            readonly description: "The 95th percentile duration, in seconds, among a group of runs.";
                                                        };
                                                        readonly max: {
                                                            readonly type: "integer";
                                                            readonly format: "int64";
                                                            readonly minimum: 0;
                                                            readonly "x-nullable": true;
                                                            readonly description: "The max duration, in seconds, among a group of runs.";
                                                        };
                                                        readonly standard_deviation: {
                                                            readonly type: "number";
                                                            readonly format: "float";
                                                            readonly "x-nullable": true;
                                                            readonly description: "The standard deviation, in seconds, among a group of runs.";
                                                        };
                                                    };
                                                    readonly required: readonly ["min", "mean", "median", "p95", "max", "standard_deviation"];
                                                    readonly description: "Metrics relating to the duration of runs for a workflow.";
                                                };
                                                readonly window_end: {
                                                    readonly type: "string";
                                                    readonly format: "date-time";
                                                    readonly description: "The end of the aggregation window for workflow metrics.";
                                                };
                                                readonly throughput: {
                                                    readonly type: "number";
                                                    readonly format: "float";
                                                    readonly description: "The average number of runs per day.";
                                                };
                                            };
                                            readonly required: readonly ["window_start", "total_runs", "throughput", "total_credits_used", "window_end", "successful_runs", "success_rate", "duration_metrics", "mttr", "failed_runs"];
                                            readonly description: "Metrics aggregated across a workflow for a given time window.";
                                        };
                                        readonly trends: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly total_runs: {
                                                    readonly type: "number";
                                                    readonly format: "float";
                                                    readonly description: "The trend value for total number of runs.";
                                                };
                                                readonly failed_runs: {
                                                    readonly type: "number";
                                                    readonly format: "float";
                                                    readonly description: "The trend value for number of failed runs.";
                                                };
                                                readonly success_rate: {
                                                    readonly type: "number";
                                                    readonly format: "float";
                                                    readonly description: "The trend value for the success rate.";
                                                };
                                                readonly p95_duration_secs: {
                                                    readonly type: "number";
                                                    readonly format: "float";
                                                    readonly description: "Trend value for the 95th percentile duration for a workflow for a given time window.";
                                                };
                                                readonly median_duration_secs: {
                                                    readonly type: "number";
                                                    readonly format: "float";
                                                    readonly description: "Trend value for the 50th percentile duration for a workflow for a given time window.";
                                                };
                                                readonly total_credits_used: {
                                                    readonly type: "number";
                                                    readonly format: "float";
                                                    readonly description: "The trend value for total credits consumed.";
                                                };
                                                readonly mttr: {
                                                    readonly type: "number";
                                                    readonly format: "float";
                                                    readonly description: "trend for mean time to recovery (mean time between failures and their next success).";
                                                };
                                                readonly throughput: {
                                                    readonly type: "number";
                                                    readonly format: "float";
                                                    readonly description: "Trend value for the average number of runs per day.";
                                                };
                                            };
                                            readonly required: readonly ["total_runs", "failed_runs", "success_rate", "p95_duration_secs", "median_duration_secs", "total_credits_used", "mttr", "throughput"];
                                            readonly description: "Trends for aggregated metrics across a workflow for a given time window.";
                                        };
                                        readonly workflow_names: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                            readonly description: "A list of all the workflow names for a given project.";
                                        };
                                    };
                                    readonly required: readonly ["metrics", "trends", "workflow_names"];
                                    readonly description: "Workflow level aggregated metrics and trends response";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }, {
                    readonly in: "path";
                    readonly name: "workflow-name";
                    readonly description: "The name of the workflow.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "build-and-test";
                }, {
                    readonly in: "query";
                    readonly name: "all-branches";
                    readonly description: "Whether to retrieve data for all branches combined. Use either this parameter OR the branch name parameter.";
                    readonly schema: {
                        readonly type: "boolean";
                    };
                    readonly required: false;
                }, {
                    readonly in: "query";
                    readonly name: "branches";
                    readonly description: "The names of VCS branches to include in branch-level workflow metrics.";
                    readonly schema: {
                        readonly type: "object";
                    };
                    readonly required: false;
                    readonly example: "A single branch: ?branches=main or for multiple branches: ?branches=main&branches=feature&branches=dev";
                }];
            };
        };
        readonly "/insights/{project-slug}/workflows/{workflow-name}/test-metrics": {
            readonly get: {
                readonly summary: "Get test metrics for a project's workflows";
                readonly description: "Get test metrics for a project's workflows. Currently tests metrics are calculated based on 10 most recent workflow runs.";
                readonly tags: readonly ["Insights"];
                readonly operationId: "getProjectWorkflowTestMetrics";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A list of test metrics by workflow";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly average_test_count: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly description: "The average number of tests executed per run";
                                        };
                                        readonly most_failed_tests: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly p95_duration: {
                                                        readonly type: "number";
                                                        readonly format: "double";
                                                        readonly "x-nullable": true;
                                                        readonly description: "The 95th percentile duration, in seconds, among a group of test runs.";
                                                    };
                                                    readonly total_runs: {
                                                        readonly type: "integer";
                                                        readonly format: "int64";
                                                        readonly minimum: 0;
                                                        readonly description: "The total number of times the test was run.";
                                                    };
                                                    readonly classname: {
                                                        readonly type: "string";
                                                        readonly "x-nullable": true;
                                                        readonly description: "The class the test belongs to.";
                                                    };
                                                    readonly failed_runs: {
                                                        readonly type: "integer";
                                                        readonly format: "int64";
                                                        readonly minimum: 0;
                                                        readonly description: "The number of times the test failed";
                                                    };
                                                    readonly flaky: {
                                                        readonly type: "boolean";
                                                        readonly description: "Whether the test is flaky.";
                                                    };
                                                    readonly source: {
                                                        readonly type: "string";
                                                        readonly "x-nullable": true;
                                                        readonly description: "The source of the test.";
                                                    };
                                                    readonly file: {
                                                        readonly type: "string";
                                                        readonly "x-nullable": true;
                                                        readonly description: "The file the test belongs to.";
                                                    };
                                                    readonly job_name: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the job.";
                                                    };
                                                    readonly test_name: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the test.";
                                                    };
                                                };
                                                readonly required: readonly ["failed_runs", "job_name", "p95_duration", "test_name", "file", "source", "classname", "total_runs", "flaky"];
                                            };
                                            readonly description: "Metrics for the most frequently failing tests";
                                        };
                                        readonly most_failed_tests_extra: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly description: "The number of tests with the same success rate being omitted from most_failed_tests";
                                        };
                                        readonly slowest_tests: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly p95_duration: {
                                                        readonly type: "number";
                                                        readonly format: "double";
                                                        readonly "x-nullable": true;
                                                        readonly description: "The 95th percentile duration, in seconds, among a group of test runs.";
                                                    };
                                                    readonly total_runs: {
                                                        readonly type: "integer";
                                                        readonly format: "int64";
                                                        readonly minimum: 0;
                                                        readonly description: "The total number of times the test was run.";
                                                    };
                                                    readonly classname: {
                                                        readonly type: "string";
                                                        readonly "x-nullable": true;
                                                        readonly description: "The class the test belongs to.";
                                                    };
                                                    readonly failed_runs: {
                                                        readonly type: "integer";
                                                        readonly format: "int64";
                                                        readonly minimum: 0;
                                                        readonly description: "The number of times the test failed";
                                                    };
                                                    readonly flaky: {
                                                        readonly type: "boolean";
                                                        readonly description: "Whether the test is flaky.";
                                                    };
                                                    readonly source: {
                                                        readonly type: "string";
                                                        readonly "x-nullable": true;
                                                        readonly description: "The source of the test.";
                                                    };
                                                    readonly file: {
                                                        readonly type: "string";
                                                        readonly "x-nullable": true;
                                                        readonly description: "The file the test belongs to.";
                                                    };
                                                    readonly job_name: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the job.";
                                                    };
                                                    readonly test_name: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the test.";
                                                    };
                                                };
                                                readonly required: readonly ["failed_runs", "job_name", "p95_duration", "test_name", "file", "source", "classname", "total_runs", "flaky"];
                                            };
                                            readonly description: "Metrics for the slowest running tests";
                                        };
                                        readonly slowest_tests_extra: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly description: "The number of tests with the same duration rate being omitted from slowest_tests";
                                        };
                                        readonly total_test_runs: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: 0;
                                            readonly description: "The total number of test runs";
                                        };
                                        readonly test_runs: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly pipeline_number: {
                                                        readonly type: "integer";
                                                        readonly format: "int64";
                                                        readonly minimum: 0;
                                                        readonly description: "The number of the pipeline associated with the provided test counts";
                                                    };
                                                    readonly workflow_id: {
                                                        readonly description: "The ID of the workflow associated with the provided test counts";
                                                    };
                                                    readonly success_rate: {
                                                        readonly type: "number";
                                                        readonly format: "float";
                                                        readonly description: "The success rate calculated from test counts";
                                                    };
                                                    readonly test_counts: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly error: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The number of tests with the error status";
                                                            };
                                                            readonly failure: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The number of tests with the failure status";
                                                            };
                                                            readonly skipped: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The number of tests with the skipped status";
                                                            };
                                                            readonly success: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The number of tests with the success status";
                                                            };
                                                            readonly total: {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                                readonly minimum: 0;
                                                                readonly description: "The total number of tests";
                                                            };
                                                        };
                                                        readonly required: readonly ["error", "failure", "skipped", "success", "total"];
                                                        readonly description: "Test counts for a given pipeline number";
                                                    };
                                                };
                                                readonly required: readonly ["pipeline_number", "workflow_id", "success_rate", "test_counts"];
                                            };
                                            readonly description: "Test counts grouped by pipeline number and workflow id";
                                        };
                                    };
                                    readonly required: readonly ["average_test_count", "most_failed_tests", "most_failed_tests_extra", "slowest_tests", "slowest_tests_extra", "total_test_runs", "test_runs"];
                                    readonly description: "Project level test metrics response";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }, {
                    readonly in: "path";
                    readonly name: "workflow-name";
                    readonly description: "The name of the workflow.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "build-and-test";
                }, {
                    readonly in: "query";
                    readonly name: "branch";
                    readonly description: "The name of a vcs branch. If not passed we will scope the API call to the default branch.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: false;
                }, {
                    readonly in: "query";
                    readonly name: "all-branches";
                    readonly description: "Whether to retrieve data for all branches combined. Use either this parameter OR the branch name parameter.";
                    readonly schema: {
                        readonly type: "boolean";
                    };
                    readonly required: false;
                }];
            };
        };
        readonly "/me": {
            readonly get: {
                readonly summary: "User Information";
                readonly description: "Provides information about the user that is currently signed in.";
                readonly tags: readonly ["User"];
                readonly operationId: "getCurrentUser";
                readonly responses: {
                    readonly "200": {
                        readonly description: "User login information.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                            readonly description: "The unique ID of the user.";
                                        };
                                        readonly login: {
                                            readonly type: "string";
                                            readonly description: "The login information for the user on the VCS.";
                                            readonly title: "Login";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The name of the user.";
                                        };
                                    };
                                    readonly required: readonly ["id", "login", "name"];
                                    readonly title: "User";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
            };
        };
        readonly "/me/collaborations": {
            readonly get: {
                readonly summary: "Collaborations";
                readonly description: "Provides the set of organizations of which a user is a member or a collaborator.\n\nThe set of organizations that a user can collaborate on is composed of:\n\n* Organizations that the current user belongs to across VCS types (e.g. BitBucket, GitHub)\n* The parent organization of repository that the user can collaborate on, but is not necessarily a member of\n* The organization of the current user's account";
                readonly tags: readonly ["User"];
                readonly operationId: "getCollaborations";
                readonly responses: {
                    readonly "200": {
                        readonly description: "Collaborations";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly id: {
                                                readonly type: "string";
                                                readonly format: "uuid";
                                                readonly "x-nullable": true;
                                                readonly description: "The UUID of the organization";
                                            };
                                            readonly "vcs-type": {
                                                readonly type: "string";
                                                readonly description: "The VCS provider";
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly description: "The name of the organization";
                                            };
                                            readonly avatar_url: {
                                                readonly type: "string";
                                                readonly description: "URL to the user's avatar on the VCS";
                                            };
                                            readonly slug: {
                                                readonly type: "string";
                                                readonly description: "The slug of the organization";
                                            };
                                        };
                                        readonly required: readonly ["id", "vcs-type", "name", "avatar_url", "slug"];
                                        readonly title: "Collaboration";
                                    };
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
            };
        };
        readonly "/pipeline": {
            readonly get: {
                readonly summary: "Get a list of pipelines";
                readonly description: "Returns all pipelines for the most recently built projects (max 250) you follow in an organization.";
                readonly tags: readonly ["Pipeline"];
                readonly operationId: "listPipelines";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A sequence of pipelines.";
                        readonly links: {
                            readonly NextPipelinePage: {
                                readonly operationId: "listPipelines";
                                readonly parameters: {
                                    readonly "page-token": "$response.body#/next_page_token";
                                };
                            };
                        };
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly items: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly format: "uuid";
                                                        readonly description: "The unique ID of the pipeline.";
                                                        readonly example: "5034460f-c7c4-4c43-9457-de07e2029e7b";
                                                    };
                                                    readonly errors: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "object";
                                                            readonly properties: {
                                                                readonly type: {
                                                                    readonly enum: readonly ["config", "config-fetch", "timeout", "permission", "other", "plan"];
                                                                    readonly type: "string";
                                                                    readonly description: "The type of error.";
                                                                };
                                                                readonly message: {
                                                                    readonly type: "string";
                                                                    readonly description: "A human-readable error message.";
                                                                };
                                                            };
                                                            readonly required: readonly ["type", "message"];
                                                            readonly description: "An error with a type and message.";
                                                        };
                                                        readonly description: "A sequence of errors that have occurred within the pipeline.";
                                                    };
                                                    readonly project_slug: {
                                                        readonly type: "string";
                                                        readonly description: "The project-slug for the pipeline.";
                                                        readonly example: "gh/CircleCI-Public/api-preview-docs";
                                                    };
                                                    readonly updated_at: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The date and time the pipeline was last updated.";
                                                    };
                                                    readonly number: {
                                                        readonly type: "integer";
                                                        readonly format: "int64";
                                                        readonly description: "The number of the pipeline.";
                                                        readonly example: "25";
                                                    };
                                                    readonly trigger_parameters: {
                                                        readonly type: "object";
                                                        readonly additionalProperties: {
                                                            readonly anyOf: readonly [{
                                                                readonly type: "string";
                                                            }, {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                            }, {
                                                                readonly type: "boolean";
                                                            }, {
                                                                readonly type: "object";
                                                            }];
                                                        };
                                                    };
                                                    readonly state: {
                                                        readonly enum: readonly ["created", "errored", "setup-pending", "setup", "pending"];
                                                        readonly type: "string";
                                                        readonly description: "The current state of the pipeline.";
                                                    };
                                                    readonly created_at: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The date and time the pipeline was created.";
                                                    };
                                                    readonly trigger: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly type: {
                                                                readonly enum: readonly ["scheduled_pipeline", "explicit", "api", "webhook"];
                                                                readonly type: "string";
                                                                readonly description: "The type of trigger.";
                                                            };
                                                            readonly received_at: {
                                                                readonly type: "string";
                                                                readonly format: "date-time";
                                                                readonly description: "The date and time the trigger was received.";
                                                            };
                                                            readonly actor: {
                                                                readonly type: "object";
                                                                readonly properties: {
                                                                    readonly login: {
                                                                        readonly type: "string";
                                                                        readonly description: "The login information for the user on the VCS.";
                                                                        readonly title: "Login";
                                                                    };
                                                                    readonly avatar_url: {
                                                                        readonly type: "string";
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "URL to the user's avatar on the VCS";
                                                                    };
                                                                };
                                                                readonly required: readonly ["login", "avatar_url"];
                                                                readonly description: "The user who triggered the Pipeline.";
                                                            };
                                                        };
                                                        readonly required: readonly ["type", "received_at", "actor"];
                                                        readonly description: "A summary of the trigger.";
                                                    };
                                                    readonly vcs: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly provider_name: {
                                                                readonly type: "string";
                                                                readonly description: "Name of the VCS provider (e.g. GitHub, Bitbucket).";
                                                                readonly example: "GitHub";
                                                            };
                                                            readonly target_repository_url: {
                                                                readonly type: "string";
                                                                readonly description: "URL for the repository the trigger targets (i.e. the repository where the PR will be merged). For fork-PR pipelines, this is the URL to the parent repo. For other pipelines, the `origin_` and `target_repository_url`s will be the same.";
                                                                readonly example: "https://github.com/CircleCI-Public/api-preview-docs";
                                                            };
                                                            readonly branch: {
                                                                readonly type: "string";
                                                                readonly description: "The branch where the pipeline ran. The HEAD commit on this branch was used for the pipeline. Note that `branch` and `tag` are mutually exclusive. To trigger a pipeline for a PR by number use `pull/<number>/head` for the PR ref or `pull/<number>/merge` for the merge ref (GitHub only).";
                                                                readonly example: "feature/design-new-api";
                                                            };
                                                            readonly review_id: {
                                                                readonly type: "string";
                                                                readonly description: "The code review id.";
                                                                readonly example: "123";
                                                            };
                                                            readonly review_url: {
                                                                readonly type: "string";
                                                                readonly description: "The code review URL.";
                                                                readonly example: "https://github.com/CircleCI-Public/api-preview-docs/pull/123";
                                                            };
                                                            readonly revision: {
                                                                readonly type: "string";
                                                                readonly description: "The code revision the pipeline ran.";
                                                                readonly example: "f454a02b5d10fcccfd7d9dd7608a76d6493a98b4";
                                                            };
                                                            readonly tag: {
                                                                readonly type: "string";
                                                                readonly description: "The tag used by the pipeline. The commit that this tag points to was used for the pipeline. Note that `branch` and `tag` are mutually exclusive.";
                                                                readonly example: "v3.1.4159";
                                                            };
                                                            readonly commit: {
                                                                readonly type: "object";
                                                                readonly properties: {
                                                                    readonly subject: {
                                                                        readonly type: "string";
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The subject of the commit message.";
                                                                    };
                                                                    readonly body: {
                                                                        readonly type: "string";
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The body of the commit message.";
                                                                    };
                                                                };
                                                                readonly required: readonly ["subject", "body"];
                                                                readonly description: "The latest commit in the pipeline.";
                                                            };
                                                            readonly origin_repository_url: {
                                                                readonly type: "string";
                                                                readonly description: "URL for the repository where the trigger originated. For fork-PR pipelines, this is the URL to the fork. For other pipelines the `origin_` and `target_repository_url`s will be the same.";
                                                                readonly example: "https://github.com/CircleCI-Public/api-preview-docs";
                                                            };
                                                        };
                                                        readonly required: readonly ["provider_name", "origin_repository_url", "target_repository_url", "revision"];
                                                        readonly description: "VCS information for the pipeline.";
                                                    };
                                                };
                                                readonly required: readonly ["id", "number", "project_slug", "created_at", "errors", "state", "trigger"];
                                                readonly description: "A pipeline response.";
                                                readonly title: "Pipeline";
                                            };
                                        };
                                        readonly next_page_token: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "A token to pass as a `page-token` query parameter to return the next page of results.";
                                        };
                                    };
                                    readonly required: readonly ["items", "next_page_token"];
                                    readonly description: "List of pipelines";
                                    readonly title: "PipelineListResponse";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "query";
                    readonly name: "org-slug";
                    readonly description: "Org slug in the form `vcs-slug/org-name`";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: false;
                    readonly example: "gh/CircleCI-Public";
                }, {
                    readonly in: "query";
                    readonly name: "page-token";
                    readonly description: "A token to retrieve the next page of results.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: false;
                    readonly allowEmptyValue: true;
                }, {
                    readonly in: "query";
                    readonly name: "mine";
                    readonly description: "Only include entries created by your user.";
                    readonly schema: {
                        readonly type: "boolean";
                    };
                    readonly required: false;
                }];
            };
        };
        readonly "/pipeline/continue": {
            readonly post: {
                readonly summary: "Continue a pipeline";
                readonly description: "Continue a pipeline from the setup phase.";
                readonly tags: readonly ["Pipeline"];
                readonly operationId: "continuePipeline";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A confirmation message.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                            readonly description: "A human-readable message";
                                        };
                                    };
                                    readonly required: readonly ["message"];
                                    readonly description: "message response";
                                    readonly title: "MessageResponse";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly requestBody: {
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly "continuation-key": {
                                        readonly type: "string";
                                        readonly description: "A pipeline continuation key.";
                                        readonly title: "PipelineContinuationKey";
                                    };
                                    readonly configuration: {
                                        readonly type: "string";
                                        readonly description: "A configuration string for the pipeline.";
                                    };
                                    readonly parameters: {
                                        readonly type: "object";
                                        readonly additionalProperties: {
                                            readonly anyOf: readonly [{
                                                readonly type: "integer";
                                            }, {
                                                readonly type: "string";
                                            }, {
                                                readonly type: "boolean";
                                            }];
                                        };
                                        readonly description: "An object containing pipeline parameters and their values.";
                                        readonly example: {
                                            readonly deploy_prod: true;
                                        };
                                    };
                                };
                                readonly required: readonly ["continuation-key", "configuration"];
                            };
                        };
                    };
                };
            };
        };
        readonly "/pipeline/{pipeline-id}": {
            readonly get: {
                readonly summary: "Get a pipeline by ID";
                readonly description: "Returns a pipeline by the pipeline ID.";
                readonly tags: readonly ["Pipeline"];
                readonly operationId: "getPipelineById";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A pipeline object.";
                        readonly links: {
                            readonly ProjectFromPipeline: {
                                readonly operationId: "getProjectBySlug";
                                readonly parameters: {
                                    readonly project_slug: "$response.body#/project_slug";
                                };
                            };
                        };
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                            readonly description: "The unique ID of the pipeline.";
                                            readonly example: "5034460f-c7c4-4c43-9457-de07e2029e7b";
                                        };
                                        readonly errors: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly type: {
                                                        readonly enum: readonly ["config", "config-fetch", "timeout", "permission", "other", "plan"];
                                                        readonly type: "string";
                                                        readonly description: "The type of error.";
                                                    };
                                                    readonly message: {
                                                        readonly type: "string";
                                                        readonly description: "A human-readable error message.";
                                                    };
                                                };
                                                readonly required: readonly ["type", "message"];
                                                readonly description: "An error with a type and message.";
                                            };
                                            readonly description: "A sequence of errors that have occurred within the pipeline.";
                                        };
                                        readonly project_slug: {
                                            readonly type: "string";
                                            readonly description: "The project-slug for the pipeline.";
                                            readonly example: "gh/CircleCI-Public/api-preview-docs";
                                        };
                                        readonly updated_at: {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the pipeline was last updated.";
                                        };
                                        readonly number: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly description: "The number of the pipeline.";
                                            readonly example: "25";
                                        };
                                        readonly trigger_parameters: {
                                            readonly type: "object";
                                            readonly additionalProperties: {
                                                readonly anyOf: readonly [{
                                                    readonly type: "string";
                                                }, {
                                                    readonly type: "integer";
                                                    readonly format: "int64";
                                                }, {
                                                    readonly type: "boolean";
                                                }, {
                                                    readonly type: "object";
                                                }];
                                            };
                                        };
                                        readonly state: {
                                            readonly enum: readonly ["created", "errored", "setup-pending", "setup", "pending"];
                                            readonly type: "string";
                                            readonly description: "The current state of the pipeline.";
                                        };
                                        readonly created_at: {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the pipeline was created.";
                                        };
                                        readonly trigger: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly type: {
                                                    readonly enum: readonly ["scheduled_pipeline", "explicit", "api", "webhook"];
                                                    readonly type: "string";
                                                    readonly description: "The type of trigger.";
                                                };
                                                readonly received_at: {
                                                    readonly type: "string";
                                                    readonly format: "date-time";
                                                    readonly description: "The date and time the trigger was received.";
                                                };
                                                readonly actor: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly login: {
                                                            readonly type: "string";
                                                            readonly description: "The login information for the user on the VCS.";
                                                            readonly title: "Login";
                                                        };
                                                        readonly avatar_url: {
                                                            readonly type: "string";
                                                            readonly "x-nullable": true;
                                                            readonly description: "URL to the user's avatar on the VCS";
                                                        };
                                                    };
                                                    readonly required: readonly ["login", "avatar_url"];
                                                    readonly description: "The user who triggered the Pipeline.";
                                                };
                                            };
                                            readonly required: readonly ["type", "received_at", "actor"];
                                            readonly description: "A summary of the trigger.";
                                        };
                                        readonly vcs: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly provider_name: {
                                                    readonly type: "string";
                                                    readonly description: "Name of the VCS provider (e.g. GitHub, Bitbucket).";
                                                    readonly example: "GitHub";
                                                };
                                                readonly target_repository_url: {
                                                    readonly type: "string";
                                                    readonly description: "URL for the repository the trigger targets (i.e. the repository where the PR will be merged). For fork-PR pipelines, this is the URL to the parent repo. For other pipelines, the `origin_` and `target_repository_url`s will be the same.";
                                                    readonly example: "https://github.com/CircleCI-Public/api-preview-docs";
                                                };
                                                readonly branch: {
                                                    readonly type: "string";
                                                    readonly description: "The branch where the pipeline ran. The HEAD commit on this branch was used for the pipeline. Note that `branch` and `tag` are mutually exclusive. To trigger a pipeline for a PR by number use `pull/<number>/head` for the PR ref or `pull/<number>/merge` for the merge ref (GitHub only).";
                                                    readonly example: "feature/design-new-api";
                                                };
                                                readonly review_id: {
                                                    readonly type: "string";
                                                    readonly description: "The code review id.";
                                                    readonly example: "123";
                                                };
                                                readonly review_url: {
                                                    readonly type: "string";
                                                    readonly description: "The code review URL.";
                                                    readonly example: "https://github.com/CircleCI-Public/api-preview-docs/pull/123";
                                                };
                                                readonly revision: {
                                                    readonly type: "string";
                                                    readonly description: "The code revision the pipeline ran.";
                                                    readonly example: "f454a02b5d10fcccfd7d9dd7608a76d6493a98b4";
                                                };
                                                readonly tag: {
                                                    readonly type: "string";
                                                    readonly description: "The tag used by the pipeline. The commit that this tag points to was used for the pipeline. Note that `branch` and `tag` are mutually exclusive.";
                                                    readonly example: "v3.1.4159";
                                                };
                                                readonly commit: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly subject: {
                                                            readonly type: "string";
                                                            readonly "x-nullable": true;
                                                            readonly description: "The subject of the commit message.";
                                                        };
                                                        readonly body: {
                                                            readonly type: "string";
                                                            readonly "x-nullable": true;
                                                            readonly description: "The body of the commit message.";
                                                        };
                                                    };
                                                    readonly required: readonly ["subject", "body"];
                                                    readonly description: "The latest commit in the pipeline.";
                                                };
                                                readonly origin_repository_url: {
                                                    readonly type: "string";
                                                    readonly description: "URL for the repository where the trigger originated. For fork-PR pipelines, this is the URL to the fork. For other pipelines the `origin_` and `target_repository_url`s will be the same.";
                                                    readonly example: "https://github.com/CircleCI-Public/api-preview-docs";
                                                };
                                            };
                                            readonly required: readonly ["provider_name", "origin_repository_url", "target_repository_url", "revision"];
                                            readonly description: "VCS information for the pipeline.";
                                        };
                                    };
                                    readonly required: readonly ["id", "number", "project_slug", "created_at", "errors", "state", "trigger"];
                                    readonly description: "A pipeline response.";
                                    readonly title: "Pipeline";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "pipeline-id";
                    readonly description: "The unique ID of the pipeline.";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                    readonly example: "5034460f-c7c4-4c43-9457-de07e2029e7b";
                }];
            };
        };
        readonly "/pipeline/{pipeline-id}/config": {
            readonly get: {
                readonly summary: "Get a pipeline's configuration";
                readonly description: "Returns a pipeline's configuration by ID.";
                readonly tags: readonly ["Pipeline"];
                readonly operationId: "getPipelineConfigById";
                readonly responses: {
                    readonly "200": {
                        readonly description: "The configuration strings for the pipeline.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly source: {
                                            readonly type: "string";
                                            readonly description: "The source configuration for the pipeline, before any config compilation has been performed. If there is no config, then this field will be empty.";
                                        };
                                        readonly compiled: {
                                            readonly type: "string";
                                            readonly description: "The compiled configuration for the pipeline, after all orb expansion has been performed. If there were errors processing the pipeline's configuration, then this field may be empty.";
                                        };
                                        readonly "setup-config": {
                                            readonly type: "string";
                                            readonly description: "The setup configuration for the pipeline used for Setup Workflows. If there were errors processing the pipeline's configuration or if setup workflows are not enabled, then this field should not exist";
                                        };
                                        readonly "compiled-setup-config": {
                                            readonly type: "string";
                                            readonly description: "The compiled setup configuration for the pipeline, after all orb expansion has been performed. If there were errors processing the pipeline's setup workflows, then this field may be empty.";
                                        };
                                    };
                                    readonly required: readonly ["source", "compiled"];
                                    readonly description: "The configuration strings for the pipeline.";
                                    readonly title: "PipelineConfig";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "pipeline-id";
                    readonly description: "The unique ID of the pipeline.";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                    readonly example: "5034460f-c7c4-4c43-9457-de07e2029e7b";
                }];
            };
        };
        readonly "/pipeline/{pipeline-id}/workflow": {
            readonly get: {
                readonly summary: "Get a pipeline's workflows";
                readonly description: "Returns a paginated list of workflows by pipeline ID.";
                readonly tags: readonly ["Pipeline"];
                readonly operationId: "listWorkflowsByPipelineId";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A paginated list of workflow objects.";
                        readonly links: {
                            readonly NextPipelineWorkflowsPage: {
                                readonly operationId: "listWorkflowsByPipelineId";
                                readonly parameters: {
                                    readonly "pipeline-id": "$request.path.pipeline-id";
                                    readonly "page-token": "$response.body#/next_page_token";
                                };
                            };
                        };
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly items: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly pipeline_id: {
                                                        readonly type: "string";
                                                        readonly format: "uuid";
                                                        readonly description: "The ID of the pipeline this workflow belongs to.";
                                                        readonly example: "5034460f-c7c4-4c43-9457-de07e2029e7b";
                                                    };
                                                    readonly canceled_by: {
                                                        readonly type: "string";
                                                        readonly format: "uuid";
                                                    };
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly format: "uuid";
                                                        readonly description: "The unique ID of the workflow.";
                                                    };
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the workflow.";
                                                        readonly example: "build-and-test";
                                                    };
                                                    readonly project_slug: {
                                                        readonly type: "string";
                                                        readonly description: "The project-slug for the pipeline this workflow belongs to.";
                                                        readonly example: "gh/CircleCI-Public/api-preview-docs";
                                                    };
                                                    readonly errored_by: {
                                                        readonly type: "string";
                                                        readonly format: "uuid";
                                                    };
                                                    readonly tag: {
                                                        readonly enum: readonly ["setup"];
                                                        readonly type: "string";
                                                        readonly "x-nullable": true;
                                                        readonly description: "Tag used for the workflow";
                                                        readonly example: "setup";
                                                    };
                                                    readonly status: {
                                                        readonly enum: readonly ["success", "running", "not_run", "failed", "error", "failing", "on_hold", "canceled", "unauthorized"];
                                                        readonly type: "string";
                                                        readonly description: "The current status of the workflow.";
                                                    };
                                                    readonly started_by: {
                                                        readonly type: "string";
                                                        readonly format: "uuid";
                                                    };
                                                    readonly pipeline_number: {
                                                        readonly type: "integer";
                                                        readonly format: "int64";
                                                        readonly description: "The number of the pipeline this workflow belongs to.";
                                                        readonly example: "25";
                                                    };
                                                    readonly created_at: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The date and time the workflow was created.";
                                                    };
                                                    readonly stopped_at: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly "x-nullable": true;
                                                        readonly description: "The date and time the workflow stopped.";
                                                    };
                                                };
                                                readonly required: readonly ["id", "name", "status", "created_at", "stopped_at", "pipeline_id", "pipeline_number", "project_slug", "started_by"];
                                                readonly description: "A workflow";
                                                readonly title: "Workflow";
                                            };
                                            readonly description: "A list of workflows.";
                                            readonly title: "Workflow list";
                                        };
                                        readonly next_page_token: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "A token to pass as a `page-token` query parameter to return the next page of results.";
                                        };
                                    };
                                    readonly required: readonly ["items", "next_page_token"];
                                    readonly description: "A list of workflows and associated pagination token.";
                                    readonly title: "WorkflowListResponse";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "pipeline-id";
                    readonly description: "The unique ID of the pipeline.";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                    readonly example: "5034460f-c7c4-4c43-9457-de07e2029e7b";
                }, {
                    readonly in: "query";
                    readonly name: "page-token";
                    readonly description: "A token to retrieve the next page of results.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: false;
                    readonly allowEmptyValue: true;
                }];
            };
        };
        readonly "/project/{project-slug}": {
            readonly get: {
                readonly summary: "Get a project";
                readonly description: "Retrieves a project by project slug.";
                readonly tags: readonly ["Project"];
                readonly operationId: "getProjectBySlug";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A project object";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly slug: {
                                            readonly type: "string";
                                            readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                                            readonly example: "gh/CircleCI-Public/api-preview-docs";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The name of the project";
                                            readonly example: "api-preview-docs";
                                        };
                                        readonly id: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                        };
                                        readonly organization_name: {
                                            readonly type: "string";
                                            readonly description: "The name of the organization the project belongs to";
                                            readonly example: "CircleCI-Public";
                                        };
                                        readonly organization_slug: {
                                            readonly type: "string";
                                            readonly description: "The slug of the organization the project belongs to";
                                            readonly example: "CircleCI-Public";
                                        };
                                        readonly organization_id: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                            readonly description: "The id of the organization the project belongs to";
                                            readonly example: "CircleCI-Public";
                                        };
                                        readonly vcs_info: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly vcs_url: {
                                                    readonly type: "string";
                                                    readonly description: "URL to the repository hosting the project's code";
                                                    readonly example: "https://github.com/CircleCI-Public/api-preview-docs";
                                                };
                                                readonly provider: {
                                                    readonly enum: readonly ["Bitbucket", "CircleCI", "GitHub"];
                                                    readonly type: "string";
                                                    readonly description: "The VCS provider";
                                                };
                                                readonly default_branch: {
                                                    readonly type: "string";
                                                    readonly example: "master";
                                                };
                                            };
                                            readonly required: readonly ["vcs_url", "provider", "default_branch"];
                                            readonly description: "Information about the VCS that hosts the project source code.";
                                        };
                                    };
                                    readonly required: readonly ["slug", "name", "id", "organization_name", "organization_slug", "organization_id", "vcs_info"];
                                    readonly description: "NOTE: The definition of Project is subject to change.";
                                    readonly title: "Project";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }];
            };
        };
        readonly "/project/{project-slug}/checkout-key": {
            readonly post: {
                readonly summary: "Create a new checkout key";
                readonly description: "Creates a new checkout key. This API request is only usable with a user API token.";
                readonly tags: readonly ["Project"];
                readonly operationId: "createCheckoutKey";
                readonly responses: {
                    readonly "201": {
                        readonly description: "The checkout key.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly "public-key": {
                                            readonly type: "string";
                                            readonly description: "A public SSH key.";
                                            readonly example: "ssh-rsa ...";
                                        };
                                        readonly type: {
                                            readonly enum: readonly ["deploy-key", "github-user-key"];
                                            readonly type: "string";
                                            readonly description: "The type of checkout key. This may be either `deploy-key` or `github-user-key`.";
                                            readonly title: "CheckoutKeyType";
                                            readonly example: "deploy-key";
                                        };
                                        readonly fingerprint: {
                                            readonly type: "string";
                                            readonly description: "An SSH key fingerprint.";
                                            readonly example: "c9:0b:1c:4f:d5:65:56:b9:ad:88:f9:81:2b:37:74:2f";
                                        };
                                        readonly preferred: {
                                            readonly type: "boolean";
                                            readonly description: "A boolean value that indicates if this key is preferred.";
                                            readonly example: true;
                                        };
                                        readonly "created-at": {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the checkout key was created.";
                                            readonly example: "2015-09-21T17:29:21.042Z";
                                        };
                                    };
                                    readonly required: readonly ["public-key", "type", "fingerprint", "preferred", "created-at"];
                                    readonly title: "CheckoutKey";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }];
                readonly requestBody: {
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly type: {
                                        readonly enum: readonly ["user-key", "deploy-key"];
                                        readonly type: "string";
                                        readonly description: "The type of checkout key to create. This may be either `deploy-key` or `user-key`.";
                                        readonly title: "CheckoutKeyInputType";
                                        readonly example: "deploy-key";
                                    };
                                };
                                readonly required: readonly ["type"];
                                readonly title: "CheckoutKeyInput";
                            };
                        };
                    };
                };
            };
            readonly get: {
                readonly summary: "Get all checkout keys";
                readonly description: "Returns a sequence of checkout keys for `:project`.";
                readonly tags: readonly ["Project"];
                readonly operationId: "listCheckoutKeys";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A sequence of checkout keys.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly items: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly "public-key": {
                                                        readonly type: "string";
                                                        readonly description: "A public SSH key.";
                                                        readonly example: "ssh-rsa ...";
                                                    };
                                                    readonly type: {
                                                        readonly enum: readonly ["deploy-key", "github-user-key"];
                                                        readonly type: "string";
                                                        readonly description: "The type of checkout key. This may be either `deploy-key` or `github-user-key`.";
                                                        readonly title: "CheckoutKeyType";
                                                        readonly example: "deploy-key";
                                                    };
                                                    readonly fingerprint: {
                                                        readonly type: "string";
                                                        readonly description: "An SSH key fingerprint.";
                                                        readonly example: "c9:0b:1c:4f:d5:65:56:b9:ad:88:f9:81:2b:37:74:2f";
                                                    };
                                                    readonly preferred: {
                                                        readonly type: "boolean";
                                                        readonly description: "A boolean value that indicates if this key is preferred.";
                                                        readonly example: true;
                                                    };
                                                    readonly "created-at": {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The date and time the checkout key was created.";
                                                        readonly example: "2015-09-21T17:29:21.042Z";
                                                    };
                                                };
                                                readonly required: readonly ["public-key", "type", "fingerprint", "preferred", "created-at"];
                                                readonly title: "CheckoutKey";
                                            };
                                        };
                                        readonly next_page_token: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "A token to pass as a `page-token` query parameter to return the next page of results.";
                                        };
                                    };
                                    readonly required: readonly ["items", "next_page_token"];
                                    readonly title: "CheckoutKeyListResponse";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }];
            };
        };
        readonly "/project/{project-slug}/checkout-key/{fingerprint}": {
            readonly get: {
                readonly summary: "Get a checkout key";
                readonly description: "Returns an individual checkout key.";
                readonly tags: readonly ["Project"];
                readonly operationId: "getCheckoutKey";
                readonly responses: {
                    readonly "200": {
                        readonly description: "The checkout key.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly "public-key": {
                                            readonly type: "string";
                                            readonly description: "A public SSH key.";
                                            readonly example: "ssh-rsa ...";
                                        };
                                        readonly type: {
                                            readonly enum: readonly ["deploy-key", "github-user-key"];
                                            readonly type: "string";
                                            readonly description: "The type of checkout key. This may be either `deploy-key` or `github-user-key`.";
                                            readonly title: "CheckoutKeyType";
                                            readonly example: "deploy-key";
                                        };
                                        readonly fingerprint: {
                                            readonly type: "string";
                                            readonly description: "An SSH key fingerprint.";
                                            readonly example: "c9:0b:1c:4f:d5:65:56:b9:ad:88:f9:81:2b:37:74:2f";
                                        };
                                        readonly preferred: {
                                            readonly type: "boolean";
                                            readonly description: "A boolean value that indicates if this key is preferred.";
                                            readonly example: true;
                                        };
                                        readonly "created-at": {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the checkout key was created.";
                                            readonly example: "2015-09-21T17:29:21.042Z";
                                        };
                                    };
                                    readonly required: readonly ["public-key", "type", "fingerprint", "preferred", "created-at"];
                                    readonly title: "CheckoutKey";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }, {
                    readonly in: "path";
                    readonly name: "fingerprint";
                    readonly description: "An SSH key fingerprint.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "c9:0b:1c:4f:d5:65:56:b9:ad:88:f9:81:2b:37:74:2f";
                }];
            };
            readonly delete: {
                readonly summary: "Delete a checkout key";
                readonly description: "Deletes the checkout key.";
                readonly tags: readonly ["Project"];
                readonly operationId: "deleteCheckoutKey";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A confirmation message.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                            readonly description: "A human-readable message";
                                        };
                                    };
                                    readonly required: readonly ["message"];
                                    readonly description: "message response";
                                    readonly title: "MessageResponse";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }, {
                    readonly in: "path";
                    readonly name: "fingerprint";
                    readonly description: "An SSH key fingerprint.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "c9:0b:1c:4f:d5:65:56:b9:ad:88:f9:81:2b:37:74:2f";
                }];
            };
        };
        readonly "/project/{project-slug}/envvar": {
            readonly post: {
                readonly summary: "Create an environment variable";
                readonly description: "Creates a new environment variable.";
                readonly tags: readonly ["Project"];
                readonly operationId: "createEnvVar";
                readonly responses: {
                    readonly "201": {
                        readonly description: "The environment variable.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The name of the environment variable.";
                                            readonly example: "foo";
                                        };
                                        readonly value: {
                                            readonly type: "string";
                                            readonly description: "The value of the environment variable.";
                                            readonly example: "xxxx1234";
                                        };
                                    };
                                    readonly required: readonly ["name", "value"];
                                    readonly title: "EnvironmentVariablePair";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }];
                readonly requestBody: {
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "The name of the environment variable.";
                                        readonly example: "foo";
                                    };
                                    readonly value: {
                                        readonly type: "string";
                                        readonly description: "The value of the environment variable.";
                                        readonly example: "xxxx1234";
                                    };
                                };
                                readonly required: readonly ["name", "value"];
                                readonly title: "EnvironmentVariablePair";
                            };
                        };
                    };
                };
            };
            readonly get: {
                readonly summary: "List all environment variables";
                readonly description: "Returns four 'x' characters, in addition to the last four ASCII characters of the value, consistent with the display of environment variable values on the CircleCI website.";
                readonly tags: readonly ["Project"];
                readonly operationId: "listEnvVars";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A sequence of environment variables.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly items: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the environment variable.";
                                                        readonly example: "foo";
                                                    };
                                                    readonly value: {
                                                        readonly type: "string";
                                                        readonly description: "The value of the environment variable.";
                                                        readonly example: "xxxx1234";
                                                    };
                                                };
                                                readonly required: readonly ["name", "value"];
                                                readonly title: "EnvironmentVariablePair";
                                            };
                                        };
                                        readonly next_page_token: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "A token to pass as a `page-token` query parameter to return the next page of results.";
                                        };
                                    };
                                    readonly required: readonly ["items", "next_page_token"];
                                    readonly title: "EnvironmentVariableListResponse";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }];
            };
        };
        readonly "/project/{project-slug}/envvar/{name}": {
            readonly delete: {
                readonly summary: "Delete an environment variable";
                readonly description: "Deletes the environment variable named :name.";
                readonly tags: readonly ["Project"];
                readonly operationId: "deleteEnvVar";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A confirmation message.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                            readonly description: "A human-readable message";
                                        };
                                    };
                                    readonly required: readonly ["message"];
                                    readonly description: "message response";
                                    readonly title: "MessageResponse";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }, {
                    readonly in: "path";
                    readonly name: "name";
                    readonly description: "The name of the environment variable.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "foo";
                }];
            };
            readonly get: {
                readonly summary: "Get a masked environment variable";
                readonly description: "Returns the masked value of environment variable :name.";
                readonly tags: readonly ["Project"];
                readonly operationId: "getEnvVar";
                readonly responses: {
                    readonly "200": {
                        readonly description: "The environment variable.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The name of the environment variable.";
                                            readonly example: "foo";
                                        };
                                        readonly value: {
                                            readonly type: "string";
                                            readonly description: "The value of the environment variable.";
                                            readonly example: "xxxx1234";
                                        };
                                    };
                                    readonly required: readonly ["name", "value"];
                                    readonly title: "EnvironmentVariablePair";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }, {
                    readonly in: "path";
                    readonly name: "name";
                    readonly description: "The name of the environment variable.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "foo";
                }];
            };
        };
        readonly "/project/{project-slug}/job/{job-number}": {
            readonly get: {
                readonly summary: "Get job details";
                readonly description: "Returns job details.";
                readonly tags: readonly ["Job"];
                readonly operationId: "getJobDetails";
                readonly responses: {
                    readonly "200": {
                        readonly description: "Job details.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly web_url: {
                                            readonly type: "string";
                                            readonly description: "URL of the job in CircleCI Web UI.";
                                        };
                                        readonly project: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly format: "uuid";
                                                };
                                                readonly slug: {
                                                    readonly type: "string";
                                                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                                                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "The name of the project";
                                                    readonly example: "api-preview-docs";
                                                };
                                                readonly external_url: {
                                                    readonly type: "string";
                                                    readonly description: "URL to the repository hosting the project's code";
                                                    readonly example: "https://github.com/CircleCI-Public/api-preview-docs";
                                                };
                                            };
                                            readonly required: readonly ["id", "slug", "name", "external_url"];
                                            readonly description: "Information about a project.";
                                        };
                                        readonly parallel_runs: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly index: {
                                                        readonly type: "integer";
                                                        readonly format: "int64";
                                                        readonly description: "Index of the parallel run.";
                                                    };
                                                    readonly status: {
                                                        readonly type: "string";
                                                        readonly description: "Status of the parallel run.";
                                                    };
                                                };
                                                readonly required: readonly ["index", "status"];
                                                readonly description: "Info about a status of the parallel run.";
                                            };
                                            readonly description: "Info about parallels runs and their status.";
                                        };
                                        readonly started_at: {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the job started.";
                                        };
                                        readonly latest_workflow: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly format: "uuid";
                                                    readonly description: "The unique ID of the workflow.";
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "The name of the workflow.";
                                                    readonly example: "build-and-test";
                                                };
                                            };
                                            readonly required: readonly ["id", "name"];
                                            readonly description: "Info about the latest workflow the job was a part of.";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The name of the job.";
                                        };
                                        readonly executor: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly resource_class: {
                                                    readonly type: "string";
                                                    readonly description: "Resource class name.";
                                                };
                                                readonly type: {
                                                    readonly type: "string";
                                                    readonly description: "Executor type.";
                                                };
                                            };
                                            readonly required: readonly ["resource_class"];
                                            readonly description: "Information about executor used for a job.";
                                        };
                                        readonly parallelism: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly description: "A number of parallel runs the job has.";
                                        };
                                        readonly status: {
                                            readonly enum: readonly ["success", "running", "not_run", "failed", "retried", "queued", "not_running", "infrastructure_fail", "timedout", "on_hold", "terminated-unknown", "blocked", "canceled", "unauthorized"];
                                            readonly type: "string";
                                            readonly description: "The current status of the job.";
                                        };
                                        readonly number: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly description: "The number of the job.";
                                        };
                                        readonly pipeline: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly format: "uuid";
                                                    readonly description: "The unique ID of the pipeline.";
                                                    readonly example: "5034460f-c7c4-4c43-9457-de07e2029e7b";
                                                };
                                            };
                                            readonly required: readonly ["id"];
                                            readonly description: "Info about a pipeline the job is a part of.";
                                        };
                                        readonly duration: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly "x-nullable": true;
                                            readonly description: "Duration of a job in milliseconds.";
                                        };
                                        readonly created_at: {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The time when the job was created.";
                                        };
                                        readonly messages: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly type: {
                                                        readonly type: "string";
                                                        readonly description: "Message type.";
                                                    };
                                                    readonly message: {
                                                        readonly type: "string";
                                                        readonly description: "Information describing message.";
                                                    };
                                                    readonly reason: {
                                                        readonly type: "string";
                                                        readonly description: "Value describing the reason for message to be added to the job.";
                                                    };
                                                };
                                                readonly required: readonly ["type", "message"];
                                                readonly description: "Message from CircleCI execution platform.";
                                            };
                                            readonly description: "Messages from CircleCI execution platform.";
                                        };
                                        readonly contexts: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the context.";
                                                    };
                                                };
                                                readonly required: readonly ["name"];
                                                readonly description: "Information about the context.";
                                            };
                                            readonly description: "List of contexts used by the job.";
                                        };
                                        readonly organization: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "The name of the organization.";
                                                };
                                            };
                                            readonly required: readonly ["name"];
                                            readonly description: "Information about an organization.";
                                        };
                                        readonly queued_at: {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The time when the job was placed in a queue.";
                                        };
                                        readonly stopped_at: {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly "x-nullable": true;
                                            readonly description: "The time when the job stopped.";
                                        };
                                    };
                                    readonly required: readonly ["number", "name", "status", "started_at", "created_at", "queued_at", "duration", "executor", "project", "organization", "contexts", "web_url", "parallel_runs", "latest_workflow", "pipeline", "parallelism", "messages"];
                                    readonly description: "Job Details";
                                    readonly title: "Job Details";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "job-number";
                    readonly description: "The number of the job.";
                    readonly schema: {};
                    readonly required: true;
                    readonly example: "123";
                }, {
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }];
            };
        };
        readonly "/project/{project-slug}/job/{job-number}/cancel": {
            readonly post: {
                readonly summary: "Cancel job";
                readonly description: "Cancel job with a given job number.";
                readonly tags: readonly ["Job"];
                readonly operationId: "cancelJob";
                readonly responses: {
                    readonly "200": {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                            readonly description: "A human-readable message";
                                        };
                                    };
                                    readonly required: readonly ["message"];
                                    readonly description: "message response";
                                    readonly title: "MessageResponse";
                                };
                            };
                        };
                        readonly description: "";
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "job-number";
                    readonly description: "The number of the job.";
                    readonly schema: {};
                    readonly required: true;
                    readonly example: "123";
                }, {
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }];
            };
        };
        readonly "/project/{project-slug}/pipeline": {
            readonly post: {
                readonly summary: "Trigger a new pipeline";
                readonly description: "Triggers a new pipeline on the project.";
                readonly tags: readonly ["Pipeline"];
                readonly operationId: "triggerPipeline";
                readonly responses: {
                    readonly "201": {
                        readonly description: "The created pipeline.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                            readonly description: "The unique ID of the pipeline.";
                                            readonly example: "5034460f-c7c4-4c43-9457-de07e2029e7b";
                                        };
                                        readonly state: {
                                            readonly enum: readonly ["created", "errored", "setup-pending", "setup", "pending"];
                                            readonly type: "string";
                                            readonly description: "The current state of the pipeline.";
                                        };
                                        readonly number: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly description: "The number of the pipeline.";
                                            readonly example: "25";
                                        };
                                        readonly created_at: {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the pipeline was created.";
                                        };
                                    };
                                    readonly required: readonly ["id", "state", "number", "created_at"];
                                    readonly description: "A pipeline creation response.";
                                    readonly title: "PipelineCreation";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }];
                readonly requestBody: {
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly branch: {
                                        readonly type: "string";
                                        readonly description: "The branch where the pipeline ran. The HEAD commit on this branch was used for the pipeline. Note that `branch` and `tag` are mutually exclusive. To trigger a pipeline for a PR by number use `pull/<number>/head` for the PR ref or `pull/<number>/merge` for the merge ref (GitHub only).";
                                        readonly example: "feature/design-new-api";
                                    };
                                    readonly tag: {
                                        readonly type: "string";
                                        readonly description: "The tag used by the pipeline. The commit that this tag points to was used for the pipeline. Note that `branch` and `tag` are mutually exclusive.";
                                        readonly example: "v3.1.4159";
                                    };
                                    readonly parameters: {
                                        readonly type: "object";
                                        readonly additionalProperties: {
                                            readonly anyOf: readonly [{
                                                readonly type: "integer";
                                            }, {
                                                readonly type: "string";
                                            }, {
                                                readonly type: "boolean";
                                            }];
                                        };
                                        readonly description: "An object containing pipeline parameters and their values.";
                                        readonly example: {
                                            readonly deploy_prod: true;
                                        };
                                    };
                                };
                                readonly "x-nullable": true;
                                readonly description: "The information you can supply when triggering a pipeline.";
                                readonly title: "TriggerPipelineParameters";
                            };
                        };
                    };
                };
            };
            readonly get: {
                readonly summary: "Get all pipelines";
                readonly description: "Returns all pipelines for this project.";
                readonly tags: readonly ["Pipeline"];
                readonly operationId: "listPipelinesForProject";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A sequence of pipelines.";
                        readonly links: {
                            readonly NextPipelinePage: {
                                readonly operationId: "listPipelinesForProject";
                                readonly parameters: {
                                    readonly "project-slug": "$request.path.project-slug";
                                    readonly "page-token": "$response.body#/next_page_token";
                                };
                            };
                        };
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly items: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly format: "uuid";
                                                        readonly description: "The unique ID of the pipeline.";
                                                        readonly example: "5034460f-c7c4-4c43-9457-de07e2029e7b";
                                                    };
                                                    readonly errors: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "object";
                                                            readonly properties: {
                                                                readonly type: {
                                                                    readonly enum: readonly ["config", "config-fetch", "timeout", "permission", "other", "plan"];
                                                                    readonly type: "string";
                                                                    readonly description: "The type of error.";
                                                                };
                                                                readonly message: {
                                                                    readonly type: "string";
                                                                    readonly description: "A human-readable error message.";
                                                                };
                                                            };
                                                            readonly required: readonly ["type", "message"];
                                                            readonly description: "An error with a type and message.";
                                                        };
                                                        readonly description: "A sequence of errors that have occurred within the pipeline.";
                                                    };
                                                    readonly project_slug: {
                                                        readonly type: "string";
                                                        readonly description: "The project-slug for the pipeline.";
                                                        readonly example: "gh/CircleCI-Public/api-preview-docs";
                                                    };
                                                    readonly updated_at: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The date and time the pipeline was last updated.";
                                                    };
                                                    readonly number: {
                                                        readonly type: "integer";
                                                        readonly format: "int64";
                                                        readonly description: "The number of the pipeline.";
                                                        readonly example: "25";
                                                    };
                                                    readonly trigger_parameters: {
                                                        readonly type: "object";
                                                        readonly additionalProperties: {
                                                            readonly anyOf: readonly [{
                                                                readonly type: "string";
                                                            }, {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                            }, {
                                                                readonly type: "boolean";
                                                            }, {
                                                                readonly type: "object";
                                                            }];
                                                        };
                                                    };
                                                    readonly state: {
                                                        readonly enum: readonly ["created", "errored", "setup-pending", "setup", "pending"];
                                                        readonly type: "string";
                                                        readonly description: "The current state of the pipeline.";
                                                    };
                                                    readonly created_at: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The date and time the pipeline was created.";
                                                    };
                                                    readonly trigger: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly type: {
                                                                readonly enum: readonly ["scheduled_pipeline", "explicit", "api", "webhook"];
                                                                readonly type: "string";
                                                                readonly description: "The type of trigger.";
                                                            };
                                                            readonly received_at: {
                                                                readonly type: "string";
                                                                readonly format: "date-time";
                                                                readonly description: "The date and time the trigger was received.";
                                                            };
                                                            readonly actor: {
                                                                readonly type: "object";
                                                                readonly properties: {
                                                                    readonly login: {
                                                                        readonly type: "string";
                                                                        readonly description: "The login information for the user on the VCS.";
                                                                        readonly title: "Login";
                                                                    };
                                                                    readonly avatar_url: {
                                                                        readonly type: "string";
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "URL to the user's avatar on the VCS";
                                                                    };
                                                                };
                                                                readonly required: readonly ["login", "avatar_url"];
                                                                readonly description: "The user who triggered the Pipeline.";
                                                            };
                                                        };
                                                        readonly required: readonly ["type", "received_at", "actor"];
                                                        readonly description: "A summary of the trigger.";
                                                    };
                                                    readonly vcs: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly provider_name: {
                                                                readonly type: "string";
                                                                readonly description: "Name of the VCS provider (e.g. GitHub, Bitbucket).";
                                                                readonly example: "GitHub";
                                                            };
                                                            readonly target_repository_url: {
                                                                readonly type: "string";
                                                                readonly description: "URL for the repository the trigger targets (i.e. the repository where the PR will be merged). For fork-PR pipelines, this is the URL to the parent repo. For other pipelines, the `origin_` and `target_repository_url`s will be the same.";
                                                                readonly example: "https://github.com/CircleCI-Public/api-preview-docs";
                                                            };
                                                            readonly branch: {
                                                                readonly type: "string";
                                                                readonly description: "The branch where the pipeline ran. The HEAD commit on this branch was used for the pipeline. Note that `branch` and `tag` are mutually exclusive. To trigger a pipeline for a PR by number use `pull/<number>/head` for the PR ref or `pull/<number>/merge` for the merge ref (GitHub only).";
                                                                readonly example: "feature/design-new-api";
                                                            };
                                                            readonly review_id: {
                                                                readonly type: "string";
                                                                readonly description: "The code review id.";
                                                                readonly example: "123";
                                                            };
                                                            readonly review_url: {
                                                                readonly type: "string";
                                                                readonly description: "The code review URL.";
                                                                readonly example: "https://github.com/CircleCI-Public/api-preview-docs/pull/123";
                                                            };
                                                            readonly revision: {
                                                                readonly type: "string";
                                                                readonly description: "The code revision the pipeline ran.";
                                                                readonly example: "f454a02b5d10fcccfd7d9dd7608a76d6493a98b4";
                                                            };
                                                            readonly tag: {
                                                                readonly type: "string";
                                                                readonly description: "The tag used by the pipeline. The commit that this tag points to was used for the pipeline. Note that `branch` and `tag` are mutually exclusive.";
                                                                readonly example: "v3.1.4159";
                                                            };
                                                            readonly commit: {
                                                                readonly type: "object";
                                                                readonly properties: {
                                                                    readonly subject: {
                                                                        readonly type: "string";
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The subject of the commit message.";
                                                                    };
                                                                    readonly body: {
                                                                        readonly type: "string";
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The body of the commit message.";
                                                                    };
                                                                };
                                                                readonly required: readonly ["subject", "body"];
                                                                readonly description: "The latest commit in the pipeline.";
                                                            };
                                                            readonly origin_repository_url: {
                                                                readonly type: "string";
                                                                readonly description: "URL for the repository where the trigger originated. For fork-PR pipelines, this is the URL to the fork. For other pipelines the `origin_` and `target_repository_url`s will be the same.";
                                                                readonly example: "https://github.com/CircleCI-Public/api-preview-docs";
                                                            };
                                                        };
                                                        readonly required: readonly ["provider_name", "origin_repository_url", "target_repository_url", "revision"];
                                                        readonly description: "VCS information for the pipeline.";
                                                    };
                                                };
                                                readonly required: readonly ["id", "number", "project_slug", "created_at", "errors", "state", "trigger"];
                                                readonly description: "A pipeline response.";
                                                readonly title: "Pipeline";
                                            };
                                        };
                                        readonly next_page_token: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "A token to pass as a `page-token` query parameter to return the next page of results.";
                                        };
                                    };
                                    readonly required: readonly ["items", "next_page_token"];
                                    readonly description: "List of pipelines";
                                    readonly title: "PipelineListResponse";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }, {
                    readonly in: "query";
                    readonly name: "branch";
                    readonly description: "The name of a vcs branch.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: false;
                    readonly allowEmptyValue: true;
                }, {
                    readonly in: "query";
                    readonly name: "page-token";
                    readonly description: "A token to retrieve the next page of results.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: false;
                    readonly allowEmptyValue: true;
                }];
            };
        };
        readonly "/project/{project-slug}/pipeline/mine": {
            readonly get: {
                readonly summary: "Get your pipelines";
                readonly description: "Returns a sequence of all pipelines for this project triggered by the user.";
                readonly tags: readonly ["Pipeline"];
                readonly operationId: "listMyPipelines";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A sequence of pipelines.";
                        readonly links: {
                            readonly NextPipelinePage: {
                                readonly operationId: "listMyPipelines";
                                readonly parameters: {
                                    readonly "project-slug": "$request.path.project-slug";
                                    readonly "page-token": "$response.body#/next_page_token";
                                };
                            };
                        };
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly items: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly format: "uuid";
                                                        readonly description: "The unique ID of the pipeline.";
                                                        readonly example: "5034460f-c7c4-4c43-9457-de07e2029e7b";
                                                    };
                                                    readonly errors: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "object";
                                                            readonly properties: {
                                                                readonly type: {
                                                                    readonly enum: readonly ["config", "config-fetch", "timeout", "permission", "other", "plan"];
                                                                    readonly type: "string";
                                                                    readonly description: "The type of error.";
                                                                };
                                                                readonly message: {
                                                                    readonly type: "string";
                                                                    readonly description: "A human-readable error message.";
                                                                };
                                                            };
                                                            readonly required: readonly ["type", "message"];
                                                            readonly description: "An error with a type and message.";
                                                        };
                                                        readonly description: "A sequence of errors that have occurred within the pipeline.";
                                                    };
                                                    readonly project_slug: {
                                                        readonly type: "string";
                                                        readonly description: "The project-slug for the pipeline.";
                                                        readonly example: "gh/CircleCI-Public/api-preview-docs";
                                                    };
                                                    readonly updated_at: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The date and time the pipeline was last updated.";
                                                    };
                                                    readonly number: {
                                                        readonly type: "integer";
                                                        readonly format: "int64";
                                                        readonly description: "The number of the pipeline.";
                                                        readonly example: "25";
                                                    };
                                                    readonly trigger_parameters: {
                                                        readonly type: "object";
                                                        readonly additionalProperties: {
                                                            readonly anyOf: readonly [{
                                                                readonly type: "string";
                                                            }, {
                                                                readonly type: "integer";
                                                                readonly format: "int64";
                                                            }, {
                                                                readonly type: "boolean";
                                                            }, {
                                                                readonly type: "object";
                                                            }];
                                                        };
                                                    };
                                                    readonly state: {
                                                        readonly enum: readonly ["created", "errored", "setup-pending", "setup", "pending"];
                                                        readonly type: "string";
                                                        readonly description: "The current state of the pipeline.";
                                                    };
                                                    readonly created_at: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The date and time the pipeline was created.";
                                                    };
                                                    readonly trigger: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly type: {
                                                                readonly enum: readonly ["scheduled_pipeline", "explicit", "api", "webhook"];
                                                                readonly type: "string";
                                                                readonly description: "The type of trigger.";
                                                            };
                                                            readonly received_at: {
                                                                readonly type: "string";
                                                                readonly format: "date-time";
                                                                readonly description: "The date and time the trigger was received.";
                                                            };
                                                            readonly actor: {
                                                                readonly type: "object";
                                                                readonly properties: {
                                                                    readonly login: {
                                                                        readonly type: "string";
                                                                        readonly description: "The login information for the user on the VCS.";
                                                                        readonly title: "Login";
                                                                    };
                                                                    readonly avatar_url: {
                                                                        readonly type: "string";
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "URL to the user's avatar on the VCS";
                                                                    };
                                                                };
                                                                readonly required: readonly ["login", "avatar_url"];
                                                                readonly description: "The user who triggered the Pipeline.";
                                                            };
                                                        };
                                                        readonly required: readonly ["type", "received_at", "actor"];
                                                        readonly description: "A summary of the trigger.";
                                                    };
                                                    readonly vcs: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly provider_name: {
                                                                readonly type: "string";
                                                                readonly description: "Name of the VCS provider (e.g. GitHub, Bitbucket).";
                                                                readonly example: "GitHub";
                                                            };
                                                            readonly target_repository_url: {
                                                                readonly type: "string";
                                                                readonly description: "URL for the repository the trigger targets (i.e. the repository where the PR will be merged). For fork-PR pipelines, this is the URL to the parent repo. For other pipelines, the `origin_` and `target_repository_url`s will be the same.";
                                                                readonly example: "https://github.com/CircleCI-Public/api-preview-docs";
                                                            };
                                                            readonly branch: {
                                                                readonly type: "string";
                                                                readonly description: "The branch where the pipeline ran. The HEAD commit on this branch was used for the pipeline. Note that `branch` and `tag` are mutually exclusive. To trigger a pipeline for a PR by number use `pull/<number>/head` for the PR ref or `pull/<number>/merge` for the merge ref (GitHub only).";
                                                                readonly example: "feature/design-new-api";
                                                            };
                                                            readonly review_id: {
                                                                readonly type: "string";
                                                                readonly description: "The code review id.";
                                                                readonly example: "123";
                                                            };
                                                            readonly review_url: {
                                                                readonly type: "string";
                                                                readonly description: "The code review URL.";
                                                                readonly example: "https://github.com/CircleCI-Public/api-preview-docs/pull/123";
                                                            };
                                                            readonly revision: {
                                                                readonly type: "string";
                                                                readonly description: "The code revision the pipeline ran.";
                                                                readonly example: "f454a02b5d10fcccfd7d9dd7608a76d6493a98b4";
                                                            };
                                                            readonly tag: {
                                                                readonly type: "string";
                                                                readonly description: "The tag used by the pipeline. The commit that this tag points to was used for the pipeline. Note that `branch` and `tag` are mutually exclusive.";
                                                                readonly example: "v3.1.4159";
                                                            };
                                                            readonly commit: {
                                                                readonly type: "object";
                                                                readonly properties: {
                                                                    readonly subject: {
                                                                        readonly type: "string";
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The subject of the commit message.";
                                                                    };
                                                                    readonly body: {
                                                                        readonly type: "string";
                                                                        readonly "x-nullable": true;
                                                                        readonly description: "The body of the commit message.";
                                                                    };
                                                                };
                                                                readonly required: readonly ["subject", "body"];
                                                                readonly description: "The latest commit in the pipeline.";
                                                            };
                                                            readonly origin_repository_url: {
                                                                readonly type: "string";
                                                                readonly description: "URL for the repository where the trigger originated. For fork-PR pipelines, this is the URL to the fork. For other pipelines the `origin_` and `target_repository_url`s will be the same.";
                                                                readonly example: "https://github.com/CircleCI-Public/api-preview-docs";
                                                            };
                                                        };
                                                        readonly required: readonly ["provider_name", "origin_repository_url", "target_repository_url", "revision"];
                                                        readonly description: "VCS information for the pipeline.";
                                                    };
                                                };
                                                readonly required: readonly ["id", "number", "project_slug", "created_at", "errors", "state", "trigger"];
                                                readonly description: "A pipeline response.";
                                                readonly title: "Pipeline";
                                            };
                                        };
                                        readonly next_page_token: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "A token to pass as a `page-token` query parameter to return the next page of results.";
                                        };
                                    };
                                    readonly required: readonly ["items", "next_page_token"];
                                    readonly description: "List of pipelines";
                                    readonly title: "PipelineListResponse";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }, {
                    readonly in: "query";
                    readonly name: "page-token";
                    readonly description: "A token to retrieve the next page of results.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: false;
                    readonly allowEmptyValue: true;
                }];
            };
        };
        readonly "/project/{project-slug}/pipeline/{pipeline-number}": {
            readonly get: {
                readonly summary: "Get a pipeline by pipeline number";
                readonly description: "Returns a pipeline by the pipeline number.";
                readonly tags: readonly ["Pipeline"];
                readonly operationId: "getPipelineByNumber";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A pipeline object.";
                        readonly links: {
                            readonly ProjectFromPipeline: {
                                readonly operationId: "getProjectBySlug";
                                readonly parameters: {
                                    readonly project_slug: "$response.body#/project_slug";
                                };
                            };
                        };
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                            readonly description: "The unique ID of the pipeline.";
                                            readonly example: "5034460f-c7c4-4c43-9457-de07e2029e7b";
                                        };
                                        readonly errors: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly type: {
                                                        readonly enum: readonly ["config", "config-fetch", "timeout", "permission", "other", "plan"];
                                                        readonly type: "string";
                                                        readonly description: "The type of error.";
                                                    };
                                                    readonly message: {
                                                        readonly type: "string";
                                                        readonly description: "A human-readable error message.";
                                                    };
                                                };
                                                readonly required: readonly ["type", "message"];
                                                readonly description: "An error with a type and message.";
                                            };
                                            readonly description: "A sequence of errors that have occurred within the pipeline.";
                                        };
                                        readonly project_slug: {
                                            readonly type: "string";
                                            readonly description: "The project-slug for the pipeline.";
                                            readonly example: "gh/CircleCI-Public/api-preview-docs";
                                        };
                                        readonly updated_at: {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the pipeline was last updated.";
                                        };
                                        readonly number: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly description: "The number of the pipeline.";
                                            readonly example: "25";
                                        };
                                        readonly trigger_parameters: {
                                            readonly type: "object";
                                            readonly additionalProperties: {
                                                readonly anyOf: readonly [{
                                                    readonly type: "string";
                                                }, {
                                                    readonly type: "integer";
                                                    readonly format: "int64";
                                                }, {
                                                    readonly type: "boolean";
                                                }, {
                                                    readonly type: "object";
                                                }];
                                            };
                                        };
                                        readonly state: {
                                            readonly enum: readonly ["created", "errored", "setup-pending", "setup", "pending"];
                                            readonly type: "string";
                                            readonly description: "The current state of the pipeline.";
                                        };
                                        readonly created_at: {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the pipeline was created.";
                                        };
                                        readonly trigger: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly type: {
                                                    readonly enum: readonly ["scheduled_pipeline", "explicit", "api", "webhook"];
                                                    readonly type: "string";
                                                    readonly description: "The type of trigger.";
                                                };
                                                readonly received_at: {
                                                    readonly type: "string";
                                                    readonly format: "date-time";
                                                    readonly description: "The date and time the trigger was received.";
                                                };
                                                readonly actor: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly login: {
                                                            readonly type: "string";
                                                            readonly description: "The login information for the user on the VCS.";
                                                            readonly title: "Login";
                                                        };
                                                        readonly avatar_url: {
                                                            readonly type: "string";
                                                            readonly "x-nullable": true;
                                                            readonly description: "URL to the user's avatar on the VCS";
                                                        };
                                                    };
                                                    readonly required: readonly ["login", "avatar_url"];
                                                    readonly description: "The user who triggered the Pipeline.";
                                                };
                                            };
                                            readonly required: readonly ["type", "received_at", "actor"];
                                            readonly description: "A summary of the trigger.";
                                        };
                                        readonly vcs: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly provider_name: {
                                                    readonly type: "string";
                                                    readonly description: "Name of the VCS provider (e.g. GitHub, Bitbucket).";
                                                    readonly example: "GitHub";
                                                };
                                                readonly target_repository_url: {
                                                    readonly type: "string";
                                                    readonly description: "URL for the repository the trigger targets (i.e. the repository where the PR will be merged). For fork-PR pipelines, this is the URL to the parent repo. For other pipelines, the `origin_` and `target_repository_url`s will be the same.";
                                                    readonly example: "https://github.com/CircleCI-Public/api-preview-docs";
                                                };
                                                readonly branch: {
                                                    readonly type: "string";
                                                    readonly description: "The branch where the pipeline ran. The HEAD commit on this branch was used for the pipeline. Note that `branch` and `tag` are mutually exclusive. To trigger a pipeline for a PR by number use `pull/<number>/head` for the PR ref or `pull/<number>/merge` for the merge ref (GitHub only).";
                                                    readonly example: "feature/design-new-api";
                                                };
                                                readonly review_id: {
                                                    readonly type: "string";
                                                    readonly description: "The code review id.";
                                                    readonly example: "123";
                                                };
                                                readonly review_url: {
                                                    readonly type: "string";
                                                    readonly description: "The code review URL.";
                                                    readonly example: "https://github.com/CircleCI-Public/api-preview-docs/pull/123";
                                                };
                                                readonly revision: {
                                                    readonly type: "string";
                                                    readonly description: "The code revision the pipeline ran.";
                                                    readonly example: "f454a02b5d10fcccfd7d9dd7608a76d6493a98b4";
                                                };
                                                readonly tag: {
                                                    readonly type: "string";
                                                    readonly description: "The tag used by the pipeline. The commit that this tag points to was used for the pipeline. Note that `branch` and `tag` are mutually exclusive.";
                                                    readonly example: "v3.1.4159";
                                                };
                                                readonly commit: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly subject: {
                                                            readonly type: "string";
                                                            readonly "x-nullable": true;
                                                            readonly description: "The subject of the commit message.";
                                                        };
                                                        readonly body: {
                                                            readonly type: "string";
                                                            readonly "x-nullable": true;
                                                            readonly description: "The body of the commit message.";
                                                        };
                                                    };
                                                    readonly required: readonly ["subject", "body"];
                                                    readonly description: "The latest commit in the pipeline.";
                                                };
                                                readonly origin_repository_url: {
                                                    readonly type: "string";
                                                    readonly description: "URL for the repository where the trigger originated. For fork-PR pipelines, this is the URL to the fork. For other pipelines the `origin_` and `target_repository_url`s will be the same.";
                                                    readonly example: "https://github.com/CircleCI-Public/api-preview-docs";
                                                };
                                            };
                                            readonly required: readonly ["provider_name", "origin_repository_url", "target_repository_url", "revision"];
                                            readonly description: "VCS information for the pipeline.";
                                        };
                                    };
                                    readonly required: readonly ["id", "number", "project_slug", "created_at", "errors", "state", "trigger"];
                                    readonly description: "A pipeline response.";
                                    readonly title: "Pipeline";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }, {
                    readonly in: "path";
                    readonly name: "pipeline-number";
                    readonly description: "The number of the pipeline.";
                    readonly schema: {};
                    readonly required: true;
                    readonly example: "123";
                }];
            };
        };
        readonly "/project/{project-slug}/schedule": {
            readonly get: {
                readonly summary: "Get all schedules";
                readonly description: "Returns all schedules for this project.";
                readonly tags: readonly ["Schedule"];
                readonly operationId: "listSchedulesForProject";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A sequence of schedules.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly items: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly format: "uuid";
                                                        readonly description: "The unique ID of the schedule.";
                                                    };
                                                    readonly timetable: {
                                                        readonly anyOf: readonly [{
                                                            readonly type: "object";
                                                            readonly properties: {
                                                                readonly "per-hour": {
                                                                    readonly type: "integer";
                                                                    readonly format: "integer";
                                                                    readonly description: "Number of times a schedule triggers per hour, value must be between 1 and 60";
                                                                };
                                                                readonly "hours-of-day": {
                                                                    readonly type: "array";
                                                                    readonly items: {
                                                                        readonly type: "integer";
                                                                        readonly format: "integer";
                                                                        readonly description: "Hour in a day in UTC, value must be between 0 and 24";
                                                                    };
                                                                    readonly description: "Hours in a day in which the schedule triggers.";
                                                                };
                                                                readonly "days-of-week": {
                                                                    readonly type: "array";
                                                                    readonly items: {
                                                                        readonly enum: readonly ["TUE", "SAT", "SUN", "MON", "THU", "WED", "FRI"];
                                                                        readonly type: "string";
                                                                        readonly description: "Day in a week, in three letters format";
                                                                    };
                                                                    readonly description: "Days in a week in which the schedule triggers.";
                                                                };
                                                                readonly "days-of-month": {
                                                                    readonly type: "array";
                                                                    readonly items: {
                                                                        readonly type: "integer";
                                                                        readonly format: "integer";
                                                                        readonly description: "Day in a month, between 1 and 31.";
                                                                    };
                                                                    readonly description: "Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.";
                                                                };
                                                                readonly months: {
                                                                    readonly type: "array";
                                                                    readonly items: {
                                                                        readonly enum: readonly ["MAR", "NOV", "DEC", "JUN", "MAY", "OCT", "FEB", "APR", "SEP", "AUG", "JAN", "JUL"];
                                                                        readonly type: "string";
                                                                        readonly description: "Month, in three letters format.";
                                                                    };
                                                                    readonly description: "Months in which the schedule triggers.";
                                                                };
                                                            };
                                                            readonly required: readonly ["per-hour", "hours-of-day", "days-of-week"];
                                                        }, {
                                                            readonly type: "object";
                                                            readonly properties: {
                                                                readonly "per-hour": {
                                                                    readonly type: "integer";
                                                                    readonly format: "integer";
                                                                    readonly description: "Number of times a schedule triggers per hour, value must be between 1 and 60";
                                                                };
                                                                readonly "hours-of-day": {
                                                                    readonly type: "array";
                                                                    readonly items: {
                                                                        readonly type: "integer";
                                                                        readonly format: "integer";
                                                                        readonly description: "Hour in a day in UTC, value must be between 0 and 24";
                                                                    };
                                                                    readonly description: "Hours in a day in which the schedule triggers.";
                                                                };
                                                                readonly "days-of-month": {
                                                                    readonly type: "array";
                                                                    readonly items: {
                                                                        readonly type: "integer";
                                                                        readonly format: "integer";
                                                                        readonly description: "Day in a month, between 1 and 31.";
                                                                    };
                                                                    readonly description: "Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.";
                                                                };
                                                                readonly "days-of-week": {
                                                                    readonly type: "array";
                                                                    readonly items: {
                                                                        readonly enum: readonly ["TUE", "SAT", "SUN", "MON", "THU", "WED", "FRI"];
                                                                        readonly type: "string";
                                                                        readonly description: "Day in a week, in three letters format";
                                                                    };
                                                                    readonly description: "Days in a week in which the schedule triggers.";
                                                                };
                                                                readonly months: {
                                                                    readonly type: "array";
                                                                    readonly items: {
                                                                        readonly enum: readonly ["MAR", "NOV", "DEC", "JUN", "MAY", "OCT", "FEB", "APR", "SEP", "AUG", "JAN", "JUL"];
                                                                        readonly type: "string";
                                                                        readonly description: "Month, in three letters format.";
                                                                    };
                                                                    readonly description: "Months in which the schedule triggers.";
                                                                };
                                                            };
                                                            readonly required: readonly ["per-hour", "hours-of-day", "days-of-month"];
                                                        }];
                                                        readonly description: "Timetable that specifies when a schedule triggers.";
                                                    };
                                                    readonly "updated-at": {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The date and time the pipeline was last updated.";
                                                    };
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly description: "Name of the schedule.";
                                                    };
                                                    readonly "created-at": {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The date and time the pipeline was created.";
                                                    };
                                                    readonly "project-slug": {
                                                        readonly type: "string";
                                                        readonly description: "The project-slug for the schedule";
                                                        readonly example: "gh/CircleCI-Public/api-preview-docs";
                                                    };
                                                    readonly parameters: {
                                                        readonly type: "object";
                                                        readonly additionalProperties: {
                                                            readonly anyOf: readonly [{
                                                                readonly type: "integer";
                                                            }, {
                                                                readonly type: "string";
                                                            }, {
                                                                readonly type: "boolean";
                                                            }];
                                                        };
                                                        readonly description: "Pipeline parameters represented as key-value pairs. Must contain branch or tag.";
                                                        readonly example: {
                                                            readonly deploy_prod: true;
                                                            readonly branch: "feature/design-new-api";
                                                        };
                                                    };
                                                    readonly actor: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly id: {
                                                                readonly type: "string";
                                                                readonly format: "uuid";
                                                                readonly description: "The unique ID of the user.";
                                                            };
                                                            readonly login: {
                                                                readonly type: "string";
                                                                readonly description: "The login information for the user on the VCS.";
                                                                readonly title: "Login";
                                                            };
                                                            readonly name: {
                                                                readonly type: "string";
                                                                readonly description: "The name of the user.";
                                                            };
                                                        };
                                                        readonly required: readonly ["id", "login", "name"];
                                                        readonly title: "User";
                                                        readonly description: "The attribution actor who will run the scheduled pipeline.";
                                                    };
                                                    readonly description: {
                                                        readonly type: "string";
                                                        readonly "x-nullable": true;
                                                        readonly description: "Description of the schedule.";
                                                    };
                                                };
                                                readonly required: readonly ["id", "name", "timetable", "description", "project-slug", "actor", "created-at", "updated-at", "parameters"];
                                                readonly description: "A schedule response";
                                                readonly title: "Schedule";
                                            };
                                        };
                                        readonly next_page_token: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "A token to pass as a `page-token` query parameter to return the next page of results.";
                                        };
                                    };
                                    readonly required: readonly ["items", "next_page_token"];
                                    readonly description: "A sequence of schedules";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }, {
                    readonly in: "query";
                    readonly name: "page-token";
                    readonly description: "A token to retrieve the next page of results.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: false;
                    readonly allowEmptyValue: true;
                }];
            };
            readonly post: {
                readonly summary: "Create a schedule";
                readonly description: "Creates a schedule and returns the created schedule.";
                readonly tags: readonly ["Schedule"];
                readonly operationId: "createSchedule";
                readonly responses: {
                    readonly "201": {
                        readonly description: "A schedule object.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                            readonly description: "The unique ID of the schedule.";
                                        };
                                        readonly timetable: {
                                            readonly anyOf: readonly [{
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly "per-hour": {
                                                        readonly type: "integer";
                                                        readonly format: "integer";
                                                        readonly description: "Number of times a schedule triggers per hour, value must be between 1 and 60";
                                                    };
                                                    readonly "hours-of-day": {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "integer";
                                                            readonly format: "integer";
                                                            readonly description: "Hour in a day in UTC, value must be between 0 and 24";
                                                        };
                                                        readonly description: "Hours in a day in which the schedule triggers.";
                                                    };
                                                    readonly "days-of-week": {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly enum: readonly ["TUE", "SAT", "SUN", "MON", "THU", "WED", "FRI"];
                                                            readonly type: "string";
                                                            readonly description: "Day in a week, in three letters format";
                                                        };
                                                        readonly description: "Days in a week in which the schedule triggers.";
                                                    };
                                                    readonly "days-of-month": {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "integer";
                                                            readonly format: "integer";
                                                            readonly description: "Day in a month, between 1 and 31.";
                                                        };
                                                        readonly description: "Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.";
                                                    };
                                                    readonly months: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly enum: readonly ["MAR", "NOV", "DEC", "JUN", "MAY", "OCT", "FEB", "APR", "SEP", "AUG", "JAN", "JUL"];
                                                            readonly type: "string";
                                                            readonly description: "Month, in three letters format.";
                                                        };
                                                        readonly description: "Months in which the schedule triggers.";
                                                    };
                                                };
                                                readonly required: readonly ["per-hour", "hours-of-day", "days-of-week"];
                                            }, {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly "per-hour": {
                                                        readonly type: "integer";
                                                        readonly format: "integer";
                                                        readonly description: "Number of times a schedule triggers per hour, value must be between 1 and 60";
                                                    };
                                                    readonly "hours-of-day": {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "integer";
                                                            readonly format: "integer";
                                                            readonly description: "Hour in a day in UTC, value must be between 0 and 24";
                                                        };
                                                        readonly description: "Hours in a day in which the schedule triggers.";
                                                    };
                                                    readonly "days-of-month": {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "integer";
                                                            readonly format: "integer";
                                                            readonly description: "Day in a month, between 1 and 31.";
                                                        };
                                                        readonly description: "Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.";
                                                    };
                                                    readonly "days-of-week": {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly enum: readonly ["TUE", "SAT", "SUN", "MON", "THU", "WED", "FRI"];
                                                            readonly type: "string";
                                                            readonly description: "Day in a week, in three letters format";
                                                        };
                                                        readonly description: "Days in a week in which the schedule triggers.";
                                                    };
                                                    readonly months: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly enum: readonly ["MAR", "NOV", "DEC", "JUN", "MAY", "OCT", "FEB", "APR", "SEP", "AUG", "JAN", "JUL"];
                                                            readonly type: "string";
                                                            readonly description: "Month, in three letters format.";
                                                        };
                                                        readonly description: "Months in which the schedule triggers.";
                                                    };
                                                };
                                                readonly required: readonly ["per-hour", "hours-of-day", "days-of-month"];
                                            }];
                                            readonly description: "Timetable that specifies when a schedule triggers.";
                                        };
                                        readonly "updated-at": {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the pipeline was last updated.";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "Name of the schedule.";
                                        };
                                        readonly "created-at": {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the pipeline was created.";
                                        };
                                        readonly "project-slug": {
                                            readonly type: "string";
                                            readonly description: "The project-slug for the schedule";
                                            readonly example: "gh/CircleCI-Public/api-preview-docs";
                                        };
                                        readonly parameters: {
                                            readonly type: "object";
                                            readonly additionalProperties: {
                                                readonly anyOf: readonly [{
                                                    readonly type: "integer";
                                                }, {
                                                    readonly type: "string";
                                                }, {
                                                    readonly type: "boolean";
                                                }];
                                            };
                                            readonly description: "Pipeline parameters represented as key-value pairs. Must contain branch or tag.";
                                            readonly example: {
                                                readonly deploy_prod: true;
                                                readonly branch: "feature/design-new-api";
                                            };
                                        };
                                        readonly actor: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly format: "uuid";
                                                    readonly description: "The unique ID of the user.";
                                                };
                                                readonly login: {
                                                    readonly type: "string";
                                                    readonly description: "The login information for the user on the VCS.";
                                                    readonly title: "Login";
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "The name of the user.";
                                                };
                                            };
                                            readonly required: readonly ["id", "login", "name"];
                                            readonly title: "User";
                                            readonly description: "The attribution actor who will run the scheduled pipeline.";
                                        };
                                        readonly description: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "Description of the schedule.";
                                        };
                                    };
                                    readonly required: readonly ["id", "name", "timetable", "description", "project-slug", "actor", "created-at", "updated-at", "parameters"];
                                    readonly description: "A schedule response";
                                    readonly title: "Schedule";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }];
                readonly requestBody: {
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "Name of the schedule.";
                                    };
                                    readonly timetable: {
                                        readonly anyOf: readonly [{
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly "per-hour": {
                                                    readonly type: "integer";
                                                    readonly format: "integer";
                                                    readonly description: "Number of times a schedule triggers per hour, value must be between 1 and 60";
                                                };
                                                readonly "hours-of-day": {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "integer";
                                                        readonly format: "integer";
                                                        readonly description: "Hour in a day in UTC, value must be between 0 and 24";
                                                    };
                                                    readonly description: "Hours in a day in which the schedule triggers.";
                                                };
                                                readonly "days-of-week": {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly enum: readonly ["TUE", "SAT", "SUN", "MON", "THU", "WED", "FRI"];
                                                        readonly type: "string";
                                                        readonly description: "Day in a week, in three letters format";
                                                    };
                                                    readonly description: "Days in a week in which the schedule triggers.";
                                                };
                                                readonly "days-of-month": {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "integer";
                                                        readonly format: "integer";
                                                        readonly description: "Day in a month, between 1 and 31.";
                                                    };
                                                    readonly description: "Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.";
                                                };
                                                readonly months: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly enum: readonly ["MAR", "NOV", "DEC", "JUN", "MAY", "OCT", "FEB", "APR", "SEP", "AUG", "JAN", "JUL"];
                                                        readonly type: "string";
                                                        readonly description: "Month, in three letters format.";
                                                    };
                                                    readonly description: "Months in which the schedule triggers.";
                                                };
                                            };
                                            readonly required: readonly ["per-hour", "hours-of-day", "days-of-week"];
                                        }, {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly "per-hour": {
                                                    readonly type: "integer";
                                                    readonly format: "integer";
                                                    readonly description: "Number of times a schedule triggers per hour, value must be between 1 and 60";
                                                };
                                                readonly "hours-of-day": {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "integer";
                                                        readonly format: "integer";
                                                        readonly description: "Hour in a day in UTC, value must be between 0 and 24";
                                                    };
                                                    readonly description: "Hours in a day in which the schedule triggers.";
                                                };
                                                readonly "days-of-month": {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "integer";
                                                        readonly format: "integer";
                                                        readonly description: "Day in a month, between 1 and 31.";
                                                    };
                                                    readonly description: "Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.";
                                                };
                                                readonly "days-of-week": {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly enum: readonly ["TUE", "SAT", "SUN", "MON", "THU", "WED", "FRI"];
                                                        readonly type: "string";
                                                        readonly description: "Day in a week, in three letters format";
                                                    };
                                                    readonly description: "Days in a week in which the schedule triggers.";
                                                };
                                                readonly months: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly enum: readonly ["MAR", "NOV", "DEC", "JUN", "MAY", "OCT", "FEB", "APR", "SEP", "AUG", "JAN", "JUL"];
                                                        readonly type: "string";
                                                        readonly description: "Month, in three letters format.";
                                                    };
                                                    readonly description: "Months in which the schedule triggers.";
                                                };
                                            };
                                            readonly required: readonly ["per-hour", "hours-of-day", "days-of-month"];
                                        }];
                                        readonly description: "Timetable that specifies when a schedule triggers.";
                                    };
                                    readonly "attribution-actor": {
                                        readonly enum: readonly ["current", "system"];
                                        readonly type: "string";
                                        readonly description: "The attribution-actor of the scheduled pipeline.";
                                        readonly example: "current";
                                    };
                                    readonly parameters: {
                                        readonly type: "object";
                                        readonly additionalProperties: {
                                            readonly anyOf: readonly [{
                                                readonly type: "integer";
                                            }, {
                                                readonly type: "string";
                                            }, {
                                                readonly type: "boolean";
                                            }];
                                        };
                                        readonly description: "Pipeline parameters represented as key-value pairs. Must contain branch or tag.";
                                        readonly example: {
                                            readonly deploy_prod: true;
                                            readonly branch: "feature/design-new-api";
                                        };
                                    };
                                    readonly description: {
                                        readonly type: "string";
                                        readonly "x-nullable": true;
                                        readonly description: "Description of the schedule.";
                                    };
                                };
                                readonly required: readonly ["name", "timetable", "attribution-actor", "parameters"];
                                readonly description: "The parameters for a create schedule request";
                                readonly title: "CreateScheduleParameters";
                            };
                        };
                    };
                };
            };
        };
        readonly "/project/{project-slug}/{job-number}/artifacts": {
            readonly get: {
                readonly summary: "Get a job's artifacts";
                readonly description: "Returns a job's artifacts.";
                readonly tags: readonly ["Job"];
                readonly operationId: "getJobArtifacts";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A paginated list of the job's artifacts.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly items: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly path: {
                                                        readonly type: "string";
                                                        readonly description: "The artifact path.";
                                                    };
                                                    readonly node_index: {
                                                        readonly type: "integer";
                                                        readonly format: "int64";
                                                        readonly minimum: 0;
                                                        readonly description: "The index of the node that stored the artifact.";
                                                    };
                                                    readonly url: {
                                                        readonly type: "string";
                                                        readonly description: "The URL to download the artifact contents.";
                                                    };
                                                };
                                                readonly required: readonly ["path", "node_index", "url"];
                                                readonly description: "An artifact";
                                                readonly title: "Artifact";
                                            };
                                        };
                                        readonly next_page_token: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "A token to pass as a `page-token` query parameter to return the next page of results.";
                                        };
                                    };
                                    readonly required: readonly ["items", "next_page_token"];
                                    readonly title: "ArtifactListResponse";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "job-number";
                    readonly description: "The number of the job.";
                    readonly schema: {};
                    readonly required: true;
                    readonly example: "123";
                }, {
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }];
            };
        };
        readonly "/project/{project-slug}/{job-number}/tests": {
            readonly get: {
                readonly summary: "Get test metadata";
                readonly description: "Get test metadata for a build. In the rare case where there is more than 250MB of test data on the job, no results will be returned.";
                readonly tags: readonly ["Job"];
                readonly operationId: "getTests";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A paginated list of test results.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly items: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly message: {
                                                        readonly type: "string";
                                                        readonly "x-nullable": true;
                                                        readonly description: "The failure message associated with the test.";
                                                        readonly example: "";
                                                    };
                                                    readonly source: {
                                                        readonly type: "string";
                                                        readonly description: "The program that generated the test results";
                                                        readonly example: "";
                                                    };
                                                    readonly run_time: {
                                                        readonly type: "number";
                                                        readonly format: "double";
                                                        readonly description: "The time it took to run the test in seconds";
                                                        readonly example: "";
                                                    };
                                                    readonly file: {
                                                        readonly type: "string";
                                                        readonly description: "The file in which the test is defined.";
                                                        readonly example: "";
                                                    };
                                                    readonly result: {
                                                        readonly type: "string";
                                                        readonly description: "Indication of whether the test succeeded.";
                                                        readonly example: "";
                                                    };
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the test.";
                                                        readonly example: "";
                                                    };
                                                    readonly classname: {
                                                        readonly type: "string";
                                                        readonly description: "The programmatic location of the test.";
                                                        readonly example: "";
                                                    };
                                                };
                                                readonly required: readonly ["message", "source", "run_time", "file", "result", "name", "classname"];
                                            };
                                            readonly title: "TestsResponse";
                                        };
                                        readonly next_page_token: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "A token to pass as a `page-token` query parameter to return the next page of results.";
                                        };
                                    };
                                    readonly required: readonly ["items", "next_page_token"];
                                    readonly title: "TestsResponse";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "job-number";
                    readonly description: "The number of the job.";
                    readonly schema: {};
                    readonly required: true;
                    readonly example: "123";
                }, {
                    readonly in: "path";
                    readonly name: "project-slug";
                    readonly description: "Project slug in the form `vcs-slug/org-name/repo-name`. The `/` characters may be URL-escaped.";
                    readonly schema: {
                        readonly type: "string";
                    };
                    readonly required: true;
                    readonly example: "gh/CircleCI-Public/api-preview-docs";
                    readonly allowReserved: true;
                }];
            };
        };
        readonly "/schedule/{schedule-id}": {
            readonly delete: {
                readonly summary: "Delete a schedule";
                readonly description: "Deletes the schedule by id.";
                readonly tags: readonly ["Schedule"];
                readonly operationId: "deleteScheduleById";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A confirmation message.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                            readonly description: "A human-readable message";
                                        };
                                    };
                                    readonly required: readonly ["message"];
                                    readonly description: "message response";
                                    readonly title: "MessageResponse";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "schedule-id";
                    readonly description: "The unique ID of the schedule.";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                }];
            };
            readonly get: {
                readonly summary: "Get a schedule";
                readonly description: "Get a schedule by id.";
                readonly tags: readonly ["Schedule"];
                readonly operationId: "getScheduleById";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A schedule object.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                            readonly description: "The unique ID of the schedule.";
                                        };
                                        readonly timetable: {
                                            readonly anyOf: readonly [{
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly "per-hour": {
                                                        readonly type: "integer";
                                                        readonly format: "integer";
                                                        readonly description: "Number of times a schedule triggers per hour, value must be between 1 and 60";
                                                    };
                                                    readonly "hours-of-day": {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "integer";
                                                            readonly format: "integer";
                                                            readonly description: "Hour in a day in UTC, value must be between 0 and 24";
                                                        };
                                                        readonly description: "Hours in a day in which the schedule triggers.";
                                                    };
                                                    readonly "days-of-week": {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly enum: readonly ["TUE", "SAT", "SUN", "MON", "THU", "WED", "FRI"];
                                                            readonly type: "string";
                                                            readonly description: "Day in a week, in three letters format";
                                                        };
                                                        readonly description: "Days in a week in which the schedule triggers.";
                                                    };
                                                    readonly "days-of-month": {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "integer";
                                                            readonly format: "integer";
                                                            readonly description: "Day in a month, between 1 and 31.";
                                                        };
                                                        readonly description: "Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.";
                                                    };
                                                    readonly months: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly enum: readonly ["MAR", "NOV", "DEC", "JUN", "MAY", "OCT", "FEB", "APR", "SEP", "AUG", "JAN", "JUL"];
                                                            readonly type: "string";
                                                            readonly description: "Month, in three letters format.";
                                                        };
                                                        readonly description: "Months in which the schedule triggers.";
                                                    };
                                                };
                                                readonly required: readonly ["per-hour", "hours-of-day", "days-of-week"];
                                            }, {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly "per-hour": {
                                                        readonly type: "integer";
                                                        readonly format: "integer";
                                                        readonly description: "Number of times a schedule triggers per hour, value must be between 1 and 60";
                                                    };
                                                    readonly "hours-of-day": {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "integer";
                                                            readonly format: "integer";
                                                            readonly description: "Hour in a day in UTC, value must be between 0 and 24";
                                                        };
                                                        readonly description: "Hours in a day in which the schedule triggers.";
                                                    };
                                                    readonly "days-of-month": {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "integer";
                                                            readonly format: "integer";
                                                            readonly description: "Day in a month, between 1 and 31.";
                                                        };
                                                        readonly description: "Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.";
                                                    };
                                                    readonly "days-of-week": {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly enum: readonly ["TUE", "SAT", "SUN", "MON", "THU", "WED", "FRI"];
                                                            readonly type: "string";
                                                            readonly description: "Day in a week, in three letters format";
                                                        };
                                                        readonly description: "Days in a week in which the schedule triggers.";
                                                    };
                                                    readonly months: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly enum: readonly ["MAR", "NOV", "DEC", "JUN", "MAY", "OCT", "FEB", "APR", "SEP", "AUG", "JAN", "JUL"];
                                                            readonly type: "string";
                                                            readonly description: "Month, in three letters format.";
                                                        };
                                                        readonly description: "Months in which the schedule triggers.";
                                                    };
                                                };
                                                readonly required: readonly ["per-hour", "hours-of-day", "days-of-month"];
                                            }];
                                            readonly description: "Timetable that specifies when a schedule triggers.";
                                        };
                                        readonly "updated-at": {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the pipeline was last updated.";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "Name of the schedule.";
                                        };
                                        readonly "created-at": {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the pipeline was created.";
                                        };
                                        readonly "project-slug": {
                                            readonly type: "string";
                                            readonly description: "The project-slug for the schedule";
                                            readonly example: "gh/CircleCI-Public/api-preview-docs";
                                        };
                                        readonly parameters: {
                                            readonly type: "object";
                                            readonly additionalProperties: {
                                                readonly anyOf: readonly [{
                                                    readonly type: "integer";
                                                }, {
                                                    readonly type: "string";
                                                }, {
                                                    readonly type: "boolean";
                                                }];
                                            };
                                            readonly description: "Pipeline parameters represented as key-value pairs. Must contain branch or tag.";
                                            readonly example: {
                                                readonly deploy_prod: true;
                                                readonly branch: "feature/design-new-api";
                                            };
                                        };
                                        readonly actor: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly format: "uuid";
                                                    readonly description: "The unique ID of the user.";
                                                };
                                                readonly login: {
                                                    readonly type: "string";
                                                    readonly description: "The login information for the user on the VCS.";
                                                    readonly title: "Login";
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "The name of the user.";
                                                };
                                            };
                                            readonly required: readonly ["id", "login", "name"];
                                            readonly title: "User";
                                            readonly description: "The attribution actor who will run the scheduled pipeline.";
                                        };
                                        readonly description: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "Description of the schedule.";
                                        };
                                    };
                                    readonly required: readonly ["id", "name", "timetable", "description", "project-slug", "actor", "created-at", "updated-at", "parameters"];
                                    readonly description: "A schedule response";
                                    readonly title: "Schedule";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "schedule-id";
                    readonly description: "The unique ID of the schedule.";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                }];
            };
            readonly patch: {
                readonly summary: "Update a schedule";
                readonly description: "Updates a schedule and returns the updated schedule.";
                readonly tags: readonly ["Schedule"];
                readonly operationId: "updateSchedule";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A schedule object.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                            readonly description: "The unique ID of the schedule.";
                                        };
                                        readonly timetable: {
                                            readonly anyOf: readonly [{
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly "per-hour": {
                                                        readonly type: "integer";
                                                        readonly format: "integer";
                                                        readonly description: "Number of times a schedule triggers per hour, value must be between 1 and 60";
                                                    };
                                                    readonly "hours-of-day": {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "integer";
                                                            readonly format: "integer";
                                                            readonly description: "Hour in a day in UTC, value must be between 0 and 24";
                                                        };
                                                        readonly description: "Hours in a day in which the schedule triggers.";
                                                    };
                                                    readonly "days-of-week": {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly enum: readonly ["TUE", "SAT", "SUN", "MON", "THU", "WED", "FRI"];
                                                            readonly type: "string";
                                                            readonly description: "Day in a week, in three letters format";
                                                        };
                                                        readonly description: "Days in a week in which the schedule triggers.";
                                                    };
                                                    readonly "days-of-month": {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "integer";
                                                            readonly format: "integer";
                                                            readonly description: "Day in a month, between 1 and 31.";
                                                        };
                                                        readonly description: "Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.";
                                                    };
                                                    readonly months: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly enum: readonly ["MAR", "NOV", "DEC", "JUN", "MAY", "OCT", "FEB", "APR", "SEP", "AUG", "JAN", "JUL"];
                                                            readonly type: "string";
                                                            readonly description: "Month, in three letters format.";
                                                        };
                                                        readonly description: "Months in which the schedule triggers.";
                                                    };
                                                };
                                                readonly required: readonly ["per-hour", "hours-of-day", "days-of-week"];
                                            }, {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly "per-hour": {
                                                        readonly type: "integer";
                                                        readonly format: "integer";
                                                        readonly description: "Number of times a schedule triggers per hour, value must be between 1 and 60";
                                                    };
                                                    readonly "hours-of-day": {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "integer";
                                                            readonly format: "integer";
                                                            readonly description: "Hour in a day in UTC, value must be between 0 and 24";
                                                        };
                                                        readonly description: "Hours in a day in which the schedule triggers.";
                                                    };
                                                    readonly "days-of-month": {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "integer";
                                                            readonly format: "integer";
                                                            readonly description: "Day in a month, between 1 and 31.";
                                                        };
                                                        readonly description: "Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.";
                                                    };
                                                    readonly "days-of-week": {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly enum: readonly ["TUE", "SAT", "SUN", "MON", "THU", "WED", "FRI"];
                                                            readonly type: "string";
                                                            readonly description: "Day in a week, in three letters format";
                                                        };
                                                        readonly description: "Days in a week in which the schedule triggers.";
                                                    };
                                                    readonly months: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly enum: readonly ["MAR", "NOV", "DEC", "JUN", "MAY", "OCT", "FEB", "APR", "SEP", "AUG", "JAN", "JUL"];
                                                            readonly type: "string";
                                                            readonly description: "Month, in three letters format.";
                                                        };
                                                        readonly description: "Months in which the schedule triggers.";
                                                    };
                                                };
                                                readonly required: readonly ["per-hour", "hours-of-day", "days-of-month"];
                                            }];
                                            readonly description: "Timetable that specifies when a schedule triggers.";
                                        };
                                        readonly "updated-at": {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the pipeline was last updated.";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "Name of the schedule.";
                                        };
                                        readonly "created-at": {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the pipeline was created.";
                                        };
                                        readonly "project-slug": {
                                            readonly type: "string";
                                            readonly description: "The project-slug for the schedule";
                                            readonly example: "gh/CircleCI-Public/api-preview-docs";
                                        };
                                        readonly parameters: {
                                            readonly type: "object";
                                            readonly additionalProperties: {
                                                readonly anyOf: readonly [{
                                                    readonly type: "integer";
                                                }, {
                                                    readonly type: "string";
                                                }, {
                                                    readonly type: "boolean";
                                                }];
                                            };
                                            readonly description: "Pipeline parameters represented as key-value pairs. Must contain branch or tag.";
                                            readonly example: {
                                                readonly deploy_prod: true;
                                                readonly branch: "feature/design-new-api";
                                            };
                                        };
                                        readonly actor: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly format: "uuid";
                                                    readonly description: "The unique ID of the user.";
                                                };
                                                readonly login: {
                                                    readonly type: "string";
                                                    readonly description: "The login information for the user on the VCS.";
                                                    readonly title: "Login";
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "The name of the user.";
                                                };
                                            };
                                            readonly required: readonly ["id", "login", "name"];
                                            readonly title: "User";
                                            readonly description: "The attribution actor who will run the scheduled pipeline.";
                                        };
                                        readonly description: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "Description of the schedule.";
                                        };
                                    };
                                    readonly required: readonly ["id", "name", "timetable", "description", "project-slug", "actor", "created-at", "updated-at", "parameters"];
                                    readonly description: "A schedule response";
                                    readonly title: "Schedule";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "schedule-id";
                    readonly description: "The unique ID of the schedule.";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                }];
                readonly requestBody: {
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly description: {
                                        readonly type: "string";
                                        readonly "x-nullable": true;
                                        readonly description: "Description of the schedule.";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "Name of the schedule.";
                                    };
                                    readonly timetable: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly "per-hour": {
                                                readonly type: "integer";
                                                readonly format: "integer";
                                                readonly description: "Number of times a schedule triggers per hour, value must be between 1 and 60";
                                            };
                                            readonly "hours-of-day": {
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                    readonly format: "integer";
                                                    readonly description: "Hour in a day in UTC, value must be between 0 and 24";
                                                };
                                                readonly description: "Hours in a day in which the schedule triggers.";
                                            };
                                            readonly "days-of-week": {
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly enum: readonly ["TUE", "SAT", "SUN", "MON", "THU", "WED", "FRI"];
                                                    readonly type: "string";
                                                    readonly description: "Day in a week, in three letters format";
                                                };
                                                readonly description: "Days in a week in which the schedule triggers.";
                                            };
                                            readonly "days-of-month": {
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                    readonly format: "integer";
                                                    readonly description: "Day in a month, between 1 and 31.";
                                                };
                                                readonly description: "Days in a month in which the schedule triggers. This is mutually exclusive with days in a week.";
                                            };
                                            readonly months: {
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly enum: readonly ["MAR", "NOV", "DEC", "JUN", "MAY", "OCT", "FEB", "APR", "SEP", "AUG", "JAN", "JUL"];
                                                    readonly type: "string";
                                                    readonly description: "Month, in three letters format.";
                                                };
                                                readonly description: "Months in which the schedule triggers.";
                                            };
                                        };
                                        readonly description: "Timetable that specifies when a schedule triggers.";
                                    };
                                    readonly "attribution-actor": {
                                        readonly enum: readonly ["current", "system"];
                                        readonly type: "string";
                                        readonly description: "The attribution-actor of the scheduled pipeline.";
                                        readonly example: "current";
                                    };
                                    readonly parameters: {
                                        readonly type: "object";
                                        readonly additionalProperties: {
                                            readonly anyOf: readonly [{
                                                readonly type: "integer";
                                            }, {
                                                readonly type: "string";
                                            }, {
                                                readonly type: "boolean";
                                            }];
                                        };
                                        readonly description: "Pipeline parameters represented as key-value pairs. Must contain branch or tag.";
                                        readonly example: {
                                            readonly deploy_prod: true;
                                            readonly branch: "feature/design-new-api";
                                        };
                                    };
                                };
                                readonly description: "The parameters for an update schedule request";
                                readonly title: "UpdateScheduleParameters";
                            };
                        };
                    };
                };
            };
        };
        readonly "/user/{id}": {
            readonly get: {
                readonly summary: "User Information";
                readonly description: "Provides information about the user with the given ID.";
                readonly tags: readonly ["User"];
                readonly operationId: "getUser";
                readonly responses: {
                    readonly "200": {
                        readonly description: "User login information.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                            readonly description: "The unique ID of the user.";
                                        };
                                        readonly login: {
                                            readonly type: "string";
                                            readonly description: "The login information for the user on the VCS.";
                                            readonly title: "Login";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The name of the user.";
                                        };
                                    };
                                    readonly required: readonly ["id", "login", "name"];
                                    readonly title: "User";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "id";
                    readonly description: "The unique ID of the user.";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                }];
            };
        };
        readonly "/webhook": {
            readonly post: {
                readonly summary: "Create a webhook";
                readonly tags: readonly ["Webhook"];
                readonly operationId: "createWebhook";
                readonly responses: {
                    readonly "201": {
                        readonly description: "A webhook";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly url: {
                                            readonly type: "string";
                                            readonly description: "URL to deliver the webhook to. Note: protocol must be included as well (only https is supported)";
                                        };
                                        readonly "verify-tls": {
                                            readonly type: "boolean";
                                            readonly description: "Whether to enforce TLS certificate verification when delivering the webhook";
                                        };
                                        readonly id: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                            readonly description: "The unique ID of the webhook";
                                        };
                                        readonly "signing-secret": {
                                            readonly type: "string";
                                            readonly description: "Masked value of the secret used to build an HMAC hash of the payload and passed as a header in the webhook request";
                                        };
                                        readonly "updated-at": {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the webhook was last updated.";
                                            readonly example: "2015-09-21T17:29:21.042Z";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "Name of the webhook";
                                        };
                                        readonly "created-at": {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the webhook was created.";
                                            readonly example: "2015-09-21T17:29:21.042Z";
                                        };
                                        readonly scope: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly format: "uuid";
                                                    readonly description: "ID of the scope being used (at the moment, only project ID is supported)";
                                                };
                                                readonly type: {
                                                    readonly type: "string";
                                                    readonly description: "Type of the scope being used";
                                                };
                                            };
                                            readonly required: readonly ["id", "type"];
                                            readonly description: "The scope in which the relevant events that will trigger webhooks";
                                        };
                                        readonly events: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly enum: readonly ["workflow-completed", "job-completed"];
                                                readonly type: "string";
                                            };
                                            readonly description: "Events that will trigger the webhook";
                                        };
                                    };
                                    readonly required: readonly ["id", "scope", "name", "events", "url", "verify-tls", "signing-secret", "created-at", "updated-at"];
                                    readonly title: "Webhook";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly requestBody: {
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "Name of the webhook";
                                    };
                                    readonly events: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly enum: readonly ["workflow-completed", "job-completed"];
                                            readonly type: "string";
                                        };
                                        readonly description: "Events that will trigger the webhook";
                                    };
                                    readonly url: {
                                        readonly type: "string";
                                        readonly description: "URL to deliver the webhook to. Note: protocol must be included as well (only https is supported)";
                                    };
                                    readonly "verify-tls": {
                                        readonly type: "boolean";
                                        readonly description: "Whether to enforce TLS certificate verification when delivering the webhook";
                                    };
                                    readonly "signing-secret": {
                                        readonly type: "string";
                                        readonly description: "Secret used to build an HMAC hash of the payload and passed as a header in the webhook request";
                                    };
                                    readonly scope: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly id: {
                                                readonly type: "string";
                                                readonly format: "uuid";
                                                readonly description: "ID of the scope being used (at the moment, only project ID is supported)";
                                            };
                                            readonly type: {
                                                readonly enum: readonly ["project"];
                                                readonly type: "string";
                                                readonly description: "Type of the scope being used";
                                            };
                                        };
                                        readonly required: readonly ["id", "type"];
                                        readonly description: "The scope in which the relevant events that will trigger webhooks";
                                    };
                                };
                                readonly required: readonly ["name", "events", "url", "verify-tls", "signing-secret", "scope"];
                                readonly description: "The parameters for a create webhook request";
                            };
                        };
                    };
                };
            };
            readonly get: {
                readonly summary: "List webhooks";
                readonly description: "Get a list of webhook that match the given scope-type and scope-id";
                readonly tags: readonly ["Webhook"];
                readonly operationId: "getWebhooks";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A list of webhooks";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly items: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly url: {
                                                        readonly type: "string";
                                                        readonly description: "URL to deliver the webhook to. Note: protocol must be included as well (only https is supported)";
                                                    };
                                                    readonly "verify-tls": {
                                                        readonly type: "boolean";
                                                        readonly description: "Whether to enforce TLS certificate verification when delivering the webhook";
                                                    };
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly format: "uuid";
                                                        readonly description: "The unique ID of the webhook";
                                                    };
                                                    readonly "signing-secret": {
                                                        readonly type: "string";
                                                        readonly description: "Masked value of the secret used to build an HMAC hash of the payload and passed as a header in the webhook request";
                                                    };
                                                    readonly "updated-at": {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The date and time the webhook was last updated.";
                                                        readonly example: "2015-09-21T17:29:21.042Z";
                                                    };
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly description: "Name of the webhook";
                                                    };
                                                    readonly "created-at": {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The date and time the webhook was created.";
                                                        readonly example: "2015-09-21T17:29:21.042Z";
                                                    };
                                                    readonly scope: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly id: {
                                                                readonly type: "string";
                                                                readonly format: "uuid";
                                                                readonly description: "ID of the scope being used (at the moment, only project ID is supported)";
                                                            };
                                                            readonly type: {
                                                                readonly type: "string";
                                                                readonly description: "Type of the scope being used";
                                                            };
                                                        };
                                                        readonly required: readonly ["id", "type"];
                                                        readonly description: "The scope in which the relevant events that will trigger webhooks";
                                                    };
                                                    readonly events: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly enum: readonly ["workflow-completed", "job-completed"];
                                                            readonly type: "string";
                                                        };
                                                        readonly description: "Events that will trigger the webhook";
                                                    };
                                                };
                                                readonly required: readonly ["id", "scope", "name", "events", "url", "verify-tls", "signing-secret", "created-at", "updated-at"];
                                                readonly title: "Webhook";
                                            };
                                        };
                                        readonly next_page_token: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "A token to pass as a `page-token` query parameter to return the next page of results.";
                                        };
                                    };
                                    readonly required: readonly ["items", "next_page_token"];
                                    readonly description: "A list of webhooks";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "query";
                    readonly name: "scope-id";
                    readonly description: "ID of the scope being used (at the moment, only project ID is supported)";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                }, {
                    readonly in: "query";
                    readonly name: "scope-type";
                    readonly description: "Type of the scope being used";
                    readonly schema: {
                        readonly type: "string";
                        readonly enum: readonly ["project"];
                    };
                    readonly required: true;
                }];
            };
        };
        readonly "/webhook/{webhook-id}": {
            readonly delete: {
                readonly summary: "Delete a webhook";
                readonly tags: readonly ["Webhook"];
                readonly operationId: "deleteWebhook";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A confirmation message";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                            readonly description: "A human-readable message";
                                        };
                                    };
                                    readonly required: readonly ["message"];
                                    readonly description: "message response";
                                    readonly title: "MessageResponse";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "webhook-id";
                    readonly description: "ID of the webhook (UUID)";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                }];
            };
            readonly get: {
                readonly summary: "Get a webhook";
                readonly description: "Get a webhook by id.";
                readonly tags: readonly ["Webhook"];
                readonly operationId: "getWebhookById";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A webhook";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly url: {
                                            readonly type: "string";
                                            readonly description: "URL to deliver the webhook to. Note: protocol must be included as well (only https is supported)";
                                        };
                                        readonly "verify-tls": {
                                            readonly type: "boolean";
                                            readonly description: "Whether to enforce TLS certificate verification when delivering the webhook";
                                        };
                                        readonly id: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                            readonly description: "The unique ID of the webhook";
                                        };
                                        readonly "signing-secret": {
                                            readonly type: "string";
                                            readonly description: "Masked value of the secret used to build an HMAC hash of the payload and passed as a header in the webhook request";
                                        };
                                        readonly "updated-at": {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the webhook was last updated.";
                                            readonly example: "2015-09-21T17:29:21.042Z";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "Name of the webhook";
                                        };
                                        readonly "created-at": {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the webhook was created.";
                                            readonly example: "2015-09-21T17:29:21.042Z";
                                        };
                                        readonly scope: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly format: "uuid";
                                                    readonly description: "ID of the scope being used (at the moment, only project ID is supported)";
                                                };
                                                readonly type: {
                                                    readonly type: "string";
                                                    readonly description: "Type of the scope being used";
                                                };
                                            };
                                            readonly required: readonly ["id", "type"];
                                            readonly description: "The scope in which the relevant events that will trigger webhooks";
                                        };
                                        readonly events: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly enum: readonly ["workflow-completed", "job-completed"];
                                                readonly type: "string";
                                            };
                                            readonly description: "Events that will trigger the webhook";
                                        };
                                    };
                                    readonly required: readonly ["id", "scope", "name", "events", "url", "verify-tls", "signing-secret", "created-at", "updated-at"];
                                    readonly title: "Webhook";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "webhook-id";
                    readonly description: "ID of the webhook (UUID)";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                }];
            };
            readonly put: {
                readonly summary: "Update a webhook";
                readonly tags: readonly ["Webhook"];
                readonly operationId: "updateWebhook";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A webhook";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly url: {
                                            readonly type: "string";
                                            readonly description: "URL to deliver the webhook to. Note: protocol must be included as well (only https is supported)";
                                        };
                                        readonly "verify-tls": {
                                            readonly type: "boolean";
                                            readonly description: "Whether to enforce TLS certificate verification when delivering the webhook";
                                        };
                                        readonly id: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                            readonly description: "The unique ID of the webhook";
                                        };
                                        readonly "signing-secret": {
                                            readonly type: "string";
                                            readonly description: "Masked value of the secret used to build an HMAC hash of the payload and passed as a header in the webhook request";
                                        };
                                        readonly "updated-at": {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the webhook was last updated.";
                                            readonly example: "2015-09-21T17:29:21.042Z";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "Name of the webhook";
                                        };
                                        readonly "created-at": {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the webhook was created.";
                                            readonly example: "2015-09-21T17:29:21.042Z";
                                        };
                                        readonly scope: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly format: "uuid";
                                                    readonly description: "ID of the scope being used (at the moment, only project ID is supported)";
                                                };
                                                readonly type: {
                                                    readonly type: "string";
                                                    readonly description: "Type of the scope being used";
                                                };
                                            };
                                            readonly required: readonly ["id", "type"];
                                            readonly description: "The scope in which the relevant events that will trigger webhooks";
                                        };
                                        readonly events: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly enum: readonly ["workflow-completed", "job-completed"];
                                                readonly type: "string";
                                            };
                                            readonly description: "Events that will trigger the webhook";
                                        };
                                    };
                                    readonly required: readonly ["id", "scope", "name", "events", "url", "verify-tls", "signing-secret", "created-at", "updated-at"];
                                    readonly title: "Webhook";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "webhook-id";
                    readonly description: "ID of the webhook (UUID)";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                }];
                readonly requestBody: {
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "Name of the webhook";
                                    };
                                    readonly events: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly enum: readonly ["workflow-completed", "job-completed"];
                                            readonly type: "string";
                                        };
                                        readonly description: "Events that will trigger the webhook";
                                    };
                                    readonly url: {
                                        readonly type: "string";
                                        readonly description: "URL to deliver the webhook to. Note: protocol must be included as well (only https is supported)";
                                    };
                                    readonly "signing-secret": {
                                        readonly type: "string";
                                        readonly description: "Secret used to build an HMAC hash of the payload and passed as a header in the webhook request";
                                    };
                                    readonly "verify-tls": {
                                        readonly type: "boolean";
                                        readonly description: "Whether to enforce TLS certificate verification when delivering the webhook";
                                    };
                                };
                                readonly description: "The parameters for an update webhook request";
                            };
                        };
                    };
                };
            };
        };
        readonly "/workflow/{id}": {
            readonly get: {
                readonly summary: "Get a workflow";
                readonly description: "Returns summary fields of a workflow by ID.";
                readonly tags: readonly ["Workflow"];
                readonly operationId: "getWorkflowById";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A workflow object.";
                        readonly links: {
                            readonly ProjectFromGetWorkflow: {
                                readonly operationId: "getProjectBySlug";
                                readonly parameters: {
                                    readonly project_slug: "$response.body#/project_slug";
                                };
                            };
                            readonly WorkflowJobs: {
                                readonly operationId: "listWorkflowJobs";
                                readonly parameters: {
                                    readonly id: "$response.body#/id";
                                };
                            };
                            readonly CancelWorkflow: {
                                readonly operationId: "cancelWorkflow";
                                readonly parameters: {
                                    readonly id: "$response.body#/id";
                                };
                            };
                        };
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly pipeline_id: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                            readonly description: "The ID of the pipeline this workflow belongs to.";
                                            readonly example: "5034460f-c7c4-4c43-9457-de07e2029e7b";
                                        };
                                        readonly canceled_by: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                        };
                                        readonly id: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                            readonly description: "The unique ID of the workflow.";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The name of the workflow.";
                                            readonly example: "build-and-test";
                                        };
                                        readonly project_slug: {
                                            readonly type: "string";
                                            readonly description: "The project-slug for the pipeline this workflow belongs to.";
                                            readonly example: "gh/CircleCI-Public/api-preview-docs";
                                        };
                                        readonly errored_by: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                        };
                                        readonly tag: {
                                            readonly enum: readonly ["setup"];
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "Tag used for the workflow";
                                            readonly example: "setup";
                                        };
                                        readonly status: {
                                            readonly enum: readonly ["success", "running", "not_run", "failed", "error", "failing", "on_hold", "canceled", "unauthorized"];
                                            readonly type: "string";
                                            readonly description: "The current status of the workflow.";
                                        };
                                        readonly started_by: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                        };
                                        readonly pipeline_number: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly description: "The number of the pipeline this workflow belongs to.";
                                            readonly example: "25";
                                        };
                                        readonly created_at: {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "The date and time the workflow was created.";
                                        };
                                        readonly stopped_at: {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly "x-nullable": true;
                                            readonly description: "The date and time the workflow stopped.";
                                        };
                                    };
                                    readonly required: readonly ["id", "name", "status", "created_at", "stopped_at", "pipeline_id", "pipeline_number", "project_slug", "started_by"];
                                    readonly description: "A workflow";
                                    readonly title: "Workflow";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "id";
                    readonly description: "The unique ID of the workflow.";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                    readonly example: "5034460f-c7c4-4c43-9457-de07e2029e7b";
                }];
            };
        };
        readonly "/workflow/{id}/approve/{approval_request_id}": {
            readonly post: {
                readonly summary: "Approve a job";
                readonly description: "Approves a pending approval job in a workflow.";
                readonly tags: readonly ["Workflow"];
                readonly operationId: "approvePendingApprovalJobById";
                readonly responses: {
                    readonly "202": {
                        readonly description: "A confirmation message.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                            readonly description: "A human-readable message";
                                        };
                                    };
                                    readonly required: readonly ["message"];
                                    readonly description: "message response";
                                    readonly title: "MessageResponse";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "approval_request_id";
                    readonly description: "The ID of the job being approved.";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                }, {
                    readonly in: "path";
                    readonly name: "id";
                    readonly description: "The unique ID of the workflow.";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                    readonly example: "5034460f-c7c4-4c43-9457-de07e2029e7b";
                }];
            };
        };
        readonly "/workflow/{id}/cancel": {
            readonly post: {
                readonly summary: "Cancel a workflow";
                readonly description: "Cancels a running workflow.";
                readonly tags: readonly ["Workflow"];
                readonly operationId: "cancelWorkflow";
                readonly responses: {
                    readonly "202": {
                        readonly description: "A confirmation message.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                            readonly description: "A human-readable message";
                                        };
                                    };
                                    readonly required: readonly ["message"];
                                    readonly description: "message response";
                                    readonly title: "MessageResponse";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "id";
                    readonly description: "The unique ID of the workflow.";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                    readonly example: "5034460f-c7c4-4c43-9457-de07e2029e7b";
                }];
            };
        };
        readonly "/workflow/{id}/job": {
            readonly get: {
                readonly summary: "Get a workflow's jobs";
                readonly description: "Returns a sequence of jobs for a workflow.";
                readonly tags: readonly ["Workflow"];
                readonly operationId: "listWorkflowJobs";
                readonly responses: {
                    readonly "200": {
                        readonly description: "A paginated sequence of jobs.";
                        readonly links: {
                            readonly NextWorkflowJobPage: {
                                readonly operationId: "listWorkflowJobs";
                                readonly parameters: {
                                    readonly id: "$request.path.id";
                                    readonly "page-token": "$response.body#/next_page_token";
                                };
                            };
                        };
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly items: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly canceled_by: {
                                                        readonly type: "string";
                                                        readonly format: "uuid";
                                                        readonly description: "The unique ID of the user.";
                                                    };
                                                    readonly dependencies: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "string";
                                                            readonly format: "uuid";
                                                            readonly description: "The unique ID of the job.";
                                                        };
                                                        readonly description: "A sequence of the unique job IDs for the jobs that this job depends upon in the workflow.";
                                                    };
                                                    readonly job_number: {
                                                        readonly type: "integer";
                                                        readonly format: "int64";
                                                        readonly description: "The number of the job.";
                                                    };
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly format: "uuid";
                                                        readonly description: "The unique ID of the job.";
                                                    };
                                                    readonly started_at: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly description: "The date and time the job started.";
                                                    };
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the job.";
                                                    };
                                                    readonly approved_by: {
                                                        readonly type: "string";
                                                        readonly format: "uuid";
                                                        readonly description: "The unique ID of the user.";
                                                    };
                                                    readonly project_slug: {
                                                        readonly type: "string";
                                                        readonly description: "The project-slug for the job.";
                                                        readonly example: "gh/CircleCI-Public/api-preview-docs";
                                                    };
                                                    readonly status: {
                                                        readonly enum: readonly ["success", "running", "not_run", "failed", "retried", "queued", "not_running", "infrastructure_fail", "timedout", "on_hold", "terminated-unknown", "blocked", "canceled", "unauthorized"];
                                                        readonly type: "string";
                                                        readonly description: "The current status of the job.";
                                                    };
                                                    readonly type: {
                                                        readonly enum: readonly ["build", "approval"];
                                                        readonly type: "string";
                                                        readonly description: "The type of job.";
                                                    };
                                                    readonly stopped_at: {
                                                        readonly type: "string";
                                                        readonly format: "date-time";
                                                        readonly "x-nullable": true;
                                                        readonly description: "The time when the job stopped.";
                                                    };
                                                    readonly approval_request_id: {
                                                        readonly type: "string";
                                                        readonly format: "uuid";
                                                        readonly description: "The unique ID of the job.";
                                                    };
                                                };
                                                readonly required: readonly ["id", "name", "started_at", "dependencies", "project_slug", "status", "type"];
                                                readonly description: "Job";
                                                readonly title: "Job";
                                            };
                                        };
                                        readonly next_page_token: {
                                            readonly type: "string";
                                            readonly "x-nullable": true;
                                            readonly description: "A token to pass as a `page-token` query parameter to return the next page of results.";
                                        };
                                    };
                                    readonly required: readonly ["items", "next_page_token"];
                                    readonly title: "WorkflowJobListResponse";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "id";
                    readonly description: "The unique ID of the workflow.";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                    readonly example: "5034460f-c7c4-4c43-9457-de07e2029e7b";
                }];
            };
        };
        readonly "/workflow/{id}/rerun": {
            readonly post: {
                readonly summary: "Rerun a workflow";
                readonly description: "Reruns a workflow.";
                readonly tags: readonly ["Workflow"];
                readonly operationId: "rerunWorkflow";
                readonly responses: {
                    readonly "202": {
                        readonly description: "A confirmation message.";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly workflow_id: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                            readonly description: "The ID of the newly-created workflow.";
                                            readonly example: "0e53027b-521a-4c40-9042-47e72b3c63a3";
                                        };
                                    };
                                    readonly required: readonly ["workflow_id"];
                                    readonly description: "A response to rerunning a workflow";
                                };
                            };
                        };
                    };
                    readonly default: {
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly message: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                        readonly description: "Error response.";
                    };
                };
                readonly parameters: readonly [{
                    readonly in: "path";
                    readonly name: "id";
                    readonly description: "The unique ID of the workflow.";
                    readonly schema: {
                        readonly type: "string";
                        readonly format: "uuid";
                    };
                    readonly required: true;
                    readonly example: "5034460f-c7c4-4c43-9457-de07e2029e7b";
                }];
                readonly requestBody: {
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly enable_ssh: {
                                        readonly type: "boolean";
                                        readonly description: "Whether to enable SSH access for the triggering user on the newly-rerun job. Requires the jobs parameter to be used and so is mutually exclusive with the from_failed parameter.";
                                        readonly example: false;
                                    };
                                    readonly from_failed: {
                                        readonly type: "boolean";
                                        readonly description: "Whether to rerun the workflow from the failed job. Mutually exclusive with the jobs parameter.";
                                        readonly example: false;
                                    };
                                    readonly jobs: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                            readonly format: "uuid";
                                        };
                                        readonly description: "A list of job IDs to rerun.";
                                        readonly example: readonly ["c65b68ef-e73b-4bf2-be9a-7a322a9df150", "5e957edd-5e8c-4985-9178-5d0d69561822"];
                                    };
                                    readonly sparse_tree: {
                                        readonly type: "boolean";
                                        readonly description: "Completes rerun using sparse trees logic, an optimization for workflows that have disconnected subgraphs. Requires jobs parameter and so is mutually exclusive with the from_failed parameter.";
                                        readonly example: false;
                                    };
                                };
                                readonly "x-nullable": true;
                                readonly description: "The information you can supply when rerunning a workflow.";
                                readonly title: "RerunWorkflowParameters";
                            };
                        };
                    };
                };
            };
        };
    };
    readonly components: {
        readonly securitySchemes: {
            readonly api_key_header: {
                readonly type: "apiKey";
                readonly name: "Circle-Token";
                readonly in: "header";
            };
            readonly basic_auth: {
                readonly description: "HTTP basic authentication. The username should be set as the circle-token value, and the password should be left blank. Note that project tokens are currently not supported on API v2.";
                readonly type: "http";
                readonly scheme: "basic";
            };
            readonly api_key_query: {
                readonly type: "apiKey";
                readonly name: "circle-token";
                readonly in: "query";
                readonly description: "DEPRECATED - we will remove this option in the future";
            };
        };
    };
    readonly tags: readonly [{
        readonly name: "Context";
    }, {
        readonly name: "Insights";
    }, {
        readonly name: "User";
        readonly "x-displayName": "User (Preview)";
    }, {
        readonly name: "Pipeline";
    }, {
        readonly name: "Job";
        readonly "x-displayName": "Job (Preview)";
    }, {
        readonly name: "Workflow";
    }, {
        readonly name: "Webhook";
    }];
};
export default _default;
