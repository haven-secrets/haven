import { iam, username } from "../aws/services.js";

const listGroupsForUser = async () => {
  const params = {
    UserName: username,
  };

  const groups = await iam.listGroupsForUser(params).promise();
  const groupNames = groups.Groups.map((group) => group.GroupName);
  console.log(groupNames);
  return groupNames;
};

export default listGroupsForUser;
