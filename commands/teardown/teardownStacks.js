import listActiveLockitStacks from "../../aws/cloudformation/listActiveLockitStacks.js";
import deleteStack from "../../aws/cloudformation/deleteStack.js";

const teardownStacks = async () => {
	console.log("We are deleting your Lockit files.");
	console.log("This should take 30-60 seconds");
	const stackData = await listActiveLockitStacks();
  const stackPromises = stackData.map(stack => {
    return deleteStack(stack.StackName);
  });

 	return Promise.all(stackPromises);
};

export default teardownStacks;
