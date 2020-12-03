import { iam, accountNumber } from "../../services.js";

const addInlinePolicyToUser = (policyName, username, path) => {
  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        "Effect": "Allow",
        "Action": "iam:ListGroupsForUser",
        "Resource": `arn:aws:iam::${accountNumber}:user/${path}/${username}`
      },
    ],
  };

  const params = {
    PolicyDocument: JSON.stringify(policy),
    PolicyName: policyName + username,
    UserName: username,
  };

  return iam.putUserPolicy(params).promise();
};

export default addInlinePolicyToUser;
