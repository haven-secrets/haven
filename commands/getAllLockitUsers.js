import getAllUsers from "../aws/iam/users/getAllUsers.js";

const getAllLockitUsers = async () => {
  const lockitUsers = await getAllUsers("/Lockit/");
  console.log(lockitUsers);
  return lockitUsers;
};

export default getAllLockitUsers;
