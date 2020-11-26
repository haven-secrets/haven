const createHavenAdminPolicy = (
  AWS,
  region,
  accountNumber,
  policyName,
  keyArn
) => {
  const iam = new AWS.IAM();

  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:DescribeTable",
          "dynamodb:CreateTable",
          "dynamodb:DeleteTable",
        ],
        Resource: `arn:aws:dynamodb:${region}:${accountNumber}:table/Lockit*`,
      },
      {
        Effect: "Allow",
        Action: ["kms:Decrypt", "kms:Encrypt"],
        Resource: keyArn,
      },
      {
        Effect: "Allow",
        Action: [
          "iam:CreatePolicy",
          "iam:CreateGroup",
          "iam:CreateRole",
          "iam:DeleteGroup",
          "iam:PutGroupPolicy",
          "iam:GetGroupPolicy",
          "iam:DeleteGroupPolicy",
          "iam:AddUserToGroup",
          "iam:GetGroup",
          "iam:CreateUser",
          "iam:TagUser",
          "iam:PassRole",
          "iam:CreateAccessKey",
          "iam:ListUsers",
          "iam:DetachRolePolicy",
          "iam:AttachRolePolicy",
        ],
        Resource: [
          "arn:aws:iam::616358928898:policy/Lockit*",
          "arn:aws:iam::616358928898:group/Lockit*",
          "arn:aws:iam::616358928898:user/Lockit*",
          "arn:aws:iam::616358928898:role/Haven*",
          "arn:aws:iam::616358928898:policy/Haven*",
          "arn:aws:iam::616358928898:group/Haven*",
        ],
      },
      {
        Effect: "Allow",
        Action: ["cloudformation:CreateStack"],
        Resource: [
          "arn:aws:cloudformation:us-east-1:616358928898:stack/Lockit*",
          "arn:aws:cloudformation:us-east-1:616358928898:stack/Haven*",
        ],
      },
      {
        Effect: "Allow",
        Action: ["lambda:GetFunction", "lambda:CreateFunction"],
        Resource: ["arn:aws:lambda:us-east-1:616358928898:function:Haven*"],
      },
    ],
  };
  //TODO HARDCODED PATH
  const params = {
    PolicyDocument: JSON.stringify(policy),
    PolicyName: policyName,
    Description: `Policy for Lockit Admin permissions`,
    Path: "/LockitSecrets/",
  };

  return iam.createPolicy(params).promise();
};

export default createHavenAdminPolicy;
//
//
// {
//     "Version": "2012-10-17",
//     "Statement": [
//         {
//             "Effect": "Allow",
//             "Action": [
//                 "dynamodb:Scan",
//                 "dynamodb:GetItem",
//                 "dynamodb:PutItem",
//                 "dynamodb:DescribeTable",
//                 "dynamodb:CreateTable",
//                 "dynamodb:DeleteTable"
//             ],
//             "Resource": "arn:aws:dynamodb:us-east-1:616358928898:table/Lockit*"
//         },
//         {
//             "Effect": "Allow",
//             "Action": [
//                 "kms:Decrypt",
//                 "kms:Encrypt"
//             ],
//             "Resource": "arn:aws:kms:us-east-1:616358928898:key/66eb8135-b1e4-437a-a19a-ecc810e808a3"
//         },
//         {
//             "Effect": "Allow",
//             "Action": [
//                 "iam:CreatePolicy",
//                 "iam:CreateGroup",
//                 "iam:CreateRole",
//                 "iam:DeleteGroup",
//                 "iam:PutGroupPolicy",
//                 "iam:GetGroupPolicy",
//                 "iam:DeleteGroupPolicy",
//                 "iam:AddUserToGroup",
//                 "iam:GetGroup",
//                 "iam:CreateUser",
//                 "iam:TagUser",
//                 "iam:PassRole",
//                 "iam:CreateAccessKey",
//                 "iam:ListUsers",
//                 "iam:DetachRolePolicy",
//                 "iam:AttachRolePolicy"
//             ],
//             "Resource": [
//                 "arn:aws:iam::616358928898:policy/Lockit*",
//                 "arn:aws:iam::616358928898:group/Lockit*",
//                 "arn:aws:iam::616358928898:user/Lockit*",
//                 "arn:aws:iam::616358928898:role/Haven*",
//                 "arn:aws:iam::616358928898:policy/Haven*",
//                 "arn:aws:iam::616358928898:group/Haven*"
//             ]
//         },
//         {
//             "Effect": "Allow",
//             "Action": [
//                 "cloudformation:CreateStack"
//             ],
//             "Resource": [
//                 "arn:aws:cloudformation:us-east-1:616358928898:stack/Lockit*",
//                 "arn:aws:cloudformation:us-east-1:616358928898:stack/Haven*"
//             ]
//         },
//         {
//             "Effect": "Allow",
//             "Action": [
//                 "lambda:GetFunction",
//                 "lambda:CreateFunction"
//             ],
//             "Resource": [
//                 "arn:aws:lambda:us-east-1:616358928898:function:Haven*"
//             ]
//         }
//     ]
// }
