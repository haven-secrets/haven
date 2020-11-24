import { iam } from "../../services.js";
import dotenv from "dotenv";
dotenv.config();

const createInvokeLambdaPolicy = (functionName) => {
  const region = process.env["REGION"];
  const accountNumber = process.env["ACCOUNT_NUMBER"];

  const policy = {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": "lambda:InvokeFunction",
        "Resource": `arn:aws:lambda:${region}:${accountNumber}:function:${functionName}` // TODO: remove hardcoding of region and account #
      }
    ]
  }

  const params = {
    PolicyDocument: JSON.stringify(policy),
    PolicyName: `LockitSecretsInvoke${functionName}Policy`,
    Description: `Policy for invoking the Lambda ${functionName}`,
    Path: "/Lockit/",
  };

  return iam.createPolicy(params).promise();
};

export default createInvokeLambdaPolicy;