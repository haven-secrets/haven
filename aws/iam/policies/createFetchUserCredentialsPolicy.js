import { iam } from "../../services.js";

const createFetchUserCredentialsPolicy = () => {
  const policy = {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
            "iam:DeleteAccessKey",
            "iam:RemoveUserFromGroup",
            "iam:ListGroupsForUser",
            "iam:DeleteUser",
            "iam:GetUser",
            "iam:CreateAccessKey",
            "iam:ListAccessKeys"
        ],
        "Resource": [
            // TODO: restrict resources (Haven path) & remove account # hardcoding
            "arn:aws:iam::978838099300:group/*",
            "arn:aws:iam::978838099300:user/*"
        ]
      }
    ]
  };

  const params = {
    PolicyDocument: JSON.stringify(policy),
    PolicyName: "HavenSecretsLambdaRolePolicy",
    Description: "Policy for Lambda to fetch permanent user credentials",
    Path: "/Lockit/",
  };

  return iam.createPolicy(params).promise();
};

export default createFetchUserCredentialsPolicy;