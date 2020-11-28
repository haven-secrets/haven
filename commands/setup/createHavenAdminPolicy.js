const createHavenAdminPolicy = (
  AWS,
  region,
  accountNumber,
  policyName,
  keyArn,
  path
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
          "dynamodb:UpdateItem",
        ],
        Resource: `arn:aws:dynamodb:${region}:${accountNumber}:table/${path}*`,
      },
      {
        Effect: "Allow",
        Action: [
          "kms:Decrypt",
          "kms:GenerateDataKey",
          "kms:ScheduleKeyDeletion",
        ],
        Resource: keyArn,
      },
      {
        Effect: "Allow",
        Action: ["kms:ListAliases"],
        Resource: "*",
      },
      {
        Effect: "Allow",
        Action: [
          "iam:CreatePolicy",
          "iam:CreateGroup",
          "iam:CreateRole",
          "iam:CreateUser",
          "iam:CreateAccessKey",
          "iam:DeleteGroup",
          "iam:DeleteRole",
          "iam:DeleteUser",
          "iam:DeletePolicy",
          "iam:DeleteAccessKey",
          "iam:DeleteGroupPolicy",
          "iam:PutGroupPolicy",
          "iam:GetGroupPolicy",
          "iam:GetGroup",
          "iam:GetUser",
          "iam:AddUserToGroup",
          "iam:TagUser",
          "iam:PassRole",
          "iam:ListUsers",
          "iam:DetachRolePolicy",
          "iam:AttachRolePolicy",
          "iam:RemoveUserFromGroup",
          "iam:ListGroupsForUser",
          "iam:ListAccessKeys",
        ],
        Resource: [
          `arn:aws:iam::${accountNumber}:user/${path}*`,
          `arn:aws:iam::${accountNumber}:role/${path}*`,
          `arn:aws:iam::${accountNumber}:policy/${path}*`,
          `arn:aws:iam::${accountNumber}:group/${path}*`,
        ],
      },
      {
        Effect: "Allow",
        Action: [
          "cloudformation:CreateStack",
          "cloudformation:DeleteStack",
          "cloudformation:DescribeStacks",
        ],
        Resource: [
          `arn:aws:cloudformation:${region}:${accountNumber}:stack/${path}*`,
        ],
      },
      {
        Effect: "Allow",
        Action: ["cloudformation:ListStacks"],
        Resource: ["*"],
      },
      {
        Effect: "Allow",
        Action: [
          "lambda:GetFunction",
          "lambda:CreateFunction",
          "lambda:DeleteFunction",
        ],
        Resource: [`arn:aws:lambda:${region}:${accountNumber}:function:${path}*`],
      },
    ],
  };
  //TODO HARDCODED PATH
  const params = {
    PolicyDocument: JSON.stringify(policy),
    PolicyName: policyName,
    Description: `Policy for Haven Admin permissions`,
    Path: `/${path}/`,
  };

  return iam.createPolicy(params).promise();
};

export default createHavenAdminPolicy;
