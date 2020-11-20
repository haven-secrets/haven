const AWS = require('aws-sdk');
const iam = new AWS.IAM();

const removeUserFromGroups = async (username) => {
  const groups = await iam.listGroupsForUser({ UserName: username }).promise();

  return groups.Groups.map(group => {
    const params = {
      GroupName: group.GroupName,
      UserName: username,
    };

    return iam.removeUserFromGroup(params).promise();
  });
};

const getAccessKey = (username) => {
  const params = {
    UserName: username,
  };

  return iam
    .listAccessKeys(params)
    .promise()
    .then((data) => {
      if (data.AccessKeyMetadata.length > 0) {
        return data.AccessKeyMetadata[0].AccessKeyId;
      }
    });
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
    const groupPromises = await removeUserFromGroups(username);
    await Promise.all(groupPromises);

    const accessKeyId = await getAccessKey(username);
    if (accessKeyId) await deleteAccessKey(accessKeyId, username);

    await deleteUser(username);
  } catch (error) {
    console.log(error, error.stack);
  }
};

module.exports = teardownUser;