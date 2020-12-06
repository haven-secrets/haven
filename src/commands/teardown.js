import getAllUsers from "../aws/iam/users/getAllUsers.js";
import teardownNewUserCreation from "./teardown/teardownNewUserCreation.js";
import detachUsersFromGroups from "./teardown/detachUsersFromGroups.js";
import teardownStacks from "./teardown/teardownStacks.js";
import teardownKey from "./teardown/teardownKey.js";
import teardownUsers from "./teardown/teardownUsers.js";
import { path, keyAlias } from "../utils/config.js";
import deleteHavenAccountFile from "../utils/deleteHavenAccountFile.js";
import fetchHavenAccountInfo from "../utils/fetchHavenAccountInfo.js";
import teardownAdmin from "./teardown/teardownAdmin.js";

const teardown = async () => {
  const { accountNumber } = fetchHavenAccountInfo();

  const allUserData = await getAllUsers(path);

  console.log(
    "Tearing down the Lambda and other services used to enable 'haven addUser'..."
  );
  await teardownNewUserCreation();

  await detachUsersFromGroups(allUserData, path);

  console.log("Tearing down stacks... this will take a minute or two...");
  await teardownStacks();

  await teardownKey(keyAlias);

  await teardownUsers(allUserData);
  deleteHavenAccountFile();
  await teardownAdmin(accountNumber);
  console.log(
    "Teardown complete. All CloudFormation, IAM, DynamoDB, Lambda entities" +
      " deleted, and the Haven KMS key has been scheduled for deletion in 7 days."
  );
};

export default teardown;
