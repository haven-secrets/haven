import { createHavenIam } from "../aws/services.js";
import fetchHavenAccountInfo from "../utils/fetchHavenAccountInfo.js";

const listGroupsForUser = async (username) => {
  if (!username) username = fetchHavenAccountInfo()?.username;
  const params = {
    UserName: username,
  };

  const groups = await createHavenIam().listGroupsForUser(params).promise();
  const groupNames = groups.Groups.map((group) => group.GroupName);
  return groupNames;
};

export default listGroupsForUser;
