import createStack from "../aws/cloudformation/createStack.js";

const createProjectCF = async (projectName) => {
  await createStack(projectName);
};

export default createProjectCF;
