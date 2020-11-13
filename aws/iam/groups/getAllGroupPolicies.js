import { iam } from "../../services.js";

const getAllGroupPolicies = (groupName) => {
  const params = {
    GroupName: groupName,
  };
  return iam.listAttachedGroupPolicies(params).promise();
};

export default getAllGroupPolicies;
