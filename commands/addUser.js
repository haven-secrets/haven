import createUser from "../aws/iam/users/createUser.js";
import createAccessKey from "../aws/iam/users/createAccessKey.js";
import addUserToGroups from "./addUserToGroups.js";
import { v4 as uuidv4 } from 'uuid';

// TODO: discuss which hardcoded strings to remove

const loggingGroup = "LockitLogGroup"; //TODO remove hardcoding

const createTemporaryUser = async (permanentUsername) => {
  const temporaryUsername = "LockitTemporaryUser" + uuidv4();
  const temporaryUserData = await createUser(temporaryUsername, [{ Key: "permanentUsername", Value: permanentUsername }]);
  const temporaryAccessKeyData = await createAccessKey(temporaryUserData.User.UserName);

  const {
    AccessKeyId: temporaryAccessKeyId,
    SecretAccessKey: temporarySecretAccessKey,
  } = temporaryAccessKeyData.AccessKey;

  addUserToGroups(temporaryUsername, "temporaryUsers");
  // TODO: determine how to return the temporary username + keys and when the user will need them
  console.log({ temporaryUsername, temporaryAccessKeyId, temporarySecretAccessKey });
}

const createPermanentUser = async (permanentUsername, groupNames) => {
  await createUser(permanentUsername);
  addUserToGroups(permanentUsername, ...groupNames, loggingGroup);
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
