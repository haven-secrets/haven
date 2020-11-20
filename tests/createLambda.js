/*
TODO:
In setup, we'll create temporaryUsersGroup,
so we need to create a policy for this created lambda that will be attached to that group
*/
import { lambda } from "../aws/services.js";
import { readFileSync } from "fs";
// creates a specific policy for fetching user credentials
import createFetchUserCredentialsPolicy from "./createFetchUserCredentialsPolicy.js";
// creates generic role for lambdas
import createLambdaRole from "./createLambdaRole.js";
// attachs given policy to given role
import attachRolePolicy from "./attachRolePolicy.js";
import sleep from "../utils/sleep.js";

const createFetchUserCredentialsLambda = async () => {
  const { Policy } = await createFetchUserCredentialsPolicy();
  const { Role } = await createLambdaRole();

  await sleep(7000);
  await attachRolePolicy(Policy.Arn, Role.RoleName);

  const params = {
    Code: {
      ZipFile: readFileSync('tests/testLambda.zip'), // TODO: how are we providing the files?
    },
    FunctionName: 'fetchUserCredentials2',
    Handler: 'index.handler',
    Role: Role.Arn,
    Runtime: "nodejs12.x", // TODO: do we need v12?
  };

  return lambda.createFunction(params).promise();
}

export default createFetchUserCredentialsLambda;