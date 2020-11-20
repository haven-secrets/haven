/*
TODO:
In setup, we'll create temporaryUsersGroup,
so we need to create a policy for this created lambda that will be attached to that group
*/
import { lambda } from "../aws/services.js";
import { readFileSync } from "fs";
import createFetchCredentialsRoleForLambda from "./createFetchCredentialsRoleForLambda.js";

const createFetchUserCredentialsLambda = async () => {
  const roleData = await createFetchCredentialsRoleForLambda();

  const params = {
    Code: {
      ZipFile: readFileSync('tests/testLambda.zip'), // TODO: how are we providing the files?
    },
    FunctionName: 'fetchUserCredentials',
    Handler: 'index.handler',
    Role: roleData.Role.Arn,
    Runtime: "nodejs12.x", // TODO: do we need v12?
  };

  return lambda.createFunction(params).promise();
}

export default createFetchUserCredentialsLambda;