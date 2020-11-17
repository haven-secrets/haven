import createUser from "../aws/iam/users/createUser.js";
import createAccessKey from "../aws/iam/users/createAccessKey.js";
import addUserToGroup from "../aws/iam/users/addUserToGroup.js";
import putItemInCredentialTable from "../aws/dynamodb/putItemInCredentialTable.js";
import temporaryCredentialAccessPolicy from "../aws/iam/policies/temporaryCredentialAccessPolicy.js";
import attachPolicyToTemporaryUser from "../aws/iam/users/attachPolicyToTemporaryUser.js";

const addUser = async (username, groupName) => {
  try {
    // console logs are for our own purposes
    const temporaryUserData = await createUser(username + "Temporary");
    const temporaryAccessKeyData = await createAccessKey(
      temporaryUserData.User.UserName
    );
    const {
      AccessKeyId: temporaryAccessKeyId,
      SecretAccessKey: temporarySecretAccessKey,
    } = temporaryAccessKeyData.AccessKey;

    console.log({ temporaryAccessKeyId, temporarySecretAccessKey });

    const userData = await createUser(username);
    const accessKeyData = await createAccessKey(userData.User.UserName);
    const { AccessKeyId, SecretAccessKey } = accessKeyData.AccessKey;
    const policyName = `${username}TemporaryPolicy`;

    if (groupName) {
      const groupData = await addUserToGroup(groupName, userData.User.UserName);
      console.log(groupData);
    }

    await putItemInCredentialTable(
      temporaryAccessKeyId,
      AccessKeyId,
      SecretAccessKey,
      username
    );

    const policy = await temporaryCredentialAccessPolicy(temporaryAccessKeyId, policyName);
    console.log(policy);
    await attachPolicyToTemporaryUser(username + "Temporary", policyName);
  } catch (error) {
    console.log(error, error.stack);
  }
};

export default addUser;
