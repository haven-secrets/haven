// TODO: pass in region, accountNumber, tableName

import { iam } from "../../services.js";
import dotenv from "dotenv";
dotenv.config();

const createSecretReadPolicy = (tableName, policyName, keyId) => {
  const region = process.env["REGION"];
  const accountNumber = process.env["ACCOUNT_NUMBER"];

  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: ["dynamodb:Scan", "dynamodb:GetItem"],
        Resource: `arn:aws:dynamodb:${region}:${accountNumber}:table/${tableName}`,
      },
      {
        Effect: "Allow",
        Action: "kms:Decrypt",
        Resource: `arn:aws:kms:${region}:${accountNumber}:key/${keyId}`,
      },
    ],
  };

  const params = {
    PolicyDocument: JSON.stringify(policy),
    PolicyName: policyName,
    Description: `Policy for reading from ${tableName} DynamoDB and decrypting the secret`,
    Path: "/Lockit/",
  };

  return iam.createPolicy(params).promise();
};

export default createSecretReadPolicy;
