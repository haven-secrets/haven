import teardownPolicies from "./teardown/teardownPolicies.js";
import teardownKeys from "./teardown/teardownKeys.js";
import teardownUser from "./teardown/teardownUser.js";
import deleteTable from "../aws/dynamodb/deleteTable.js";

// TODO: ensure teardown succeeded (may need Promise.all)

const policyPromises = await teardownPolicies();
const keyPromises = await teardownKeys();

Promise.all([...policyPromises, ...keyPromises]).then((value) =>
  console.log(value)
);

teardownUser(); // TODO: teardown ALL users

deleteTable("MoreSecrets");
