import fs from "fs";
import LockitDir from "./LockitDir.js";
const hiddenAccountFilePath = `${LockitDir}/LockitAccountInfo.json`;

const createLockitAccountFile = (
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

export default createLockitAccountFile;
