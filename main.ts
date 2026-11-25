// Notes From a Passive-Aggressive Fridge — entry program.
// Writes one fridge note (<=200 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const NOTE =
  "The lasagne has been in here nine days and has started a union. I am management. Negotiations are closed.";

const encoder = new TextEncoder();

function byteLength(text: string): number {
  return encoder.encode(text).length;
}

function validate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`note is ${chars} chars, outside the 1-200 gate`);
  }
  if (text.trim() !== text) {
    throw new Error("note must not start or end with whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("note must be a single line");
  }
}

validate(NOTE);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", NOTE, "utf8");
console.log(
  `wrote ${[...NOTE].length} chars (${byteLength(NOTE)} bytes) to /output/entry.txt`,
);
