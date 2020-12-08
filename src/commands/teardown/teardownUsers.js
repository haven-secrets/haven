import getUserAccessKey from "../../aws/iam/users/getUserAccessKey.js";
import deleteUserAccessKey from "../../aws/iam/users/deleteUserAccessKey.js";
import deleteUser from "../../aws/iam/users/deleteUser.js";
import { adminUserName } from "../../utils/config.js";

const teardownUser = async (username) => {
  try {
    if (username === adminUserName) {
      return Promise.resolve();
    }

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
