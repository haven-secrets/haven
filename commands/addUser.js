import createUser from "../aws/iam/users/createUser.js";
import createAccessKey from "../aws/iam/users/createAccessKey.js";
import addUserToGroups from "./addUserToGroups.js";
import createHavenAccountFile from "../utils/createHavenAccountFile.js";
import addInlinePolicyToUser from "../aws/iam/policies/addInlinePolicyToUser.js";
import { accountNumber, region } from "../aws/services.js";
import { v4 as uuidv4 } from "uuid";
import {
  temporaryGroupName,
  loggingGroupName,
  temporaryUsername,
  path,
  listGroupsForUserPolicyName,
} from "../utils/config.js";

const createTemporaryUser = async (permanentUsername) => {
  const temporaryUniqueUsername = temporaryUsername + uuidv4();
  const temporaryUserData = await createUser(temporaryUniqueUsername, path, [
    { Key: "permanentUsername", Value: permanentUsername },
  ]);
  const temporaryAccessKeyData = await createAccessKey(
    temporaryUserData.User.UserName
  );

  const {
    AccessKeyId: temporaryAccessKeyId,
    SecretAccessKey: temporarySecretAccessKey,
  } = temporaryAccessKeyData.AccessKey;

  addUserToGroups(temporaryUniqueUsername, temporaryGroupName);

  createHavenAccountFile(
    accountNumber,
    region,
    temporaryUniqueUsername,
    temporaryAccessKeyId,
    temporarySecretAccessKey,
    "TemporaryUser",
    process.cwd() /* current working directory (by default) */
  );
};

const createPermanentUser = async (permanentUsername, groupNames) => {
  await createUser(permanentUsername, path);
  await addInlinePolicyToUser(
    listGroupsForUserPolicyName,
    permanentUsername,
    path
  );
  addUserToGroups(permanentUsername, ...groupNames, loggingGroupName);
};

const addUser = async (permanentUsername, ...groupNames) => {
  try {
    createTemporaryUser(permanentUsername);
    createPermanentUser(permanentUsername, groupNames);
  } catch (error) {
    console.log(`${error.code}: ${error.message}`);
    return error;
  }
};

export default addUser;
