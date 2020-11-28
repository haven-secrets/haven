import AWS from "aws-sdk";
import { lambda } from "../aws/services.js"; // to be instantiated with temporay credentials
import fetchHavenAccountInfo from "../utils/fetchHavenAccountInfo.js";
import createHavenAccountFile from "../utils/createHavenAccountFile.js";

const lambdaName = "HavenSecretsFetchUserCredentials"; // TODO: load this from a config file

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

  const data = await lambda.invoke(params).promise();
  const { AccessKeyId, SecretAccessKey } = JSON.parse(data.Payload).body;

  createHavenAccountFile(
    Number(accountNumber),
    region,
    username,
    AccessKeyId,
    SecretAccessKey,
    "Dev"
  );
};

export default userSetup;
