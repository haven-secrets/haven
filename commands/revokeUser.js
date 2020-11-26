import listGroupsForUser from "../aws/iam/users/listGroupsForUser.js";
import revokeUserFromGroups from "./revokeUserFromGroups.js";
import getUserAccessKey from "../aws/iam/users/getUserAccessKey.js";
import deleteUserAccessKey from "../aws/iam/users/deleteUserAccessKey.js";
import deleteUser from "../aws/iam/users/deleteUser.js";

const revokeUser = async (username) => {
  const list = await listGroupsForUser(username);
  const groupNames = list.Groups.map(({ GroupName }) => GroupName);
  revokeUserFromGroups(username, ...groupNames)

  const accessKeyId = await getUserAccessKey(username);
  if (accessKeyId) await deleteUserAccessKey(accessKeyId, username);

  await deleteUser(username); // TODO: add a return value & confirm we need all these awaits
};

export default revokeUser;
