import listGroupsForUser from "./listGroupsForUser.js";
import removeUserFromGroup from "./removeUserFromGroup.js";
import { path } from "../../../utils/config.js";

const removeUserFromAllGroups = async (username, path, projectName) => {
  const list = await listGroupsForUser(username);
  let groups = list.Groups;

  if (projectName) {
    groups = groups.filter((group) => group.GroupName.startsWith(`${path}${projectName}`));
  }

  return groups.map(({ GroupName }) => removeUserFromGroup(GroupName, username));
};

export default removeUserFromAllGroups;
