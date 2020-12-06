import { createHavenIam } from "../../services.js";

const deleteInlinePolicy = (policyName, username) => {
  const params = {
    PolicyName: policyName + username,
    UserName: username,
  };

  return createHavenIam().deleteUserPolicy(params).promise();
};

export default deleteInlinePolicy;
