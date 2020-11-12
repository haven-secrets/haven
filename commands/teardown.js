import teardownPolicies from "./teardown/teardownPolicies.js";
import teardownKeys from "./teardown/teardownKeys.js";
import teardownUser from "./teardown/teardownUser.js";
import deleteTable from "../aws/dynamodb/deleteTable.js";
import getAllUsers from "../aws/iam/users/getAllUsers.js";

// TODO: ensure teardown succeeded (may need Promise.all)
const teardown = async () => {
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
