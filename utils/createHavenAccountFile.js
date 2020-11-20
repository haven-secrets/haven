import fs from "fs";
import havenDir from "./havenDir.js";
const hiddenAccountFilePath = `${havenDir}/havenAccountInfo.json`;

const createHavenAccountFile = (
  accountNumber,
  region,
  credentialKeyId,
  credentialAccessKey
) => {
  const fileContents = {
    accountNumber,
    region,
    credentialKeyId,
    credentialAccessKey,
  };
  fs.writeFileSync(hiddenAccountFilePath, JSON.stringify(fileContents));
};

export default createHavenAccountFile;
