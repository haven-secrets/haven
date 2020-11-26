import { iam } from "../../services.js";

const attachRolePolicy = (policyArn, roleName) => {
  const params = {
    PolicyArn: policyArn,
    RoleName: roleName,
  };

  return iam.attachRolePolicy(params).promise();
};

export default attachRolePolicy;
