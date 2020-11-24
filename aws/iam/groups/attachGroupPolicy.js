// TODO: don't hardcode stuff, also pass stuff in (accountNumber)

import { iam } from "../../services.js";
import dotenv from "dotenv";
dotenv.config();

const attachGroupPolicy = (groupName, policyName) => {
  const accountNumber = process.env["ACCOUNT_NUMBER"];

  const params = {
    GroupName: groupName,
    PolicyArn: `arn:aws:iam::${accountNumber}:policy/Lockit/${policyName}`, // TODO: fix Lockit path for some policies
  };

  return iam.attachGroupPolicy(params).promise();
};

export default attachGroupPolicy;
