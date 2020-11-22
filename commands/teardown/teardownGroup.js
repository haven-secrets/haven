import detachAllGroupPolicies from "../../aws/iam/groups/detachAllGroupPolicies.js";
import deleteGroup from "../../aws/iam/groups/deleteGroup.js";

const teardownGroup = async groupName => {
  await detachAllGroupPolicies(groupName);
  return deleteGroup(groupName);
};

export default teardownGroup;