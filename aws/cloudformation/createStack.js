import { cloudformation } from "../services.js";

const createStack = async (stackName, template) => {
  const params = {
    StackName: stackName,
    TemplateBody: template,
    Capabilities: ["CAPABILITY_IAM", "CAPABILITY_NAMED_IAM"],
  };

  await cloudformation.createStack(params).promise();
  cloudformation.waitFor("stackCreateComplete", { StackName: stackName }).promise();
};

export default createStack;
