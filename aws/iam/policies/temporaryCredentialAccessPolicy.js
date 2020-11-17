import { iam } from "../../services.js";
import dotenv from "dotenv";
dotenv.config();

const temporaryCredentialAccessPolicy = (temporaryAccessKey, policyName) => {
  const accountNumber = process.env["ACCOUNT_NUMBER"];
  const region = process.env["REGION"];
  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "VisualEditor0",
        Effect: "Allow",
        Action: "dynamodb:GetItem",
        Resource: `arn:aws:dynamodb:${region}:${accountNumber}:table/LockitCredentials`,
      },
    ],
  };

  const params = {
    PolicyDocument: JSON.stringify(policy),
    PolicyName: policyName,
    Description: `Policy for restricting permissions of temporary users.`,
    Path: "/Lockit/",
  };

  return iam.createPolicy(params).promise();
};

export default temporaryCredentialAccessPolicy;
