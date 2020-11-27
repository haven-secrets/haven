import getAllUsers from "../aws/iam/users/getAllUsers.js";
import { path } from "../utils/config.js";

const getAllHavenUsers = async (path) => {
  const havenUsers = await getAllUsers(path);
  console.log(havenUsers);
  return havenUsers;
};

export default getAllHavenUsers;
