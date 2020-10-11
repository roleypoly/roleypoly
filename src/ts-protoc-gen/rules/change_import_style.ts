/**
 * Converts a list of generated protobuf-js files from commonjs modules into named AMD modules.
 *
 * Arguments:
 *   --workspace_name
 *   --input_base_path
 *   --output_module_name
 *   --input_file_path
 *   --output_file_path
 */
import minimist = require('minimist');
import fs = require('fs');

function main() {
    const args = minimist(process.argv.slice(2));

    const initialContents = fs.readFileSync(args.input_file_path, 'utf8');

    const umdContents = convertToUmd(args, initialContents);
    fs.writeFileSync(args.output_umd_path, umdContents, 'utf8');

    const commonJsContents = convertToESM(args, initialContents);
    fs.writeFileSync(args.output_es6_path, commonJsContents, 'utf8');
}

function replaceRecursiveFilePaths(args: any) {
    return (contents: string) => {
        return contents.replace(/(\.\.\/)+/g, `${args.workspace_name}/`);
    };
}

function removeJsExtensionsFromRequires(contents: string) {
    return contents.replace(/(require\(.*).js/g, (_, captureGroup: string) => {
        return captureGroup;
    });
}

function convertToUmd(args: any, initialContents: string): string {
    const wrapInAMDModule = (contents: string) => {
        return `// GENERATED CODE DO NOT EDIT
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define("${args.input_base_path}/${args.output_module_name}",  factory);
  }
})(function (require, exports) {
  ${contents}
});
`;
    };

    const transformations: ((c: string) => string)[] = [
        wrapInAMDModule,
        replaceRecursiveFilePaths(args),
        removeJsExtensionsFromRequires,
    ];
    return transformations.reduce((currentContents, transform) => {
        return transform(currentContents);
    }, initialContents);
}

// Converts the CommonJS format from protoc to the ECMAScript Module format.
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
function convertToESM(args: any, initialContents: string): string {
    const replaceGoogExtendWithExports = (contents: string) => {
        return contents.replace(
            /goog\.object\.extend\(exports, ([\w\.]+)\);/g,
            (_, packageName: string) => {
                const exportSymbols = /goog\.exportSymbol\('([\w\.]+)',.*\);/g;
                const symbols = [];

                let match: RegExpExecArray | null = exportSymbols.exec(initialContents);
                while (match) {
                    // We want to ignore embedded export targets, IE: `DeliveryPerson.DataCase`.
                    const exportTarget = match[1].substr(packageName.length + 1);
                    if (!exportTarget.includes('.')) {
                        symbols.push(exportTarget);
                    }
                    match = exportSymbols.exec(initialContents);
                }

                return `export const { ${symbols.join(', ')} } = ${packageName}`;
            }
        );
    };

    const replaceRequiresWithImports = (contents: string) => {
        return contents.replace(
            /var ([\w\d_]+) = require\((['"][\w\d@/_-]+['"])\);/g,
            'import * as $1 from $2;'
        );
    };

    const replaceRequiresWithSubpackageImports = (contents: string) => {
        return contents.replace(
            /var ([\w\d_]+) = require\((['"][\w\d@/_-]+['"])\)\.([\w\d_]+);/g,
            'import * as $1 from $2;'
        );
    };

    const replaceCJSExportsWithECMAExports = (contents: string) => {
        return contents.replace(/exports\.([\w\d_]+) = .*;/g, 'export { $1 };');
    };

    const transformations: ((c: string) => string)[] = [
        replaceRecursiveFilePaths(args),
        removeJsExtensionsFromRequires,
        replaceGoogExtendWithExports,
        replaceRequiresWithImports,
        replaceRequiresWithSubpackageImports,
        replaceCJSExportsWithECMAExports,
    ];
    return transformations.reduce((currentContents, transform) => {
        return transform(currentContents);
    }, initialContents);
}

main();
