// TODO: pass in region, accountNumber, tableName

import { iam } from "../../services.js";
import dotenv from "dotenv";
dotenv.config();

const createLogWritePolicy = (tableName, policyName) => {
  const region = process.env["REGION"];
  const accountNumber = process.env["ACCOUNT_NUMBER"];

  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "dynamodb:PutItem",
        Resource: `arn:aws:dynamodb:${region}:${accountNumber}:table/${tableName}`,
      },
    ],
  };

  const params = {
    PolicyDocument: JSON.stringify(policy),
    PolicyName: policyName,
    Description: `Policy for writing to DynamoDB ${tableName} table, to log the reading and/or writing of secrets.`,
    Path: "/Lockit/",
  };

  return iam.createPolicy(params).promise();
};

export default createLogWritePolicy;
