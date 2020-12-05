import addAdminToProjectGroups from "../aws/iam/users/addAdminToProjectGroups.js";
import createProjectStack from "../aws/cloudformation/createProjectStack.js";
import capitalize from "../utils/capitalize.js";
import { path } from "../utils/config.js";

const createProjectCF = async (projectName) => {
  try {
    projectName = capitalize(projectName);
    await createProjectStack(projectName, path);
    await addAdminToProjectGroups(projectName);
  } catch (error) {
    console.log(`${error.code}: ${error.message}`);
    return error;
  }
};

export default createProjectCF;
