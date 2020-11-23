const createHavenAdminPolicy = (
  AWS,
  region,
  accountNumber,
  keyId,
  policyName
) => {
  const iam = new AWS.IAM();

  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "dynamodb:GetItem",
        Resource: `arn:aws:dynamodb:${region}:${accountNumber}:table/HavenSecrets*`,
      },
      {
        Effect: "Allow",
        Action: "kms:ListAliases",
        Resource: "*",
      },
    ],
  };

  const params = {
    PolicyDocument: JSON.stringify(policy),
    PolicyName: policyName,
    Description: `Policy for Haven Admin permissions`,
    Path: "/HavenSecrets/",
  };

  return AWS.iam.createPolicy(params).promise();
};

export default createHavenAdminPolicy;
