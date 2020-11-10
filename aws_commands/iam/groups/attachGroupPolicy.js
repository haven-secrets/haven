import AWS from "aws-sdk";
import dotenv from 'dotenv';
dotenv.config();

const iam = new AWS.IAM();
const groupName = "testdevs";
const accountNumber = process.env["ACCOUNT_NUMBER"];
const policyName = "LockitDevDynamoDBRead";

var params = {
  GroupName: groupName, 
  PolicyArn: `arn:aws:iam::${accountNumber}:policy/${policyName}`,
};

iam.attachGroupPolicy(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else     console.log(data);
});