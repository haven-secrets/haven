import getAllUsers from "../aws/iam/users/getAllUsers.js";

const getAllLockitUsers = async () => {
  const lockitUsers = await getAllUsers();
  console.log(lockitUsers);
  return lockitUsers;
};

export default getAllLockitUsers;
