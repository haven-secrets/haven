import { homedir } from "os";
const configDir = ".Lockit";

const LockitDir = `${homedir()}/${configDir}`;
export default LockitDir;
