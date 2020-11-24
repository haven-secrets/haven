import fs from "fs";
import LockitDir from "./LockitDir.js";
const hiddenAccountFilePath = `${LockitDir}/LockitAccountInfo.json`;

const createLockitAccountFile = (
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

export default createLockitAccountFile;
