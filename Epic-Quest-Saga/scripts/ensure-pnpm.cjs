const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const packageLockPath = path.join(root, "package-lock.json");
const yarnLockPath = path.join(root, "yarn.lock");

for (const lockfilePath of [packageLockPath, yarnLockPath]) {
  if (fs.existsSync(lockfilePath)) {
    fs.rmSync(lockfilePath, { force: true });
  }
}

const userAgent = process.env.npm_config_user_agent || "";

if (!userAgent.startsWith("pnpm/")) {
  console.error("Use pnpm instead");
  process.exit(1);
}
