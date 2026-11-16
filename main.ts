// ai-excited-01 entry (Node 22, standard library only).
//
// The entry image lives beside this file as entry.png (JPEG bytes under a
// .png name, which the gate accepts: it tells PNG from JPEG by the first
// bytes). The program copies those exact bytes to /output/entry.png, so
// every run writes identical output and nothing is fetched over the network.
//
// Local run:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// MAKEFUN_INPUT_DIR, when set, is where the entry image is read from
// instead of this file's own directory (the kit's local-run convention);
// MAKEFUN_OUTPUT_DIR, when set, stands in for /output.

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const inputDir = process.env.MAKEFUN_INPUT_DIR ?? here;
const source = join(inputDir, 'entry.png');

if (!existsSync(source)) {
  throw new Error(`entry image not found: ${source}`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outputDir, { recursive: true });

const bytes = readFileSync(source);
const target = join(outputDir, 'entry.png');
writeFileSync(target, bytes);

// Sanity check: the output must be the exact bytes we read, non-empty.
if (statSync(target).size !== bytes.length || bytes.length === 0) {
  throw new Error('output verification failed: entry.png was not written intact');
}
