import { Command } from "cliffy/command/mod.ts";

const { args } = await new Command()
    .description("Remove directories")
    .arguments("<dirs...>")
    .parse(Deno.args);

const foo = Deno.cwd()
const dirs = args[0]

for (const dir of dirs) {
    console.log("rmdir %s", dir);
}
