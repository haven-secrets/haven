import { cloudformation } from "../services.js";
import createLambda from "../../utils/createLambda.js";
import sleep from "../../utils/sleep.js";

const stackName = "HavenSecretsNewUserCreationStack"; // TODO: load this from a config file

const createNewUserCreationStack = async (params) => {
  const template = createLambda(params);

  const roleParams = {
    StackName: stackName,
    TemplateBody: template,
    Capabilities: ["CAPABILITY_IAM", "CAPABILITY_NAMED_IAM"], // TODO: do we need both?
  };

  await cloudformation.createStack(roleParams).promise();

  // TODO: decide if waitFor is necessary--if not, return createStack above
  return cloudformation
    .waitFor("stackCreateComplete", {
      StackName: stackName,
    })
    .promise();
};

export default createNewUserCreationStack;
