import { iam } from "../../services.js";

const deleteInlinePolicy = (policyName, username) => {
  const params = {
    PolicyName: policyName + username,
    UserName: username,
  };

  return iam.deleteUserPolicy(params).promise();
};

export default deleteInlinePolicy;
