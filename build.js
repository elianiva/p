import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
    await build({
        bundle: true,
        sourcemap: true,
        format: "esm",
        target: "esnext",
        external: ["__STATIC_CONTENT_MANIFEST", "highlight.js", "nanoid"],
        conditions: ["worker", "browser"],
        entryPoints: [path.join(__dirname, "src", "index.ts")],
        outdir: path.join(__dirname, "dist"),
        outExtension: { ".js": ".mjs" },
        tsconfig: path.join(__dirname, "tsconfig.build.json"),
        loader: {
            ".html": "text"
        }
    });
} catch (err) {
    console.error(err);
    process.exitCode = 1;
}
