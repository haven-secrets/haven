import AWS from "aws-sdk";
import os from "os";
import fs from "fs";
import { lambda } from "../aws/services.js"; // to be instantiated with temporay credentials
import { lambdaName } from "../utils/config.js";

const setupUser = async (
  username,
  temporaryAccessKey,
  temporarySecretAccessKey
) => {
  const params = {
    FunctionName: lambdaName,
    Payload: JSON.stringify({ temporaryUsername: username }),
  };

  const data = await lambda.invoke(params).promise();
  const { AccessKeyId, SecretAccessKey } = JSON.parse(data.Payload).body;

  const credentials = `
[haven]
aws_access_key_id = ${AccessKeyId}
aws_secret_access_key = ${SecretAccessKey}
    `;

  const homedir = os.homedir();
  const configDir = ".aws/credentials";

  // TODO: change from callback
  fs.writeFile(
    `${homedir}/${configDir}`,
    credentials,
    { flag: "a+" },
    (err) => {
      if (err) {
        throw err;
      }
      console.log("File is updated.");
    }
  );
};

export default setupUser;
