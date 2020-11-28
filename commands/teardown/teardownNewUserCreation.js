import { iam, accountNumber } from "../../aws/services.js";
import detachRolePolicy from "../../aws/iam/roles/detachRolePolicy.js";
import {
  lambdaPermisionsPolicyName,
  roleName,
  path,
} from "../../utils/config.js";

/* The newUserCreation stack (lambda and group-with-policy) will be deleted
	 by teardownStacks. This function deletes the lambda-role and its policy. */
const teardownNewUserCreation = async () => {
  const arn = `arn:aws:iam::${accountNumber}:policy/${path}/${lambdaPermisionsPolicyName}`;

  await detachRolePolicy(arn, roleName);
  await iam.deletePolicy({ PolicyArn: arn }).promise();
  return iam.deleteRole({ RoleName: roleName }).promise();
};

export default teardownNewUserCreation;
