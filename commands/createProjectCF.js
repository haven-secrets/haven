import createStack from "../aws/cloudformation/createStack.js";
import capitalize from "../utils/capitalize.js";

const createProjectCF = async projectName => {
  projectName = capitalize(projectName);
  await createStack(projectName);
};

export default createProjectCF;
