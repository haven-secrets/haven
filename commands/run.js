// TODO: what if a secret is split between data events or exceeds a buffer?
import { spawn } from "child_process";
import getAllSecrets from "./getAllSecrets.js";
import { existsSync } from "fs";

const runApp = async (filepath) => {
  if (!existsSync(filepath)) {
    console.log(`${filepath} was not found.`);
    return;
  }

  const handleStdout = (data) => {
    let dataString = data.toString();
    secretValues.forEach((secretValue) => {
      dataString = dataString.replace(secretValue, logRedaction);
    });

    process.stdout.write(dataString);
  }

  const handleStderr = (data) => {
    let dataString = data.toString();
    secretValues.forEach((secretValue) => {
      dataString = dataString.replace(secretValue, logRedaction);
    });

    process.stderr.write(dataString);
  }

  const fetchedSecrets = await getAllSecrets("MoreSecrets"); // TODO: remove hardcoding
  const secretValues = Object.values(fetchedSecrets);
  const logRedaction = '<Haven found a secret here and redacted it>';

  const childProcess = spawn("node", [filepath], {
    env: Object.assign({}, process.env, fetchedSecrets),
  });

  childProcess.stdout.on("data", handleStdout);

  childProcess.stderr.on("data", handleStderr);

  childProcess.on("close", (code) => console.log(`child process exited with code ${code}`));
};

export default runApp;
