import { iam } from "../../services.js";

const createLambdaRole = () => {
  const policy = {
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

  const params = {
    AssumeRolePolicyDocument: JSON.stringify(policy),
    RoleName: "HavenSecretsLambdaRole",
  };

  return iam.createRole(params).promise();
};

export default createLambdaRole;