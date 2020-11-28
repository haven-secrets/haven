import createLambda from "../../utils/createLambda.js";
import createStack from "./createStack.js";

const createNewUserCreationStack = (params) => {
  const template = createLambda(params);
  createStack(params.newUserCreationStackName, template);
};

export default createNewUserCreationStack;
