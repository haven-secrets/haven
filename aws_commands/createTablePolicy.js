require("dotenv").config();
const AWS = require("aws-sdk");
const iam = new AWS.IAM();
const keyId = process.env["KEYID"];
const accountNumber = process.env["ACCOUNT_NUMBER"];
const region = process.env["REGION"];
const keyAlias = "KeyAliasTest";
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
  PolicyDocument: JSON.stringify(policy) /* required */,
  PolicyName: "ReadOnlyDevSecrets" /* required */,
  Description: "testing",
};
iam.createPolicy(params, function (err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
});
