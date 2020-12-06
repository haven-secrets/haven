import AWS from "aws-sdk";
import { adminUserName, path } from "../../utils/config.js";

const teardownAdmin = async (accountNumber) => {
  var credentials = new AWS.SharedIniFileCredentials({
    profile: "default",
  });
  AWS.config.credentials = credentials;

  const adminPolicyArn = `arn:aws:iam::${accountNumber}:policy/${path}/${adminUserName}`;
  const iam = new AWS.IAM();

  const detachPolicyParams = {
    PolicyArn: adminPolicyArn,
    UserName: adminUserName,
  };
  await iam.detachUserPolicy(detachPolicyParams).promise();

  const deletePolicyParams = {
    PolicyArn: adminPolicyArn,
  };
  await iam.deletePolicy(deletePolicyParams).promise();

  const userAccessKeyparams = {
    UserName: adminUserName,
  };

  const keyList = await iam.listAccessKeys(userAccessKeyparams).promise();
  const accessKeyId = keyList.AccessKeyMetadata[0]?.AccessKeyId;

  const deleteAccessKeyParams = {
    AccessKeyId: accessKeyId,
    UserName: adminUserName,
  };

  await iam.deleteAccessKey(deleteAccessKeyParams).promise();

  const deleteUserParams = {
    UserName: adminUserName,
  };
  return await iam.deleteUser(deleteUserParams).promise();
};

export default teardownAdmin;
