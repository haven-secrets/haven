import teardownPolicies from "./teardown/teardownPolicies.js";
import teardownKeys from "./teardown/teardownKeys.js";
import teardownUser from "./teardown/teardownUser.js";
import teardownGroup from "./teardown/teardownGroup.js";
import deleteTable from "../aws/dynamodb/deleteTable.js";
import getAllUsers from "../aws/iam/users/getAllUsers.js";
import getAllGroups from "../aws/iam/groups/getAllGroups.js";

// TODO: ensure teardown succeeded (may need Promise.all)
// TODO: added a sleeper function like Maestro, not all the Policies get deleted
const teardown = async () => {
  const groupData = await getAllGroups();

  groupData.Groups.forEach((group) => {
    teardownGroup(group.GroupName);
  });

  const policyPromises = await teardownPolicies();

  const keyPromises = await teardownKeys();

  Promise.all([...policyPromises, ...keyPromises])
    .then((value) => console.log(value))
    .catch((e) => {
      console.log();
    });

  const userData = await getAllUsers();
  userData.Users.forEach((user) => {
    teardownUser(user.UserName, false);
  });

  try {
    await deleteTable("MoreSecrets");
  } catch (e) {
    console.log();
  }
};

export default teardown;
