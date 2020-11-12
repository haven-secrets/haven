// TODO: don't hardcode stuff, also pass stuff in (accountNumber)

import { iam } from "../../services.js";
import dotenv from 'dotenv';
dotenv.config();

const attachGroupPolicy = () => {
	const groupName = "testdevs";
	const accountNumber = process.env["ACCOUNT_NUMBER"];
	const policyName = "LockitDevDynamoDBRead";

	var params = {
	  GroupName: groupName, 
	  PolicyArn: `arn:aws:iam::${accountNumber}:policy/${policyName}`,
	};

	iam.attachGroupPolicy(params, function(err, data) {
	  if (err) console.log(err, err.stack);
	  else console.log(data);
	});
};

export default attachGroupPolicy;