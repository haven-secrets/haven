import getAllUsers from "../aws/iam/users/getAllUsers.js";
import detachUsersFromGroups from "./teardown/detachUsersFromGroups.js";
import teardownStacks from "./teardown/teardownStacks.js";
import teardownKey from "./teardown/teardownKey.js";
import teardownUsers from "./teardown/teardownUsers.js";

// TODO: teardown Lambda+role+2 policies used for new-user creation (after it's stackified)
// TODO: teardown adminHaven user (after it's stackified)
const teardown = async () => {
  const allUserData = await getAllUsers();

  await detachUsersFromGroups(allUserData);
  await teardownStacks();
  await teardownKey("LockitKey2");
  await teardownUsers(allUserData);
};

export default teardown;
