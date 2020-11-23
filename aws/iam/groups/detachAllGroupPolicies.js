import { iam } from "../../services.js";
import getAllGroupPolicies from "./getAllGroupPolicies.js";

const detachAllGroupPolicies = async groupName => {
  const allGroupPolicies = await getAllGroupPolicies(groupName);

  const detachedGroupPolicyPromises = allGroupPolicies.AttachedPolicies.map(policy => {
    const params = {
      GroupName: groupName,
      PolicyArn: policy.PolicyArn,
    };

    return iam.detachGroupPolicy(params).promise();
  });

  return Promise.all(detachedGroupPolicyPromises); // TODO: is this the right thing to return down the chain?
};

export default detachAllGroupPolicies;