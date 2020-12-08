import fs from "fs";
import havenDir from "./havenDir.js";
const hiddenAccountFilePath = `${havenDir}`;

const deleteHavenAccountFile = () => {
  fs.rmdirSync(hiddenAccountFilePath, { recursive: true });
};

export default deleteHavenAccountFile;
