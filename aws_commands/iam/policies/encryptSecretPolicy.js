import AWS from "aws-sdk";
import dotenv from 'dotenv';
dotenv.config();

const iam = new AWS.IAM();
const region = process.env["REGION"];
const accountNumber = process.env["ACCOUNT_NUMBER"];
const keyId = process.env["KEYID"];

const policy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "VisualEditor0",
      Effect: "Allow",
      Action: ["kms:Encrypt", "kms:GenerateDataKey"],
      Resource: `arn:aws:kms:${region}:${accountNumber}:key/${keyId}`,
    },
  ],
};

const params = {
  PolicyDocument: JSON.stringify(policy),
  PolicyName: "LockitDevKMSEncrypt",
  Description: "Policy for encrypting values using CMK",
};

iam.createPolicy(params, function (err, data) {
  if (err) console.log(err, err.stack);
  else console.log(data);
});