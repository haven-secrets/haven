import getAccountId from "../../utils/getAccountId.js";

const createHavenAdmin = async (AWS) => {
  const iam = new AWS.IAM();

  const adminParams = {
    UserName: "LockitAdmin",
    Path: "/Lockit/",
    Tags: [{ Key: "role", Value: "admin" }],
  };

  await iam.createUser(adminParams).promise();

  const accessKeys = await iam
    .createAccessKey({ UserName: "LockitAdmin" })
    .promise();

  const { AccessKeyId, SecretAccessKey } = accessKeys.AccessKey;
  const accountId = await getAccountId();

  return { AccessKeyId, SecretAccessKey, accountId };
};

export default createHavenAdmin;
