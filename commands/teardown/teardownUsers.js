import { iam } from "../../aws/services.js";
import getUserAccessKey from "../../aws/iam/users/getUserAccessKey.js";
import deleteUserAccessKey from "../../aws/iam/users/deleteUserAccessKey.js";
import deleteUser from "../../aws/iam/users/deleteUser.js";

const teardownUser = async (username) => {
  try {
    if (username === "LockitAdmin") {
      return Promise.resolve();
    }
    // The code below assumes a user will only have one access key, so our code
    // should never create a second access key.
    // TODO: check if user-creation code could ever create a second access key.
    const accessKeyId = await getUserAccessKey(username);
    if (accessKeyId) await deleteUserAccessKey(accessKeyId, username);

    return deleteUser(username);
  } catch (error) {
    console.log(error, error.stack);
  }
};

const teardownUsers = async (allUserData) => {
  const usernames = allUserData.Users.map((user) => user.UserName);
  const userDeletionPromises = usernames.map(teardownUser);
  return Promise.all(userDeletionPromises);
};

export default teardownUsers;
