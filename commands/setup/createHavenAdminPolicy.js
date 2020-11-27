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
          "dynamodb:UpdateItem",
        ],
        Resource: `arn:aws:dynamodb:${region}:${accountNumber}:table/Lockit*`,
      },
      {
        Effect: "Allow",
        Action: ["kms:Decrypt", "kms:GenerateDataKey"],
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
          `arn:aws:iam::${accountNumber}:policy/Lockit*`,
          `arn:aws:iam::${accountNumber}:group/Lockit*`,
          `arn:aws:iam::${accountNumber}:user/Lockit*`,
          `arn:aws:iam::${accountNumber}:role/Haven*`,
          `arn:aws:iam::${accountNumber}:policy/Haven*`,
          `arn:aws:iam::${accountNumber}:group/Haven*`,
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
          `arn:aws:cloudformation:${region}:${accountNumber}:stack/Lockit*`,
          `arn:aws:cloudformation:${region}:${accountNumber}:stack/Haven*`,
        ],
      },
      {
        Effect: "Allow",
        Action: ["lambda:GetFunction", "lambda:CreateFunction"],
        Resource: [`arn:aws:lambda:${region}:${accountNumber}:function:Haven*`],
      },
    ],
  };
  //TODO HARDCODED PATH
  const params = {
    PolicyDocument: JSON.stringify(policy),
    PolicyName: policyName,
    Description: `Policy for Haven Admin permissions`,
    Path: "/LockitSecrets/",
  };

  return iam.createPolicy(params).promise();
};

export default createHavenAdminPolicy;
