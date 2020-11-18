import { iam } from "../../services.js";
import dotenv from "dotenv";
dotenv.config();

const attachPolicyToTemporaryUser = (username, policyName) => {
  const accountNumber = process.env["ACCOUNT_NUMBER"];

  var params = {
    UserName: username,
    PolicyArn: `arn:aws:iam::${accountNumber}:policy/Lockit/${policyName}`,
  };

  return iam.attachUserPolicy(params).promise();
};

export default attachPolicyToTemporaryUser;
