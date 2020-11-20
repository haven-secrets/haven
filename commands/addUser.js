import createUser from "../aws/iam/users/createUser.js";
import createAccessKey from "../aws/iam/users/createAccessKey.js";
import addUserToGroup from "../aws/iam/users/addUserToGroup.js";
// import temporaryCredentialAccessPolicy from "../aws/iam/policies/temporaryCredentialAccessPolicy.js";
// import attachPolicyToTemporaryUser from "../aws/iam/users/attachPolicyToTemporaryUser.js";
import { v4 as uuidv4 } from 'uuid';

// TODO:
// add temporary user to temporaryUsersGroup w/ the policy for invoking the lambda
// add functionality for adding permanent user to multiple groups w/ their respective policies

const addUser = async (username, groupName) => {
  try {
    const tags = [
      {
        Key: "permanentUsername",
        Value: username,
      }
    ];

    const temporaryUsername = "havenTemporaryUser" + uuidv4();
    const temporaryUserData = await createUser(temporaryUsername, tags);
    const temporaryAccessKeyData = await createAccessKey(temporaryUserData.User.UserName);
 
    const {
      AccessKeyId: temporaryAccessKeyId,
      SecretAccessKey: temporarySecretAccessKey,
    } = temporaryAccessKeyData.AccessKey;

    console.log({ temporaryUsername, temporaryAccessKeyId, temporarySecretAccessKey });

    const userData = await createUser(username);

    if (groupName) {
      const groupData = await addUserToGroup(groupName, userData.User.UserName);
      console.log(groupData);
    }

    // const policy = await temporaryCredentialAccessPolicy(temporaryAccessKeyId, policyName);
    // await attachPolicyToTemporaryUser(username + "Temporary", policyName);
  } catch (error) {
    console.log(error, error.stack);
  }
};

export default addUser;