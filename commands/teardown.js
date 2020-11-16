import teardownPolicies from "./teardown/teardownPolicies.js";
import teardownKeys from "./teardown/teardownKeys.js";
import teardownUser from "./teardown/teardownUser.js";
import teardownGroup from "./teardown/teardownGroup.js";
import deleteAllLockitTables from "../aws/dynamodb/deleteAllLockitTables.js";
import deleteTable from "../aws/dynamodb/deleteTable.js";
import getAllUsers from "../aws/iam/users/getAllUsers.js";
import getAllGroups from "../aws/iam/groups/getAllGroups.js";
import sleep from "../utils/sleep.js";
import listActiveLockitStacks from "../aws/cloudformation/listActiveLockitStacks.js";
import deleteStack from "../aws/cloudformation/deleteStack.js";

// TODO: ensure teardown succeeded (may need Promise.all)
// TODO: Refactor everything to be consistent in Promises awaits etc(do we return promises or will it be context specific?)
const teardown = async () => {
  const stackData = await listActiveLockitStacks();

  const stackPromises = stackData.map((stack) => {
    return deleteStack(stack.StackName);
  });

  await Promise.all(stackPromises);
  await sleep(2000);

  const keyPromises = await teardownKeys();
  const policyPromises = await teardownPolicies();

  Promise.all([...policyPromises, ...keyPromises])
    .then((value) => console.log(value))
    .catch((e) => {
      console.log();
    });

  const userData = await getAllUsers();
  userData.Users.forEach((user) => {
    teardownUser(user.UserName, false);
  });
};

export default teardown;
