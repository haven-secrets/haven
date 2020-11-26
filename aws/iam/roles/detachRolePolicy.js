import { iam } from "../../services.js";

const detachRolePolicy = (policyArn, roleName) => {
  const params = {
    PolicyArn: policyArn,
    RoleName: roleName,
  };

  return iam.detachRolePolicy(params).promise();
};

export default detachRolePolicy;