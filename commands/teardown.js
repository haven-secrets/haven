import getAllUsers from "../aws/iam/users/getAllUsers.js";
import teardownNewUserCreation from "./teardown/teardownNewUserCreation.js";
import detachUsersFromGroups from "./teardown/detachUsersFromGroups.js";
import teardownStacks from "./teardown/teardownStacks.js";
import teardownKey from "./teardown/teardownKey.js";
import teardownUsers from "./teardown/teardownUsers.js";

// TODO: teardown adminHaven user (after it's stackified)
const teardown = async () => {
  try {
    const allUserData = await getAllUsers();

    console.log("Tearing down the Lambda and other services used to enable 'haven addUser'...");
    await teardownNewUserCreation();

    await detachUsersFromGroups(allUserData);

    console.log("Tearing down stacks... this will take a minute or two...");
    await teardownStacks();

    await teardownKey("HavenSecretsKey");

    await teardownUsers(allUserData);

    console.log("Teardown complete. All CloudFormation, IAM, DynamoDB, Lambda entities" +
    			" deleted, and the Haven KMS key has been scheduled for deletion in 7 days.");
  } catch (error) {
    console.log(`${error.code}: ${error.message}`);
    return error;
  }
};

export default teardown;
