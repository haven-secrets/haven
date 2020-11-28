import setupLogging from "../../utils/setupLogging.js";
import createStack from "./createStack.js";

const createLoggingStack = async (groupName, policyName, tableName) => {
  const stackName = `${tableName}Stack`;
  const template = setupLogging(groupName, policyName, tableName);
  return await createStack(stackName, template);
};

export default createLoggingStack;
