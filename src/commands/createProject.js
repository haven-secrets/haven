import addAdminToProjectGroups from "../aws/iam/users/addAdminToProjectGroups.js";
import createProjectStack from "../aws/cloudformation/createProjectStack.js";
import capitalize from "../utils/capitalize.js";
import { path } from "../utils/config.js";

const createProject = async (projectName) => {
  try {
    projectName = capitalize(projectName);
    await createProjectStack(projectName, path);
    await addAdminToProjectGroups(projectName);
    return { message: "project was successfully created" };
  } catch (error) {
    console.log(`${error.code}: ${error.message}`);
    return error;
  }
};

export default createProject;
