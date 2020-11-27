import createProjectStack from "../aws/cloudformation/createProjectStack.js";
import capitalize from "../utils/capitalize.js";
import { path } from "../utils/config.js";

const createProjectCF = async (projectName) => {
  if (projectName === undefined) {
    console.log("You must enter a project name.");
    return;
  }
  projectName = capitalize(projectName);
  await createProjectStack(projectName, path);
};

export default createProjectCF;
