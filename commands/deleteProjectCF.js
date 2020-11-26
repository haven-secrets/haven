import deleteStack from "../aws/cloudformation/deleteStack.js";
import capitalize from "../utils/capitalize.js";

const deleteProjectCF = async (projectName) => {
  projectName = capitalize(projectName);
  await deleteStack(`HavenSecrets${projectName}Stack`);
};

export default deleteProjectCF;
