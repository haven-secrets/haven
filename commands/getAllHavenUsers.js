import getAllUsers from "../aws/iam/users/getAllUsers.js";

const getAllHavenUsers = async () => {
  const havenUsers = await getAllUsers();
  console.log(havenUsers);
  return havenUsers;
};

export default getAllHavenUsers;
