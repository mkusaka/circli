// src/commands/schedule.ts
import { Command } from "@cliffy/command";
import { createClient } from "../utils/api.js";
import { printJson, printYaml, printTable } from "../utils/output.js";
import { handleApiError } from "../utils/error.js";

export const scheduleCommand = new Command()
  .name("schedule")
  .description("Manage CircleCI schedules")
  // schedule list
  .command("list")
  .description("List schedules for a project")
  .arguments("<project-slug:string>")
  .option("--page-token <token:string>", "Next page token")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, projectSlug) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET("/project/{project-slug}/schedule", {
        params: {
          path: { "project-slug": projectSlug },
          query: { "page-token": options.pageToken },
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        const headers = [
          "ID",
          "Name",
          "Description",
          "Timetable",
          "Created At",
        ];
        const rows = response.data.items.map((s) => [
          s.id,
          s.name,
          s.description || "-",
          `${s.timetable["per-hour"]} per hour, days: ${(s.timetable["days-of-week"] || []).join(",")}`,
          s["created-at"],
        ]);
        printTable(headers, rows);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // schedule get
  .command("get")
  .description("Get a schedule by ID")
  .arguments("<schedule-id:string>")
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, scheduleId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.GET("/schedule/{schedule-id}", {
        params: {
          path: { "schedule-id": scheduleId },
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log(`ID: ${response.data.id}`);
        console.log(`Name: ${response.data.name}`);
        console.log(`Description: ${response.data.description || "-"}`);
        console.log(`Project Slug: ${response.data["project-slug"]}`);
        console.log(`Actor: ${response.data.actor.login}`);
        console.log(`Created At: ${response.data["created-at"]}`);
        console.log(`Updated At: ${response.data["updated-at"]}`);
        console.log("\nTimetable:");
        console.log(`  Per Hour: ${response.data.timetable["per-hour"]}`);
        console.log(
          `  Hours of Day: ${(response.data.timetable["hours-of-day"] || []).join(", ")}`,
        );
        console.log(
          `  Days of Week: ${(response.data.timetable["days-of-week"] || []).join(", ")}`,
        );
        console.log(
          `  Days of Month: ${(response.data.timetable["days-of-month"] || []).join(", ")}`,
        );
        console.log(
          `  Months: ${(response.data.timetable["months"] || []).join(", ")}`,
        );
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // schedule create
  .command("create")
  .description("Create a new schedule")
  .arguments("<project-slug:string>")
  .option("--name <name:string>", "Schedule name", { required: true })
  .option("--description <description:string>", "Schedule description")
  .option("--branch <branch:string>", "Branch to run on", { required: true })
  .option("--per-hour <perHour:number>", "Triggers per hour (1-60)", {
    required: true,
  })
  .option("--hours-of-day <hours:string>", "Comma-separated hours (0-23)")
  .option(
    "--days-of-week <days:string>",
    "Comma-separated days (SUN,MON,TUE,WED,THU,FRI,SAT)",
  )
  .option("--days-of-month <days:string>", "Comma-separated days (1-31)")
  .option("--months <months:string>", "Comma-separated months (JAN,FEB,...)")
  .option(
    "--parameters <parameters:string>",
    "Pipeline parameters as JSON string",
  )
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, projectSlug) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const timetable: {
        "per-hour": number;
        "hours-of-day"?: number[];
        "days-of-week"?: string[];
        "days-of-month"?: number[];
        months?: string[];
      } = {
        "per-hour": options.perHour,
      };

      if (options.hoursOfDay) {
        timetable["hours-of-day"] = options.hoursOfDay
          .split(",")
          .map((h: string) => Number.parseInt(h.trim(), 10));
      }
      if (options.daysOfWeek) {
        timetable["days-of-week"] = options.daysOfWeek
          .split(",")
          .map((d: string) => d.trim().toUpperCase()) as (
          | "SUN"
          | "MON"
          | "TUE"
          | "WED"
          | "THU"
          | "FRI"
          | "SAT"
        )[];
      }
      if (options.daysOfMonth) {
        timetable["days-of-month"] = options.daysOfMonth
          .split(",")
          .map((d: string) => Number.parseInt(d.trim(), 10));
      }
      if (options.months) {
        timetable["months"] = options.months
          .split(",")
          .map((m: string) => m.trim().toUpperCase()) as (
          | "JAN"
          | "FEB"
          | "MAR"
          | "APR"
          | "MAY"
          | "JUN"
          | "JUL"
          | "AUG"
          | "SEP"
          | "OCT"
          | "NOV"
          | "DEC"
        )[];
      }

      let params: { [key: string]: string | number | boolean } | undefined;
      if (options.parameters) {
        try {
          params = JSON.parse(options.parameters);
        } catch {
          console.error("Invalid JSON for --parameters");
          process.exit(1);
        }
      }

      // Need to have either days-of-week or days-of-month
      // If neither is set, default to days-of-week with all days
      if (!timetable["days-of-week"] && !timetable["days-of-month"]) {
        timetable["days-of-week"] = [
          "MON",
          "TUE",
          "WED",
          "THU",
          "FRI",
          "SAT",
          "SUN",
        ] as ("SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT")[];
      }
      // Need hours-of-day
      if (!timetable["hours-of-day"]) {
        timetable["hours-of-day"] = [0];
      }

      const response = await client.POST("/project/{project-slug}/schedule", {
        params: {
          path: { "project-slug": projectSlug },
        },
        body: {
          name: options.name,
          description: options.description,
          "attribution-actor": "current",
          parameters: params || {},
          timetable: timetable as {
            "days-of-week": (
              | "TUE"
              | "SAT"
              | "SUN"
              | "MON"
              | "THU"
              | "WED"
              | "FRI"
            )[];
            "hours-of-day": number[];
            "per-hour": number;
            months?: (
              | "MAR"
              | "NOV"
              | "DEC"
              | "JUN"
              | "MAY"
              | "OCT"
              | "FEB"
              | "APR"
              | "JAN"
              | "AUG"
              | "SEP"
              | "JUL"
            )[];
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log(`Schedule created.`);
        console.log(`ID: ${response.data.id}`);
        console.log(`Name: ${response.data.name}`);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // schedule update
  .command("update")
  .description("Update a schedule")
  .arguments("<schedule-id:string>")
  .option("--name <name:string>", "New schedule name")
  .option("--description <description:string>", "New description")
  .option("--per-hour <perHour:number>", "Triggers per hour (1-60)")
  .option("--hours-of-day <hours:string>", "Comma-separated hours (0-23)")
  .option("--days-of-week <days:string>", "Comma-separated days")
  .option(
    "--parameters <parameters:string>",
    "Pipeline parameters as JSON string",
  )
  .option("--json", "Output in JSON format")
  .option("--yaml", "Output in YAML format")
  .action(async (options, scheduleId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const body: Record<string, unknown> = {};

      if (options.name) {
        body.name = options.name;
      }
      if (options.description) {
        body.description = options.description;
      }

      const timetable: Record<string, unknown> = {};
      if (options.perHour) {
        timetable["per-hour"] = options.perHour;
      }
      if (options.hoursOfDay) {
        timetable["hours-of-day"] = options.hoursOfDay
          .split(",")
          .map((h: string) => Number.parseInt(h.trim(), 10));
      }
      if (options.daysOfWeek) {
        timetable["days-of-week"] = options.daysOfWeek
          .split(",")
          .map((d: string) => d.trim().toUpperCase());
      }
      if (Object.keys(timetable).length > 0) {
        body.timetable = timetable;
      }

      if (options.parameters) {
        try {
          body.parameters = JSON.parse(options.parameters);
        } catch {
          console.error("Invalid JSON for --parameters");
          process.exit(1);
        }
      }

      const response = await client.PATCH("/schedule/{schedule-id}", {
        params: {
          path: { "schedule-id": scheduleId },
        },
        body,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (options.json) {
        printJson(response.data);
      } else if (options.yaml) {
        printYaml(response.data);
      } else {
        console.log(`Schedule ${scheduleId} updated.`);
      }
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  })
  .reset()
  // schedule delete
  .command("delete")
  .description("Delete a schedule")
  .arguments("<schedule-id:string>")
  .action(async (_options, scheduleId) => {
    const clientResult = await createClient();
    if (clientResult.isErr()) {
      console.error(clientResult.error.message);
      process.exit(1);
    }
    const client = clientResult.value;

    try {
      const response = await client.DELETE("/schedule/{schedule-id}", {
        params: {
          path: { "schedule-id": scheduleId },
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      console.log(`Schedule ${scheduleId} deleted.`);
    } catch (error) {
      const handledError = handleApiError(error);
      console.error(handledError.message);
      process.exit(1);
    }
  });
