require('dotenv').config();
const AWS = require("aws-sdk");
const iam = new AWS.IAM();
const username = process.env['USERNAME'];
const params = {
  UserName: username,
};

iam.getUser(params, function (err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
});
