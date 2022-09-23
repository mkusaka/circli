import { writeFileSync } from "fs";
import swaggerJson from "./swagger";
const filename = "swagger.json";
function main() {
  console.log(swaggerJson)
  const dupSwaggerJson: typeof swaggerJson = JSON.parse(JSON.stringify(swaggerJson))
  dupSwaggerJson.paths = Object.fromEntries(Object.entries(dupSwaggerJson.paths).sort(([key, _]) => key)) 
  writeFileSync(filename, JSON.stringify(dupSwaggerJson, null, 2))
}

main()
