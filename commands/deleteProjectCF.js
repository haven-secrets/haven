import deleteStack from "../aws/cloudformation/deleteStack.js";

const deleteProjectCF = async (projectName) => {
  await deleteStack('LockitStack' + projectName);
};

export default deleteProjectCF;
