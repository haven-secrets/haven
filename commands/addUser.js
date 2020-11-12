import createUser from "../aws/iam/users/createUser.js";
import createAccessKey from "../aws/iam/users/createAccessKey.js";
import addUserToGroup from "../aws/iam/users/addUserToGroup.js";

const addUser = async (username, groupName) => {
  try {
    // console logs are for our own purposes
    const userData = await createUser(username);
    console.log(userData);

    const accessKeyData = await createAccessKey(userData.User.UserName);
    console.log(accessKeyData);

    // check if a group is passed in as an argument
    if (groupName) {
      const groupData = await addUserToGroup(groupName, userData.User.UserName);
      console.log(groupData);
    }
  } catch (error) {
    console.log(error, error.stack);
  }
};

export default addUser;
