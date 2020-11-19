import { iam } from "../../aws/services.js";
import getUserAccessKey from "../../aws/iam/users/getUserAccessKey.js";

const username = "testuser";
const groupName = "testdevs";

const removeUserFromGroups = async (username) => {
  const groups = await iam.listGroupsForUser({ UserName: username }).promise();
  // console.log('groups: ', groups);
  return groups.Groups.map(group => {
    const params = {
      GroupName: group.groupName,
      UserName: username,
    };
};

const deleteAccessKey = (accessKeyId, username) => {
  const params = {
    AccessKeyId: accessKeyId,
    UserName: username,
  };

  return iam.deleteAccessKey(params).promise();
};

const deleteUser = (username) => {
  const params = {
    UserName: username,
  };

  return iam.deleteUser(params).promise();
};

const teardownUser = async (username) => {
  try {
    // console logs are for our own purposes
    const groupPromises = await removeUserFromGroups(username);
    await Promise.all(groupPromises);

    const accessKeyId = await getUserAccessKey(username); 
    const accessKeyData = await deleteAccessKey(accessKeyId, username);

    const userData = await deleteUser(username);
  } catch (error) {
    console.log(error, error.stack);
  }
};

// teardownUser('testUser1'); // HARDCODED USERNAME

export default teardownUser;
