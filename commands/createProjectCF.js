import createStack from "../aws/cloudformation/createStack.js";

const createProjectCF = (projectName) => {
  createStack(projectName);
};

export default createProjectCF;
