import deleteStack from "../aws/cloudformation/deleteStack.js";
import getAllUsers from "../aws/iam/users/getAllUsers.js";
import detachUsersFromGroups from "./teardown/detachUsersFromGroups.js";
import capitalize from "../utils/capitalize.js";

const deleteProjectCF = async (projectName) => {
  console.log("We are deleting your Lockit files for this project.");
  console.log("This should take 30-60 seconds");

  const allUsersInProject = await getAllUsers();
  projectName = capitalize(projectName);
  
  detachUsersFromGroups(allUsersInProject, projectName);
  await deleteStack(`HavenSecrets${projectName}Stack`);
};

export default deleteProjectCF;
