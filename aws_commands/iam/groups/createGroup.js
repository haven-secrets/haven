import AWS from "aws-sdk";

const iam = new AWS.IAM();
const groupName = "testdevs";

const params = {
  GroupName: groupName,
};

iam.createGroup(params, function (err, data) {
  if (err) console.log(err, err.stack);
  else console.log(data);
});