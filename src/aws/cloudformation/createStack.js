import { createHavenCloudFormation } from "../services.js";

const createStack = async (stackName, template) => {
  const params = {
    StackName: stackName,
    TemplateBody: template,
    Capabilities: ["CAPABILITY_IAM", "CAPABILITY_NAMED_IAM"],
  };
  const cloudformation = createHavenCloudFormation();
  await cloudformation.createStack(params).promise();
  return cloudformation.waitFor("stackCreateComplete", { StackName: stackName }).promise();
};

export default createStack;
