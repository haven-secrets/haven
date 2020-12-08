import { createHavenIam } from "../../aws/services.js";
import fetchHavenAccountInfo from "../../utils/fetchHavenAccountInfo.js";
import detachRolePolicy from "../../aws/iam/roles/detachRolePolicy.js";
import {
  lambdaPermisionsPolicyName,
  roleName,
  path,
} from "../../utils/config.js";

/* The newUserCreation stack (lambda and group-with-policy) will be deleted
	 by teardownStacks. This function deletes the lambda-role and its policy. */
const teardownNewUserCreation = async () => {
  const { accountNumber } = fetchHavenAccountInfo();
  const arn = `arn:aws:iam::${accountNumber}:policy/${path}/${lambdaPermisionsPolicyName}`;

  await detachRolePolicy(arn, roleName);
  await createHavenIam().deletePolicy({ PolicyArn: arn }).promise();
  return createHavenIam().deleteRole({ RoleName: roleName }).promise();
};

export default teardownNewUserCreation;
