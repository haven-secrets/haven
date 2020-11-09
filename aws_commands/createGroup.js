const AWS = require("aws-sdk");
const iam = new AWS.IAM();
const groupName = "AdminTest";

const params = {
  GroupName: groupName,
};

iam.createGroup(params, function (err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
});
