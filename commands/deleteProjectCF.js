import deleteStack from "../aws/cloudformation/deleteStack.js";
import getAllUsers from "../aws/iam/users/getAllUsers.js";
import detachUsersFromGroups from "./teardown/detachUsersFromGroups.js";
import capitalize from "../utils/capitalize.js";
import { path } from "../utils/config.js";

const deleteProjectCF = async (projectName) => {
  try {
    console.log("We are deleting your Lockit files for this project.");
    console.log("This should take 30-60 seconds");

    const allUsersInProject = await getAllUsers(path);
    projectName = capitalize(projectName);

    detachUsersFromGroups(allUsersInProject, path, projectName);
    await deleteStack(`${path}${projectName}Stack`);
  } catch (error) {
    console.log(`${error.code}: ${error.message}`);
    return error;
  }
};

export default deleteProjectCF;
