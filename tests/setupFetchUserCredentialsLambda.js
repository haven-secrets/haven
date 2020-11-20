import { lambda } from "../aws/services.js";
import { readFileSync } from "fs";
// creates a specific policy for fetching user credentials
import createFetchUserCredentialsPolicy from "./createFetchUserCredentialsPolicy.js";
// creates generic role for lambdas
import createLambdaRole from "./createLambdaRole.js";
// attachs given policy to given role
import attachRolePolicy from "./attachRolePolicy.js";
import sleep from "../utils/sleep.js";

import createInvokeLambdaPolicy from "./createInvokeLambdaPolicy.js";
import createGroup from "../aws/iam/groups/createGroup.js";
import attachGroupPolicy from "../aws/iam/groups/attachGroupPolicy.js";

/*
TODO:
- Teardown Lambda, role, temporaryUser group, and related policies
*/

const createFetchUserCredentialsLambda = async () => {
  const { Policy } = await createFetchUserCredentialsPolicy();
  const { Role } = await createLambdaRole();

  await sleep(7000); // this errored out once
  await attachRolePolicy(Policy.Arn, Role.RoleName);

  const params = {
    Code: {
      ZipFile: readFileSync('tests/testLambda.zip'), // TODO: how are we providing the files?
    },
    FunctionName: 'fetchUserCredentials',
    Handler: 'index.handler',
    Role: Role.Arn,
    Runtime: "nodejs12.x", // TODO: do we need v12?
  };

  return lambda.createFunction(params).promise();
}

const setupFetchUserCredentialsLambda = async () => {
  const { FunctionName } = await createFetchUserCredentialsLambda();
  const { Group } = await createGroup("temporaryUsers");
  const { Policy } = await createInvokeLambdaPolicy(FunctionName);
  attachGroupPolicy(Group.GroupName, Policy.PolicyName);
}

export default setupFetchUserCredentialsLambda;