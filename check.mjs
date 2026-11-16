// Fails if any client chunk still contains a literal `Run.href` call.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = "dist/public/assets";
const bad = readdirSync(dir)
  .filter((f) => f.endsWith(".js"))
  .filter((f) => /[^.\w$]Run\.href\(/.test(readFileSync(join(dir, f), "utf8")));

if (bad.length) {
  console.error(`FAIL: un-rewritten Run.href in client chunks: ${bad.join(", ")}`);
  process.exit(1);
}
console.log("OK: no Run.href left in client chunks");
