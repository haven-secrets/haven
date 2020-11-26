import listGroupsForUser from "./listGroupsForUser.js";
import removeUserFromGroup from "./removeUserFromGroup.js";

const removeUserFromAllGroups = async (username) => {
  const list = await listGroupsForUser(username);
  return list.Groups.map(({ GroupName }) => removeUserFromGroup(GroupName, username));
};

export default removeUserFromAllGroups;
