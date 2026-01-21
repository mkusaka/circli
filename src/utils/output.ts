// src/utils/output.ts

export function printJson(data: unknown): void {
  console.log(JSON.stringify(data, null, 2));
}

export function printYaml(_data: unknown): void {
  // Use yaml package for YAML output
  console.log("YAML output not implemented yet.");
}

// Human-readable output format (example)
export function printTable(headers: string[], rows: string[][]): void {
  // Simple table format output
  console.log(headers.join("\t"));
  for (const row of rows) {
    console.log(row.join("\t"));
  }
}
