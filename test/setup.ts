import { beforeAll, afterEach, afterAll, vi } from "vitest";
import { server } from "./mocks/server.js";

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Clean up after all tests
afterAll(() => server.close());

// Mock console methods to avoid noisy output during tests
vi.spyOn(console, "log").mockImplementation(() => {});
vi.spyOn(console, "error").mockImplementation(() => {});

// Mock process.exit to prevent tests from exiting
vi.spyOn(process, "exit").mockImplementation(
  (code?: number | string | null | undefined) => {
    throw new Error(`process.exit(${code})`);
  },
);

// Mock the config module to provide a test API token
vi.mock("../src/utils/config.js", () => ({
  loadConfig: vi.fn().mockResolvedValue({
    isOk: () => true,
    isErr: () => false,
    value: { apiToken: "test-token" },
  }),
}));
