// TODO: pass in region, accountNumber

import { iam } from "../../services.js";
import dotenv from "dotenv";
dotenv.config();

const generateReadTablePolicy = (tableName, policyName) => {
  const region = process.env["REGION"];
  const accountNumber = process.env["ACCOUNT_NUMBER"];

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
    PolicyName: policyName,
    Description: `Policy for reading from ${tableName} DynamoDB`,
    Path: "/Lockit/",
  };

  return iam.createPolicy(params).promise();
};

export default generateReadTablePolicy;
