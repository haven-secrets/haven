import { createHavenCloudFormation } from "../services.js";

const listActiveHavenStacks = async () => {
  const params = {
    StackStatusFilter: ["CREATE_COMPLETE"],
  };

  const list = await createHavenCloudFormation().listStacks(params).promise();
  return list.StackSummaries.filter((stack) => stack.StackName.match(/^HavenSecrets/));
};

export default listActiveHavenStacks;
