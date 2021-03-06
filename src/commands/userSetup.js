import AWS from "aws-sdk";
import { createHavenLambda } from "../aws/services.js"; // to be instantiated with temporay credentials
import fetchHavenAccountInfo from "../utils/fetchHavenAccountInfo.js";
import createHavenAccountFile from "../utils/createHavenAccountFile.js";
import { lambdaName } from "../utils/config.js";

const userSetup = async () => {
  const {
    region,
    accountNumber,
    accessKeyId: temporaryAccessKey,
    secretAccessKey: temporarySecretAccessKey,
    username,
    role
  } = fetchHavenAccountInfo();

  const params = {
    FunctionName: lambdaName,
    Payload: JSON.stringify({ temporaryUsername: username }),
  };

  const data = await createHavenLambda().invoke(params).promise();
  const { AccessKeyId, SecretAccessKey, permanentUsername } = JSON.parse(data.Payload).body;

  createHavenAccountFile(
    Number(accountNumber),
    region,
    permanentUsername,
    AccessKeyId,
    SecretAccessKey,
    "Dev"
  );
};

export default userSetup;
