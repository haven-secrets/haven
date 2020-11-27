import { iam, accountNumber } from "../../aws/services.js";
import detachRolePolicy from "../../aws/iam/roles/detachRolePolicy.js";

const lambdaPermisionsPolicyName = "HavenSecretsLambdaRolePolicy"; // TODO: load this from a config file
const roleName = "HavenSecretsLambdaRole"; // TODO: ditto
const path = "HavenSecrets"; // TODO: ditto

/* The newUserCreation stack (lambda and group-with-policy) will be deleted
	 by teardownStacks. This function deletes the lambda-role and its policy. */
const teardownNewUserCreation = async () => {
  const arn = `arn:aws:iam::${accountNumber}:policy/${path}/${lambdaPermisionsPolicyName}`;

  await detachRolePolicy(arn, roleName);
  await iam.deletePolicy({ PolicyArn: arn }).promise();
  return iam.deleteRole({ RoleName: roleName }).promise();
};

export default teardownNewUserCreation;
