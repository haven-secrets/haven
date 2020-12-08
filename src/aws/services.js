import fetchHavenAccountInfo from "../utils/fetchHavenAccountInfo.js";
import AWS from "aws-sdk";

const setAwsHavenCredentials = () => {
  const {
    region,
    accessKeyId,
    secretAccessKey,
    accountNumber,
    username,
  } = fetchHavenAccountInfo();

  AWS.config.update({
    region,
    accessKeyId,
    secretAccessKey,
    region,
  });
}

const createHavenIam = () => {
  setAwsHavenCredentials();
  return new AWS.IAM();
}

const createHavenKms = () => {
  setAwsHavenCredentials();
  return new AWS.KMS();
}

const createHavenDynamoDB = () => {
  setAwsHavenCredentials();
  return new AWS.DynamoDB();
}

const createHavenCloudFormation = () => {
  setAwsHavenCredentials();
  return new AWS.CloudFormation();
}

const createHavenLambda = () => {
  setAwsHavenCredentials();
  return new AWS.Lambda();
}


export {
  createHavenIam,
  createHavenKms,
  createHavenDynamoDB,
  createHavenCloudFormation,
  createHavenLambda
};
