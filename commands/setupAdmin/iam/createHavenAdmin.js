import fs from "fs";
import havenDir from "../../../utils/havenDir.js";
import createHavenAccountFile from "../../../utils/createHavenAccountFile.js";
import getAccountId from "../../../utils/getAccountId.js";
const hiddenAccountFilePath = `${havenDir}/havenAccountInfo.json`;

const createHavenAdmin = async (AWS, path, adminUserName) => {
  const iam = new AWS.IAM();
  if (fs.existsSync(hiddenAccountFilePath)) {
    console.log("Haven File Already Exists");
    return false;
  } else {
    const adminParams = {
      UserName: adminUserName,
      Path: `${path}`,
      Tags: [{ Key: "role", Value: "admin" }],
    };

    await iam.createUser(adminParams, path).promise();

    const accessKeys = await iam
      .createAccessKey({ UserName: adminUserName })
      .promise();

    const { AccessKeyId, SecretAccessKey } = accessKeys.AccessKey;
    const accountId = await getAccountId();

    createHavenAccountFile(
      Number(accountId),
      "us-east-1",    //TODO: is this a temporary hardcoding?
      AccessKeyId,
      SecretAccessKey,
      "Admin"
    );
    return true;
  }
};

export default createHavenAdmin;
