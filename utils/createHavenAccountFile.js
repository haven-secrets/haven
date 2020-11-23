import fs from "fs";
import havenDir from "./havenDir.js";
const hiddenAccountFilePath = `${havenDir}/havenAccountInfo.json`;

const createHavenAccountFile = (
  accountNumber,
  region,
  accessKeyId,
  secretAccessKey,
  role
) => {
  const fileContents = {
    accountNumber,
    region,
    accessKeyId,
    secretAccessKey,
    role,
  };
  fs.writeFileSync(hiddenAccountFilePath, JSON.stringify(fileContents));
};

export default createHavenAccountFile;
