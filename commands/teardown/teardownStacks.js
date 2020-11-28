import listActiveHavenStacks from "../../aws/cloudformation/listActiveHavenStacks.js";
import deleteStack from "../../aws/cloudformation/deleteStack.js";

const teardownStacks = async () => {
  console.log("We are deleting your Haven files.");
  console.log("This should take 30-60 seconds");

	const stackData = await listActiveHavenStacks();
  const stackPromises = stackData.map((stack) => deleteStack(stack.StackName));
 	return Promise.all(stackPromises);
};

export default teardownStacks;
