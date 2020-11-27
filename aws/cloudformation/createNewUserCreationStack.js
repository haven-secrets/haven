import createLambda from "../../utils/createLambda.js";
import createStack from "./createStack.js";

const createNewUserCreationStack = (params) => {
  const stackName = "HavenSecretsNewUserCreationStack"; // TODO: load this from a config file
  const template = createLambda(params);
  createStack(stackName, template);
};

export default createNewUserCreationStack;
