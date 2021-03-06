import createFetchUserCredentialsPolicy from "../iam/policies/createFetchUserCredentialsPolicy.js";
import createLambdaRole from "../iam/roles/createLambdaRole.js";
import sleep from "../../utils/sleep.js";
import attachRolePolicy from "../iam/roles/attachRolePolicy.js";
import createNewUserCreationStack from "../cloudformation/createNewUserCreationStack.js";

const setupFetchUserCredentialsLambda = async (params) => {
  console.log(
    "Now setting up the ability to add new users (with 'haven addUser'). This will take a minute..."
  );

  const { Policy } = await createFetchUserCredentialsPolicy(
    params.lambdaPermisionsPolicyName, params.path
  );
  const { Role } = await createLambdaRole(params.roleName);

  await sleep(15000); // 15 seconds - this has errored out at least twice at 7s
  await attachRolePolicy(Policy.Arn, Role.RoleName);

  return createNewUserCreationStack(params);
};

export default setupFetchUserCredentialsLambda;
