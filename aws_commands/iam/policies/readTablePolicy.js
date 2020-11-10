import AWS from "aws-sdk";
import dotenv from 'dotenv';
dotenv.config();

const iam = new AWS.IAM();
const region = process.env["REGION"];
const accountNumber = process.env["ACCOUNT_NUMBER"];
const tableName = "DevSecrets";

const policy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "VisualEditor0",
      Effect: "Allow",
      Action: ["dynamodb:Scan", "dynamodb:GetItem"],
      Resource: `arn:aws:dynamodb:${region}:${accountNumber}:table/${tableName}`,
    },
  ],
};

const params = {
  PolicyDocument: JSON.stringify(policy),
  PolicyName: "LockitDevDynamoDBRead",
  Description: "Policy for reading from DynamoDB",
};

iam.createPolicy(params, function (err, data) {
  if (err) console.log(err, err.stack);
  else console.log(data);
});