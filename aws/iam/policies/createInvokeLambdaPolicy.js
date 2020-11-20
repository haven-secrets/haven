import { iam } from "../../services.js";

const createInvokeLambdaPolicy = (functionName) => {
  const policy = {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": "lambda:InvokeFunction",
        "Resource": `arn:aws:lambda:us-east-1:978838099300:function:${functionName}` // TODO: remove hardcoding of region and account #
      }
    ]
  }

  const params = {
    PolicyDocument: JSON.stringify(policy),
    PolicyName: `HavenSecretsInvoke${functionName}Policy`,
    Description: `Policy for invoking the Lambda ${functionName}`,
    Path: "/Haven/",
  };

  return iam.createPolicy(params).promise();
};

export default createInvokeLambdaPolicy;