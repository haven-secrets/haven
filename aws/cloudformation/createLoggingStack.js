import { cloudformation } from "../services.js";
import setupLogging from "../../utils/setupLogging.js";

const createStack = async (groupName, policyName, tableName) => {
  const projectTemplate = setupLogging(groupName, policyName, tableName);
  const params = {
    StackName: `${tableName}Stack` /* required */,
    TemplateBody: projectTemplate,
    Capabilities: ["CAPABILITY_IAM", "CAPABILITY_NAMED_IAM"],
  };
  await cloudformation.createStack(params).promise();

  cloudformation
    .waitFor("stackCreateComplete", {
      StackName: `${tableName}Stack`,
    })
    .promise();
};

export default createStack;
