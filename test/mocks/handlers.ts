import { http, HttpResponse } from "msw";

const BASE_URL = "https://circleci.com/api/v2";

// Mock data
export const mockPipeline = {
  id: "test-pipeline-id",
  number: 123,
  state: "created",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  trigger: {
    type: "webhook",
    received_at: "2024-01-01T00:00:00Z",
    actor: {
      login: "test-user",
      avatar_url: "https://example.com/avatar.png",
    },
  },
  vcs: {
    provider_name: "github",
    origin_repository_url: "https://github.com/test/repo",
    target_repository_url: "https://github.com/test/repo",
    revision: "abc123",
    branch: "main",
  },
};

export const mockWorkflow = {
  id: "test-workflow-id",
  name: "build",
  status: "success",
  created_at: "2024-01-01T00:00:00Z",
  stopped_at: "2024-01-01T01:00:00Z",
  pipeline_id: "test-pipeline-id",
  pipeline_number: 123,
  project_slug: "gh/test/repo",
};

export const mockJob = {
  web_url: "https://circleci.com/jobs/123",
  project: {
    slug: "gh/test/repo",
    name: "repo",
    external_url: "https://github.com/test/repo",
  },
  job_number: 456,
  name: "test-job",
  status: "success",
  type: "build",
  started_at: "2024-01-01T00:00:00Z",
  stopped_at: "2024-01-01T00:30:00Z",
  duration: 1800,
  executor: { type: "docker", resource_class: "medium" },
  parallelism: 1,
  contexts: [],
  organization: { name: "test-org" },
  queued_at: "2024-01-01T00:00:00Z",
};

export const mockContext = {
  id: "test-context-id",
  name: "test-context",
  created_at: "2024-01-01T00:00:00Z",
};

export const mockProject = {
  slug: "gh/test/repo",
  name: "repo",
  organization_name: "test",
  organization_slug: "gh/test",
  organization_id: "org-id",
  vcs_info: {
    vcs_url: "https://github.com/test/repo",
    provider: "github",
    default_branch: "main",
  },
};

export const mockSchedule = {
  id: "test-schedule-id",
  name: "nightly-build",
  description: "Nightly build schedule",
  "project-slug": "gh/test/repo",
  "created-at": "2024-01-01T00:00:00Z",
  "updated-at": "2024-01-01T00:00:00Z",
  actor: { id: "user-id", login: "test-user", name: "Test User" },
  timetable: {
    "per-hour": 1,
    "hours-of-day": [0],
    "days-of-week": ["MON", "TUE", "WED", "THU", "FRI"],
  },
  parameters: {},
};

export const mockWebhook = {
  id: "test-webhook-id",
  name: "test-webhook",
  url: "https://example.com/webhook",
  scope: { id: "project-id", type: "project" },
  events: ["workflow-completed"],
  "verify-tls": true,
  "signing-secret": "secret",
  "created-at": "2024-01-01T00:00:00Z",
  "updated-at": "2024-01-01T00:00:00Z",
};

export const mockUser = {
  id: "test-user-id",
  login: "test-user",
  name: "Test User",
};

