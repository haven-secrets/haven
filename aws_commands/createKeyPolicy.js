require("dotenv").config();
const AWS = require("aws-sdk");
const iam = new AWS.IAM();
const keyId = process.env["KEYID"];
const accountNumber = process.env["ACCOUNT_NUMBER"];
const region = process.env["REGION"];
const keyAlias = "KeyAliasTest";

const readPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "VisualEditor0",
      Effect: "Allow",
      Action: "kms:Decrypt",
      Resource: `arn:aws:kms:${region}:${accountNumber}:key/${keyId}`,
    },
  ],
};

const writePolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "VisualEditor0",
      Effect: "Allow",
      Action: "kms:GenerateDataKey",
      Resource: `arn:aws:kms:${region}:${accountNumber}:key/${keyId}`,
    },
  ],
};

const writeParams = {
  PolicyDocument: JSON.stringify(writePolicy) /* required */,
  PolicyName: "PolicyWriteOnlyTest" /* required */,
  Description: "Policy write only test for one particular key",
};

const readParams = {
  PolicyDocument: JSON.stringify(readPolicy) /* required */,
  PolicyName: "PolicyReadOnlyTest" /* required */,
  Description: "Policy read only test for one particular key",
};
iam.createPolicy(writeParams, function (err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
});

iam.createPolicy(readParams, function (err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
});
