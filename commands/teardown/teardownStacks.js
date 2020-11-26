import listActiveHavenStacks from "../../aws/cloudformation/listActiveHavenStacks.js";
import deleteStack from "../../aws/cloudformation/deleteStack.js";

const teardownStacks = async () => {
	const stackData = await listActiveHavenStacks();
  const stackPromises = stackData.map(stack => {
    return deleteStack(stack.StackName);
  });

 	return Promise.all(stackPromises);
};

export default teardownStacks;