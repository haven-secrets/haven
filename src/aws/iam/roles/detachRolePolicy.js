import { createHavenIam } from "../../services.js";

const detachRolePolicy = (policyArn, roleName) => {
  const params = {
    PolicyArn: policyArn,
    RoleName: roleName,
  };

  return createHavenIam().detachRolePolicy(params).promise();
};

export default detachRolePolicy;
