import listGroupsForUser from "./listGroupsForUser.js";
import removeUserFromGroup from "./removeUserFromGroup.js";

const removeUserFromAllGroups = async (username, projectName) => {
  const list = await listGroupsForUser(username);
  let groups = list.Groups;

  if (projectName) {
    groups = groups.filter((group) => group.GroupName.startsWith(`HavenSecrets${projectName}`));
  }

  return groups.map(({ GroupName }) => removeUserFromGroup(GroupName, username));
};

export default removeUserFromAllGroups;
