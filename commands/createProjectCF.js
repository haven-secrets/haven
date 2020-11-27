import createProjectStack from "../aws/cloudformation/createProjectStack.js";
import capitalize from "../utils/capitalize.js";

const createProjectCF = async (projectName) => {
  try {
    projectName = capitalize(projectName);
    await createProjectStack(projectName);
  } catch (error) {
    console.log(`${error.code}: ${error.message}`);
    return error;
  }
};

export default createProjectCF;
