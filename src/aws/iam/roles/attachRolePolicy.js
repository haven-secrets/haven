import { createHavenIam } from "../../services.js";

const attachRolePolicy = (policyArn, roleName) => {
  const params = {
    PolicyArn: policyArn,
    RoleName: roleName,
  };

  return createHavenIam().attachRolePolicy(params).promise();
};

export default attachRolePolicy;
