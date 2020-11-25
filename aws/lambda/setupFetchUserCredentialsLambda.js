import createFetchUserCredentialsPolicy from "../iam/policies/createFetchUserCredentialsPolicy.js";
import createLambdaRole from "../iam/roles/createLambdaRole.js";
import sleep from "../../utils/sleep.js";
import attachRolePolicy from "../iam/roles/attachRolePolicy.js";
import createNewUserCreationStack from "../cloudformation/createNewUserCreationStack.js";

const setupFetchUserCredentialsLambda = async (params) => {
  console.log("Now setting up the ability to add new users (with 'haven addUser'). This will take a minute...");

  // TODO: try attaching policy inline (see Assume... param in SDK for iam.createRole())
  const { Policy } = await createFetchUserCredentialsPolicy(params.lambdaPermisionsPolicyName);
  const { Role } = await createLambdaRole(params.roleName);

  await sleep(15000); // 15 seconds - this has errored out at least twice at 7s
  await attachRolePolicy(Policy.Arn, Role.RoleName);
  
  return createNewUserCreationStack(params);
};

export default setupFetchUserCredentialsLambda;
