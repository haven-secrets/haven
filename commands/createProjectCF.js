import createStack from "../aws/cloudformation/createProjectStack.js";

const createProjectCF = async (projectName) => {
  await createStack(projectName);
};

export default createProjectCF;
