import { createHavenCloudFormation } from "../services.js";

const deleteStack = async (stackName) => {
  const params = {
    StackName: stackName,
  };

  await createHavenCloudFormation().deleteStack(params).promise();
  return await createHavenCloudFormation()
    .waitFor("stackDeleteComplete", { StackName: stackName })
    .promise();
};

export default deleteStack;
