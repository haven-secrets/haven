import { iam } from "../aws/services.js";
import sleep from "../utils/sleep.js";

const createFetchCredentialsRoleForLambda = async () => {
  // creating the role
  const assumeRolePolicy = {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Service": "lambda.amazonaws.com",
        },
        "Action": "sts:AssumeRole",
      }
    ],
  };

  const roleParams = {
    AssumeRolePolicyDocument: JSON.stringify(assumeRolePolicy),
    RoleName: "HavenSecretsLambdaRole3",
  };

  const roleData = await iam.createRole(roleParams).promise();

// TODO: separate out to other files
// creating permissions policy for the role
  const permissionsPolicy = {
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

  const permissionsParams = {
    PolicyDocument: JSON.stringify(permissionsPolicy),
    PolicyName: "HavenSecretsLambdaRolePolicy3",
    Description: "Policy for Lambda to fetch permanent user credentials",
    Path: "/Lockit/",
  };

  const permissionsPolicyResult = await iam.createPolicy(permissionsParams).promise();
  const policyArn = permissionsPolicyResult.Policy.Arn;

// attaching permissions policy to the role
  const attachPolicyParams = {
    PolicyArn: policyArn,
    RoleName: "HavenSecretsLambdaRole3",
  };

  // TODO: experiment around more with this call to sleep
  await sleep(7000);

  await iam.attachRolePolicy(attachPolicyParams).promise();

  return roleData;
};

export default createFetchCredentialsRoleForLambda;