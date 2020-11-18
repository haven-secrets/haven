import dotenv from "dotenv";
dotenv.config();
import AWS from "aws-sdk";

const region = process.env["REGION"];

const iam = new AWS.IAM();
const kms = new AWS.KMS({ region });
const dynamodb = new AWS.DynamoDB({ region });
const cloudformation = new AWS.CloudFormation({ region });

export { iam, kms, dynamodb, cloudformation };
