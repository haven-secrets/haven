import { lambda } from "../services.js";
import { readFileSync } from "fs";
import sleep from "../../utils/sleep.js";
import createFetchUserCredentialsPolicy from "../iam/policies/createFetchUserCredentialsPolicy.js";
import createLambdaRole from "../iam/roles/createLambdaRole.js";
import attachRolePolicy from "../iam/roles/attachRolePolicy.js";
import createGroup from "../iam/groups/createGroup.js";
import createInvokeLambdaPolicy from "../iam/policies/createInvokeLambdaPolicy.js";
import attachGroupPolicy from "../iam/groups/attachGroupPolicy.js";

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
      ZipFile: readFileSync('aws/lambda/newUserCreation.zip'), // TODO: how are we providing the files?
    },
    FunctionName: 'fetchUserCredentials2',
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
