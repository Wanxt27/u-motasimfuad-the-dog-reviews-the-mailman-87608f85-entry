// The Dog Reviews the Mailman — make.fun entry (program/v1, Node 22, stdlib only).
// Writes one funny one-line review, in a dog's voice, to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "One star: I bark, he runs, my tail wags anyway — he's the best part of my day, and I'll deny it to his face tomorrow.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function gate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`review must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("review must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("review must be exactly one line");
  }
  if (text !== text.trim()) {
    throw new Error("review must not start or end with whitespace");
  }
}

gate(REVIEW);
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, REVIEW, "utf8");

// Read the file back and gate the bytes that actually landed, so a stray
// newline or encoding slip can never reach the judge.
const written = readFileSync(OUT_FILE, "utf8");
gate(written);
if (written !== REVIEW) {
  throw new Error("round-trip mismatch: written bytes differ from the review");
}
console.log(
  `wrote ${REVIEW.length} characters (${Buffer.byteLength(REVIEW, "utf8")} bytes) to ${OUT_FILE}`,
);
