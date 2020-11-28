import fetchHavenAccountInfo from "../utils/fetchHavenAccountInfo.js";
import AWS from "aws-sdk";

const {
  region,
  accessKeyId,
  secretAccessKey,
  accountNumber,
} = fetchHavenAccountInfo();

AWS.config.update({
  region,
  accessKeyId,
  secretAccessKey,
  region,
});

const iam = new AWS.IAM();
const kms = new AWS.KMS();
const dynamodb = new AWS.DynamoDB();
const cloudformation = new AWS.CloudFormation();
const lambda = new AWS.Lambda();

export { iam, kms, dynamodb, cloudformation, lambda, accountNumber, region };
