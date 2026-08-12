import fs from "node:fs";

const lock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

lock.packages[""].devDependencies = {
  ...(lock.packages[""]?.devDependencies ?? {}),
  ...(pkg.devDependencies ?? {}),
};

fs.writeFileSync("package-lock.json", JSON.stringify(lock, null, 2) + "\n");
console.log("Lockfile root dependency metadata refreshed.");
