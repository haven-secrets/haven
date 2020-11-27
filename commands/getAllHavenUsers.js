import getAllUsers from "../aws/iam/users/getAllUsers.js";

const getAllHavenUsers = async () => {
  try {
    const havenUsers = await getAllUsers();
    console.log(havenUsers);
    return havenUsers;
  } catch (error) {
    console.log(`${error.code}: ${error.message}`);
    return error;
  }
};

export default getAllHavenUsers;
