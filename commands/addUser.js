import createUser from "../aws/iam/users/createUser.js";
import createAccessKey from "../aws/iam/users/createAccessKey.js";
import addUserToGroup from "../aws/iam/users/addUserToGroup.js";
import { v4 as uuidv4 } from 'uuid';

// TODO: discuss which hardcoded strings to remove

const createTemporaryUser = async (permanentUsername) => {
  const temporaryUsername = "havenTemporaryUser" + uuidv4();
  const temporaryUserData = await createUser(temporaryUsername, [{ Key: "permanentUsername", Value: permanentUsername }]);
  const temporaryAccessKeyData = await createAccessKey(temporaryUserData.User.UserName);

  const {
    AccessKeyId: temporaryAccessKeyId,
    SecretAccessKey: temporarySecretAccessKey,
  } = temporaryAccessKeyData.AccessKey;

  addUserToGroup("temporaryUsers", temporaryUsername);

  // TODO: determine how to return the temporary username + keys and when the user will need them
}

const createPermanentUser = async (permanentUsername, groupNames) => {
  await createUser(permanentUsername);

  if (groupNames.length > 0) {
    groupNames.forEach(groupName => addUserToGroup(groupName, permanentUsername));
  }
}

const addUser = async (permanentUsername, ...groupNames) => {
  try {
    createTemporaryUser(permanentUsername);
    createPermanentUser(permanentUsername, groupNames);
  } catch (error) {
    console.log(error, error.stack);
  }
};

export default addUser;