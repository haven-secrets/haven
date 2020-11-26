import deleteStack from "../aws/cloudformation/deleteStack.js";
import getAllUsers from "../aws/iam/users/getAllUsers.js";
import detachUsersFromGroups from "./teardown/detachUsersFromGroups.js";

const deleteProjectCF = async (projectName) => {
  const allUsersInProject = await getAllUsers();
  console.log("We are deleting your Lockit files for this project.");
	console.log("This should take 30-60 seconds");
  detachUsersFromGroups(allUsersInProject, projectName);
  await deleteStack("LockitStack" + projectName);
};

export default deleteProjectCF;
