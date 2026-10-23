const { spawnSync } = require("node:child_process");
const { writeFileSync, renameSync } = require("node:fs");
const { randomUUID } = require("node:crypto");

const projectId = process.argv[2];
if (!projectId || !/^[a-z0-9]+$/.test(projectId)) {
  console.error("Usage: npm run generate-types -- YOUR_SUPABASE_PROJECT_ID");
  process.exit(1);
}

const result = spawnSync(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["supabase", "gen", "types", "typescript", "--project-id", projectId, "--schema", "public"],
  {
    encoding: "utf8",
    stdio: ["inherit", "pipe", "inherit"],
    maxBuffer: 10 * 1024 * 1024,
    shell: process.platform === "win32",
  },
);

if (result.error || result.status !== 0 || !result.stdout?.includes("export type Database")) {
  console.error("Type generation failed; existing types were preserved.");
  if (result.error) console.error(result.error.message);
  process.exit(1);
}

const target = require.resolve("../src/lib/supabase/types.ts");
const temporary = target.replace(/types\.ts$/, `.types.ts.${randomUUID()}.tmp`);
writeFileSync(temporary, result.stdout);
renameSync(temporary, target);
console.log("Updated src/lib/supabase/types.ts. Run npm run typecheck.");
