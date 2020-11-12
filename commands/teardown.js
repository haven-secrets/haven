import teardownPolicies from "./teardown/teardownPolicies.js";
import teardownKeys from "./teardown/teardownKeys.js";
import teardownUser from "./teardown/teardownUser.js";
import deleteTable from "../aws/dynamodb/deleteTable.js";

// TODO: ensure teardown succeeded (may need Promise.all)
const teardown = async () => {
  const policyPromises = await teardownPolicies();

  const keyPromises = await teardownKeys();

  Promise.all([...policyPromises, ...keyPromises])
    .then((value) => console.log(value))
    .catch((e) => {
      console.log();
    });

  teardownUser("testUser1", false); // TODO: teardown ALL users
  // teardownUser("testUser2", false); // TODO: teardown ALL users

  try {
    await deleteTable("MoreSecrets");
  } catch (e) {
    console.log();
  }
};

export default teardown;
