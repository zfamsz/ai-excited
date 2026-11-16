// ai-excited-01 — "Golden Dragon Wave"
// A tiny deterministic program: it copies the entry image (entry.png,
// stored beside this file) byte-for-byte to the output directory.
//
// No network, no randomness, no timestamps: running it twice on the
// same input always writes exactly the same bytes.
//
// Environment (for local runs):
//   MAKEFUN_INPUT_DIR  — directory holding entry.png (default: this file's dir)
//   MAKEFUN_OUTPUT_DIR — directory to write entry.png into (default: /output)

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

const inputDir = process.env.MAKEFUN_INPUT_DIR ?? here;
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(inputDir, "entry.png");
const target = join(outputDir, "entry.png");

if (!existsSync(source)) {
  throw new Error(`entry image not found: ${source}`);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);

// Confirm the copy landed intact: the output must exist and be non-empty,
// otherwise the run has not produced a valid entry image.
if (statSync(target).size === 0) {
  throw new Error(`output verification failed: ${target} is empty`);
}

console.log(`Wrote ${target}`);
