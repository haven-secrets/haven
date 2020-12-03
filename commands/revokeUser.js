import listGroupsForUser from "../aws/iam/users/listGroupsForUser.js";
import revokeUserFromGroups from "./revokeUserFromGroups.js";
import getUserAccessKey from "../aws/iam/users/getUserAccessKey.js";
import deleteUserAccessKey from "../aws/iam/users/deleteUserAccessKey.js";
import deleteUser from "../aws/iam/users/deleteUser.js";
import deleteInlinePolicy from "../aws/iam/policies/deleteInlinePolicy";
import { listGroupsForUserPolicyName } from "../utils/config.js";

const revokeUser = async (username) => {
  try {
    const list = await listGroupsForUser(username);
    const groupNames = list.Groups.map(({ GroupName }) => GroupName);
    revokeUserFromGroups(username, ...groupNames);

    const accessKeyId = await getUserAccessKey(username);
    if (accessKeyId) await deleteUserAccessKey(accessKeyId, username);
    await deleteInlinePolicy(policyName, username);

    return await deleteUser(username);
  } catch (error) {
    console.log(`${error.code}: ${error.message}`);
    return error;
  }
};

export default revokeUser;
