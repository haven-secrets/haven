import AWS from "aws-sdk";
import os from "os";
import fs from "fs";
import getOfficialCredential from "../aws/dynamodb/getOfficialCredential.js";
import deleteOfficialCredential from "../aws/dynamodb/deleteOfficialCredential.js";

const userSetup = async (temporaryAccessKey, temporarySecretAccessKey) => {
  const username = "testUser1";
  const options = {
    accessKeyId: temporaryAccessKey,
    secretAccessKey: temporarySecretAccessKey,
  };
  // AWS.config.update(options);
  const { AccessKey, SecretAccessKey } = await getOfficialCredential(
    temporaryAccessKey,
    temporarySecretAccessKey
  );

  const data = `
[lockit]
aws_access_key_id = ${AccessKey}
aws_secret_access_key = ${SecretAccessKey}
`;

  const homedir = os.homedir();
  const configDir = ".aws/credentials";

  fs.writeFile(`${homedir}/${configDir}`, data, { flag: "a+" }, (err) => {
    if (err) {
      throw err;
    }
    console.log("File is updated.");
  });

  deleteOfficialCredential(temporaryAccessKey, temporarySecretAccessKey);
};

export default userSetup;
