import { iam, accountNumber } from "../../services.js";

const path = "HavenSecrets"; // TODO: ditto

const createFetchUserCredentialsPolicy = (policyName) => {
  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "iam:DeleteAccessKey",
          "iam:RemoveUserFromGroup",
          "iam:ListGroupsForUser",
          "iam:DeleteUser",
          "iam:GetUser",
          "iam:CreateAccessKey",
          "iam:ListAccessKeys",
        ],
        Resource: [
          // TODO: restrict resources (Haven path) & remove account # hardcoding
          `arn:aws:iam::${accountNumber}:group/*`,
          `arn:aws:iam::${accountNumber}:user/*`,
        ],
      },
    ],
  };

  const params = {
    PolicyDocument: JSON.stringify(policy),
    PolicyName: policyName,
    Description: "Policy for Lambda to fetch permanent user credentials",
    Path: `/${path}/`,
  };

  return iam.createPolicy(params).promise();
};

export default createFetchUserCredentialsPolicy;
