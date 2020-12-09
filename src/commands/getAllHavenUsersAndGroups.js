import { createHavenIam } from "../aws/services.js";
import getAllUsers from "../aws/iam/users/getAllUsers.js";
import { path } from "../utils/config.js";

const extractInfoFromGroupName = (groupName) => {
  const groupRegExp = /HavenSecrets(?<project>.*)Proj(?<env>(Dev|Prod|Stg))(?<permission>.*)Group/
  const groupInfo = groupName.match(groupRegExp).groups;
  return groupInfo.project + '/' + groupInfo.env + '/' + groupInfo.permission
}

const getAllHavenUsersAndGroups = async () => {
  try {
    const havenUsers = await getAllUsers(path);
    const filteredUsers = havenUsers.Users.filter(userData => !/HavenSecretsTemporaryUser/.test(userData.UserName))
    const havenIam = createHavenIam();
    const groupPromises = filteredUsers.map(async (user) => (
      await havenIam.listGroupsForUser({UserName: user.UserName}).promise()
    ))
    const allGroupData = await Promise.all(groupPromises)

    const formattedGroups = allGroupData.map((groupData) => {
      return groupData.Groups.reduce((acc, groupObject) => {
        if (!/HavenSecretsLogGroup/.test(groupObject.GroupName)){
          acc.push(extractInfoFromGroupName(groupObject.GroupName));
        }
        return acc;
      }, [])
    })

    return formattedGroups.map((groups, i) => {
      return {
        userName: filteredUsers[i].UserName,
        groups,
      }
    })

  } catch (error) {
    console.log(`${error.code}: ${error.message}`);
    return error;
  }
};

export default getAllHavenUsersAndGroups;
