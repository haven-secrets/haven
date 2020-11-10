import AWS from "aws-sdk";

const iam = new AWS.IAM();
const groupName = "testdevs";
const userName = "testuser";

const params = {
  GroupName: groupName, 
  UserName: userName,
};

iam.addUserToGroup(params, function(err, data) {
  if (err) console.log(err, err.stack)
  else console.log(data);
});