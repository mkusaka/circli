import ts from "typescript";
import * as fs from "fs";
import glob from "fast-glob";
import { format } from "prettier";
import * as path from "path";
import assert from "assert";

const files = glob.sync("./client/**/*.ts");
const program = ts.createProgram(files, {});

function transformerFactory(context: ts.TransformationContext) {
  return (soruceFile: ts.SourceFile) => {
    const transformer = transformWithFileName(soruceFile);
    return ts.visitNode(soruceFile, transformer(context));
  };
}

function transformWithFileName(souceFile: ts.SourceFile) {
  const filename = souceFile.fileName;
  return function transformer(context: ts.TransformationContext): ts.Visitor {
    function visitor(node: ts.Node): ts.Node {
      if (ts.isExportDeclaration(node)) {
        const mo = node.moduleSpecifier;
        // @ts-ignore -- fixme
        const importText: string = mo.text;
        const modified = (() => {
          if (!importText.match(/^\./)) {
            return importText;
          }

          const maybeDirectoryPath = path.join(
            path.dirname(filename),
            importText
          );
          if (
            fs.existsSync(maybeDirectoryPath) &&
            fs.lstatSync(maybeDirectoryPath).isDirectory()
          ) {
            const maybeIndex = path.join(maybeDirectoryPath, "index.ts");
            assert.equal(fs.existsSync(maybeIndex), true);
            const relative = path.relative(path.dirname(filename), maybeIndex);
            const normalized = !relative.startsWith(".")
              ? `./${relative}`
              : relative;
            console.log("normalized maybeIndex", normalized);
            return normalized;
          }

          const maybeFilePath = path.join(
            path.dirname(filename),
            `${importText}.ts`
          );
          if (fs.existsSync(maybeFilePath) && fs.lstatSync(maybeFilePath)) {
            console.log("maybeFilePath", maybeFilePath);
            const relative = path.relative(
              path.dirname(filename),
              maybeFilePath
            );
            const normalized = !relative.startsWith(".")
              ? `./${relative}`
              : relative;
            console.log("normalized maybePath", normalized);
            return normalized;
          }

          throw new Error(`invalid ${filename}, ${importText}`);
        })();
        return context.factory.createExportDeclaration(
          undefined,
          undefined,
          node.isTypeOnly,
          node.exportClause,
          context.factory.createStringLiteral(modified),
          undefined
        );
      }
      if (ts.isImportDeclaration(node)) {
        const mo = node.moduleSpecifier;
        // @ts-ignore -- fixme
        const importText: string = mo.text;
        const modified = (() => {
          if (!importText.match(/^\./)) {
            return importText;
          }

          const maybeDirectoryPath = path.join(
            path.dirname(filename),
            importText
          );
          if (
            fs.existsSync(maybeDirectoryPath) &&
            fs.lstatSync(maybeDirectoryPath).isDirectory()
          ) {
            const maybeIndex = path.join(maybeDirectoryPath, "index.ts");
            assert.equal(fs.existsSync(maybeIndex), true);
            const relative = path.relative(path.dirname(filename), maybeIndex);
            const normalized = !relative.startsWith(".")
              ? `./${relative}`
              : relative;
            console.log("normalized maybeIndex", normalized);
            return normalized;
          }

          const maybeFilePath = path.join(
            path.dirname(filename),
            `${importText}.ts`
          );
          if (fs.existsSync(maybeFilePath) && fs.lstatSync(maybeFilePath)) {
            console.log("maybeFilePath", maybeFilePath);
            const relative = path.relative(
              path.dirname(filename),
              maybeFilePath
            );
            const normalized = !relative.startsWith(".")
              ? `./${relative}`
              : relative;
            console.log("normalized maybePath", normalized);
            return normalized;
          }

          throw new Error(`invalid ${filename}, ${importText}`);
        })();
        return context.factory.createImportDeclaration(
          undefined,
          undefined,
          node.importClause,
          context.factory.createStringLiteral(modified),
          undefined
        );
      }
      return ts.visitEachChild(node, visitor, context);
    }
    return visitor;
  };
}

// program.emit(undefined, undefined, undefined, undefined, {
//   before: [transformerFactory]
// })
const printer = ts.createPrinter({ removeComments: false });

program.getSourceFiles().forEach((sourceFile) => {
  if (sourceFile.fileName.match(/node_modules/)) {
    return;
  }
  console.log("filename", sourceFile.fileName);
  const result = ts.transform(sourceFile, [transformerFactory]);
  result.dispose();
  const transformedSourcefile = result.transformed[0];
  const print = printer.printFile(transformedSourcefile);
  fs.writeFileSync(
    sourceFile.fileName,
    format(print, { parser: "typescript" })
  );
});