// Handlers
export const handlers = [
  // Pipeline handlers
  http.get(`${BASE_URL}/project/:projectSlug/pipeline`, () => {
    return HttpResponse.json({
      items: [mockPipeline],
      next_page_token: null,
    });
  }),

  http.get(`${BASE_URL}/pipeline/:pipelineId`, () => {
    return HttpResponse.json(mockPipeline);
  }),

  http.get(`${BASE_URL}/project/:projectSlug/pipeline/:pipelineNumber`, () => {
    return HttpResponse.json(mockPipeline);
  }),

  http.post(`${BASE_URL}/project/:projectSlug/pipeline`, () => {
    return HttpResponse.json(mockPipeline);
  }),

  http.post(
    `${BASE_URL}/project/:provider/:organization/:project/pipeline/run`,
    () => {
      return HttpResponse.json(mockPipeline);
    },
  ),

  http.get(`${BASE_URL}/pipeline/:pipelineId/config`, () => {
    return HttpResponse.json({
      source: "version: 2.1",
      compiled: "version: 2",
    });
  }),

  http.get(`${BASE_URL}/pipeline/:pipelineId/values`, () => {
    return HttpResponse.json({
      items: [{ name: "test-param", value: "test-value" }],
    });
  }),

  http.get(`${BASE_URL}/pipeline/:pipelineId/workflow`, () => {
    return HttpResponse.json({
      items: [mockWorkflow],
      next_page_token: null,
    });
  }),

  http.post(`${BASE_URL}/pipeline/continue`, () => {
    return HttpResponse.json({ message: "Pipeline continued" });
  }),

  http.get(`${BASE_URL}/project/:projectSlug/pipeline/mine`, () => {
    return HttpResponse.json({
      items: [mockPipeline],
      next_page_token: null,
    });
  }),

  // Workflow handlers
  http.get(`${BASE_URL}/workflow/:workflowId`, () => {
    return HttpResponse.json(mockWorkflow);
  }),

  http.get(`${BASE_URL}/workflow/:workflowId/job`, () => {
    return HttpResponse.json({
      items: [mockJob],
      next_page_token: null,
    });
  }),

  http.post(`${BASE_URL}/workflow/:workflowId/rerun`, () => {
    return HttpResponse.json({ workflow_id: "new-workflow-id" });
  }),

  http.post(`${BASE_URL}/workflow/:workflowId/cancel`, () => {
    return HttpResponse.json({ message: "Cancelled" });
  }),

  http.post(
    `${BASE_URL}/workflow/:workflowId/approve/:approvalRequestId`,
    () => {
      return HttpResponse.json({ message: "Approved" });
    },
  ),

  // Job handlers
  http.get(`${BASE_URL}/project/:projectSlug/job/:jobNumber`, () => {
    return HttpResponse.json(mockJob);
  }),

  http.post(`${BASE_URL}/project/:projectSlug/job/:jobNumber/cancel`, () => {
    return HttpResponse.json({ message: "Cancelled" });
  }),

  http.get(`${BASE_URL}/project/:projectSlug/:jobNumber/artifacts`, () => {
    return HttpResponse.json({
      items: [
        {
          path: "artifact.txt",
          url: "https://example.com/artifact.txt",
          node_index: 0,
        },
      ],
      next_page_token: null,
    });
  }),

  http.get(`${BASE_URL}/project/:projectSlug/:jobNumber/tests`, () => {
    return HttpResponse.json({
      items: [
        {
          name: "test1",
          classname: "TestClass",
          result: "success",
          message: "",
          run_time: 1.5,
          source: "jest",
        },
      ],
      next_page_token: null,
    });
  }),

  // Context handlers
  http.get(`${BASE_URL}/context`, () => {
    return HttpResponse.json({
      items: [mockContext],
      next_page_token: null,
    });
  }),

  http.post(`${BASE_URL}/context`, () => {
    return HttpResponse.json(mockContext);
  }),

  http.get(`${BASE_URL}/context/:contextId`, () => {
    return HttpResponse.json(mockContext);
  }),

  http.delete(`${BASE_URL}/context/:contextId`, () => {
    return HttpResponse.json({ message: "Deleted" });
  }),

  http.get(`${BASE_URL}/context/:contextId/environment-variable`, () => {
    return HttpResponse.json({
      items: [
        {
          variable: "TEST_VAR",
          context_id: "test-context-id",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
        },
      ],
      next_page_token: null,
    });
  }),

  http.put(
    `${BASE_URL}/context/:contextId/environment-variable/:envVarName`,
    () => {
      return HttpResponse.json({
        variable: "TEST_VAR",
        context_id: "test-context-id",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      });
    },
  ),

  http.delete(
    `${BASE_URL}/context/:contextId/environment-variable/:envVarName`,
    () => {
      return HttpResponse.json({ message: "Deleted" });
    },
  ),

  http.get(`${BASE_URL}/context/:contextId/restrictions`, () => {
    return HttpResponse.json({
      items: [
        {
          id: "restriction-id",
          name: "test-restriction",
          restriction_type: "project",
          restriction_value: "gh/test/repo",
        },
      ],
      next_page_token: null,
    });
  }),

  http.post(`${BASE_URL}/context/:contextId/restrictions`, () => {
    return HttpResponse.json({
      id: "restriction-id",
      name: "test-restriction",
      restriction_type: "project",
      restriction_value: "gh/test/repo",
    });
  }),

  http.delete(
    `${BASE_URL}/context/:contextId/restrictions/:restrictionId`,
    () => {
      return HttpResponse.json({ message: "Deleted" });
    },
  ),

  // Project handlers
  http.get(`${BASE_URL}/project/:projectSlug`, () => {
    return HttpResponse.json(mockProject);
  }),

  http.post(`${BASE_URL}/project/:provider/:organization/:project`, () => {
    return HttpResponse.json(mockProject);
  }),

  http.get(`${BASE_URL}/project/:projectSlug/settings`, () => {
    return HttpResponse.json({ advanced: {} });
  }),

  http.patch(`${BASE_URL}/project/:projectSlug/settings`, () => {
    return HttpResponse.json({ advanced: {} });
  }),

  http.get(`${BASE_URL}/project/:projectSlug/envvar`, () => {
    return HttpResponse.json({
      items: [{ name: "ENV_VAR", value: "xxxx" }],
      next_page_token: null,
    });
  }),

  http.post(`${BASE_URL}/project/:projectSlug/envvar`, () => {
    return HttpResponse.json({ name: "ENV_VAR", value: "xxxx" });
  }),

  http.get(`${BASE_URL}/project/:projectSlug/envvar/:name`, () => {
    return HttpResponse.json({ name: "ENV_VAR", value: "xxxx" });
  }),

  http.delete(`${BASE_URL}/project/:projectSlug/envvar/:name`, () => {
    return HttpResponse.json({ message: "Deleted" });
  }),

  http.get(`${BASE_URL}/project/:projectSlug/checkout-key`, () => {
    return HttpResponse.json({
      items: [
        {
          "public-key": "ssh-rsa AAA...",
          type: "deploy-key",
          fingerprint: "aa:bb:cc",
          preferred: true,
          "created-at": "2024-01-01T00:00:00Z",
        },
      ],
      next_page_token: null,
    });
  }),

  http.post(`${BASE_URL}/project/:projectSlug/checkout-key`, () => {
    return HttpResponse.json({
      "public-key": "ssh-rsa AAA...",
      type: "deploy-key",
      fingerprint: "aa:bb:cc",
      preferred: true,
      "created-at": "2024-01-01T00:00:00Z",
    });
  }),

  http.get(`${BASE_URL}/project/:projectSlug/checkout-key/:fingerprint`, () => {
    return HttpResponse.json({
      "public-key": "ssh-rsa AAA...",
      type: "deploy-key",
      fingerprint: "aa:bb:cc",
      preferred: true,
      "created-at": "2024-01-01T00:00:00Z",
    });
  }),

  http.delete(
    `${BASE_URL}/project/:projectSlug/checkout-key/:fingerprint`,
    () => {
      return HttpResponse.json({ message: "Deleted" });
    },
  ),

  // Schedule handlers
  http.get(`${BASE_URL}/project/:projectSlug/schedule`, () => {
    return HttpResponse.json({
      items: [mockSchedule],
      next_page_token: null,
    });
  }),

  http.post(`${BASE_URL}/project/:projectSlug/schedule`, () => {
    return HttpResponse.json(mockSchedule);
  }),

  http.get(`${BASE_URL}/schedule/:scheduleId`, () => {
    return HttpResponse.json(mockSchedule);
  }),

  http.patch(`${BASE_URL}/schedule/:scheduleId`, () => {
    return HttpResponse.json(mockSchedule);
  }),

  http.delete(`${BASE_URL}/schedule/:scheduleId`, () => {
    return HttpResponse.json({ message: "Deleted" });
  }),

  // Insights handlers
  http.get(`${BASE_URL}/insights/:projectSlug/workflows`, () => {
    return HttpResponse.json({
      items: [
        { name: "build", metrics: { success_rate: 0.95, total_runs: 100 } },
      ],
      next_page_token: null,
    });
  }),

  http.get(`${BASE_URL}/insights/:projectSlug/branches`, () => {
    return HttpResponse.json({
      branches: ["main", "develop", "feature/test"],
      org_id: "org-id",
      project_id: "project-id",
    });
  }),

  http.get(`${BASE_URL}/insights/:projectSlug/flaky-tests`, () => {
    return HttpResponse.json({
      "flaky-tests": [
        { "test-name": "test1", "times-flaked": 5, "workflow-name": "build" },
      ],
      "total-flaky-tests": 1,
    });
  }),

  http.get(`${BASE_URL}/insights/:projectSlug/workflows/:workflowName`, () => {
    return HttpResponse.json({
      items: [
        {
          id: "run-id",
          status: "success",
          duration: 300,
          created_at: "2024-01-01T00:00:00Z",
          stopped_at: "2024-01-01T00:05:00Z",
          credits_used: 10,
          branch: "main",
        },
      ],
      next_page_token: null,
    });
  }),

  http.get(
    `${BASE_URL}/insights/:projectSlug/workflows/:workflowName/jobs`,
    () => {
      return HttpResponse.json({
        items: [
          { name: "test-job", metrics: { success_rate: 0.98, total_runs: 50 } },
        ],
        next_page_token: null,
      });
    },
  ),

  http.get(
    `${BASE_URL}/insights/:projectSlug/workflows/:workflowName/summary`,
    () => {
      return HttpResponse.json({
        metrics: {
          success_rate: 0.95,
          total_runs: 100,
          failed_runs: 5,
          successful_runs: 95,
          throughput: 10,
          mttr: 300,
          duration_metrics: {
            min: 60,
            mean: 300,
            median: 280,
            max: 600,
            p95: 500,
            standard_deviation: 50,
            total_duration: 30000,
          },
        },
        trends: {},
      });
    },
  ),

  http.get(
    `${BASE_URL}/insights/:projectSlug/workflows/:workflowName/test-metrics`,
    () => {
      return HttpResponse.json({
        average_test_count: 100,
        most_failed_tests: [
          { test_name: "test1", failed_runs: 5, file: "test.js", flaky: false },
        ],
        most_failed_tests_extra: 0,
        slowest_tests: [
          {
            test_name: "slow-test",
            file: "slow.js",
            p95_duration: 10.5,
            flaky: false,
          },
        ],
        slowest_tests_extra: 0,
        test_runs: [
          {
            success_rate: 0.95,
            pipeline_number: 123,
            test_counts: {
              error: 0,
              failure: 5,
              skipped: 2,
              success: 93,
              total: 100,
            },
          },
        ],
        total_test_runs: 100,
      });
    },
  ),

  http.get(
    `${BASE_URL}/insights/time-series/:projectSlug/workflows/:workflowName/jobs`,
    () => {
      return HttpResponse.json({
        items: [
          {
            name: "test-job",
            min_started_at: "2024-01-01T00:00:00Z",
            max_ended_at: "2024-01-01T00:30:00Z",
            timestamp: "2024-01-01T00:00:00Z",
            metrics: {
              success_rate: 0.95,
              total_runs: 50,
              failed_runs: 3,
              successful_runs: 47,
              duration_metrics: {
                min: 60,
                mean: 300,
                median: 280,
                max: 600,
                p95: 500,
                total_duration: 15000,
              },
            },
          },
        ],
        next_page_token: null,
      });
    },
  ),

  http.get(`${BASE_URL}/insights/pages/:projectSlug/summary`, () => {
    return HttpResponse.json({
      org_id: "org-id",
      project_id: "project-id",
      project_data: {
        metrics: {
          success_rate: 0.95,
          total_runs: 100,
          total_credits_used: 1000,
        },
        trends: {},
        workflows: {},
      },
    });
  }),

  http.get(`${BASE_URL}/insights/:orgSlug/summary`, () => {
    return HttpResponse.json({
      org_data: {
        metrics: {
          success_rate: 0.95,
          total_runs: 1000,
          total_credits_used: 10000,
        },
        trends: {},
      },
      org_project_data: [],
      all_projects: [],
    });
  }),

  // Policy handlers
  http.get(`${BASE_URL}/owner/:ownerID/context/:context/decision`, () => {
    return HttpResponse.json([
      { id: "decision-id", status: "PASS", created_at: "2024-01-01T00:00:00Z" },
    ]);
  }),

  http.get(
    `${BASE_URL}/owner/:ownerID/context/:context/decision/:decisionID`,
    () => {
      return HttpResponse.json({
        id: "decision-id",
        status: "PASS",
        created_at: "2024-01-01T00:00:00Z",
        input: {},
      });
    },
  ),

  http.post(`${BASE_URL}/owner/:ownerID/context/:context/decision`, () => {
    return HttpResponse.json({
      status: "PASS",
      enabled_rules: ["rule1"],
      soft_failures: [],
      hard_failures: [],
    });
  }),

  http.get(
    `${BASE_URL}/owner/:ownerID/context/:context/decision/settings`,
    () => {
      return HttpResponse.json({ enabled: true });
    },
  ),

  http.patch(
    `${BASE_URL}/owner/:ownerID/context/:context/decision/settings`,
    () => {
      return HttpResponse.json({ enabled: true });
    },
  ),

  http.get(`${BASE_URL}/owner/:ownerID/context/:context/policy-bundle`, () => {
    return HttpResponse.json({
      policies: { "policy1.rego": "package policy1" },
    });
  }),

  http.post(`${BASE_URL}/owner/:ownerID/context/:context/policy-bundle`, () => {
    return HttpResponse.json({ message: "Created" });
  }),

  http.get(
    `${BASE_URL}/owner/:ownerID/context/:context/policy-bundle/:policyName`,
    () => {
      return HttpResponse.json("package policy1");
    },
  ),

  // Webhook handlers
  http.get(`${BASE_URL}/webhook`, () => {
    return HttpResponse.json({
      items: [mockWebhook],
      next_page_token: null,
    });
  }),

  http.post(`${BASE_URL}/webhook`, () => {
    return HttpResponse.json(mockWebhook);
  }),

  http.get(`${BASE_URL}/webhook/:webhookId`, () => {
    return HttpResponse.json(mockWebhook);
  }),

  http.put(`${BASE_URL}/webhook/:webhookId`, () => {
    return HttpResponse.json(mockWebhook);
  }),

  http.delete(`${BASE_URL}/webhook/:webhookId`, () => {
    return HttpResponse.json({ message: "Deleted" });
  }),

  // User handlers
  http.get(`${BASE_URL}/me`, () => {
    return HttpResponse.json(mockUser);
  }),

  http.get(`${BASE_URL}/me/collaborations`, () => {
    return HttpResponse.json([
      {
        id: "org-id",
        name: "test-org",
        slug: "gh/test-org",
        vcs_type: "github",
      },
    ]);
  }),

  http.get(`${BASE_URL}/user/:userId`, () => {
    return HttpResponse.json(mockUser);
  }),

  // OIDC handlers
  http.get(`${BASE_URL}/org/:orgID/oidc-custom-claims`, () => {
    return HttpResponse.json({
      org_id: "org-id",
      audience: ["https://example.com"],
      audience_updated_at: "2024-01-01T00:00:00Z",
    });
  }),

  http.patch(`${BASE_URL}/org/:orgID/oidc-custom-claims`, () => {
    return HttpResponse.json({
      org_id: "org-id",
      audience: ["https://example.com"],
      audience_updated_at: "2024-01-01T00:00:00Z",
    });
  }),

  http.delete(`${BASE_URL}/org/:orgID/oidc-custom-claims`, () => {
    return HttpResponse.json({
      org_id: "org-id",
      audience: [],
      audience_updated_at: "2024-01-01T00:00:00Z",
    });
  }),

  http.get(
    `${BASE_URL}/org/:orgID/project/:projectID/oidc-custom-claims`,
    () => {
      return HttpResponse.json({
        org_id: "org-id",
        project_id: "project-id",
        audience: ["https://example.com"],
        audience_updated_at: "2024-01-01T00:00:00Z",
      });
    },
  ),

  http.patch(
    `${BASE_URL}/org/:orgID/project/:projectID/oidc-custom-claims`,
    () => {
      return HttpResponse.json({
        org_id: "org-id",
        project_id: "project-id",
        audience: ["https://example.com"],
        audience_updated_at: "2024-01-01T00:00:00Z",
      });
    },
  ),

  http.delete(
    `${BASE_URL}/org/:orgID/project/:projectID/oidc-custom-claims`,
    () => {
      return HttpResponse.json({
        org_id: "org-id",
        project_id: "project-id",
        audience: [],
        audience_updated_at: "2024-01-01T00:00:00Z",
      });
    },
  ),

  // Usage export handlers
  http.post(`${BASE_URL}/organizations/:org_id/usage_export_job`, () => {
    return HttpResponse.json({
      usage_export_job_id: "job-id",
      state: "created",
      start: "2024-01-01T00:00:00Z",
      end: "2024-01-31T23:59:59Z",
    });
  }),

  http.get(
    `${BASE_URL}/organizations/:org_id/usage_export_job/:usage_export_job_id`,
    () => {
      return HttpResponse.json({
        usage_export_job_id: "job-id",
        state: "completed",
        download_urls: ["https://example.com/download.csv"],
      });
    },
  ),
];
