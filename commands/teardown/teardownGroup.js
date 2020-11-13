import { iam } from "../../aws/services.js";
import deleteGroup from "../../aws/iam/groups/deleteGroup.js";
import detachAllGroupPolicies from "../../aws/iam/groups/detachAllGroupPolicies.js";

const teardownGroup = async (groupName) => {
  const policies = await detachAllGroupPolicies(groupName);
  
  await deleteGroup(groupName);
};

export default teardownGroup;
