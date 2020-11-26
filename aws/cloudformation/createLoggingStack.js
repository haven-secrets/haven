import setupLogging from "../../utils/setupLogging.js";
import createStack from "./createStack.js";

const createLoggingStack = (groupName, policyName, tableName) => {
  const stackName = `${tableName}Stack`;
  const template = setupLogging(groupName, policyName, tableName);
  createStack(stackName, template);
};

export default createLoggingStack;
