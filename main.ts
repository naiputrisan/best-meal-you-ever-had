// Best Meal You Ever Had — make.fun micro entry.
// One sentence, at most 200 characters, about the best meal I ever had.
// The program writes that sentence to entry.txt for the judge to read.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SENTENCE =
  "On a night bus out of Yogyakarta, cup noodles gone soft, salt on my lips and rain on the window, tasted like the whole island saying goodnight.";

const MAX_CHARS = 200;

function main(): void {
  const text = SENTENCE.trim();
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (!text.endsWith(".")) {
    throw new Error("entry must be a single finished sentence");
  }
  const stops = text.match(/\./g) ?? [];
  if (stops.length !== 1) {
    throw new Error(
      `entry must be exactly one sentence, found ${stops.length} stops`,
    );
  }
  const outDir = process.env.ENTRY_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, text, "utf8");
  console.log(`wrote ${text.length} chars to ${outPath}`);
}

main();
