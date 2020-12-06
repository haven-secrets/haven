import fs from "fs";
import havenDir from "./havenDir.js";
const accountFileName = "havenAccountInfo.json";

const createHavenAccountFile = (
  accountNumber,
  region,
  username,
  accessKeyId,
  secretAccessKey,
  role,
  destinationFolder=havenDir
) => {
  const fileContents = {
    accountNumber,
    region,
    username,
    accessKeyId,
    secretAccessKey,
    role,
  };
  if (!fs.existsSync(destinationFolder)) fs.mkdirSync(destinationFolder);
  fs.writeFileSync(`${destinationFolder}/${accountFileName}`, JSON.stringify(fileContents));
};

export default createHavenAccountFile;
