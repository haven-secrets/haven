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
          "dynamodb:CreateTable",
        ],
        Resource: `arn:aws:dynamodb:${region}:${accountNumber}:table/HavenSecrets*`,
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
          "iam:DeleteGroup",
          "iam:AddUserToGroup",
        ],
        Resource: [
          `arn:aws:iam::${accountNumber}:policy/HavenSecrets*`,
          `arn:aws:iam::${accountNumber}:group/HavenSecrets*`,
        ],
      },
    ],
  };

  const params = {
    PolicyDocument: JSON.stringify(policy),
    PolicyName: policyName,
    Description: `Policy for Haven Admin permissions`,
    Path: "/HavenSecrets/",
  };

  return iam.createPolicy(params).promise();
};

export default createHavenAdminPolicy;
