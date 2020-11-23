const createLogWritePolicy = (AWS, region, accountNumber) => {
  const iam = new AWS.IAM();
  const tableName = "HavenSecretsLogging";
  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "dynamodb:PutItem",
        Resource: `arn:aws:dynamodb:${region}:${accountNumber}:table/${tableName}`,
      },
    ],
  };

  const params = {
    PolicyDocument: JSON.stringify(policy),
    PolicyName: policyName,
    Description: `Policy for writing to DynamoDB ${tableName} table, to log the reading and/or writing of secrets.`,
    Path: "/Lockit/",
  };

  return iam.createPolicy(params).promise();
};

export default createLogWritePolicy;
