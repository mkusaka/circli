import { writeFileSync } from "fs";
import swaggerJson from "./swagger";
const filename = "swagger.json";
function main() {
  console.log(swaggerJson);
  const dupSwaggerJson: typeof swaggerJson = JSON.parse(
    JSON.stringify(swaggerJson)
  );
  dupSwaggerJson.paths = Object.fromEntries(
    Object.entries(dupSwaggerJson.paths)
      .map(([path, methods]) => {
        return [
          path,
          Object.fromEntries(
            Object.entries(methods).sort(([method, _]) => {
              return method;
            })
          ),
        ];
      })
      .sort(([path, _]) => path)
  );
  writeFileSync(filename, JSON.stringify(dupSwaggerJson, null, 2));
}

main();
