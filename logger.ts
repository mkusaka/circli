import { log } from "./deps.ts";

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG", {
      formatter: (logRecord) => {
        return JSON.stringify(logRecord);
      },
    }),
  },
  loggers: {
    debug: {
      level: "DEBUG",
      handlers: ["console"],
    },
    error: {
      level: "ERROR",
      handlers: ["console"],
    },
  },
});

export const logger = log.getLogger("debug");
