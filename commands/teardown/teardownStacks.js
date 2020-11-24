import listActiveLockitStacks from "../../aws/cloudformation/listActiveLockitStacks.js";
import deleteStack from "../../aws/cloudformation/deleteStack.js";

const teardownStacks = async () => {
	const stackData = await listActiveLockitStacks();
  const stackPromises = stackData.map(stack => {
    return deleteStack(stack.StackName);
  });

 	return Promise.all(stackPromises);
};

export default teardownStacks;