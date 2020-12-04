import { cloudformation } from "../services.js";

const deleteStack = async (stackName) => {
  const params = {
    StackName: stackName,
  };

  await cloudformation.deleteStack(params).promise();
  return await cloudformation
    .waitFor("stackDeleteComplete", { StackName: stackName })
    .promise();
};

export default deleteStack;
