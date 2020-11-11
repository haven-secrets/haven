import { spawn } from "child_process";
import getAllSecrets from "./commands/getAllSecrets.js";

(async () => {
  const fetchedSecrets = await getAllSecrets();

  const childProcess = spawn("node", ["tests/test.js"], {
    env: Object.assign({}, process.env, fetchedSecrets),
  });

  childProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  childProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  childProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
})();