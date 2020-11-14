import { cloudformation } from "../services.js";

const deleteStack = (projectName) => {
  const params = {
    StackName: projectName /* required */,
  };
  return cloudformation.deleteStack(params).promise();
};

export default deleteStack;
