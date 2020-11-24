import { cloudformation } from "../services.js";

const deleteStack = async (stackName) => {
  const params = { StackName: stackName }; /* required */

  await cloudformation.deleteStack(params).promise();

  return cloudformation
    .waitFor("stackDeleteComplete", { StackName: stackName })
    .promise();
};

export default deleteStack;
