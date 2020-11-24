import { iam } from "../../aws/services.js";
import removeUserFromAllGroups from "../../aws/iam/users/removeUserFromAllGroups.js";
import getUserAccessKey from "../../aws/iam/users/getUserAccessKey.js";
import deleteUserAccessKey from "../../aws/iam/users/deleteUserAccessKey.js";
import deleteUser from "../../aws/iam/users/deleteUser.js";

const teardownUser = async (username) => {
  try {
    const groupPromises = await removeUserFromAllGroups(username); // TODO: do we have to remove users from groups if the groups have already been deleted?
    await Promise.all(groupPromises);

    const accessKeyId = await getUserAccessKey(username);
    if (accessKeyId) await deleteUserAccessKey(accessKeyId, username);

    await deleteUser(username); // TODO: add a return value & confirm we need all these awaits
  } catch (error) {
    console.log(error, error.stack);
  }
};

export default teardownUser;
