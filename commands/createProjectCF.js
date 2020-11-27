import createProjectStack from "../aws/cloudformation/createProjectStack.js";
import capitalize from "../utils/capitalize.js";

const createProjectCF = async (projectName) => {
  projectName = capitalize(projectName);
  await createProjectStack(projectName);
};

export default createProjectCF;
