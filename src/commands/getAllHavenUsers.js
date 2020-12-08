import getAllUsers from "../aws/iam/users/getAllUsers.js";
import { path } from "../utils/config.js";

const getAllHavenUsers = async () => {
  try {
    const havenUsers = await getAllUsers(path);
    console.log(havenUsers);
    return havenUsers.Users;
  } catch (error) {
    console.log(`${error.code}: ${error.message}`);
    return error;
  }
};

export default getAllHavenUsers;
