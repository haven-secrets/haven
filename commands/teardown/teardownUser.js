import { iam } from "../../aws/services.js";

const username = "testuser";
const groupName = "testdevs";

const removeUserFromGroup = (groupName, username) => {
  const params = {
    GroupName: groupName, 
    UserName: username,
  };

  return iam.removeUserFromGroup(params).promise();
}

const deleteAccessKey = (accessKeyId, username) => {
  const params = {
    AccessKeyId: accessKeyId,
    UserName: username,
  };

  return iam.deleteAccessKey(params).promise();
};

const deleteUser = username => {
  const params = {
    UserName: username,
  };

  return iam.deleteUser(params).promise();
};

const teardownUser = async (username=username, groupName=groupName) => {
  try {
    // console logs are for our own purposes
    // check if a group is passed in as an argument
    if (groupName) {
      const groupData = await removeUserFromGroup(groupName, username);
      console.log(groupData);
    }

    const accessKeyId = "HARDCODED";
    const accessKeyData = await deleteAccessKey(accessKeyId, username);
    console.log(accessKeyData);

    const userData = await deleteUser(username);
    console.log(userData);
  } catch (error) {
    console.log(error, error.stack);
  }
};

export default teardownUser;