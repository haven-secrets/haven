import { iam } from "../../services.js";
import getAllGroupPolicies from "./getAllGroupPolicies.js";

const detachAllGroupPolicies = async (groupName) => {
  const allGroupPolicies = await getAllGroupPolicies(groupName);

  const policyArns = allGroupPolicies.AttachedPolicies.map((policy) => {
    const params = {
      GroupName: groupName,
      PolicyArn: policy.PolicyArn,
    };

    return iam.detachGroupPolicy(params).promise();
  });

  await Promise.all(policyArns);
};

export default detachAllGroupPolicies;
