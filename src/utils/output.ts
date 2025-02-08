// src/utils/output.ts

export function printJson(data: unknown): void {
  console.log(JSON.stringify(data, null, 2));
}

export function printYaml(data: unknown): void {
  // YAML 出力には `yaml` パッケージなどを使用
  console.log("YAML output not implemented yet.");
}

// 人間が読みやすい形式での出力 (例)
export function printTable(headers: string[], rows: string[][]): void {
  // 簡単なテーブル形式で出力
  console.log(headers.join("\t"));
  for (const row of rows) {
    console.log(row.join("\t"));
  }
}
