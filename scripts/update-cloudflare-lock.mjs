import fs from "node:fs";
import { execFileSync } from "node:child_process";

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const temp = ".package-lock-cloudflare.tmp.json";

try {
  execFileSync("npm", ["install", "--package-lock-only", "--ignore-scripts", "--no-audit", "--no-fund"], { stdio: "inherit" });
  if (!fs.existsSync("package-lock.json")) throw new Error("package-lock.json was not generated");
} finally {
  if (fs.existsSync(temp)) fs.unlinkSync(temp);
}
