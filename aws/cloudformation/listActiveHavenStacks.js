import { cloudformation } from "../services.js";

const listActiveHavenStacks = async () => {
  const params = {
    StackStatusFilter: ["CREATE_COMPLETE"],
  };

  const list = await cloudformation.listStacks(params).promise();
  return list.StackSummaries.filter((stack) => stack.StackName.match(/^HavenSecrets/));
};

export default listActiveHavenStacks;
