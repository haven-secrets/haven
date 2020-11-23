import { iam } from "../../services.js";

const attachGroupPolicy = (groupName, policyName) => {
  const accountNumber = process.env["ACCOUNT_NUMBER"];

  var params = {
    GroupName: groupName,
    PolicyArn: `arn:aws:iam::${accountNumber}:policy/Haven/${policyName}`,
  };

  return iam.attachGroupPolicy(params).promise();
};

export default attachGroupPolicy;
