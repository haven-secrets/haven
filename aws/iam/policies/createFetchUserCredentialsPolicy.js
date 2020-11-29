import { iam, accountNumber } from "../../services.js";

const createFetchUserCredentialsPolicy = (policyName, path) => {
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
          `arn:aws:iam::${accountNumber}:group/*`,
          `arn:aws:iam::${accountNumber}:user/*`,
        ],
      },
    ],
  };

  const params = {
    PolicyDocument: JSON.stringify(policy),
    PolicyName: policyName,
    Path: `/${path}/`,
  };

  return iam.createPolicy(params).promise();
};

export default createFetchUserCredentialsPolicy;
