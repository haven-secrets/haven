import listGroupsForUser from "./listGroupsForUser.js";
import removeUserFromGroup from "./removeUserFromGroup.js";

const removeUserFromGroups = async (username, projectName) => {
  const list = await listGroupsForUser(username);
  let groups;
  if (projectName) {
    groups = list.Groups.filter((group) =>
      group.GroupName.startsWith(`Lockit${projectName}`)
    );
  } else {
    groups = list.Groups;
  }
  return groups.map(({ GroupName }) =>
    removeUserFromGroup(GroupName, username)
  );
};

export default removeUserFromGroups;
