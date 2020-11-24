import fs from "fs";
import LockitDir from "./LockitDir.js";
const hiddenAccountFilePath = `${LockitDir}/LockitAccountInfo.json`;

let accountNumber;
let region;
let credentialKeyId;
let credentialAccessKey;

if (fs.existsSync(hiddenAccountFilePath)) {
  ({ accountNumber, region, credentialKeyId, credentialAccessKey } = JSON.parse(
    fs.readFileSync(hiddenAccountFilePath)
  ));
}

export default { accountNumber, region, credentialKeyId, credentialAccessKey };
