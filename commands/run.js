import { spawn } from "child_process";
import getAllSecrets from "./getAllSecrets.js";
import { existsSync } from "fs";

// TODO: discuss with team if we want to inject by adding to env
const populateEnv = (secretsObject) => {
  for (const secret in secretsObject) {
    process.env[secret] = secretsObject[secret];
  }

  console.log('env now:', process.env);
};

const runApp = async (filepath) => {
  if (!existsSync(filepath)) {
    console.log(`${filepath} was not found.`);
    return;
  }

  const fetchedSecrets = await getAllSecrets("MoreSecrets"); // TODO: remove hardcoding
  populateEnv(fetchedSecrets);

  const childProcess = spawn("node", [filepath], {
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
};

export default runApp;