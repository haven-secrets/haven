import teardownPolicies from "./teardown/teardownPolicies.js";
import teardownKeys from "./teardown/teardownKeys.js";
import teardownUser from "./teardown/teardownUser.js";
import teardownGroup from "./teardown/teardownGroup.js";
import deleteAllLockitTables from "../aws/dynamodb/deleteAllLockitTables.js";
import deleteTable from "../aws/dynamodb/deleteTable.js";
import getAllUsers from "../aws/iam/users/getAllUsers.js";
import getAllGroups from "../aws/iam/groups/getAllGroups.js";
import sleep from "../utils/sleep.js";

// TODO: ensure teardown succeeded (may need Promise.all)
// TODO: Refactor everything to be consistent in Promises awaits etc(do we return promises or will it be context specific?)
const teardown = async () => {
  const groupData = await getAllGroups();

  groupData.Groups.forEach(async (group) => {
    await teardownGroup(group.GroupName);
  });
  await sleep(2000);
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

  // try {
  //   getAllLockitTables().forEach((table) => {
  //     deleteTable(table);
  //   });
  // } catch (e) {
  //   console.log();
  // }
  deleteAllLockitTables();
};

export default teardown;
