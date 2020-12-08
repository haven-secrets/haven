import fs from "fs";
import havenDir from "./havenDir.js";
const hiddenAccountFilePath = `${havenDir}/havenAccountInfo.json`;

const fetchHavenAccountInfo = () => {
  if (fs.existsSync(hiddenAccountFilePath)) {
    return JSON.parse(fs.readFileSync(hiddenAccountFilePath));
  }
};

export default fetchHavenAccountInfo;
