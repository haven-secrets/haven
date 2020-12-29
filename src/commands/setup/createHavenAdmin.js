import getAccountNumber from "../../utils/getAccountId.js";

const createHavenAdmin = async (AWS, path, adminUserName, region) => {
  const iam = new AWS.IAM({ region });

  const adminParams = {
    UserName: adminUserName,
    Path: `/${path}/`,
    Tags: [{ Key: "role", Value: "admin" }],
  };

  await iam.createUser(adminParams).promise();

  const accessKeys = await iam
    .createAccessKey({ UserName: adminUserName })
    .promise();

  const { AccessKeyId, SecretAccessKey } = accessKeys.AccessKey;
  const accountNumber = await getAccountNumber();

  return { AccessKeyId, SecretAccessKey, accountNumber };
};

export default createHavenAdmin;
