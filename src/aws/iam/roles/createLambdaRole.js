import { createHavenIam } from "../../services.js";

const createLambdaRole = (roleName) => {
  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "lambda.amazonaws.com",
        },
        Action: "sts:AssumeRole",
      },
    ],
  };

  const params = {
    AssumeRolePolicyDocument: JSON.stringify(policy),
    RoleName: roleName,
  };

  return createHavenIam().createRole(params).promise();
};

export default createLambdaRole;
